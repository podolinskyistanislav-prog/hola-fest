import { Image } from 'expo-image';
import { useMemo, type ReactNode } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TaxiBar } from '@/components/TaxiBar';
import {
  AppText,
  Button,
  CollapsibleSection,
  GigRow,
  GlassIconButton,
  InfoChip,
  LoyaltyStampCard,
  PhotoGallery,
} from '@/components/ui';
import { HolaStar } from '@/components/ui/HolaStar';
import { useHomeEvents } from '@/features/events/useEvents';
import { VenueMap } from '@/features/map';
import { t } from '@/lib/i18n';
import { brand, radius, space, touchTarget, useTheme } from '@/theme';
import type { VenueDetails } from '@/types/venues';

import { shareVenue } from './shareVenue';
import { useVenue, useVenues } from './useVenues';
import { mappableVenues } from './venueMap';
import { groupVenueWeek, safeInstagramUrl, venueCoverUri, venueEventRowProps } from './venueWeek';

export interface VenueScreenContentProps {
  venueId: string | undefined;
  onBack: () => void;
  onOpenEvent: (eventId: string) => void;
  /** Opens the Map tab with this club selected. */
  onOpenMap: (venueId: string) => void;
}

const COVER_HEIGHT = 240;
const STAR_SIZE = 150;
const SKELETON_HEIGHT = 220;
const SCREEN_TOP = 96;
const MAP_HEIGHT = 220;
const LOYALTY_GOAL = 5;

function Message({ title, body, children }: { title: string; body: string; children?: ReactNode }) {
  return (
    <View style={styles.message}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      <AppText tone="muted">{body}</AppText>
      {children}
    </View>
  );
}

