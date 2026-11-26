# Graph Report - hola-fest  (2026-11-26)

## Corpus Check
- 436 files · ~148,526 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2425 nodes · 6265 edges · 130 communities (115 shown, 15 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 101 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `51326319`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
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
- space
- useTheme
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
- EventsScreenContent.tsx
- Quick Reference
- VenueApplicationForm.tsx
- EventFormArea.tsx
- t
- services/admin.ts
- OfferForm.tsx
- FeedScreenContent.tsx
- claims.test.ts
- build
- Hola Fest — design rules
- SignInToPostSheet.tsx
- DjScreenContent.tsx
- VenueEventsList.tsx
- feed.ts
- components/TaxiBar.tsx
- services/djs.ts
- radius
- EventForm.tsx
- VenueMap.tsx
- services/claims.ts
- venueProfile.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- useEvents.ts
- @testing-library/react-native
- feed-post/handler.ts
- sessionStore.ts
- MyTicketsContent.tsx
- TicketScreens.test.tsx
- 0008-eas-cloud-builds.md
- AppText
- useSession
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
- ui/index.ts
- types/admin.ts
- [offerId].tsx
- services/venues.ts
- i18n/index.ts
- useMaxBrightness.test.tsx
- QRTicket.tsx
- useAdminVenueEvents.ts
- 0011-offer-builder-model.md
- theme/index.ts
- react-native
- pickAvatar.ts
- FakeXhr
- shareVenue.ts
- uploadPostImage
- feed.test.ts
- Button
- expo-constants@~58.0.15
- package.json
- database.ts
- ApplicationScreenContent.tsx
- 0007 — Taxi deep links
- shareEvent.ts
- expo-glass-effect
- expo-splash-screen
- expo-status-bar

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
- `Decision` --references--> `openTaxiLink()`  [INFERRED]
  docs/decisions/0007-taxi-deep-links.md → src/lib/taxi.ts
- `Code quality` --references--> `claimOffer()`  [INFERRED]
  CLAUDE.md → src/services/claims.ts
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts

## Import Cycles
- None detected.

## Communities (130 total, 15 thin omitted)

### Community 0 - "react"
Cohesion: 0.13
Nodes (17): react, @tanstack/react-query, session(), HANDLE_HINTS, ProfileSetupForm(), ProfileSetupFormProps, styles, HANDLE_DEBOUNCE_MS (+9 more)

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
Cohesion: 0.15
Nodes (25): DayStripDay, LineupChip(), coverImageUri(), EventDetails(), styles, carouselCardProps(), CurfewInfo, curfewInfo() (+17 more)

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
Cohesion: 0.12
Nodes (20): EventDetailsProps, event, onBack, onOpenDj, onOpenVenue, renderScreen(), ClientError, EventDetailsRow (+12 more)

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
Cohesion: 0.12
Nodes (25): ClientError, toVenueCabinetError(), VenueCabinetError, VenueCabinetErrorCode, getMyVenueProfile(), listPhotos(), toPhoto(), toProfile() (+17 more)

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
Cohesion: 0.19
Nodes (16): AuthError, AuthErrorCode, ClientError, confirmEmailCode(), ensureGuestSession(), getSession(), onAuthChange(), requestEmailCode() (+8 more)

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
Cohesion: 0.17
Nodes (23): eventsOnDay(), homeDays(), weekDays(), dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek() (+15 more)

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

### Community 36 - "space"
Cohesion: 0.11
Nodes (30): @expo/vector-icons, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles, TEXT, CommentRow() (+22 more)

### Community 37 - "useTheme"
Cohesion: 0.10
Nodes (28): expo-router, EventScreen(), ProfileScreen(), ProfileSetupScreen(), StaffApplicationsScreen(), DjsScreen(), MapScreen(), VenueScreen() (+20 more)

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
Cohesion: 0.23
Nodes (17): GlassSearchField(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base, TodayOffer (+9 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, expo-device@~58.0.5, expo-image@~58.0.18, expo-image-manipulator@~58.0.16, expo-image-picker@~58.0.10, expo-router@~58.0.30, expo-symbols@~58.0.4, @expo/ui@~58.0.27 (+21 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "EventsScreenContent.tsx"
Cohesion: 0.06
Nodes (41): EventsScreen(), Chip(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip(), DayStripProps, styles (+33 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenueApplicationForm.tsx"
Cohesion: 0.18
Nodes (18): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+10 more)

### Community 61 - "EventFormArea.tsx"
Cohesion: 0.18
Nodes (12): StaffEventFormScreen(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, useEventEditor(), venueEventQueryKey(), defaultServices (+4 more)

### Community 62 - "t"
Cohesion: 0.19
Nodes (13): StaffLogin(), styles, SessionError(), SessionErrorProps, styles, StaffLoginForm(), StaffLoginFormProps, styles (+5 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (29): defaultServices, Services, AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns() (+21 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.11
Nodes (26): StaffOfferFormScreen(), OfferForm(), OfferFormProps, styles, base, OfferFormArea(), OfferFormAreaProps, styles (+18 more)

### Community 65 - "FeedScreenContent.tsx"
Cohesion: 0.16
Nodes (14): FeedScreen(), FeedScreenContent(), like(), whenReady(), FeedScreenContentProps, Message(), styles, onOpenPost (+6 more)

### Community 66 - "claims.test.ts"
Cohesion: 0.15
Nodes (9): claimKeys, useClaimToken(), useMyClaims(), ClaimsError, getMyClaims(), from, getSession, invoke (+1 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "SignInToPostSheet.tsx"
Cohesion: 0.16
Nodes (13): SignInToPostSheet(), SignInToPostSheetProps, styles, Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade() (+5 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.16
Nodes (21): DjScreen(), filterDjsByName(), genresLine(), gigRowProps(), nextGigLine(), alex, nova, DjScreenContent() (+13 more)

### Community 71 - "VenueEventsList.tsx"
Cohesion: 0.11
Nodes (24): formatHomeDate(), dayTile(), formatEventDay(), formatEventTime(), TicketRow(), EventRow(), EventRowProps, Skeleton() (+16 more)

### Community 72 - "feed.ts"
Cohesion: 0.12
Nodes (20): ADR-0012, env, CommentDraft, encodeCursor(), FeedLabel, FeedPage, FeedRow, FeedWriteResult (+12 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.17
Nodes (19): styles, TaxiBar(), TaxiBarProps, destination, openMock, EventTaxiBar(), EventTaxiBarProps, PLACEHOLDER_PROVIDERS (+11 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.22
Nodes (12): djSlug(), normalizeDjName(), DjEventRow, DjsError, DjsErrorCode, getDjBySlug(), getUpcomingDjs(), groupDjs() (+4 more)

### Community 75 - "radius"
Cohesion: 0.10
Nodes (29): expo-image, react-native-svg, CollapsibleSectionProps, styles, EventCarouselCard(), EventCarouselCardProps, styles, GigRowProps (+21 more)

### Community 76 - "EventForm.tsx"
Cohesion: 0.19
Nodes (17): EventForm(), EventFormProps, styles, base, emptyEventForm, EventFormErrors, EventFormValues, EventSubmission (+9 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (36): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+28 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.12
Nodes (24): Deps, FAILURE_REASON, ScanState, ClaimButtonState, FAILURE_STATE, mockClaim, setup(), useClaimOffer() (+16 more)

### Community 79 - "venueProfile.ts"
Cohesion: 0.13
Nodes (19): addVenuePhoto(), PhotoRow, ProfileRow, randomSuffix(), removeVenuePhoto(), chain(), from, mockProfileQueries() (+11 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.26
Nodes (13): detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow(), formatCountdown(), formatValidUntil() (+5 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.22
Nodes (11): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+3 more)

### Community 83 - "useEvents.ts"
Cohesion: 0.18
Nodes (14): WEDNESDAY, useEvent(), useEventsForDay(), useEventsForWeek(), useHomeEvents(), EventsError, getEventById(), getEventsForRange() (+6 more)

### Community 84 - "@testing-library/react-native"
Cohesion: 0.15
Nodes (11): @testing-library/react-native, ScannerScreen(), FloatingTabBar(), ITEMS, TabsLayout(), ScannerScreenContent(), requestPermission, useScanRedeem() (+3 more)

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.22
Nodes (9): TicketsScreen(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps (+1 more)

### Community 88 - "TicketScreens.test.tsx"
Cohesion: 0.13
Nodes (22): expo-secure-store@~58.0.2, expo-secure-store, FeedComposerFlow(), acceptRules(), addPhoto(), afterAuthor(), hasSeenFeedRules(), markFeedRulesSeen() (+14 more)

### Community 90 - "AppText"
Cohesion: 0.16
Nodes (18): AppText(), BottomSheet(), BottomSheetProps, styles, Composer(), FEED_RULES, FeedRulesSheet(), FeedRulesSheetProps (+10 more)

### Community 91 - "useSession"
Cohesion: 0.14
Nodes (25): react-native-safe-area-context, useSession(), PostRow(), ProfileScreenContent(), ProfileScreenContentProps, styles, session(), signOut (+17 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.46
Nodes (4): RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 93 - "useFeed.ts"
Cohesion: 0.26
Nodes (11): feedKeys, FeedData, post(), seed(), useFeedPosts(), useMyClubs(), useToggleLike(), withLike() (+3 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.11
Nodes (27): callOfferAction(), ClientError, duplicateOffer(), endOffer(), formatKyivTime(), generateOfferTerms(), generateOfferTitle(), OFFER_KINDS (+19 more)

### Community 95 - "venueDashboard.ts"
Cohesion: 0.15
Nodes (16): listVenueEvents(), listVenueOfferStats(), countClaims(), DashboardOffer, getVenueDashboard(), listLiveOffers(), LiveOfferRow, startOfDay() (+8 more)

### Community 96 - "applications.ts"
Cohesion: 0.12
Nodes (27): applicationKeys, Decision, SubmitInput, useDecideApplication(), useSubmitApplication(), submit(), ApplicationError, ApplicationErrorCode (+19 more)

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
Cohesion: 0.06
Nodes (47): Builder and cabinet kit, AccentBlobs(), styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles, GlassPillButton() (+39 more)

### Community 104 - "ui/index.ts"
Cohesion: 0.06
Nodes (60): AppTextProps, Tone, ButtonProps, ButtonVariant, styles, ChoiceCard(), ChoiceCardProps, styles (+52 more)

### Community 105 - "types/admin.ts"
Cohesion: 0.12
Nodes (11): EventOffersSectionProps, base, offer, admin, event, start, AdminEvent, AdminOffer (+3 more)

### Community 106 - "[offerId].tsx"
Cohesion: 0.43
Nodes (3): TicketScreen(), BackRouter, goBackOr()

### Community 107 - "services/venues.ts"
Cohesion: 0.06
Nodes (43): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue, eventAt() (+35 more)

### Community 108 - "i18n/index.ts"
Cohesion: 0.12
Nodes (18): FeedComposerFlowProps, Stage, styles, feedErrorMessage(), KEYS, Deps, PostSubmission, PublishResult (+10 more)

### Community 109 - "useMaxBrightness.test.tsx"
Cohesion: 0.38
Nodes (5): expo-brightness@~58.0.2, expo-brightness, getBrightness, setBrightness, useMaxBrightness()

### Community 110 - "QRTicket.tsx"
Cohesion: 0.25
Nodes (9): DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles (+1 more)

### Community 111 - "useAdminVenueEvents.ts"
Cohesion: 0.15
Nodes (14): StaffEventsScreen(), defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+6 more)

### Community 113 - "theme/index.ts"
Cohesion: 0.26
Nodes (11): contrastRatio(), parseHex(), relativeLuminance(), ColorScheme, glassOnCover, Palette, palettes, scanResult (+3 more)

### Community 114 - "react-native"
Cohesion: 0.15
Nodes (13): react-native, LINEUP_CHIP_HEIGHT, LineupChipProps, styles, FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps (+5 more)

### Community 115 - "pickAvatar.ts"
Cohesion: 0.36
Nodes (7): expo-image-manipulator, expo-image-picker, AVATAR_MAX_SIDE_PX, fitWithin(), pickPostPhoto(), POST_PHOTO_MAX_SIDE_PX, granted

### Community 117 - "shareVenue.ts"
Cohesion: 0.53
Nodes (4): expo-linking@~58.0.16, expo-linking, shareVenue(), venueLink()

### Community 118 - "uploadPostImage"
Cohesion: 0.50
Nodes (3): 0012 — Post image upload through XHR, randomSuffix(), uploadPostImage()

### Community 119 - "feed.test.ts"
Cohesion: 0.24
Nodes (7): createComment(), createPost(), editPost(), invokeFeedWrite(), chain(), q, invoke

### Community 120 - "Button"
Cohesion: 0.31
Nodes (8): Button(), ApplicationCard(), ApplicationsReviewContent(), styles, pending, useIsSuperadmin(), usePendingApplications(), listPendingApplications()

### Community 122 - "package.json"
Cohesion: 0.09
Nodes (22): expo@~58.0.23, expo-camera@~58.0.14, expo-font@~58.0.11, expo-system-ui@~58.0.7, expo-web-browser@~58.0.7, react-native-gesture-handler@~3.3.0, react-native-reanimated@4.7.1, react-native-screens@~4.30.1 (+14 more)

### Community 123 - "database.ts"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 124 - "ApplicationScreenContent.tsx"
Cohesion: 0.40
Nodes (7): ApplyScreen(), ApplicationScreenContent(), ApplicationScreenContentProps, ApplicationStatusView(), currentApplication(), styles, useMyApplications()

### Community 125 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1005 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `t` to `react`, `supabase.ts`, `Button.tsx`, `useTheme`, `VenuesMapScreenContent.tsx`, `EventsScreenContent.tsx`, `VenueApplicationForm.tsx`, `EventFormArea.tsx`, `OfferForm.tsx`, `FeedScreenContent.tsx`, `Hola Fest — design rules`, `SignInToPostSheet.tsx`, `DjScreenContent.tsx`, `VenueEventsList.tsx`, `components/TaxiBar.tsx`, `EventForm.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `@testing-library/react-native`, `MyTicketsContent.tsx`, `TicketScreens.test.tsx`, `AppText`, `useSession`, `app/_layout.tsx`, `services/venues.ts`, `i18n/index.ts`, `react-native`, `Button`, `ApplicationScreenContent.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.12615384615384614 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `react`, `supabase.ts`, `Button.tsx`, `space`, `useTheme`, `VenuesMapScreenContent.tsx`, `dependencies`, `EventsScreenContent.tsx`, `VenueApplicationForm.tsx`, `EventFormArea.tsx`, `t`, `OfferForm.tsx`, `FeedScreenContent.tsx`, `SignInToPostSheet.tsx`, `DjScreenContent.tsx`, `VenueEventsList.tsx`, `components/TaxiBar.tsx`, `radius`, `EventForm.tsx`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `MyTicketsContent.tsx`, `TicketScreens.test.tsx`, `AppText`, `useSession`, `brand`, `ui/index.ts`, `[offerId].tsx`, `i18n/index.ts`, `QRTicket.tsx`, `theme/index.ts`, `shareVenue.ts`, `Button`, `package.json`, `ApplicationScreenContent.tsx`, `shareEvent.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `useTheme`, `VenuesMapScreenContent.tsx`, `dependencies`, `EventsScreenContent.tsx`, `VenueApplicationForm.tsx`, `EventFormArea.tsx`, `t`, `OfferForm.tsx`, `FeedScreenContent.tsx`, `claims.test.ts`, `SignInToPostSheet.tsx`, `DjScreenContent.tsx`, `components/TaxiBar.tsx`, `radius`, `EventForm.tsx`, `VenueMap.tsx`, `services/claims.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `useEvents.ts`, `sessionStore.ts`, `MyTicketsContent.tsx`, `AppText`, `useSession`, `app/_layout.tsx`, `useFeed.ts`, `ui/index.ts`, `types/admin.ts`, `services/venues.ts`, `i18n/index.ts`, `useMaxBrightness.test.tsx`, `QRTicket.tsx`, `useAdminVenueEvents.ts`, `Button`, `package.json`, `ApplicationScreenContent.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._