import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, DjAvatar, TextField } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, touchTarget, useTheme } from '@/theme';
import type { DjOption } from '@/types/djs';

import { LINEUP_DJS_MAX } from './eventFormValidation';
import { useDjSearch } from './useDjSearch';

export interface LineupDjPickerProps {
  selected: DjOption[];
  onChange: (djs: DjOption[]) => void;
}

function DjLine({
  dj,
  actionLabel,
  onPress,
}: {
  dj: DjOption;
  actionLabel: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <DjAvatar name={dj.name} photoUri={dj.photoUrl} size={48} />
      <AppText variant="bodyStrong" style={styles.name} numberOfLines={1}>
        {dj.name}
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${actionLabel}: ${dj.name}`}
        onPress={onPress}
        hitSlop={space.sm}
        style={styles.action}
      >
        <AppText variant="link" tone="accent">
          {actionLabel}
        </AppText>
      </Pressable>
    </View>
  );
}

/** Pick published platform DJs for the lineup: search by name, add, remove. */
export function LineupDjPicker({ selected, onChange }: LineupDjPickerProps) {
  const [query, setQuery] = useState('');
  const results = useDjSearch(query);
  const chosen = new Set(selected.map((dj) => dj.id));
  const candidates = (results.data ?? []).filter((dj) => !chosen.has(dj.id));
  const full = selected.length >= LINEUP_DJS_MAX;

  return (
    <View style={styles.root}>
      <AppText variant="label" tone="muted">
        {t('eventForm.djs')}
      </AppText>
      {selected.map((dj) => (
        <DjLine
          key={dj.id}
          dj={dj}
          actionLabel={t('eventForm.djsRemove')}
          onPress={() => onChange(selected.filter((item) => item.id !== dj.id))}
        />
      ))}
      {full ? null : (
        <>
          <TextField
            label={t('eventForm.djsSearch')}
            value={query}
            autoCapitalize="none"
            onChangeText={setQuery}
          />
          {results.isError ? (
            <AppText accessibilityRole="alert" tone="muted">
              {t('eventForm.djsError')}
            </AppText>
          ) : null}
          {results.isSuccess && candidates.length === 0 ? (
            <AppText tone="muted">{t('eventForm.djsEmpty')}</AppText>
          ) : null}
          {candidates.map((dj) => (
            <DjLine
              key={dj.id}
              dj={dj}
              actionLabel={t('eventForm.djsAdd')}
              onPress={() => onChange([...selected, dj])}
            />
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: space.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.row,
  },
  name: { flex: 1 },
  action: { minHeight: touchTarget, justifyContent: 'center', paddingHorizontal: space.sm },
});
