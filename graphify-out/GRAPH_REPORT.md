# Graph Report - hola-fest  (2026-11-23)

## Corpus Check
- 283 files · ~90,922 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1735 nodes · 3932 edges · 97 communities (82 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `78fcb874`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- devDependencies
- expo
- Hola Fest — Architecture
- compilerOptions
- kit.test.tsx
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
- t
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
- Button
- StaffLoginForm.tsx
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
- AppText
- edge-functions
- on
- dependencies
- Accessibility (WCAG 2.2)
- with
- services/events.ts
- Quick Reference
- VenuesMapScreenContent.tsx
- ui/index.ts
- EventCarouselCard.tsx
- services/admin.ts
- OfferForm.tsx
- ScannerScreenContent.tsx
- ClaimOfferButton.tsx
- build
- Hola Fest — design rules
- @tanstack/react-query
- QRTicket.tsx
- EventFormArea.tsx
- EventScreenContent.tsx
- EventTaxiBar.tsx
- claimedTokens.ts
- theme/index.ts
- @testing-library/react-native
- expo@~58.0.23
- expo-build-properties@~58.0.12
- @expo/ui@~58.0.27
- radius
- react-native
- expo-web-browser@~58.0.7
- react-native-maps
- react-native-web@~0.21.4
- TicketScreens.test.tsx
- eventFormat.ts
- 0008-eas-cloud-builds.md
- TicketScreenContent.tsx
- staff/index.ts
- EventDetails.tsx
- db-backend.md
- reviewer.md
- expo-splash-screen
- 0007 — Taxi deep links
- useClaimOffer.ts
- useTheme

## God Nodes (most connected - your core abstractions)
1. `useTheme()` - 102 edges
2. `AppText()` - 100 edges
3. `t()` - 91 edges
4. `react-native` - 73 edges
5. `Button()` - 50 edges
6. `space` - 44 edges
7. `@testing-library/react-native` - 38 edges
8. `react` - 32 edges
9. `@tanstack/react-query` - 29 edges
10. `EventsScreenContent()` - 27 edges

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

## Communities (97 total, 15 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.11
Nodes (18): expo-constants@~58.0.15, expo-font@~58.0.11, expo-status-bar@~58.0.4, expo-symbols@~58.0.4, expo-system-ui@~58.0.7, react-dom@19.3.0, react-native-worklets@0.13.0, main (+10 more)

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

### Community 5 - "kit.test.tsx"
Cohesion: 0.12
Nodes (16): AccentBlobs(), styles, INFO_CHIP_HEIGHT, InfoChip(), InfoChipProps, styles, LINEUP_CHIP_HEIGHT, LineupChip() (+8 more)

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
Cohesion: 0.11
Nodes (18): requestPermission, ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+10 more)

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
Cohesion: 0.25
Nodes (8): StaffLogin(), styles, SessionError(), SessionErrorProps, styles, FILTER_CHIPS, t(), uk

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
Cohesion: 0.22
Nodes (9): react, DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), TextFieldProps (+1 more)

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

### Community 36 - "Button"
Cohesion: 0.15
Nodes (20): react-native-safe-area-context, TaxiBar(), Button(), EventCard(), formatEventDay(), EventRow(), EventRowProps, Skeleton() (+12 more)

### Community 37 - "StaffLoginForm.tsx"
Cohesion: 0.06
Nodes (39): @supabase/supabase-js, RootLayout(), SessionGate(), StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), createSessionStore(), Deps (+31 more)

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

