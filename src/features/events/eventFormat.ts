import type { DayStripDay } from '@/components/ui';
import { t, type TranslationKey } from '@/lib/i18n';
import type { EventSummary } from '@/types/events';

import { localDayKey, startOfWeek } from './eventKeys';

const DAYS_IN_WEEK = 7;

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** "20:00" in the device's local time. */
export function formatEventTime(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** "від 350 ₴", or undefined when the price is unknown. */
export function formatPriceFrom(priceFromUah: number | null): string | undefined {
  if (priceFromUah === null) return undefined;
  return t('events.priceFrom').replace('{price}', String(priceFromUah));
}

/** The seven days (Monday to Sunday) of the week containing `date`, ready for DayStrip. */
export function weekDays(date: Date): DayStripDay[] {
  const monday = startOfWeek(date);
  return Array.from({ length: DAYS_IN_WEEK }, (_, offset) => {
    const day = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + offset);
    const weekday = day.getDay();
    const long = t(`events.weekdayLong.${weekday}` as TranslationKey);
    const month = t(`events.month.${day.getMonth()}` as TranslationKey);
    return {
      id: localDayKey(day),
      weekday: t(`events.weekday.${weekday}` as TranslationKey),
      date: String(day.getDate()),
      accessibilityLabel: `${long}, ${day.getDate()} ${month}`,
    };
  });
}

/** Parses a DayStrip id (local "YYYY-MM-DD") back into a local-midnight Date. */
export function dayFromId(id: string): Date {
  const [year, month, day] = id.split('-').map(Number);
  return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
}

/** Props for EventCard from an event; covers alternate yellow/pink down the list. */
export function eventCardProps(event: EventSummary, index: number) {
  return {
    title: event.title,
    venue: event.venue.name,
    time: formatEventTime(event.startsAt),
    priceFrom: formatPriceFrom(event.priceFromUah),
    coverColor: index % 2 === 0 ? ('yellow' as const) : ('pink' as const),
  };
}
