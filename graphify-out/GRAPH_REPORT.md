# Graph Report - hola-fest  (2026-11-06)

## Corpus Check
- 262 files · ~79,416 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1613 nodes · 3464 edges · 97 communities (83 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 79 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `00f3ef67`
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
- Button.tsx
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- jest
- 0001-foundation.md
- VenueScreenContent.tsx
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
- react-native
- react-dom@19.3.0
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
- MyTicketsContent.tsx
- edge-functions
- on
- package.json
- Accessibility (WCAG 2.2)
- with
- claimedTokens.ts
- Quick Reference
- claims.test.ts
- AppText.tsx
- components/TaxiBar.tsx
- services/admin.ts
- OfferForm.tsx
- QRTicket.tsx
- space
- build
- TextField
- @testing-library/react-native
- useEventEditor.ts
- index.tsx
- @tanstack/react-query
- react-native-web@~0.21.4
- types/admin.ts
- theme/index.ts
- eventFormValidation.ts
- t
- auth.ts
- useClaimOffer.ts
- expo@~58.0.23
- kit.test.tsx
- expo-splash-screen
- ui/index.ts
- AppText
- GlassSurface
- ScannerScreenContent.tsx
- app/_layout.tsx
- EventDetails.tsx
- 0008-eas-cloud-builds.md
- MapPin.tsx
- ticketStatus.ts
- 0007 — Taxi deep links
- toqr
- expo-constants@~58.0.15
- react-dom@19.3.0
- react-native-reanimated@4.7.1

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 92 edges
2. `useTheme()` - 87 edges
3. `t()` - 77 edges
4. `react-native` - 60 edges
5. `Button()` - 52 edges
6. `space` - 39 edges
7. `@testing-library/react-native` - 35 edges
8. `react` - 31 edges
9. `@tanstack/react-query` - 29 edges
10. `GlassSurface()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `Одноразове налаштування` --references--> `main()`  [INFERRED]
  README.md → scripts/screenshots/run.ts
- `Typography` --references--> `AppText()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/AppText.tsx
- `Day strip` --references--> `DayStrip()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/DayStrip.tsx
- `Event card` --references--> `EventCard()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/EventCard.tsx
- `Liquid glass` --references--> `GlassSurface()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/GlassSurface.tsx

## Import Cycles
- None detected.

## Communities (97 total, 14 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.07
Nodes (27): dependencies, expo-camera@~58.0.14, expo-device@~58.0.5, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-linking@~58.0.16, expo-router@~58.0.30, expo-system-ui@~58.0.7 (+19 more)

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
Cohesion: 0.07
Nodes (37): MapScreen(), useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, KYIV_REGION, mappableVenues(), base (+29 more)

### Community 6 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, android, check, db:types, db:verify, format, ios, lint (+5 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.05
Nodes (37): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Access rules (RLS), Allowed dependencies (enforced by ESLint where possible) (+29 more)

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

### Community 12 - "Button.tsx"
Cohesion: 0.16
Nodes (16): Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+8 more)

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.10
Nodes (21): How you work, Never, You may edit only, Check, in this order, Output, 0005 — Web build is a single-page app, appEnvFromSupabaseStatus(), buildShotPlan() (+13 more)

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

### Community 22 - "VenueScreenContent.tsx"
Cohesion: 0.18
Nodes (17): react-native-safe-area-context, VenueScreen(), Chip(), EventCard(), formatEventDay(), formatEventTime(), EventRow(), EventRowProps (+9 more)

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
Cohesion: 0.06
Nodes (70): DayStrip(), tabBarInset(), EventDetailsProps, dayFromId(), eventCardProps(), event, weekDays(), dayRange() (+62 more)

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

### Community 36 - "react-native"
Cohesion: 0.14
Nodes (16): react-native, ChipProps, styles, DAY_PILL_HEIGHT, DayStripDay, DayStripProps, styles, availabilityHint() (+8 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.24
Nodes (9): StaffEventsScreen(), StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, UseStaffAccess, useStaffAccess() (+1 more)

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
Cohesion: 0.11
Nodes (16): ClaimDeps, ClaimResult, ERRORS, handleClaimOffer(), json(), sha256Hex(), toHex(), admin (+8 more)

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

### Community 52 - "MyTicketsContent.tsx"
Cohesion: 0.26
Nodes (9): expo-router, TicketScreen(), TicketsScreen(), Message(), MyTicketsContent(), MyTicketsContentProps, styles, TicketRow() (+1 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.11
Nodes (18): expo-build-properties@~58.0.12, expo-font@~58.0.11, expo-status-bar@~58.0.4, expo-symbols@~58.0.4, @expo/ui@~58.0.27, react-native-screens@~4.30.1, react-native-worklets@0.13.0, main (+10 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "claimedTokens.ts"
Cohesion: 0.28
Nodes (11): expo-secure-store@~58.0.2, expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret() (+3 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 61 - "AppText.tsx"
Cohesion: 0.15
Nodes (14): AppTextProps, Tone, ButtonProps, ButtonVariant, styles, StringListFieldProps, styles, styles (+6 more)

### Community 62 - "components/TaxiBar.tsx"
Cohesion: 0.20
Nodes (14): styles, TaxiBar(), TaxiBarProps, destination, openMock, buildTaxiLinks(), isValidCoordinate(), LinkOpener (+6 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (26): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+18 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.12
Nodes (24): OfferForm(), OfferFormProps, styles, base, OfferFormAreaProps, styles, emptyOfferForm, OFFER_TERMS_MAX_LENGTH (+16 more)

### Community 65 - "QRTicket.tsx"
Cohesion: 0.20
Nodes (11): QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus (+3 more)

### Community 66 - "space"
Cohesion: 0.26
Nodes (10): Map pin and venue preview card, MapPin(), VenuePreviewCard(), MappableVenue, styles, VenueMap(), VenueMapProps, styles (+2 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "TextField"
Cohesion: 0.10
Nodes (25): Admin form fields, Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass (+17 more)

### Community 69 - "@testing-library/react-native"
Cohesion: 0.15
Nodes (10): @testing-library/react-native, EventOffersSectionProps, base, offer, StaffHomeProps, base, base, draft (+2 more)

### Community 70 - "useEventEditor.ts"
Cohesion: 0.09
Nodes (22): EventSubmission, defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+14 more)

### Community 71 - "index.tsx"
Cohesion: 0.27
Nodes (7): EventsScreen(), styles, FloatingTabBar(), ITEMS, TabsLayout(), mockNavigate, mockPush

### Community 72 - "@tanstack/react-query"
Cohesion: 0.22
Nodes (9): @tanstack/react-query, styles, TicketScreenContentProps, claim, mockClaims, mockToken, useClaimToken(), useMyClaims() (+1 more)

### Community 74 - "types/admin.ts"
Cohesion: 0.19
Nodes (7): defaultServices, Services, offer, UseEventOffers, setOfferActive(), AdminVenue, OfferInput

### Community 75 - "theme/index.ts"
Cohesion: 0.18
Nodes (15): FAILURE_MESSAGE, ScanFailureReason, ScanResultProps, styles, contrastRatio(), parseHex(), relativeLuminance(), brand (+7 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.16
Nodes (15): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS, parsePrice() (+7 more)

### Community 77 - "t"
Cohesion: 0.18
Nodes (14): react, StaffLogin(), styles, SessionError(), SessionErrorProps, styles, StaffLoginForm(), StaffLoginFormProps (+6 more)

### Community 78 - "auth.ts"
Cohesion: 0.10
Nodes (24): @supabase/supabase-js, createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest (+16 more)

### Community 79 - "useClaimOffer.ts"
Cohesion: 0.15
Nodes (14): claimKeys, ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE, mockClaim (+6 more)

### Community 81 - "kit.test.tsx"
Cohesion: 0.10
Nodes (24): Event, QR and map kit, AccentBlobs(), styles, GlassIconButton(), GlassSearchField(), GlassSearchFieldProps, SEARCH_FIELD_HEIGHT, styles (+16 more)

### Community 83 - "ui/index.ts"
Cohesion: 0.14
Nodes (18): @expo/vector-icons, EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles (+10 more)

### Community 84 - "AppText"
Cohesion: 0.22
Nodes (21): EventScreen(), AppText(), Button(), ScanResult(), SwitchField(), EventScreenContent(), Message(), EventForm() (+13 more)

### Community 85 - "GlassSurface"
Cohesion: 0.18
Nodes (14): Tab bar, GlassPillButton(), GlassPillButtonProps, styles, GlassSurface(), MapVenueCard(), MapVenueCardProps, styles (+6 more)

### Community 86 - "ScannerScreenContent.tsx"
Cohesion: 0.19
Nodes (9): expo-camera, ScannerScreen(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles, requestPermission, useScanRedeem() (+1 more)

### Community 87 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (8): RootLayout(), SessionGate(), StaffEventFormScreen(), StaffOfferFormScreen(), useSession(), OfferFormArea(), createQueryClient(), useAppFonts()

### Community 88 - "EventDetails.tsx"
Cohesion: 0.31
Nodes (8): EventDetails(), offerStatus(), Section(), styles, formatPriceFrom(), EventScreenContentProps, styles, ClaimOfferButton()

### Community 90 - "MapPin.tsx"
Cohesion: 0.29
Nodes (6): HALO, MAP_PIN_DOT_SIZE, MAP_PIN_LABEL_HEIGHT, MapPinColor, MapPinProps, styles

### Community 91 - "ticketStatus.ts"
Cohesion: 0.43
Nodes (4): formatValidUntil(), now, ticketStatus(), MyClaim

### Community 92 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 737 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `VenueScreenContent.tsx`, `fonts.ts`, `MyTicketsContent.tsx`, `package.json`, `AppText.tsx`, `components/TaxiBar.tsx`, `OfferForm.tsx`, `QRTicket.tsx`, `space`, `index.tsx`, `@tanstack/react-query`, `theme/index.ts`, `t`, `kit.test.tsx`, `ui/index.ts`, `AppText`, `GlassSurface`, `ScannerScreenContent.tsx`, `EventDetails.tsx`, `MapPin.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `devDependencies`, `supabase.ts`, `fonts.ts`, `react-native`, `react-dom@19.3.0`, `package.json`, `components/TaxiBar.tsx`, `OfferForm.tsx`, `QRTicket.tsx`, `TextField`, `useEventEditor.ts`, `index.tsx`, `@tanstack/react-query`, `types/admin.ts`, `theme/index.ts`, `eventFormValidation.ts`, `t`, `auth.ts`, `useClaimOffer.ts`, `kit.test.tsx`, `ScannerScreenContent.tsx`, `app/_layout.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `@tanstack/react-query` connect `@tanstack/react-query` to `package.json`, `OfferForm.tsx`, `react-dom@19.3.0`, `useEventEditor.ts`, `index.tsx`, `supabase.ts`, `types/admin.ts`, `useClaimOffer.ts`, `package.json`, `app/_layout.tsx`, `fonts.ts`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._