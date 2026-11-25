import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { radius, space, useTheme } from '@/theme';

const MAX_PHOTOS = 4;
const ROW_HEIGHT = 140;
const SINGLE_HEIGHT = 220;

export interface ImageGridProps {
  /** 1–4 photo URLs; extra ones are ignored. */
  uris: readonly string[];
  /** Tap on a photo; receives its index. */
  onPressImage?: (index: number) => void;
}

/** Rounded photo grid of a post: 1 full width, 2 side by side, 3–4 in two columns. */
export function ImageGrid({ uris, onPressImage }: ImageGridProps) {
  const { colors } = useTheme();
  const shown = uris.slice(0, MAX_PHOTOS);
  if (shown.length === 0) return null;

  const rows: string[][] = [];
  if (shown.length === 3) {
    rows.push([shown[0] as string], shown.slice(1));
  } else {
    for (let i = 0; i < shown.length; i += 2) rows.push(shown.slice(i, i + 2));
  }
  const height = shown.length === 1 ? SINGLE_HEIGHT : ROW_HEIGHT;
  let index = 0;

  return (
    <View style={[styles.grid, { backgroundColor: colors.surfaceRaised }]}>
      {rows.map((row) => (
        <View key={row.join('|')} style={styles.row}>
          {row.map((uri) => {
            const position = index++;
            return (
              <Pressable
                key={uri}
                accessibilityRole="imagebutton"
                accessibilityLabel={`Фото ${position + 1} з ${shown.length}`}
                onPress={() => onPressImage?.(position)}
                style={[styles.cell, { height }]}
              >
                <Image
                  source={{ uri }}
                  style={styles.image}
                  contentFit="cover"
                  accessible={false}
                />
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { borderRadius: radius.row, overflow: 'hidden', gap: space.xs },
  row: { flexDirection: 'row', gap: space.xs },
  cell: { flex: 1 },
  image: { width: '100%', height: '100%' },
});
