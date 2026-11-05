import type { Venue } from '@/types/venues';

export type MappableVenue = Venue & { lat: number; lng: number };

/** Camera start: central Kyiv. */
export const KYIV_REGION = {
  latitude: 50.4501,
  longitude: 30.5234,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

/** Venues that have coordinates and can be drawn on the map. */
export function mappableVenues(venues: readonly Venue[]): MappableVenue[] {
  return venues.filter((venue): venue is MappableVenue => venue.lat !== null && venue.lng !== null);
}
