import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { brand, radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface ImageUploaderProps {
  /** Label above the tile, e.g. "Обкладинка". */
  label: string;
  /** Uploaded or picked image; missing shows the "add" tile. */
  uri?: string | null;
  /** Upload progress 0..1 while uploading; undefined when idle. */
  progress?: number;
  /** Opens the picker (pick, crop and resize happen in the screen). */
  onPick: () => void;
  onRemove: () => void;
  /** Already translated texts. */
  addLabel?: string;
  replaceLabel?: string;
  removeLabel?: string;
  uploadingLabel?: string;
}

const TILE_HEIGHT = 160;
const BAR_HEIGHT = 6;

/** Image slot: add tile, preview with replace and remove, upload progress. Pure; no picker inside. */
export function ImageUploader({
  label,
  uri,
  progress,
  onPick,
  onRemove,
  addLabel = 'Додати фото',
  replaceLabel = 'Замінити фото',
  removeLabel = 'Видалити фото',
  uploadingLabel = 'Завантаження',
}: ImageUploaderProps) {
  const { colors } = useTheme();
  const uploading = progress !== undefined;
  const percent = Math.round(Math.min(Math.max(progress ?? 0, 0), 1) * 100);

  return (
    <View style={styles.root}>
      <AppText variant="label" tone="muted">
        {label}
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={(uri ? replaceLabel : addLabel) + ', ' + label}
        accessibilityState={{ disabled: uploading, busy: uploading }}
        disabled={uploading}
        onPress={onPick}
        style={[styles.tile, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }]}
      >
        {uri ? (
          <Image source={{ uri }} accessible={false} style={styles.image} contentFit="cover" />
        ) : (
          <AppText variant="bodyStrong" tone="muted">
            {'+ ' + addLabel}
          </AppText>
        )}
        {uploading ? (
          <View style={[styles.overlay, { backgroundColor: colors.glassOnCover.fill }]}>
            <AppText
              variant="label"
              tone="onCover"
              accessibilityRole="progressbar"
              accessibilityLabel={uploadingLabel}
              accessibilityValue={{ min: 0, max: 100, now: percent }}
            >
              {uploadingLabel + ' ' + percent + '%'}
            </AppText>
            <View style={[styles.track, { backgroundColor: colors.glassOnCover.border }]}>
              <View testID="upload-bar" style={[styles.fill, { width: `${percent}%` }]} />
            </View>
          </View>
        ) : null}
      </Pressable>
      {uri && !uploading ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={removeLabel + ', ' + label}
          onPress={onRemove}
          style={styles.remove}
        >
          <AppText variant="link" tone="accent">
            {removeLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: space.sm },
  tile: {
    height: TILE_HEIGHT,
    borderRadius: radius.card,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: { ...StyleSheet.absoluteFill },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    padding: space.xl,
  },
  track: {
    alignSelf: 'stretch',
    height: BAR_HEIGHT,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: { height: BAR_HEIGHT, backgroundColor: brand.yellow },
  remove: { minHeight: touchTarget, justifyContent: 'center', alignSelf: 'flex-start' },
});
