import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createEvent,
  getMyVenues,
  getVenueEvent,
  setEventStatus,
  updateEvent,
} from '@/services/admin';
import { getEventDjs, setEventDjs } from '@/services/eventDjs';
import type { AdminEvent } from '@/types/admin';
import type { DjOption } from '@/types/djs';

import type { EventSubmission } from './eventFormValidation';
import { venueEventsQueryKey } from './useAdminVenueEvents';
import { myVenuesQueryKey } from './useStaffAccess';

export type UseEventEditor = {
  /** The event being edited; null when creating or while loading. */
  event: AdminEvent | null;
  /** Platform DJs linked to the event being edited, in lineup order. */
  lineupDjs: DjOption[];
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
  fetchDjs: typeof getEventDjs;
  replaceDjs: typeof setEventDjs;
};

const defaultServices: Services = {
  fetchDjs: getEventDjs,
  replaceDjs: setEventDjs,
  fetchVenues: getMyVenues,
  fetchEvent: getVenueEvent,
  create: createEvent,
  update: updateEvent,
  changeStatus: setEventStatus,
};

export const venueEventQueryKey = (eventId: string) => ['staff', 'venue-event', eventId] as const;
export const eventDjsQueryKey = (eventId: string) => ['staff', 'event-djs', eventId] as const;

/** Loads one event (when editing) and saves a new or changed one. The server enforces access. */
export function useEventEditor(
  eventId?: string,
  {
    fetchVenues,
    fetchEvent,
    create,
    update,
    changeStatus,
    fetchDjs,
    replaceDjs,
  }: Services = defaultServices,
): UseEventEditor {
  const client = useQueryClient();
  const venues = useQuery({ queryKey: myVenuesQueryKey, queryFn: fetchVenues });
  const existing = useQuery({
    queryKey: venueEventQueryKey(eventId ?? ''),
    queryFn: () => fetchEvent(eventId ?? ''),
    enabled: eventId !== undefined,
  });

  const lineupDjs = useQuery({
    queryKey: eventDjsQueryKey(eventId ?? ''),
    queryFn: () => fetchDjs(eventId ?? ''),
    enabled: eventId !== undefined,
  });

  const mutation = useMutation({
    mutationFn: async ({ input, status, djIds }: EventSubmission) => {
      const saveEvent = async () => {
        if (eventId !== undefined) {
          const saved = await update(eventId, input);
          return saved.status === status ? saved : changeStatus(eventId, status);
        }
        const venue = venues.data?.find((candidate) => candidate.role === 'admin');
        if (!venue) throw new Error('no_admin_venue');
        const created = await create(venue.id, input);
        return status === 'published' ? changeStatus(created.id, status) : created;
      };
      const saved = await saveEvent();
      await replaceDjs(saved.id, djIds);
      return saved;
    },
    onSuccess: (saved) => {
      void client.invalidateQueries({ queryKey: venueEventsQueryKey(saved.venueId) });
      void client.invalidateQueries({ queryKey: eventDjsQueryKey(saved.id) });
      client.setQueryData(venueEventQueryKey(saved.id), saved);
    },
  });

  const loading =
    eventId === undefined ? venues.isPending : existing.isPending || lineupDjs.isPending;
  const loadFailed = eventId === undefined ? venues.isError : existing.isError || lineupDjs.isError;

  return {
    event: existing.data ?? null,
    lineupDjs: lineupDjs.data ?? [],
    isLoading: loading,
    isLoadError: loadFailed,
    isSaving: mutation.isPending,
    isSaveError: mutation.isError,
    retry: () =>
      void (eventId === undefined
        ? venues.refetch()
        : Promise.all([existing.refetch(), lineupDjs.refetch()])),
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
