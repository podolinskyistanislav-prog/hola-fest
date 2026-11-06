# 0007 — Taxi deep links

## Context
Guests tap Uklon / Bolt / Uber and the app opens with the venue as destination. Deep links only, no taxi APIs (PRODUCT.md). Links are built in `src/lib/taxi.ts`.

## Decision
| Provider | App link | Fallback | Status |
| --- | --- | --- | --- |
| Uber | `uber://?action=setPipeline&dropoff[latitude]=..&dropoff[longitude]=..&dropoff[nickname]=..&dropoff[formatted_address]=..` | `https://m.uber.com/ul/` | Format from Uber's public deep-link docs (developer.uber.com, "Deep links"). Check on a real phone. |
| Bolt | `bolt://ride?destination_lat=..&destination_lng=..&destination_address=..` | `https://bolt.eu/en/app/` | **UNCONFIRMED** — no public documentation found. Founder must test on a real phone. |
| Uklon | `uklon://order?dropoff_lat=..&dropoff_lng=..&dropoff_address=..` | `https://uklon.com.ua/` | **UNCONFIRMED** — no public documentation found. Founder must test on a real phone. |

Web access was unavailable to the agent while implementing, so none of these could be re-fetched; Uber's format is from memory of its docs. If the Bolt/Uklon schemes do not open the app, change only the string templates and the exact-URL tests.

- Coordinates and text are `encodeURIComponent`-encoded. Invalid/missing coordinates (null, NaN, out of range, 0/0) yield no links.
- `openTaxiLink` calls `Linking.openURL(appUrl)` and falls back to the fallback page if it rejects. It does **not** use `canOpenURL`, so no `LSApplicationQueriesSchemes` (iOS) or Android `queries` entries are needed and `app.json` is unchanged. Fallbacks are web pages that lead to the right store.

## Consequences
- If an app is installed but its scheme is wrong, the user lands on the fallback page: safe but not ideal.
- On iOS an unhandled scheme makes `openURL` reject, which triggers the fallback. Confirm this on a real iPhone too.
