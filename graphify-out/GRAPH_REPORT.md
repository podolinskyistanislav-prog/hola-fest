# Graph Report - hola-fest  (2026-11-25)

## Corpus Check
- 323 files · ~102,351 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1898 nodes · 4555 edges · 104 communities (94 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `51133d92`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- devDependencies
- expo
- Hola Fest — Architecture
- compilerOptions
- supabase.ts
- scripts
- Hola Fest — Product
- with
- with
- AGENTS.md
- steps
- EventForm.tsx
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- jest
- 0001-foundation.md
- StaffLoginForm.tsx
- _layout.tsx
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- fonts.ts
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- expo-linking@~58.0.16
- services/events.ts
- steps
- react-native-reanimated@4.7.1
- jobs
- react-native-worklets@0.13.0
- expo-web-browser@~58.0.7
- @react-native-async-storage/async-storage
- react-native-web@~0.21.4
- fonts.ts
- permissions
- changes
- review-pr
- 0002-anonymous-auth-for-mvp.md
- database
- Cloud Security Checklist
- VenuesMapScreenContent.tsx
- edge-functions
- on
- dependencies
- Accessibility (WCAG 2.2)
- with
- ui/index.ts
- Quick Reference
- services/venues.ts
- EventsScreenContent.tsx
- react-native
- services/admin.ts
- OfferForm.tsx
- @tanstack/react-query
- useClaimOffer.ts
- build
- Hola Fest — design rules
- VenueEventsList.tsx
- DjScreenContent.tsx
- t
- sessionStore.ts
- components/TaxiBar.tsx
- claimedTokens.ts
- QRTicket.tsx
- @testing-library/react-native
- react
- services/claims.ts
- venueWeek.ts
- TicketScreenContent.tsx
- useVenues.ts
- mapHtml.ts
- kyivDayKey
- Button
- auth.ts
- staff/index.ts
- MyTicketsContent.tsx
- AppText
- 0008-eas-cloud-builds.md
- i18n/index.ts
- theme/index.ts
- app/_layout.tsx
- expo-router
- OfferRow.tsx
- useMyClaims.ts
- 0007 — Taxi deep links
- db-backend.md
- reviewer.md
- VenueMap.web.test.tsx
- useSession
- Feed rules (Стрічка)
- expo-splash-screen
- @expo/ui@~58.0.27

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 125 edges
2. `useTheme()` - 123 edges
3. `t()` - 106 edges
4. `react-native` - 89 edges
5. `Button()` - 56 edges
6. `space` - 51 edges
7. `@testing-library/react-native` - 42 edges
8. `react` - 39 edges
9. `radius` - 36 edges
10. `@tanstack/react-query` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Rules for agents` --references--> `t()`  [INFERRED]
  docs/design/mockups/README.md → src/lib/i18n/index.ts
- `Context` --references--> `readSecret()`  [INFERRED]
  docs/decisions/0009-web-secret-storage-fallback.md → src/lib/secureStorage.ts
- `Decision` --references--> `openTaxiLink()`  [INFERRED]
  docs/decisions/0007-taxi-deep-links.md → src/lib/taxi.ts
- `Code quality` --references--> `claimOffer()`  [INFERRED]
  CLAUDE.md → src/services/claims.ts
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts

## Import Cycles
- None detected.

## Communities (104 total, 10 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (22): expo@~58.0.23, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-symbols@~58.0.4, expo-web-browser@~58.0.7, @react-native-async-storage/async-storage@2.2.0, react-native-webview@14.0.1, react-native-worklets@0.13.0 (+14 more)

### Community 1 - "devDependencies"
Cohesion: 0.10
Nodes (20): devDependencies, eslint-config-prettier@^10.1.8, jest@^30.5.2, jest-expo@^58.0.14, playwright@^1.64.1, prettier@^3.9.10, @testing-library/react-native@^14.1.0, tsx@^4.23.15 (+12 more)

### Community 2 - "expo"
Cohesion: 0.06
Nodes (31): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, projectId (+23 more)

### Community 3 - "Hola Fest — Architecture"
Cohesion: 0.15
Nodes (12): { defineConfig }, expoConfig, NO_FEATURES_IN_UI, NO_SERVICES_IN_UI, prettierRecommended, SUPABASE_ONLY_IN_SERVICES, eslint@^9.39.5, eslint-config-expo@^58.0.4 (+4 more)

### Community 4 - "compilerOptions"
Cohesion: 0.17
Nodes (11): expo/tsconfig.base, compilerOptions, noFallthroughCasesInSwitch, noUncheckedIndexedAccess, paths, strict, types, exclude (+3 more)

### Community 5 - "supabase.ts"
Cohesion: 0.06
Nodes (46): @expo/vector-icons, styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles, GlassPillButton(), GlassPillButtonProps (+38 more)

### Community 6 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, android, check, db:types, db:verify, format, ios, lint (+5 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.04
Nodes (40): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Access rules (RLS), Allowed dependencies (enforced by ESLint where possible) (+32 more)

### Community 8 - "with"
Cohesion: 0.14
Nodes (14): issue, types, description, required, types, on, issue_comment, issues (+6 more)

### Community 9 - "with"
Cohesion: 0.20
Nodes (15): steps, steps, steps, steps, id, if, name, run (+7 more)

### Community 10 - "AGENTS.md"
Cohesion: 0.33
Nodes (5): Building with EAS, Commands, Expo has changed — do not trust your training data, Navigation & Routing, Rules

### Community 11 - "steps"
Cohesion: 0.12
Nodes (16): jobs, refresh, name, on, push, permissions, contents, branches (+8 more)

### Community 12 - "EventForm.tsx"
Cohesion: 0.15
Nodes (19): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), StringListFieldProps (+11 more)

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.10
Nodes (25): 0005 — Web build is a single-page app, 0009 — Web fallback for secret storage, Consequences, Context, Decision, appEnvFromSupabaseStatus(), buildShotPlan(), readStatusValue() (+17 more)

### Community 15 - "mobile.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 16 - "dependencies"
Cohesion: 0.04
Nodes (48): 10. Dependency Security, 1. Secrets Management, 2. Input Validation, 3. SQL Injection Prevention, 4. Authentication & Authorization, 5. XSS Prevention, 6. CSRF Protection, 7. Rate Limiting (+40 more)

### Community 18 - "reviewer.md"
Cohesion: 0.33
Nodes (5): 0004 — Screenshot tool: Playwright on the Expo web build, Consequences, Context, Decision, Detecting changed screens (next task)

### Community 20 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 22 - "StaffLoginForm.tsx"
Cohesion: 0.23
Nodes (8): StaffLogin(), styles, StaffLoginForm(), StaffLoginFormProps, styles, Deps, UseStaffLogin, useStaffLogin()

### Community 23 - "_layout.tsx"
Cohesion: 0.06
Nodes (35): concurrency, cancel-in-progress, group, DIR, GH_TOKEN, PR, REPO, SHA (+27 more)

### Community 24 - "task.md"
Cohesion: 0.33
Nodes (5): Acceptance criteria, Dependencies, Goal, Out of scope, Owner & allowed paths

### Community 25 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): How it was verified, Security checklist (if data, auth or offers are touched), What changed

### Community 26 - "expo-constants@~58.0.15"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 27 - "expo-glass-effect@~58.0.5"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, deno-version, fetch-depth, node-version (+5 more)

### Community 28 - "expo-image@~58.0.18"
Cohesion: 0.04
Nodes (47): 1. Tests BEFORE Code, 2. Coverage Requirements, 3. Test Types, 4. Git Checkpoints, API Integration Test Pattern, Best Practices, Bun Native Test Pattern (`bun:test`), CI/CD Integration (+39 more)

### Community 29 - "expo-linking@~58.0.16"
Cohesion: 0.20
Nodes (10): GITHUB_TOKEN, secrets-scan, permissions, contents, pull-requests, name, permissions, runs-on (+2 more)

### Community 30 - "fonts.ts"
Cohesion: 0.33
Nodes (6): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent(), shareVenue(), venueLink()

### Community 31 - "ui-ux.md"
Cohesion: 0.50
Nodes (3): How you work, Review mode (on a PR touching src/app, src/features, src/components or src/theme), You may edit only (work mode, on an agent:ui issue)

### Community 32 - "expo-symbols@~58.0.4"
Cohesion: 0.07
Nodes (29): concurrency, cancel-in-progress, group, env, runs-on, steps, timeout-minutes, EXPO_TOKEN (+21 more)

### Community 33 - "expo-system-ui@~58.0.7"
Cohesion: 0.22
Nodes (8): name, runs-on, concurrency, cancel-in-progress, group, jobs, check, name

### Community 34 - "@expo/ui@~58.0.27"
Cohesion: 0.06
Nodes (30): concurrency, cancel-in-progress, group, env, name, runs-on, steps, SUPABASE_ACCESS_TOKEN (+22 more)

### Community 36 - "expo-linking@~58.0.16"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 37 - "services/events.ts"
Cohesion: 0.08
Nodes (33): EventScreen(), EventDetailsProps, EventScreenContent(), event, onBack, onOpenDj, onOpenVenue, renderScreen() (+25 more)

### Community 38 - "steps"
Cohesion: 0.19
Nodes (15): BODY, BRANCH, GH_TOKEN, TITLE, steps, steps, continue-on-error, env (+7 more)

### Community 40 - "jobs"
Cohesion: 0.20
Nodes (9): jobs, mention, sync-status, if, runs-on, timeout-minutes, name, if (+1 more)

### Community 41 - "react-native-worklets@0.13.0"
Cohesion: 0.07
Nodes (27): if, runs-on, steps, concurrency, cancel-in-progress, group, AGENTS_MAX_PARALLEL, GH_TOKEN (+19 more)

### Community 42 - "expo-web-browser@~58.0.7"
Cohesion: 0.09
Nodes (20): ClaimDeps, ClaimResult, ERRORS, handleClaimOffer(), json(), sha256Hex(), toHex(), admin (+12 more)

### Community 43 - "@react-native-async-storage/async-storage"
Cohesion: 0.33
Nodes (6): ISSUE, work-on-issue, env, if, runs-on, timeout-minutes

### Community 44 - "react-native-web@~0.21.4"
Cohesion: 0.83
Nodes (3): act(), is_closed(), queue.sh script

### Community 45 - "fonts.ts"
Cohesion: 0.40
Nodes (4): @expo-google-fonts/inter@^0.4.2, @expo-google-fonts/unbounded@^0.4.1, @expo-google-fonts/inter, @expo-google-fonts/unbounded

### Community 46 - "permissions"
Cohesion: 0.29
Nodes (7): permissions, actions, checks, contents, id-token, issues, pull-requests

### Community 47 - "changes"
Cohesion: 0.33
Nodes (6): name, outputs, runs-on, changes, db, functions

### Community 48 - "review-pr"
Cohesion: 0.29
Nodes (8): cancel-in-progress, group, review-pr, concurrency, if, runs-on, timeout-minutes, concurrency

### Community 50 - "database"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, database

### Community 51 - "Cloud Security Checklist"
Cohesion: 0.06
Nodes (33): 1. IAM & Access Control, 2. Secrets Management, 3. Network Security, 4. Logging & Monitoring, 5. CI/CD Pipeline Security, 6. Cloudflare & CDN Security, 7. Backup & Disaster Recovery, Automated Backups (+25 more)

### Community 52 - "VenuesMapScreenContent.tsx"
Cohesion: 0.16
Nodes (21): filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base, TodayOffer, todayOffers() (+13 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-device@~58.0.5, expo-image@~58.0.18, expo-secure-store@~58.0.2, expo-status-bar@~58.0.4, expo-system-ui@~58.0.7 (+23 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "ui/index.ts"
Cohesion: 0.07
Nodes (49): Chip(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps, styles (+41 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "services/venues.ts"
Cohesion: 0.11
Nodes (21): onBack, onOpenEvent, onOpenMap, venue, weekEvent, ClientError, getVenueById(), from (+13 more)

### Community 61 - "EventsScreenContent.tsx"
Cohesion: 0.13
Nodes (18): EventsScreen(), eventsOnDay(), HOME_FILTER_IDS, HomeFilterId, CarouselSkeleton(), EmptyDay(), EventsScreenContent(), EventsScreenContentProps (+10 more)

### Community 62 - "react-native"
Cohesion: 0.08
Nodes (31): react-native, react-native-svg, AppTextProps, Tone, ButtonProps, ButtonVariant, styles, CollapsibleSectionProps (+23 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.12
Nodes (30): defaultServices, Services, AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns() (+22 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.16
Nodes (20): OfferForm(), OfferFormProps, styles, base, OfferFormArea(), OfferFormAreaProps, styles, emptyOfferForm (+12 more)

### Community 65 - "@tanstack/react-query"
Cohesion: 0.18
Nodes (12): @tanstack/react-query, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, useEventOffers(), defaultServices (+4 more)

### Community 66 - "useClaimOffer.ts"
Cohesion: 0.20
Nodes (12): claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+4 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "VenueEventsList.tsx"
Cohesion: 0.10
Nodes (22): react-native-safe-area-context, defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+14 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.09
Nodes (33): DjScreen(), tabBarInset(), filterDjsByName(), genresLine(), alex, nova, DjBody(), DjScreenContent() (+25 more)

### Community 71 - "t"
Cohesion: 0.18
Nodes (27): formatHomeDate(), gigRowProps(), nextGigLine(), carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId(), dayTile() (+19 more)

### Community 72 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.17
Nodes (19): styles, TaxiBar(), TaxiBarProps, destination, openMock, EventTaxiBar(), EventTaxiBarProps, PLACEHOLDER_PROVIDERS (+11 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.30
Nodes (11): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret(), readSecret() (+3 more)

### Community 75 - "QRTicket.tsx"
Cohesion: 0.20
Nodes (11): QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus (+3 more)

### Community 76 - "@testing-library/react-native"
Cohesion: 0.12
Nodes (19): @testing-library/react-native, base, emptyEventForm, EventFormErrors, EventFormValues, EventSubmission, LINEUP_ITEM_MAX_LENGTH, parsePrice() (+11 more)

### Community 77 - "react"
Cohesion: 0.17
Nodes (21): react, encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue, parseFromMap(), venue (+13 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.13
Nodes (18): requestPermission, Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason() (+10 more)

### Community 79 - "venueWeek.ts"
Cohesion: 0.16
Nodes (15): CTA_BY_STATE, EventOfferCardProps, eventAt(), venue(), WeekOfEvents(), groupVenueWeek(), safeInstagramUrl(), now (+7 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.16
Nodes (17): expo-brightness@~58.0.2, expo-brightness, AccentBlobs(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps (+9 more)

### Community 81 - "useVenues.ts"
Cohesion: 0.30
Nodes (8): VenueScreen(), useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, renderScreen(), VenueScreenContent(), getPublishedVenues()

### Community 82 - "mapHtml.ts"
Cohesion: 0.22
Nodes (12): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+4 more)

### Community 83 - "kyivDayKey"
Cohesion: 0.23
Nodes (21): weekDays(), dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), useHomeEvents(), addKyivDays() (+13 more)

### Community 84 - "Button"
Cohesion: 0.18
Nodes (15): StaffEventFormScreen(), Button(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), EventOffersSection() (+7 more)

### Community 85 - "auth.ts"
Cohesion: 0.30
Nodes (11): AuthError, AuthErrorCode, ClientError, ensureGuestSession(), getSession(), onAuthChange(), signInStaff(), signOut() (+3 more)

### Community 86 - "staff/index.ts"
Cohesion: 0.22
Nodes (10): getStaffAccess(), StaffAccess, StaffAreaProps, StaffHome(), StaffHomeProps, styles, base, UseStaffAccess (+2 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.15
Nodes (14): TicketsScreen(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps (+6 more)

### Community 88 - "AppText"
Cohesion: 0.12
Nodes (34): expo-image, DjsScreen(), MapScreen(), AppText(), CollapsibleSection(), DjRow(), EventCard(), GigRow() (+26 more)

### Community 90 - "i18n/index.ts"
Cohesion: 0.22
Nodes (8): FloatingTabBar(), ITEMS, TabsLayout(), TabBarItem, mockNavigate, mockPush, TranslationKey, uk

### Community 91 - "theme/index.ts"
Cohesion: 0.14
Nodes (18): FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles, MessageAction, ScannerScreenContentProps, styles (+10 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.26
Nodes (7): RootLayout(), SessionGate(), SessionError(), SessionErrorProps, styles, createQueryClient(), useAppFonts()

### Community 93 - "expo-router"
Cohesion: 0.33
Nodes (5): expo-router@~58.0.30, expo-router, TicketScreen(), BackRouter, goBackOr()

### Community 94 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

### Community 95 - "useMyClaims.ts"
Cohesion: 0.48
Nodes (4): useClaimToken(), useMyClaims(), getMyClaims(), toMyClaim()

### Community 96 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 99 - "VenueMap.web.test.tsx"
Cohesion: 0.33
Nodes (4): Listener, listeners, mount(), venue

### Community 100 - "useSession"
Cohesion: 0.20
Nodes (9): ScannerScreen(), StaffEventsScreen(), StaffOfferFormScreen(), StaffScreen(), useSession(), ScannerScreenContent(), useScanRedeem(), onCodeScanned() (+1 more)

### Community 101 - "Feed rules (Стрічка)"
Cohesion: 0.50
Nodes (3): Enforcement, Feed rules (Стрічка), For everyone (guests, clubs, DJs)

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 838 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `t` to `supabase.ts`, `EventForm.tsx`, `StaffLoginForm.tsx`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `services/venues.ts`, `EventsScreenContent.tsx`, `react-native`, `OfferForm.tsx`, `useClaimOffer.ts`, `Hola Fest — design rules`, `VenueEventsList.tsx`, `DjScreenContent.tsx`, `components/TaxiBar.tsx`, `services/claims.ts`, `venueWeek.ts`, `TicketScreenContent.tsx`, `useVenues.ts`, `Button`, `staff/index.ts`, `MyTicketsContent.tsx`, `AppText`, `i18n/index.ts`, `theme/index.ts`, `app/_layout.tsx`, `useSession`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `EventForm.tsx`, `StaffLoginForm.tsx`, `fonts.ts`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `dependencies`, `ui/index.ts`, `EventsScreenContent.tsx`, `OfferForm.tsx`, `VenueEventsList.tsx`, `DjScreenContent.tsx`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `QRTicket.tsx`, `react`, `TicketScreenContent.tsx`, `useVenues.ts`, `Button`, `staff/index.ts`, `MyTicketsContent.tsx`, `AppText`, `theme/index.ts`, `app/_layout.tsx`, `expo-router`, `OfferRow.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `package.json`, `devDependencies`, `supabase.ts`, `EventForm.tsx`, `StaffLoginForm.tsx`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `ui/index.ts`, `services/venues.ts`, `EventsScreenContent.tsx`, `OfferForm.tsx`, `@tanstack/react-query`, `useClaimOffer.ts`, `VenueEventsList.tsx`, `DjScreenContent.tsx`, `sessionStore.ts`, `components/TaxiBar.tsx`, `QRTicket.tsx`, `react`, `services/claims.ts`, `TicketScreenContent.tsx`, `useVenues.ts`, `Button`, `staff/index.ts`, `MyTicketsContent.tsx`, `AppText`, `i18n/index.ts`, `theme/index.ts`, `app/_layout.tsx`, `useMyClaims.ts`, `VenueMap.web.test.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._