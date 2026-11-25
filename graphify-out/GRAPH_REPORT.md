# Graph Report - hola-fest  (2026-11-25)

## Corpus Check
- 355 files · ~116,034 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2058 nodes · 5104 edges · 111 communities (100 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `24e9156d`
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
- TextField.tsx
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
- claim-offer/handler.ts
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
- react-native
- Quick Reference
- EventsScreenContent.test.tsx
- GlassSurface
- ui/index.ts
- services/admin.ts
- types/admin.ts
- EventFormArea.tsx
- useClaimOffer.ts
- build
- Hola Fest — design rules
- useEventEditor.test.tsx
- DjScreenContent.tsx
- eventFormat.ts
- app/_layout.tsx
- EventTaxiBar.tsx
- claimedTokens.ts
- radius
- EventForm.tsx
- react
- services/claims.ts
- i18n/index.ts
- TicketScreenContent.tsx
- feed-filter.ts
- VenueEventsList.tsx
- services/events.ts
- useTheme
- feed-post/handler.ts
- staff/index.ts
- MyTicketsContent.tsx
- AppText
- 0008-eas-cloud-builds.md
- useEvents.ts
- QRTicket.tsx
- claims.test.ts
- [offerId].tsx
- feed.ts
- EventsScreenContent.tsx
- @testing-library/react-native
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- expo-system-ui@~58.0.7
- mapHtml.ts
- VenueMap.web.test.tsx
- @tanstack/react-query
- services/venues.ts
- supabase.ts
- 0007 — Taxi deep links
- expo-symbols@~58.0.4

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 153 edges
2. `useTheme()` - 151 edges
3. `react-native` - 107 edges
4. `t()` - 106 edges
5. `space` - 67 edges
6. `Button()` - 60 edges
7. `radius` - 49 edges
8. `@testing-library/react-native` - 44 edges
9. `react` - 41 edges
10. `brand` - 32 edges

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

## Communities (111 total, 11 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (22): expo-glass-effect@~58.0.5, expo-status-bar@~58.0.4, expo-web-browser@~58.0.7, react-dom@19.3.0, react-native-gesture-handler@~3.3.0, react-native-screens@~4.30.1, react-native-web@~0.21.4, react-native-webview@14.0.1 (+14 more)

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
Nodes (34): Builder and cabinet kit, styles, Tone, GlassPillButtonProps, styles, INFO_CHIP_HEIGHT, InfoChipProps, styles (+26 more)

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

### Community 12 - "TextField.tsx"
Cohesion: 0.24
Nodes (13): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), StringListFieldProps (+5 more)

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

