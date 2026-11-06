import { Pressable, StyleSheet, View } from 'react-native';

import { space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';
import { Button } from './Button';
import { TextField } from './TextField';

export interface StringListFieldProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  /** Error message shown under the list. */
  error?: string;
  addLabel?: string;
  /** Maximum number of rows; the add button disappears when reached. */
  maxItems?: number;
}

/** Editable list of short strings (lineup). Empty rows are kept; the form decides what to drop. */
export function StringListField({
  label,
  items,
  onChange,
  error,
  addLabel = 'Додати',
  maxItems,
}: StringListFieldProps) {
  const { colors } = useTheme();
  const canAdd = maxItems === undefined || items.length < maxItems;

  return (
    <View style={styles.container}>
      <AppText variant="label" tone="muted">
        {label}
      </AppText>
      {items.map((item, index) => {
        const rowLabel = `${label} ${index + 1}`;
        return (
          // Rows have no stable id; the position is the identity of an editable row.
          <View key={index} style={styles.row}>
            <View style={styles.input}>
              <TextField
                label={rowLabel}
                value={item}
                autoCapitalize="sentences"
                onChangeText={(text) => onChange(items.map((old, i) => (i === index ? text : old)))}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Видалити: ${rowLabel}`}
              hitSlop={space.sm}
              onPress={() => onChange(items.filter((_, i) => i !== index))}
              style={styles.remove}
            >
              <AppText variant="label" style={{ color: colors.danger }}>
                Видалити
              </AppText>
            </Pressable>
          </View>
        );
      })}
      {canAdd ? (
        <Button label={addLabel} variant="inverse" onPress={() => onChange([...items, ''])} />
      ) : null}
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

const styles = StyleSheet.create({
  container: { gap: space.sm },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: space.sm },
  input: { flex: 1 },
  remove: { minHeight: touchTarget, justifyContent: 'center' },
});
