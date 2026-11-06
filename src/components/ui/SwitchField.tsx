import { StyleSheet, Switch, View } from 'react-native';

import { space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface SwitchFieldProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  /** Optional helper line under the label. */
  hint?: string;
  disabled?: boolean;
}

/** Labelled on/off toggle (published, active). */
export function SwitchField({
  label,
  value,
  onValueChange,
  hint,
  disabled = false,
}: SwitchFieldProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.row, disabled && styles.disabled]}>
      <View style={styles.texts}>
        <AppText variant="body">{label}</AppText>
        {hint ? (
          <AppText variant="caption" tone="muted">
            {hint}
          </AppText>
        ) : null}
      </View>
      <Switch
        accessibilityRole="switch"
        accessibilityLabel={label}
        accessibilityState={{ checked: value, disabled }}
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.accent }}
        thumbColor={colors.surfaceRaised}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
  texts: { flex: 1, gap: space.xs },
  disabled: { opacity: 0.5 },
});
