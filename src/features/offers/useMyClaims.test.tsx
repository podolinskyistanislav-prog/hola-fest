import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { getMyClaims } from '@/services/claims';

import { getClaimToken } from './claimedTokens';
import { useClaimToken, useMyClaims } from './useMyClaims';

jest.mock('@/services/claims', () => ({ getMyClaims: jest.fn() }));
jest.mock('./claimedTokens', () => ({ getClaimToken: jest.fn() }));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => jest.resetAllMocks());

describe('useMyClaims', () => {
  it('returns the claims from the service', async () => {
    (getMyClaims as jest.Mock).mockResolvedValue([{ id: 'c1' }]);
    const { result } = await renderHook(() => useMyClaims(), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual([{ id: 'c1' }]));
  });

  it('reports an error', async () => {
    (getMyClaims as jest.Mock).mockRejectedValue(new Error('x'));
    const { result } = await renderHook(() => useMyClaims(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useClaimToken', () => {
  it('reads the token from the device', async () => {
    (getClaimToken as jest.Mock).mockResolvedValue('tok');
    const { result } = await renderHook(() => useClaimToken('o1'), { wrapper });
    await waitFor(() => expect(result.current.data).toBe('tok'));
    expect(getClaimToken).toHaveBeenCalledWith('o1');
  });

  it('does nothing without an offer id', async () => {
    const { result } = await renderHook(() => useClaimToken(undefined), { wrapper });
    expect(result.current.fetchStatus).toBe('idle');
    expect(getClaimToken).not.toHaveBeenCalled();
  });
});
