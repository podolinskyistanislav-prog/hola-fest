import { Pressable, StyleSheet } from 'react-native';

import { radius, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

/** Filter / info chip. Selected state uses the inverse (text-colored) fill. */
export function Chip({ label, selected = false, onPress }: ChipProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      hitSlop={6}
      style={[
        styles.base,
        selected
          ? { backgroundColor: colors.text, borderColor: colors.text }
          : { backgroundColor: colors.surfaceRaised, borderColor: colors.border },
      ]}
    >
      <AppText variant="label" style={{ color: selected ? colors.background : colors.text }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: radius.chip,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
