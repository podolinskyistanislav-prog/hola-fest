import type {
  AdminEvent,
  AdminOffer,
  AdminVenue,
  EventInput,
  EventStatus,
  OfferInput,
} from '@/types/admin';

import { supabase } from './supabase';

export type AdminErrorCode = 'forbidden' | 'not_found' | 'unauthenticated' | 'network' | 'unknown';

/** Generic, safe-to-show error. Never contains server messages. */
export class AdminError extends Error {
  readonly code: AdminErrorCode;

  constructor(code: AdminErrorCode) {
    super(`admin_${code}`);
    this.name = 'AdminError';
    this.code = code;
  }
}

const MEMBERSHIP_COLUMNS = 'role, venue:venues!inner(id, slug, name, is_published)';
const EVENT_COLUMNS =
  'id, venue_id, title, description, lineup, starts_at, ends_at, price_from_uah, status';
const OFFER_COLUMNS =
  'id, event_id, title, terms, max_claims, per_user_limit, valid_until, is_active';

type MembershipRow = {
  role: string;
  venue: { id: string; slug: string; name: string; is_published: boolean };
};

type EventRow = {
  id: string;
  venue_id: string;
  title: string;
  description: string | null;
  lineup: string[] | null;
  starts_at: string;
  ends_at: string | null;
  price_from_uah: number | null;
  status: string;
};

type OfferRow = {
  id: string;
  event_id: string;
  title: string;
  terms: string | null;
  max_claims: number | null;
  per_user_limit: number;
  valid_until: string | null;
  is_active: boolean;
};

type ClientError = { code?: string; message?: string };

function toAdminError(error: ClientError): AdminError {
  // RLS rejects a write with 42501; an update/select that RLS filters to zero rows has no row to return.
  if (error.code === '42501') return new AdminError('forbidden');
  if (error.code === 'PGRST116') return new AdminError('not_found');
  const text = (error.message ?? '').toLowerCase();
  if (text.includes('fetch') || text.includes('network')) return new AdminError('network');
  return new AdminError('unknown');
}

function toAdminVenue(row: MembershipRow): AdminVenue {
  return {
    id: row.venue.id,
    slug: row.venue.slug,
    name: row.venue.name,
    isPublished: row.venue.is_published,
    role: row.role === 'admin' ? 'admin' : 'host',
  };
}

function toAdminEvent(row: EventRow): AdminEvent {
  return {
    id: row.id,
    venueId: row.venue_id,
    title: row.title,
    description: row.description,
    lineup: row.lineup ?? [],
    startsAt: new Date(row.starts_at),
    endsAt: row.ends_at ? new Date(row.ends_at) : null,
    priceFromUah: row.price_from_uah,
    status: row.status === 'published' ? 'published' : 'draft',
  };
}

function toAdminOffer(row: OfferRow): AdminOffer {
  return {
    id: row.id,
    eventId: row.event_id,
    title: row.title,
    terms: row.terms,
    maxClaims: row.max_claims,
    perUserLimit: row.per_user_limit,
    validUntil: row.valid_until ? new Date(row.valid_until) : null,
    isActive: row.is_active,
  };
}

function eventColumns(input: Partial<EventInput>) {
  return {
    ...(input.title !== undefined && { title: input.title }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.lineup !== undefined && { lineup: input.lineup }),
    ...(input.startsAt !== undefined && { starts_at: input.startsAt.toISOString() }),
    ...(input.endsAt !== undefined && { ends_at: input.endsAt?.toISOString() ?? null }),
    ...(input.priceFromUah !== undefined && { price_from_uah: input.priceFromUah }),
  };
}

function offerColumns(input: Partial<OfferInput>) {
  return {
    ...(input.title !== undefined && { title: input.title }),
    ...(input.terms !== undefined && { terms: input.terms }),
    ...(input.maxClaims !== undefined && { max_claims: input.maxClaims }),
    ...(input.perUserLimit !== undefined && { per_user_limit: input.perUserLimit }),
    ...(input.validUntil !== undefined && { valid_until: input.validUntil?.toISOString() ?? null }),
  };
}

/** Venues the signed-in user belongs to (including unpublished ones), by name. */
export async function getMyVenues(): Promise<AdminVenue[]> {
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user.id;
  if (!userId) throw new AdminError('unauthenticated');

  const { data, error } = await supabase
    .from('venue_members')
    .select(MEMBERSHIP_COLUMNS)
    .eq('user_id', userId)
    .returns<MembershipRow[]>();

  if (error) throw toAdminError(error);
  return (data ?? []).map(toAdminVenue).sort((a, b) => a.name.localeCompare(b.name));
}

/** Creates a draft event. RLS decides whether the caller may write to this venue. */
export async function createEvent(venueId: string, input: EventInput): Promise<AdminEvent> {
  const { data, error } = await supabase
    .from('events')
    .insert({ ...eventColumns(input), venue_id: venueId, status: 'draft' })
    .select(EVENT_COLUMNS)
    .single<EventRow>();

  if (error) throw toAdminError(error);
  return toAdminEvent(data);
}

export async function updateEvent(
  eventId: string,
  changes: Partial<EventInput>,
): Promise<AdminEvent> {
  const { data, error } = await supabase
    .from('events')
    .update(eventColumns(changes))
    .eq('id', eventId)
    .select(EVENT_COLUMNS)
    .single<EventRow>();

  if (error) throw toAdminError(error);
  return toAdminEvent(data);
}

/** Publishes an event or hides it again as a draft. */
export async function setEventStatus(eventId: string, status: EventStatus): Promise<AdminEvent> {
  const { data, error } = await supabase
    .from('events')
    .update({ status })
    .eq('id', eventId)
    .select(EVENT_COLUMNS)
    .single<EventRow>();

  if (error) throw toAdminError(error);
  return toAdminEvent(data);
}

/** Creates an active offer on an event of the caller's venue. */
export async function createOffer(eventId: string, input: OfferInput): Promise<AdminOffer> {
  const { data, error } = await supabase
    .from('offers')
    .insert({ ...offerColumns(input), event_id: eventId, title: input.title })
    .select(OFFER_COLUMNS)
    .single<OfferRow>();

  if (error) throw toAdminError(error);
  return toAdminOffer(data);
}

export async function updateOffer(
  offerId: string,
  changes: Partial<OfferInput>,
): Promise<AdminOffer> {
  const { data, error } = await supabase
    .from('offers')
    .update(offerColumns(changes))
    .eq('id', offerId)
    .select(OFFER_COLUMNS)
    .single<OfferRow>();

  if (error) throw toAdminError(error);
  return toAdminOffer(data);
}

/** Activates an offer or hides it from guests without deleting its claims. */
export async function setOfferActive(offerId: string, isActive: boolean): Promise<AdminOffer> {
  const { data, error } = await supabase
    .from('offers')
    .update({ is_active: isActive })
    .eq('id', offerId)
    .select(OFFER_COLUMNS)
    .single<OfferRow>();

  if (error) throw toAdminError(error);
  return toAdminOffer(data);
}
