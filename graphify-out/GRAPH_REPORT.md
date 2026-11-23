# Graph Report - hola-fest  (2026-11-23)

## Corpus Check
- 279 files · ~88,740 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1716 nodes · 3888 edges · 101 communities (88 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9191607b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
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
- sessionStore.ts
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
- AppText
- auth.ts
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
- theme/index.ts
- EventsScreenContent.tsx
- services/admin.ts
- offerFormValidation.ts
- expo-router
- @tanstack/react-query
- build
- Hola Fest — design rules
- useAdminVenueEvents.ts
- app/_layout.tsx
- useOfferEditor.ts
- expo-splash-screen
- react
- claimedTokens.ts
- QRTicket.tsx
- eventFormValidation.ts
- EventOfferCard.tsx
- VenueMap.tsx
- useEvents.ts
- ScannerScreenContent
- EventDetails.tsx
- shareEvent.ts
- auth/index.ts
- claims.test.ts
- GlassSurface
- useMyClaims.ts
- VenueEventsList.test.tsx
- eventFormat.ts
- 0008-eas-cloud-builds.md
- tabsShell.test.tsx
- TicketScreenContent.tsx
- staff/index.ts
- useVenues.ts
- expo@~58.0.23
- @testing-library/react-native
- expo-device@~58.0.5
- db-backend.md
- reviewer.md
- expo-camera
- expo-image

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 100 edges
2. `useTheme()` - 100 edges
3. `t()` - 91 edges
4. `react-native` - 71 edges
5. `Button()` - 50 edges
6. `space` - 44 edges
7. `@testing-library/react-native` - 38 edges
8. `react` - 32 edges
9. `@tanstack/react-query` - 29 edges
10. `GlassSurface()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Rules for agents` --references--> `t()`  [INFERRED]
  docs/design/mockups/README.md → src/lib/i18n/index.ts
- `Code quality` --references--> `claimOffer()`  [INFERRED]
  CLAUDE.md → src/services/claims.ts
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts
- `0005 — Web build is a single-page app` --references--> `resolveStaticPath()`  [INFERRED]
  docs/decisions/0005-web-single-page-app.md → scripts/screenshots/plan.ts
- `Decision` --references--> `openTaxiLink()`  [INFERRED]
  docs/decisions/0007-taxi-deep-links.md → src/lib/taxi.ts

## Import Cycles
- None detected.

## Communities (101 total, 13 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, expo-build-properties@~58.0.12, expo-font@~58.0.11, expo-status-bar@~58.0.4, expo-system-ui@~58.0.7, @expo/ui@~58.0.27, react@19.3.0, react-dom@19.3.0 (+22 more)

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
Cohesion: 0.11
Nodes (20): onBack, onOpenEvent, renderScreen(), venue, ClientError, getVenueById(), from, Result (+12 more)

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
Nodes (17): Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+9 more)

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.14
Nodes (16): 0005 — Web build is a single-page app, appEnvFromSupabaseStatus(), buildShotPlan(), resolveStaticPath(), Shot, exportWeb(), main(), MIME (+8 more)

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

### Community 22 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

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
Nodes (18): DateTimeFieldProps, formatDateTime(), pad(), formatHomeDate(), CURFEW_KYIV_HOUR, dayKeyParts(), formatKyivTime(), fromKyivParts() (+10 more)

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

### Community 36 - "AppText"
Cohesion: 0.07
Nodes (66): react-native-safe-area-context, EventScreen(), StaffLogin(), styles, TicketsScreen(), VenueScreen(), AppText(), Button() (+58 more)

