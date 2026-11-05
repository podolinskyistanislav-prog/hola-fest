import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { getPublishedVenues } from '@/services/venues';

import { useVenues } from './useVenues';
import { venueKeys } from './venueKeys';

jest.mock('@/services/venues', () => ({ getPublishedVenues: jest.fn() }));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useVenues', () => {
  it('returns the published venues', async () => {
    jest.mocked(getPublishedVenues).mockResolvedValue([]);
    const { result } = await renderHook(() => useVenues(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });
});

describe('venueKeys', () => {
  it('nests the list key under all', () => {
    expect(venueKeys.list()).toEqual(['venues', 'list']);
  });
});
