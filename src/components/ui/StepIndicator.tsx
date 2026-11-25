import { StyleSheet, View } from 'react-native';

import { brand, radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface StepIndicatorProps {
  /** Number of steps, at least 1. */
  total: number;
  /** Current step, 1-based. */
  current: number;
  /** Already translated, e.g. "Крок 2 з 4". Used as the accessibility label and the caption. */
  label: string;
}

const SEGMENT_HEIGHT = 6;

/** Wizard progress: one segment per step, finished and current ones filled yellow. */
export function StepIndicator({ total, current, label }: StepIndicatorProps) {
  const { colors } = useTheme();
  const safeTotal = Math.max(1, total);
  const safeCurrent = Math.min(Math.max(1, current), safeTotal);
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 1, max: safeTotal, now: safeCurrent }}
      style={styles.root}
    >
      <View style={styles.bar}>
        {Array.from({ length: safeTotal }, (_, index) => (
          <View
            key={index}
            testID={index < safeCurrent ? 'step-done' : 'step-todo'}
            style={[
              styles.segment,
              { backgroundColor: index < safeCurrent ? brand.yellow : colors.surfaceRaised },
            ]}
          />
        ))}
      </View>
      <AppText variant="caption" tone="muted">
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: space.sm },
  bar: { flexDirection: 'row', gap: space.xs },
  segment: { flex: 1, height: SEGMENT_HEIGHT, borderRadius: radius.pill },
});
