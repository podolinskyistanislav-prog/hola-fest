import { djSlug, normalizeDjName } from '@/lib/djName';
import type { Dj, DjGig } from '@/types/djs';

import { supabase } from './supabase';

export type DjsErrorCode = 'forbidden' | 'no_profile' | 'network' | 'unknown';

/** Generic, safe-to-show error. Never contains server messages. */
export class DjsError extends Error {
  readonly code: DjsErrorCode;

  constructor(code: DjsErrorCode) {
    super(`djs_${code}`);
    this.name = 'DjsError';
    this.code = code;
  }
}

const UPCOMING_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

type DjEventRow = {
  id: string;
  title: string;
  starts_at: string;
  tags: string[] | null;
  lineup: string[] | null;
  venue: { name: string };
  offers: { title: string }[] | null;
};

export type LineupEvent = {
  eventId: string;
  title: string;
  startsAt: Date;
  venueName: string;
  tags: string[];
  lineup: string[];
  offerTitle: string | null;
};

/**
 * Builds the DJ list from events: names are normalised and deduped by slug (first spelling wins),
 * genres are the events' tags, gigs are sorted by date. DJs are sorted by next gig, then name.
 */
export function groupDjs(events: readonly LineupEvent[]): Dj[] {
  const bySlug = new Map<string, Dj>();
  for (const event of events) {
    const seenInEvent = new Set<string>();
    for (const raw of event.lineup) {
      const name = normalizeDjName(raw);
      const slug = djSlug(name);
      if (slug === '' || seenInEvent.has(slug)) continue;
      seenInEvent.add(slug);
      const dj = bySlug.get(slug) ?? { slug, name, genres: [], gigs: [] };
      const gig: DjGig = {
        eventId: event.eventId,
        title: event.title,
        startsAt: event.startsAt,
        venueName: event.venueName,
        offerTitle: event.offerTitle,
      };
      dj.gigs.push(gig);
      for (const tag of event.tags) if (!dj.genres.includes(tag)) dj.genres.push(tag);
      bySlug.set(slug, dj);
    }
  }
  const djs = [...bySlug.values()];
  for (const dj of djs) dj.gigs.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  return djs.sort(
    (a, b) =>
      (a.gigs[0]?.startsAt.getTime() ?? 0) - (b.gigs[0]?.startsAt.getTime() ?? 0) ||
      a.name.localeCompare(b.name, 'uk'),
  );
}

type ProfileGigRow = {
  event: {
    id: string;
    title: string;
    starts_at: string;
    status: string;
    venue: { name: string; is_published: boolean } | null;
    offers: { title: string; is_active: boolean }[] | null;
  } | null;
};

type ProfileRow = {
  slug: string;
  stage_name: string;
  bio: string | null;
  genres: string[] | null;
  photo_path: string | null;
  cover_path: string | null;
  instagram_url: string | null;
  soundcloud_url: string | null;
  event_djs: ProfileGigRow[] | null;
};

const PROFILE_SELECT =
  'slug, stage_name, bio, genres, photo_path, cover_path, instagram_url, soundcloud_url, ' +
  'event_djs(event:events(id, title, starts_at, status, venue:venues(name, is_published), offers(title, is_active)))';

/** Maps a client error to a generic one that is safe to show. */
export function toDjsError(error: { message?: string }): DjsError {
  const text = (error.message ?? '').toLowerCase();
  return new DjsError(text.includes('fetch') || text.includes('network') ? 'network' : 'unknown');
}

/** Public URL of a file in the dj-media bucket. */
export function djMediaUrl(path: string): string {
  return supabase.storage.from('dj-media').getPublicUrl(path).data.publicUrl;
}

