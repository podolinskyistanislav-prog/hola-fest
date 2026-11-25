import { StyleSheet, View } from 'react-native';

import { radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface StatTileProps {
  /** Already formatted number, e.g. "128". */
  value: string;
  /** "Взято", "Використано". */
  label: string;
}

/** Big number with a caption, for offer and venue stats. One accessibility element. */
export function StatTile({ value, label }: StatTileProps) {
  const { colors } = useTheme();
  return (
    <View
      accessible
      accessibilityLabel={label + ': ' + value}
      style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <AppText variant="title">{value}</AppText>
      <AppText variant="caption" tone="muted">
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    gap: space.xs,
    padding: space.lg,
    borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