function WeekOfEvents({
  venue,
  onOpenEvent,
}: {
  venue: VenueDetails;
  onOpenEvent: (eventId: string) => void;
}) {
  const now = useMemo(() => new Date(), []);
  const events = useHomeEvents(now);
  const days = useMemo(
    () => groupVenueWeek(events.data ?? [], venue.id, now),
    [events.data, venue.id, now],
  );

  if (events.isLoading) {
    return <AppText tone="muted">{t('venue.loading')}</AppText>;
  }
  if (events.isError) {
    return (
      <View style={styles.weekMessage}>
        <AppText tone="muted">{t('venue.errorBody')}</AppText>
        <Button label={t('venue.retry')} variant="inverse" onPress={() => void events.refetch()} />
      </View>
    );
  }
  if (days.length === 0) {
    return <AppText tone="muted">{t('venue.weekEmpty')}</AppText>;
  }
  return (
    <View style={styles.days}>
      {days.map((day) => (
        <View key={day.dayId} style={styles.day}>
          <AppText variant="label" tone="muted" accessibilityRole="header">
            {day.heading}
          </AppText>
          {day.events.map((event) => (
            <GigRow
              key={event.id}
              {...venueEventRowProps(event)}
              onPress={() => onOpenEvent(event.id)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function WhereIsIt({ venue, onOpenMap }: { venue: VenueDetails; onOpenMap: () => void }) {
  const venues = useVenues();
  const mappable = useMemo(() => mappableVenues(venues.data ?? []), [venues.data]);
  const hasPoint = mappable.some((item) => item.id === venue.id);

  return (
    <View style={styles.where}>
      {hasPoint ? (
        <View style={styles.map}>
          <VenueMap venues={mappable} selectedId={venue.id} onSelect={() => undefined} compact />
        </View>
      ) : (
        <AppText tone="muted">{t('venue.noCoordinates')}</AppText>
      )}
      <Button label={t('venue.openOnMap')} onPress={onOpenMap} />
      <TaxiBar
        destination={{ name: venue.name, address: venue.address, lat: venue.lat, lng: venue.lng }}
      />
    </View>
  );
}

function VenueBody({
  venue,
  safeAreaTop,
  safeAreaBottom,
  onBack,
  onOpenEvent,
  onOpenMap,
}: {
  venue: VenueDetails;
  safeAreaTop: number;
  safeAreaBottom: number;
  onBack: () => void;
  onOpenEvent: (eventId: string) => void;
  onOpenMap: (venueId: string) => void;
}) {
  const { colors } = useTheme();
  const coverUri = venueCoverUri(venue.coverPath);
  const instagramUrl = safeInstagramUrl(venue.instagramUrl);
  const photoSlots = [
    { id: 'outside', label: t('venue.photosOutside') },
    { id: 'inside', label: t('venue.photosInside') },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: safeAreaBottom + space.xxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.cover, { backgroundColor: brand.pink }]}>
        {coverUri ? (
          <Image
            source={{ uri: coverUri }}
            contentFit="cover"
            accessible={false}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View pointerEvents="none" accessible={false} importantForAccessibility="no">
            <HolaStar color={brand.yellow} size={STAR_SIZE} />
          </View>
        )}
        <View style={[styles.topButtons, { top: safeAreaTop + space.md }]}>
          <GlassIconButton icon="back" kind="cover" label={t('venue.back')} onPress={onBack} />
          <GlassIconButton
            icon="share"
            kind="cover"
            label={t('venue.share')}
            onPress={() => void shareVenue(venue.id, venue.name)}
          />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.titleBlock}>
          <AppText variant="title" accessibilityRole="header">
            {venue.name}
          </AppText>
          <AppText tone="muted">{venue.address ?? t('venue.noAddress')}</AppText>
        </View>
        <View style={styles.chips}>
          {venue.hasShelter ? <InfoChip label={t('venues.shelter')} icon="shield" /> : null}
        </View>
        {instagramUrl ? (
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={t('venue.instagram')}
            onPress={() => void Linking.openURL(instagramUrl)}
            style={styles.link}
          >
            <AppText variant="bodyStrong">{t('venue.instagram')} ↗</AppText>
          </Pressable>
        ) : null}

        <PhotoGallery slots={photoSlots} placeholderLabel={t('venue.photoSoon')} />

        <View style={styles.section}>
          <AppText variant="heading" accessibilityRole="header">
            {t('venue.week')}
          </AppText>
          <WeekOfEvents venue={venue} onOpenEvent={onOpenEvent} />
        </View>

        <View style={[styles.collapsible, { borderColor: colors.rowBorder }]}>
          <CollapsibleSection title={t('venue.where')}>
            <WhereIsIt venue={venue} onOpenMap={() => onOpenMap(venue.id)} />
          </CollapsibleSection>
        </View>

        <LoyaltyStampCard
          visits={0}
          goal={LOYALTY_GOAL}
          reward={t('venue.loyaltyReward')}
          title={t('venue.loyaltyTitle')}
          badgeLabel={t('venue.loyaltySoon')}
        />
      </View>
    </ScrollView>
  );
}

/** Loads one venue and shows its club page, or a loading / error / not-found state. */
export function VenueScreenContent({
  venueId,
  onBack,
  onOpenEvent,
  onOpenMap,
}: VenueScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const venue = useVenue(venueId);

  if (venue.isLoading) {
    return (
      <View
        accessibilityLabel={t('venue.loading')}
        accessibilityRole="progressbar"
        style={styles.screen}
      >
        <View style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      </View>
    );
  }

  if (venue.isError) {
    return (
      <Message title={t('venue.errorTitle')} body={t('venue.errorBody')}>
        <Button label={t('venue.retry')} onPress={() => void venue.refetch()} />
        <Button label={t('venue.back')} variant="inverse" onPress={onBack} />
      </Message>
    );
  }

  if (!venue.data) {
    return (
      <Message title={t('venue.notFoundTitle')} body={t('venue.notFoundBody')}>
        <Button label={t('venue.back')} variant="inverse" onPress={onBack} />
      </Message>
    );
  }

  return (
    <VenueBody
      venue={venue.data}
      safeAreaTop={insets.top}
      safeAreaBottom={insets.bottom}
      onBack={onBack}
      onOpenEvent={onOpenEvent}
      onOpenMap={onOpenMap}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, paddingTop: SCREEN_TOP },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card },
  message: {
    flex: 1,
    gap: space.md,
    padding: space.screen,
    paddingTop: SCREEN_TOP,
    alignItems: 'flex-start',
  },
  cover: { height: COVER_HEIGHT, alignItems: 'center', justifyContent: 'center' },
  topButtons: {
    position: 'absolute',
    left: space.screen,
    right: space.screen,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: { paddingVertical: space.screen, gap: space.xl },
  titleBlock: { paddingHorizontal: space.screen, gap: space.xs },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, paddingHorizontal: space.screen },
  link: { minHeight: touchTarget, justifyContent: 'center', paddingHorizontal: space.screen },
  section: { gap: space.md, paddingHorizontal: space.screen },
  days: { gap: space.lg },
  day: { gap: space.sm },
  weekMessage: { gap: space.md, alignItems: 'flex-start' },
  collapsible: { marginHorizontal: space.screen },
  where: { gap: space.md },
  map: { height: MAP_HEIGHT, borderRadius: radius.card, overflow: 'hidden' },
});
