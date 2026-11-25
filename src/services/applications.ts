import type { Json } from '@/types/database';

import { supabase } from './supabase';

export type ApplicationKind = 'venue' | 'dj';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export type VenueApplicationDraft = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  instagram: string;
  contact: string;
  photoPaths: string[];
  comment: string;
};

export type DjApplicationDraft = {
  stageName: string;
  genres: string[];
  bio: string;
  photoPath: string | null;
  instagram: string;
  soundcloud: string;
  contact: string;
};

export type AccountApplication = {
  id: string;
  kind: ApplicationKind;
  status: ApplicationStatus;
  rejectReason: string | null;
  createdAt: string;
  /** Short title: venue name or DJ stage name. */
  title: string;
  /** Only filled for the superadmin queue. */
  applicantName: string | null;
  contact: string | null;
};

export type ApplicationErrorCode = 'forbidden' | 'not_pending' | 'network' | 'unknown';

/** Generic, safe-to-show error. Never contains server messages. */
export class ApplicationError extends Error {
  readonly code: ApplicationErrorCode;

  constructor(code: ApplicationErrorCode) {
    super(`application_${code}`);
    this.name = 'ApplicationError';
    this.code = code;
  }
}

type ApplicationRow = {
  id: string;
  kind: string;
  status: string;
  reject_reason: string | null;
  created_at: string;
  payload: Json;
  applicant: { display_name: string | null; handle: string | null } | null;
};

const COLUMNS =
  'id, kind, status, reject_reason, created_at, payload, applicant:profiles!account_applications_user_id_fkey(display_name, handle)';

function toApplicationError(error: { code?: string; message?: string }): ApplicationError {
  if (error.code === '42501') return new ApplicationError('forbidden');
  if (error.code === '22023') return new ApplicationError('not_pending');
  const text = (error.message ?? '').toLowerCase();
  if (text.includes('fetch') || text.includes('network')) return new ApplicationError('network');
  return new ApplicationError('unknown');
}

function text(payload: Json, key: string): string | null {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) return null;
  const value = payload[key];
  return typeof value === 'string' && value.trim() !== '' ? value : null;
}

function toApplication(row: ApplicationRow): AccountApplication {
  const kind: ApplicationKind = row.kind === 'dj' ? 'dj' : 'venue';
  const status: ApplicationStatus =
    row.status === 'approved' || row.status === 'rejected' ? row.status : 'pending';
  const applicant = row.applicant;
  return {
    id: row.id,
    kind,
    status,
    rejectReason: row.reject_reason,
    createdAt: row.created_at,
    title: text(row.payload, kind === 'dj' ? 'stage_name' : 'name') ?? '',
    applicantName: applicant?.display_name ?? (applicant?.handle ? `@${applicant.handle}` : null),
    contact: text(row.payload, 'contact'),
  };
}

/** JSON stored for a venue application; the server validates name, address and contact. */
export function venuePayload(draft: VenueApplicationDraft): Json {
  return {
    name: draft.name.trim(),
    address: draft.address.trim(),
    lat: draft.lat,
    lng: draft.lng,
    instagram: draft.instagram.trim(),
    contact: draft.contact.trim(),
    photos: draft.photoPaths,
    comment: draft.comment.trim(),
  };
}

/** JSON stored for a DJ application; the server validates stage name and contact. */
export function djPayload(draft: DjApplicationDraft): Json {
  return {
    stage_name: draft.stageName.trim(),
    genres: draft.genres,
    bio: draft.bio.trim(),
    photo: draft.photoPath,
    instagram: draft.instagram.trim(),
    soundcloud: draft.soundcloud.trim(),
    contact: draft.contact.trim(),
  };
}

/** Sends a pending application as the signed-in user. The server keeps one pending per kind. */
export async function submitApplication(kind: ApplicationKind, payload: Json): Promise<void> {
  const { error } = await supabase.from('account_applications').insert({ kind, payload });
  if (error) throw toApplicationError(error);
}

/** The signed-in user's own applications, newest first. */
export async function listMyApplications(): Promise<AccountApplication[]> {
  const { data, error } = await supabase
    .from('account_applications')
    .select(COLUMNS)
    .order('created_at', { ascending: false })
    .returns<ApplicationRow[]>();
  if (error) throw toApplicationError(error);
  return (data ?? []).map(toApplication);
}

/** Whether the signed-in user is a superadmin (decided by the server). */
export async function checkIsSuperadmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_superadmin');
  if (error) throw toApplicationError(error);
  return data === true;
}

/** Pending applications, oldest first. RLS returns them only to a superadmin. */
export async function listPendingApplications(): Promise<AccountApplication[]> {
  const { data, error } = await supabase
    .from('account_applications')
    .select(COLUMNS)
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .returns<ApplicationRow[]>();
  if (error) throw toApplicationError(error);
  return (data ?? []).map(toApplication);
}

export async function approveApplication(applicationId: string): Promise<void> {
  const { error } = await supabase.rpc('approve_application', { p_id: applicationId });
  if (error) throw toApplicationError(error);
}

export async function rejectApplication(applicationId: string, reason: string): Promise<void> {
  const { error } = await supabase.rpc('reject_application', {
    p_id: applicationId,
    p_reason: reason.trim(),
  });
  if (error) throw toApplicationError(error);
}

/** Uploads a resized JPEG into the applicant's own folder; returns the storage path. */
export async function uploadApplicationPhoto(userId: string, fileUri: string): Promise<string> {
  const path = `${userId}/application-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  let blob: Blob;
  try {
    blob = await (await fetch(fileUri)).blob();
  } catch {
    throw new ApplicationError('network');
  }
  const { error } = await supabase.storage
    .from('feed-images')
    .upload(path, blob, { contentType: 'image/jpeg' });
  if (error) throw new ApplicationError('unknown');
  return path;
}
