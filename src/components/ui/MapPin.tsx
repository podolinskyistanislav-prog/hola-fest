import { Pressable, StyleSheet, View } from 'react-native';

import { brand, touchTarget } from '@/theme';

import { AppText } from './AppText';

export type MapPinColor = 'yellow' | 'pink';

export interface MapPinProps {
  /** Venue name: shown in the label pill and used as the accessibility label. */
  label: string;
  /** Venue accent color. */
  color?: MapPinColor;
  selected?: boolean;
  onPress?: () => void;
}

export const MAP_PIN_LABEL_HEIGHT = 28;
export const MAP_PIN_DOT_SIZE = 16;
const DOT_BORDER = 3;
const HALO_DIAMETER = MAP_PIN_DOT_SIZE + 12;

const HALO = {
  yellow: 'rgba(253, 211, 3, 0.25)',
  pink: 'rgba(241, 39, 125, 0.25)',
} as const;

/** A venue marker for the map: name pill above a dot with a halo, in the venue accent color. */
export function MapPin({ label, color = 'yellow', selected = false, onPress }: MapPinProps) {
  const accent = color === 'yellow' ? brand.yellow : brand.pink;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={styles.hit}
    >
      <View style={[styles.label, { backgroundColor: accent }]}>
        <AppText variant="label" tone="onAccent" numberOfLines={1} style={styles.labelText}>
          {label}
        </AppText>
      </View>
      <View style={[styles.halo, { backgroundColor: HALO[color] }]}>
        <View style={[styles.dot, { backgroundColor: accent, borderColor: brand.onAccent }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: { minWidth: touchTarget, alignItems: 'center', gap: 6 },
  label: {
    height: MAP_PIN_LABEL_HEIGHT,
    paddingHorizontal: 10,
    borderRadius: MAP_PIN_LABEL_HEIGHT / 2,
    justifyContent: 'center',
  },
  labelText: { fontSize: 12 },
  halo: {
    width: HALO_DIAMETER,
    height: HALO_DIAMETER,
    borderRadius: HALO_DIAMETER / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: MAP_PIN_DOT_SIZE,
    height: MAP_PIN_DOT_SIZE,
    borderRadius: MAP_PIN_DOT_SIZE / 2,
    borderWidth: DOT_BORDER,
  },
});
