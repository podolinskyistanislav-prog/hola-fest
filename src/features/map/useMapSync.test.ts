import { renderHook } from '@testing-library/react-native';

import type { MapVenue } from './mapMessages';
import { useMapSync } from './useMapSync';

const venues: MapVenue[] = [
  { id: 'v1', name: 'Bavovna', lat: 50.45, lng: 30.52, accent: 'yellow' },
];

describe('useMapSync', () => {
  it('sends nothing before the page has loaded', async () => {
    const send = jest.fn();
    await renderHook(() =>
      useMapSync({ ready: false, send, venues, selectedId: 'v1', compact: false }),
    );
    expect(send).not.toHaveBeenCalled();
  });

  it('sends the venues, then the selected pin, once the page is ready', async () => {
    const send = jest.fn();
    await renderHook(() =>
      useMapSync({ ready: true, send, venues, selectedId: 'v1', compact: false }),
    );
    expect(send.mock.calls).toEqual([
      [{ type: 'setVenues', venues }],
      [{ type: 'select', id: 'v1' }],
    ]);
  });

  it('frames the venues in a compact preview', async () => {
    const send = jest.fn();
    await renderHook(() =>
      useMapSync({ ready: true, send, venues, selectedId: null, compact: true }),
    );
    expect(send).toHaveBeenCalledWith({ type: 'fitTo' });
  });

  it('only re-sends the selection when it changes', async () => {
    const send = jest.fn();
    const { rerender } = await renderHook(
      (selectedId: string | null) =>
        useMapSync({ ready: true, send, venues, selectedId, compact: false }),
      { initialProps: 'v1' as string | null },
    );
    send.mockClear();
    await rerender(null);
    expect(send.mock.calls).toEqual([[{ type: 'select', id: null }]]);
  });
});
