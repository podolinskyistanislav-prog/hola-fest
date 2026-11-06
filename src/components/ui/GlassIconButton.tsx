import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { touchTarget, useTheme } from '@/theme';

import { GlassSurface } from './GlassSurface';

export type GlassIconName = 'back' | 'share' | 'close' | 'brightness';

const FEATHER_NAME = {
  back: 'chevron-left',
  share: 'share',
  close: 'x',
  brightness: 'sun',
} as const;

export interface GlassIconButtonProps {
  icon: GlassIconName;
  /** Required: icon-only buttons need an accessible name, e.g. "Назад". */
  label: string;
  /** `cover`: over an event cover (white icon). `floating`: over the screen background. */
  kind?: 'floating' | 'cover';
  /** Icon tint override, e.g. yellow for the brightness toggle. */
  color?: string;
  /** Diameter: 44 for top buttons (default), 56 for the bottom toggle. */
  size?: number;
  onPress?: () => void;
}

/** Round glass icon button: back, share, close, brightness. */
export function GlassIconButton({
  icon,
  label,
  kind = 'floating',
  color,
  size = touchTarget,
  onPress,
}: GlassIconButtonProps) {
  const { colors } = useTheme();
  const tint = color ?? (kind === 'cover' ? colors.glassOnCover.text : colors.text);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <GlassSurface
        kind={kind}
        style={[styles.base, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Feather name={FEATHER_NAME[icon]} size={20} color={tint} />
      </GlassSurface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.8 },
});
