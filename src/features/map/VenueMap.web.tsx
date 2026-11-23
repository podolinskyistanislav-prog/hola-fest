import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

import { buildMapHtml } from './mapHtml';
import { encodeToMap, parseFromMap, type ToMapMessage } from './mapMessages';
import { toMapVenues } from './toMapVenues';
import type { VenueMapProps } from './types';
import { useMapSync } from './useMapSync';

export type { VenueMapProps } from './types';

const FRAME_STYLE = { border: 0, width: '100%', height: '100%' } as const;

/** The venue map on web: the same Leaflet page as native, in an iframe. */
export function VenueMap({
  venues,
  selectedId,
  onSelect,
  interactive = true,
  compact = false,
}: VenueMapProps) {
  const { scheme } = useTheme();
  const frame = useRef<HTMLIFrameElement | null>(null);
  const html = useMemo(
    () => buildMapHtml({ scheme, interactive, compact }),
    [scheme, interactive, compact],
  );
  const [loadedHtml, setLoadedHtml] = useState<string | null>(null);
  const mapVenues = useMemo(() => toMapVenues(venues), [venues]);

  const send = useCallback((message: ToMapMessage) => {
    frame.current?.contentWindow?.postMessage(encodeToMap(message), '*');
  }, []);
  useMapSync({ ready: loadedHtml === html, send, venues: mapVenues, selectedId, compact });

  useEffect(() => {
    const listen = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return;
      const message = parseFromMap(event.data);
      if (message?.type === 'pinPress') onSelect(message.id);
      else if (message?.type === 'mapPress') onSelect(null);
    };
    window.addEventListener('message', listen);
    return () => window.removeEventListener('message', listen);
  }, [onSelect]);

  return (
    <View style={styles.fill} pointerEvents={interactive ? 'auto' : 'none'}>
      {createElement('iframe', {
        key: html,
        ref: frame,
        srcDoc: html,
        title: 'Map',
        style: FRAME_STYLE,
        onLoad: () => setLoadedHtml(html),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
