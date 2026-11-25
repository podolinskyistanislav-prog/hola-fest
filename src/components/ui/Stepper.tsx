import { Pressable, StyleSheet, View } from 'react-native';

import { radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface StepperProps {
  /** Field label shown above, e.g. "Ліміт на гостя". */
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Already translated labels of the two buttons. */
  decreaseLabel?: string;
  increaseLabel?: string;
}

/** A number with − and + buttons. Clamps to min and max; the form owns the rest of validation. */
export function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  decreaseLabel = 'Менше',
  increaseLabel = 'Більше',
}: StepperProps) {
  const { colors } = useTheme();
  const canDecrease = value - step >= min;
  const canIncrease = value + step <= max;

  const button = (sign: string, name: string, enabled: boolean, next: number) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name + ', ' + label}
      accessibilityState={{ disabled: !enabled }}
      disabled={!enabled}
      onPress={() => onChange(next)}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.surfaceRaised, opacity: !enabled ? 0.4 : pressed ? 0.8 : 1 },
      ]}
    >
      <AppText variant="heading">{sign}</AppText>
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <AppText variant="label" tone="muted">
        {label}
      </AppText>
      <View style={styles.row}>
        {button('−', decreaseLabel, canDecrease, value - step)}
        <AppText
          variant="heading"
          accessibilityRole="adjustable"
          accessibilityLabel={label}
          accessibilityValue={{ text: String(value) }}
          style={styles.value}
        >
          {value}
        </AppText>
        {button('+', increaseLabel, canIncrease, value + step)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: space.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.lg },
  button: {
    width: touchTarget,
    height: touchTarget,
    borderRadius: radius.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { minWidth: 56, textAlign: 'center' },
});
