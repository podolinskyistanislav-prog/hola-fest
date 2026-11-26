import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { useCabinetVenue } from '@/features/cabinet';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';
import type { BuilderOffer } from '@/types/offerBuilder';

import { offerBuilderErrorText } from './offerBuilderErrors';
import { draftFromOffer, emptyOfferDraft, type OfferWizardDraft } from './offerDraft';
import type { OfferRowAction } from './offerActions';
import { OfferWizard } from './OfferWizard';
import { OffersList } from './OffersList';
import {
  useOfferAction,
  useSaveVenueOffer,
  useVenueEventChoices,
  useVenueOfferStats,
  useVenueOffers,
} from './useOfferBuilder';

type Mode = { kind: 'list' } | { kind: 'wizard'; offer: BuilderOffer | null };

export type OffersAreaProps = {
  /** Opens the wizard tied to this event (from the old event screens). */
  initialEventId?: string;
};

function VenueOffers({
  venueId,
  venueName,
  initialEventId,
}: OffersAreaProps & { venueId: string; venueName: string }) {
  const [mode, setMode] = useState<Mode>(
    initialEventId ? { kind: 'wizard', offer: null } : { kind: 'list' },
  );
  const offers = useVenueOffers(venueId);
  const stats = useVenueOfferStats(venueId);
  const events = useVenueEventChoices(venueId);
  const action = useOfferAction(venueId);
  const editingId = mode.kind === 'wizard' ? mode.offer?.id : undefined;
  const save = useSaveVenueOffer(venueId, editingId);

  if (mode.kind === 'wizard') {
    const initialDraft: OfferWizardDraft = mode.offer
      ? draftFromOffer(mode.offer)
      : initialEventId
        ? { ...emptyOfferDraft, whenMode: 'event', eventId: initialEventId }
        : emptyOfferDraft;
    return (
      <OfferWizard
        venueName={venueName}
        initialDraft={initialDraft}
        isEditing={mode.offer !== null}
        eventChoices={{
          events: events.data ?? [],
          isLoading: events.isPending,
          isError: events.isError,
        }}
        isSaving={save.isPending}
        serverError={save.isError ? offerBuilderErrorText(save.error) : null}
        onSubmit={(input) =>
          save.mutate(input, {
            onSuccess: () => {
              save.reset();
              setMode({ kind: 'list' });
            },
          })
        }
        onCancel={() => {
          save.reset();
          setMode({ kind: 'list' });
        }}
      />
    );
  }

  const runAction = (rowAction: OfferRowAction, offer: BuilderOffer) => {
    if (rowAction === 'edit') {
      action.reset();
      setMode({ kind: 'wizard', offer });
      return;
    }
    action.mutate({ action: rowAction, offerId: offer.id });
  };

  return (
    <OffersList
      offers={offers.data ?? []}
      stats={stats.data ?? []}
      isLoading={offers.isPending}
      isError={offers.isError}
      actionError={action.isError ? offerBuilderErrorText(action.error) : null}
      isBusy={action.isPending}
      onRetry={() => void offers.refetch()}
      onCreate={() => {
        action.reset();
        setMode({ kind: 'wizard', offer: null });
      }}
      onAction={runAction}
    />
  );
}

/** Offer builder entry: finds my venue; hosts and people without a venue go back to the staff home. */
export function OffersArea(props: OffersAreaProps) {
  const { colors } = useTheme();
  const { venue, isLoading, isError, retry } = useCabinetVenue();

  if (isLoading || isError) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <AppText tone="muted" accessibilityRole={isError ? 'alert' : 'progressbar'}>
          {t(isError ? 'staff.errorBody' : 'staff.loading')}
        </AppText>
        {isError ? <Button label={t('staff.retry')} onPress={retry} /> : null}
      </SafeAreaView>
    );
  }
  if (!venue || venue.role === 'host') return <Redirect href="/staff" />;
  return <VenueOffers venueId={venue.id} venueName={venue.name} {...props} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.lg, justifyContent: 'center' },
});
