import { Button } from '@/components/ui';
import { t, type TranslationKey } from '@/lib/i18n';

import { useClaimOffer, type ClaimButtonState } from './useClaimOffer';

const LABEL: Record<ClaimButtonState, TranslationKey> = {
  ready: 'claim.ready',
  loading: 'claim.loading',
  claimed: 'claim.claimed',
  soldOut: 'claim.soldOut',
  limitReached: 'claim.limitReached',
  error: 'claim.error',
};

export interface ClaimOfferButtonProps {
  offerId: string;
  /** Called after the server issued a ticket, e.g. to open the ticket screen. */
  onClaimed: (offerId: string) => void;
}

/** «Взяти» button for one offer. Its label and state follow the server answer. */
export function ClaimOfferButton({ offerId, onClaimed }: ClaimOfferButtonProps) {
  const { state, claim } = useClaimOffer(offerId, onClaimed);
  const isActionable = state === 'ready' || state === 'error';
  return (
    <Button
      label={t(LABEL[state])}
      variant={state === 'error' ? 'pink' : 'primary'}
      disabled={!isActionable}
      onPress={claim}
    />
  );
}
