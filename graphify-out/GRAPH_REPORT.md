# Graph Report - hola-fest  (2026-11-07)

## Corpus Check
- 278 files · ~86,882 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1697 nodes · 3829 edges · 102 communities (88 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 80 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ab51302b`
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
- services/claims.ts
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
- EventForm.tsx
- staff/index.ts
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
- ui/index.ts
- edge-functions
- on
- package.json
- Accessibility (WCAG 2.2)
- with
- services/events.ts
- Quick Reference
- VenuesMapScreenContent.tsx
- react-native
- EventCarouselCard.tsx
- services/admin.ts
- offerFormValidation.ts
- QRTicket.tsx
- @tanstack/react-query
- build
- Hola Fest — design rules
- useEventEditor.ts
- AppText
- useOfferEditor.ts
- expo-splash-screen
- react-native-web@~0.21.4
- claimedTokens.ts
- theme/index.ts
- eventFormValidation.ts
- i18n/index.ts
- HomeHeader.tsx
- useEvents.ts
- Button
- kit.test.tsx
- EventDetails.tsx
- GlassSurface
- claims.test.ts
- radius
- useMyClaims.ts
- t
- EventsScreenContent.tsx
- 0008-eas-cloud-builds.md
- EventFormArea.tsx
- TicketScreenContent.tsx
- StaffHome.tsx
- OfferFormArea.tsx
- EventOffersSection.test.tsx
- @testing-library/react-native
- OfferRow.tsx
- expo-system-ui@~58.0.7
- expo-linking
- react-native-gesture-handler@~3.3.0
- react-native-reanimated@4.7.1
- react-native-worklets@0.13.0

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 100 edges
2. `useTheme()` - 95 edges
3. `t()` - 85 edges
4. `react-native` - 71 edges
5. `Button()` - 48 edges
6. `space` - 44 edges
7. `@testing-library/react-native` - 37 edges
8. `react` - 33 edges
9. `GlassSurface()` - 31 edges
10. `@tanstack/react-query` - 29 edges

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

## Communities (102 total, 14 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, expo-brightness@~58.0.2, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-router@~58.0.30, expo-secure-store@~58.0.2 (+20 more)

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
Nodes (34): @supabase/supabase-js, useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, env, AuthError, AuthErrorCode (+26 more)

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

### Community 12 - "services/claims.ts"
Cohesion: 0.16
Nodes (17): Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+9 more)

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
Cohesion: 0.14
Nodes (16): VenueScreen(), styles, TaxiBar(), destination, openMock, Chip(), Message(), styles (+8 more)

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
Cohesion: 0.18
Nodes (27): DayStripDay, CurfewInfo, eventCardProps(), formatEventDay(), formatEventTime(), formatEventWhen(), offerCondition(), event (+19 more)

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

### Community 36 - "EventForm.tsx"
Cohesion: 0.23
Nodes (16): Admin form fields, DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField() (+8 more)

### Community 37 - "staff/index.ts"
Cohesion: 0.06
Nodes (36): expo-router, RootLayout(), SessionGate(), ScannerScreen(), StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), StaffScreen() (+28 more)

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

### Community 52 - "ui/index.ts"
Cohesion: 0.11
Nodes (28): Tab bar, react-native-svg, FloatingTabBar(), ITEMS, TabsLayout(), ChipProps, styles, DAY_PILL_HEIGHT (+20 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.10
Nodes (20): expo@~58.0.23, expo-build-properties@~58.0.12, expo-device@~58.0.5, expo-font@~58.0.11, expo-symbols@~58.0.4, @expo/ui@~58.0.27, expo-web-browser@~58.0.7, @react-native-async-storage/async-storage@2.2.0 (+12 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "services/events.ts"
Cohesion: 0.11
Nodes (24): event, onBack, onOpenVenue, renderScreen(), ClientError, EventDetailsRow, EventsError, EventsErrorCode (+16 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenuesMapScreenContent.tsx"
Cohesion: 0.06
Nodes (51): 0007 — Taxi deep links, Consequences, Context, Decision, MapScreen(), TaxiBarProps, EventTaxiBarProps, PLACEHOLDER_PROVIDERS (+43 more)

### Community 61 - "react-native"
Cohesion: 0.10
Nodes (24): react-native, AppTextProps, Tone, ButtonProps, ButtonVariant, styles, EventCardProps, EventCoverColor (+16 more)

### Community 62 - "EventCarouselCard.tsx"
Cohesion: 0.22
Nodes (14): EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStarCover(), HolaStarCoverProps, HolaStarProps (+6 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (26): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+18 more)

### Community 64 - "offerFormValidation.ts"
Cohesion: 0.18
Nodes (13): OfferFormProps, base, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH, OfferFormErrors, OfferFormValues, OfferSubmission (+5 more)

### Community 65 - "QRTicket.tsx"
Cohesion: 0.17
Nodes (13): QR ticket, QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket() (+5 more)

### Community 66 - "@tanstack/react-query"
Cohesion: 0.23
Nodes (12): @tanstack/react-query, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+4 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.12
Nodes (14): Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence (+6 more)

### Community 69 - "useEventEditor.ts"
Cohesion: 0.13
Nodes (16): EventSubmission, defaultServices, Services, useAdminVenueEvents(), venueEventsQueryKey(), defaultServices, Services, admin (+8 more)

### Community 70 - "AppText"
Cohesion: 0.29
Nodes (11): EventScreen(), StaffLogin(), styles, TicketsScreen(), AppText(), StaffLoginForm(), EventScreenContent(), Message() (+3 more)

### Community 71 - "useOfferEditor.ts"
Cohesion: 0.16
Nodes (12): defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, defaultServices, Services, offer (+4 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.31
Nodes (10): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret(), readSecret() (+2 more)

### Community 75 - "theme/index.ts"
Cohesion: 0.27
Nodes (11): contrastRatio(), parseHex(), relativeLuminance(), brand, ColorScheme, glassOnCover, Palette, palettes (+3 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.16
Nodes (16): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS, parsePrice() (+8 more)

### Community 77 - "i18n/index.ts"
Cohesion: 0.22
Nodes (7): react-native-safe-area-context, SessionError(), SessionErrorProps, styles, EventScreenContentProps, styles, uk

### Community 78 - "HomeHeader.tsx"
Cohesion: 0.19
Nodes (9): formatHomeDate(), HomeHeader(), HomeHeaderProps, styles, CTA_BY_STATE, EventOfferCardProps, TranslationKey, EventOffer (+1 more)

### Community 79 - "useEvents.ts"
Cohesion: 0.32
Nodes (10): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+2 more)

### Community 80 - "Button"
Cohesion: 0.20
Nodes (11): expo-camera, Button(), ScanResult(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles (+3 more)

### Community 81 - "kit.test.tsx"
Cohesion: 0.10
Nodes (25): Event, QR and map kit, AccentBlobs(), styles, HolaStar(), INFO_CHIP_HEIGHT, InfoChip(), InfoChipProps, styles (+17 more)

### Community 82 - "EventDetails.tsx"
Cohesion: 0.24
Nodes (12): TAXI_BAR_HEIGHT, coverImageUri(), EventDetails(), EventDetailsProps, styles, curfewInfo(), formatPriceFrom(), EventOfferCard() (+4 more)

### Community 83 - "GlassSurface"
Cohesion: 0.13
Nodes (17): Map pin and venue preview card, @expo/vector-icons, FEATHER_NAME, GlassIconButton(), GlassIconButtonProps, GlassIconName, styles, GlassSearchField() (+9 more)

### Community 84 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 85 - "radius"
Cohesion: 0.21
Nodes (10): GlassPillButton(), GlassPillButtonProps, styles, MapVenueCardProps, styles, styles, TaxiBar(), TaxiBarProps (+2 more)

### Community 86 - "useMyClaims.ts"
Cohesion: 0.36
Nodes (5): claimKeys, useClaimToken(), useMyClaims(), getMyClaims(), toMyClaim()

### Community 87 - "t"
Cohesion: 0.16
Nodes (17): EventCard(), tabBarInset(), EventsList(), EventsListProps, LoadingSkeleton(), Message(), styles, EventRow() (+9 more)

### Community 88 - "EventsScreenContent.tsx"
Cohesion: 0.23
Nodes (9): EventsScreen(), dayFromId(), EventsScreenContent(), EventsScreenContentProps, styles, event, onOpenEvent, onTitleLongPress (+1 more)

### Community 90 - "EventFormArea.tsx"
Cohesion: 0.29
Nodes (9): EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), EventOffersSection(), OfferItem(), styles (+1 more)

### Community 91 - "TicketScreenContent.tsx"
Cohesion: 0.19
Nodes (15): TicketScreen(), MyTicketsContentProps, styles, detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps (+7 more)

### Community 92 - "StaffHome.tsx"
Cohesion: 0.47
Nodes (4): StaffHome(), StaffHomeProps, styles, base

### Community 93 - "OfferFormArea.tsx"
Cohesion: 0.50
Nodes (4): OfferFormArea(), OfferFormAreaProps, styles, offerToFormValues()

### Community 94 - "EventOffersSection.test.tsx"
Cohesion: 0.50
Nodes (3): EventOffersSectionProps, base, offer

### Community 95 - "@testing-library/react-native"
Cohesion: 0.14
Nodes (12): expo-brightness, react, @testing-library/react-native, claim, mockClaims, mockToken, getBrightness, setBrightness (+4 more)

### Community 96 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 758 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `package.json`, `VenueScreenContent.tsx`, `EventForm.tsx`, `staff/index.ts`, `ui/index.ts`, `package.json`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `EventCarouselCard.tsx`, `QRTicket.tsx`, `AppText`, `theme/index.ts`, `i18n/index.ts`, `HomeHeader.tsx`, `Button`, `kit.test.tsx`, `EventDetails.tsx`, `GlassSurface`, `radius`, `t`, `EventsScreenContent.tsx`, `EventFormArea.tsx`, `TicketScreenContent.tsx`, `StaffHome.tsx`, `OfferFormArea.tsx`, `OfferRow.tsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `devDependencies`, `supabase.ts`, `VenueScreenContent.tsx`, `EventForm.tsx`, `staff/index.ts`, `ui/index.ts`, `package.json`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `react-native`, `offerFormValidation.ts`, `QRTicket.tsx`, `@tanstack/react-query`, `useEventEditor.ts`, `useOfferEditor.ts`, `eventFormValidation.ts`, `i18n/index.ts`, `useEvents.ts`, `Button`, `kit.test.tsx`, `useMyClaims.ts`, `t`, `EventsScreenContent.tsx`, `StaffHome.tsx`, `EventOffersSection.test.tsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `react` connect `@testing-library/react-native` to `package.json`, `supabase.ts`, `services/claims.ts`, `VenueScreenContent.tsx`, `EventForm.tsx`, `staff/index.ts`, `ui/index.ts`, `package.json`, `VenuesMapScreenContent.tsx`, `react-native`, `QRTicket.tsx`, `@tanstack/react-query`, `useEventEditor.ts`, `useOfferEditor.ts`, `useEvents.ts`, `useMyClaims.ts`, `t`, `EventsScreenContent.tsx`, `TicketScreenContent.tsx`, `OfferRow.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._