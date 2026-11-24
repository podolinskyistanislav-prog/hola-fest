import { formatEventTime } from '@/features/events/eventFormat';
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
  hasEvents: boolean;
};

/**
 * Home "Клуби" list for one Kyiv day ("YYYY-MM-DD"): venues with an event that day first, then alphabetical.
 * The line shows that day's first event (+N when there are more), else a placeholder.
 */
export function clubRows(
  venues: readonly Venue[],
  events: readonly EventSummary[],
  dayId: string,
): ClubRow[] {
  const rows = venues.map((venue) => {
    const onDay = events
      .filter((event) => event.venue.id === venue.id && kyivDayKey(event.startsAt) === dayId)
      .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
    const first = onDay[0];
    let eventLine = t('home.clubNoEventsDay');
    if (first) {
      eventLine = `${first.title} · ${formatEventTime(first.startsAt)}`;
      if (onDay.length > 1) eventLine += ` +${onDay.length - 1}`;
    }
    return {
      id: venue.id,
      name: venue.name,
      address: venue.address ?? t('map.noAddress'),
      eventLine,
      accent: venueAccent(venue.slug),
      hasEvents: first !== undefined,
    };
  });
  return rows.sort(
    (a, b) => Number(b.hasEvents) - Number(a.hasEvents) || a.name.localeCompare(b.name, 'uk'),
  );
}
