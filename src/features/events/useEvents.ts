import { useQuery } from '@tanstack/react-query';

import { addKyivDays, kyivDayKey, kyivDayStart } from '@/lib/kyivTime';
import { getEventById, getEventsForRange } from '@/services/events';

import { dayRange, endOfWeek, EVENTS_STALE_TIME_MS, eventKeys, startOfWeek } from './eventKeys';

/** Events on the Kyiv calendar day containing `date`. */
export function useEventsForDay(date: Date) {
  return useQuery({
    queryKey: eventKeys.day(date),
    queryFn: () => {
      const { from, to } = dayRange(kyivDayKey(date));
      return getEventsForRange(from, to);
    },
    staleTime: EVENTS_STALE_TIME_MS,
  });
}

/** Events from today (Kyiv) through the next 7 days: feeds the home strip, carousel and week offers. */
export function useHomeEvents(today: Date) {
  return useQuery({
    queryKey: eventKeys.home(today),
    queryFn: () => {
      const first = kyivDayKey(today);
      return getEventsForRange(kyivDayStart(first), kyivDayStart(addKyivDays(first, 7)));
    },
    staleTime: EVENTS_STALE_TIME_MS,
  });
}

/** Events in the Monday-to-Sunday (Kyiv) week containing `date`. */
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
