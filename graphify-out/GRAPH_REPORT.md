# Graph Report - hola-fest  (2026-11-25)

## Corpus Check
- 391 files · ~132,749 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2186 nodes · 5507 edges · 115 communities (100 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 78 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `69b18c95`
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
- supabase.ts
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
- ProfileScreenContent.tsx
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
- ui.test.tsx
- Quick Reference
- EventsScreenContent.test.tsx
- EventFormArea.tsx
- space
- services/admin.ts
- OfferForm.tsx
- react
- useClaimOffer.ts
- build
- Hola Fest — design rules
- VenueEventsList.tsx
- EventDetails.tsx
- EventsScreenContent.tsx
- QRTicket.tsx
- components/TaxiBar.tsx
- claimedTokens.ts
- homeComponents.test.tsx
- EventForm.tsx
- VenueMap.tsx
- services/claims.ts
- ProfileSetupForm.tsx
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- services/events.ts
- ScannerScreenContent
- feed-post/handler.ts
- auth/index.ts
- MyTicketsContent.tsx
- AppText
- 0008-eas-cloud-builds.md
- useTheme
- SignInToPostSheet.tsx
- i18n/index.ts
- @testing-library/react-native
- services/offerBuilder.ts
- EventOfferCard.tsx
- TicketScreens.test.tsx
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- tokens.ts
- Chip.tsx
- 0007 — Taxi deep links
- expo@~58.0.23
- services/venues.ts
- expo-camera
- [offerId].tsx
- expo-symbols@~58.0.4
- react-native-web@~0.21.4
- 0011-offer-builder-model.md
- toqr
- react-dom@19.3.0

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 162 edges
2. `useTheme()` - 157 edges
3. `t()` - 122 edges
4. `react-native` - 113 edges
5. `space` - 71 edges
6. `Button()` - 66 edges
7. `radius` - 50 edges
8. `react` - 48 edges
9. `@testing-library/react-native` - 48 edges
10. `@tanstack/react-query` - 36 edges

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

## Communities (115 total, 15 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.10
Nodes (20): expo-device@~58.0.5, expo-glass-effect@~58.0.5, expo-linking@~58.0.16, @react-native-async-storage/async-storage@2.2.0, react-native-gesture-handler@~3.3.0, react-native-reanimated@4.7.1, react-native-screens@~4.30.1, react-native-webview@14.0.1 (+12 more)

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
Cohesion: 0.08
Nodes (27): Builder and cabinet kit, styles, INFO_CHIP_HEIGHT, InfoChipProps, styles, LINEUP_CHIP_HEIGHT, LineupChipProps, styles (+19 more)

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

### Community 12 - "supabase.ts"
Cohesion: 0.15
Nodes (18): @supabase/supabase-js, env, AuthError, AuthErrorCode, ClientError, confirmEmailCode(), ensureGuestSession(), getSession() (+10 more)

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
Cohesion: 0.07
Nodes (32): EventCard(), EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles (+24 more)

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

### Community 30 - "ProfileScreenContent.tsx"
Cohesion: 0.23
Nodes (16): react-native-safe-area-context, StaffEventsScreen(), useSession(), PostRow(), ProfileScreenContent(), ProfileScreenContentProps, styles, ProfileSetupScreenContent() (+8 more)

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
Cohesion: 0.11
Nodes (35): expo-image, @expo/vector-icons, react-native-svg, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles (+27 more)

### Community 37 - "t"
Cohesion: 0.19
Nodes (20): TaxiBar(), Button(), SearchSoonSheet(), shareVenue(), venueLink(), Message(), styles, VenueBody() (+12 more)

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
Cohesion: 0.12
Nodes (31): formatEventTime(), ClubRow, clubRows(), eventAt(), venue(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS (+23 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, expo-constants@~58.0.15, expo-font@~58.0.11, expo-image@~58.0.18, expo-router@~58.0.30, expo-secure-store@~58.0.2, expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4 (+19 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "ui.test.tsx"
Cohesion: 0.11
Nodes (21): FloatingTabBar(), ITEMS, TabsLayout(), DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps, styles (+13 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "EventsScreenContent.test.tsx"
Cohesion: 0.29
Nodes (6): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, venue

### Community 61 - "EventFormArea.tsx"
Cohesion: 0.13
Nodes (20): StaffEventFormScreen(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), EventOffersSection(), EventOffersSectionProps (+12 more)

### Community 62 - "space"
Cohesion: 0.09
Nodes (26): ChoiceCard(), ChoiceCardProps, styles, ImageUploader(), ImageUploaderProps, styles, StatTile(), StatTileProps (+18 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.12
Nodes (31): defaultServices, Services, AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns() (+23 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.11
Nodes (25): StaffOfferFormScreen(), OfferForm(), OfferFormProps, styles, base, OfferFormArea(), OfferFormAreaProps, styles (+17 more)

### Community 65 - "react"
Cohesion: 0.12
Nodes (21): react, @tanstack/react-query, session(), session(), signOut, HANDLE_DEBOUNCE_MS, useHandleAvailability(), profileKeys (+13 more)

### Community 66 - "useClaimOffer.ts"
Cohesion: 0.19
Nodes (13): ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE, mockClaim (+5 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "VenueEventsList.tsx"
Cohesion: 0.10
Nodes (21): defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), venueEventsQueryKey() (+13 more)

### Community 70 - "EventDetails.tsx"
Cohesion: 0.08
Nodes (43): DjRow(), GigRow(), GlassIconButton(), GlassSearchField(), InfoChip(), LineupChip(), tabBarInset(), filterDjsByName() (+35 more)

### Community 71 - "EventsScreenContent.tsx"
Cohesion: 0.11
Nodes (44): formatHomeDate(), nextGigLine(), carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId(), dayTile(), eventsOnDay() (+36 more)

### Community 72 - "QRTicket.tsx"
Cohesion: 0.25
Nodes (9): DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles (+1 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.20
Nodes (15): styles, TaxiBarProps, EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles, buildMainTaxiLink(), buildTaxiLinks(), isValidCoordinate() (+7 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.22
Nodes (12): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), claimKeys, deleteSecret() (+4 more)

### Community 75 - "homeComponents.test.tsx"
Cohesion: 0.13
Nodes (22): EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStar(), HolaStarCover(), HolaStarCoverProps (+14 more)

### Community 76 - "EventForm.tsx"
Cohesion: 0.12
Nodes (28): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), SwitchField() (+20 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (34): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+26 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.09
Nodes (23): requestPermission, Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims() (+15 more)

### Community 79 - "ProfileSetupForm.tsx"
Cohesion: 0.16
Nodes (16): expo-image-manipulator@~58.0.16, expo-image-picker@~58.0.10, expo-image-manipulator, expo-image-picker, HANDLE_HINTS, ProfileSetupForm(), choosePhoto(), ProfileSetupFormProps (+8 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.22
Nodes (16): AccentBlobs(), QRCard(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow() (+8 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.18
Nodes (12): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+4 more)

### Community 83 - "services/events.ts"
Cohesion: 0.08
Nodes (42): EventDetailsProps, dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), EventScreenContent(), EventScreenContentProps (+34 more)

### Community 84 - "ScannerScreenContent"
Cohesion: 0.39
Nodes (4): ScannerScreen(), ScannerScreenContent(), useScanRedeem(), onCodeScanned()

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "auth/index.ts"
Cohesion: 0.13
Nodes (16): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, StaffLoginForm(), StaffLoginFormProps (+8 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.22
Nodes (10): ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps, styles (+2 more)

### Community 88 - "AppText"
Cohesion: 0.07
Nodes (39): AppText(), AppTextProps, Tone, BottomSheet(), BottomSheetProps, styles, ButtonProps, ButtonVariant (+31 more)

### Community 90 - "useTheme"
Cohesion: 0.12
Nodes (24): expo-router, react-native, DjScreen(), EventScreen(), ProfileScreen(), ProfileSetupScreen(), StaffLogin(), styles (+16 more)

### Community 91 - "SignInToPostSheet.tsx"
Cohesion: 0.18
Nodes (11): SignInToPostSheet(), SignInToPostSheetProps, styles, Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade() (+3 more)

### Community 92 - "i18n/index.ts"
Cohesion: 0.21
Nodes (8): RootLayout(), SessionGate(), SessionError(), SessionErrorProps, styles, uk, createQueryClient(), useAppFonts()

### Community 93 - "@testing-library/react-native"
Cohesion: 0.15
Nodes (8): @testing-library/react-native, destination, openMock, EventSubmission, admin, event, start, AdminEvent

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.07
Nodes (41): CommentDraft, createComment(), createPost(), editPost(), FeedFailureReason, FeedWriteResult, invokeFeedWrite(), isNetworkMessage() (+33 more)

### Community 95 - "EventOfferCard.tsx"
Cohesion: 0.38
Nodes (6): offerCondition(), CTA_BY_STATE, EventOfferCard(), EventOfferCardProps, TranslationKey, EventOffer

### Community 96 - "TicketScreens.test.tsx"
Cohesion: 0.20
Nodes (8): expo-brightness@~58.0.2, expo-brightness, claim, mockClaims, mockToken, getBrightness, setBrightness, useMaxBrightness()

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

### Community 103 - "tokens.ts"
Cohesion: 0.17
Nodes (15): FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles, contrastRatio(), parseHex(), relativeLuminance() (+7 more)

### Community 104 - "Chip.tsx"
Cohesion: 0.28
Nodes (7): Chip(), ChipProps, styles, FilterChipItem, FilterChips(), FilterChipsProps, styles

### Community 105 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 107 - "services/venues.ts"
Cohesion: 0.09
Nodes (27): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, onBack, onOpenEvent, onOpenMap, renderScreen() (+19 more)

### Community 109 - "[offerId].tsx"
Cohesion: 0.43
Nodes (3): TicketScreen(), BackRouter, goBackOr()

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 922 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `useTheme` to `package.json`, `kit.test.tsx`, `Hola Fest — design rules`, `ProfileScreenContent.tsx`, `expo-linking@~58.0.16`, `t`, `VenuesMapScreenContent.tsx`, `dependencies`, `ui.test.tsx`, `EventFormArea.tsx`, `space`, `OfferForm.tsx`, `VenueEventsList.tsx`, `EventDetails.tsx`, `EventsScreenContent.tsx`, `QRTicket.tsx`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `homeComponents.test.tsx`, `EventForm.tsx`, `VenueMap.tsx`, `ProfileSetupForm.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `services/events.ts`, `auth/index.ts`, `MyTicketsContent.tsx`, `AppText`, `SignInToPostSheet.tsx`, `i18n/index.ts`, `tokens.ts`, `Chip.tsx`, `[offerId].tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `supabase.ts`, `Hola Fest — design rules`, `ProfileScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `ui.test.tsx`, `EventsScreenContent.test.tsx`, `EventFormArea.tsx`, `OfferForm.tsx`, `react`, `useClaimOffer.ts`, `Hola Fest — design rules`, `VenueEventsList.tsx`, `EventDetails.tsx`, `EventsScreenContent.tsx`, `components/TaxiBar.tsx`, `EventForm.tsx`, `services/claims.ts`, `ProfileSetupForm.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `services/events.ts`, `ScannerScreenContent`, `auth/index.ts`, `MyTicketsContent.tsx`, `useTheme`, `SignInToPostSheet.tsx`, `i18n/index.ts`, `@testing-library/react-native`, `EventOfferCard.tsx`, `TicketScreens.test.tsx`, `services/venues.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `useTheme()` connect `useTheme` to `kit.test.tsx`, `Hola Fest — design rules`, `ProfileScreenContent.tsx`, `ui-ux.md`, `expo-linking@~58.0.16`, `t`, `VenuesMapScreenContent.tsx`, `ui.test.tsx`, `EventFormArea.tsx`, `space`, `OfferForm.tsx`, `VenueEventsList.tsx`, `EventDetails.tsx`, `EventsScreenContent.tsx`, `homeComponents.test.tsx`, `EventForm.tsx`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `services/events.ts`, `ScannerScreenContent`, `MyTicketsContent.tsx`, `AppText`, `i18n/index.ts`, `tokens.ts`, `Chip.tsx`, `[offerId].tsx`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._