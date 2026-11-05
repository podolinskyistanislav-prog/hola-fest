import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { getEventById, getEventsForDay, getEventsForRange } from '@/services/events';

import { useEvent, useEventsForDay, useEventsForWeek } from './useEvents';

jest.mock('@/services/events', () => ({
  getEventsForDay: jest.fn(),
  getEventsForRange: jest.fn(),
  getEventById: jest.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => jest.resetAllMocks());

describe('useEventsForDay', () => {
  it('is loading while the service is pending', async () => {
    jest.mocked(getEventsForDay).mockReturnValue(new Promise(() => undefined));
    const { result } = await renderHook(() => useEventsForDay(new Date(2026, 10, 4)), {
      wrapper,
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns events from the service', async () => {
    const events = [{ id: 'e1' }];
    jest.mocked(getEventsForDay).mockResolvedValue(events as never);
    const day = new Date(2026, 10, 4);
    const { result } = await renderHook(() => useEventsForDay(day), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual(events));
    expect(getEventsForDay).toHaveBeenCalledWith(day);
  });

  it('exposes an error when the service fails', async () => {
    jest.mocked(getEventsForDay).mockRejectedValue(new Error('events_network'));
    const { result } = await renderHook(() => useEventsForDay(new Date(2026, 10, 4)), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useEventsForWeek', () => {
  it('asks the service for Monday to next Monday', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    const { result } = await renderHook(() => useEventsForWeek(new Date(2026, 10, 4)), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getEventsForRange).toHaveBeenCalledWith(new Date(2026, 10, 2), new Date(2026, 10, 9));
  });

  it('exposes an error when the service fails', async () => {
    jest.mocked(getEventsForRange).mockRejectedValue(new Error('events_unknown'));
    const { result } = await renderHook(() => useEventsForWeek(new Date(2026, 10, 4)), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useEvent', () => {
  it('returns the event details', async () => {
    const details = { id: 'e1' };
    jest.mocked(getEventById).mockResolvedValue(details as never);
    const { result } = await renderHook(() => useEvent('e1'), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual(details));
    expect(getEventById).toHaveBeenCalledWith('e1');
  });

  it('returns null for an event that is not visible', async () => {
    jest.mocked(getEventById).mockResolvedValue(null);
    const { result } = await renderHook(() => useEvent('missing'), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });

  it('does not fetch without an id', async () => {
    const { result } = await renderHook(() => useEvent(undefined), { wrapper });
    expect(result.current.fetchStatus).toBe('idle');
    expect(getEventById).not.toHaveBeenCalled();
  });

  it('exposes an error when the service fails', async () => {
    jest.mocked(getEventById).mockRejectedValue(new Error('events_network'));
    const { result } = await renderHook(() => useEvent('e1'), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
