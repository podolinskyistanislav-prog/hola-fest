import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText, GlassIconButton, InfoChip, LineupChip } from '@/components/ui';
import { HolaStar } from '@/components/ui/HolaStar';
import { TAXI_BAR_HEIGHT } from '@/components/ui/TaxiBar';
import { t } from '@/lib/i18n';
import { brand, radius, space, useTheme } from '@/theme';
import type { EventDetails as EventDetailsData } from '@/types/events';

import { EventOfferCard } from './EventOfferCard';
import { EventTaxiBar } from './EventTaxiBar';
import { curfewInfo, formatEventWhen, formatPriceFrom } from './eventFormat';
import { shareEvent } from './shareEvent';

export interface EventDetailsProps {
  event: EventDetailsData;
  /** Safe-area insets so the buttons clear the status bar and the taxi bar clears the home indicator. */
  safeAreaTop: number;
  safeAreaBottom: number;
  onBack: () => void;
  onOpenVenue: (venueId: string) => void;
  /** Called after an offer was claimed, to open its ticket. */
  onClaimed: (offerId: string) => void;
  /** Injectable clock for "Сьогодні" and the expired offer state. */
  now?: Date;
}

const COVER_HEIGHT = 310;
const SHEET_OVERLAP = 40;
const BUTTONS_TOP_GAP = 16;
const BIG_STAR = 260;
const SMALL_STAR = 110;
const SHEET_GAP = 18;

function coverImageUri(coverPath: string | null): string | undefined {
  return coverPath !== null && /^https:\/\//.test(coverPath) ? coverPath : undefined;
}

/** Event page: cover, sheet with facts, lineup and offers, and a floating taxi bar. */
export function EventDetails({
  event,
  safeAreaTop,
  safeAreaBottom,
  onBack,
  onOpenVenue,
  onClaimed,
  now = new Date(),
}: EventDetailsProps) {
  const { colors } = useTheme();
  const price = formatPriceFrom(event.priceFromUah) ?? t('event.priceUnknown');
  const curfew = curfewInfo(event.startsAt, event.endsAt);
  const coverUri = coverImageUri(event.coverPath);
  const artists =
    event.lineup.length > 0
      ? event.lineup
      : [t('event.artistPlaceholder1'), t('event.artistPlaceholder2')];
  const venueLine = [event.venue.name, event.venue.address ?? t('event.venueNoAddress')].join(
    ' · ',
  );
  const scrollEnd = safeAreaBottom + space.md + TAXI_BAR_HEIGHT + space.xxl;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: scrollEnd }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.cover, { backgroundColor: brand.yellow }]}>
          {coverUri ? (
            <Image
              source={{ uri: coverUri }}
              contentFit="cover"
              accessible={false}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <>
              <View style={styles.bigStar} pointerEvents="none">
                <HolaStar color={brand.pink} size={BIG_STAR} />
              </View>
              <View style={styles.smallStar} pointerEvents="none">
                <HolaStar color={brand.pink} size={SMALL_STAR} />
              </View>
            </>
          )}
        </View>

        <View
          style={[styles.sheet, { backgroundColor: colors.background }]}
          accessibilityLabel={event.title}
        >
          <View style={styles.titleBlock}>
            <AppText variant="title" accessibilityRole="header">
              {event.title}
            </AppText>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={venueLine}
              onPress={() => onOpenVenue(event.venue.id)}
            >
              <AppText tone="muted">{venueLine}</AppText>
            </Pressable>
          </View>

          <View style={styles.chips}>
            <InfoChip label={formatEventWhen(event.startsAt, event.endsAt, now)} />
            <InfoChip label={price} />
            <InfoChip label={curfew.label} icon={curfew.ok ? 'check' : undefined} />
            <InfoChip
              label={event.venue.hasShelter ? t('event.shelterYes') : t('event.shelterUnknown')}
              icon="shield"
            />
          </View>

          <View style={styles.lineup}>
            <AppText variant="label" tone="muted" accessibilityRole="header">
              {t('event.lineup')}
            </AppText>
            <View style={styles.chips}>
              {artists.map((name) => (
                <LineupChip key={name} label={name} />
              ))}
            </View>
          </View>

          {event.description ? <AppText>{event.description}</AppText> : null}

          {event.offers.map((offer) => (
            <EventOfferCard key={offer.id} offer={offer} onClaimed={onClaimed} now={now} />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.topButtons, { top: safeAreaTop + BUTTONS_TOP_GAP }]}>
        <GlassIconButton icon="back" kind="cover" label={t('event.back')} onPress={onBack} />
        <GlassIconButton
          icon="share"
          kind="cover"
          label={t('event.share')}
          onPress={() => void shareEvent(event.id, event.title)}
        />
      </View>

      <View style={[styles.taxi, { bottom: safeAreaBottom + space.md }]}>
        <EventTaxiBar
          destination={{
            name: event.venue.name,
            address: event.venue.address,
            lat: event.venue.lat,
            lng: event.venue.lng,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  cover: { height: COVER_HEIGHT, overflow: 'hidden' },
  bigStar: { position: 'absolute', right: -40, top: 30 },
  smallStar: { position: 'absolute', left: 40, top: 150 },
  sheet: {
    marginTop: -SHEET_OVERLAP,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingHorizontal: space.screen,
    paddingTop: space.xxl,
    gap: SHEET_GAP,
  },
  titleBlock: { gap: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  lineup: { gap: space.sm },
  topButtons: {
    position: 'absolute',
    left: space.screen,
    right: space.screen,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taxi: { position: 'absolute', left: space.screen, right: space.screen },
});
