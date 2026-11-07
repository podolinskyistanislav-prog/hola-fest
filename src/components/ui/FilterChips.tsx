import { ScrollView, StyleSheet } from 'react-native';

import { space } from '@/theme';

import { Chip } from './Chip';

export interface FilterChipItem {
  id: string;
  label: string;
}

export interface FilterChipsProps {
  chips: readonly FilterChipItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/** Horizontally scrolling row of filter chips; the selected one is filled white with black text. */
export function FilterChips({ chips, selectedId, onSelect }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.row}
      contentContainerStyle={styles.content}
    >
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.label}
          selected={chip.id === selectedId}
          onPress={() => onSelect(chip.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexGrow: 0, flexShrink: 0 },
  content: { paddingHorizontal: space.screen, gap: space.sm, alignItems: 'center' },
});
