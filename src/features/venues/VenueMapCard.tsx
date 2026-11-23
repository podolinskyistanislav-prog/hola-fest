import { StyleSheet, View } from 'react-native';

import { AppText, GlassSurface, MapVenueCard } from '@/components/ui';
import { GlassPillButton } from '@/components/ui/GlassPillButton';
import { formatEventTime } from '@/features/events/eventFormat';
import { t } from '@/lib/i18n';
import { buildMainTaxiLink, openTaxiLink } from '@/lib/taxi';
import { brand, radius, space } from '@/theme';
import type { EventSummary } from '@/types/events';

import { venueAccent, type MappableVenue } from './venueMap';

export interface VenueMapCardProps {
  venue: MappableVenue;
  /** The venue's event tonight, when there is one. */
  todayEvent: EventSummary | undefined;
  onOpenVenue: (id: string) => void;
  onOpenEvent: (id: string) => void;
}

const CLUB_BUTTON_HEIGHT = 44;

/**
 * Card for one venue on the map: tonight's event and offer, "Подія", "Клуб" (the venue page)
 * and "Поїхати" (opens the first taxi app).
 */
export function VenueMapCard({ venue, todayEvent, onOpenVenue, onOpenEvent }: VenueMapCardProps) {
  const openTaxi = () => {
    const link = buildMainTaxiLink(venue);
    if (link) void openTaxiLink(link).catch(() => undefined);
  };
  const offer = todayEvent?.offers[0];

  return (
    <View style={styles.wrap}>
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
      <GlassSurface style={styles.extra}>
        {offer ? (
          <View style={styles.pill}>
            <AppText variant="label" tone="onAccent" numberOfLines={1}>
              {offer.title}
            </AppText>
          </View>
        ) : null}
        <GlassPillButton
          label={t('map.openVenue')}
          height={CLUB_BUTTON_HEIGHT}
          onPress={() => onOpenVenue(venue.id)}
          flex
        />
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.sm },
  extra: {
    borderRadius: radius.row,
    padding: space.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  pill: {
    flex: 1,
    height: CLUB_BUTTON_HEIGHT,
    paddingHorizontal: space.md,
    borderRadius: CLUB_BUTTON_HEIGHT / 2,
    backgroundColor: brand.pink,
    justifyContent: 'center',
  },
});
