import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, Chip, EventCard } from '@/components/ui';
import { formatEventDay, formatEventTime } from '@/features/events/eventFormat';
import { t } from '@/lib/i18n';
import type { AdminEventListItem } from '@/services/admin';
import { radius, space, useTheme } from '@/theme';

export type VenueEventsListProps = {
  venueName?: string;
  events: readonly AdminEventListItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onCreate?: () => void;
  onOpenEvent?: (id: string) => void;
};

const SKELETON_COUNT = 3;
const SKELETON_HEIGHT = 240;

function Skeleton() {
  const { colors } = useTheme();
  return (
    <View accessibilityLabel={t('staff.loading')} accessibilityRole="progressbar">
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <View key={index} style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      ))}
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

type EventRowProps = {
  event: AdminEventListItem;
  index: number;
  onOpen?: (id: string) => void;
};

function EventRow({ event, index, onOpen }: EventRowProps) {
  const isDraft = event.status === 'draft';
  const date = formatEventDay(event.startsAt);
  const time = formatEventTime(event.startsAt);
  const label = [isDraft ? t('staff.draft') : null, event.title, date, time]
    .filter(Boolean)
    .join(', ');

  return (
    <View>
      <EventCard
        title={event.title}
        venue={date}
        time={time}
        offerBadge={
          event.offersCount > 0
            ? t('staff.offersCount').replace('{count}', String(event.offersCount))
            : undefined
        }
        coverColor={index % 2 === 0 ? 'yellow' : 'pink'}
        accessibilityLabel={label}
        onPress={onOpen ? () => onOpen(event.id) : undefined}
      />
      {isDraft ? (
        <View style={styles.badge} pointerEvents="none">
          <Chip label={t('staff.draft')} />
        </View>
      ) : null}
    </View>
  );
}

/** Virtualized list of a venue's events, drafts marked, with a create button. */
export function VenueEventsList({
  venueName,
  events,
  isLoading,
  isError,
  onRetry,
  onCreate,
  onOpenEvent,
}: VenueEventsListProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <AppText variant="title" accessibilityRole="header">
          {t('staff.venueEvents')}
        </AppText>
        {venueName ? <AppText tone="muted">{venueName}</AppText> : null}
        <Button label={t('staff.createEvent')} onPress={onCreate} />
      </View>
      {isLoading ? <Skeleton /> : null}
      {!isLoading && isError ? (
        <View style={styles.message}>
          <AppText tone="muted" accessibilityRole="alert">
            {t('staff.eventsError')}
          </AppText>
          <Button label={t('staff.retry')} onPress={onRetry} />
        </View>
      ) : null}
      {!isLoading && !isError ? (
        <FlatList
          data={events}
          keyExtractor={(event) => event.id}
          renderItem={({ item, index }) => (
            <EventRow event={item} index={index} onOpen={onOpenEvent} />
          )}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={<AppText tone="muted">{t('staff.eventsEmpty')}</AppText>}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.lg },
  header: { gap: space.md },
  badge: { position: 'absolute', top: space.md, right: space.md },
  separator: { height: space.lg },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card, marginBottom: space.lg },
  message: { gap: space.lg },
});
