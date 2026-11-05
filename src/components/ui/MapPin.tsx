import { Pressable, StyleSheet, View } from 'react-native';

import { brand, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';

export type MapPinColor = 'yellow' | 'pink';

export interface MapPinProps {
  /** Venue name, used as the accessibility label. */
  label: string;
  color?: MapPinColor;
  selected?: boolean;
  onPress?: () => void;
}

const PIN_SIZE = 28;
const PIN_SIZE_SELECTED = 40;
const RING_WIDTH = 3;
const STAR_SIZE = 14;
const STAR_SIZE_SELECTED = 20;

/** A venue marker for the map: a Hola-colored disc with the star; bigger and ringed when selected. */
export function MapPin({ label, color = 'yellow', selected = false, onPress }: MapPinProps) {
  const { colors } = useTheme();
  const size = selected ? PIN_SIZE_SELECTED : PIN_SIZE;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={styles.hit}
    >
      <View
        style={[
          styles.disc,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color === 'yellow' ? brand.yellow : brand.pink,
            borderColor: selected ? colors.text : colors.background,
          },
        ]}
      >
        <AppText
          accessible={false}
          importantForAccessibility="no"
          style={[
            styles.star,
            { color: brand.onAccent, fontSize: selected ? STAR_SIZE_SELECTED : STAR_SIZE },
          ]}
        >
          ✦
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    minWidth: touchTarget,
    minHeight: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disc: { alignItems: 'center', justifyContent: 'center', borderWidth: RING_WIDTH },
  star: { includeFontPadding: false, textAlign: 'center' },
});
