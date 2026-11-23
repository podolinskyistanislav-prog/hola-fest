import { Pressable, StyleSheet } from 'react-native';

import { brand, radius, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface GlassPillButtonProps {
  label: string;
  height: number;
  onPress?: () => void;
  /** Share the row width equally with siblings. */
  flex?: boolean;
  /** Filled Hola yellow with black text, for the main choice. */
  primary?: boolean;
}

/** Translucent pill that sits on a glass panel (taxi provider, "Поїхати"). */
export function GlassPillButton({
  label,
  height,
  onPress,
  flex = false,
  primary = false,
}: GlassPillButtonProps) {
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
          backgroundColor: primary ? brand.yellow : colors.glassButton.fill,
          borderColor: primary ? brand.yellow : colors.glassButton.border,
        },
        flex && styles.flex,
        pressed && styles.pressed,
      ]}
    >
      <AppText variant="bodyStrong" tone={primary ? 'onAccent' : 'default'}>
        {label}
      </AppText>
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
