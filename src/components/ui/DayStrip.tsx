import { Pressable, StyleSheet, View } from 'react-native';

import { brand, layout, radius, space, useTheme } from '@/theme';

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
  /** Shows the pink dot: there are events on this day. */
  hasEvents?: boolean;
}

export interface DayStripProps {
  days: readonly DayStripDay[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/** Fixed tile height, so the strip never stretches with its parent. */
export const DAY_PILL_HEIGHT = layout.dayTileHeight;

/**
 * Row of equal-width day tiles. The selected day is yellow with black text;
 * a pink dot marks days that have events.
 */
export function DayStrip({ days, selectedId, onSelect }: DayStripProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.strip}>
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
            <AppText variant="dayWeekday" tone={selected ? 'onAccent' : 'muted'}>
              {day.weekday}
            </AppText>
            <AppText variant="dayDate" tone={selected ? 'onAccent' : 'default'}>
              {day.date}
            </AppText>
            {day.hasEvents ? (
              <View
                testID={`day-dot-${day.id}`}
                accessible={false}
                importantForAccessibility="no-hide-descendants"
                style={[styles.dot, { backgroundColor: brand.pink }]}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    gap: space.sm,
    paddingHorizontal: space.screen,
    alignSelf: 'stretch',
    flexGrow: 0,
    flexShrink: 0,
  },
  day: {
    flex: 1,
    minWidth: 0,
    height: DAY_PILL_HEIGHT,
    alignSelf: 'flex-start',
    borderRadius: radius.control,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  dot: {
    position: 'absolute',
    bottom: 7,
    width: layout.dayDotSize,
    height: layout.dayDotSize,
    borderRadius: layout.dayDotSize / 2,
  },
});
