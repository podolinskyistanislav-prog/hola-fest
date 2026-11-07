import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '@/theme';

export interface GlassSurfaceProps extends ViewProps {
  /**
   * `cover`: glass placed over a colored event cover. `floating`: tab bar, sheets.
   * `control`: small round buttons on the screen background (search).
   */
  kind?: 'floating' | 'cover' | 'control';
}

/**
 * Liquid glass for elements that float over content.
 * Uses native liquid glass on iOS 26+, and a translucent themed fill elsewhere.
 * Use it only for floating UI (tab bar, sheets, buttons on covers) — see docs/DESIGN.md.
 */
export function GlassSurface({ kind = 'floating', style, children, ...rest }: GlassSurfaceProps) {
  const { colors, scheme } = useTheme();
  const fallback = {
    cover: { backgroundColor: colors.glassOnCover.fill, borderColor: colors.glassOnCover.border },
    control: { backgroundColor: colors.glassControl.fill, borderColor: colors.glassControl.border },
    floating: { backgroundColor: colors.glass.fill, borderColor: colors.glass.border },
  }[kind];

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView
        glassEffectStyle="regular"
        colorScheme={kind === 'cover' ? 'dark' : scheme}
        style={[styles.base, style]}
        {...rest}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <View style={[styles.base, styles.fallback, fallback, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: 'hidden' },
  fallback: { borderWidth: StyleSheet.hairlineWidth },
});
