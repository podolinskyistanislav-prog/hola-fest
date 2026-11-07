# Graph Report - hola-fest  (2026-11-07)

## Corpus Check
- 278 files · ~86,549 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1697 nodes · 3828 edges · 101 communities (86 shown, 15 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 80 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f3db8ffc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- devDependencies
- expo
- Hola Fest — Architecture
- compilerOptions
- VenueScreenContent.tsx
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
- Hola Fest — design rules
- _layout.tsx
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- kyivTime.ts
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- shareEvent.ts
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
- GlassSurface
- edge-functions
- on
- package.json
- Accessibility (WCAG 2.2)
- with
- services/events.ts
- Quick Reference
- VenuesMapScreenContent.tsx
- react-native
- radius
- services/admin.ts
- offerFormValidation.ts
- space
- VenueMap.tsx
- build
- Hola Fest — design rules
- useAdminVenueEvents.ts
- types/admin.ts
- @tanstack/react-query
- expo-splash-screen
- react-native-web@~0.21.4
- expo-status-bar
- theme/index.ts
- EventFormArea.tsx
- t
- auth.ts
- useEvents.ts
- AppText
- kit.test.tsx
- EventDetails.tsx
- ui/index.ts
- useStaffAccess.ts
- ui/TaxiBar.tsx
- @testing-library/react-native
- VenueEventsList.tsx
- EventsScreenContent.tsx
- 0008-eas-cloud-builds.md
- EventOffersSection.tsx
- TicketScreenContent.tsx
- 0007 — Taxi deep links
- app/_layout.tsx
- events.test.ts
- useMaxBrightness.test.tsx
- OfferRow.tsx
- expo@~58.0.23
- expo-linking
- react-native-maps
- react-native-screens@~4.30.1

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 100 edges
2. `useTheme()` - 95 edges
3. `t()` - 87 edges
4. `react-native` - 71 edges
5. `Button()` - 50 edges
6. `space` - 45 edges
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

## Communities (101 total, 15 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-router@~58.0.30, expo-secure-store@~58.0.2 (+20 more)

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

### Community 5 - "VenueScreenContent.tsx"
Cohesion: 0.09
Nodes (30): VenueScreen(), useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, Message(), styles, onBack (+22 more)

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
Cohesion: 0.05
Nodes (51): expo-secure-store, Deps, FAILURE_REASON, ScanState, getClaimToken(), rememberClaimToken(), mockRead, mockSave (+43 more)

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

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.16
Nodes (20): react, styles, TaxiBar(), TaxiBarProps, destination, openMock, TaxiBar(), EventTaxiBar() (+12 more)

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

### Community 30 - "kyivTime.ts"
Cohesion: 0.17
Nodes (24): DateTimeFieldProps, formatDateTime(), pad(), formatHomeDate(), TextFieldProps, weekDays(), addKyivDays(), CURFEW_KYIV_HOUR (+16 more)

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

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.12
Nodes (23): expo-router, ScannerScreen(), StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), StaffScreen(), useSession(), EventFormArea() (+15 more)

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

