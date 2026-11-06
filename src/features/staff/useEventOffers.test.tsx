import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import type { AdminOffer } from '@/types/admin';

import { useEventOffers } from './useEventOffers';

jest.mock('@/services/admin', () => ({
  listEventOffers: jest.fn(),
  setOfferActive: jest.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const offer: AdminOffer = {
  id: 'o1',
  eventId: 'e1',
  title: 'Шот',
  terms: null,
  maxClaims: null,
  perUserLimit: 1,
  validUntil: null,
  isActive: true,
};

describe('useEventOffers', () => {
  it('loads the offers of the event', async () => {
    const fetchOffers = jest.fn().mockResolvedValue([offer]);
    const { result } = await renderHook(
      () => useEventOffers('e1', { fetchOffers, changeActive: jest.fn() }),
      { wrapper },
    );
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.offers).toEqual([offer]));
    expect(fetchOffers).toHaveBeenCalledWith('e1');
  });

  it('reports a load error', async () => {
    const fetchOffers = jest.fn().mockRejectedValue(new Error('x'));
    const { result } = await renderHook(
      () => useEventOffers('e1', { fetchOffers, changeActive: jest.fn() }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('flips the active flag of an offer', async () => {
    const changeActive = jest.fn().mockResolvedValue({ ...offer, isActive: false });
    const { result } = await renderHook(
      () =>
        useEventOffers('e1', { fetchOffers: jest.fn().mockResolvedValue([offer]), changeActive }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.offers).toHaveLength(1));
    result.current.toggleActive(offer);
    await waitFor(() => expect(changeActive).toHaveBeenCalledWith('o1', false));
  });

  it('reports a failed toggle', async () => {
    const changeActive = jest.fn().mockRejectedValue(new Error('x'));
    const { result } = await renderHook(
      () =>
        useEventOffers('e1', { fetchOffers: jest.fn().mockResolvedValue([offer]), changeActive }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.offers).toHaveLength(1));
    result.current.toggleActive(offer);
    await waitFor(() => expect(result.current.isToggleError).toBe(true));
  });
});
