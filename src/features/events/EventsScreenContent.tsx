import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, DayStrip } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space } from '@/theme';

import { dayFromId, weekDays } from './eventFormat';
import { localDayKey } from './eventKeys';
import { EventsList } from './EventsList';
import { useEventsForDay } from './useEvents';

export interface EventsScreenContentProps {
  onOpenEvent: (id: string) => void;
  /** Long-press on the title; used as the hidden staff entry point. */
  onTitleLongPress: () => void;
}

/** Tonight's events with a strip to switch to the other days of this week. */
export function EventsScreenContent({ onOpenEvent, onTitleLongPress }: EventsScreenContentProps) {
  const insets = useSafeAreaInsets();
  const [today] = useState(() => new Date());
  const [selectedId, setSelectedId] = useState(() => localDayKey(today));
  const events = useEventsForDay(dayFromId(selectedId));

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <AppText variant="title" accessibilityRole="header" onLongPress={onTitleLongPress}>
          {t('events.title')}
        </AppText>
      </View>
      <DayStrip days={weekDays(today)} selectedId={selectedId} onSelect={setSelectedId} />
      <EventsList
        events={events.data}
        isLoading={events.isLoading}
        isError={events.isError}
        onRetry={() => void events.refetch()}
        onOpenEvent={onOpenEvent}
        safeAreaBottom={insets.bottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 96 },
  header: { paddingHorizontal: space.screen, paddingBottom: space.lg },
});
