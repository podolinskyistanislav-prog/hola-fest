import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { brand, radius, space, useTheme } from '@/theme';

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
      style={styles.strip}
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

/** Fixed pill height, so the strip never stretches with its parent. */
export const DAY_PILL_HEIGHT = 60;

const styles = StyleSheet.create({
  strip: { flexGrow: 0, flexShrink: 0 },
  content: {
    paddingHorizontal: space.screen,
    gap: space.sm,
  },
  day: {
    minWidth: 56,
    height: DAY_PILL_HEIGHT,
    alignSelf: 'flex-start',
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.control,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: { alignItems: 'center', gap: 2 },
});
