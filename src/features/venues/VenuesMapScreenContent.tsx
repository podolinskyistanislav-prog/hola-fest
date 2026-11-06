import { useMemo, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, GlassSearchField, tabBarInset } from '@/components/ui';
import { useEventsForDay } from '@/features/events/useEvents';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { useVenues } from './useVenues';
import { VenueMap } from './VenueMap';
import {
  filterVenuesByName,
  firstEventByVenue,
  mappableVenues,
  resolveSelectedVenueId,
} from './venueMap';

export interface VenuesMapScreenContentProps {
  onOpenVenue: (id: string) => void;
  onOpenEvent: (id: string) => void;
}

const SEARCH_TOP = 60;

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

/** The venues on a map (cards on web) with search, tonight's events and loading, empty and error states. */
export function VenuesMapScreenContent({ onOpenVenue, onOpenEvent }: VenuesMapScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const venues = useVenues();
  const today = useEventsForDay(useMemo(() => new Date(), []));
  const [query, setQuery] = useState('');
  const [choice, setChoice] = useState<string | null | undefined>(undefined);

  const mappable = useMemo(() => mappableVenues(venues.data ?? []), [venues.data]);
  const todayEvents = useMemo(() => firstEventByVenue(today.data ?? []), [today.data]);
  const visible = useMemo(() => filterVenuesByName(mappable, query), [mappable, query]);
  const selectedId = resolveSelectedVenueId(visible, choice, new Set(todayEvents.keys()));

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
  if (mappable.length === 0) {
    return <Message title={t('map.emptyTitle')} body={t('map.emptyBody')} />;
  }

  return (
    <View style={styles.fill}>
      <VenueMap
        venues={visible}
        selectedId={selectedId}
        todayEvents={todayEvents}
        onSelectVenue={setChoice}
        onOpenVenue={onOpenVenue}
        onOpenEvent={onOpenEvent}
        bottomInset={tabBarInset(insets.bottom)}
      />
      <View style={styles.search} pointerEvents="box-none">
        <GlassSearchField
          label={t('map.searchLabel')}
          placeholder={t('map.searchPlaceholder')}
          value={query}
          onChangeText={setQuery}
        />
        {visible.length === 0 ? (
          <AppText tone="muted" style={styles.noMatches}>
            {t('map.noMatches')}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  message: { flex: 1, padding: space.screen, gap: space.md, justifyContent: 'center' },
  search: { position: 'absolute', top: SEARCH_TOP, left: space.screen, right: space.screen },
  noMatches: { marginTop: space.md, textAlign: 'center' },
});
