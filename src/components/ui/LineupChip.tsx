import { StyleSheet, View } from 'react-native';

import { radius, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface LineupChipProps {
  /** Artist name, or a placeholder such as "[Артист 1]" when unknown. */
  label: string;
}

export const LINEUP_CHIP_HEIGHT = 32;

/** Outlined artist chip in the event lineup. */
export function LineupChip({ label }: LineupChipProps) {
  const { colors } = useTheme();
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[styles.base, { borderColor: colors.border }]}
    >
      <AppText>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: LINEUP_CHIP_HEIGHT,
    paddingHorizontal: 14,
    borderRadius: radius.chip,
    borderWidth: 1,
    justifyContent: 'center',
  },
});
