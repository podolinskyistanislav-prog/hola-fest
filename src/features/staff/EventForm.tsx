import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppText,
  Button,
  DateTimeField,
  StringListField,
  SwitchField,
  TextField,
} from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import {
  LINEUP_MAX_ITEMS,
  toEventSubmission,
  validateEventForm,
  type EventFormValues,
  type EventSubmission,
} from './eventFormValidation';

export type EventFormProps = {
  initialValues: EventFormValues;
  isNew: boolean;
  isSaving: boolean;
  isSaveError: boolean;
  onSubmit: (submission: EventSubmission) => void;
  /** Content below the save button, e.g. the offers of an existing event. */
  footer?: ReactNode;
};

/** Create/edit event form. Errors appear per field after the first save attempt. */
export function EventForm({
  initialValues,
  isNew,
  isSaving,
  isSaveError,
  onSubmit,
  footer,
}: EventFormProps) {
  const { colors } = useTheme();
  const [values, setValues] = useState(initialValues);
  const [attempted, setAttempted] = useState(false);
  const errors = attempted ? validateEventForm(values) : {};
  const errorText = (key: keyof typeof errors) => {
    const error = errors[key];
    return error ? t(error) : undefined;
  };
  const set = (changes: Partial<EventFormValues>) => setValues((old) => ({ ...old, ...changes }));

  const submit = () => {
    setAttempted(true);
    const submission = toEventSubmission(values);
    if (submission) onSubmit(submission);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppText variant="title" accessibilityRole="header">
          {isNew ? t('eventForm.titleNew') : t('eventForm.titleEdit')}
        </AppText>
        <TextField
          label={t('eventForm.title')}
          value={values.title}
          autoCapitalize="sentences"
          error={errorText('title')}
          onChangeText={(title) => set({ title })}
        />
        <TextField
          label={t('eventForm.description')}
          value={values.description}
          multiline
          autoCapitalize="sentences"
          onChangeText={(description) => set({ description })}
        />
        <StringListField
          label={t('eventForm.lineup')}
          addLabel={t('eventForm.lineupAdd')}
          items={values.lineup}
          maxItems={LINEUP_MAX_ITEMS}
          error={errorText('lineup')}
          onChange={(lineup) => set({ lineup })}
        />
        <DateTimeField
          label={t('eventForm.startsAt')}
          value={values.startsAt}
          error={errorText('startsAt')}
          onChange={(startsAt) => set({ startsAt })}
        />
        <DateTimeField
          label={t('eventForm.endsAt')}
          value={values.endsAt}
          error={errorText('endsAt')}
          onChange={(endsAt) => set({ endsAt })}
        />
        <TextField
          label={t('eventForm.price')}
          value={values.price}
          keyboardType="number-pad"
          error={errorText('price')}
          onChangeText={(price) => set({ price })}
        />
        <SwitchField
          label={t('eventForm.published')}
          hint={t('eventForm.publishedHint')}
          value={values.published}
          onValueChange={(published) => set({ published })}
        />
        {isSaveError ? (
          <View accessibilityRole="alert">
            <AppText style={{ color: colors.danger }}>{t('eventForm.saveError')}</AppText>
          </View>
        ) : null}
        <Button
          label={isSaving ? t('eventForm.saving') : t('eventForm.save')}
          disabled={isSaving}
          onPress={submit}
        />
        {footer}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: space.screen, gap: space.lg },
});
