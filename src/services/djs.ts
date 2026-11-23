import { djSlug, normalizeDjName } from '@/lib/djName';
import type { Dj, DjGig } from '@/types/djs';

import { supabase } from './supabase';

export type DjsErrorCode = 'network' | 'unknown';

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

/** DJs named in the lineup of published events in the next 30 days. */
export async function getUpcomingDjs(now: Date = new Date()): Promise<Dj[]> {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, starts_at, tags, lineup, venue:venues!inner(name), offers(title)')
    .eq('status', 'published')
    .eq('venues.is_published', true)
    .eq('offers.is_active', true)
    .gte('starts_at', now.toISOString())
    .lt('starts_at', new Date(now.getTime() + UPCOMING_DAYS * DAY_MS).toISOString())
    .order('starts_at', { ascending: true })
    .returns<DjEventRow[]>();

  if (error) {
    const text = (error.message ?? '').toLowerCase();
    throw new DjsError(text.includes('fetch') || text.includes('network') ? 'network' : 'unknown');
  }
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

/** One DJ of the upcoming list by slug, or null. */
export async function getDjBySlug(slug: string, now: Date = new Date()): Promise<Dj | null> {
  const djs = await getUpcomingDjs(now);
  return djs.find((dj) => dj.slug === slug) ?? null;
}
