import type { ReactNode } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppText, Button, EventCard, tabBarInset } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';
import type { EventSummary } from '@/types/events';

import { eventCardProps } from './eventFormat';

export interface EventsListProps {
  events: readonly EventSummary[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onOpenEvent: (id: string) => void;
  /** Bottom safe-area inset, so the last card scrolls above the floating tab bar. */
  safeAreaBottom: number;
}

const SKELETON_COUNT = 3;
const SKELETON_HEIGHT = 240;

function LoadingSkeleton() {
  const { colors } = useTheme();
  return (
    <View
      accessibilityLabel={t('events.loading')}
      accessibilityRole="progressbar"
      style={styles.list}
    >
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <View key={index} style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      ))}
    </View>
  );
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

function Separator() {
  return <View style={styles.separator} />;
}

/** Virtualized list of event cards with designed loading, error and empty states. */
export function EventsList({
  events,
  isLoading,
  isError,
  onRetry,
  onOpenEvent,
  safeAreaBottom,
}: EventsListProps) {
  if (isLoading) return <LoadingSkeleton />;
  if (isError) {
    return (
      <Message
        title={t('events.errorTitle')}
        body={t('events.errorBody')}
        action={<Button label={t('events.retry')} onPress={onRetry} />}
      />
    );
  }
  return (
    <FlatList
      data={events ?? []}
      keyExtractor={(event) => event.id}
      renderItem={({ item, index }) => (
        <EventCard {...eventCardProps(item, index)} onPress={() => onOpenEvent(item.id)} />
      )}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        <Message title={t('events.emptyDayTitle')} body={t('events.emptyDayBody')} />
      }
      contentContainerStyle={[styles.list, { paddingBottom: tabBarInset(safeAreaBottom) }]}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: space.screen, paddingTop: space.lg },
  separator: { height: space.lg },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card, marginBottom: space.lg },
  message: { gap: space.sm, paddingTop: space.xxl },
});
