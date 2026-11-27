# Graph Report - hola-fest  (2026-11-27)

## Corpus Check
- 492 files · ~172,617 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2752 nodes · 7646 edges · 132 communities (121 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 133 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `92d53557`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- devDependencies
- expo
- Hola Fest — Architecture
- compilerOptions
- t
- scripts
- Hola Fest — Product
- with
- with
- AGENTS.md
- steps
- EventsScreenContent.tsx
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- usePostPage.ts
- 0001-foundation.md
- Hola Fest — design rules
- _layout.tsx
- task.md
- pull_request_template.md
- auth.ts
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- AppText
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- expo-linking@~58.0.16
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
- useSession
- Quick Reference
- DjApplicationForm.tsx
- EventFormArea.tsx
- djProfileRules.ts
- services/admin.ts
- ProfileSetupForm.tsx
- PostScreenContent.tsx
- sessionStore.ts
- build
- Hola Fest — design rules
- usePublishPost.ts
- DjScreenContent.tsx
- @tanstack/react-query
- feed.ts
- components/TaxiBar.tsx
- services/djs.ts
- ui/index.ts
- EventForm.tsx
- VenueMap.tsx
- services/claims.ts
- venueProfile.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- services/events.ts
- ScannerScreenContent
- feed-post/handler.ts
- react-native-safe-area-context
- EventDetails.tsx
- FeedComposerFlow
- 0008-eas-cloud-builds.md
- auth/index.ts
- ProfileScreenContent.tsx
- app/_layout.tsx
- useDjCabinet.ts
- OffersArea.tsx
- venueDashboard.ts
- applications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- radius
- space
- useEventEditor.ts
- expo-router
- VenueScreenContent.tsx
- react
- VenueEventsList.test.tsx
- ContentMenu.tsx
- types/admin.ts
- 0011-offer-builder-model.md
- theme/index.ts
- database.ts
- pickAvatar
- eventDjs.ts
- QRTicket.tsx
- ApplicationsReviewContent.tsx
- @testing-library/react-native
- postImagePaths
- DjCabinetScreenContent
- VenueProfileArea.tsx
- ApplicationScreenContent.tsx
- shareEvent.ts
- TicketScreens.test.tsx
- jest
- i18n/index.ts
- MyTicketsContent.tsx
- FakeXhr
- supabase.ts
- chain

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 221 edges
2. `useTheme()` - 209 edges
3. `t()` - 195 edges
4. `react-native` - 144 edges
5. `Button()` - 113 edges
6. `space` - 94 edges
7. `react` - 71 edges
8. `radius` - 62 edges
9. `@testing-library/react-native` - 56 edges
10. `useSession()` - 53 edges

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

## Communities (132 total, 11 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (47): Builder and cabinet kit, ChoiceCard(), OfferDraft, OfferPreview(), StepIndicator(), Stepper(), styles, TimeWindow (+39 more)

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

### Community 5 - "t"
Cohesion: 0.11
Nodes (48): GigRow(), formatHomeDate(), styles, Dashboard(), DjCabinetScreenContentProps, MyGigs(), styles, gigRowProps() (+40 more)

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

### Community 12 - "EventsScreenContent.tsx"
Cohesion: 0.13
Nodes (19): HomeHeader(), tabBarInset(), eventsOnDay(), filterEvents(), HOME_FILTER_IDS, HomeFilterId, CarouselSkeleton(), EmptyDay() (+11 more)

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

### Community 20 - "usePostPage.ts"
Cohesion: 0.20
Nodes (23): feedErrorMessage(), refreshFeed(), useAddComment(), useAuthorPosts(), useBlockAuthor(), useComments(), useDeleteContent(), useEditPost() (+15 more)

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.10
Nodes (33): styles, TeamForVenue(), ROLE_KEY, styles, TeamPanel(), cabinetKeys, useAcceptInvite(), useCancelInvite() (+25 more)

### Community 23 - "_layout.tsx"
Cohesion: 0.06
Nodes (35): concurrency, cancel-in-progress, group, DIR, GH_TOKEN, PR, REPO, SHA (+27 more)

### Community 24 - "task.md"
Cohesion: 0.33
Nodes (5): Acceptance criteria, Dependencies, Goal, Out of scope, Owner & allowed paths

### Community 25 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): How it was verified, Security checklist (if data, auth or offers are touched), What changed

### Community 26 - "auth.ts"
Cohesion: 0.20
Nodes (15): Deps, AuthError, AuthErrorCode, ClientError, confirmEmailCode(), ensureGuestSession(), getSession(), onAuthChange() (+7 more)

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
Cohesion: 0.05
Nodes (79): ApplyScreen(), EventScreen(), PostScreen(), ProfileScreen(), ProfileSetupScreen(), StaffLogin(), styles, FeedScreen() (+71 more)

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
Nodes (32): expo-image, react-native, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles, TEXT (+24 more)

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
Nodes (30): CollapsibleSection(), ClubRow, clubRows(), eventAt(), venue(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS (+22 more)

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

### Community 58 - "useSession"
Cohesion: 0.15
Nodes (16): @expo/vector-icons, AuthorScreen(), useSession(), AuthorScreenContent(), AuthorScreenContentProps, Message(), styles, author (+8 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "DjApplicationForm.tsx"
Cohesion: 0.24
Nodes (11): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+3 more)

### Community 61 - "EventFormArea.tsx"
Cohesion: 0.18
Nodes (12): StaffEventFormScreen(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), defaultServices, eventOffersQueryKey() (+4 more)

### Community 62 - "djProfileRules.ts"
Cohesion: 0.16
Nodes (14): BIO_MAX, buildProfileSave(), DjProfileErrors, DjProfileFormValues, DjProfileSave, GENRES_MAX, isLocalUri(), STAGE_NAME_MAX (+6 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (27): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+19 more)

### Community 64 - "ProfileSetupForm.tsx"
Cohesion: 0.20
Nodes (13): session(), HANDLE_HINTS, ProfileSetupFormProps, styles, HANDLE_DEBOUNCE_MS, HandleStatus, useHandleAvailability(), useSaveProfile() (+5 more)

### Community 65 - "PostScreenContent.tsx"
Cohesion: 0.14
Nodes (16): buildCommentThreads(), CommentThread, Message(), PostScreenContent(), openCommentMenu(), renderComment(), whenReady(), styles (+8 more)

### Community 66 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "usePublishPost.ts"
Cohesion: 0.38
Nodes (5): Deps, PostSubmission, PublishResult, setup(), usePublishPost()

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.15
Nodes (20): DjScreen(), DjsScreen(), DjRow(), filterDjsByName(), genresLine(), alex, nova, DjScreenContent() (+12 more)

### Community 71 - "@tanstack/react-query"
Cohesion: 0.15
Nodes (22): @tanstack/react-query, EditPostSheetProps, feedKeys, FeedScreenContent(), like(), whenReady(), Message(), styles (+14 more)

### Community 72 - "feed.ts"
Cohesion: 0.09
Nodes (28): ADR-0012, 0012 — Post image upload through XHR, CommentDraft, createPost(), encodeCursor(), FeedAuthorRow, FeedCommentRow, FeedLabel (+20 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.13
Nodes (22): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBar(), TaxiBarProps, destination (+14 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.13
Nodes (23): usePublishMyDj(), djSlug(), normalizeDjName(), byNextGigThenName(), DjEventRow, DjsError, DjsErrorCode, getLineupTextDjs() (+15 more)

### Community 75 - "ui/index.ts"
Cohesion: 0.05
Nodes (62): react-native-svg, ChipProps, styles, CollapsibleSectionProps, styles, COMPOSER_MAX_PHOTOS, ComposerProps, DAY_PILL_HEIGHT (+54 more)

### Community 76 - "EventForm.tsx"
Cohesion: 0.14
Nodes (22): EventForm(), EventFormProps, styles, base, emptyEventForm, EventFormErrors, EventFormValues, LINEUP_DJS_MAX (+14 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (35): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+27 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.09
Nodes (25): requestPermission, Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims() (+17 more)

### Community 79 - "venueProfile.ts"
Cohesion: 0.14
Nodes (25): ClientError, toVenueCabinetError(), VenueCabinetError, VenueCabinetErrorCode, addVenuePhoto(), getMyVenueProfile(), listPhotos(), PhotoRow (+17 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.23
Nodes (14): AccentBlobs(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow(), formatCountdown() (+6 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.18
Nodes (13): StaffEventsScreen(), StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps (+5 more)

### Community 83 - "services/events.ts"
Cohesion: 0.10
Nodes (34): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+26 more)

### Community 84 - "ScannerScreenContent"
Cohesion: 0.39
Nodes (4): ScannerScreen(), ScannerScreenContent(), useScanRedeem(), onCodeScanned()

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "react-native-safe-area-context"
Cohesion: 0.09
Nodes (31): react-native-safe-area-context, CabinetScreen(), CabinetTeamScreen(), AcceptInviteAreaProps, editorBase, homeBase, profile, teamBase (+23 more)

### Community 87 - "EventDetails.tsx"
Cohesion: 0.14
Nodes (20): GlassIconButton(), HolaStar(), coverImageUri(), EventDetails(), EventDetailsProps, styles, CTA_BY_STATE, EventOfferCard() (+12 more)

### Community 88 - "FeedComposerFlow"
Cohesion: 0.19
Nodes (15): expo-secure-store, FeedComposerFlow(), acceptRules(), afterAuthor(), hasSeenFeedRules(), markFeedRulesSeen(), mockStore, useMyClubs() (+7 more)

### Community 90 - "auth/index.ts"
Cohesion: 0.27
Nodes (8): SignInToPostSheetProps, styles, Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade(), isValidEmail()

### Community 91 - "ProfileScreenContent.tsx"
Cohesion: 0.14
Nodes (18): SignInToPostSheet(), useStaffLogin(), PostRow(), ProfileScreenContent(), ProfileScreenContentProps, styles, session(), signOut (+10 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.26
Nodes (8): expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, expo-splash-screen, expo-status-bar, RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 93 - "useDjCabinet.ts"
Cohesion: 0.14
Nodes (20): DjProfileEditorProps, djCabinetKeys, useMyDjProfile(), useMyGigs(), getMyDjProfile(), getMyGigs(), GigRow, ProfileRow (+12 more)

### Community 94 - "OffersArea.tsx"
Cohesion: 0.05
Nodes (58): 0013 — Offer builder saves offers with direct table writes, Consequences, Context, Decision, CabinetOffersScreen(), StatusPillProps, OfferRowAction, offerRowActions() (+50 more)

### Community 95 - "venueDashboard.ts"
Cohesion: 0.16
Nodes (15): listVenueEvents(), listVenueOfferStats(), countClaims(), DashboardOffer, getVenueDashboard(), listLiveOffers(), LiveOfferRow, startOfDay() (+7 more)

### Community 96 - "applications.ts"
Cohesion: 0.12
Nodes (27): pending, applicationKeys, Decision, SubmitInput, useDecideApplication(), useSubmitApplication(), submit(), ApplicationError (+19 more)

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

### Community 103 - "radius"
Cohesion: 0.05
Nodes (49): ButtonProps, ButtonVariant, styles, EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps (+41 more)

### Community 104 - "space"
Cohesion: 0.07
Nodes (28): AppTextProps, Tone, BottomSheetProps, styles, ChoiceCardProps, styles, FEED_RULES, FeedRulesSheetProps (+20 more)

### Community 105 - "useEventEditor.ts"
Cohesion: 0.10
Nodes (22): EventSubmission, defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+14 more)

### Community 106 - "expo-router"
Cohesion: 0.23
Nodes (5): expo-router, AcceptInviteScreen(), TicketScreen(), BackRouter, goBackOr()

### Community 107 - "VenueScreenContent.tsx"
Cohesion: 0.07
Nodes (37): VenueScreen(), useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, Message(), styles, onBack (+29 more)

### Community 108 - "react"
Cohesion: 0.29
Nodes (10): react, DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField() (+2 more)

### Community 109 - "VenueEventsList.test.tsx"
Cohesion: 0.40
Nodes (4): base, draft, published, VenueEventsListProps

### Community 110 - "ContentMenu.tsx"
Cohesion: 0.18
Nodes (11): ContentMenu(), ContentMenuProps, MenuTarget, OpenMenu(), confirmBlock(), confirmDelete(), sendReport(), Stage (+3 more)

### Community 111 - "types/admin.ts"
Cohesion: 0.22
Nodes (7): EventOffersSectionProps, base, offer, AdminOffer, AdminVenue, EventStatus, OfferInput

### Community 113 - "theme/index.ts"
Cohesion: 0.10
Nodes (25): styles, FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles, OfferLifecycleStatus, STATUS_LABEL (+17 more)

### Community 114 - "database.ts"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 115 - "pickAvatar"
Cohesion: 0.24
Nodes (11): expo-image-manipulator, expo-image-picker, DjApplicationForm(), pickPhoto(), addPhoto(), choosePhoto(), AVATAR_MAX_SIDE_PX, fitWithin() (+3 more)

### Community 116 - "eventDjs.ts"
Cohesion: 0.20
Nodes (14): useDjSearch(), djMediaUrl(), toDjsError(), escapeLike(), getEventDjs(), LinkRow, OptionRow, searchPublishedDjs() (+6 more)

### Community 117 - "QRTicket.tsx"
Cohesion: 0.19
Nodes (12): QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps (+4 more)

### Community 118 - "ApplicationsReviewContent.tsx"
Cohesion: 0.46
Nodes (5): StaffApplicationsScreen(), ApplicationsReviewContent(), styles, useIsSuperadmin(), usePendingApplications()

### Community 119 - "@testing-library/react-native"
Cohesion: 0.17
Nodes (16): @testing-library/react-native, getClaimToken(), rememberClaimToken(), tokenKey(), claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL (+8 more)

### Community 120 - "postImagePaths"
Cohesion: 0.70
Nodes (3): save(), postImagePath(), postImagePaths()

### Community 121 - "DjCabinetScreenContent"
Cohesion: 0.67
Nodes (3): DjCabinetScreen(), DjCabinetScreenContent(), Message()

### Community 122 - "VenueProfileArea.tsx"
Cohesion: 0.19
Nodes (15): CabinetProfileScreen(), cabinetErrorText(), useRemoveVenuePhoto(), useSaveVenueProfile(), useUploadVenueCover(), useUploadVenuePhoto(), useVenueProfile(), Message() (+7 more)

### Community 124 - "ApplicationScreenContent.tsx"
Cohesion: 0.24
Nodes (9): ApplicationScreenContent(), ApplicationScreenContentProps, ApplicationStatusView(), currentApplication(), styles, useMyApplications(), AccountApplication, ApplicationKind (+1 more)

### Community 126 - "shareEvent.ts"
Cohesion: 0.33
Nodes (6): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent(), shareVenue(), venueLink()

### Community 131 - "TicketScreens.test.tsx"
Cohesion: 0.20
Nodes (8): expo-brightness@~58.0.2, expo-brightness, claim, mockClaims, mockToken, getBrightness, setBrightness, useMaxBrightness()

### Community 133 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 134 - "i18n/index.ts"
Cohesion: 0.12
Nodes (13): EventsScreen(), FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), TabBarItem, UseStaffLogin, KEYS (+5 more)

### Community 135 - "MyTicketsContent.tsx"
Cohesion: 0.23
Nodes (10): ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps, styles (+2 more)

### Community 140 - "supabase.ts"
Cohesion: 0.13
Nodes (15): @supabase/supabase-js, profileKeys, Deps, ProfileSubmission, SaveProfileResult, env, listMyPosts(), MyProfile (+7 more)

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1086 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `expo-linking@~58.0.16` to `package.json`, `t`, `i18n/index.ts`, `MyTicketsContent.tsx`, `EventsScreenContent.tsx`, `Hola Fest — design rules`, `AppText`, `package.json`, `VenuesMapScreenContent.tsx`, `dependencies`, `useSession`, `DjApplicationForm.tsx`, `EventFormArea.tsx`, `ProfileSetupForm.tsx`, `PostScreenContent.tsx`, `DjScreenContent.tsx`, `@tanstack/react-query`, `components/TaxiBar.tsx`, `ui/index.ts`, `EventForm.tsx`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `react-native-safe-area-context`, `EventDetails.tsx`, `FeedComposerFlow`, `auth/index.ts`, `ProfileScreenContent.tsx`, `OffersArea.tsx`, `radius`, `space`, `expo-router`, `VenueScreenContent.tsx`, `ContentMenu.tsx`, `theme/index.ts`, `QRTicket.tsx`, `ApplicationsReviewContent.tsx`, `DjCabinetScreenContent`, `VenueProfileArea.tsx`, `ApplicationScreenContent.tsx`, `shareEvent.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08672699849170437 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `package.json`, `TicketScreens.test.tsx`, `i18n/index.ts`, `MyTicketsContent.tsx`, `EventsScreenContent.tsx`, `supabase.ts`, `usePostPage.ts`, `Hola Fest — design rules`, `auth.ts`, `AppText`, `VenuesMapScreenContent.tsx`, `useSession`, `DjApplicationForm.tsx`, `EventFormArea.tsx`, `ProfileSetupForm.tsx`, `PostScreenContent.tsx`, `Hola Fest — design rules`, `usePublishPost.ts`, `DjScreenContent.tsx`, `@tanstack/react-query`, `components/TaxiBar.tsx`, `EventForm.tsx`, `services/claims.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent`, `react-native-safe-area-context`, `EventDetails.tsx`, `FeedComposerFlow`, `auth/index.ts`, `ProfileScreenContent.tsx`, `app/_layout.tsx`, `OffersArea.tsx`, `applications.ts`, `VenueScreenContent.tsx`, `ContentMenu.tsx`, `theme/index.ts`, `pickAvatar`, `ApplicationsReviewContent.tsx`, `@testing-library/react-native`, `DjCabinetScreenContent`, `VenueProfileArea.tsx`, `ApplicationScreenContent.tsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `AppText()` connect `AppText` to `package.json`, `t`, `MyTicketsContent.tsx`, `EventsScreenContent.tsx`, `Hola Fest — design rules`, `expo-linking@~58.0.16`, `VenuesMapScreenContent.tsx`, `useSession`, `DjApplicationForm.tsx`, `EventFormArea.tsx`, `ProfileSetupForm.tsx`, `PostScreenContent.tsx`, `DjScreenContent.tsx`, `@tanstack/react-query`, `components/TaxiBar.tsx`, `ui/index.ts`, `EventForm.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent`, `react-native-safe-area-context`, `EventDetails.tsx`, `FeedComposerFlow`, `auth/index.ts`, `ProfileScreenContent.tsx`, `OffersArea.tsx`, `radius`, `space`, `VenueScreenContent.tsx`, `react`, `ContentMenu.tsx`, `theme/index.ts`, `pickAvatar`, `QRTicket.tsx`, `ApplicationsReviewContent.tsx`, `DjCabinetScreenContent`, `VenueProfileArea.tsx`, `ApplicationScreenContent.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._