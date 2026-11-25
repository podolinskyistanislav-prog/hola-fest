import { StyleSheet, View } from 'react-native';

import { space } from '@/theme';

import { DateTimeField } from './DateTimeField';

export interface TimeWindow {
  from: Date | null;
  to: Date | null;
}

export interface TimeWindowPickerProps {
  value: TimeWindow;
  onChange: (value: TimeWindow) => void;
  fromLabel?: string;
  toLabel?: string;
  /** Message under the "to" field, e.g. "Кінець має бути пізніше за початок". The form decides when. */
  error?: string;
}

/** Offer window: two Kyiv-time date and time fields. Range validation stays with the form. */
export function TimeWindowPicker({
  value,
  onChange,
  fromLabel = 'Початок',
  toLabel = 'Кінець',
  error,
}: TimeWindowPickerProps) {
  return (
    <View style={styles.root}>
      <DateTimeField
        label={fromLabel}
        value={value.from}
        onChange={(from) => onChange({ ...value, from })}
      />
      <DateTimeField
        label={toLabel}
        value={value.to}
        error={error}
        onChange={(to) => onChange({ ...value, to })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: space.md },
});
