import type { EventDetails, EventOffer, EventSummary, EventVenue } from '@/types/events';

import { supabase } from './supabase';

export type EventsErrorCode = 'invalid_range' | 'network' | 'unknown';

/** Generic, safe-to-show error. Never contains server messages. */
export class EventsError extends Error {
  readonly code: EventsErrorCode;

  constructor(code: EventsErrorCode) {
    super(`events_${code}`);
    this.name = 'EventsError';
    this.code = code;
  }
}

const VENUE_COLUMNS = 'id, slug, name, address, lat, lng, has_shelter, instagram_url';
const OFFER_COLUMNS = 'id, title, terms, valid_until';
const EVENT_COLUMNS = `id, title, starts_at, ends_at, price_from_uah, cover_path, tags, venue:venues!inner(${VENUE_COLUMNS})`;

/** `offers!inner` drops events without a matching offer; plain `offers` keeps them with an empty list. */
function summaryColumns(onlyWithOffers: boolean): string {
  return `${EVENT_COLUMNS}, ${onlyWithOffers ? 'offers!inner' : 'offers'}(${OFFER_COLUMNS})`;
}

type VenueRow = {
  id: string;
  slug: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  has_shelter: boolean;
  instagram_url: string | null;
};

type OfferRow = { id: string; title: string; terms: string | null; valid_until: string | null };

type EventSummaryRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  price_from_uah: number | null;
  cover_path: string | null;
  tags: string[] | null;
  venue: VenueRow;
  offers: OfferRow[] | null;
};

type EventDetailsRow = EventSummaryRow & {
  description: string | null;
  lineup: string[] | null;
};

type ClientError = { message?: string };

function toEventsError(error: ClientError): EventsError {
  const text = (error.message ?? '').toLowerCase();
  if (text.includes('fetch') || text.includes('network')) return new EventsError('network');
  return new EventsError('unknown');
}

function toVenue(row: VenueRow): EventVenue {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    hasShelter: row.has_shelter,
    instagramUrl: row.instagram_url,
  };
}

function toOffer(row: OfferRow): EventOffer {
  return {
    id: row.id,
    title: row.title,
    terms: row.terms,
    validUntil: row.valid_until ? new Date(row.valid_until) : null,
  };
}

function toSummary(row: EventSummaryRow): EventSummary {
  return {
    id: row.id,
    title: row.title,
    startsAt: new Date(row.starts_at),
    endsAt: row.ends_at ? new Date(row.ends_at) : null,
    priceFromUah: row.price_from_uah,
    coverPath: row.cover_path,
    tags: row.tags ?? [],
    venue: toVenue(row.venue),
    offers: (row.offers ?? []).map(toOffer),
  };
}

function toDetails(row: EventDetailsRow): EventDetails {
  return {
    ...toSummary(row),
    description: row.description,
    lineup: row.lineup ?? [],
  };
}

export type EventsFilter = {
  /** Only events carrying this genre tag, e.g. `techno`. */
  tag?: string;
  /** Only events with at least one active offer. */
  hasActiveOffer?: boolean;
};

/**
 * Published events of published venues starting in [from, to), earliest first,
 * optionally narrowed by genre tag and/or "has an active offer".
 */
export async function getEventsForRange(
  from: Date,
  to: Date,
  filter: EventsFilter = {},
): Promise<EventSummary[]> {
  if (!(from < to)) throw new EventsError('invalid_range');

  let query = supabase
    .from('events')
    .select(summaryColumns(filter.hasActiveOffer === true))
    .eq('status', 'published')
    .eq('venues.is_published', true)
    .eq('offers.is_active', true);
  if (filter.tag) query = query.contains('tags', [filter.tag]);

  const { data, error } = await query
    .gte('starts_at', from.toISOString())
    .lt('starts_at', to.toISOString())
    .order('starts_at', { ascending: true })
    .returns<EventSummaryRow[]>();

  if (error) throw toEventsError(error);
  return (data ?? []).map(toSummary);
}

/** One published event with its venue and active offers, or null if not visible. */
export async function getEventById(id: string): Promise<EventDetails | null> {
  const { data, error } = await supabase
    .from('events')
    .select(`${summaryColumns(false)}, description, lineup`)
    .eq('id', id)
    .eq('status', 'published')
    .eq('venues.is_published', true)
    .eq('offers.is_active', true)
    .maybeSingle<EventDetailsRow>();

  if (error) throw toEventsError(error);
  return data ? toDetails(data) : null;
}
