# 0009 — Web fallback for secret storage

## Context

`expo-secure-store` has no web implementation, so on web `readSecret` always returned `null`. The screenshot build runs on web, so the ticket screen could never show a QR.

## Decision

`src/lib/secureStorage.ts` falls back to `localStorage` when `Platform.OS === 'web'`. Native behaviour is unchanged. Values are never logged. `scripts/screenshots` can seed `localStorage` per screen (`seed` in `ScreenConfig`, applied with `addInitScript`).

## Consequences

- `localStorage` is NOT a secure store: any script on the page can read it. The web build is for development and screenshots only; the product ships as native apps.
- Seeded tokens are fake values. No guest is signed in, so the screenshot ticket shows the offline hint instead of event details.
