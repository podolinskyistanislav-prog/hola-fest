import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { brand, radius, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';
import { GlassSurface } from './GlassSurface';

export type ButtonVariant = 'primary' | 'pink' | 'inverse' | 'glass';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
}

/**
 * Pill button. `primary` = Hola yellow, `pink` = Hola pink (both with black text),
 * `inverse` = solid text-colored pill, `glass` = translucent, for floating bars.
 */
export function Button({ label, variant = 'primary', disabled, style, ...rest }: ButtonProps) {
  const { colors } = useTheme();
  const solid = {
    primary: { bg: brand.yellow, text: 'onAccent' as const },
    pink: { bg: brand.pink, text: 'onAccent' as const },
    inverse: { bg: colors.text, text: 'default' as const },
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={(state) => [
        styles.base,
        state.pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      {variant === 'glass' ? (
        <GlassSurface style={styles.fill}>
          <AppText variant="bodyStrong">{label}</AppText>
        </GlassSurface>
      ) : (
        <AppText
          variant="bodyStrong"
          tone={solid[variant].text}
          style={[
            styles.fill,
            { backgroundColor: solid[variant].bg },
            variant === 'inverse' && { color: colors.background },
          ]}
        >
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: touchTarget + 4, borderRadius: radius.pill, overflow: 'hidden' },
  fill: {
    flexGrow: 1,
    minHeight: touchTarget + 4,
    paddingHorizontal: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: touchTarget + 4,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.4 },
});
