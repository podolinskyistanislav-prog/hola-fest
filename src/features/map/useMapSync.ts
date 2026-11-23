import { useEffect } from 'react';

import type { MapVenue, ToMapMessage } from './mapMessages';

interface UseMapSyncOptions {
  /** The map page has loaded and can take messages. */
  ready: boolean;
  send: (message: ToMapMessage) => void;
  venues: readonly MapVenue[];
  selectedId: string | null;
  /** A small preview frames its venues instead of showing the whole city. */
  compact: boolean;
}

/** Keeps the map page in step with the app: venues (and framing), then the selected pin. */
export function useMapSync({ ready, send, venues, selectedId, compact }: UseMapSyncOptions) {
  useEffect(() => {
    if (!ready) return;
    send({ type: 'setVenues', venues });
    if (compact) send({ type: 'fitTo' });
  }, [ready, send, venues, compact]);

  useEffect(() => {
    if (ready) send({ type: 'select', id: selectedId });
  }, [ready, send, venues, selectedId]);
}
