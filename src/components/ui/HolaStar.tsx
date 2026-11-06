import { StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { brand, radius } from '@/theme';

export type CoverColor = 'yellow' | 'pink';

const STAR_PATH = 'M50 0C55 35 65 45 100 50C65 55 55 65 50 100C45 65 35 55 0 50C35 45 45 35 50 0Z';

export interface HolaStarProps {
  size: number;
  color: string;
  style?: ViewStyle;
}

/** The four-point Hola star from the logo. Decorative. */
export function HolaStar({ size, color, style }: HolaStarProps) {
  return (
    <View
      pointerEvents="none"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[styles.star, { width: size, height: size }, style]}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path d={STAR_PATH} fill={color} />
      </Svg>
    </View>
  );
}

/** Cover background color and the opposite accent used for its stars. */
export function coverColors(color: CoverColor): { background: string; star: string } {
  return color === 'yellow'
    ? { background: brand.yellow, star: brand.pink }
    : { background: brand.pink, star: brand.yellow };
}

export interface HolaStarCoverProps {
  color: CoverColor;
}

/** Star decoration for a large event cover (290 × 230), positioned as in the Main mockup. */
export function HolaStarCover({ color }: HolaStarCoverProps) {
  const { star } = coverColors(color);
  if (color === 'yellow') {
    return (
      <>
        <HolaStar size={190} color={star} style={{ right: -30, top: -30 }} />
        <HolaStar size={80} color={star} style={{ left: 30, top: 50 }} />
      </>
    );
  }
  return <HolaStar size={150} color={star} style={{ left: -20, top: -30 }} />;
}

export interface HolaStarThumbProps {
  color: CoverColor;
  size: number;
}

/** Square thumbnail with one star, as in the offer rows. */
export function HolaStarThumb({ color, size }: HolaStarThumbProps) {
  const { background, star } = coverColors(color);
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[styles.thumb, { width: size, height: size, backgroundColor: background }]}
    >
      <HolaStar size={44} color={star} style={{ left: 6, top: 6 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  star: { position: 'absolute' },
  thumb: { borderRadius: radius.chip, overflow: 'hidden', flexShrink: 0 },
});
