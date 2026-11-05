import type { Venue, VenueDetails, VenueEvent } from '@/types/venues';

import { supabase } from './supabase';

export type VenuesErrorCode = 'network' | 'unknown';

/** Generic, safe-to-show error. Never contains server messages. */
export class VenuesError extends Error {
  readonly code: VenuesErrorCode;

  constructor(code: VenuesErrorCode) {
    super(`venues_${code}`);
    this.name = 'VenuesError';
    this.code = code;
  }
}

const VENUE_COLUMNS = 'id, slug, name, address, lat, lng, has_shelter';
const EVENT_COLUMNS = 'id, title, starts_at, ends_at, price_from_uah, cover_path';
const DETAILS_COLUMNS = `${VENUE_COLUMNS}, events(${EVENT_COLUMNS})`;

type VenueRow = {
  id: string;
  slug: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  has_shelter: boolean;
};

type VenueEventRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  price_from_uah: number | null;
  cover_path: string | null;
};

type VenueDetailsRow = VenueRow & { events: VenueEventRow[] | null };

type ClientError = { message?: string };

function toVenuesError(error: ClientError): VenuesError {
  const text = (error.message ?? '').toLowerCase();
  if (text.includes('fetch') || text.includes('network')) return new VenuesError('network');
  return new VenuesError('unknown');
}

function toVenue(row: VenueRow): Venue {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    hasShelter: row.has_shelter,
  };
}

function toVenueEvent(row: VenueEventRow): VenueEvent {
  return {
    id: row.id,
    title: row.title,
    startsAt: new Date(row.starts_at),
    endsAt: row.ends_at ? new Date(row.ends_at) : null,
    priceFromUah: row.price_from_uah,
    coverPath: row.cover_path,
  };
}

/** All published venues (with coordinates when known), sorted by name. */
export async function getPublishedVenues(): Promise<Venue[]> {
  const { data, error } = await supabase
    .from('venues')
    .select(VENUE_COLUMNS)
    .eq('is_published', true)
    .order('name', { ascending: true })
    .returns<VenueRow[]>();

  if (error) throw toVenuesError(error);
  return (data ?? []).map(toVenue);
}

/** One published venue with its upcoming published events, or null if not visible. */
export async function getVenueById(id: string): Promise<VenueDetails | null> {
  const { data, error } = await supabase
    .from('venues')
    .select(DETAILS_COLUMNS)
    .eq('id', id)
    .eq('is_published', true)
    .eq('events.status', 'published')
    .gte('events.starts_at', new Date().toISOString())
    .order('starts_at', { referencedTable: 'events', ascending: true })
    .maybeSingle<VenueDetailsRow>();

  if (error) throw toVenuesError(error);
  if (!data) return null;
  return { ...toVenue(data), upcomingEvents: (data.events ?? []).map(toVenueEvent) };
}
