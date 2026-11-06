import { AppText } from './AppText';

export interface HolaStarProps {
  color: string;
  size: number;
}

/** The 4-point Hola star used on covers, offers and venue thumbs. Decorative. */
export function HolaStar({ color, size }: HolaStarProps) {
  return (
    <AppText
      accessible={false}
      importantForAccessibility="no"
      style={{ color, fontSize: size, lineHeight: size, includeFontPadding: false }}
    >
      ✦
    </AppText>
  );
}
