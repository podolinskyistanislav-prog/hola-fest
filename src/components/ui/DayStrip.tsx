import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { brand, radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface DayStripDay {
  /** Stable identifier, e.g. an ISO date. */
  id: string;
  /** Short weekday, already formatted (e.g. "Пт"). */
  weekday: string;
  /** Day of month, already formatted (e.g. "14"). */
  date: string;
  /** Full spoken label for screen readers (e.g. "П'ятниця, 14 червня"). */
  accessibilityLabel?: string;
}

export interface DayStripProps {
  days: readonly DayStripDay[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/** Horizontal day selector. The selected day is filled with the accent and uses black text. */
export function DayStrip({ days, selectedId, onSelect }: DayStripProps) {
  const { colors } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {days.map((day) => {
        const selected = day.id === selectedId;
        return (
          <Pressable
            key={day.id}
            accessibilityRole="button"
            accessibilityLabel={day.accessibilityLabel ?? `${day.weekday} ${day.date}`}
            accessibilityState={{ selected }}
            onPress={() => onSelect(day.id)}
            style={[
              styles.day,
              selected
                ? { backgroundColor: brand.yellow, borderColor: brand.yellow }
                : { backgroundColor: colors.surfaceRaised, borderColor: colors.border },
            ]}
          >
            <View style={styles.labels}>
              <AppText variant="label" tone={selected ? 'onAccent' : 'muted'}>
                {day.weekday}
              </AppText>
              <AppText variant="cardTitle" tone={selected ? 'onAccent' : 'default'}>
                {day.date}
              </AppText>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: space.screen,
    gap: space.sm,
  },
  day: {
    minWidth: 56,
    minHeight: touchTarget,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.control,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: { alignItems: 'center', gap: 2 },
});
