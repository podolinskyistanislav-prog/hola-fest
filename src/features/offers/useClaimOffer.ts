import { useMutation } from '@tanstack/react-query';

import { claimOffer } from '@/services/claims';
import type { ClaimFailureReason, ClaimOfferResult } from '@/types/claims';

import { rememberClaimToken } from './claimedTokens';

export type ClaimButtonState =
  'ready' | 'loading' | 'claimed' | 'soldOut' | 'limitReached' | 'error';

const FAILURE_STATE: Record<ClaimFailureReason, ClaimButtonState> = {
  unavailable: 'soldOut',
  limit_reached: 'limitReached',
  rate_limited: 'error',
  unauthenticated: 'error',
  invalid_request: 'error',
  network: 'error',
  unknown: 'error',
};

/**
 * Claims one offer. Every decision (sold out, limit reached) comes from the server
 * result; the hook only maps it to a button state.
 */
export function useClaimOffer(offerId: string, onClaimed: (offerId: string) => void) {
  const mutation = useMutation<ClaimOfferResult, Error, void>({
    mutationFn: () => claimOffer(offerId),
    onSuccess: (result) => {
      if (result.ok) {
        rememberClaimToken(offerId, result.token);
        onClaimed(offerId);
      }
    },
  });

  let state: ClaimButtonState = 'ready';
  if (mutation.isPending) state = 'loading';
  else if (mutation.isError) state = 'error';
  else if (mutation.data)
    state = mutation.data.ok ? 'claimed' : FAILURE_STATE[mutation.data.reason];

  return {
    state,
    claim: () => {
      if (state === 'ready' || state === 'error') mutation.mutate();
    },
  };
}
