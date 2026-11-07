import type { DayStripDay } from '@/components/ui';
import { t, type TranslationKey } from '@/lib/i18n';
import {
  addKyivDays,
  endsBeforeCurfew,
  dayKeyParts,
  formatKyivTime,
  kyivDayKey,
  kyivDayStart,
  kyivWeekday,
  kyivWeekStartKey,
} from '@/lib/kyivTime';
import type { EventSummary } from '@/types/events';

const DAYS_IN_WEEK = 7;
const HOME_DAYS = 5;

/** "20:00" in Kyiv time, whatever the device time zone. */
export function formatEventTime(date: Date): string {
  return formatKyivTime(date);
}

/** "20:00 – 23:30", or just "20:00" without an end, in Kyiv time. */
export function formatEventTimeRange(startsAt: Date, endsAt: Date | null): string {
  const start = formatEventTime(startsAt);
  return endsAt ? `${start} – ${formatEventTime(endsAt)}` : start;
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

/** "Сьогодні, 20:00 – 23:30" (or "5 листопада, 20:00" without an end), all in Kyiv time. */
export function formatEventWhen(startsAt: Date, endsAt: Date | null, now: Date): string {
  const day =
    kyivDayKey(startsAt) === kyivDayKey(now) ? t('event.today') : formatEventDay(startsAt);
  return `${day}, ${formatEventTimeRange(startsAt, endsAt)}`;
}

export type CurfewInfo = { label: string; ok: boolean };

/** The curfew chip: a check when the event ends in time, a placeholder otherwise (or when the end is unknown). */
export function curfewInfo(startsAt: Date, endsAt: Date | null): CurfewInfo {
  if (endsAt !== null && endsBeforeCurfew(startsAt, endsAt)) {
    return { label: t('event.curfewOk'), ok: true };
  }
  return { label: t('event.curfewUnknown'), ok: false };
}

/** "Покажи QR на вході до 22:00" from the offer end time. */
export function offerCondition(validUntil: Date): string {
  return t('event.offerCondition').replace('{time}', formatEventTime(validUntil));
}

function dayTile(id: string): DayStripDay {
  const weekday = kyivWeekday(id);
  const { day, month } = dayKeyParts(id);
  const long = t(`events.weekdayLong.${weekday}` as TranslationKey);
  return {
    id,
    weekday: t(`events.weekday.${weekday}` as TranslationKey),
    date: String(day),
    accessibilityLabel: `${long}, ${day} ${t(`events.month.${month}` as TranslationKey)}`,
  };
}

/** The seven days (Monday to Sunday) of the Kyiv week containing `date`, ready for DayStrip. */
export function weekDays(date: Date): DayStripDay[] {
  const monday = kyivWeekStartKey(kyivDayKey(date));
  return Array.from({ length: DAYS_IN_WEEK }, (_, offset) => dayTile(addKyivDays(monday, offset)));
}

/** The five days starting today (Kyiv), with a dot on the days that have events. */
export function homeDays(today: Date, events: readonly EventSummary[]): DayStripDay[] {
  const withEvents = new Set(events.map((event) => kyivDayKey(event.startsAt)));
  const first = kyivDayKey(today);
  return Array.from({ length: HOME_DAYS }, (_, offset) => {
    const id = addKyivDays(first, offset);
    return { ...dayTile(id), hasEvents: withEvents.has(id) };
  });
}

/** Parses a DayStrip id (Kyiv "YYYY-MM-DD") back into the instant that day starts. */
export function dayFromId(id: string): Date {
  return kyivDayStart(id);
}

export type HomeFilterId = 'all' | 'offer' | 'techno' | 'house' | 'rooftop';

export const HOME_FILTER_IDS: readonly HomeFilterId[] = [
  'all',
  'offer',
  'techno',
  'house',
  'rooftop',
];

/** Events matching a home chip: "З офером" = has an active offer, a genre = carries that tag. */
export function filterEvents(
  events: readonly EventSummary[],
  filter: HomeFilterId,
): EventSummary[] {
  if (filter === 'all') return [...events];
  if (filter === 'offer') return events.filter((event) => event.offers.length > 0);
  return events.filter((event) => event.tags?.includes(filter) === true);
}

/** Events on one Kyiv calendar day ("YYYY-MM-DD"). */
export function eventsOnDay(events: readonly EventSummary[], dayId: string): EventSummary[] {
  return events.filter((event) => kyivDayKey(event.startsAt) === dayId);
}

/** "1 подія", "2 події", "5 подій", "11 подій", "21 подія". */
export function formatEventsCount(count: number): string {
  const lastTwo = count % 100;
  const last = count % 10;
  let form: 'one' | 'few' | 'many' = 'many';
  if (last === 1 && lastTwo !== 11) form = 'one';
  else if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) form = 'few';
  return t(`home.eventsCount.${form}`).replace('{count}', String(count));
}

/** "Сьогодні · 2 події" or "Середа · 2 події". */
export function formatDayHeading(dayId: string, today: Date, count: number): string {
  const day =
    dayId === kyivDayKey(today)
      ? t('home.today')
      : t(`events.weekdayLong.${kyivWeekday(dayId)}` as TranslationKey);
  return `${day} · ${formatEventsCount(count)}`;
}

/** Carousel card props; covers alternate yellow/pink, the badge shows the first offer. */
export function carouselCardProps(event: EventSummary, index: number) {
  return {
    title: event.title,
    venue: event.venue.name,
    timeRange: formatEventTimeRange(event.startsAt, event.endsAt),
    priceFrom: formatPriceFrom(event.priceFromUah),
    offerBadge: event.offers[0]?.title,
    coverColor: index % 2 === 0 ? ('yellow' as const) : ('pink' as const),
  };
}

export type WeekOffer = {
  key: string;
  eventId: string;
  title: string;
  dateAndVenue: string;
  offerText: string;
};

/** One row per active offer of the given events (already limited to the next 7 days). */
export function weekOffers(events: readonly EventSummary[]): WeekOffer[] {
  return events.flatMap((event) => {
    const weekday = t(
      `events.weekday.${kyivWeekday(kyivDayKey(event.startsAt))}` as TranslationKey,
    );
    return event.offers.map((offer) => ({
      key: `${event.id}:${offer.id}`,
      eventId: event.id,
      title: event.title,
      dateAndVenue: `${weekday}, ${formatEventDay(event.startsAt)} · ${event.venue.name}`,
      offerText: offer.title,
    }));
  });
}
