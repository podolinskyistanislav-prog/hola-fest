import type { DjGig, MyDjProfile, MyDjProfileInput } from '@/types/djs';

import { DjsError, toDjsError } from './djs';
import { supabase } from './supabase';

const MEDIA_BUCKET = 'dj-media';
const PROFILE_COLUMNS =
  'id, slug, stage_name, bio, genres, photo_path, cover_path, instagram_url, soundcloud_url, is_published';

type ProfileRow = {
  id: string;
  slug: string;
  stage_name: string;
  bio: string | null;
  genres: string[] | null;
  photo_path: string | null;
  cover_path: string | null;
  instagram_url: string | null;
  soundcloud_url: string | null;
  is_published: boolean;
};

type GigRow = {
  event: {
    id: string;
    title: string;
    starts_at: string;
    status: string;
    venue: { name: string } | null;
    offers: { title: string; is_active: boolean }[] | null;
  } | null;
};

function toProfile(row: ProfileRow): MyDjProfile {
  return {
    id: row.id,
    slug: row.slug,
    stageName: row.stage_name,
    bio: row.bio,
    genres: row.genres ?? [],
    photoPath: row.photo_path,
    coverPath: row.cover_path,
    instagramUrl: row.instagram_url,
    soundcloudUrl: row.soundcloud_url,
    isPublished: row.is_published,
  };
}

/** The signed-in DJ's own profile (published or not), or null when they have none. RLS limits rows. */
export async function getMyDjProfile(userId: string): Promise<MyDjProfile | null> {
  const { data, error } = await supabase
    .from('djs')
    .select(PROFILE_COLUMNS)
    .eq('user_id', userId)
    .maybeSingle<ProfileRow>();
  if (error) throw toDjsError(error);
  return data ? toProfile(data) : null;
}

function toUpdate(input: MyDjProfileInput) {
  return {
    ...(input.stageName !== undefined && { stage_name: input.stageName }),
    ...(input.bio !== undefined && { bio: input.bio }),
    ...(input.genres !== undefined && { genres: input.genres }),
    ...(input.photoPath !== undefined && { photo_path: input.photoPath }),
    ...(input.coverPath !== undefined && { cover_path: input.coverPath }),
    ...(input.instagramUrl !== undefined && { instagram_url: input.instagramUrl }),
    ...(input.soundcloudUrl !== undefined && { soundcloud_url: input.soundcloudUrl }),
  };
}

/** Updates the editable fields. The server (RLS + trigger) decides who may; slug/publishing never sent. */
export async function updateMyDjProfile(
  profileId: string,
  input: MyDjProfileInput,
): Promise<MyDjProfile> {
  const { data, error } = await supabase
    .from('djs')
    .update(toUpdate(input))
    .eq('id', profileId)
    .select(PROFILE_COLUMNS)
    .maybeSingle<ProfileRow>();
  if (error) throw toDjsError(error);
  // RLS hides rows the caller may not update: zero rows means "not allowed".
  if (!data) throw new DjsError('forbidden');
  return toProfile(data);
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** Uploads an already resized JPEG into the DJ's folder of `dj-media` and returns its path. */
export async function uploadDjFile(
  profileId: string,
  fileUri: string,
  prefix: string,
): Promise<string> {
  const path = `${profileId}/${prefix}-${Date.now()}-${randomSuffix()}.jpg`;
  try {
    const blob = await (await fetch(fileUri)).blob();
    const { error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(path, blob, { contentType: 'image/jpeg' });
    if (error) throw toDjsError(error);
  } catch (error) {
    throw error instanceof DjsError ? error : toDjsError(error as { message?: string });
  }
  return path;
}

/** Upcoming published gigs of a DJ profile, earliest first (from `event_djs`). */
export async function getMyGigs(profileId: string, now: Date = new Date()): Promise<DjGig[]> {
  const { data, error } = await supabase
    .from('event_djs')
    .select(
      'event:events(id, title, starts_at, status, venue:venues(name), offers(title, is_active))',
    )
    .eq('dj_id', profileId)
    .returns<GigRow[]>();
  if (error) throw toDjsError(error);
  const gigs: DjGig[] = [];
  for (const { event } of data ?? []) {
    if (!event || event.status !== 'published' || !event.venue) continue;
    const startsAt = new Date(event.starts_at);
    if (startsAt < now) continue;
    gigs.push({
      eventId: event.id,
      title: event.title,
      startsAt,
      venueName: event.venue.name,
      offerTitle: event.offers?.find((offer) => offer.is_active)?.title ?? null,
    });
  }
  return gigs.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
}
