import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { isValidHandle } from '@/lib/profileRules';
import { checkHandleAvailable } from '@/services/profile';

export const HANDLE_DEBOUNCE_MS = 400;

export type HandleStatus = 'empty' | 'invalid' | 'checking' | 'free' | 'taken' | 'error';

/** Live availability of a normalized handle; asks the server only after the user pauses typing. */
export function useHandleAvailability(handle: string): HandleStatus {
  const [settled, setSettled] = useState(handle);

  useEffect(() => {
    const timer = setTimeout(() => setSettled(handle), HANDLE_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [handle]);

  const valid = isValidHandle(handle);
  const query = useQuery({
    queryKey: ['profile', 'handle', settled],
    queryFn: () => checkHandleAvailable(settled),
    enabled: valid && settled === handle,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });

  if (!handle) return 'empty';
  if (!valid) return 'invalid';
  if (settled !== handle || query.isFetching || query.isPending) return 'checking';
  if (query.isError) return 'error';
  return query.data ? 'free' : 'taken';
}
