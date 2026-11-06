import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { radius, space, touchTarget, typography, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface TextFieldProps extends Omit<TextInputProps, 'style' | 'secureTextEntry'> {
  label: string;
  /** Error message shown under the field. Presence turns the field into its error state. */
  error?: string;
  /** Hides the text and shows a show/hide toggle (passwords). */
  secure?: boolean;
}

/** Themed text input: label above, error text below, 44pt+ touch target. */
export function TextField({
  label,
  error,
  secure = false,
  multiline = false,
  editable = true,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const { colors } = useTheme();
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);
  const borderColor = error ? colors.danger : focused ? colors.accent : colors.border;

  return (
    <View style={styles.container}>
      <AppText variant="label" tone="muted">
        {label}
      </AppText>
      <View
        style={[
          styles.field,
          { backgroundColor: colors.surfaceRaised, borderColor },
          !editable && styles.disabled,
        ]}
      >
        <TextInput
          accessibilityLabel={label}
          accessibilityState={{ disabled: !editable }}
          editable={editable}
          secureTextEntry={secure && !revealed}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.accent}
          autoCapitalize="none"
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...rest}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          style={[
            styles.input,
            multiline && styles.multiline,
            typography.body,
            { color: colors.text },
          ]}
        />
        {secure ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={revealed ? 'Сховати пароль' : 'Показати пароль'}
            hitSlop={space.sm}
            onPress={() => setRevealed((value) => !value)}
            style={styles.toggle}
          >
            <AppText variant="label" tone="muted">
              {revealed ? 'Сховати' : 'Показати'}
            </AppText>
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <AppText
          variant="caption"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={{ color: colors.danger }}
        >
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const MULTILINE_MIN_HEIGHT = 96;

const styles = StyleSheet.create({
  container: { gap: space.xs },
  field: {
    minHeight: touchTarget + 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: radius.control,
    paddingHorizontal: space.lg,
  },
  input: { flex: 1, minHeight: touchTarget, paddingVertical: space.sm },
  multiline: { minHeight: MULTILINE_MIN_HEIGHT },
  toggle: { minHeight: touchTarget, justifyContent: 'center', paddingLeft: space.md },
  disabled: { opacity: 0.5 },
});