/** Gigs of event links that are published, at a published venue and start in [from, to). */
export function profileGigs(links: readonly ProfileGigRow[], from: Date, to: Date): DjGig[] {
  const gigs: DjGig[] = [];
  for (const { event } of links) {
    if (!event || event.status !== 'published' || !event.venue?.is_published) continue;
    const startsAt = new Date(event.starts_at);
    if (startsAt < from || startsAt >= to) continue;
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

function toProfileDj(row: ProfileRow, from: Date, to: Date): Dj {
  return {
    slug: row.slug,
    name: row.stage_name,
    genres: row.genres ?? [],
    gigs: profileGigs(row.event_djs ?? [], from, to),
    photoUrl: row.photo_path ? djMediaUrl(row.photo_path) : null,
    coverUrl: row.cover_path ? djMediaUrl(row.cover_path) : null,
    bio: row.bio,
    instagramUrl: row.instagram_url,
    soundcloudUrl: row.soundcloud_url,
  };
}

function byNextGigThenName(a: Dj, b: Dj): number {
  const next = (dj: Dj) => dj.gigs[0]?.startsAt.getTime() ?? Number.POSITIVE_INFINITY;
  const left = next(a);
  const right = next(b);
  if (left !== right) return left < right ? -1 : 1;
  return a.name.localeCompare(b.name, 'uk');
}

/**
 * Published profiles first-class, lineup-text names as fallback: a lineup name that matches a profile
 * (by its slug or by the slug of its stage name) adds its gigs and genres to that profile;
 * any other name stays as before. Gigs are deduped by event.
 */
export function mergeProfilesWithLineup(profiles: readonly Dj[], lineupDjs: readonly Dj[]): Dj[] {
  const merged = profiles.map((profile) => ({
    ...profile,
    genres: [...profile.genres],
    gigs: [...profile.gigs],
  }));
  const bySlug = new Map<string, Dj>();
  for (const dj of merged) {
    bySlug.set(dj.slug, dj);
    const nameSlug = djSlug(dj.name);
    if (nameSlug !== '' && !bySlug.has(nameSlug)) bySlug.set(nameSlug, dj);
  }
  const fallback: Dj[] = [];
  for (const lineup of lineupDjs) {
    const target = bySlug.get(lineup.slug);
    if (!target) {
      fallback.push(lineup);
      continue;
    }
    const known = new Set(target.gigs.map((gig) => gig.eventId));
    for (const gig of lineup.gigs) if (!known.has(gig.eventId)) target.gigs.push(gig);
    for (const genre of lineup.genres)
      if (!target.genres.includes(genre)) target.genres.push(genre);
    target.gigs.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  }
  return [...merged, ...fallback].sort(byNextGigThenName);
}

async function getLineupTextDjs(from: Date, to: Date): Promise<Dj[]> {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, starts_at, tags, lineup, venue:venues!inner(name), offers(title)')
    .eq('status', 'published')
    .eq('venues.is_published', true)
    .eq('offers.is_active', true)
    .gte('starts_at', from.toISOString())
    .lt('starts_at', to.toISOString())
    .order('starts_at', { ascending: true })
    .returns<DjEventRow[]>();

  if (error) throw toDjsError(error);
  return groupDjs(
    (data ?? []).map((row) => ({
      eventId: row.id,
      title: row.title,
      startsAt: new Date(row.starts_at),
      venueName: row.venue.name,
      tags: row.tags ?? [],
      lineup: row.lineup ?? [],
      offerTitle: row.offers?.[0]?.title ?? null,
    })),
  );
}

async function getPublishedProfileDjs(from: Date, to: Date): Promise<Dj[]> {
  const { data, error } = await supabase
    .from('djs')
    .select(PROFILE_SELECT)
    .eq('is_published', true)
    .returns<ProfileRow[]>();
  if (error) throw toDjsError(error);
  return (data ?? []).map((row) => toProfileDj(row, from, to));
}

/**
 * Published DJ profiles (photo, bio, links, gigs from `event_djs`) plus names that only appear in
 * the lineup text of published events in the next 30 days.
 */
export async function getUpcomingDjs(now: Date = new Date()): Promise<Dj[]> {
  const to = new Date(now.getTime() + UPCOMING_DAYS * DAY_MS);
  const [profiles, lineupDjs] = await Promise.all([
    getPublishedProfileDjs(now, to),
    getLineupTextDjs(now, to),
  ]);
  return mergeProfilesWithLineup(profiles, lineupDjs);
}

/** One DJ of the upcoming list by slug, or null. */
export async function getDjBySlug(slug: string, now: Date = new Date()): Promise<Dj | null> {
  const djs = await getUpcomingDjs(now);
  return djs.find((dj) => dj.slug === slug) ?? null;
}

/** Publishes or unpublishes the signed-in DJ's own profile. The server enforces ownership. */
export async function setMyDjPublished(published: boolean): Promise<void> {
  const { error } = await supabase.rpc('set_my_dj_published', { p_published: published });
  if (!error) return;
  if (error.code === '42501') throw new DjsError('forbidden');
  if (error.code === 'P0002') throw new DjsError('no_profile');
  throw toDjsError(error);
}
