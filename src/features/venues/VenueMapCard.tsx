import { StyleSheet, View } from 'react-native';

import { AppText, GlassSurface, HolaStar } from '@/components/ui';
import { GlassPillButton } from '@/components/ui/GlassPillButton';
import { formatEventTime } from '@/features/events/eventFormat';
import { t } from '@/lib/i18n';
import { buildMainTaxiLink, openTaxiLink } from '@/lib/taxi';
import { brand, fontFamily, radius, space } from '@/theme';
import type { EventSummary } from '@/types/events';

import { venueAccent, type MappableVenue } from './venueMap';

export interface VenueMapCardProps {
  venue: MappableVenue;
  /** The venue's event tonight, when there is one. */
  todayEvent: EventSummary | undefined;
  onOpenVenue: (id: string) => void;
  onOpenEvent: (id: string) => void;
}

const THUMB_SIZE = 52;
const STAR_SIZE = 40;
const BUTTON_HEIGHT = 46;

/**
 * Card for one venue on the map: thumb, name, address, tonight's event and one row of buttons:
 * "Подія" (only with an event tonight, the main button) · "Клуб" (the venue page) · "Поїхати"
 * (opens the first taxi app). Without an event "Клуб" is the main button.
 */
export function VenueMapCard({ venue, todayEvent, onOpenVenue, onOpenEvent }: VenueMapCardProps) {
  const openTaxi = () => {
    const link = buildMainTaxiLink(venue);
    if (link) void openTaxiLink(link).catch(() => undefined);
  };
  const accent = venueAccent(venue.slug);
  const thumb = accent === 'pink' ? brand.pink : brand.yellow;
  const star = accent === 'pink' ? brand.yellow : brand.pink;

  return (
    <GlassSurface style={styles.card}>
      <View style={styles.head}>
        <View style={[styles.thumb, { backgroundColor: thumb }]}>
          <HolaStar color={star} size={STAR_SIZE} />
        </View>
        <View style={styles.texts}>
          <AppText numberOfLines={1} style={styles.name}>
            {venue.name}
          </AppText>
          <AppText tone="muted" variant="caption" numberOfLines={1}>
            {venue.address ?? t('map.noAddress')}
          </AppText>
          <AppText variant="caption" numberOfLines={1}>
            {todayEvent
              ? `${t('map.today')} ${todayEvent.title} · ${formatEventTime(todayEvent.startsAt)}`
              : t('map.noEventsToday')}
          </AppText>
        </View>
      </View>
      <View style={styles.actions}>
        {todayEvent ? (
          <GlassPillButton
            label={t('map.openEvent')}
            height={BUTTON_HEIGHT}
            onPress={() => onOpenEvent(todayEvent.id)}
            flex
            primary
          />
        ) : null}
        <GlassPillButton
          label={t('map.openVenue')}
          height={BUTTON_HEIGHT}
          onPress={() => onOpenVenue(venue.id)}
          flex
          primary={!todayEvent}
        />
        <GlassPillButton label={t('map.taxi')} height={BUTTON_HEIGHT} onPress={openTaxi} flex />
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 30, padding: 18, gap: 14 },
  head: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: radius.chip,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  texts: { flex: 1, gap: 3 },
  name: { fontFamily: fontFamily.displayMedium, fontSize: 17, lineHeight: 22 },
  actions: { flexDirection: 'row', gap: space.sm },
});
