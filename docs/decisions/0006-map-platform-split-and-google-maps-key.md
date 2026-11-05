# 0006 — Map: react-native-maps, platform split, Google Maps key

**Context.** The map tab shows venue pins. We want the native maps with no custom drawn map. The web build is for previews only (see 0005) and `react-native-maps` has no web support.

**Decision.**

- `react-native-maps` renders Apple Maps on iOS and Google Maps on Android. Camera starts around Kyiv; no clustering, search, user location or custom map styling.
- The platform split lives in one component pair: `src/features/venues/VenueMap.tsx` (native) and `VenueMap.web.tsx` (a plain venues list). Metro picks the `.web.tsx` file on web, so the native module is never imported there. Everything else is shared.
- Google Maps on Android needs an API key. It is a public client key, so it may only be an `EXPO_PUBLIC_*` value (e.g. `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`), never committed. The founder provides it and restricts it to the app's package name and the Maps SDK for Android in Google Cloud. Wiring it into `app.json` (`android.config.googleMaps.apiKey`) is a separate step once the key exists.
- Venue coordinates are seed placeholders (#64).

**Consequences.** Without the key the map is blank on Android release builds; iOS and Expo Go on iOS work. A native map needs a development build for Google Maps on Android. Tapping a pin shows the preview card; opening the venue page is wired when #67 lands.
