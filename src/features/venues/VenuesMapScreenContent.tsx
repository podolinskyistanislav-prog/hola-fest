import { useMemo, useState, type ReactNode } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AppText,
  Button,
  CollapsibleSection,
  GlassSearchField,
  GlassSurface,
  WeekOfferRow,
  tabBarInset,
} from '@/components/ui';
import { formatEventTime } from '@/features/events/eventFormat';
import { useEventsForDay } from '@/features/events/useEvents';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';

import { VenueMap } from '@/features/map';

import { useVenues } from './useVenues';
import { VenueMapCard } from './VenueMapCard';
import {
  filterVenuesByName,
  firstEventByVenue,
  mappableVenues,
  resolveSelectedVenueId,
  todayOffers,
  venueAccent,
} from './venueMap';

export interface VenuesMapScreenContentProps {
  onOpenVenue: (id: string) => void;
  onOpenEvent: (id: string) => void;
  /** Club to open with its card selected (the `venue` route param). */
  initialVenueId?: string;
}

const SEARCH_TOP = 60;
const OFFERS_MAX_HEIGHT = 220;

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
export function VenuesMapScreenContent({
  onOpenVenue,
  onOpenEvent,
  initialVenueId,
}: VenuesMapScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const venues = useVenues();
  const today = useEventsForDay(useMemo(() => new Date(), []));
  const [query, setQuery] = useState('');
  const [choice, setChoice] = useState<string | null | undefined>(initialVenueId);

  // A new `venue` param (the tab stays mounted) re-selects that club; adjusted during render.
  const [seenVenueId, setSeenVenueId] = useState(initialVenueId);
  if (seenVenueId !== initialVenueId) {
    setSeenVenueId(initialVenueId);
    if (initialVenueId !== undefined) {
      setChoice(initialVenueId);
      setQuery('');
    }
  }

  const mappable = useMemo(() => mappableVenues(venues.data ?? []), [venues.data]);
  const todayEvents = useMemo(() => firstEventByVenue(today.data ?? []), [today.data]);
  const offers = useMemo(() => todayOffers(today.data ?? []), [today.data]);
  const accentOf = (venueId: string) =>
    venueAccent(mappable.find((venue) => venue.id === venueId)?.slug ?? '');
  const selectFromOffers = (venueId: string) => {
    setQuery('');
    setChoice(venueId);
  };
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
      <View
        style={[styles.bottom, { bottom: tabBarInset(insets.bottom) }]}
        pointerEvents="box-none"
      >
        {selected ? (
          <VenueMapCard
            venue={selected}
            todayEvent={todayEvents.get(selected.id)}
            onOpenVenue={onOpenVenue}
            onOpenEvent={onOpenEvent}
          />
        ) : null}
        <GlassSurface style={styles.offers}>
          <CollapsibleSection title={t('map.offersToday')} count={offers.length}>
            {offers.length === 0 ? (
              <AppText tone="muted" style={styles.offersEmpty}>
                {t('map.offersTodayEmpty')}
              </AppText>
            ) : (
              <FlatList
                data={offers}
                keyExtractor={(offer) => offer.key}
                style={styles.offersList}
                contentContainerStyle={styles.offersContent}
                renderItem={({ item }) => (
                  <WeekOfferRow
                    title={item.eventTitle}
                    dateAndVenue={`${item.venueName} · ${formatEventTime(item.startsAt)}`}
                    offerText={item.offerTitle}
                    accent={accentOf(item.venueId)}
                    onPress={() => selectFromOffers(item.venueId)}
                  />
                )}
              />
            )}
          </CollapsibleSection>
        </GlassSurface>
      </View>
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
  bottom: { position: 'absolute', left: space.screen, right: space.screen, gap: space.sm },
  offers: { borderRadius: radius.row, paddingHorizontal: space.md },
  offersList: { maxHeight: OFFERS_MAX_HEIGHT },
  offersContent: { gap: space.sm, paddingBottom: space.sm },
  offersEmpty: { paddingBottom: space.sm },
  search: { position: 'absolute', top: SEARCH_TOP, left: space.screen, right: space.screen },
  noMatches: { marginTop: space.md, textAlign: 'center' },
});
