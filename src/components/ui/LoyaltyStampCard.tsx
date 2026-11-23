import { StyleSheet, View } from 'react-native';

import { brand, radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface LoyaltyStampCardProps {
  /** Visits so far; clamped to 0..goal. */
  visits: number;
  /** Stamps on the card, e.g. 5. */
  goal: number;
  /** "коктейль у подарунок". */
  reward: string;
  /** "Серія походів". */
  title?: string;
  /** "Скоро": the feature is a placeholder for now. */
  badgeLabel?: string;
}

const STAMP_SIZE = 40;

/** Placeholder loyalty card: filled and empty stamps toward a reward. Not wired to data yet. */
export function LoyaltyStampCard({
  visits,
  goal,
  reward,
  title = 'Серія походів',
  badgeLabel = 'Скоро',
}: LoyaltyStampCardProps) {
  const { colors } = useTheme();
  const filled = Math.max(0, Math.min(Math.floor(visits), goal));
  const caption = `${goal} візитів — ${reward}`;

  return (
    <View
      accessible
      accessibilityLabel={`${title}, ${filled} з ${goal}. ${caption}. ${badgeLabel}`}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.rowBorder }]}
    >
      <View style={styles.header}>
        <AppText variant="cardTitle" style={styles.title}>
          {title}
        </AppText>
        <View style={[styles.badge, { backgroundColor: brand.yellow }]}>
          <AppText variant="label" tone="onAccent">
            {badgeLabel}
          </AppText>
        </View>
      </View>
      <View style={styles.stamps}>
        {Array.from({ length: goal }, (_, index) => (
          <View
            key={index}
            testID={index < filled ? 'stamp-filled' : 'stamp-empty'}
            style={[
              styles.stamp,
              index < filled
                ? { backgroundColor: brand.yellow, borderColor: brand.yellow }
                : { borderColor: colors.border },
            ]}
          />
        ))}
      </View>
      <AppText variant="caption" tone="muted">
        {caption}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: space.lg, gap: space.md, borderRadius: radius.card, borderWidth: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  title: { flex: 1 },
  badge: { paddingHorizontal: 10, height: 24, borderRadius: radius.pill, justifyContent: 'center' },
  stamps: { flexDirection: 'row', gap: space.sm },
  stamp: { width: STAMP_SIZE, height: STAMP_SIZE, borderRadius: STAMP_SIZE / 2, borderWidth: 2 },
});
