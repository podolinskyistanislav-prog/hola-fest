import { StyleSheet, View } from 'react-native';

import { brand } from '@/theme';

const BLOB_OPACITY = 0.9;

/**
 * Yellow and pink circles behind the QR glass card, so the glass has something to refract.
 * Absolutely fills its parent and never takes touches. Decorative.
 */
export function AccentBlobs() {
  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      <View testID="accent-blob-yellow" style={[styles.blob, styles.yellow]} />
      <View testID="accent-blob-pink" style={[styles.blob, styles.pink]} />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute', opacity: BLOB_OPACITY },
  yellow: {
    left: -60,
    top: 190,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: brand.yellow,
  },
  pink: {
    right: -80,
    top: 340,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: brand.pink,
  },
});
