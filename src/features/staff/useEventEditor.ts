import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createEvent,
  getMyVenues,
  getVenueEvent,
  setEventStatus,
  updateEvent,
} from '@/services/admin';
import type { AdminEvent } from '@/types/admin';

import type { EventSubmission } from './eventFormValidation';
import { venueEventsQueryKey } from './useAdminVenueEvents';
import { myVenuesQueryKey } from './useStaffAccess';

export type UseEventEditor = {
  /** The event being edited; null when creating or while loading. */
  event: AdminEvent | null;
  isLoading: boolean;
  isLoadError: boolean;
  isSaving: boolean;
  isSaveError: boolean;
  retry: () => void;
  /** Saves the event; resolves true on success. */
  save: (submission: EventSubmission) => Promise<boolean>;
};

type Services = {
  fetchVenues: typeof getMyVenues;
  fetchEvent: typeof getVenueEvent;
  create: typeof createEvent;
  update: typeof updateEvent;
  changeStatus: typeof setEventStatus;
};

const defaultServices: Services = {
  fetchVenues: getMyVenues,
  fetchEvent: getVenueEvent,
  create: createEvent,
  update: updateEvent,
  changeStatus: setEventStatus,
};

export const venueEventQueryKey = (eventId: string) => ['staff', 'venue-event', eventId] as const;

/** Loads one event (when editing) and saves a new or changed one. The server enforces access. */
export function useEventEditor(
  eventId?: string,
  { fetchVenues, fetchEvent, create, update, changeStatus }: Services = defaultServices,
): UseEventEditor {
  const client = useQueryClient();
  const venues = useQuery({ queryKey: myVenuesQueryKey, queryFn: fetchVenues });
  const existing = useQuery({
    queryKey: venueEventQueryKey(eventId ?? ''),
    queryFn: () => fetchEvent(eventId ?? ''),
    enabled: eventId !== undefined,
  });

  const mutation = useMutation({
    mutationFn: async ({ input, status }: EventSubmission) => {
      if (eventId !== undefined) {
        const saved = await update(eventId, input);
        return saved.status === status ? saved : changeStatus(eventId, status);
      }
      const venue = venues.data?.find((candidate) => candidate.role === 'admin');
      if (!venue) throw new Error('no_admin_venue');
      const created = await create(venue.id, input);
      return status === 'published' ? changeStatus(created.id, status) : created;
    },
    onSuccess: (saved) => {
      void client.invalidateQueries({ queryKey: venueEventsQueryKey(saved.venueId) });
      client.setQueryData(venueEventQueryKey(saved.id), saved);
    },
  });

  const loading = eventId === undefined ? venues.isPending : existing.isPending;
  const loadFailed = eventId === undefined ? venues.isError : existing.isError;

  return {
    event: existing.data ?? null,
    isLoading: loading,
    isLoadError: loadFailed,
    isSaving: mutation.isPending,
    isSaveError: mutation.isError,
    retry: () => void (eventId === undefined ? venues.refetch() : existing.refetch()),
    save: async (submission) => {
      try {
        await mutation.mutateAsync(submission);
        return true;
      } catch {
        return false;
      }
    },
  };
}