### Community 52 - "GlassSurface"
Cohesion: 0.09
Nodes (27): Map pin and venue preview card, Tab bar, FloatingTabBar(), ITEMS, TabsLayout(), DAY_PILL_HEIGHT, DayStrip(), DayStripDay (+19 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.10
Nodes (20): expo-build-properties@~58.0.12, expo-device@~58.0.5, expo-symbols@~58.0.4, @expo/ui@~58.0.27, expo-web-browser@~58.0.7, react-dom@19.3.0, react-native-reanimated@4.7.1, toqr@^0.1.1 (+12 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "services/events.ts"
Cohesion: 0.12
Nodes (20): EventDetailsProps, EventOfferCardProps, event, onBack, onOpenVenue, renderScreen(), ClientError, EventDetailsRow (+12 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenuesMapScreenContent.tsx"
Cohesion: 0.17
Nodes (18): filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, KYIV_REGION, mappableVenues(), resolveSelectedVenueId(), base, Message() (+10 more)

### Community 61 - "react-native"
Cohesion: 0.13
Nodes (18): react-native, AppTextProps, Tone, ButtonProps, ButtonVariant, styles, FAILURE_MESSAGE, ScanFailureReason (+10 more)

### Community 62 - "radius"
Cohesion: 0.14
Nodes (22): EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStar(), HolaStarCover(), HolaStarCoverProps (+14 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.12
Nodes (29): defaultServices, Services, AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns() (+21 more)

### Community 64 - "offerFormValidation.ts"
Cohesion: 0.23
Nodes (11): emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH, OfferFormErrors, OfferFormValues, OfferSubmission, parsePositive(), valid (+3 more)

### Community 65 - "space"
Cohesion: 0.19
Nodes (12): QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus (+4 more)

### Community 66 - "VenueMap.tsx"
Cohesion: 0.20
Nodes (14): EventsListProps, darkMapStyle(), StyleRule, MappableVenue, styles, VenueAccent, venueAccent(), VenueMap() (+6 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.12
Nodes (15): Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence (+7 more)

### Community 69 - "useAdminVenueEvents.ts"
Cohesion: 0.15
Nodes (12): defaultServices, Services, admin, host, item, useAdminVenueEvents(), venueEventsQueryKey(), UseEventEditor (+4 more)

### Community 70 - "types/admin.ts"
Cohesion: 0.20
Nodes (6): admin, event, start, AdminEvent, EventInput, EventStatus

### Community 71 - "@tanstack/react-query"
Cohesion: 0.17
Nodes (14): @tanstack/react-query, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, useEventOffers(), defaultServices (+6 more)

### Community 75 - "theme/index.ts"
Cohesion: 0.23
Nodes (12): styles, contrastRatio(), parseHex(), relativeLuminance(), brand, ColorScheme, glassOnCover, Palette (+4 more)

### Community 76 - "EventFormArea.tsx"
Cohesion: 0.11
Nodes (31): Admin form fields, react-native-safe-area-context, DateTimeField(), parseDateTime(), Harness(), StringListField(), SwitchField(), TextField() (+23 more)

### Community 77 - "t"
Cohesion: 0.18
Nodes (13): StaffLogin(), styles, SessionError(), SessionErrorProps, styles, StaffLoginForm(), StaffLoginFormProps, styles (+5 more)

### Community 78 - "auth.ts"
Cohesion: 0.10
Nodes (24): @supabase/supabase-js, createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest (+16 more)

### Community 79 - "useEvents.ts"
Cohesion: 0.27
Nodes (13): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+5 more)

### Community 80 - "AppText"
Cohesion: 0.11
Nodes (31): expo-camera, EventScreen(), TicketsScreen(), AppText(), Button(), Chip(), EventCard(), ScanResult() (+23 more)

### Community 81 - "kit.test.tsx"
Cohesion: 0.12
Nodes (16): GlassSearchField(), GlassSearchFieldProps, SEARCH_FIELD_HEIGHT, styles, INFO_CHIP_HEIGHT, InfoChipProps, styles, LINEUP_CHIP_HEIGHT (+8 more)

### Community 82 - "EventDetails.tsx"
Cohesion: 0.20
Nodes (20): InfoChip(), LineupChip(), OfferCard(), coverImageUri(), EventDetails(), styles, CurfewInfo, curfewInfo() (+12 more)

### Community 83 - "ui/index.ts"
Cohesion: 0.10
Nodes (22): react-native-svg, ChipProps, styles, EventCardProps, EventCoverColor, styles, FilterChipItem, FilterChips() (+14 more)

### Community 84 - "useStaffAccess.ts"
Cohesion: 0.36
Nodes (4): getStaffAccess(), UseStaffAccess, useStaffAccess(), AdminVenue

### Community 85 - "ui/TaxiBar.tsx"
Cohesion: 0.25
Nodes (6): GlassPillButtonProps, styles, styles, TAXI_BAR_HEIGHT, TaxiBarProps, TaxiProvider

### Community 86 - "@testing-library/react-native"
Cohesion: 0.24
Nodes (6): @testing-library/react-native, EventsScreen(), styles, MapScreen(), mockNavigate, mockPush

### Community 87 - "VenueEventsList.tsx"
Cohesion: 0.22
Nodes (7): EventRowProps, Skeleton(), styles, base, draft, published, VenueEventsListProps

### Community 88 - "EventsScreenContent.tsx"
Cohesion: 0.28
Nodes (7): EventsScreenContent(), EventsScreenContentProps, styles, event, onOpenEvent, onTitleLongPress, renderScreen()

### Community 90 - "EventOffersSection.tsx"
Cohesion: 0.31
Nodes (7): EventOffers(), EventOffersSection(), EventOffersSectionProps, OfferItem(), styles, base, offer

### Community 91 - "TicketScreenContent.tsx"
Cohesion: 0.16
Nodes (20): Event, QR and map kit, TicketScreen(), AccentBlobs(), GlassIconButton(), GlassPillButton(), MapPin(), MapVenueCard(), QRCard() (+12 more)

### Community 92 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 93 - "app/_layout.tsx"
Cohesion: 0.46
Nodes (4): RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 94 - "events.test.ts"
Cohesion: 0.25
Nodes (5): EventsError, eventRow, from, Result, venueRow

### Community 95 - "useMaxBrightness.test.tsx"
Cohesion: 0.38
Nodes (5): expo-brightness@~58.0.2, expo-brightness, getBrightness, setBrightness, useMaxBrightness()

### Community 96 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 759 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `devDependencies`, `VenueScreenContent.tsx`, `services/claims.ts`, `Hola Fest — design rules`, `react-dom@19.3.0`, `GlassSurface`, `package.json`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `react-native`, `space`, `useAdminVenueEvents.ts`, `types/admin.ts`, `@tanstack/react-query`, `EventFormArea.tsx`, `t`, `auth.ts`, `useEvents.ts`, `AppText`, `kit.test.tsx`, `useStaffAccess.ts`, `VenueEventsList.tsx`, `EventsScreenContent.tsx`, `EventOffersSection.tsx`, `app/_layout.tsx`, `useMaxBrightness.test.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `package.json`, `VenueScreenContent.tsx`, `Hola Fest — design rules`, `shareEvent.ts`, `react-dom@19.3.0`, `GlassSurface`, `package.json`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `radius`, `space`, `VenueMap.tsx`, `theme/index.ts`, `EventFormArea.tsx`, `t`, `AppText`, `kit.test.tsx`, `EventDetails.tsx`, `ui/index.ts`, `ui/TaxiBar.tsx`, `@testing-library/react-native`, `VenueEventsList.tsx`, `EventsScreenContent.tsx`, `EventOffersSection.tsx`, `TicketScreenContent.tsx`, `OfferRow.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `VenueScreenContent.tsx`, `services/claims.ts`, `Hola Fest — design rules`, `kyivTime.ts`, `react-dom@19.3.0`, `GlassSurface`, `services/events.ts`, `VenuesMapScreenContent.tsx`, `VenueMap.tsx`, `Hola Fest — design rules`, `EventFormArea.tsx`, `AppText`, `EventDetails.tsx`, `ui/index.ts`, `@testing-library/react-native`, `VenueEventsList.tsx`, `EventsScreenContent.tsx`, `EventOffersSection.tsx`, `TicketScreenContent.tsx`, `app/_layout.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._