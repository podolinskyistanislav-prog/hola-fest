import { useQuery } from '@tanstack/react-query';

import { getMyVenues, listVenueEvents, type AdminEventListItem } from '@/services/admin';
import type { AdminVenue } from '@/types/admin';

import { myVenuesQueryKey } from './useStaffAccess';

export type UseAdminVenueEvents = {
  venue: AdminVenue | null;
  events: AdminEventListItem[];
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
};

export const venueEventsQueryKey = (venueId: string) => ['staff', 'venue-events', venueId] as const;

type Services = { fetchVenues: typeof getMyVenues; fetchEvents: typeof listVenueEvents };

const defaultServices: Services = { fetchVenues: getMyVenues, fetchEvents: listVenueEvents };

/** Events (drafts included) of the first venue the caller administers. The server enforces access. */
export function useAdminVenueEvents({
  fetchVenues,
  fetchEvents,
}: Services = defaultServices): UseAdminVenueEvents {
  const venues = useQuery({ queryKey: myVenuesQueryKey, queryFn: fetchVenues });
  const venue = venues.data?.find((candidate) => candidate.role === 'admin') ?? null;
  const venueId = venue?.id ?? '';
  const events = useQuery({
    queryKey: venueEventsQueryKey(venueId),
    queryFn: () => fetchEvents(venueId),
    enabled: venue !== null,
  });

  return {
    venue,
    events: events.data ?? [],
    isLoading: venues.isPending || (venue !== null && events.isPending),
    isError: venues.isError || events.isError,
    retry: () => void (venues.isError ? venues.refetch() : events.refetch()),
  };
}
