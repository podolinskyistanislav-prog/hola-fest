import { Pressable, StyleSheet, View } from 'react-native';

import { space } from '@/theme';

import { AppText } from './AppText';

export interface SectionHeaderProps {
  /** e.g. "Сьогодні · 2 події". */
  title: string;
  /** Link text on the right, e.g. "На карті" or "Усі". */
  actionLabel: string;
  onActionPress?: () => void;
}

/** Section title on the left, accent link on the right. */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <AppText variant="heading" accessibilityRole="header" style={styles.title}>
        {title}
      </AppText>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={actionLabel}
        onPress={onActionPress}
        hitSlop={space.md}
      >
        <AppText variant="link" tone="accent">
          {actionLabel}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: space.md,
    paddingHorizontal: space.screen,
  },
  title: { flexShrink: 1 },
});
