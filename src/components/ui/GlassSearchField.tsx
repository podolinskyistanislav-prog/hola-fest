import { Feather } from '@expo/vector-icons';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { space, useTheme } from '@/theme';

import { GlassSurface } from './GlassSurface';

export interface GlassSearchFieldProps extends Pick<
  TextInputProps,
  'value' | 'onChangeText' | 'placeholder'
> {
  /** Accessible name, "Пошук клубу". */
  label: string;
}

export const SEARCH_FIELD_HEIGHT = 52;

/** Floating glass search input over the map. Placeholder "Клуби поруч". */
export function GlassSearchField({
  label,
  placeholder,
  value,
  onChangeText,
}: GlassSearchFieldProps) {
  const { colors } = useTheme();
  return (
    <GlassSurface style={styles.field}>
      <Feather name="search" size={18} color={colors.textMuted} />
      <TextInput
        accessibilityLabel={label}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { color: colors.text }]}
      />
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  field: {
    height: SEARCH_FIELD_HEIGHT,
    borderRadius: SEARCH_FIELD_HEIGHT / 2,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md - 2,
  },
  input: { flex: 1, fontSize: 16, padding: 0 },
});
