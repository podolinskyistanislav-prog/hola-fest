import { addKyivDays, kyivDayKey, kyivDayStart, kyivWeekStartKey } from '@/lib/kyivTime';

/** Monday 00:00 Kyiv time of the Kyiv week containing `date`. */
export function startOfWeek(date: Date): Date {
  return kyivDayStart(kyivWeekStartKey(kyivDayKey(date)));
}

/** The following Monday 00:00 Kyiv time. */
export function endOfWeek(date: Date): Date {
  return kyivDayStart(addKyivDays(kyivWeekStartKey(kyivDayKey(date)), 7));
}

/** Start and end (exclusive) of the Kyiv calendar day with the given "YYYY-MM-DD" key. */
export function dayRange(key: string): { from: Date; to: Date } {
  return { from: kyivDayStart(key), to: kyivDayStart(addKyivDays(key, 1)) };
}

export const eventKeys = {
  all: ['events'] as const,
  day: (date: Date) => [...eventKeys.all, 'day', kyivDayKey(date)] as const,
  home: (date: Date) => [...eventKeys.all, 'home', kyivDayKey(date)] as const,
  week: (date: Date) => [...eventKeys.all, 'week', kyivWeekStartKey(kyivDayKey(date))] as const,
  detail: (id: string) => [...eventKeys.all, 'detail', id] as const,
};

export const EVENTS_STALE_TIME_MS = 5 * 60_000;
