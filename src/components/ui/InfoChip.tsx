import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { brand, fontFamily, radius, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface InfoChipProps {
  label: string;
  /** `check` is yellow (curfew ok), `shield` is for the shelter, none is a plain chip. */
  icon?: 'check' | 'shield';
}

export const INFO_CHIP_HEIGHT = 32;

/** Read-only fact chip on the event page: time, price, curfew, shelter. */
export function InfoChip({ label, icon }: InfoChipProps) {
  const { colors } = useTheme();
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[styles.base, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }]}
    >
      {icon ? (
        <Feather name={icon} size={14} color={icon === 'check' ? brand.yellow : colors.text} />
      ) : null}
      <AppText variant="label" style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: INFO_CHIP_HEIGHT,
    paddingHorizontal: 12,
    borderRadius: radius.chip,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: { fontFamily: fontFamily.bodyMedium },
});
