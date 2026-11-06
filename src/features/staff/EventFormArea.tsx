import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { EventForm } from './EventForm';
import { EventOffersSection } from './EventOffersSection';
import { useEventOffers } from './useEventOffers';
import { emptyEventForm, eventToFormValues } from './eventFormValidation';
import { useEventEditor } from './useEventEditor';

type EventFormAreaProps = {
  eventId?: string;
  onSaved?: () => void;
  onCreateOffer?: (eventId: string) => void;
  onOpenOffer?: (eventId: string, offerId: string) => void;
};

function EventOffers({
  eventId,
  onCreateOffer,
  onOpenOffer,
}: {
  eventId: string;
  onCreateOffer?: (eventId: string) => void;
  onOpenOffer?: (eventId: string, offerId: string) => void;
}) {
  const { offers, isLoading, isError, isToggleError, retry, toggleActive } =
    useEventOffers(eventId);
  return (
    <EventOffersSection
      offers={offers}
      isLoading={isLoading}
      isError={isError}
      isToggleError={isToggleError}
      onRetry={retry}
      onCreate={onCreateOffer ? () => onCreateOffer(eventId) : undefined}
      onOpenOffer={onOpenOffer ? (offerId) => onOpenOffer(eventId, offerId) : undefined}
      onToggleActive={toggleActive}
    />
  );
}

/** Admin screen content: create a new event or edit an existing one of my venue, with its offers. */
export function EventFormArea({
  eventId,
  onSaved,
  onCreateOffer,
  onOpenOffer,
}: EventFormAreaProps) {
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
      footer={
        eventId === undefined ? undefined : (
          <EventOffers eventId={eventId} onCreateOffer={onCreateOffer} onOpenOffer={onOpenOffer} />
        )
      }
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
