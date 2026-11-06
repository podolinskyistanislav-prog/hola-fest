import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import type { AdminEvent } from '@/types/admin';

import type { EventSubmission } from './eventFormValidation';
import { useEventEditor } from './useEventEditor';

jest.mock('@/services/admin', () => ({
  getMyVenues: jest.fn(),
  getVenueEvent: jest.fn(),
  createEvent: jest.fn(),
  updateEvent: jest.fn(),
  setEventStatus: jest.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const start = new Date(2026, 10, 7, 20);
const admin = { id: 'v1', slug: 'v', name: 'V', isPublished: true, role: 'admin' as const };
const event: AdminEvent = {
  id: 'e1',
  venueId: 'v1',
  title: 'Ніч',
  description: null,
  lineup: [],
  startsAt: start,
  endsAt: null,
  priceFromUah: null,
  status: 'draft',
};
const submission = (status: 'draft' | 'published'): EventSubmission => ({
  input: { title: 'Ніч', startsAt: start },
  status,
});

function services() {
  return {
    fetchVenues: jest.fn().mockResolvedValue([admin]),
    fetchEvent: jest.fn().mockResolvedValue(event),
    create: jest.fn().mockResolvedValue(event),
    update: jest.fn().mockResolvedValue(event),
    changeStatus: jest.fn().mockResolvedValue({ ...event, status: 'published' }),
  };
}

describe('useEventEditor', () => {
  it('creates a draft in the venue the caller administers', async () => {
    const s = services();
    const { result } = await renderHook(() => useEventEditor(undefined, s), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    let ok = false;
    await act(async () => {
      ok = await result.current.save(submission('draft'));
    });
    expect(ok).toBe(true);
    expect(s.create).toHaveBeenCalledWith('v1', submission('draft').input);
    expect(s.changeStatus).not.toHaveBeenCalled();
  });

  it('publishes a new event after creating it', async () => {
    const s = services();
    const { result } = await renderHook(() => useEventEditor(undefined, s), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => {
      await result.current.save(submission('published'));
    });
    expect(s.changeStatus).toHaveBeenCalledWith('e1', 'published');
  });

  it('loads and updates an existing event, changing status only when it differs', async () => {
    const s = services();
    const { result } = await renderHook(() => useEventEditor('e1', s), { wrapper });
    await waitFor(() => expect(result.current.event).toEqual(event));
    await act(async () => {
      await result.current.save(submission('draft'));
    });
    expect(s.update).toHaveBeenCalledWith('e1', submission('draft').input);
    expect(s.changeStatus).not.toHaveBeenCalled();
    await act(async () => {
      await result.current.save(submission('published'));
    });
    expect(s.changeStatus).toHaveBeenCalledWith('e1', 'published');
  });

  it('reports a save error without throwing', async () => {
    const s = services();
    s.create.mockRejectedValue(new Error('boom'));
    const { result } = await renderHook(() => useEventEditor(undefined, s), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    let ok = true;
    await act(async () => {
      ok = await result.current.save(submission('draft'));
    });
    expect(ok).toBe(false);
    await waitFor(() => expect(result.current.isSaveError).toBe(true));
  });

  it('fails to save when the caller administers no venue', async () => {
    const s = services();
    s.fetchVenues.mockResolvedValue([]);
    const { result } = await renderHook(() => useEventEditor(undefined, s), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    let ok = true;
    await act(async () => {
      ok = await result.current.save(submission('draft'));
    });
    expect(ok).toBe(false);
    expect(s.create).not.toHaveBeenCalled();
  });

  it('reports a load error', async () => {
    const s = services();
    s.fetchEvent.mockRejectedValue(new Error('boom'));
    const { result } = await renderHook(() => useEventEditor('e1', s), { wrapper });
    await waitFor(() => expect(result.current.isLoadError).toBe(true));
  });
});
