import { useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, tabBarInset } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { useVenues } from './useVenues';
import { VenueMap } from './VenueMap';
import { mappableVenues } from './venueMap';

export interface VenuesMapScreenContentProps {
  onOpenVenue: (id: string) => void;
}

function Message({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <View style={styles.message}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      <AppText tone="muted">{body}</AppText>
      {action}
    </View>
  );
}

/** The venues on a map (a list on web) with loading, empty and error states. */
export function VenuesMapScreenContent({ onOpenVenue }: VenuesMapScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const venues = useVenues();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (venues.isLoading) {
    return (
      <View
        accessibilityLabel={t('map.loading')}
        accessibilityRole="progressbar"
        style={[styles.fill, { backgroundColor: colors.surfaceRaised }]}
      />
    );
  }
  if (venues.isError) {
    return (
      <Message
        title={t('map.errorTitle')}
        body={t('map.errorBody')}
        action={<Button label={t('map.retry')} onPress={() => void venues.refetch()} />}
      />
    );
  }

  const mappable = mappableVenues(venues.data ?? []);
  if (mappable.length === 0) {
    return <Message title={t('map.emptyTitle')} body={t('map.emptyBody')} />;
  }

  return (
    <VenueMap
      venues={mappable}
      selectedId={selectedId}
      onSelectVenue={setSelectedId}
      onOpenVenue={onOpenVenue}
      bottomInset={tabBarInset(insets.bottom)}
    />
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  message: { flex: 1, padding: space.screen, gap: space.md, justifyContent: 'center' },
});
