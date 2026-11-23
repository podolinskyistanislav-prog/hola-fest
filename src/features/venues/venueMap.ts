import type { Venue } from '@/types/venues';

export type MappableVenue = Venue & { lat: number; lng: number };

/** Venues that have coordinates and can be drawn on the map. */
export function mappableVenues(venues: readonly Venue[]): MappableVenue[] {
  return venues.filter((venue): venue is MappableVenue => venue.lat !== null && venue.lng !== null);
}

export type VenueAccent = 'yellow' | 'pink';

const KNOWN_ACCENTS: Readonly<Record<string, VenueAccent>> = {
  bavovna: 'yellow',
  'panorama-bar': 'pink',
};

/** Accent of a venue: fixed for the launch venues, stable (from the slug) for any future one. */
export function venueAccent(slug: string): VenueAccent {
  const known = KNOWN_ACCENTS[slug];
  if (known) return known;
  let sum = 0;
  for (const char of slug) sum += char.charCodeAt(0);
  return sum % 2 === 0 ? 'yellow' : 'pink';
}

/** Venues whose name contains the query (case-insensitive, surrounding spaces ignored). */
export function filterVenuesByName<T extends { name: string }>(
  venues: readonly T[],
  query: string,
): T[] {
  const needle = query.trim().toLocaleLowerCase('uk');
  if (needle === '') return [...venues];
  return venues.filter((venue) => venue.name.toLocaleLowerCase('uk').includes(needle));
}

/** The earliest event of each venue, by venue id. */
export function firstEventByVenue<T extends { startsAt: Date; venue: { id: string } }>(
  events: readonly T[],
): Map<string, T> {
  const result = new Map<string, T>();
  for (const event of events) {
    const current = result.get(event.venue.id);
    if (!current || event.startsAt < current.startsAt) result.set(event.venue.id, event);
  }
  return result;
}

export interface TodayOffer {
  key: string;
  venueId: string;
  eventId: string;
  eventTitle: string;
  startsAt: Date;
  venueName: string;
  offerTitle: string;
}

/** One entry per offer of today's events, earliest event first, for the "Акції сьогодні" list. */
export function todayOffers(
  events: readonly {
    id: string;
    title: string;
    startsAt: Date;
    venue: { id: string; name: string };
    offers: readonly { id: string; title: string }[];
  }[],
): TodayOffer[] {
  return events
    .flatMap((event) =>
      event.offers.map((offer) => ({
        key: `${event.id}:${offer.id}`,
        venueId: event.venue.id,
        eventId: event.id,
        eventTitle: event.title,
        startsAt: event.startsAt,
        venueName: event.venue.name,
        offerTitle: offer.title,
      })),
    )
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
}

/**
 * The venue whose card is shown: an explicit choice (`null` = dismissed) or, before any choice,
 * the first venue that has an event tonight.
 */
export function resolveSelectedVenueId(
  venues: readonly { id: string }[],
  choice: string | null | undefined,
  eventVenueIds: ReadonlySet<string>,
): string | null {
  if (choice === null) return null;
  if (choice !== undefined) return venues.some((venue) => venue.id === choice) ? choice : null;
  return venues.find((venue) => eventVenueIds.has(venue.id))?.id ?? null;
}
