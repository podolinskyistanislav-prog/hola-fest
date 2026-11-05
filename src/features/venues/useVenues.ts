import { useQuery } from '@tanstack/react-query';

import { getPublishedVenues, getVenueById } from '@/services/venues';

import { VENUES_STALE_TIME_MS, venueKeys } from './venueKeys';

/** All published venues. */
export function useVenues() {
  return useQuery({
    queryKey: venueKeys.list(),
    queryFn: getPublishedVenues,
    staleTime: VENUES_STALE_TIME_MS,
  });
}

/** One published venue with its upcoming events. */
export function useVenue(id: string | undefined) {
  return useQuery({
    queryKey: venueKeys.detail(id ?? ''),
    queryFn: () => getVenueById(id ?? ''),
    enabled: Boolean(id),
    staleTime: VENUES_STALE_TIME_MS,
  });
}
