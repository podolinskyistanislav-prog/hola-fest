# Graph Report - hola-fest  (2026-11-23)

## Corpus Check
- 302 files · ~95,651 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1810 nodes · 4196 edges · 101 communities (90 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `82683a57`
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
- OfferForm.tsx
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- VenueEventsList.tsx
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
- radius
- edge-functions
- on
- dependencies
- Accessibility (WCAG 2.2)
- with
- services/events.ts
- Quick Reference
- VenueScreenContent.tsx
- ui/index.ts
- space
- services/admin.ts
- OfferFormArea.tsx
- react-native
- i18n/index.ts
- build
- Hola Fest — design rules
- useEventEditor.ts
- useTheme
- @tanstack/react-query
- EventsScreenContent.test.tsx
- components/TaxiBar.tsx
- claimedTokens.ts
- theme/index.ts
- EventForm.tsx
- VenuesMapScreenContent.tsx
- useEvents.ts
- ScannerScreenContent.tsx
- TicketScreenContent.tsx
- AppText
- GlassSurface
- kyivTime.ts
- Button
- @testing-library/react-native
- staff/index.ts
- MyTicketsContent.tsx
- EventsScreenContent.tsx
- 0008-eas-cloud-builds.md
- QRTicket.tsx
- TicketScreens.test.tsx
- EventScreenContent.test.tsx
- react-native-screens@~4.30.1
- shareEvent.ts
- claims.test.ts
- tabsShell.test.tsx
- db-backend.md
- reviewer.md
- expo-constants@~58.0.15
- react-native-webview

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 115 edges
2. `useTheme()` - 114 edges
3. `t()` - 91 edges
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

## Communities (101 total, 11 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.10
Nodes (20): expo@~58.0.23, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, @expo/ui@~58.0.27, expo-web-browser@~58.0.7, react-native-web@~0.21.4, react-native-worklets@0.13.0 (+12 more)

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
Nodes (33): AccentBlobs(), styles, GlassPillButton(), GlassPillButtonProps, styles, HolaStar(), INFO_CHIP_HEIGHT, InfoChipProps (+25 more)

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
Cohesion: 0.13
Nodes (22): Deps, FAILURE_REASON, ScanState, FAILURE_STATE, mockClaim, setup(), useClaimOffer(), claimOffer() (+14 more)

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
Cohesion: 0.23
Nodes (11): react, StaffLogin(), styles, StaffLoginForm(), StaffLoginFormProps, styles, Deps, UseStaffLogin (+3 more)

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

### Community 30 - "OfferForm.tsx"
Cohesion: 0.22
Nodes (14): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), TextField() (+6 more)

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

