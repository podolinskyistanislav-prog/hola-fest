import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { claimOffer } from '@/services/claims';

import { getClaimToken } from './claimedTokens';
import { useClaimOffer } from './useClaimOffer';

jest.mock('@/services/claims', () => ({ claimOffer: jest.fn() }));

const mockClaim = claimOffer as jest.Mock;

async function setup() {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const onClaimed = jest.fn();
  const hook = await renderHook(() => useClaimOffer('o1', onClaimed), { wrapper });
  return { ...hook, onClaimed };
}

beforeEach(() => jest.resetAllMocks());

describe('useClaimOffer', () => {
  it('starts ready', async () => {
    const { result } = await setup();
    expect(result.current.state).toBe('ready');
  });

  it('is loading while the claim is pending', async () => {
    mockClaim.mockReturnValue(new Promise(() => undefined));
    const { result } = await setup();
    await act(async () => result.current.claim());
    await waitFor(() => expect(result.current.state).toBe('loading'));
  });

  it('is claimed on success, remembers the token and reports the offer', async () => {
    mockClaim.mockResolvedValue({ ok: true, token: 'secret-token' });
    const { result, onClaimed } = await setup();
    await act(async () => result.current.claim());
    await waitFor(() => expect(result.current.state).toBe('claimed'));
    expect(getClaimToken('o1')).toBe('secret-token');
    expect(onClaimed).toHaveBeenCalledWith('o1');
    expect(mockClaim).toHaveBeenCalledWith('o1');
  });

  it.each([
    ['unavailable', 'soldOut'],
    ['limit_reached', 'limitReached'],
    ['rate_limited', 'error'],
    ['network', 'error'],
    ['unknown', 'error'],
  ])('maps the server reason %s to %s', async (reason, state) => {
    mockClaim.mockResolvedValue({ ok: false, reason });
    const { result, onClaimed } = await setup();
    await act(async () => result.current.claim());
    await waitFor(() => expect(result.current.state).toBe(state));
    expect(onClaimed).not.toHaveBeenCalled();
  });

  it('is an error when the service throws, and can be retried', async () => {
    mockClaim.mockRejectedValueOnce(new Error('x')).mockResolvedValueOnce({ ok: true, token: 't' });
    const { result } = await setup();
    await act(async () => result.current.claim());
    await waitFor(() => expect(result.current.state).toBe('error'));
    await act(async () => result.current.claim());
    await waitFor(() => expect(result.current.state).toBe('claimed'));
  });

  it('does not claim again once sold out', async () => {
    mockClaim.mockResolvedValue({ ok: false, reason: 'unavailable' });
    const { result } = await setup();
    await act(async () => result.current.claim());
    await waitFor(() => expect(result.current.state).toBe('soldOut'));
    await act(async () => result.current.claim());
    expect(mockClaim).toHaveBeenCalledTimes(1);
  });
});
