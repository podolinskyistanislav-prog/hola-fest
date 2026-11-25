# Hola Fest — Architecture

> This file is law for every agent. Changing it requires a PR labelled `architecture` and the founder's approval.

## Stack

| Concern              | Choice                                                                                |
| -------------------- | ------------------------------------------------------------------------------------- |
| App                  | Expo (SDK 58) + Expo Router, TypeScript strict, iOS / Android / web from one codebase |
| Backend              | Supabase: Postgres, Auth (Apple + Google), Storage, Edge Functions, Realtime          |
| Server state         | TanStack Query (added with the first data feature)                                    |
| Map                  | Leaflet + OSM/CARTO tiles in react-native-webview (native) / iframe (web), no key     |
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
profiles      id (= auth.users.id) PK, display_name (2–30), handle unique ([a-z0-9_.] 3–20), avatar_path,
              is_dj bool, is_banned bool, is_superadmin bool default false, created_at
venues        id uuid PK, slug unique, name, address, lat, lng, description, cover_path,
              instagram_url, has_shelter bool, is_published bool, created_at
venue_members venue_id → venues, user_id → profiles, role ('admin' | 'host'), PK(venue_id, user_id)
events        id uuid PK, venue_id → venues, title, description, lineup text[], tags text[] (genre: techno/house/rooftop), starts_at timestamptz,
              ends_at timestamptz, price_from_uah int, cover_path, status ('draft' | 'published'), created_at
offers        id uuid PK, event_id → events, title, terms, max_claims int null,
              per_user_limit int default 1, valid_until timestamptz, is_active bool,
              created_at timestamptz default now()
claims        id uuid PK, offer_id → offers, user_id → profiles, token_hash text unique,
              status ('issued' | 'redeemed' | 'void'), issued_at, redeemed_at, redeemed_by → profiles
posts         id uuid PK, author_id → profiles, as_venue_id → venues null, body ≤500, image_paths text[] ≤4,
              created_at, edited_at, hidden_at, hidden_reason ('reports' | 'moderator')
post_likes    PK(post_id → posts, user_id → profiles)
post_comments id uuid PK, post_id → posts, author_id → profiles, parent_id → post_comments (one level), body ≤500,
              created_at, hidden_at, hidden_reason
post_reports  id PK, post_id | comment_id (exactly one), reporter_id → profiles, reason
              ('event_promo' | 'abuse' | 'adult' | 'spam' | 'other'), unique per reporter + target
