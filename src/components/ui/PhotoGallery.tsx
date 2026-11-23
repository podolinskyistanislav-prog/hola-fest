import { Image } from 'expo-image';
import { ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface PhotoSlot {
  id: string;
  /** "Ззовні" / "Всередині". */
  label: string;
  /** Missing photo shows the placeholder tile. */
  uri?: string | null;
}

export interface PhotoGalleryProps {
  /** At least two slots. */
  slots: readonly PhotoSlot[];
  /** "Фото скоро". */
  placeholderLabel?: string;
}

export const PHOTO_TILE_WIDTH = 220;
export const PHOTO_TILE_HEIGHT = 150;

/** Horizontal strip of labelled photos; an empty slot is a placeholder tile, never hidden. */
export function PhotoGallery({ slots, placeholderLabel = 'Фото скоро' }: PhotoGalleryProps) {
  const { colors } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.strip}
    >
      {slots.map((slot) => (
        <View
          key={slot.id}
          accessible
          accessibilityRole="image"
          accessibilityLabel={slot.uri ? slot.label : `${slot.label}, ${placeholderLabel}`}
          style={styles.slot}
        >
          {slot.uri ? (
            <Image
              source={{ uri: slot.uri }}
              accessible={false}
              style={styles.tile}
              contentFit="cover"
            />
          ) : (
            <View
              style={[
                styles.tile,
                styles.placeholder,
                { backgroundColor: colors.surfaceRaised, borderColor: colors.border },
              ]}
            >
              <Svg
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.textMuted}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <Circle cx={12} cy={13} r={3.5} />
              </Svg>
              <AppText variant="caption" tone="muted">
                {placeholderLabel}
              </AppText>
            </View>
          )}
          <AppText variant="label" tone="muted">
            {slot.label}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  strip: { gap: space.md, paddingHorizontal: space.screen },
  slot: { width: PHOTO_TILE_WIDTH, gap: space.sm },
  tile: { width: PHOTO_TILE_WIDTH, height: PHOTO_TILE_HEIGHT, borderRadius: radius.card },
  placeholder: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
  },
});
