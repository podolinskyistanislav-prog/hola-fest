import { Pressable, StyleSheet } from 'react-native';

import { radius, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface GlassPillButtonProps {
  label: string;
  height: number;
  onPress?: () => void;
  /** Share the row width equally with siblings. */
  flex?: boolean;
}

/** Translucent pill that sits on a glass panel (taxi provider, "Поїхати"). */
export function GlassPillButton({ label, height, onPress, flex = false }: GlassPillButtonProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          backgroundColor: colors.glassButton.fill,
          borderColor: colors.glassButton.border,
        },
        flex && styles.flex,
        pressed && styles.pressed,
      ]}
    >
      <AppText variant="bodyStrong">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: { flex: 1 },
  pressed: { opacity: 0.8 },
});
