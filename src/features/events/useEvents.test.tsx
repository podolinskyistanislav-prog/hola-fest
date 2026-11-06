import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { getEventById, getEventsForRange } from '@/services/events';

import { useEvent, useEventsForDay, useEventsForWeek } from './useEvents';

jest.mock('@/services/events', () => ({
  getEventsForRange: jest.fn(),
  getEventById: jest.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => jest.resetAllMocks());

const WEDNESDAY = new Date('2026-11-04T10:00:00Z');

describe('useEventsForDay', () => {
  it('is loading while the service is pending', async () => {
    jest.mocked(getEventsForRange).mockReturnValue(new Promise(() => undefined));
    const { result } = await renderHook(() => useEventsForDay(WEDNESDAY), { wrapper });
    expect(result.current.isLoading).toBe(true);
  });

  it('asks for the Kyiv day from midnight to midnight', async () => {
    const events = [{ id: 'e1' }];
    jest.mocked(getEventsForRange).mockResolvedValue(events as never);
    const { result } = await renderHook(() => useEventsForDay(WEDNESDAY), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual(events));
    expect(getEventsForRange).toHaveBeenCalledWith(
      new Date('2026-11-03T22:00:00Z'),
      new Date('2026-11-04T22:00:00Z'),
    );
  });

  it('exposes an error when the service fails', async () => {
    jest.mocked(getEventsForRange).mockRejectedValue(new Error('events_network'));
    const { result } = await renderHook(() => useEventsForDay(WEDNESDAY), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useEventsForWeek', () => {
  it('asks the service for Monday to next Monday', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    const { result } = await renderHook(() => useEventsForWeek(WEDNESDAY), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getEventsForRange).toHaveBeenCalledWith(
      new Date('2026-11-01T22:00:00Z'),
      new Date('2026-11-08T22:00:00Z'),
    );
  });

  it('exposes an error when the service fails', async () => {
    jest.mocked(getEventsForRange).mockRejectedValue(new Error('events_unknown'));
    const { result } = await renderHook(() => useEventsForWeek(WEDNESDAY), { wrapper });
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
