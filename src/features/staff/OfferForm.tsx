import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, DateTimeField, SwitchField, TextField } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import {
  toOfferSubmission,
  validateOfferForm,
  type OfferFormValues,
  type OfferSubmission,
} from './offerFormValidation';

export type OfferFormProps = {
  initialValues: OfferFormValues;
  isNew: boolean;
  isSaving: boolean;
  isSaveError: boolean;
  onSubmit: (submission: OfferSubmission) => void;
};

/** Create/edit offer form. Errors appear per field after the first save attempt. */
export function OfferForm({
  initialValues,
  isNew,
  isSaving,
  isSaveError,
  onSubmit,
}: OfferFormProps) {
  const { colors } = useTheme();
  const [values, setValues] = useState(initialValues);
  const [attempted, setAttempted] = useState(false);
  const errors = attempted ? validateOfferForm(values) : {};
  const errorText = (key: keyof typeof errors) => {
    const error = errors[key];
    return error ? t(error) : undefined;
  };
  const set = (changes: Partial<OfferFormValues>) => setValues((old) => ({ ...old, ...changes }));

  const submit = () => {
    setAttempted(true);
    const submission = toOfferSubmission(values);
    if (submission) onSubmit(submission);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppText variant="title" accessibilityRole="header">
          {isNew ? t('offerForm.titleNew') : t('offerForm.titleEdit')}
        </AppText>
        <TextField
          label={t('offerForm.title')}
          value={values.title}
          autoCapitalize="sentences"
          error={errorText('title')}
          onChangeText={(title) => set({ title })}
        />
        <TextField
          label={t('offerForm.terms')}
          value={values.terms}
          multiline
          autoCapitalize="sentences"
          error={errorText('terms')}
          onChangeText={(terms) => set({ terms })}
        />
        <TextField
          label={t('offerForm.maxClaims')}
          value={values.maxClaims}
          keyboardType="number-pad"
          error={errorText('maxClaims')}
          onChangeText={(maxClaims) => set({ maxClaims })}
        />
        <TextField
          label={t('offerForm.perUserLimit')}
          value={values.perUserLimit}
          keyboardType="number-pad"
          error={errorText('perUserLimit')}
          onChangeText={(perUserLimit) => set({ perUserLimit })}
        />
        <DateTimeField
          label={t('offerForm.validUntil')}
          value={values.validUntil}
          onChange={(validUntil) => set({ validUntil })}
        />
        <SwitchField
          label={t('offerForm.active')}
          hint={t('offerForm.activeHint')}
          value={values.isActive}
          onValueChange={(isActive) => set({ isActive })}
        />
        {isSaveError ? (
          <View accessibilityRole="alert">
            <AppText style={{ color: colors.danger }}>{t('offerForm.saveError')}</AppText>
          </View>
        ) : null}
        <Button
          label={isSaving ? t('eventForm.saving') : t('eventForm.save')}
          disabled={isSaving}
          onPress={submit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: space.screen, gap: space.lg },
});
