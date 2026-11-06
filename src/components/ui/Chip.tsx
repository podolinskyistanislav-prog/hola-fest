import { Pressable, StyleSheet } from 'react-native';

import { layout, useTheme } from '@/theme';

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
      <AppText
        variant={selected ? 'label' : 'chip'}
        style={{ color: selected ? colors.background : colors.text }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: layout.chipHeight,
    paddingHorizontal: 14,
    borderRadius: layout.chipHeight / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
