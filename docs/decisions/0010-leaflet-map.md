# 0010 — Map: one Leaflet page everywhere (supersedes 0006)

**Context.** `react-native-maps` gave Apple Maps on iOS and Google Maps on Android, which needs a paid-account API key: without it the Android map was blank. The web build had a separate drawn fake map. Three code paths, one of them broken.

**Decision.**

- One HTML page, built in TypeScript (`src/features/map/mapHtml.ts`): Leaflet 1.9.4 from a pinned unpkg URL with SRI hashes, CARTO dark/light raster tiles (OpenStreetMap data), no API key. The required attribution (© OpenStreetMap © CARTO) stays visible.
- Native shows it in `react-native-webview` (added with `npx expo install`; it is part of Expo Go). Web shows the same HTML in an `<iframe srcDoc>`. `VenueMap.tsx` / `VenueMap.web.tsx` are the only platform split.
- Pins are HTML (label pill + dot with halo in the venue accent; the selected pin is enlarged with a halo), matching `Map.html`.
- Two-way JSON messages, typed in `mapMessages.ts`. App → map: `setVenues`, `select(id)`, `fitTo`. Map → app: `pinPress(id)`, `mapPress`. Native sends by injected script, web by `postMessage` (the app checks `event.source` is its own frame).
- `react-native-maps`, `expo-build-properties` and the R8 keep rules (needed only for WorkManager pulled in by `react-native-maps`) are removed.

**Consequences.** The map is real on every platform with no key. Tiles and Leaflet need network; offline the map is a blank surface with the pins missing (the venue card and list still work). CARTO's free tiles have fair-use limits; revisit before a large public launch. Pins are not native views, so VoiceOver/TalkBack cannot focus them; the venue card remains the accessible path.

## Update 2026-11-27: MapLibre + OpenFreeMap instead of Leaflet + CARTO

CARTO now requires an API key for its raster basemaps and watermarks tiles requested without one ("API KEY REQUIRED"). Its free key is for non-commercial use only. The map page now uses **MapLibre GL JS 5.9.0** (pinned on unpkg, with sha384 SRI) and **OpenFreeMap** vector styles: `dark` in the dark theme and `positron` in the light one. OpenFreeMap is free, with no key, no registration and no usage limits. The WebView/iframe approach and the app ↔ map message protocol are unchanged. Vector tiles also make panning and zooming smoother. Attribution: OpenFreeMap © OpenMapTiles © OpenStreetMap contributors.

**Follow-up (same day):** OpenFreeMap's Dark style is unfinished and rendered a blank black map. Both themes now use **Positron**; the dark theme inverts the basemap canvas with a CSS filter (pins are DOM markers and keep their colours). Zoom buttons were removed (pinch or scroll to zoom), and the attribution is a collapsed (i) button.
