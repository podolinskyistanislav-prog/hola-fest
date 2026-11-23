# Graph Report - hola-fest  (2026-11-23)

## Corpus Check
- 316 files · ~99,823 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1870 nodes · 4454 edges · 110 communities (95 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 58 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3a76786e`
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
- TextField
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- jest
- 0001-foundation.md
- react
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
- ui/index.ts
- Quick Reference
- services/venues.ts
- react-native
- clubKit.test.tsx
- services/admin.ts
- OfferForm.tsx
- AppText.tsx
- useClaimOffer.ts
- build
- Hola Fest — design rules
- useAdminVenueEvents.ts
- @tanstack/react-query
- EventsScreenContent.tsx
- i18n/index.ts
- EventTaxiBar.tsx
- claimedTokens.ts
- QRTicket.tsx
- EventForm.tsx
- VenueMap.tsx
- services/claims.ts
- VenuesMapScreenContent.test.tsx
- TicketScreenContent.tsx
- auth.ts
- GlassSurface
- kyivTime.ts
- types/admin.ts
- AppText
- staff/index.ts
- MyTicketsContent.tsx
- t
- 0008-eas-cloud-builds.md
- sessionStore.ts
- useTheme
- app/_layout.tsx
- useSession
- mapHtml.ts
- react-native-reanimated@4.7.1
- 0007 — Taxi deep links
- db-backend.md
- reviewer.md
- react-native-webview
- useScanRedeem.ts
- djFormat.ts
- VenueMap.web.test.tsx
- @testing-library/react-native
- TicketScreens.test.tsx
- expo-font@~58.0.11
- expo-splash-screen
- expo-web-browser@~58.0.7
- react-native-screens@~4.30.1
- react-native-worklets@0.13.0

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 123 edges
2. `useTheme()` - 122 edges
3. `t()` - 101 edges
4. `react-native` - 87 edges
5. `Button()` - 55 edges
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

## Communities (110 total, 15 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.11
Nodes (18): expo-camera@~58.0.14, expo-device@~58.0.5, expo-status-bar@~58.0.4, @expo/vector-icons@^15.0.2, @react-native-async-storage/async-storage@2.2.0, react-native-web@~0.21.4, toqr@^0.1.1, main (+10 more)

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
Cohesion: 0.07
Nodes (35): AccentBlobs(), styles, GlassPillButtonProps, styles, SEARCH_FIELD_HEIGHT, INFO_CHIP_HEIGHT, InfoChip(), InfoChipProps (+27 more)

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

### Community 12 - "TextField"
Cohesion: 0.26
Nodes (12): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), TextField() (+4 more)

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

### Community 22 - "react"
Cohesion: 0.27
Nodes (7): react, StaffLoginForm(), StaffLoginFormProps, styles, Deps, UseStaffLogin, useStaffLogin()

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
Cohesion: 0.21
Nodes (19): GlassPillButton(), MapVenueCard(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base (+11 more)

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
Cohesion: 0.18
Nodes (8): venueEventsQueryKey(), admin, event, start, UseEventEditor, useEventEditor(), venueEventQueryKey(), AdminEvent

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.08
Nodes (32): EventDetailsProps, event, onBack, onOpenDj, onOpenVenue, renderScreen(), eventAt(), now (+24 more)

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
Cohesion: 0.17
Nodes (21): expo-image, react-native-svg, EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStar() (+13 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (28): dependencies, expo@~58.0.23, expo-constants@~58.0.15, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-linking@~58.0.16, expo-router@~58.0.30, expo-symbols@~58.0.4 (+20 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "ui/index.ts"
Cohesion: 0.09
Nodes (35): FloatingTabBar(), ITEMS, TabsLayout(), Chip(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip() (+27 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "services/venues.ts"
Cohesion: 0.13
Nodes (19): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, ClientError, getPublishedVenues(), getVenueById(), from (+11 more)

### Community 61 - "react-native"
Cohesion: 0.12
Nodes (24): react-native, DjAvatar(), DjAvatarProps, DjAvatarSize, djInitials(), styles, DjRow(), DjRowProps (+16 more)

### Community 62 - "clubKit.test.tsx"
Cohesion: 0.14
Nodes (12): CollapsibleSection(), CollapsibleSectionProps, styles, LoyaltyStampCard(), LoyaltyStampCardProps, styles, PHOTO_TILE_HEIGHT, PHOTO_TILE_WIDTH (+4 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (28): defaultServices, Services, AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns() (+20 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.17
Nodes (18): SwitchField(), OfferForm(), OfferFormProps, styles, base, OfferFormAreaProps, styles, emptyOfferForm (+10 more)

### Community 65 - "AppText.tsx"
Cohesion: 0.16
Nodes (13): AppTextProps, Tone, ButtonProps, ButtonVariant, styles, StringListFieldProps, styles, styles (+5 more)

### Community 66 - "useClaimOffer.ts"
Cohesion: 0.17
Nodes (14): claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+6 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "useAdminVenueEvents.ts"
Cohesion: 0.17
Nodes (11): defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), myVenuesQueryKey (+3 more)

### Community 70 - "@tanstack/react-query"
Cohesion: 0.11
Nodes (23): @tanstack/react-query, DjScreen(), alex, nova, DjScreenContent(), djKeys, DJS_STALE_TIME_MS, useDj() (+15 more)

### Community 71 - "EventsScreenContent.tsx"
Cohesion: 0.18
Nodes (20): dayFromId(), dayTile(), eventsOnDay(), filterEvents(), formatDayHeading(), formatEventsCount(), HOME_FILTER_IDS, homeDays() (+12 more)

### Community 72 - "i18n/index.ts"
Cohesion: 0.18
Nodes (9): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue, TranslationKey (+1 more)

### Community 73 - "EventTaxiBar.tsx"
Cohesion: 0.16
Nodes (16): TaxiBarProps, destination, openMock, EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles, buildMainTaxiLink(), buildTaxiLinks() (+8 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.28
Nodes (12): expo-secure-store@~58.0.2, expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret() (+4 more)

### Community 75 - "QRTicket.tsx"
Cohesion: 0.13
Nodes (20): DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles (+12 more)

### Community 76 - "EventForm.tsx"
Cohesion: 0.19
Nodes (16): EventForm(), EventFormProps, styles, base, emptyEventForm, EventFormErrors, EventFormValues, EventSubmission (+8 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.20
Nodes (18): buildMapHtml(), encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue, parseFromMap(), venue (+10 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.10
Nodes (20): requestPermission, useClaimToken(), useMyClaims(), ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage() (+12 more)

### Community 79 - "VenuesMapScreenContent.test.tsx"
Cohesion: 0.14
Nodes (12): onBack, onOpenEvent, renderScreen(), venue, onOpenEvent, onOpenVenue, panorama, renderScreen() (+4 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.15
Nodes (19): expo-brightness@~58.0.2, expo-brightness, GlassIconButton(), QRCard(), detailsText(), pillText(), styles, TicketScreenContent() (+11 more)

### Community 81 - "auth.ts"
Cohesion: 0.30
Nodes (11): AuthError, AuthErrorCode, ClientError, ensureGuestSession(), getSession(), onAuthChange(), signInStaff(), signOut() (+3 more)

### Community 82 - "GlassSurface"
Cohesion: 0.10
Nodes (18): EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles, GlassSearchFieldProps (+10 more)

### Community 83 - "kyivTime.ts"
Cohesion: 0.19
Nodes (24): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+16 more)

### Community 84 - "types/admin.ts"
Cohesion: 0.10
Nodes (20): EventOffersSectionProps, base, offer, OfferSubmission, defaultServices, eventOffersQueryKey(), Services, offer (+12 more)

### Community 85 - "AppText"
Cohesion: 0.10
Nodes (31): react-native-safe-area-context, StaffLogin(), styles, styles, TaxiBar(), AppText(), Button(), EventCard() (+23 more)

### Community 86 - "staff/index.ts"
Cohesion: 0.22
Nodes (11): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+3 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.22
Nodes (9): TicketsScreen(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps (+1 more)

### Community 88 - "t"
Cohesion: 0.17
Nodes (21): OfferCard(), coverImageUri(), EventDetails(), styles, carouselCardProps(), CurfewInfo, curfewInfo(), formatEventTimeRange() (+13 more)

### Community 90 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 91 - "useTheme"
Cohesion: 0.16
Nodes (17): expo-router, EventScreen(), DjsScreen(), EventsScreen(), MapScreen(), TicketScreen(), VenueScreen(), EventScreenContent() (+9 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.26
Nodes (7): RootLayout(), SessionGate(), SessionError(), SessionErrorProps, styles, createQueryClient(), useAppFonts()

### Community 93 - "useSession"
Cohesion: 0.24
Nodes (9): ScannerScreen(), StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), useSession(), EventFormArea(), eventToFormValues(), OfferFormArea() (+1 more)

### Community 94 - "mapHtml.ts"
Cohesion: 0.21
Nodes (11): inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION, MapHtmlOptions (+3 more)

### Community 96 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 100 - "useScanRedeem.ts"
Cohesion: 0.23
Nodes (7): Deps, FAILURE_REASON, ScanState, useScanRedeem(), onCodeScanned(), RedeemClaimResult, RedeemFailureReason

### Community 101 - "djFormat.ts"
Cohesion: 0.33
Nodes (10): formatHomeDate(), gigRowProps(), nextGigLine(), formatEventDay(), formatEventTime(), TicketRow(), EventRow(), formatEventWhen() (+2 more)

### Community 102 - "VenueMap.web.test.tsx"
Cohesion: 0.22
Nodes (7): VenueMapProps, Listener, listeners, mount(), venue, MappableVenue, VenueMapCardProps

### Community 103 - "@testing-library/react-native"
Cohesion: 0.33
Nodes (5): @testing-library/react-native, base, draft, published, VenueEventsListProps

### Community 104 - "TicketScreens.test.tsx"
Cohesion: 0.40
Nodes (3): claim, mockClaims, mockToken

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 827 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `package.json`, `kit.test.tsx`, `react`, `fonts.ts`, `react-dom@19.3.0`, `radius`, `dependencies`, `ui/index.ts`, `clubKit.test.tsx`, `OfferForm.tsx`, `AppText.tsx`, `@tanstack/react-query`, `EventsScreenContent.tsx`, `EventTaxiBar.tsx`, `claimedTokens.ts`, `QRTicket.tsx`, `EventForm.tsx`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `GlassSurface`, `AppText`, `staff/index.ts`, `MyTicketsContent.tsx`, `t`, `useTheme`, `app/_layout.tsx`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `claimOffer()` connect `useClaimOffer.ts` to `services/claims.ts`, `Hola Fest — Product`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `Code quality` connect `Hola Fest — Product` to `useClaimOffer.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._