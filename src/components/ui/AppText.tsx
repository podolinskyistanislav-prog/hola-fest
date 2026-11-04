import { Text, type TextProps } from 'react-native';

import { typography, useTheme, type TypographyVariant } from '@/theme';

type Tone = 'default' | 'muted' | 'accent' | 'onAccent' | 'onCover';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  tone?: Tone;
}

/** All text in the app goes through this, so fonts and colors stay on-brand. */
export function AppText({ variant = 'body', tone = 'default', style, ...rest }: AppTextProps) {
  const { colors } = useTheme();
  const color = {
    default: colors.text,
    muted: colors.textMuted,
    accent: colors.accent,
    onAccent: '#000000',
    onCover: colors.glassOnCover.text,
  }[tone];
  return <Text style={[typography[variant], { color }, style]} {...rest} />;
}