### Community 22 - "Hola Fest — design rules"
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
Cohesion: 0.09
Nodes (35): @expo/vector-icons, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles, TEXT, BottomSheet() (+27 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.25
Nodes (16): gigRowProps(), nextGigLine(), formatEventDay(), formatEventTime(), formatEventWhen(), TicketRow(), WeekOfEvents(), groupVenueWeek() (+8 more)

### Community 38 - "steps"
Cohesion: 0.19
Nodes (15): BODY, BRANCH, GH_TOKEN, TITLE, steps, steps, continue-on-error, env (+7 more)

### Community 40 - "jobs"
Cohesion: 0.20
Nodes (9): jobs, mention, sync-status, if, runs-on, timeout-minutes, name, if (+1 more)

### Community 41 - "react-native-worklets@0.13.0"
Cohesion: 0.07
Nodes (27): if, runs-on, steps, concurrency, cancel-in-progress, group, AGENTS_MAX_PARALLEL, GH_TOKEN (+19 more)

### Community 42 - "claim-offer/handler.ts"
Cohesion: 0.25
Nodes (6): ClaimDeps, ERRORS, handleClaimOffer(), json(), sha256Hex(), toHex()

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
Cohesion: 0.24
Nodes (16): filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base, TodayOffer, todayOffers() (+8 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-device@~58.0.5, expo-font@~58.0.11, expo-image@~58.0.18, expo-router@~58.0.30 (+24 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "react-native"
Cohesion: 0.09
Nodes (31): react-native, FloatingTabBar(), ITEMS, TabsLayout(), DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps (+23 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "EventsScreenContent.test.tsx"
Cohesion: 0.09
Nodes (27): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue, ClubRow (+19 more)

### Community 61 - "GlassSurface"
Cohesion: 0.09
Nodes (22): ButtonProps, ButtonVariant, styles, EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps (+14 more)

### Community 62 - "ui/index.ts"
Cohesion: 0.09
Nodes (31): ChoiceCard(), ChoiceCardProps, styles, HomeHeaderProps, ImageUploader(), ImageUploaderProps, styles, availabilityHint() (+23 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.12
Nodes (31): defaultServices, Services, AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns() (+23 more)

### Community 64 - "types/admin.ts"
Cohesion: 0.09
Nodes (26): EventOffersSectionProps, base, offer, OfferFormProps, base, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH (+18 more)

### Community 65 - "EventFormArea.tsx"
Cohesion: 0.24
Nodes (8): EventFormAreaProps, EventOffers(), styles, defaultServices, Services, offer, UseEventOffers, useEventOffers()

### Community 66 - "useClaimOffer.ts"
Cohesion: 0.17
Nodes (14): claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+6 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "useEventEditor.test.tsx"
Cohesion: 0.20
Nodes (6): admin, event, start, useEventEditor(), venueEventQueryKey(), AdminEvent

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.11
Nodes (30): GlassSearchField(), filterDjsByName(), genresLine(), alex, nova, DjBody(), DjScreenContent(), DjScreenContentProps (+22 more)

### Community 71 - "eventFormat.ts"
Cohesion: 0.15
Nodes (30): carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId(), dayTile(), filterEvents(), formatDayHeading(), formatEventsCount() (+22 more)

### Community 72 - "app/_layout.tsx"
Cohesion: 0.10
Nodes (25): RootLayout(), SessionGate(), createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore (+17 more)

### Community 73 - "EventTaxiBar.tsx"
Cohesion: 0.16
Nodes (16): TaxiBarProps, destination, openMock, EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles, buildMainTaxiLink(), buildTaxiLinks() (+8 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.30
Nodes (11): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret(), readSecret() (+3 more)

### Community 75 - "radius"
Cohesion: 0.11
Nodes (29): expo-image, react-native-svg, EventCarouselCard(), EventCarouselCardProps, styles, GigRowProps, styles, CoverColor (+21 more)

### Community 76 - "EventForm.tsx"
Cohesion: 0.19
Nodes (17): EventForm(), EventFormProps, styles, base, emptyEventForm, EventFormErrors, EventFormValues, EventSubmission (+9 more)

### Community 77 - "react"
Cohesion: 0.17
Nodes (21): react, encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue, parseFromMap(), venue (+13 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.13
Nodes (17): requestPermission, Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason() (+9 more)

### Community 79 - "i18n/index.ts"
Cohesion: 0.24
Nodes (7): offerCondition(), CTA_BY_STATE, EventOfferCard(), EventOfferCardProps, TranslationKey, uk, EventOffer

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.13
Nodes (21): expo-brightness@~58.0.2, expo-brightness, AccentBlobs(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps (+13 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "VenueEventsList.tsx"
Cohesion: 0.16
Nodes (13): Chip(), ChipProps, styles, EventCard(), FilterChipItem, FilterChips(), FilterChipsProps, styles (+5 more)

### Community 83 - "services/events.ts"
Cohesion: 0.09
Nodes (27): EventDetailsProps, event, onBack, onOpenDj, onOpenVenue, renderScreen(), ClientError, EventDetailsRow (+19 more)

### Community 84 - "useTheme"
Cohesion: 0.08
Nodes (42): expo-router, react-native-safe-area-context, DjScreen(), EventScreen(), StaffOfferFormScreen(), DjsScreen(), EventsScreen(), MapScreen() (+34 more)

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "staff/index.ts"
Cohesion: 0.14
Nodes (17): ScannerScreen(), StaffEventFormScreen(), StaffEventsScreen(), StaffScreen(), useSession(), EventFormArea(), getStaffAccess(), StaffAccess (+9 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.22
Nodes (9): TicketsScreen(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps (+1 more)

### Community 88 - "AppText"
Cohesion: 0.11
Nodes (32): styles, TaxiBar(), AppText(), CollapsibleSection(), CollapsibleSectionProps, styles, GigRow(), GlassIconButton() (+24 more)

### Community 90 - "useEvents.ts"
Cohesion: 0.31
Nodes (11): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+3 more)

### Community 91 - "QRTicket.tsx"
Cohesion: 0.11
Nodes (23): AppTextProps, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL (+15 more)

### Community 92 - "claims.test.ts"
Cohesion: 0.17
Nodes (8): useClaimToken(), useMyClaims(), ClaimsError, getMyClaims(), from, getSession, invoke, row

### Community 93 - "[offerId].tsx"
Cohesion: 0.43
Nodes (3): TicketScreen(), BackRouter, goBackOr()

### Community 94 - "feed.ts"
Cohesion: 0.19
Nodes (13): CommentDraft, createComment(), createPost(), editPost(), FeedFailureReason, FeedWriteResult, invokeFeedWrite(), isNetworkMessage() (+5 more)

### Community 95 - "EventsScreenContent.tsx"
Cohesion: 0.18
Nodes (12): formatHomeDate(), HomeHeader(), styles, eventsOnDay(), HOME_FILTER_IDS, HomeFilterId, CarouselSkeleton(), EmptyDay() (+4 more)

### Community 96 - "@testing-library/react-native"
Cohesion: 0.20
Nodes (7): @testing-library/react-native, useScanRedeem(), onCodeScanned(), base, draft, published, VenueEventsListProps

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 99 - "cors.ts"
Cohesion: 0.23
Nodes (8): ClaimResult, admin, admin, admin, ALLOWED_ORIGINS, corsHeaders(), isAllowedOrigin(), withCors()

### Community 100 - "redeem-claim/handler.ts"
Cohesion: 0.24
Nodes (8): FAILURES, handleRedeemClaim(), json(), RedeemDeps, RedeemResult, sha256Hex(), TOKEN, admin

### Community 101 - "Feed rules (Стрічка)"
Cohesion: 0.50
Nodes (3): Enforcement, Feed rules (Стрічка), For everyone (guests, clubs, DJs)

### Community 102 - "feed-comment/handler.test.ts"
Cohesion: 0.22
Nodes (5): FeedCommentDeps, call(), FeedPostDeps, call(), UpcomingEvent

### Community 104 - "mapHtml.ts"
Cohesion: 0.22
Nodes (12): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+4 more)

### Community 105 - "VenueMap.web.test.tsx"
Cohesion: 0.33
Nodes (4): Listener, listeners, mount(), venue

### Community 106 - "@tanstack/react-query"
Cohesion: 0.16
Nodes (13): @tanstack/react-query, defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+5 more)

### Community 107 - "services/venues.ts"
Cohesion: 0.13
Nodes (20): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, ClientError, getPublishedVenues(), getVenueById(), from (+12 more)

### Community 109 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 885 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `package.json`, `devDependencies`, `supabase.ts`, `TextField.tsx`, `Hola Fest — design rules`, `expo-linking@~58.0.16`, `react-native`, `EventsScreenContent.test.tsx`, `ui/index.ts`, `types/admin.ts`, `EventFormArea.tsx`, `useClaimOffer.ts`, `useEventEditor.test.tsx`, `DjScreenContent.tsx`, `app/_layout.tsx`, `EventTaxiBar.tsx`, `EventForm.tsx`, `react`, `services/claims.ts`, `i18n/index.ts`, `TicketScreenContent.tsx`, `services/events.ts`, `useTheme`, `staff/index.ts`, `AppText`, `useEvents.ts`, `QRTicket.tsx`, `claims.test.ts`, `VenueMap.web.test.tsx`, `@tanstack/react-query`, `services/venues.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `TextField.tsx`, `Hola Fest — design rules`, `fonts.ts`, `expo-linking@~58.0.16`, `VenuesMapScreenContent.tsx`, `dependencies`, `GlassSurface`, `ui/index.ts`, `EventFormArea.tsx`, `DjScreenContent.tsx`, `EventTaxiBar.tsx`, `claimedTokens.ts`, `radius`, `EventForm.tsx`, `react`, `TicketScreenContent.tsx`, `VenueEventsList.tsx`, `services/events.ts`, `useTheme`, `staff/index.ts`, `MyTicketsContent.tsx`, `AppText`, `QRTicket.tsx`, `[offerId].tsx`, `EventsScreenContent.tsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `react-dom@19.3.0` to `Hola Fest — design rules`, `VenuesMapScreenContent.tsx`, `react-native`, `EventsScreenContent.test.tsx`, `EventFormArea.tsx`, `useClaimOffer.ts`, `Hola Fest — design rules`, `DjScreenContent.tsx`, `eventFormat.ts`, `app/_layout.tsx`, `EventTaxiBar.tsx`, `EventForm.tsx`, `services/claims.ts`, `i18n/index.ts`, `TicketScreenContent.tsx`, `VenueEventsList.tsx`, `services/events.ts`, `useTheme`, `staff/index.ts`, `MyTicketsContent.tsx`, `AppText`, `EventsScreenContent.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._