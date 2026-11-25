import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { TextField } from './TextField';

export const COMPOSER_MAX_CHARS = 500;
export const COMPOSER_MAX_PHOTOS = 4;
const THUMB = 72;

export interface ComposerProps {
  visible: boolean;
  text: string;
  onChangeText: (text: string) => void;
  /** Local URIs of the chosen photos, up to 4. */
  photoUris: readonly string[];
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
  onSubmit: () => void;
  onClose: () => void;
  /** Friendly reason from the server filter, e.g. "Схоже на рекламу події…". */
  error?: string;
  /** Publishing in progress: the button is disabled. */
  submitting?: boolean;
}

/** Bottom sheet for writing a post: text with counter, up to 4 photos, publish button. */
export function Composer({
  visible,
  text,
  onChangeText,
  photoUris,
  onAddPhoto,
  onRemovePhoto,
  onSubmit,
  onClose,
  error,
  submitting = false,
}: ComposerProps) {
  const { colors } = useTheme();
  const canSubmit = text.trim().length > 0 && !submitting;
  const nearLimit = text.length >= COMPOSER_MAX_CHARS;
  return (
    <BottomSheet visible={visible} title="Новий допис" onClose={onClose}>
      {error ? (
        <View
          accessible
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={[
            styles.banner,
            { borderColor: colors.danger, backgroundColor: colors.surfaceRaised },
          ]}
        >
          <AppText variant="caption" style={{ color: colors.danger }}>
            {error}
          </AppText>
        </View>
      ) : null}
      <TextField
        label="Що нового?"
        multiline
        maxLength={COMPOSER_MAX_CHARS}
        value={text}
        onChangeText={onChangeText}
      />
      <AppText
        variant="meta"
        accessibilityLabel={`${text.length} з ${COMPOSER_MAX_CHARS} символів`}
        style={[styles.counter, { color: nearLimit ? colors.danger : colors.textMuted }]}
      >
        {`${text.length}/${COMPOSER_MAX_CHARS}`}
      </AppText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.photos}
      >
        {photoUris.map((uri, index) => (
          <View key={uri} style={styles.thumbWrap}>
            <Image source={{ uri }} style={styles.thumb} contentFit="cover" accessible={false} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Прибрати фото ${index + 1}`}
              hitSlop={space.sm}
              onPress={() => onRemovePhoto(index)}
              style={[styles.remove, { backgroundColor: colors.glassOnCover.fill }]}
            >
              <Feather name="x" size={14} color={colors.glassOnCover.text} />
            </Pressable>
          </View>
        ))}
        {photoUris.length < COMPOSER_MAX_PHOTOS ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Додати фото"
            onPress={onAddPhoto}
            style={[
              styles.add,
              { borderColor: colors.border, backgroundColor: colors.surfaceRaised },
            ]}
          >
            <Feather name="image" size={22} color={colors.textMuted} />
          </Pressable>
        ) : null}
      </ScrollView>
      <Button label="Опублікувати" disabled={!canSubmit} onPress={onSubmit} />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 1.5,
    borderRadius: radius.control,
    padding: space.md,
  },
  counter: { alignSelf: 'flex-end' },
  photos: { gap: space.sm, paddingTop: space.xs, paddingRight: space.sm },
  thumbWrap: { width: THUMB, height: THUMB },
  thumb: { width: THUMB, height: THUMB, borderRadius: radius.chip },
  remove: {
    position: 'absolute',
    top: -space.xs,
    right: -space.xs,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    width: Math.max(THUMB, touchTarget),
    height: THUMB,
    borderRadius: radius.chip,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
