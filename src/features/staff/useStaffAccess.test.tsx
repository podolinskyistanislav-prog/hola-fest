import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { useStaffAccess } from './useStaffAccess';

jest.mock('@/services/admin', () => ({ getMyVenues: jest.fn() }));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useStaffAccess', () => {
  it('is loading, then exposes access from memberships', async () => {
    const fetchVenues = jest
      .fn()
      .mockResolvedValue([{ id: 'v', slug: 'v', name: 'V', isPublished: true, role: 'admin' }]);
    const { result } = await renderHook(() => useStaffAccess(fetchVenues), { wrapper });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.access).toEqual({ canScan: true, canManageEvents: true });
  });

  it('reports an error without access', async () => {
    const fetchVenues = jest.fn().mockRejectedValue(new Error('boom'));
    const { result } = await renderHook(() => useStaffAccess(fetchVenues), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.access).toBeNull();
  });
});
