import { useQuery } from '@tanstack/react-query';

import { getPublishedVenues } from '@/services/venues';

import { VENUES_STALE_TIME_MS, venueKeys } from './venueKeys';

/** All published venues. */
export function useVenues() {
  return useQuery({
    queryKey: venueKeys.list(),
    queryFn: getPublishedVenues,
    staleTime: VENUES_STALE_TIME_MS,
  });
}
