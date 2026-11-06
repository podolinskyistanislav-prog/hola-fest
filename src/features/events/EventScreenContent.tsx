import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';

import { EventDetails } from './EventDetails';
import { useEvent } from './useEvents';

export interface EventScreenContentProps {
  eventId: string | undefined;
  onBack: () => void;
  onOpenVenue: (venueId: string) => void;
  onClaimed: (offerId: string) => void;
}

const SKELETON_HEIGHT = 220;
const SCREEN_TOP = 96;

/** Loads one event and shows it, or a designed loading / error / not-found state. */
export function EventScreenContent({
  eventId,
  onBack,
  onOpenVenue,
  onClaimed,
}: EventScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const event = useEvent(eventId);

  if (event.isLoading) {
    return (
      <View
        accessibilityLabel={t('event.loading')}
        accessibilityRole="progressbar"
        style={styles.screen}
      >
        <View style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      </View>
    );
  }

  if (event.isError) {
    return (
      <View style={styles.message}>
        <AppText variant="heading" accessibilityRole="header">
          {t('event.errorTitle')}
        </AppText>
        <AppText tone="muted">{t('event.errorBody')}</AppText>
        <Button label={t('events.retry')} onPress={() => void event.refetch()} />
        <Button label={t('event.back')} variant="inverse" onPress={onBack} />
      </View>
    );
  }

  if (!event.data) {
    return (
      <View style={styles.message}>
        <AppText variant="heading" accessibilityRole="header">
          {t('event.notFoundTitle')}
        </AppText>
        <AppText tone="muted">{t('event.notFoundBody')}</AppText>
        <Button label={t('event.back')} variant="inverse" onPress={onBack} />
      </View>
    );
  }

  return (
    <EventDetails
      event={event.data}
      safeAreaBottom={insets.bottom}
      onBack={onBack}
      onOpenVenue={onOpenVenue}
      onClaimed={onClaimed}
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
});
