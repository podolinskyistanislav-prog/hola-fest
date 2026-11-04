export function localDayKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Monday 00:00 local time of the week containing `date`. */
export function startOfWeek(date: Date): Date {
  const daysSinceMonday = (date.getDay() + 6) % 7;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysSinceMonday);
}

export function endOfWeek(date: Date): Date {
  const start = startOfWeek(date);
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
}

export const eventKeys = {
  all: ['events'] as const,
  day: (date: Date) => [...eventKeys.all, 'day', localDayKey(date)] as const,
  week: (date: Date) => [...eventKeys.all, 'week', localDayKey(startOfWeek(date))] as const,
  detail: (id: string) => [...eventKeys.all, 'detail', id] as const,
};

export const EVENTS_STALE_TIME_MS = 5 * 60_000;
