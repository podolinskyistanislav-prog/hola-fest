import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { EventForm } from './EventForm';
import { emptyEventForm, eventToFormValues } from './eventFormValidation';
import { useEventEditor } from './useEventEditor';

type EventFormAreaProps = { eventId?: string; onSaved?: () => void };

/** Admin screen content: create a new event or edit an existing one of my venue. */
export function EventFormArea({ eventId, onSaved }: EventFormAreaProps) {
  const { colors } = useTheme();
  const editor = useEventEditor(eventId);

  if (editor.isLoading || editor.isLoadError) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        {editor.isLoadError ? (
          <View style={styles.message}>
            <AppText tone="muted" accessibilityRole="alert">
              {t('eventForm.loadError')}
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
    <EventForm
      initialValues={editor.event ? eventToFormValues(editor.event) : emptyEventForm}
      isNew={eventId === undefined}
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
