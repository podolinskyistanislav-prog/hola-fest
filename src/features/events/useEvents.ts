import { useQuery } from '@tanstack/react-query';

import { getEventById, getEventsForDay, getEventsForRange } from '@/services/events';

import { endOfWeek, EVENTS_STALE_TIME_MS, eventKeys, startOfWeek } from './eventKeys';

export function useEventsForDay(date: Date) {
  return useQuery({
    queryKey: eventKeys.day(date),
    queryFn: () => getEventsForDay(date),
    staleTime: EVENTS_STALE_TIME_MS,
  });
}

/** Events in the Monday-to-Sunday week containing `date`. */
export function useEventsForWeek(date: Date) {
  return useQuery({
    queryKey: eventKeys.week(date),
    queryFn: () => getEventsForRange(startOfWeek(date), endOfWeek(date)),
    staleTime: EVENTS_STALE_TIME_MS,
  });
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: eventKeys.detail(id ?? ''),
    queryFn: () => getEventById(id ?? ''),
    enabled: Boolean(id),
    staleTime: EVENTS_STALE_TIME_MS,
  });
}
