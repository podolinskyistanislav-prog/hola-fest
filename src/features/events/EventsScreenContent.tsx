import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AppText,
  Button,
  DayStrip,
  EventCarouselCard,
  FilterChips,
  HomeHeader,
  SectionHeader,
  WeekOfferRow,
  tabBarInset,
} from '@/components/ui';
import { t, type TranslationKey } from '@/lib/i18n';
import { kyivDayKey } from '@/lib/kyivTime';
import { layout, radius, space, useTheme } from '@/theme';

import {
  carouselCardProps,
  eventsOnDay,
  filterEvents,
  formatDayHeading,
  HOME_FILTER_IDS,
  homeDays,
  weekOffers,
  type HomeFilterId,
} from './eventFormat';
import { SearchSoonSheet } from './SearchSoonSheet';
import { useHomeEvents } from './useEvents';

export interface EventsScreenContentProps {
  onOpenEvent: (id: string) => void;
  onOpenMap: () => void;
  /** Long-press on the header; used as the hidden staff entry point. */
  onTitleLongPress: () => void;
}

const SKELETON_COUNT = 3;

const FILTER_CHIPS = HOME_FILTER_IDS.map((id) => ({
  id,
  label: t(`home.filter.${id}` as TranslationKey),
}));

function CarouselSkeleton() {
  const { colors } = useTheme();
  return (
    <View
      accessibilityLabel={t('events.loading')}
      accessibilityRole="progressbar"
      style={styles.skeletonRow}
    >
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <View key={index} style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      ))}
    </View>
  );
}

function EmptyDay({ title, body }: { title: string; body: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      <AppText tone="muted">{body}</AppText>
    </View>
  );
}

/** Home: header, 5-day strip, genre/offer chips, event carousel and the week's offers. */
export function EventsScreenContent({
  onOpenEvent,
  onOpenMap,
  onTitleLongPress,
}: EventsScreenContentProps) {
  const insets = useSafeAreaInsets();
  const [today] = useState(() => new Date());
  const [selectedId, setSelectedId] = useState(() => kyivDayKey(today));
  const [filter, setFilter] = useState<HomeFilterId>('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const events = useHomeEvents(today);

  const all = useMemo(() => events.data ?? [], [events.data]);
  const days = useMemo(() => homeDays(today, all), [today, all]);
  const dayEvents = useMemo(
    () => filterEvents(eventsOnDay(all, selectedId), filter),
    [all, selectedId, filter],
  );
  const offers = useMemo(() => weekOffers(all), [all]);

  const isToday = selectedId === kyivDayKey(today);
  const hasFilter = filter !== 'all';

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + space.lg, paddingBottom: tabBarInset(insets.bottom) },
        ]}
      >
        <Pressable accessible={false} onLongPress={onTitleLongPress}>
          <HomeHeader
            title={t('events.title')}
            date={today}
            searchLabel={t('home.searchLabel')}
            onSearchPress={() => setSearchOpen(true)}
          />
        </Pressable>
        <DayStrip days={days} selectedId={selectedId} onSelect={setSelectedId} />
        <FilterChips
          chips={FILTER_CHIPS}
          selectedId={filter}
          onSelect={(id) => setFilter(id as HomeFilterId)}
        />

        <SectionHeader
          title={formatDayHeading(selectedId, today, dayEvents.length)}
          actionLabel={t('home.onMap')}
          onActionPress={onOpenMap}
        />
        {events.isLoading ? <CarouselSkeleton /> : null}
        {events.isError ? (
          <View style={styles.error}>
            <AppText variant="heading" accessibilityRole="header">
              {t('events.errorTitle')}
            </AppText>
            <AppText tone="muted">{t('events.errorBody')}</AppText>
            <Button label={t('events.retry')} onPress={() => void events.refetch()} />
          </View>
        ) : null}
        {events.isSuccess && dayEvents.length === 0 ? (
          <EmptyDay
            title={
              hasFilter
                ? t('home.emptyFilteredTitle')
                : isToday
                  ? t('home.emptyTodayTitle')
                  : t('events.emptyDayTitle')
            }
            body={hasFilter ? t('home.emptyFilteredBody') : t('events.emptyDayBody')}
          />
        ) : null}
        {events.isSuccess && dayEvents.length > 0 ? (
          <FlatList
            horizontal
            data={dayEvents}
            keyExtractor={(event) => event.id}
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item, index }) => (
              <EventCarouselCard
                {...carouselCardProps(item, index)}
                onPress={() => onOpenEvent(item.id)}
              />
            )}
          />
        ) : null}

        <SectionHeader
          title={t('home.weekOffers')}
          actionLabel={t('home.weekOffersAll')}
          onActionPress={() => setFilter('offer')}
        />
        <View style={styles.offers}>
          {offers.length === 0 && events.isSuccess ? (
            <AppText tone="muted">{t('home.weekOffersEmpty')}</AppText>
          ) : null}
          {offers.map((offer, index) => (
            <WeekOfferRow
              key={offer.key}
              title={offer.title}
              dateAndVenue={offer.dateAndVenue}
              offerText={offer.offerText}
              accent={index % 2 === 0 ? 'yellow' : 'pink'}
              onPress={() => onOpenEvent(offer.eventId)}
            />
          ))}
        </View>
      </ScrollView>
      <SearchSoonSheet visible={searchOpen} onClose={() => setSearchOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { gap: space.lg },
  carousel: { flexGrow: 0 },
  carouselContent: { paddingHorizontal: space.screen, gap: space.md },
  skeletonRow: { flexDirection: 'row', gap: space.md, paddingHorizontal: space.screen },
  skeleton: {
    width: layout.carouselCardWidth,
    height: layout.carouselCardHeight,
    borderRadius: radius.card,
  },
  empty: {
    gap: space.sm,
    marginHorizontal: space.screen,
    padding: space.xl,
    borderRadius: radius.card,
    borderWidth: 1,
  },
  error: { gap: space.sm, paddingHorizontal: space.screen },
  offers: { gap: space.sm, paddingHorizontal: space.screen },
});
