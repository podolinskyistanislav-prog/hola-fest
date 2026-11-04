# Hola Fest — Architecture

> This file is law for every agent. Changing it requires a PR labelled `architecture` and the founder's approval.

## Stack

| Concern              | Choice                                                                                |
| -------------------- | ------------------------------------------------------------------------------------- |
| App                  | Expo (SDK 58) + Expo Router, TypeScript strict, iOS / Android / web from one codebase |
| Backend              | Supabase: Postgres, Auth (Apple + Google), Storage, Edge Functions, Realtime          |
| Server state         | TanStack Query (added with the first data feature)                                    |
| Map                  | react-native-maps (native), simple list fallback on web                               |
| Push                 | expo-notifications                                                                    |
| Builds               | EAS Build (cloud)                                                                     |
| Errors / analytics   | Sentry, PostHog (added in the observability task)                                     |
| Code knowledge graph | Graphify (`graphify-out/`)                                                            |

## Layers

```
src/app/         Routes/screens. Thin: compose features, no business logic, no data access.
src/features/X/  One folder per feature (events, offers, venues, auth, host…):
                 hooks (useEvents, useClaimOffer), feature components, feature logic + tests.
src/components/  Shared, pure UI. src/components/ui = design-system components (AppText, Button,
                 Chip, GlassSurface). Props in, JSX out.
src/theme/       Design tokens (colors, type, radii, spacing), useTheme, fonts. See docs/DESIGN.md.
src/services/    The ONLY place that talks to Supabase or other external APIs.
                 Typed functions: getEventsForDay(), claimOffer(), redeemClaim()…
src/lib/         Pure helpers (dates, curfew, deep links, env). No I/O.
src/types/       Shared types; src/types/database.ts is generated from the DB schema.
supabase/migrations/  SQL migrations — the only way the schema changes.
supabase/functions/   Edge Functions — any logic that must be trusted (QR issue/redeem).
```

### Allowed dependencies (enforced by ESLint where possible)

```
app → features → services → (Supabase)
app → components
features → components, lib, types
services → lib, types
components → theme, lib, types
features, app → theme
theme → (nothing in src except lib)
```

Forbidden:

- `@supabase/*` anywhere outside `src/services` — **lint error**
- `src/components` importing `services` or `features` — **lint error**
- `src/theme` importing components, features or services — **lint error**
- hex colors, font names or radii outside `src/theme` — UI/UX reviewer blocks
- `features/A` importing internals of `features/B` (use `services` or move code to `lib`) — reviewer blocks
- business logic inside `src/app` — reviewer blocks

## Data model (initial)

All tables live in `public`, all have RLS **enabled** (the project auto-enables it), and no table is exposed to the API until a migration grants it explicitly.

```
profiles      id (= auth.users.id) PK, display_name, is_superadmin bool default false, created_at
venues        id uuid PK, slug unique, name, address, lat, lng, description, cover_path,
              instagram_url, has_shelter bool, is_published bool, created_at
venue_members venue_id → venues, user_id → profiles, role ('admin' | 'host'), PK(venue_id, user_id)
events        id uuid PK, venue_id → venues, title, description, lineup text[], starts_at timestamptz,
              ends_at timestamptz, price_from_uah int, cover_path, status ('draft' | 'published'), created_at
offers        id uuid PK, event_id → events, title, terms, max_claims int null,
              per_user_limit int default 1, valid_until timestamptz, is_active bool
claims        id uuid PK, offer_id → offers, user_id → profiles, token_hash text unique,
              status ('issued' | 'redeemed' | 'void'), issued_at, redeemed_at, redeemed_by → profiles
```

Indexes: `events(venue_id, starts_at)`, `events(starts_at) where status='published'`, `claims(offer_id)`, `claims(user_id)`.

## Access rules (RLS)

| Table         | Read                                                                                              | Write                                     |
| ------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| venues        | everyone, where `is_published`                                                                    | superadmin                                |
| events        | everyone, where `status='published'` and venue published; venue members see drafts of their venue | venue `admin` of that venue, superadmin   |
| offers        | everyone, for published events                                                                    | venue `admin` of that venue, superadmin   |
| claims        | the owning user; `host`/`admin` of the claim's venue                                              | **nobody directly** — only Edge Functions |
| venue_members | the member themself; venue admins of that venue                                                   | superadmin                                |
| profiles      | the user themself                                                                                 | the user themself (not `is_superadmin`)   |

Helper SQL functions (`security definer`, `stable`, fixed `search_path`): `is_superadmin()`, `is_venue_member(venue_id, role)`.

Implemented: `profiles`, `venues`, `venue_members` (migration `rls_profiles_venues_members`) and `events`, `offers`, `claims` (migration `rls_events_offers_claims`). Notes: `is_superadmin` is protected by column-level grants (`authenticated` can only insert `id, display_name` and update `display_name`); superadmin also reads unpublished venues and all `venue_members`; `anon` reads only published venues. Venue admins also read offers of their own draft events; superadmin reads everything. `claims` has `select` only (column grant, `token_hash` excluded) for `authenticated` and no grants for `anon`; all claim writes use the service role. Extra helpers (`security definer`, `stable`, fixed `search_path`): `event_venue_id`, `offer_venue_id`, `is_event_public`.

## Trusted flows (Edge Functions)

- `claim-offer`: checks auth, offer active, `max_claims`, `per_user_limit`, rate limit → creates a claim with a random 32-byte token, stores only `sha256(token)`, returns the token once. The QR encodes the token.
- `redeem-claim`: called by a host; hashes the scanned token, checks the host belongs to the claim's venue, status `issued`, offer still valid → marks `redeemed` atomically (`update … where status='issued'`), returns result for the ✅/❌ screen.
- Edge Functions use the service role key from Supabase secrets. That key never appears in the app, the repo or logs.

## Auth

- Sign in with Apple + Google via Supabase Auth. No phone, no email/password.
- Browsing does not require login; claiming does.
- Session stored with AsyncStorage on device.

## Taxi deep links

Built in `src/lib/taxi.ts` from venue `lat/lng/address`. Each provider link is covered by a unit test and verified on a real device before release. Falls back to the store page if the app is not installed.

## Performance rules

- Lists are virtualized (FlashList / FlatList), never `.map()` over unbounded data.
- Queries select only needed columns and are paginated or time-bounded (e.g. "next 7 days").
- Server data cached with TanStack Query; no fetching in `useEffect`.
- Images served resized from Storage, rendered with `expo-image`.

## Code knowledge graph

`graphify-out/` holds `GRAPH_REPORT.md` and `graph.json`. It is rebuilt in CI on every PR.
Agents query it before touching unfamiliar code; the reviewer compares the report before/after a PR to spot new cross-layer edges and new "god nodes".
