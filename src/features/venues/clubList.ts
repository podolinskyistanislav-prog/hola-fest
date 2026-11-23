import { formatEventsCount, formatEventTime } from '@/features/events/eventFormat';
import { t } from '@/lib/i18n';
import { kyivDayKey } from '@/lib/kyivTime';
import type { EventSummary } from '@/types/events';
import type { Venue } from '@/types/venues';

import { venueAccent, type VenueAccent } from './venueMap';

export type ClubRow = {
  id: string;
  name: string;
  address: string;
  eventLine: string;
  accent: VenueAccent;
  hasEventToday: boolean;
};

/**
 * Home "Клуби" list: venues with an event today first, then alphabetical.
 * The line shows tonight's event, else the number of events this week, else a placeholder.
 */
export function clubRows(
  venues: readonly Venue[],
  events: readonly EventSummary[],
  now: Date,
): ClubRow[] {
  const todayKey = kyivDayKey(now);
  const rows = venues.map((venue) => {
    const own = events
      .filter((event) => event.venue.id === venue.id)
      .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
    const tonight = own.find((event) => kyivDayKey(event.startsAt) === todayKey);
    let eventLine = t('home.clubNoEvents');
    if (tonight) {
      eventLine = `${t('map.today')} ${tonight.title} · ${formatEventTime(tonight.startsAt)}`;
    } else if (own.length > 0) {
      eventLine = t('home.clubWeekEvents').replace('{count}', formatEventsCount(own.length));
    }
    return {
      id: venue.id,
      name: venue.name,
      address: venue.address ?? t('map.noAddress'),
      eventLine,
      accent: venueAccent(venue.slug),
      hasEventToday: tonight !== undefined,
    };
  });
  return rows.sort(
    (a, b) =>
      Number(b.hasEventToday) - Number(a.hasEventToday) || a.name.localeCompare(b.name, 'uk'),
  );
}
