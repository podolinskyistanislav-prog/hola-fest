import { MapVenueCard } from '@/components/ui';
import { formatEventTime } from '@/features/events/eventFormat';
import { t } from '@/lib/i18n';
import { buildTaxiLinks, openTaxiLink } from '@/lib/taxi';
import type { EventSummary } from '@/types/events';

import { venueAccent, type MappableVenue } from './venueMap';

export interface VenueMapCardProps {
  venue: MappableVenue;
  /** The venue's event tonight, when there is one. */
  todayEvent: EventSummary | undefined;
  onOpenVenue: (id: string) => void;
  onOpenEvent: (id: string) => void;
}

/** Card for one venue on the map: tonight's event, "Подія" and "Поїхати" (opens the first taxi app). */
export function VenueMapCard({ venue, todayEvent, onOpenVenue, onOpenEvent }: VenueMapCardProps) {
  const openTaxi = () => {
    const [link] = buildTaxiLinks(venue);
    if (link) void openTaxiLink(link).catch(() => undefined);
  };

  return (
    <MapVenueCard
      name={venue.name}
      address={venue.address ?? t('map.noAddress')}
      todayEvent={
        todayEvent
          ? `${t('map.today')} ${todayEvent.title} · ${formatEventTime(todayEvent.startsAt)}`
          : t('map.noEventsToday')
      }
      accent={venueAccent(venue.slug)}
      eventLabel={t('map.openEvent')}
      taxiLabel={t('map.taxi')}
      onOpenEvent={() => (todayEvent ? onOpenEvent(todayEvent.id) : onOpenVenue(venue.id))}
      onTaxi={openTaxi}
    />
  );
}
