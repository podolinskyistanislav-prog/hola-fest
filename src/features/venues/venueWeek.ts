import { formatEventDay, formatEventTime } from '@/features/events/eventFormat';
import { t, type TranslationKey } from '@/lib/i18n';
import { dayKeyParts, kyivDayKey, kyivWeekday } from '@/lib/kyivTime';
import type { EventSummary } from '@/types/events';

export type VenueWeekDay = {
  dayId: string;
  /** "Сьогодні" or "Пт, 27 листопада". */
  heading: string;
  events: EventSummary[];
};

/** Heading of one Kyiv day: "Сьогодні", or weekday and date. */
export function venueDayHeading(dayId: string, startsAt: Date, now: Date): string {
  if (dayId === kyivDayKey(now)) return t('event.today');
  const weekday = t(`events.weekday.${kyivWeekday(dayId)}` as TranslationKey);
  return `${weekday}, ${formatEventDay(startsAt)}`;
}

/** This venue's events grouped by Kyiv day, earliest day (and event) first. */
export function groupVenueWeek(
  events: readonly EventSummary[],
  venueId: string,
  now: Date,
): VenueWeekDay[] {
  const days = new Map<string, VenueWeekDay>();
  const own = events
    .filter((event) => event.venue.id === venueId)
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  for (const event of own) {
    const dayId = kyivDayKey(event.startsAt);
    const day = days.get(dayId) ?? {
      dayId,
      heading: venueDayHeading(dayId, event.startsAt, now),
      events: [],
    };
    day.events.push(event);
    days.set(dayId, day);
  }
  return [...days.values()];
}

/** GigRow props for one event of the venue week; the pill shows the first offer. */
export function venueEventRowProps(event: EventSummary) {
  const { day, month } = dayKeyParts(kyivDayKey(event.startsAt));
  return {
    day: String(day),
    month: t(`djs.month.${month}` as TranslationKey),
    title: event.title,
    venue: event.venue.name,
    time: formatEventTime(event.startsAt),
    offerText: event.offers[0]?.title ?? null,
  };
}

/** Instagram link only when it is a plain https URL. */
export function safeInstagramUrl(url: string | null): string | null {
  return url !== null && /^https:\/\//.test(url) ? url : null;
}

/** A venue cover image only when it is an https URL. */
export function venueCoverUri(coverPath: string | null): string | undefined {
  return coverPath !== null && /^https:\/\//.test(coverPath) ? coverPath : undefined;
}
