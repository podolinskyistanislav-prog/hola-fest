import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { useTheme } from '@/theme';

import { buildMapHtml } from './mapHtml';
import { injectedScriptFor, parseFromMap, type ToMapMessage } from './mapMessages';
import { toMapVenues } from './toMapVenues';
import type { VenueMapProps } from './types';
import { useMapSync } from './useMapSync';

export type { VenueMapProps } from './types';

/**
 * The venue map on iOS and Android: one Leaflet page (OpenStreetMap data, no API key) in a WebView.
 * The web twin is `VenueMap.web.tsx`; both show the same HTML.
 */
export function VenueMap({
  venues,
  selectedId,
  onSelect,
  interactive = true,
  compact = false,
}: VenueMapProps) {
  const { scheme } = useTheme();
  const ref = useRef<WebView<object>>(null);
  const html = useMemo(
    () => buildMapHtml({ scheme, interactive, compact }),
    [scheme, interactive, compact],
  );
  const [loadedHtml, setLoadedHtml] = useState<string | null>(null);
  const mapVenues = useMemo(() => toMapVenues(venues), [venues]);

  const send = useCallback((message: ToMapMessage) => {
    ref.current?.injectJavaScript(injectedScriptFor(message));
  }, []);
  useMapSync({
    ready: loadedHtml === html,
    send,
    venues: mapVenues,
    selectedId,
    compact,
  });

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = parseFromMap(event.nativeEvent.data);
    if (message?.type === 'pinPress') onSelect(message.id);
    else if (message?.type === 'mapPress') onSelect(null);
  };

  return (
    <View style={styles.fill} pointerEvents={interactive ? 'auto' : 'none'}>
      {/* The library's default generic (`undefined`) collapses its props to `never`. */}
      <WebView<object>
        key={html}
        ref={ref}
        style={styles.fill}
        originWhitelist={['*']}
        source={{ html, baseUrl: 'https://holafest.app' }}
        onLoadEnd={() => setLoadedHtml(html)}
        onMessage={handleMessage}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
