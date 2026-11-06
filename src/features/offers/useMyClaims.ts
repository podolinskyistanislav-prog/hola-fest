import { useQuery } from '@tanstack/react-query';

import { getMyClaims } from '@/services/claims';

import { getClaimToken } from './claimedTokens';
import { claimKeys } from './claimKeys';

/** The signed-in guest's claims, newest first. */
export function useMyClaims() {
  return useQuery({ queryKey: claimKeys.mine, queryFn: getMyClaims });
}

/** The token saved on this device for an offer. Reads local storage only: works offline. */
export function useClaimToken(offerId: string | undefined) {
  return useQuery({
    queryKey: claimKeys.token(offerId ?? ''),
    queryFn: () => getClaimToken(offerId ?? ''),
    enabled: Boolean(offerId),
    staleTime: Infinity,
    gcTime: 0,
    networkMode: 'always',
  });
}