### Community 36 - "VenueEventsList.tsx"
Cohesion: 0.21
Nodes (9): EventRowProps, Skeleton(), styles, base, draft, published, VenueEventsList(), VenueEventsListProps (+1 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.10
Nodes (24): @supabase/supabase-js, createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest (+16 more)

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

### Community 52 - "radius"
Cohesion: 0.16
Nodes (21): expo-image, react-native-svg, EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStarCover() (+13 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (28): dependencies, expo-image@~58.0.18, expo-secure-store@~58.0.2, expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, expo-symbols@~58.0.4, expo-system-ui@~58.0.7, @expo/vector-icons@^15.0.2 (+20 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "services/events.ts"
Cohesion: 0.12
Nodes (16): ClientError, EventDetailsRow, EventsError, EventsErrorCode, EventsFilter, EventSummaryRow, OfferRow, eventRow (+8 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenueScreenContent.tsx"
Cohesion: 0.09
Nodes (31): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, formatEventWhen(), Message(), styles, onBack (+23 more)

### Community 61 - "ui/index.ts"
Cohesion: 0.09
Nodes (31): Chip(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps, styles (+23 more)

### Community 62 - "space"
Cohesion: 0.12
Nodes (15): CollapsibleSection(), CollapsibleSectionProps, styles, LoyaltyStampCard(), LoyaltyStampCardProps, styles, PHOTO_TILE_HEIGHT, PHOTO_TILE_WIDTH (+7 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (26): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+18 more)

### Community 64 - "OfferFormArea.tsx"
Cohesion: 0.14
Nodes (17): OfferFormAreaProps, styles, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH, OfferFormErrors, OfferFormValues, offerToFormValues() (+9 more)

### Community 65 - "react-native"
Cohesion: 0.12
Nodes (20): react-native, AppTextProps, Tone, ButtonProps, ButtonVariant, styles, FAILURE_MESSAGE, ScanFailureReason (+12 more)

### Community 66 - "i18n/index.ts"
Cohesion: 0.24
Nodes (7): ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, uk

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "useEventEditor.ts"
Cohesion: 0.10
Nodes (20): defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), venueEventsQueryKey() (+12 more)

### Community 70 - "useTheme"
Cohesion: 0.26
Nodes (12): VenueScreen(), GlassIconButton(), InfoChip(), LineupChip(), coverImageUri(), EventDetails(), styles, EventOfferCard() (+4 more)

### Community 71 - "@tanstack/react-query"
Cohesion: 0.15
Nodes (13): @tanstack/react-query, OfferSubmission, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, defaultServices (+5 more)

### Community 72 - "EventsScreenContent.test.tsx"
Cohesion: 0.12
Nodes (17): offerCondition(), CTA_BY_STATE, EventOfferCardProps, event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress (+9 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.13
Nodes (22): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBar(), TaxiBarProps, destination (+14 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.21
Nodes (13): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), claimKeys, useClaimToken() (+5 more)

### Community 75 - "theme/index.ts"
Cohesion: 0.27
Nodes (11): contrastRatio(), parseHex(), relativeLuminance(), brand, ColorScheme, glassOnCover, Palette, palettes (+3 more)

### Community 76 - "EventForm.tsx"
Cohesion: 0.19
Nodes (15): EventFormProps, styles, base, emptyEventForm, EventFormErrors, EventFormValues, EventSubmission, LINEUP_ITEM_MAX_LENGTH (+7 more)

### Community 77 - "VenuesMapScreenContent.tsx"
Cohesion: 0.06
Nodes (57): tabBarInset(), buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL (+49 more)

### Community 78 - "useEvents.ts"
Cohesion: 0.26
Nodes (15): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+7 more)

### Community 79 - "ScannerScreenContent.tsx"
Cohesion: 0.17
Nodes (11): expo-camera@~58.0.14, expo-camera, ScannerScreen(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles (+3 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.22
Nodes (13): TicketScreen(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow(), formatCountdown() (+5 more)

### Community 81 - "AppText"
Cohesion: 0.22
Nodes (13): AppText(), DjAvatar(), DjAvatarProps, DjAvatarSize, djInitials(), styles, DjRow(), DjRowProps (+5 more)

### Community 82 - "GlassSurface"
Cohesion: 0.09
Nodes (22): @expo/vector-icons, EventCard(), EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName (+14 more)

### Community 83 - "kyivTime.ts"
Cohesion: 0.21
Nodes (21): formatHomeDate(), dayTile(), homeDays(), weekDays(), addKyivDays(), CURFEW_KYIV_HOUR, dayKeyParts(), endsBeforeCurfew() (+13 more)

### Community 84 - "Button"
Cohesion: 0.21
Nodes (14): Button(), SwitchField(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), EventOffersSection() (+6 more)

### Community 85 - "@testing-library/react-native"
Cohesion: 0.22
Nodes (9): react-native-safe-area-context, @testing-library/react-native, RootLayout(), SessionGate(), SessionError(), SessionErrorProps, styles, createQueryClient() (+1 more)

### Community 86 - "staff/index.ts"
Cohesion: 0.14
Nodes (19): expo-router@~58.0.30, expo-router, StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), StaffScreen(), useSession(), OfferFormArea() (+11 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.33
Nodes (7): TicketsScreen(), Message(), MyTicketsContent(), MyTicketsContentProps, styles, TicketRow(), useMyClaims()

### Community 88 - "EventsScreenContent.tsx"
Cohesion: 0.14
Nodes (27): EventsScreen(), carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId(), eventsOnDay(), filterEvents(), formatDayHeading() (+19 more)

### Community 90 - "QRTicket.tsx"
Cohesion: 0.19
Nodes (12): QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps (+4 more)

### Community 91 - "TicketScreens.test.tsx"
Cohesion: 0.20
Nodes (8): expo-brightness@~58.0.2, expo-brightness, claim, mockClaims, mockToken, getBrightness, setBrightness, useMaxBrightness()

### Community 92 - "EventScreenContent.test.tsx"
Cohesion: 0.24
Nodes (8): EventScreen(), EventDetailsProps, EventScreenContent(), event, onBack, onOpenVenue, renderScreen(), EventDetails

### Community 94 - "shareEvent.ts"
Cohesion: 0.53
Nodes (4): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent()

### Community 95 - "claims.test.ts"
Cohesion: 0.18
Nodes (7): ClaimsError, getMyClaims(), from, getSession, invoke, row, toMyClaim()

### Community 96 - "tabsShell.test.tsx"
Cohesion: 0.31
Nodes (6): FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), mockNavigate, mockPush

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 807 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `t`, `OfferForm.tsx`, `VenueEventsList.tsx`, `radius`, `dependencies`, `VenueScreenContent.tsx`, `ui/index.ts`, `space`, `OfferFormArea.tsx`, `useTheme`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `theme/index.ts`, `EventForm.tsx`, `VenuesMapScreenContent.tsx`, `ScannerScreenContent.tsx`, `TicketScreenContent.tsx`, `AppText`, `GlassSurface`, `Button`, `@testing-library/react-native`, `staff/index.ts`, `MyTicketsContent.tsx`, `EventsScreenContent.tsx`, `QRTicket.tsx`, `EventScreenContent.test.tsx`, `shareEvent.ts`, `tabsShell.test.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `OfferForm.tsx`, `VenueEventsList.tsx`, `VenueScreenContent.tsx`, `space`, `OfferFormArea.tsx`, `i18n/index.ts`, `Hola Fest — design rules`, `useTheme`, `EventsScreenContent.test.tsx`, `components/TaxiBar.tsx`, `EventForm.tsx`, `VenuesMapScreenContent.tsx`, `ScannerScreenContent.tsx`, `TicketScreenContent.tsx`, `GlassSurface`, `kyivTime.ts`, `Button`, `@testing-library/react-native`, `staff/index.ts`, `MyTicketsContent.tsx`, `EventsScreenContent.tsx`, `TicketScreens.test.tsx`, `EventScreenContent.test.tsx`, `tabsShell.test.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `package.json`, `devDependencies`, `supabase.ts`, `Button.tsx`, `t`, `OfferForm.tsx`, `VenueEventsList.tsx`, `react-dom@19.3.0`, `radius`, `VenueScreenContent.tsx`, `ui/index.ts`, `space`, `react-native`, `i18n/index.ts`, `useEventEditor.ts`, `@tanstack/react-query`, `EventsScreenContent.test.tsx`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `EventForm.tsx`, `VenuesMapScreenContent.tsx`, `useEvents.ts`, `ScannerScreenContent.tsx`, `AppText`, `Button`, `staff/index.ts`, `QRTicket.tsx`, `TicketScreens.test.tsx`, `EventScreenContent.test.tsx`, `tabsShell.test.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._