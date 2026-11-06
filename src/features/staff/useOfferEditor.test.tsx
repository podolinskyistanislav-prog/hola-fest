import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import type { AdminOffer } from '@/types/admin';

import { useOfferEditor } from './useOfferEditor';

jest.mock('@/services/admin', () => ({
  listEventOffers: jest.fn(),
  createOffer: jest.fn(),
  updateOffer: jest.fn(),
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

function services() {
  return {
    fetchOffers: jest.fn().mockResolvedValue([offer]),
    create: jest.fn().mockResolvedValue(offer),
    update: jest.fn().mockResolvedValue(offer),
    changeActive: jest.fn().mockResolvedValue({ ...offer, isActive: false }),
  };
}

describe('useOfferEditor', () => {
  it('creates an offer without loading anything', async () => {
    const s = services();
    const { result } = await renderHook(() => useOfferEditor('e1', undefined, s), { wrapper });
    expect(result.current.isLoading).toBe(false);
    const input = { title: 'Шот' };
    let ok = false;
    await waitFor(async () => {
      ok = await result.current.save({ input, isActive: true });
    });
    expect(ok).toBe(true);
    expect(s.create).toHaveBeenCalledWith('e1', input);
    expect(s.changeActive).not.toHaveBeenCalled();
    expect(s.fetchOffers).not.toHaveBeenCalled();
  });

  it('creates a hidden offer by switching it off after creation', async () => {
    const s = services();
    const { result } = await renderHook(() => useOfferEditor('e1', undefined, s), { wrapper });
    await waitFor(async () => {
      await result.current.save({ input: { title: 'Шот' }, isActive: false });
    });
    expect(s.changeActive).toHaveBeenCalledWith('o1', false);
  });

  it('loads the offer being edited and updates it', async () => {
    const s = services();
    const { result } = await renderHook(() => useOfferEditor('e1', 'o1', s), { wrapper });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.offer).toEqual(offer));
    await waitFor(async () => {
      await result.current.save({ input: { title: 'Новий' }, isActive: true });
    });
    expect(s.update).toHaveBeenCalledWith('o1', { title: 'Новий' });
  });

  it('reports a load error when the offer is not in the event', async () => {
    const s = services();
    const { result } = await renderHook(() => useOfferEditor('e1', 'other', s), { wrapper });
    await waitFor(() => expect(result.current.isLoadError).toBe(true));
  });

  it('reports a save failure as false', async () => {
    const s = services();
    s.create.mockRejectedValue(new Error('x'));
    const { result } = await renderHook(() => useOfferEditor('e1', undefined, s), { wrapper });
    let ok = true;
    await waitFor(async () => {
      ok = await result.current.save({ input: { title: 'Шот' }, isActive: true });
    });
    expect(ok).toBe(false);
    await waitFor(() => expect(result.current.isSaveError).toBe(true));
  });
});