### Community 52 - "AppText"
Cohesion: 0.15
Nodes (22): react-native-svg, AppText(), Chip(), DayStrip(), EventCarouselCard(), FilterChips(), mockedScheme, HomeHeader() (+14 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, expo-device@~58.0.5, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-linking@~58.0.16, expo-router@~58.0.30, @expo/vector-icons@^15.0.2, react@19.3.0 (+19 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "services/events.ts"
Cohesion: 0.07
Nodes (57): formatHomeDate(), dayTile(), homeDays(), weekDays(), dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS (+49 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenuesMapScreenContent.tsx"
Cohesion: 0.05
Nodes (62): MapPin(), darkMapStyle(), StyleRule, useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, filterVenuesByName() (+54 more)

### Community 61 - "ui/index.ts"
Cohesion: 0.11
Nodes (24): ChipProps, styles, DAY_PILL_HEIGHT, DayStripDay, DayStripProps, styles, FilterChipItem, FilterChipsProps (+16 more)

### Community 62 - "EventCarouselCard.tsx"
Cohesion: 0.16
Nodes (17): EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStar(), HolaStarCover(), HolaStarCoverProps, HolaStarProps (+9 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (28): defaultServices, Services, AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns() (+20 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.15
Nodes (22): DateTimeField(), TextField(), OfferForm(), OfferFormProps, styles, base, OfferFormArea(), OfferFormAreaProps (+14 more)

### Community 65 - "ScannerScreenContent.tsx"
Cohesion: 0.20
Nodes (10): expo-camera@~58.0.14, expo-camera, ScannerScreen(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles (+2 more)

### Community 66 - "ClaimOfferButton.tsx"
Cohesion: 0.23
Nodes (10): ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, mockClaim, setup() (+2 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.10
Nodes (19): Admin form fields, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen, Hola Fest — design rules (+11 more)

### Community 69 - "@tanstack/react-query"
Cohesion: 0.10
Nodes (24): @tanstack/react-query, EventSubmission, defaultServices, Services, admin, host, item, UseAdminVenueEvents (+16 more)

### Community 70 - "QRTicket.tsx"
Cohesion: 0.25
Nodes (9): DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles (+1 more)

### Community 71 - "EventFormArea.tsx"
Cohesion: 0.11
Nodes (21): SwitchField(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), EventOffersSection(), EventOffersSectionProps (+13 more)

### Community 72 - "EventScreenContent.tsx"
Cohesion: 0.28
Nodes (7): EventScreenContent(), EventScreenContentProps, styles, event, onBack, onOpenVenue, renderScreen()

### Community 73 - "EventTaxiBar.tsx"
Cohesion: 0.17
Nodes (17): styles, TaxiBarProps, destination, openMock, EventTaxiBar(), EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles (+9 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.22
Nodes (13): expo-secure-store@~58.0.2, expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), useClaimToken() (+5 more)

### Community 75 - "theme/index.ts"
Cohesion: 0.21
Nodes (14): QRCardProps, styles, contrastRatio(), parseHex(), relativeLuminance(), brand, ColorScheme, fontFamily (+6 more)

### Community 76 - "@testing-library/react-native"
Cohesion: 0.16
Nodes (18): @testing-library/react-native, EventForm(), EventFormProps, styles, base, emptyEventForm, EventFormErrors, EventFormValues (+10 more)

### Community 80 - "radius"
Cohesion: 0.09
Nodes (27): @expo/vector-icons, FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles, GlassPillButton(), GlassPillButtonProps, styles (+19 more)

### Community 81 - "react-native"
Cohesion: 0.10
Nodes (25): react-native, AppTextProps, Tone, ButtonProps, ButtonVariant, styles, EventCardProps, EventCoverColor (+17 more)

### Community 87 - "TicketScreens.test.tsx"
Cohesion: 0.20
Nodes (7): expo-brightness@~58.0.2, expo-brightness, claim, mockClaims, mockToken, getBrightness, setBrightness

### Community 88 - "eventFormat.ts"
Cohesion: 0.19
Nodes (19): carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId(), eventsOnDay(), filterEvents(), formatDayHeading(), formatEventsCount() (+11 more)

### Community 91 - "TicketScreenContent.tsx"
Cohesion: 0.16
Nodes (19): Message(), MyTicketsContent(), MyTicketsContentProps, styles, TicketRow(), detailsText(), pillText(), styles (+11 more)

### Community 92 - "staff/index.ts"
Cohesion: 0.19
Nodes (12): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+4 more)

### Community 94 - "EventDetails.tsx"
Cohesion: 0.21
Nodes (12): coverImageUri(), EventDetails(), EventDetailsProps, styles, CTA_BY_STATE, EventOfferCard(), EventOfferCardProps, eventLink() (+4 more)

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 100 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 102 - "useClaimOffer.ts"
Cohesion: 0.22
Nodes (9): Deps, FAILURE_REASON, ScanState, claimKeys, FAILURE_STATE, ClaimFailureReason, ClaimOfferResult, RedeemClaimResult (+1 more)

### Community 104 - "useTheme"
Cohesion: 0.16
Nodes (17): expo-router, EventScreen(), EventsScreen(), FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), TicketsScreen() (+9 more)

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 782 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `package.json`, `kit.test.tsx`, `t`, `Button`, `StaffLoginForm.tsx`, `AppText`, `dependencies`, `VenuesMapScreenContent.tsx`, `ui/index.ts`, `EventCarouselCard.tsx`, `OfferForm.tsx`, `ScannerScreenContent.tsx`, `QRTicket.tsx`, `EventFormArea.tsx`, `EventScreenContent.tsx`, `EventTaxiBar.tsx`, `claimedTokens.ts`, `theme/index.ts`, `@testing-library/react-native`, `radius`, `TicketScreenContent.tsx`, `staff/index.ts`, `EventDetails.tsx`, `useTheme`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `package.json`, `devDependencies`, `kit.test.tsx`, `services/claims.ts`, `t`, `fonts.ts`, `Button`, `StaffLoginForm.tsx`, `AppText`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `ui/index.ts`, `OfferForm.tsx`, `ScannerScreenContent.tsx`, `ClaimOfferButton.tsx`, `@tanstack/react-query`, `QRTicket.tsx`, `EventFormArea.tsx`, `EventScreenContent.tsx`, `EventTaxiBar.tsx`, `claimedTokens.ts`, `react-native`, `TicketScreens.test.tsx`, `staff/index.ts`, `useTheme`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `claimOffer()` connect `ClaimOfferButton.tsx` to `services/claims.ts`, `useClaimOffer.ts`, `Hola Fest — Product`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._