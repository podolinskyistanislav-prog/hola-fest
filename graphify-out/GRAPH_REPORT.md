# Graph Report - hola-fest  (2026-11-23)

## Corpus Check
- 300 files · ~95,149 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1802 nodes · 4155 edges · 97 communities (86 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bfeb1783`
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
- t
- _layout.tsx
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- AppText
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- expo-linking@~58.0.16
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
- useVenues.ts
- edge-functions
- on
- dependencies
- Accessibility (WCAG 2.2)
- with
- services/events.ts
- Quick Reference
- services/venues.ts
- ui/index.ts
- theme/index.ts
- services/admin.ts
- offerFormValidation.ts
- ScannerScreenContent.tsx
- useClaimOffer.ts
- build
- Hola Fest — design rules
- useEventEditor.ts
- react-native-worklets@0.13.0
- useOfferEditor.ts
- EventOfferCard.tsx
- EventTaxiBar.tsx
- claimedTokens.ts
- QRTicket.tsx
- eventFormValidation.ts
- VenueMap.tsx
- react-native
- HomeHeader.tsx
- kyivTime.ts
- react-native-web@~0.21.4
- VenuesMapScreenContent.tsx
- useAdminVenueEvents.ts
- useTheme
- eventFormat.ts
- 0008-eas-cloud-builds.md
- mapHtml.ts
- TicketScreenContent.tsx
- staff/index.ts
- shareEvent.ts
- claims.test.ts
- db-backend.md
- reviewer.md
- @tanstack/react-query
- VenueMap.web.test.tsx
- react-native-gesture-handler@~3.3.0

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 115 edges
2. `useTheme()` - 114 edges
3. `t()` - 90 edges
4. `react-native` - 82 edges
5. `Button()` - 50 edges
6. `space` - 48 edges
7. `@testing-library/react-native` - 41 edges
8. `react` - 36 edges
9. `radius` - 32 edges
10. `@tanstack/react-query` - 29 edges

## Surprising Connections (you probably didn't know these)
- `Rules for agents` --references--> `t()`  [INFERRED]
  docs/design/mockups/README.md → src/lib/i18n/index.ts
- `Context` --references--> `readSecret()`  [INFERRED]
  docs/decisions/0009-web-secret-storage-fallback.md → src/lib/secureStorage.ts
- `Code quality` --references--> `claimOffer()`  [INFERRED]
  CLAUDE.md → src/services/claims.ts
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts
- `0005 — Web build is a single-page app` --references--> `resolveStaticPath()`  [INFERRED]
  docs/decisions/0005-web-single-page-app.md → scripts/screenshots/plan.ts

## Import Cycles
- None detected.

## Communities (97 total, 11 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.10
Nodes (20): expo@~58.0.23, expo-device@~58.0.5, expo-font@~58.0.11, expo-system-ui@~58.0.7, @expo/ui@~58.0.27, react-dom@19.3.0, @react-native-async-storage/async-storage@2.2.0, react-native-reanimated@4.7.1 (+12 more)

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
Cohesion: 0.08
Nodes (26): AccentBlobs(), styles, GlassPillButton(), INFO_CHIP_HEIGHT, InfoChipProps, styles, LINEUP_CHIP_HEIGHT, LineupChipProps (+18 more)

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
Cohesion: 0.12
Nodes (20): Deps, FAILURE_REASON, ScanState, useScanRedeem(), onCodeScanned(), ClaimRow, ClaimsErrorCode, isNetworkMessage() (+12 more)

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

### Community 22 - "t"
Cohesion: 0.09
Nodes (35): react-native-safe-area-context, StaffLogin(), styles, Chip(), GlassIconButton(), InfoChip(), LineupChip(), SessionError() (+27 more)

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

### Community 30 - "AppText"
Cohesion: 0.10
Nodes (39): react, StaffEventFormScreen(), StaffOfferFormScreen(), AppText(), Button(), DateTimeField(), formatDateTime(), pad() (+31 more)

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
Cohesion: 0.15
Nodes (10): @testing-library/react-native, EventFormProps, base, EventOffersSectionProps, base, offer, base, draft (+2 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.09
Nodes (27): @supabase/supabase-js, RootLayout(), SessionGate(), createSessionStore(), Deps, Session, SessionState, SessionStore (+19 more)

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

### Community 52 - "useVenues.ts"
Cohesion: 0.44
Nodes (5): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, getPublishedVenues()

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-router@~58.0.30, expo-secure-store@~58.0.2, expo-splash-screen@~58.0.13 (+22 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "services/events.ts"
Cohesion: 0.07
Nodes (35): EventDetailsProps, event, onBack, onOpenVenue, renderScreen(), event, onOpenEvent, onOpenMap (+27 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "services/venues.ts"
Cohesion: 0.11
Nodes (20): onBack, onOpenEvent, renderScreen(), venue, ClientError, getVenueById(), from, Result (+12 more)

### Community 61 - "ui/index.ts"
Cohesion: 0.06
Nodes (57): @expo/vector-icons, FloatingTabBar(), ITEMS, TabsLayout(), ButtonProps, ButtonVariant, styles, ChipProps (+49 more)

### Community 62 - "theme/index.ts"
Cohesion: 0.08
Nodes (46): expo-image, react-native-svg, Tone, CollapsibleSection(), CollapsibleSectionProps, styles, styles, EventCarouselCard() (+38 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (28): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+20 more)

### Community 64 - "offerFormValidation.ts"
Cohesion: 0.18
Nodes (13): OfferFormProps, base, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH, OfferFormErrors, OfferFormValues, OfferSubmission (+5 more)

### Community 65 - "ScannerScreenContent.tsx"
Cohesion: 0.24
Nodes (7): expo-camera, ScannerScreen(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles, requestPermission

### Community 66 - "useClaimOffer.ts"
Cohesion: 0.23
Nodes (12): rememberClaimToken(), ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+4 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "useEventEditor.ts"
Cohesion: 0.19
Nodes (10): EventSubmission, venueEventsQueryKey(), defaultServices, Services, admin, event, start, UseEventEditor (+2 more)

### Community 71 - "useOfferEditor.ts"
Cohesion: 0.17
Nodes (12): defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, useEventOffers(), defaultServices, Services (+4 more)

### Community 72 - "EventOfferCard.tsx"
Cohesion: 0.50
Nodes (4): CTA_BY_STATE, EventOfferCardProps, TranslationKey, EventOffer

### Community 73 - "EventTaxiBar.tsx"
Cohesion: 0.12
Nodes (23): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBar(), TaxiBarProps, destination (+15 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.35
Nodes (8): expo-secure-store, mockRead, mockSave, deleteSecret(), readSecret(), saveSecret(), store, webStorage()

### Community 75 - "QRTicket.tsx"
Cohesion: 0.11
Nodes (23): AppTextProps, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL (+15 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.19
Nodes (14): emptyEventForm, EventFormErrors, EventFormValues, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS, parsePrice(), start, valid (+6 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.17
Nodes (20): encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue, parseFromMap(), venue, ToMapMessage (+12 more)

### Community 81 - "react-native"
Cohesion: 0.15
Nodes (16): react-native, DjAvatar(), DjAvatarProps, DjAvatarSize, djInitials(), styles, DjRow(), DjRowProps (+8 more)

### Community 82 - "HomeHeader.tsx"
Cohesion: 0.36
Nodes (6): formatHomeDate(), HomeHeaderProps, styles, dayTile(), dayKeyParts(), kyivWeekday()

### Community 83 - "kyivTime.ts"
Cohesion: 0.20
Nodes (24): weekDays(), dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), useEventsForDay(), useEventsForWeek() (+16 more)

### Community 85 - "VenuesMapScreenContent.tsx"
Cohesion: 0.16
Nodes (19): filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base, VenueAccent, venueAccent() (+11 more)

### Community 86 - "useAdminVenueEvents.ts"
Cohesion: 0.16
Nodes (12): StaffEventsScreen(), defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+4 more)

### Community 87 - "useTheme"
Cohesion: 0.15
Nodes (17): expo-router, EventScreen(), EventsScreen(), MapScreen(), TicketsScreen(), TicketScreen(), VenueScreen(), mockNavigate (+9 more)

### Community 88 - "eventFormat.ts"
Cohesion: 0.13
Nodes (33): DayStrip(), DayStripDay, FilterChips(), HomeHeader(), SectionHeader(), carouselCardProps(), CurfewInfo, curfewInfo() (+25 more)

### Community 90 - "mapHtml.ts"
Cohesion: 0.22
Nodes (12): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+4 more)

### Community 91 - "TicketScreenContent.tsx"
Cohesion: 0.17
Nodes (17): expo-brightness@~58.0.2, expo-brightness, detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow() (+9 more)

### Community 92 - "staff/index.ts"
Cohesion: 0.18
Nodes (12): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+4 more)

### Community 94 - "shareEvent.ts"
Cohesion: 0.53
Nodes (4): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent()

### Community 95 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 101 - "@tanstack/react-query"
Cohesion: 0.21
Nodes (10): @tanstack/react-query, getClaimToken(), tokenKey(), claimKeys, claim, mockClaims, mockToken, useClaimToken() (+2 more)

### Community 103 - "VenueMap.web.test.tsx"
Cohesion: 0.33
Nodes (4): Listener, listeners, mount(), venue

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 804 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `t`, `AppText`, `dependencies`, `services/events.ts`, `ui/index.ts`, `theme/index.ts`, `ScannerScreenContent.tsx`, `EventTaxiBar.tsx`, `claimedTokens.ts`, `QRTicket.tsx`, `VenueMap.tsx`, `HomeHeader.tsx`, `VenuesMapScreenContent.tsx`, `useTheme`, `eventFormat.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `shareEvent.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `ScannerScreenContent.tsx`, `useClaimOffer.ts`, `Hola Fest — design rules`, `react-dom@19.3.0`, `@tanstack/react-query`, `EventOfferCard.tsx`, `EventTaxiBar.tsx`, `services/venues.ts`, `HomeHeader.tsx`, `VenuesMapScreenContent.tsx`, `useTheme`, `eventFormat.ts`, `services/events.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `ui/index.ts`, `AppText`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `useTheme()` connect `useTheme` to `ScannerScreenContent.tsx`, `react-dom@19.3.0`, `supabase.ts`, `QRTicket.tsx`, `VenueMap.tsx`, `react-native`, `HomeHeader.tsx`, `VenuesMapScreenContent.tsx`, `t`, `AppText`, `eventFormat.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `ui/index.ts`, `theme/index.ts`, `ui-ux.md`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._