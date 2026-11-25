export type MapAccent = 'yellow' | 'pink';

export interface MapVenue {
  id: string;
  name: string;
  lat: number;
  lng: number;
  accent: MapAccent;
}

/** App to map. */
export type ToMapMessage =
  | { type: 'setVenues'; venues: readonly MapVenue[] }
  | { type: 'select'; id: string | null }
  | { type: 'fitTo'; ids?: readonly string[] };

/** Map to app. */
export type FromMapMessage =
  { type: 'pinPress'; id: string } | { type: 'mapPress'; lat?: number; lng?: number };

/** Serializes a message for the map page (`postMessage` on web, injected script on native). */
export function encodeToMap(message: ToMapMessage): string {
  return JSON.stringify(message);
}

/** Script a native WebView runs to hand a message to the page. */
export function injectedScriptFor(message: ToMapMessage): string {
  return `window.holaMap&&window.holaMap.receive(${encodeToMap(message)});true;`;
}

/** Parses what the map page posted; anything that is not a known, well-formed message is `null`. */
export function parseFromMap(raw: unknown): FromMapMessage | null {
  if (typeof raw !== 'string') return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof data !== 'object' || data === null) return null;
  const record = data as Record<string, unknown>;
  if (record.type === 'mapPress') {
    const { lat, lng } = record;
    if (typeof lat === 'number' && typeof lng === 'number' && isFinite(lat) && isFinite(lng)) {
      return { type: 'mapPress', lat, lng };
    }
    return { type: 'mapPress' };
  }
  if (record.type === 'pinPress' && typeof record.id === 'string') {
    return { type: 'pinPress', id: record.id };
  }
  return null;
}
