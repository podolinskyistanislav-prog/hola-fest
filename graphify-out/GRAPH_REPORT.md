# Graph Report - hola-fest  (2026-11-26)

## Corpus Check
- 434 files · ~147,883 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2423 nodes · 6260 edges · 128 communities (110 shown, 18 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 101 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f74ce907`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- expo-symbols@~58.0.4
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
- toVenueCabinetError
- _layout.tsx
- task.md
- pull_request_template.md
- supabase.ts
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- kyivTime.ts
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- ui/index.ts
- VenueScreenContent.tsx
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
- EventsScreenContent.tsx
- useOfferEditor.ts
- t
- services/admin.ts
- types/admin.ts
- FeedScreenContent
- useClaimOffer.ts
- build
- Hola Fest — design rules
- VenueEventsList.tsx
- DjScreenContent.tsx
- kyivDayKey
- feed.ts
- components/TaxiBar.tsx
- TextField
- HolaStar.tsx
- eventFormValidation.ts
- VenueMap.tsx
- services/claims.ts
- venueProfile.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- useEvents.ts
- ScannerScreenContent.tsx
- feed-post/handler.ts
- sessionStore.ts
- useScanRedeem.ts
- claimedTokens.ts
- 0008-eas-cloud-builds.md
- AppText
- ProfileSetupForm.tsx
- app/_layout.tsx
- useFeed.ts
- services/offerBuilder.ts
- venueDashboard.ts
- applications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- brand
- react-native
- useEventEditor.ts
- TicketScreenContent
- services/venues.ts
- @tanstack/react-query
- @testing-library/react-native
- QRTicket.tsx
- useAdminVenueEvents.ts
- 0011-offer-builder-model.md
- tokens.ts
- FeedScreenContent.test.tsx
- VenuesMapScreenContent.test.tsx
- FakeXhr
- sharePost.ts
- uploadPostImage
- feed.test.ts
- tabsShell.test.tsx
- expo-constants@~58.0.15
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-web-browser@~58.0.7
- react-dom@19.3.0
- @react-native-async-storage/async-storage
- react-native-gesture-handler@~3.3.0

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 177 edges
2. `useTheme()` - 171 edges
3. `t()` - 144 edges
4. `react-native` - 124 edges
5. `Button()` - 80 edges
6. `space` - 77 edges
7. `react` - 59 edges
8. `radius` - 54 edges
9. `@testing-library/react-native` - 53 edges
10. `@tanstack/react-query` - 45 edges

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

## Communities (128 total, 18 thin omitted)

### Community 1 - "devDependencies"
Cohesion: 0.11
Nodes (24): devDependencies, eslint-config-prettier@^10.1.8, jest@^30.5.2, jest-expo@^58.0.14, playwright@^1.64.1, prettier@^3.9.10, @testing-library/react-native@^14.1.0, tsx@^4.23.15 (+16 more)

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
Cohesion: 0.15
Nodes (23): InfoChip(), LineupChip(), coverImageUri(), EventDetails(), styles, carouselCardProps(), CurfewInfo, curfewInfo() (+15 more)

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

### Community 12 - "Button.tsx"
Cohesion: 0.10
Nodes (25): OfferCard(), EventDetailsProps, offerCondition(), CTA_BY_STATE, EventOfferCard(), EventOfferCardProps, event, onBack (+17 more)

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

### Community 22 - "toVenueCabinetError"
Cohesion: 0.13
Nodes (24): ClientError, toVenueCabinetError(), VenueCabinetError, VenueCabinetErrorCode, getMyVenueProfile(), listPhotos(), toProfile(), updateVenueProfile() (+16 more)

### Community 23 - "_layout.tsx"
Cohesion: 0.06
Nodes (35): concurrency, cancel-in-progress, group, DIR, GH_TOKEN, PR, REPO, SHA (+27 more)

### Community 24 - "task.md"
Cohesion: 0.33
Nodes (5): Acceptance criteria, Dependencies, Goal, Out of scope, Owner & allowed paths

### Community 25 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): How it was verified, Security checklist (if data, auth or offers are touched), What changed

### Community 26 - "supabase.ts"
Cohesion: 0.18
Nodes (17): @supabase/supabase-js, AuthError, AuthErrorCode, ClientError, confirmEmailCode(), ensureGuestSession(), getSession(), onAuthChange() (+9 more)

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
Cohesion: 0.21
Nodes (18): dayRange(), endOfWeek(), startOfWeek(), addKyivDays(), CURFEW_KYIV_HOUR, endsBeforeCurfew(), fromKyivParts(), keyToUtcMs() (+10 more)

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

### Community 36 - "ui/index.ts"
Cohesion: 0.05
Nodes (70): expo-image, @expo/vector-icons, react-native-svg, AppTextProps, Tone, AuthorKind, AuthorLabel(), AuthorLabelProps (+62 more)

### Community 37 - "VenueScreenContent.tsx"
Cohesion: 0.12
Nodes (20): VenueScreen(), CollapsibleSection(), GlassIconButton(), PhotoGallery(), shareVenue(), venueLink(), mappableVenues(), Message() (+12 more)

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
Cohesion: 0.15
Nodes (25): MapScreen(), GlassSearchField(), GlassSurface(), WeekOfferRow(), formatEventTime(), ClubRow, clubRows(), eventAt() (+17 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-image-manipulator@~58.0.16 (+26 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "ui.test.tsx"
Cohesion: 0.07
Nodes (28): FloatingTabBar(), ITEMS, TabsLayout(), DAY_PILL_HEIGHT, DayStripDay, DayStripProps, styles, EventCardProps (+20 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "EventsScreenContent.tsx"
Cohesion: 0.12
Nodes (23): DayStrip(), FilterChips(), mockedScheme, HomeHeader(), SectionHeader(), tabBarInset(), VenueRow(), eventsOnDay() (+15 more)

### Community 61 - "useOfferEditor.ts"
Cohesion: 0.15
Nodes (13): OfferSubmission, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, useEventOffers(), defaultServices (+5 more)

### Community 62 - "t"
Cohesion: 0.07
Nodes (50): expo-router, react, react-native-safe-area-context, ApplyScreen(), ProfileScreen(), ProfileSetupScreen(), StaffApplicationsScreen(), StaffEventFormScreen() (+42 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (26): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+18 more)

### Community 64 - "types/admin.ts"
Cohesion: 0.13
Nodes (18): EventOffersSectionProps, base, offer, OfferFormProps, base, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH (+10 more)

### Community 65 - "FeedScreenContent"
Cohesion: 0.31
Nodes (6): FeedScreen(), FeedScreenContent(), like(), whenReady(), FeedScreenContentProps, Message()

### Community 66 - "useClaimOffer.ts"
Cohesion: 0.16
Nodes (13): claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+5 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "VenueEventsList.tsx"
Cohesion: 0.18
Nodes (10): Chip(), ChipProps, styles, EventCard(), FilterChipItem, FilterChipsProps, styles, EventRow() (+2 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.11
Nodes (32): DjScreen(), filterDjsByName(), genresLine(), gigRowProps(), nextGigLine(), alex, nova, DjBody() (+24 more)

### Community 71 - "kyivDayKey"
Cohesion: 0.20
Nodes (16): formatHomeDate(), styles, formatDayHeading(), formatEventDay(), WeekOfEvents(), groupVenueWeek(), safeInstagramUrl(), now (+8 more)

### Community 72 - "feed.ts"
Cohesion: 0.13
Nodes (16): ADR-0012, env, CommentDraft, FeedLabel, FeedRow, FeedWriteResult, getFeedPost(), isNetworkMessage() (+8 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.13
Nodes (23): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBar(), TaxiBarProps, destination (+15 more)

### Community 74 - "TextField"
Cohesion: 0.15
Nodes (18): ButtonProps, ButtonVariant, styles, DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime() (+10 more)

### Community 75 - "HolaStar.tsx"
Cohesion: 0.23
Nodes (13): EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStarCover(), HolaStarCoverProps, HolaStarThumb() (+5 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.16
Nodes (16): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, eventToFormValues(), LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS (+8 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (36): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+28 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.12
Nodes (18): claimOffer(), ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+10 more)

### Community 79 - "venueProfile.ts"
Cohesion: 0.13
Nodes (20): addVenuePhoto(), PhotoRow, ProfileRow, randomSuffix(), removeVenuePhoto(), chain(), from, mockProfileQueries() (+12 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.27
Nodes (11): detailsText(), pillText(), styles, TicketScreenContentProps, useNow(), formatCountdown(), formatValidUntil(), now (+3 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.30
Nodes (7): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, UseStaffAccess, useStaffAccess()

### Community 83 - "useEvents.ts"
Cohesion: 0.16
Nodes (16): eventKeys, EVENTS_STALE_TIME_MS, WEDNESDAY, useEvent(), useEventsForDay(), useEventsForWeek(), useHomeEvents(), EventsError (+8 more)

### Community 84 - "ScannerScreenContent.tsx"
Cohesion: 0.24
Nodes (7): expo-camera, ScannerScreen(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles, requestPermission

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 87 - "useScanRedeem.ts"
Cohesion: 0.16
Nodes (11): Deps, FAILURE_REASON, ScanState, useScanRedeem(), onCodeScanned(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards() (+3 more)

### Community 88 - "claimedTokens.ts"
Cohesion: 0.20
Nodes (15): expo-secure-store, acceptRules(), afterAuthor(), hasSeenFeedRules(), markFeedRulesSeen(), mockStore, rememberClaimToken(), mockRead (+7 more)

### Community 90 - "AppText"
Cohesion: 0.09
Nodes (51): EventScreen(), TicketsScreen(), AppText(), BottomSheet(), Button(), Composer(), FEED_RULES, FeedRulesSheet() (+43 more)

### Community 91 - "ProfileSetupForm.tsx"
Cohesion: 0.06
Nodes (51): expo-image-manipulator, expo-image-picker, pickPhoto(), addPhoto(), Deps, EmailUpgradeStep, setup(), UseEmailUpgrade (+43 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.26
Nodes (8): expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, expo-splash-screen, expo-status-bar, RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 93 - "useFeed.ts"
Cohesion: 0.25
Nodes (11): feedKeys, FeedData, post(), seed(), useMyClubs(), useToggleLike(), withLike(), FeedPage (+3 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.11
Nodes (27): callOfferAction(), ClientError, duplicateOffer(), endOffer(), formatKyivTime(), generateOfferTerms(), generateOfferTitle(), OFFER_KINDS (+19 more)

### Community 95 - "venueDashboard.ts"
Cohesion: 0.15
Nodes (15): listVenueOfferStats(), countClaims(), DashboardOffer, getVenueDashboard(), listLiveOffers(), LiveOfferRow, startOfDay(), chain() (+7 more)

### Community 96 - "applications.ts"
Cohesion: 0.06
Nodes (50): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+42 more)

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

### Community 103 - "brand"
Cohesion: 0.09
Nodes (29): AccentBlobs(), styles, GlassPillButton(), GlassPillButtonProps, styles, GlassSearchFieldProps, SEARCH_FIELD_HEIGHT, styles (+21 more)

### Community 104 - "react-native"
Cohesion: 0.06
Nodes (40): Builder and cabinet kit, react-native, DjsScreen(), ChoiceCardProps, styles, ImageUploaderProps, styles, LoyaltyStampCardProps (+32 more)

### Community 105 - "useEventEditor.ts"
Cohesion: 0.18
Nodes (11): EventSubmission, venueEventsQueryKey(), defaultServices, Services, admin, event, start, UseEventEditor (+3 more)

### Community 106 - "TicketScreenContent"
Cohesion: 0.24
Nodes (7): TicketScreen(), getClaimToken(), TicketScreenContent(), useClaimToken(), useMyClaims(), BackRouter, goBackOr()

### Community 107 - "services/venues.ts"
Cohesion: 0.13
Nodes (20): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, ClientError, getPublishedVenues(), getVenueById(), from (+12 more)

### Community 108 - "@tanstack/react-query"
Cohesion: 0.24
Nodes (9): @tanstack/react-query, feedErrorMessage(), KEYS, Deps, PostSubmission, PublishResult, setup(), usePublishPost() (+1 more)

### Community 109 - "@testing-library/react-native"
Cohesion: 0.11
Nodes (15): expo-brightness@~58.0.2, expo-brightness, @testing-library/react-native, claim, mockClaims, mockToken, getBrightness, setBrightness (+7 more)

### Community 110 - "QRTicket.tsx"
Cohesion: 0.20
Nodes (11): QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus (+3 more)

### Community 111 - "useAdminVenueEvents.ts"
Cohesion: 0.15
Nodes (13): StaffEventsScreen(), defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+5 more)

### Community 113 - "tokens.ts"
Cohesion: 0.26
Nodes (10): contrastRatio(), parseHex(), relativeLuminance(), ColorScheme, glassOnCover, Palette, palettes, scrim (+2 more)

### Community 114 - "FeedScreenContent.test.tsx"
Cohesion: 0.20
Nodes (9): onOpenPost, onOpenProfileSetup, post, renderFeed(), useFeedPosts(), encodeCursor(), FeedPost, keysetFilter() (+1 more)

### Community 115 - "VenuesMapScreenContent.test.tsx"
Cohesion: 0.29
Nodes (6): onOpenEvent, onOpenVenue, panorama, renderScreen(), tonight, venue

### Community 117 - "sharePost.ts"
Cohesion: 0.53
Nodes (4): expo-linking@~58.0.16, expo-linking, postLink(), sharePost()

### Community 118 - "uploadPostImage"
Cohesion: 0.50
Nodes (3): 0012 — Post image upload through XHR, randomSuffix(), uploadPostImage()

### Community 119 - "feed.test.ts"
Cohesion: 0.24
Nodes (7): createComment(), createPost(), editPost(), invokeFeedWrite(), chain(), q, invoke

### Community 120 - "tabsShell.test.tsx"
Cohesion: 0.50
Nodes (3): EventsScreen(), mockNavigate, mockPush

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1004 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `t` to `supabase.ts`, `Button.tsx`, `supabase.ts`, `VenueScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `ui.test.tsx`, `EventsScreenContent.tsx`, `FeedScreenContent`, `useClaimOffer.ts`, `Hola Fest — design rules`, `VenueEventsList.tsx`, `DjScreenContent.tsx`, `kyivDayKey`, `components/TaxiBar.tsx`, `TicketScreenContent.tsx`, `ScannerScreenContent.tsx`, `AppText`, `ProfileSetupForm.tsx`, `app/_layout.tsx`, `applications.ts`, `react-native`, `TicketScreenContent`, `@tanstack/react-query`, `@testing-library/react-native`, `FeedScreenContent.test.tsx`, `VenuesMapScreenContent.test.tsx`, `tabsShell.test.tsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `devDependencies`, `supabase.ts`, `Button.tsx`, `ui/index.ts`, `VenueScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `dependencies`, `ui.test.tsx`, `EventsScreenContent.tsx`, `t`, `FeedScreenContent`, `VenueEventsList.tsx`, `DjScreenContent.tsx`, `kyivDayKey`, `components/TaxiBar.tsx`, `TextField`, `HolaStar.tsx`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `ScannerScreenContent.tsx`, `claimedTokens.ts`, `AppText`, `ProfileSetupForm.tsx`, `brand`, `TicketScreenContent`, `QRTicket.tsx`, `tokens.ts`, `sharePost.ts`, `tabsShell.test.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Why does `react` connect `t` to `devDependencies`, `ui/index.ts`, `VenueScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `dependencies`, `ui.test.tsx`, `EventsScreenContent.tsx`, `useOfferEditor.ts`, `useClaimOffer.ts`, `DjScreenContent.tsx`, `components/TaxiBar.tsx`, `TextField`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `useEvents.ts`, `sessionStore.ts`, `useScanRedeem.ts`, `AppText`, `ProfileSetupForm.tsx`, `app/_layout.tsx`, `useFeed.ts`, `applications.ts`, `react-native`, `useEventEditor.ts`, `TicketScreenContent`, `services/venues.ts`, `@tanstack/react-query`, `@testing-library/react-native`, `QRTicket.tsx`, `useAdminVenueEvents.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `Hola Fest — Product` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._