user_blocks   PK(blocker_id, blocked_id) → profiles
```

View `feed_posts` (owner view, applies its own filters): visible posts with author name (venue name when posted as a club), handle, avatar, `label` (`club` > `dj` > `hola` (superadmin) > null), `like_count`, `comment_count`, `liked_by_me`; excludes hidden posts, banned authors and authors the caller blocked. Storage bucket `feed-images`: public read, 5 MB, jpeg/png/webp, write only under `<uid>/…` by confirmed non-banned users.

Indexes: `events(venue_id, starts_at)`, `events using gin(tags)`, `events(starts_at) where status='published'`, `claims(offer_id)`, `claims(user_id)`.

## Access rules (RLS)

| Table         | Read                                                                                              | Write                                     |
| ------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| venues        | everyone, where `is_published`; members of the venue also read it while unpublished               | superadmin                                |
| events        | everyone, where `status='published'` and venue published; venue members see drafts of their venue | venue `admin` of that venue, superadmin   |
| offers        | everyone, active offers of published events; venue `admin` also sees inactive ones                | venue `admin` of that venue, superadmin   |
| claims        | the owning user; `host`/`admin` of the claim's venue                                              | **nobody directly** — only Edge Functions |
| venue_members | the member themself; venue admins of that venue                                                   | superadmin                                |
| profiles      | the user themself; superadmin reads all                                                           | the user themself (not `is_superadmin`, `is_dj`, `is_banned`); superadmin sets `is_dj` / `is_banned` |
| posts         | everyone incl. anonymous: not hidden, author not banned, author not blocked by the reader; superadmin reads all | **no direct insert/update** — only the Edge Function (M16.2); author deletes own; superadmin hides/restores |
| post_comments | same as posts                                                                                     | same as posts                             |
| post_likes    | the liker                                                                                         | confirmed, non-banned users, as themself  |
| post_reports  | the reporter; superadmin                                                                          | confirmed, non-banned users, as themself; 3 distinct reports auto-hide the target (trigger) |
| user_blocks   | the blocker                                                                                       | confirmed, non-banned users, as themself  |

Helper SQL functions (`security definer`, `stable`, fixed `search_path`): `is_superadmin()`, `is_venue_member(venue_id, role)`, `can_interact()` (confirmed = `is_anonymous` not true, and not banned), `feed_author_visible(author_id)`, `handle_available(handle)` (RPC for profile setup: returns only a boolean; execute for `authenticated` only, not `anon`; the caller's own handle counts as free).

Venue members read their own unpublished venue (migration `venues_select_own_member`) so the admin app can list "my venues"; writes stay superadmin-only. Implemented: `profiles`, `venues`, `venue_members` (migration `rls_profiles_venues_members`) and `events`, `offers`, `claims` (migration `rls_events_offers_claims`). Notes: `is_superadmin` is protected by column-level grants (`authenticated` can only insert `id, display_name` and update `display_name`); superadmin also reads unpublished venues and all `venue_members`; `anon` reads only published venues. Venue admins also read offers of their own draft events and their inactive offers (`is_active = false` is hidden from everyone else by `offers_select`, migration `offers_select_hide_inactive`); superadmin reads everything. `claims` has `select` only (column grant, `token_hash` excluded) for `authenticated` and no grants for `anon`; all claim writes use the service role. Extra helpers (`security definer`, `stable`, fixed `search_path`): `event_venue_id`, `offer_venue_id`, `is_event_public`.

## Trusted flows (Edge Functions)

- `claim-offer` (implemented: Edge Function `supabase/functions/claim-offer` + SQL function `public.claim_offer(offer_id, user_id, token_hash)`, `security definer`, execute granted to `service_role` only; locks the offer row so limits are race-safe; rate limit 10 claims per user per minute; void claims do not count toward limits): checks auth, offer active, `max_claims`, `per_user_limit`, rate limit → creates a claim with a random 32-byte token, stores only `sha256(token)`, returns the token once. The QR encodes the token.
- `redeem-claim` (implemented: Edge Function `supabase/functions/redeem-claim` + SQL function `public.redeem_claim(token_hash, host_id)`, `security definer`, execute granted to `service_role` only): the function authenticates the caller, validates the 64-hex token and hashes it; the SQL function locks the claim row (`for update`), checks the caller is `host`/`admin` of the claim's venue (before revealing anything about the claim), status `issued`, offer active and not past `valid_until` → marks `redeemed` with `redeemed_at`/`redeemed_by`, so two simultaneous scans give exactly one success. Results for the ✅/❌ screen: `ok` (200), `already_redeemed` (409), `expired` (409), `wrong_venue` (403), `unknown_token` (404, also for void claims), `invalid_request` (400).
- Edge Functions use the service role key from Supabase secrets. That key never appears in the app, the repo or logs.

## Auth

MVP (decision 0002):

- **Guests:** Supabase anonymous sign-in, created silently on first launch. No sign-in screen.
  Anonymous users are real `auth.users` rows (`is_anonymous = true`), so RLS and `claims.user_id` work unchanged.
  A `profiles` row is created for them like for any user.
- **Profile creation:** trigger `on_auth_user_created` (after insert on `auth.users`) calls `public.handle_new_user()`
  (`security definer`, `search_path = ''`, execute revoked from `public`/`anon`/`authenticated`), which inserts
  `profiles(id)` with `on conflict do nothing`. `is_superadmin` always stays `false`; only the founder sets it manually.
  The migration also backfills profiles for existing users.
- **Venue staff and superadmin:** email + password. The founder creates these accounts in the Supabase
  dashboard. They are never created by public sign-up from the app. Roles come from `venue_members` / `profiles.is_superadmin`.
- Anti-abuse in MVP: Supabase's per-IP limit on anonymous sign-ins plus `per_user_limit` on offers.
  A reinstall gives a new guest. That risk is accepted for the MVP.
- Later: Sign in with Apple + Google, linking the anonymous account (`linkIdentity`) so a guest keeps their claims.
- Session stored with AsyncStorage on device.
- **Public email sign-up is blocked** (decision 0003). `enable_signup=false` would also block guests, so the
  `public.hook_before_user_created` hook only lets anonymous sign-ups through. Applied by migration + `config.toml` locally.

**Founder action in the hosted Supabase dashboard** (`config.toml` is not pushed to hosted projects automatically):

1. Authentication → Sign In / Providers: keep **Allow anonymous sign-ins** ON; keep **Allow new users to sign up** ON
   (turning it off breaks guests).
2. Authentication → Hooks → **Before User Created**: enable, type _Postgres function_, choose
   `public.hook_before_user_created`. Do this after the migration is applied to the hosted database.
3. Create staff accounts only via Authentication → Users → _Add user_ (the hook does not apply to admin-created users).
4. Optional: turn **Confirm email** ON and keep email rate limits low.

## Taxi deep links

Built in `src/lib/taxi.ts` from venue `lat/lng/address`. Each provider link is covered by a unit test and verified on a real device before release. Falls back to the store page if the app is not installed.

> **Placeholder coordinates:** in `supabase/seed.sql` the `lat/lng` of Bavovna and Panorama Bar are fake (Kyiv city centre). The founder replaces them with real pins; taxi links are not valid for these venues until then.

## Performance rules

- Lists are virtualized (FlashList / FlatList), never `.map()` over unbounded data.
- Queries select only needed columns and are paginated or time-bounded (e.g. "next 7 days").
- Server data cached with TanStack Query; no fetching in `useEffect`.
- Images served resized from Storage, rendered with `expo-image`.

## Code knowledge graph

`graphify-out/` holds `GRAPH_REPORT.md` and `graph.json`. It is rebuilt in CI on every PR.
Agents query it before touching unfamiliar code; the reviewer compares the report before/after a PR to spot new cross-layer edges and new "god nodes".
