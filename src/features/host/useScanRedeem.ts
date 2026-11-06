import { useRef, useState } from 'react';

import type { ScanFailureReason } from '@/components/ui';
import { redeemClaim } from '@/services/claims';
import type { RedeemClaimResult, RedeemFailureReason } from '@/types/claims';

export type ScanState =
  | { status: 'scanning' }
  | { status: 'checking' }
  | { status: 'success' }
  | { status: 'failure'; reason: ScanFailureReason }
  | { status: 'error' };

const FAILURE_REASON: Record<RedeemFailureReason, ScanFailureReason | 'error'> = {
  already_redeemed: 'alreadyUsed',
  wrong_venue: 'wrongVenue',
  expired: 'expired',
  invalid_token: 'unknown',
  unknown_token: 'unknown',
  unauthenticated: 'error',
  network: 'error',
  unknown: 'error',
};

type Deps = { redeemClaim: (token: string) => Promise<RedeemClaimResult> };

/**
 * Drives one scan at a time: the first code is redeemed, every other code is ignored
 * until the host taps "next". The server alone decides whether the ticket is valid.
 */
export function useScanRedeem(deps: Deps = { redeemClaim }) {
  const [state, setState] = useState<ScanState>({ status: 'scanning' });
  // A ref, not state: the camera can fire several times before a re-render.
  const busy = useRef(false);

  async function onCodeScanned(token: string) {
    if (busy.current) return;
    busy.current = true;
    setState({ status: 'checking' });
    try {
      const result = await deps.redeemClaim(token);
      if (result.ok) {
        setState({ status: 'success' });
      } else {
        const reason = FAILURE_REASON[result.reason];
        setState(reason === 'error' ? { status: 'error' } : { status: 'failure', reason });
      }
    } catch {
      setState({ status: 'error' });
    }
  }

  function next() {
    busy.current = false;
    setState({ status: 'scanning' });
  }

  return { state, onCodeScanned, next };
}
