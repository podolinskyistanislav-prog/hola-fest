import type { DayStripDay } from '@/components/ui';
import { t, type TranslationKey } from '@/lib/i18n';
import {
  addKyivDays,
  dayKeyParts,
  formatKyivTime,
  kyivDayKey,
  kyivDayStart,
  kyivWeekday,
  kyivWeekStartKey,
} from '@/lib/kyivTime';
import type { EventSummary } from '@/types/events';

const DAYS_IN_WEEK = 7;

/** "20:00" in Kyiv time, whatever the device time zone. */
export function formatEventTime(date: Date): string {
  return formatKyivTime(date);
}

/** "5 листопада" for the Kyiv calendar day the instant falls on. */
export function formatEventDay(date: Date): string {
  const { day, month } = dayKeyParts(kyivDayKey(date));
  return `${day} ${t(`events.month.${month}` as TranslationKey)}`;
}

/** "від 350 ₴", or undefined when the price is unknown. */
export function formatPriceFrom(priceFromUah: number | null): string | undefined {
  if (priceFromUah === null) return undefined;
  return t('events.priceFrom').replace('{price}', String(priceFromUah));
}

/** The seven days (Monday to Sunday) of the Kyiv week containing `date`, ready for DayStrip. */
export function weekDays(date: Date): DayStripDay[] {
  const monday = kyivWeekStartKey(kyivDayKey(date));
  return Array.from({ length: DAYS_IN_WEEK }, (_, offset) => {
    const id = addKyivDays(monday, offset);
    const weekday = kyivWeekday(id);
    const { day, month } = dayKeyParts(id);
    const long = t(`events.weekdayLong.${weekday}` as TranslationKey);
    return {
      id,
      weekday: t(`events.weekday.${weekday}` as TranslationKey),
      date: String(day),
      accessibilityLabel: `${long}, ${day} ${t(`events.month.${month}` as TranslationKey)}`,
    };
  });
}

/** Parses a DayStrip id (Kyiv "YYYY-MM-DD") back into the instant that day starts. */
export function dayFromId(id: string): Date {
  return kyivDayStart(id);
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
