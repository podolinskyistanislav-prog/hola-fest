import { useMemo, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, GlassSearchField, tabBarInset } from '@/components/ui';
import { useEventsForDay } from '@/features/events/useEvents';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { VenueMap } from '@/features/map';

import { useVenues } from './useVenues';
import { VenueMapCard } from './VenueMapCard';
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
  const selected = visible.find((venue) => venue.id === selectedId);

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
      <VenueMap venues={visible} selectedId={selectedId} onSelect={setChoice} />
      {selected ? (
        <View style={[styles.card, { bottom: tabBarInset(insets.bottom) }]}>
          <VenueMapCard
            venue={selected}
            todayEvent={todayEvents.get(selected.id)}
            onOpenVenue={onOpenVenue}
            onOpenEvent={onOpenEvent}
          />
        </View>
      ) : null}
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
  card: { position: 'absolute', left: space.screen, right: space.screen },
  search: { position: 'absolute', top: SEARCH_TOP, left: space.screen, right: space.screen },
  noMatches: { marginTop: space.md, textAlign: 'center' },
});
