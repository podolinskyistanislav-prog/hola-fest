# Graph Report - hola-fest  (2026-11-27)

## Corpus Check
- 501 files · ~176,536 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2789 nodes · 7768 edges · 131 communities (120 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe587181`
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
- tabsShell.test.tsx
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- feed.ts
- 0001-foundation.md
- Hola Fest — design rules
- _layout.tsx
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- AppText
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- AuthorScreenContent.tsx
- package.json
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
- radius
- Quick Reference
- VenueEventsList.tsx
- types/admin.ts
- djProfileRules.ts
- services/admin.ts
- ProfileSetupForm.tsx
- PostScreenContent
- OffersArea.tsx
- build
- Hola Fest — design rules
- usePublishPost.ts
- DjsScreenContent.tsx
- @tanstack/react-query
- space
- components/TaxiBar.tsx
- services/djs.ts
- ui/index.ts
- services/events.ts
- VenueMap.tsx
- services/claims.ts
- useCabinet.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- kyivDayKey
- useScanRedeem.ts
- feed-post/handler.ts
- react-native-safe-area-context
- EventDetails.tsx
- FeedComposerFlow
- 0008-eas-cloud-builds.md
- OffersList.tsx
- useSession
- app/_layout.tsx
- DjCabinetScreenContent.tsx
- services/offerBuilder.ts
- venueDashboard.ts
- applications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- eventFormValidation.ts
- kit.test.tsx
- react-native
- EventFormArea.tsx
- [offerId].tsx
- services/venues.ts
- ApplicationScreenContent.tsx
- sessionStore.ts
- ModerationContent.tsx
- venueProfile.test.ts
- 0011-offer-builder-model.md
- brand
- @testing-library/react-native
- VenueProfileArea.tsx
- eventDjs.ts
- shareEvent.ts
- 0007 — Taxi deep links
- useClaimOffer.ts
- postImagePaths
- 0013 — Offer builder saves offers with direct table writes
- TeamArea.tsx
- applicationRules.ts
- database.ts
- cabinetAccess.ts
- t
- jest
- MyTicketsContent.tsx
- FakeXhr
- chain

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 224 edges
2. `useTheme()` - 213 edges
3. `t()` - 200 edges
4. `react-native` - 146 edges
5. `Button()` - 116 edges
6. `space` - 95 edges
7. `react` - 72 edges
8. `radius` - 63 edges
9. `@testing-library/react-native` - 57 edges
10. `useSession()` - 57 edges

## Surprising Connections (you probably didn't know these)
- `Rules for agents` --references--> `t()`  [INFERRED]
  docs/design/mockups/README.md → src/lib/i18n/index.ts
- `Context` --references--> `readSecret()`  [INFERRED]
  docs/decisions/0009-web-secret-storage-fallback.md → src/lib/secureStorage.ts
- `Decision` --references--> `openTaxiLink()`  [INFERRED]
  docs/decisions/0007-taxi-deep-links.md → src/lib/taxi.ts
- `Code quality` --references--> `claimOffer()`  [INFERRED]
  CLAUDE.md → src/services/claims.ts
- `Decision` --references--> `saveVenueOffer()`  [INFERRED]
  docs/decisions/0013-offer-builder-direct-writes.md → src/services/offerBuilder.ts

## Import Cycles
- None detected.

## Communities (131 total, 11 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.11
Nodes (39): ChoiceCard(), TimeWindowPicker(), ErrorText(), DetailsErrors, emptyOfferDraft, INTENT_STATUS, isDraftValid(), kindNeedsValue() (+31 more)

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
Cohesion: 0.10
Nodes (34): FilterChips(), formatHomeDate(), HomeHeader(), styles, carouselCardProps(), dayFromId(), dayTile(), eventsOnDay() (+26 more)

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

### Community 12 - "tabsShell.test.tsx"
Cohesion: 0.50
Nodes (3): EventsScreen(), mockNavigate, mockPush

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

### Community 20 - "feed.ts"
Cohesion: 0.09
Nodes (49): ADR-0012, 0012 — Post image upload through XHR, refreshFeed(), useAddComment(), useAuthorPosts(), useBlockAuthor(), useComments(), useDeleteContent() (+41 more)

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.14
Nodes (22): ClientError, toVenueCabinetError(), VenueCabinetError, VenueCabinetErrorCode, acceptVenueInvite(), CabinetRow, cancelVenueInvite(), InviteRow (+14 more)

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
Cohesion: 0.15
Nodes (18): @supabase/supabase-js, env, AuthError, AuthErrorCode, ClientError, confirmEmailCode(), ensureGuestSession(), getSession() (+10 more)

### Community 27 - "expo-glass-effect@~58.0.5"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, deno-version, fetch-depth, node-version (+5 more)

### Community 28 - "expo-image@~58.0.18"
Cohesion: 0.04
Nodes (47): 1. Tests BEFORE Code, 2. Coverage Requirements, 3. Test Types, 4. Git Checkpoints, API Integration Test Pattern, Best Practices, Bun Native Test Pattern (`bun:test`), CI/CD Integration (+39 more)

### Community 29 - "expo-linking@~58.0.16"
Cohesion: 0.20
Nodes (10): GITHUB_TOKEN, secrets-scan, permissions, contents, pull-requests, name, permissions, runs-on (+2 more)

### Community 30 - "AppText"
Cohesion: 0.06
Nodes (79): react, StaffApplicationsScreen(), StaffLogin(), styles, AppText(), BottomSheet(), Button(), Chip() (+71 more)

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

### Community 36 - "AuthorScreenContent.tsx"
Cohesion: 0.09
Nodes (23): AuthorScreen(), SignInToPostSheet(), AuthorScreenContent(), Message(), styles, author, onBack, onOpenPost (+15 more)

### Community 37 - "package.json"
Cohesion: 0.08
Nodes (24): expo-glass-effect@~58.0.5, expo-symbols@~58.0.4, @expo/ui@~58.0.27, react-dom@19.3.0, @react-native-async-storage/async-storage@2.2.0, react-native-gesture-handler@~3.3.0, react-native-reanimated@4.7.1, react-native-screens@~4.30.1 (+16 more)

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
Cohesion: 0.23
Nodes (7): ClaimDeps, ClaimResult, ERRORS, handleClaimOffer(), json(), sha256Hex(), toHex()

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
Cohesion: 0.13
Nodes (30): formatEventTime(), ClubRow, clubRows(), eventAt(), venue(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS (+22 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-device@~58.0.5, expo-font@~58.0.11, expo-image@~58.0.18, expo-image-manipulator@~58.0.16 (+23 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "radius"
Cohesion: 0.08
Nodes (33): expo-image, react-native-svg, CollapsibleSectionProps, styles, EventCarouselCard(), EventCarouselCardProps, styles, GigRowProps (+25 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenueEventsList.tsx"
Cohesion: 0.11
Nodes (19): defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), myVenuesQueryKey (+11 more)

### Community 61 - "types/admin.ts"
Cohesion: 0.13
Nodes (14): EventOffersSectionProps, base, offer, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers (+6 more)

### Community 62 - "djProfileRules.ts"
Cohesion: 0.15
Nodes (15): BIO_MAX, buildProfileSave(), DjProfileErrors, DjProfileFormValues, DjProfileSave, GENRES_MAX, isLocalUri(), STAGE_NAME_MAX (+7 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (27): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+19 more)

### Community 64 - "ProfileSetupForm.tsx"
Cohesion: 0.18
Nodes (15): session(), HANDLE_HINTS, ProfileSetupForm(), choosePhoto(), ProfileSetupFormProps, styles, HANDLE_DEBOUNCE_MS, HandleStatus (+7 more)

### Community 65 - "PostScreenContent"
Cohesion: 0.13
Nodes (14): PostScreen(), buildCommentThreads(), CommentThread, Message(), PostScreenContent(), openCommentMenu(), renderComment(), whenReady() (+6 more)

### Community 66 - "OffersArea.tsx"
Cohesion: 0.21
Nodes (13): CabinetOffersScreen(), offerBuilderErrorText(), draftFromOffer(), Mode, OffersArea(), OffersAreaProps, styles, VenueOffers() (+5 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "usePublishPost.ts"
Cohesion: 0.26
Nodes (8): feedErrorMessage(), KEYS, Deps, PostSubmission, PublishResult, setup(), usePublishPost(), FeedFailureReason

### Community 70 - "DjsScreenContent.tsx"
Cohesion: 0.17
Nodes (19): DjScreen(), DjRow(), tabBarInset(), filterDjsByName(), genresLine(), alex, nova, DjScreenContent() (+11 more)

### Community 71 - "@tanstack/react-query"
Cohesion: 0.10
Nodes (32): @tanstack/react-query, FeedScreen(), PostCard(), AuthorScreenContentProps, EditPostSheetProps, feedKeys, FeedScreenContent(), like() (+24 more)

### Community 72 - "space"
Cohesion: 0.16
Nodes (18): @expo/vector-icons, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles, TEXT, CommentRow() (+10 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.17
Nodes (18): styles, TaxiBarProps, destination, openMock, EventTaxiBar(), EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles (+10 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.15
Nodes (19): djSlug(), normalizeDjName(), byNextGigThenName(), DjEventRow, DjsErrorCode, getLineupTextDjs(), getPublishedProfileDjs(), groupDjs() (+11 more)

### Community 75 - "ui/index.ts"
Cohesion: 0.04
Nodes (71): FloatingTabBar(), ITEMS, TabsLayout(), AppTextProps, Tone, BottomSheetProps, styles, ButtonProps (+63 more)

### Community 76 - "services/events.ts"
Cohesion: 0.12
Nodes (16): ClientError, EventDetailsRow, EventsErrorCode, EventsFilter, EventSummaryRow, OfferRow, eventRow, from (+8 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (35): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+27 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.10
Nodes (18): requestPermission, ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+10 more)

### Community 79 - "useCabinet.ts"
Cohesion: 0.15
Nodes (24): cabinetKeys, useAcceptInvite(), useRemoveVenuePhoto(), useSaveVenueProfile(), useUploadVenueCover(), useUploadVenuePhoto(), useVenueProfile(), addVenuePhoto() (+16 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.16
Nodes (17): expo-brightness@~58.0.2, expo-brightness, detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow() (+9 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.11
Nodes (24): BANNED_WORDS, demoTexts, feedSection, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText() (+16 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.22
Nodes (11): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+3 more)

### Community 83 - "kyivDayKey"
Cohesion: 0.11
Nodes (38): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), TextFieldProps, weekDays(), dayRange() (+30 more)

### Community 84 - "useScanRedeem.ts"
Cohesion: 0.19
Nodes (9): Deps, FAILURE_REASON, ScanState, useScanRedeem(), onCodeScanned(), ClaimFailureReason, ClaimOfferResult, RedeemClaimResult (+1 more)

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.18
Nodes (26): CommentInput, FeedCommentDeps, handleFeedComment(), call(), FeedPostDeps, handleFeedPost(), parseInput(), PostInput (+18 more)

### Community 86 - "react-native-safe-area-context"
Cohesion: 0.11
Nodes (25): react-native-safe-area-context, StatTile(), AcceptInviteAreaProps, editorBase, homeBase, profile, teamBase, CabinetArea() (+17 more)

### Community 87 - "EventDetails.tsx"
Cohesion: 0.12
Nodes (21): EventScreen(), coverImageUri(), EventDetails(), EventDetailsProps, styles, CurfewInfo, curfewInfo(), formatPriceFrom() (+13 more)

### Community 88 - "FeedComposerFlow"
Cohesion: 0.19
Nodes (15): expo-secure-store, FeedComposerFlow(), acceptRules(), addPhoto(), afterAuthor(), hasSeenFeedRules(), markFeedRulesSeen(), mockStore (+7 more)

### Community 90 - "OffersList.tsx"
Cohesion: 0.14
Nodes (18): StatusPillProps, OfferRowAction, offerRowActions(), pillStatus(), listBase, readyDraft, wizardBase, ACTION_LABEL (+10 more)

### Community 91 - "useSession"
Cohesion: 0.08
Nodes (40): expo-router, AcceptInviteScreen(), CabinetScreen(), CabinetProfileScreen(), CabinetTeamScreen(), DjCabinetScreen(), ScannerScreen(), StaffEventFormScreen() (+32 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.26
Nodes (8): expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, expo-splash-screen, expo-status-bar, RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 93 - "DjCabinetScreenContent.tsx"
Cohesion: 0.13
Nodes (25): DjCabinetScreenContent(), DjCabinetScreenContentProps, Message(), styles, DjProfileEditorProps, djCabinetKeys, useMyDjProfile(), useMyGigs() (+17 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.12
Nodes (29): ACTIONS, offerBuilderKeys, OfferListAction, callOfferAction(), ClientError, duplicateOffer(), endOffer(), formatKyivTime() (+21 more)

### Community 95 - "venueDashboard.ts"
Cohesion: 0.15
Nodes (15): listVenueEvents(), countClaims(), DashboardOffer, getVenueDashboard(), listLiveOffers(), LiveOfferRow, startOfDay(), chain() (+7 more)

### Community 96 - "applications.ts"
Cohesion: 0.12
Nodes (27): pending, applicationKeys, Decision, SubmitInput, useSubmitApplication(), submit(), ApplicationError, ApplicationErrorCode (+19 more)

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 99 - "cors.ts"
Cohesion: 0.23
Nodes (8): admin, admin, admin, admin, ALLOWED_ORIGINS, corsHeaders(), isAllowedOrigin(), withCors()

### Community 100 - "redeem-claim/handler.ts"
Cohesion: 0.27
Nodes (7): FAILURES, handleRedeemClaim(), json(), RedeemDeps, RedeemResult, sha256Hex(), TOKEN

### Community 101 - "Feed rules (Стрічка)"
Cohesion: 0.50
Nodes (3): Enforcement, Feed rules (Стрічка), For everyone (guests, clubs, DJs)

### Community 102 - "eventFormValidation.ts"
Cohesion: 0.18
Nodes (15): emptyEventForm, EventFormErrors, EventFormValues, eventToFormValues(), LINEUP_DJS_MAX, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS, parsePrice() (+7 more)

### Community 103 - "kit.test.tsx"
Cohesion: 0.05
Nodes (49): Builder and cabinet kit, AccentBlobs(), styles, FEATHER_NAME, GlassIconButton(), GlassIconButtonProps, GlassIconName, styles (+41 more)

### Community 104 - "react-native"
Cohesion: 0.06
Nodes (31): react-native, ProfileScreen(), ProfileSetupScreen(), DjsScreen(), MapScreen(), VenueScreen(), ChoiceCardProps, styles (+23 more)

### Community 105 - "EventFormArea.tsx"
Cohesion: 0.14
Nodes (16): EventFormArea(), EventFormAreaProps, EventOffers(), styles, EventSubmission, venueEventsQueryKey(), defaultServices, eventDjsQueryKey() (+8 more)

### Community 106 - "[offerId].tsx"
Cohesion: 0.43
Nodes (3): TicketScreen(), BackRouter, goBackOr()

### Community 107 - "services/venues.ts"
Cohesion: 0.09
Nodes (29): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, Message(), onBack, onOpenEvent, onOpenMap (+21 more)

### Community 108 - "ApplicationScreenContent.tsx"
Cohesion: 0.25
Nodes (9): ApplyScreen(), ApplicationScreenContent(), ApplicationScreenContentProps, ApplicationStatusView(), currentApplication(), styles, useMyApplications(), AccountApplication (+1 more)

### Community 109 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 110 - "ModerationContent.tsx"
Cohesion: 0.12
Nodes (23): useIsSuperadmin(), ModerationCard(), ModerationContent(), reportSummary(), styles, item, ModerationAction, moderationKeys (+15 more)

### Community 111 - "venueProfile.test.ts"
Cohesion: 0.29
Nodes (7): chain(), from, mockProfileQueries(), photoRow, Result, storageFrom, venueRow

### Community 113 - "brand"
Cohesion: 0.09
Nodes (27): INFO_CHIP_HEIGHT, InfoChipProps, styles, QRCard(), QRCardProps, styles, DarkRun, QRCode() (+19 more)

### Community 114 - "@testing-library/react-native"
Cohesion: 0.18
Nodes (8): @testing-library/react-native, setup(), useEmailUpgrade(), Deps, UseStaffLogin, useStaffLogin(), EventFormProps, base

### Community 115 - "VenueProfileArea.tsx"
Cohesion: 0.20
Nodes (14): expo-image-manipulator, expo-image-picker, Message(), ProfileEditorForVenue(), pickCover(), pickPhoto(), styles, VenueProfileArea() (+6 more)

### Community 116 - "eventDjs.ts"
Cohesion: 0.19
Nodes (13): useDjSearch(), djMediaUrl(), escapeLike(), getEventDjs(), LinkRow, OptionRow, searchPublishedDjs(), setEventDjs() (+5 more)

### Community 117 - "shareEvent.ts"
Cohesion: 0.33
Nodes (6): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent(), shareVenue(), venueLink()

### Community 118 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 119 - "useClaimOffer.ts"
Cohesion: 0.19
Nodes (15): getClaimToken(), rememberClaimToken(), tokenKey(), claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim (+7 more)

### Community 120 - "postImagePaths"
Cohesion: 0.70
Nodes (3): save(), postImagePath(), postImagePaths()

### Community 121 - "0013 — Offer builder saves offers with direct table writes"
Cohesion: 0.40
Nodes (4): 0013 — Offer builder saves offers with direct table writes, Consequences, Context, Decision

### Community 122 - "TeamArea.tsx"
Cohesion: 0.28
Nodes (10): cabinetErrorText(), styles, TeamArea(), TeamForVenue(), useCabinetVenue(), useCancelInvite(), useInviteStaff(), useRemoveMember() (+2 more)

### Community 123 - "applicationRules.ts"
Cohesion: 0.26
Nodes (10): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+2 more)

### Community 124 - "database.ts"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 125 - "cabinetAccess.ts"
Cohesion: 0.31
Nodes (7): canUseCabinet(), isValidInstagramUrl(), pickCabinetVenue(), admin, host, owner, CabinetVenue

### Community 126 - "t"
Cohesion: 0.11
Nodes (30): TaxiBar(), GigRow(), InfoChip(), MyGigs(), gigRowProps(), nextGigLine(), DjBody(), DjScreenContentProps (+22 more)

### Community 133 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 135 - "MyTicketsContent.tsx"
Cohesion: 0.15
Nodes (14): TicketsScreen(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps (+6 more)

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1100 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `MyTicketsContent.tsx`, `tabsShell.test.tsx`, `AppText`, `AuthorScreenContent.tsx`, `package.json`, `VenuesMapScreenContent.tsx`, `dependencies`, `radius`, `VenueEventsList.tsx`, `ProfileSetupForm.tsx`, `PostScreenContent`, `OffersArea.tsx`, `DjsScreenContent.tsx`, `@tanstack/react-query`, `space`, `components/TaxiBar.tsx`, `ui/index.ts`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `react-native-safe-area-context`, `EventDetails.tsx`, `FeedComposerFlow`, `OffersList.tsx`, `useSession`, `DjCabinetScreenContent.tsx`, `kit.test.tsx`, `EventFormArea.tsx`, `[offerId].tsx`, `ApplicationScreenContent.tsx`, `ModerationContent.tsx`, `brand`, `VenueProfileArea.tsx`, `shareEvent.ts`, `TeamArea.tsx`, `t`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10852713178294573 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `package.json`, `supabase.ts`, `MyTicketsContent.tsx`, `tabsShell.test.tsx`, `expo-constants@~58.0.15`, `AppText`, `AuthorScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `VenueEventsList.tsx`, `ProfileSetupForm.tsx`, `PostScreenContent`, `OffersArea.tsx`, `Hola Fest — design rules`, `usePublishPost.ts`, `DjsScreenContent.tsx`, `@tanstack/react-query`, `components/TaxiBar.tsx`, `ui/index.ts`, `services/claims.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `react-native-safe-area-context`, `EventDetails.tsx`, `FeedComposerFlow`, `OffersList.tsx`, `useSession`, `app/_layout.tsx`, `DjCabinetScreenContent.tsx`, `applications.ts`, `react-native`, `EventFormArea.tsx`, `services/venues.ts`, `ApplicationScreenContent.tsx`, `ModerationContent.tsx`, `@testing-library/react-native`, `VenueProfileArea.tsx`, `useClaimOffer.ts`, `TeamArea.tsx`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `@tanstack/react-query` connect `@tanstack/react-query` to `supabase.ts`, `MyTicketsContent.tsx`, `tabsShell.test.tsx`, `feed.ts`, `AuthorScreenContent.tsx`, `package.json`, `VenuesMapScreenContent.tsx`, `dependencies`, `VenueEventsList.tsx`, `types/admin.ts`, `ProfileSetupForm.tsx`, `PostScreenContent`, `usePublishPost.ts`, `DjsScreenContent.tsx`, `services/claims.ts`, `useCabinet.ts`, `staff/index.ts`, `kyivDayKey`, `EventDetails.tsx`, `useSession`, `app/_layout.tsx`, `DjCabinetScreenContent.tsx`, `services/offerBuilder.ts`, `applications.ts`, `EventFormArea.tsx`, `services/venues.ts`, `ApplicationScreenContent.tsx`, `ModerationContent.tsx`, `eventDjs.ts`, `useClaimOffer.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._