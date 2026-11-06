import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { useAdminVenueEvents } from './useAdminVenueEvents';

jest.mock('@/services/admin', () => ({ getMyVenues: jest.fn(), listVenueEvents: jest.fn() }));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const host = { id: 'h', slug: 'h', name: 'H', isPublished: true, role: 'host' as const };
const admin = { id: 'a', slug: 'a', name: 'A', isPublished: true, role: 'admin' as const };
const item = {
  id: 'e1',
  title: 'Night',
  startsAt: new Date(2026, 10, 7, 20),
  status: 'draft' as const,
  offersCount: 0,
};

describe('useAdminVenueEvents', () => {
  it('loads events of the first venue the caller administers', async () => {
    const fetchVenues = jest.fn().mockResolvedValue([host, admin]);
    const fetchEvents = jest.fn().mockResolvedValue([item]);
    const { result } = await renderHook(() => useAdminVenueEvents({ fetchVenues, fetchEvents }), {
      wrapper,
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetchEvents).toHaveBeenCalledWith('a');
    expect(result.current.events).toEqual([item]);
    expect(result.current.venue).toEqual(admin);
  });

  it('does not fetch events when the caller administers no venue', async () => {
    const fetchVenues = jest.fn().mockResolvedValue([host]);
    const fetchEvents = jest.fn();
    const { result } = await renderHook(() => useAdminVenueEvents({ fetchVenues, fetchEvents }), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetchEvents).not.toHaveBeenCalled();
    expect(result.current.events).toEqual([]);
    expect(result.current.venue).toBeNull();
  });

  it('reports an error when events fail', async () => {
    const fetchVenues = jest.fn().mockResolvedValue([admin]);
    const fetchEvents = jest.fn().mockRejectedValue(new Error('boom'));
    const { result } = await renderHook(() => useAdminVenueEvents({ fetchVenues, fetchEvents }), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('reports an error when venues fail', async () => {
    const fetchVenues = jest.fn().mockRejectedValue(new Error('boom'));
    const fetchEvents = jest.fn();
    const { result } = await renderHook(() => useAdminVenueEvents({ fetchVenues, fetchEvents }), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.isLoading).toBe(false);
  });
});
