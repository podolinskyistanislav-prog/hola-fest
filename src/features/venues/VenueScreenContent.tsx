import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, Chip, EventCard, GlassSurface } from '@/components/ui';
import { t, type TranslationKey } from '@/lib/i18n';
import { brand, radius, space, useTheme } from '@/theme';
import type { VenueDetails, VenueEvent } from '@/types/venues';

import { formatEventTime, formatPriceFrom } from '../events/eventFormat';
import { useVenue } from './useVenues';

export interface VenueScreenContentProps {
  venueId: string | undefined;
  onBack: () => void;
  onOpenEvent: (eventId: string) => void;
}

const COVER_HEIGHT = 200;
const STAR_SIZE = 88;
const BACK_TOP = 56;
const SKELETON_HEIGHT = 220;
const SCREEN_TOP = 96;

/** "5 листопада, 20:00" in the device's local time. */
function formatEventWhen(date: Date): string {
  const month = t(`events.month.${date.getMonth()}` as TranslationKey);
  return `${date.getDate()} ${month}, ${formatEventTime(date)}`;
}

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

function VenueBody({
  venue,
  safeAreaBottom,
  onBack,
  onOpenEvent,
}: {
  venue: VenueDetails;
  safeAreaBottom: number;
  onBack: () => void;
  onOpenEvent: (eventId: string) => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: safeAreaBottom + space.xxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.cover, { backgroundColor: brand.pink }]}>
        <AppText
          accessible={false}
          importantForAccessibility="no"
          style={[styles.star, { color: brand.yellow }]}
        >
          ✦
        </AppText>
        <GlassSurface kind="cover" style={styles.back}>
          <Button label={t('venue.back')} variant="glass" onPress={onBack} />
        </GlassSurface>
      </View>

      <View style={styles.body}>
        <AppText variant="title" accessibilityRole="header">
          {venue.name}
        </AppText>
        <AppText tone="muted">{venue.address ?? t('venue.noAddress')}</AppText>
        {venue.hasShelter ? (
          <View style={styles.chips}>
            <Chip label={t('venues.shelter')} />
          </View>
        ) : null}

        <View style={styles.section}>
          <AppText variant="heading" accessibilityRole="header">
            {t('venue.upcoming')}
          </AppText>
          {venue.upcomingEvents.length === 0 ? (
            <AppText tone="muted">{t('venue.upcomingEmpty')}</AppText>
          ) : (
            venue.upcomingEvents.map((event: VenueEvent, index) => (
              <EventCard
                key={event.id}
                title={event.title}
                venue={venue.name}
                time={formatEventWhen(event.startsAt)}
                priceFrom={formatPriceFrom(event.priceFromUah)}
                coverColor={index % 2 === 0 ? 'yellow' : 'pink'}
                onPress={() => onOpenEvent(event.id)}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

/** Loads one venue and shows it with its upcoming events, or a loading / error / not-found state. */
export function VenueScreenContent({ venueId, onBack, onOpenEvent }: VenueScreenContentProps) {
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
      safeAreaBottom={insets.bottom}
      onBack={onBack}
      onOpenEvent={onOpenEvent}
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
  star: { fontSize: STAR_SIZE, lineHeight: STAR_SIZE + space.sm },
  back: { position: 'absolute', left: space.screen, top: BACK_TOP, borderRadius: radius.pill },
  body: { padding: space.screen, gap: space.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  section: { gap: space.md },
});
