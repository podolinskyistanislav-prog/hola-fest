import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { OfferForm } from './OfferForm';
import { emptyOfferForm, offerToFormValues } from './offerFormValidation';
import { useOfferEditor } from './useOfferEditor';

type OfferFormAreaProps = { eventId: string; offerId?: string; onSaved?: () => void };

/** Admin screen content: create a new offer on an event or edit an existing one. */
export function OfferFormArea({ eventId, offerId, onSaved }: OfferFormAreaProps) {
  const { colors } = useTheme();
  const editor = useOfferEditor(eventId, offerId);

  if (editor.isLoading || editor.isLoadError) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        {editor.isLoadError ? (
          <View style={styles.message}>
            <AppText tone="muted" accessibilityRole="alert">
              {t('offerForm.loadError')}
            </AppText>
            <Button label={t('staff.retry')} onPress={editor.retry} />
          </View>
        ) : (
          <AppText
            tone="muted"
            accessibilityRole="progressbar"
            accessibilityLabel={t('staff.loading')}
          >
            {t('staff.loading')}
          </AppText>
        )}
      </SafeAreaView>
    );
  }

  return (
    <OfferForm
      initialValues={editor.offer ? offerToFormValues(editor.offer) : emptyOfferForm}
      isNew={offerId === undefined}
      isSaving={editor.isSaving}
      isSaveError={editor.isSaveError}
      onSubmit={(submission) => {
        void editor.save(submission).then((ok) => {
          if (ok) onSaved?.();
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen },
  message: { gap: space.lg },
});
