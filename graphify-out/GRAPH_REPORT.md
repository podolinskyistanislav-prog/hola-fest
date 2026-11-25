# Graph Report - hola-fest  (2026-11-25)

## Corpus Check
- 369 files · ~126,971 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2096 nodes · 5173 edges · 118 communities (101 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 67 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cc1d742b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- devDependencies
- expo
- Hola Fest — Architecture
- compilerOptions
- theme/index.ts
- scripts
- Hola Fest — Product
- with
- with
- AGENTS.md
- steps
- AppText.tsx
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- jest
- 0001-foundation.md
- space
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
- t
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
- homeComponents.test.tsx
- Quick Reference
- EventsScreenContent.tsx
- types/admin.ts
- ui/index.ts
- services/admin.ts
- OfferForm.tsx
- @tanstack/react-query
- useClaimOffer.ts
- build
- Hola Fest — design rules
- useEventEditor.ts
- Button
- kyivDayKey
- QRTicket.tsx
- components/TaxiBar.tsx
- claimedTokens.ts
- radius
- EventFormArea.tsx
- VenueMap.tsx
- services/claims.ts
- shareEvent.ts
- TicketScreenContent.tsx
- feed-filter.ts
- @testing-library/react-native
- services/events.ts
- ScannerScreenContent
- feed-post/handler.ts
- StaffLoginForm.tsx
- MyTicketsContent.tsx
- AppText
- 0008-eas-cloud-builds.md
- i18n/index.ts
- EventScreenContent.tsx
- claims.test.ts
- OfferRow.tsx
- services/offerBuilder.ts
- eventFormat.ts
- useMaxBrightness.test.tsx
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- react-native
- mapHtml.ts
- VenueMap.web.test.tsx
- react-native-gesture-handler@~3.3.0
- VenueScreenContent.tsx
- VenuesMapScreenContent.test.tsx
- expo-router
- venues.test.ts
- HomeHeader.tsx
- 0011-offer-builder-model.md
- expo-splash-screen
- expo-system-ui@~58.0.7
- react-dom@19.3.0
- react-native-reanimated@4.7.1
- react-native-webview

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
- `Code quality` --references--> `claimOffer()`  [INFERRED]
  CLAUDE.md → src/services/claims.ts
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts
- `0005 — Web build is a single-page app` --references--> `resolveStaticPath()`  [INFERRED]
  docs/decisions/0005-web-single-page-app.md → scripts/screenshots/plan.ts

## Import Cycles
- None detected.

## Communities (118 total, 17 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.10
Nodes (20): expo-camera@~58.0.14, expo-constants@~58.0.15, expo-linking@~58.0.16, @expo/ui@~58.0.27, expo-web-browser@~58.0.7, @react-native-async-storage/async-storage@2.2.0, react-native-web@~0.21.4, @supabase/supabase-js@^2.118.0 (+12 more)

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

### Community 5 - "theme/index.ts"
Cohesion: 0.07
Nodes (38): AccentBlobs(), styles, GigRow(), GigRowProps, styles, GlassSearchField(), GlassSearchFieldProps, SEARCH_FIELD_HEIGHT (+30 more)

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

### Community 12 - "AppText.tsx"
Cohesion: 0.13
Nodes (20): AppTextProps, Tone, ButtonProps, ButtonVariant, styles, COMPOSER_MAX_CHARS, COMPOSER_MAX_PHOTOS, ComposerProps (+12 more)

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

### Community 22 - "space"
Cohesion: 0.08
Nodes (29): Builder and cabinet kit, EventCard(), EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName (+21 more)

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
Cohesion: 0.10
Nodes (30): expo-image, @expo/vector-icons, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles, TEXT (+22 more)

### Community 37 - "t"
Cohesion: 0.18
Nodes (20): gigRowProps(), nextGigLine(), formatEventDay(), formatEventTime(), EventRow(), EventRowProps, Skeleton(), styles (+12 more)

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
Cohesion: 0.07
Nodes (28): dependencies, expo@~58.0.23, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-router@~58.0.30, expo-secure-store@~58.0.2 (+20 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "homeComponents.test.tsx"
Cohesion: 0.10
Nodes (24): Chip(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps, styles (+16 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "EventsScreenContent.tsx"
Cohesion: 0.12
Nodes (18): HOME_FILTER_IDS, HomeFilterId, CarouselSkeleton(), EmptyDay(), EventsScreenContent(), EventsScreenContentProps, FILTER_CHIPS, styles (+10 more)

### Community 61 - "types/admin.ts"
Cohesion: 0.17
Nodes (11): SwitchField(), EventOffersSection(), EventOffersSectionProps, OfferItem(), styles, base, offer, AdminVenue (+3 more)

### Community 62 - "ui/index.ts"
Cohesion: 0.10
Nodes (31): ChoiceCard(), ChoiceCardProps, styles, DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime() (+23 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (28): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+20 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.18
Nodes (18): OfferForm(), OfferFormProps, styles, base, OfferFormArea(), OfferFormAreaProps, styles, emptyOfferForm (+10 more)

### Community 65 - "@tanstack/react-query"
Cohesion: 0.17
Nodes (13): @tanstack/react-query, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, useEventOffers(), defaultServices (+5 more)

### Community 66 - "useClaimOffer.ts"
Cohesion: 0.17
Nodes (14): claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+6 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "useEventEditor.ts"
Cohesion: 0.09
Nodes (22): StaffEventsScreen(), defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+14 more)

### Community 70 - "Button"
Cohesion: 0.10
Nodes (34): react, react-native-safe-area-context, DjScreen(), DjsScreen(), Button(), filterDjsByName(), genresLine(), alex (+26 more)

### Community 71 - "kyivDayKey"
Cohesion: 0.18
Nodes (28): dayTile(), homeDays(), weekDays(), dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek() (+20 more)

### Community 72 - "QRTicket.tsx"
Cohesion: 0.19
Nodes (12): QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps (+4 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.13
Nodes (20): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBar(), TaxiBarProps, destination (+12 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.22
Nodes (14): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), useClaimToken(), useMyClaims() (+6 more)

### Community 75 - "radius"
Cohesion: 0.13
Nodes (24): EventCarouselCard(), EventCarouselCardProps, styles, GlassPillButton(), GlassPillButtonProps, styles, CoverColor, coverColors() (+16 more)

### Community 76 - "EventFormArea.tsx"
Cohesion: 0.14
Nodes (22): StaffEventFormScreen(), EventForm(), EventFormProps, styles, base, EventFormArea(), EventFormAreaProps, EventOffers() (+14 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.17
Nodes (20): encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue, parseFromMap(), venue, ToMapMessage (+12 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.13
Nodes (17): requestPermission, Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason() (+9 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.26
Nodes (12): detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow(), formatCountdown(), formatValidUntil() (+4 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "@testing-library/react-native"
Cohesion: 0.17
Nodes (15): @testing-library/react-native, getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+7 more)

### Community 83 - "services/events.ts"
Cohesion: 0.11
Nodes (23): WEDNESDAY, useEvent(), ClientError, EventDetailsRow, EventsError, EventsErrorCode, EventsFilter, EventSummaryRow (+15 more)

### Community 84 - "ScannerScreenContent"
Cohesion: 0.39
Nodes (4): ScannerScreen(), ScannerScreenContent(), useScanRedeem(), onCodeScanned()

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "StaffLoginForm.tsx"
Cohesion: 0.07
Nodes (37): RootLayout(), SessionGate(), StaffOfferFormScreen(), StaffScreen(), SessionError(), SessionErrorProps, styles, createSessionStore() (+29 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.14
Nodes (14): TicketsScreen(), tabBarInset(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent() (+6 more)

### Community 88 - "AppText"
Cohesion: 0.09
Nodes (34): react-native-svg, StaffLogin(), styles, AppText(), BottomSheet(), BottomSheetProps, styles, CollapsibleSection() (+26 more)

### Community 90 - "i18n/index.ts"
Cohesion: 0.20
Nodes (8): EventsScreen(), FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), mockNavigate, mockPush, uk

### Community 91 - "EventScreenContent.tsx"
Cohesion: 0.21
Nodes (9): EventScreen(), EventScreenContent(), EventScreenContentProps, styles, event, onBack, onOpenDj, onOpenVenue (+1 more)

### Community 92 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 93 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.06
Nodes (45): env, CommentDraft, createComment(), createPost(), editPost(), FeedFailureReason, FeedWriteResult, invokeFeedWrite() (+37 more)

### Community 95 - "eventFormat.ts"
Cohesion: 0.14
Nodes (27): coverImageUri(), EventDetails(), EventDetailsProps, styles, carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId() (+19 more)

### Community 96 - "useMaxBrightness.test.tsx"
Cohesion: 0.38
Nodes (5): expo-brightness@~58.0.2, expo-brightness, getBrightness, setBrightness, useMaxBrightness()

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

### Community 103 - "react-native"
Cohesion: 0.21
Nodes (10): react-native, FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles, Message(), MessageAction (+2 more)

### Community 104 - "mapHtml.ts"
Cohesion: 0.22
Nodes (12): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+4 more)

### Community 105 - "VenueMap.web.test.tsx"
Cohesion: 0.33
Nodes (4): Listener, listeners, mount(), venue

### Community 107 - "VenueScreenContent.tsx"
Cohesion: 0.11
Nodes (27): VenueScreen(), useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, Message(), styles, onBack (+19 more)

### Community 108 - "VenuesMapScreenContent.test.tsx"
Cohesion: 0.19
Nodes (10): eventAt(), venue(), onOpenEvent, onOpenVenue, panorama, renderScreen(), tonight, venue (+2 more)

### Community 109 - "expo-router"
Cohesion: 0.39
Nodes (4): expo-router, TicketScreen(), BackRouter, goBackOr()

### Community 110 - "venues.test.ts"
Cohesion: 0.25
Nodes (5): from, Result, venue, venueRow, VenuesError

### Community 111 - "HomeHeader.tsx"
Cohesion: 0.40
Nodes (4): formatHomeDate(), HomeHeader(), HomeHeaderProps, styles

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 899 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `package.json`, `devDependencies`, `theme/index.ts`, `AppText.tsx`, `expo-linking@~58.0.16`, `homeComponents.test.tsx`, `EventsScreenContent.tsx`, `types/admin.ts`, `ui/index.ts`, `OfferForm.tsx`, `@tanstack/react-query`, `useClaimOffer.ts`, `useEventEditor.ts`, `Button`, `QRTicket.tsx`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `EventFormArea.tsx`, `VenueMap.tsx`, `services/claims.ts`, `services/events.ts`, `ScannerScreenContent`, `StaffLoginForm.tsx`, `MyTicketsContent.tsx`, `AppText`, `i18n/index.ts`, `EventScreenContent.tsx`, `useMaxBrightness.test.tsx`, `react-native`, `VenueMap.web.test.tsx`, `VenueScreenContent.tsx`, `VenuesMapScreenContent.test.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `package.json`, `theme/index.ts`, `AppText.tsx`, `space`, `fonts.ts`, `expo-linking@~58.0.16`, `t`, `VenuesMapScreenContent.tsx`, `dependencies`, `homeComponents.test.tsx`, `EventsScreenContent.tsx`, `types/admin.ts`, `ui/index.ts`, `OfferForm.tsx`, `Button`, `QRTicket.tsx`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `radius`, `EventFormArea.tsx`, `VenueMap.tsx`, `shareEvent.ts`, `TicketScreenContent.tsx`, `@testing-library/react-native`, `StaffLoginForm.tsx`, `MyTicketsContent.tsx`, `AppText`, `i18n/index.ts`, `EventScreenContent.tsx`, `OfferRow.tsx`, `eventFormat.ts`, `VenueScreenContent.tsx`, `expo-router`, `HomeHeader.tsx`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `space`, `VenuesMapScreenContent.tsx`, `EventsScreenContent.tsx`, `types/admin.ts`, `OfferForm.tsx`, `useClaimOffer.ts`, `Hola Fest — design rules`, `Button`, `kyivDayKey`, `components/TaxiBar.tsx`, `EventFormArea.tsx`, `services/claims.ts`, `TicketScreenContent.tsx`, `@testing-library/react-native`, `ScannerScreenContent`, `StaffLoginForm.tsx`, `MyTicketsContent.tsx`, `AppText`, `i18n/index.ts`, `EventScreenContent.tsx`, `eventFormat.ts`, `react-native`, `VenueScreenContent.tsx`, `VenuesMapScreenContent.test.tsx`, `HomeHeader.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._