### Community 37 - "auth.ts"
Cohesion: 0.19
Nodes (14): @supabase/supabase-js, env, AuthError, AuthErrorCode, ClientError, ensureGuestSession(), getSession(), onAuthChange() (+6 more)

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
Cohesion: 0.10
Nodes (34): Chip(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps, styles (+26 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.10
Nodes (20): expo-constants@~58.0.15, expo-glass-effect@~58.0.5, expo-symbols@~58.0.4, @expo/vector-icons@^15.0.2, expo-web-browser@~58.0.7, @react-native-async-storage/async-storage@2.2.0, react-native-svg@15.16.0, toqr@^0.1.1 (+12 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "services/events.ts"
Cohesion: 0.12
Nodes (19): ClientError, EventDetailsRow, EventsError, EventsErrorCode, EventsFilter, EventSummaryRow, getEventById(), OfferRow (+11 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenuesMapScreenContent.tsx"
Cohesion: 0.16
Nodes (20): GlassSearchField(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, KYIV_REGION, mappableVenues(), resolveSelectedVenueId(), base (+12 more)

### Community 61 - "theme/index.ts"
Cohesion: 0.10
Nodes (25): react-native, TicketScreen(), AppTextProps, Tone, ButtonProps, ButtonVariant, styles, EventCardProps (+17 more)

### Community 62 - "EventsScreenContent.tsx"
Cohesion: 0.14
Nodes (23): EventsScreen(), EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStar(), HolaStarCover() (+15 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.11
Nodes (32): defaultServices, Services, useEventEditor(), venueEventQueryKey(), myVenuesQueryKey, AdminError, AdminErrorCode, ClientError (+24 more)

### Community 64 - "offerFormValidation.ts"
Cohesion: 0.15
Nodes (16): EventOffersSectionProps, base, offer, OfferFormProps, base, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH (+8 more)

### Community 65 - "expo-router"
Cohesion: 0.33
Nodes (7): expo-router@~58.0.30, expo-router, StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), useSession(), VenueEventsArea()

### Community 66 - "@tanstack/react-query"
Cohesion: 0.21
Nodes (13): @tanstack/react-query, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+5 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.10
Nodes (19): Admin form fields, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen, Hola Fest — design rules (+11 more)

### Community 69 - "useAdminVenueEvents.ts"
Cohesion: 0.17
Nodes (12): defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), venueEventsQueryKey() (+4 more)

### Community 70 - "app/_layout.tsx"
Cohesion: 0.46
Nodes (4): RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 71 - "useOfferEditor.ts"
Cohesion: 0.15
Nodes (13): OfferSubmission, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, useEventOffers(), defaultServices (+5 more)

### Community 73 - "react"
Cohesion: 0.12
Nodes (23): 0007 — Taxi deep links, Consequences, Context, Decision, react, styles, TaxiBar(), TaxiBarProps (+15 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.28
Nodes (11): expo-secure-store@~58.0.2, expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret() (+3 more)

### Community 75 - "QRTicket.tsx"
Cohesion: 0.13
Nodes (20): DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles (+12 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.11
Nodes (21): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, EventSubmission, eventToFormValues(), LINEUP_ITEM_MAX_LENGTH (+13 more)

### Community 77 - "EventOfferCard.tsx"
Cohesion: 0.12
Nodes (16): EventDetailsProps, offerCondition(), CTA_BY_STATE, EventOfferCardProps, event, onBack, onOpenVenue, renderScreen() (+8 more)

### Community 78 - "VenueMap.tsx"
Cohesion: 0.18
Nodes (18): MapPin(), darkMapStyle(), StyleRule, MappableVenue, projectToSurface(), styles, venueAccent(), VenueMap() (+10 more)

### Community 79 - "useEvents.ts"
Cohesion: 0.29
Nodes (14): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+6 more)

### Community 80 - "ScannerScreenContent"
Cohesion: 0.39
Nodes (4): ScannerScreen(), ScannerScreenContent(), useScanRedeem(), onCodeScanned()

### Community 81 - "EventDetails.tsx"
Cohesion: 0.09
Nodes (28): styles, GlassIconButton(), INFO_CHIP_HEIGHT, InfoChip(), InfoChipProps, styles, LINEUP_CHIP_HEIGHT, LineupChip() (+20 more)

### Community 82 - "shareEvent.ts"
Cohesion: 0.53
Nodes (4): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent()

### Community 83 - "auth/index.ts"
Cohesion: 0.43
Nodes (3): Deps, UseStaffLogin, useStaffLogin()

### Community 84 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 85 - "GlassSurface"
Cohesion: 0.08
Nodes (27): FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles, GlassPillButton(), GlassPillButtonProps, styles, GlassSearchFieldProps (+19 more)

### Community 86 - "useMyClaims.ts"
Cohesion: 0.36
Nodes (5): claimKeys, useClaimToken(), useMyClaims(), getMyClaims(), toMyClaim()

### Community 87 - "VenueEventsList.test.tsx"
Cohesion: 0.40
Nodes (4): base, draft, published, VenueEventsListProps

### Community 88 - "eventFormat.ts"
Cohesion: 0.17
Nodes (25): carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId(), dayTile(), eventsOnDay(), filterEvents(), formatDayHeading() (+17 more)

### Community 90 - "tabsShell.test.tsx"
Cohesion: 0.31
Nodes (6): FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), mockNavigate, mockPush

### Community 91 - "TicketScreenContent.tsx"
Cohesion: 0.23
Nodes (14): AccentBlobs(), QRCard(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow() (+6 more)

### Community 92 - "staff/index.ts"
Cohesion: 0.24
Nodes (8): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, UseStaffAccess, useStaffAccess(), AdminVenue

### Community 93 - "useVenues.ts"
Cohesion: 0.44
Nodes (5): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, getPublishedVenues()

### Community 95 - "@testing-library/react-native"
Cohesion: 0.15
Nodes (10): expo-brightness@~58.0.2, expo-brightness, @testing-library/react-native, requestPermission, claim, mockClaims, mockToken, getBrightness (+2 more)

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 777 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `AppText` to `supabase.ts`, `fonts.ts`, `VenuesMapScreenContent.tsx`, `theme/index.ts`, `EventsScreenContent.tsx`, `@tanstack/react-query`, `Hola Fest — design rules`, `app/_layout.tsx`, `react`, `EventOfferCard.tsx`, `VenueMap.tsx`, `ScannerScreenContent`, `EventDetails.tsx`, `auth/index.ts`, `GlassSurface`, `eventFormat.ts`, `tabsShell.test.tsx`, `TicketScreenContent.tsx`, `@testing-library/react-native`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `theme/index.ts` to `dependencies`, `AppText`, `react`, `QRTicket.tsx`, `EventOfferCard.tsx`, `VenueMap.tsx`, `EventDetails.tsx`, `shareEvent.ts`, `ui/index.ts`, `GlassSurface`, `package.json`, `tabsShell.test.tsx`, `TicketScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `EventsScreenContent.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `devDependencies`, `supabase.ts`, `sessionStore.ts`, `AppText`, `ui/index.ts`, `package.json`, `VenuesMapScreenContent.tsx`, `theme/index.ts`, `offerFormValidation.ts`, `@tanstack/react-query`, `useAdminVenueEvents.ts`, `app/_layout.tsx`, `useOfferEditor.ts`, `react`, `QRTicket.tsx`, `eventFormValidation.ts`, `EventOfferCard.tsx`, `VenueMap.tsx`, `useEvents.ts`, `ScannerScreenContent`, `EventDetails.tsx`, `auth/index.ts`, `useMyClaims.ts`, `VenueEventsList.test.tsx`, `tabsShell.test.tsx`, `staff/index.ts`, `useVenues.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._