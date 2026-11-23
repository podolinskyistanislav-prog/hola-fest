import { venueAccent, type MappableVenue } from '@/features/venues/venueMap';

import type { MapVenue } from './mapMessages';

/** The part of each venue the map page needs. */
export function toMapVenues(venues: readonly MappableVenue[]): MapVenue[] {
  return venues.map((venue) => ({
    id: venue.id,
    name: venue.name,
    lat: venue.lat,
    lng: venue.lng,
    accent: venueAccent(venue.slug),
  }));
}
