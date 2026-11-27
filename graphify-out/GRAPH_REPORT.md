# Graph Report - hola-fest  (2026-11-27)

## Corpus Check
- 499 files · ~174,720 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2786 nodes · 7763 edges · 133 communities (118 shown, 15 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a893544d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- devDependencies
- expo
- Hola Fest — Architecture
- compilerOptions
- eventFormat.ts
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
- t
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- PostScreenContent.tsx
- expo-symbols@~58.0.4
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
- AuthorScreenContent.test.tsx
- Quick Reference
- useAdminVenueEvents.ts
- @testing-library/react-native
- djProfileRules.ts
- services/admin.ts
- @tanstack/react-query
- PostScreenContent.test.tsx
- OffersArea.tsx
- build
- Hola Fest — design rules
- usePublishPost.ts
- DjsScreenContent.tsx
- useFeed.ts
- feed.ts
- components/TaxiBar.tsx
- services/djs.ts
- ui/index.ts
- offerBuilder.test.tsx
- VenueMap.tsx
- services/claims.ts
- useCabinet.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- services/events.ts
- useScanRedeem.ts
- feed-post/handler.ts
- cabinet/index.ts
- EventDetails.tsx
- secureStorage.ts
- 0008-eas-cloud-builds.md
- types/offerBuilder.ts
- useSession
- app/_layout.tsx
- useDjCabinet.ts
- services/offerBuilder.ts
- supabase.ts
- applications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- theme/index.ts
- AppText
- useEventEditor.ts
- [offerId].tsx
- services/venues.ts
- kyivTime.ts
- VenueEventsList.tsx
- moderation.ts
- venueProfile.test.ts
- 0011-offer-builder-model.md
- QRTicket.tsx
- claimedTokens.ts
- pickAvatar
- eventDjs.ts
- sharePost.ts
- 0007 — Taxi deep links
- useClaimOffer.ts
- postImagePaths
- 0013 — Offer builder saves offers with direct table writes
- VenueProfileArea.tsx
- TimeWindowPicker.tsx
- expo-constants@~58.0.15
- toqr
- VenueScreenContent.tsx
- jest
- MyTicketsContent.tsx
- FakeXhr
- @supabase/supabase-js
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

## Communities (133 total, 15 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.12
Nodes (35): DetailsErrors, INTENT_STATUS, isDraftValid(), kindNeedsValue(), LimitsErrors, MAX_PER_GUEST, normalizedValue(), OFFER_TERMS_MAX_LENGTH (+27 more)

### Community 1 - "devDependencies"
Cohesion: 0.10
Nodes (26): devDependencies, eslint-config-prettier@^10.1.8, eslint-plugin-prettier@^5.5.7, jest@^30.5.2, jest-expo@^58.0.14, playwright@^1.64.1, prettier@^3.9.10, @testing-library/react-native@^14.1.0 (+18 more)

### Community 2 - "expo"
Cohesion: 0.06
Nodes (31): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, projectId (+23 more)

### Community 3 - "Hola Fest — Architecture"
Cohesion: 0.18
Nodes (10): { defineConfig }, expoConfig, NO_FEATURES_IN_UI, NO_SERVICES_IN_UI, prettierRecommended, SUPABASE_ONLY_IN_SERVICES, eslint@^9.39.5, eslint-config-expo@^58.0.4 (+2 more)

### Community 4 - "compilerOptions"
Cohesion: 0.17
Nodes (11): expo/tsconfig.base, compilerOptions, noFallthroughCasesInSwitch, noUncheckedIndexedAccess, paths, strict, types, exclude (+3 more)

### Community 5 - "eventFormat.ts"
Cohesion: 0.16
Nodes (27): formatHomeDate(), HomeHeader(), styles, gigRowProps(), nextGigLine(), carouselCardProps(), CurfewInfo, dayFromId() (+19 more)

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
Nodes (22): EventsScreen(), MapScreen(), DayStrip(), FilterChips(), VenueRow(), HOME_FILTER_IDS, HomeFilterId, CarouselSkeleton() (+14 more)

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
Cohesion: 0.21
Nodes (21): refreshFeed(), useAddComment(), useAuthorPosts(), useBlockAuthor(), useComments(), useDeleteContent(), useEditPost(), useFeedAuthor() (+13 more)

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.10
Nodes (30): TeamForVenue(), useAcceptInvite(), useCancelInvite(), useInviteStaff(), useRemoveMember(), useVenueInvites(), useVenueMembers(), ClientError (+22 more)

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
Cohesion: 0.11
Nodes (24): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+16 more)

### Community 27 - "expo-glass-effect@~58.0.5"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, deno-version, fetch-depth, node-version (+5 more)

### Community 28 - "expo-image@~58.0.18"
Cohesion: 0.04
Nodes (47): 1. Tests BEFORE Code, 2. Coverage Requirements, 3. Test Types, 4. Git Checkpoints, API Integration Test Pattern, Best Practices, Bun Native Test Pattern (`bun:test`), CI/CD Integration (+39 more)

### Community 29 - "expo-linking@~58.0.16"
Cohesion: 0.20
Nodes (10): GITHUB_TOKEN, secrets-scan, permissions, contents, pull-requests, name, permissions, runs-on (+2 more)

### Community 30 - "t"
Cohesion: 0.07
Nodes (66): react, react-native-safe-area-context, ApplyScreen(), Button(), Chip(), GigRow(), TextField(), ApplicationScreenContent() (+58 more)

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

### Community 36 - "PostScreenContent.tsx"
Cohesion: 0.05
Nodes (61): @expo/vector-icons, PostScreen(), FeedScreen(), AuthorScreen(), AuthorKind, AuthorLabel(), AuthorLabelProps, FILL (+53 more)

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
Nodes (30): formatEventTime(), ClubRow, clubRows(), eventAt(), venue(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS (+22 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.05
Nodes (41): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-image-manipulator@~58.0.16 (+33 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "AuthorScreenContent.test.tsx"
Cohesion: 0.14
Nodes (12): author, onBack, onOpenPost, post, renderAuthor(), EditPostSheetProps, onOpenPost, onOpenProfileSetup (+4 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "useAdminVenueEvents.ts"
Cohesion: 0.17
Nodes (12): StaffEventsScreen(), defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+4 more)

### Community 61 - "@testing-library/react-native"
Cohesion: 0.13
Nodes (14): @testing-library/react-native, EventFormProps, base, EventOffersSectionProps, base, offer, defaultServices, eventOffersQueryKey() (+6 more)

### Community 62 - "djProfileRules.ts"
Cohesion: 0.12
Nodes (22): safeLinkUrl(), DjProfileEditorProps, addGenre(), BIO_MAX, buildProfileSave(), DjProfileErrors, DjProfileFormValues, DjProfileSave (+14 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (26): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+18 more)

### Community 64 - "@tanstack/react-query"
Cohesion: 0.08
Nodes (37): @tanstack/react-query, Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade(), session(), ProfileScreenContentProps (+29 more)

### Community 65 - "PostScreenContent.test.tsx"
Cohesion: 0.19
Nodes (8): buildCommentThreads(), CommentThread, onBack, onOpenAuthor, onOpenProfileSetup, post, renderPost(), FeedComment

### Community 66 - "OffersArea.tsx"
Cohesion: 0.22
Nodes (14): offerBuilderErrorText(), draftFromOffer(), Mode, styles, VenueOffers(), ACTIONS, offerBuilderKeys, OfferListAction (+6 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "usePublishPost.ts"
Cohesion: 0.17
Nodes (11): 0012 — Post image upload through XHR, feedErrorMessage(), KEYS, Deps, PostSubmission, PublishResult, setup(), usePublishPost() (+3 more)

### Community 70 - "DjsScreenContent.tsx"
Cohesion: 0.20
Nodes (16): GlassSearchField(), tabBarInset(), filterDjsByName(), genresLine(), alex, nova, DjsScreenContent(), DjsScreenContentProps (+8 more)

### Community 71 - "useFeed.ts"
Cohesion: 0.23
Nodes (13): feedKeys, FeedData, post(), seed(), useFeedPosts(), useMyClubs(), useToggleLike(), withLike() (+5 more)

### Community 72 - "feed.ts"
Cohesion: 0.12
Nodes (24): ADR-0012, CommentDraft, createPost(), encodeCursor(), FeedAuthorRow, FeedCommentRow, FeedLabel, FeedRow (+16 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.17
Nodes (18): styles, TaxiBar(), TaxiBarProps, destination, openMock, EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles (+10 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.15
Nodes (19): djSlug(), normalizeDjName(), byNextGigThenName(), DjEventRow, DjsErrorCode, getLineupTextDjs(), getPublishedProfileDjs(), groupDjs() (+11 more)

### Community 75 - "ui/index.ts"
Cohesion: 0.03
Nodes (108): expo-image, react-native, react-native-svg, FloatingTabBar(), ITEMS, TabsLayout(), Tone, BottomSheetProps (+100 more)

### Community 76 - "offerBuilder.test.tsx"
Cohesion: 0.18
Nodes (9): CabinetOffersScreen(), listBase, readyDraft, wizardBase, emptyOfferDraft, OffersArea(), OffersAreaProps, OffersListProps (+1 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (34): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+26 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.11
Nodes (18): requestPermission, ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+10 more)

### Community 79 - "useCabinet.ts"
Cohesion: 0.17
Nodes (22): cabinetKeys, useRemoveVenuePhoto(), useSaveVenueProfile(), useUploadVenueCover(), useUploadVenuePhoto(), useVenueProfile(), addVenuePhoto(), getMyVenueProfile() (+14 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.12
Nodes (22): expo-brightness@~58.0.2, expo-brightness, AccentBlobs(), QRTicketStatus, detailsText(), pillText(), styles, TicketScreenContent() (+14 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.18
Nodes (12): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+4 more)

### Community 83 - "services/events.ts"
Cohesion: 0.10
Nodes (34): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+26 more)

### Community 84 - "useScanRedeem.ts"
Cohesion: 0.21
Nodes (8): ScanFailureReason, Deps, FAILURE_REASON, ScanState, useScanRedeem(), onCodeScanned(), RedeemClaimResult, RedeemFailureReason

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "cabinet/index.ts"
Cohesion: 0.10
Nodes (24): CabinetScreen(), CabinetProfileScreen(), AcceptInviteAreaProps, editorBase, homeBase, profile, teamBase, canUseCabinet() (+16 more)

### Community 87 - "EventDetails.tsx"
Cohesion: 0.11
Nodes (23): EventScreen(), GlassIconButton(), InfoChip(), coverImageUri(), EventDetails(), EventDetailsProps, styles, curfewInfo() (+15 more)

### Community 88 - "secureStorage.ts"
Cohesion: 0.19
Nodes (14): expo-secure-store@~58.0.2, expo-secure-store, acceptRules(), afterAuthor(), hasSeenFeedRules(), markFeedRulesSeen(), mockStore, mockRead (+6 more)

### Community 90 - "types/offerBuilder.ts"
Cohesion: 0.21
Nodes (9): StatusPillProps, OfferRowAction, offerRowActions(), pillStatus(), BuilderOffer, OfferKind, OfferStats, OfferStatus (+1 more)

### Community 91 - "useSession"
Cohesion: 0.07
Nodes (39): expo-router, AcceptInviteScreen(), CabinetTeamScreen(), DjCabinetScreen(), ProfileScreen(), ProfileSetupScreen(), ScannerScreen(), StaffApplicationsScreen() (+31 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.26
Nodes (8): expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, expo-splash-screen, expo-status-bar, RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 93 - "useDjCabinet.ts"
Cohesion: 0.18
Nodes (18): djCabinetKeys, usePublishMyDj(), useSaveDjProfile(), getMyDjProfile(), getMyGigs(), GigRow, ProfileRow, randomSuffix() (+10 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.12
Nodes (24): callOfferAction(), ClientError, duplicateOffer(), endOffer(), formatKyivTime(), generateOfferTerms(), OFFER_KINDS, OFFER_STATUSES (+16 more)

### Community 95 - "supabase.ts"
Cohesion: 0.11
Nodes (19): env, listVenueEvents(), listVenueOfferStats(), rpc, supabase, countClaims(), DashboardOffer, getVenueDashboard() (+11 more)

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

### Community 103 - "theme/index.ts"
Cohesion: 0.05
Nodes (51): styles, EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles (+43 more)

### Community 104 - "AppText"
Cohesion: 0.08
Nodes (47): Builder and cabinet kit, DjScreen(), VenueScreen(), AppText(), ChoiceCard(), styles, ImageUploader(), styles (+39 more)

### Community 105 - "useEventEditor.ts"
Cohesion: 0.09
Nodes (27): emptyEventForm, EventFormErrors, EventFormValues, EventSubmission, eventToFormValues(), LINEUP_DJS_MAX, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS (+19 more)

### Community 106 - "[offerId].tsx"
Cohesion: 0.43
Nodes (3): TicketScreen(), BackRouter, goBackOr()

### Community 107 - "services/venues.ts"
Cohesion: 0.09
Nodes (29): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, Message(), onBack, onOpenEvent, onOpenMap (+21 more)

### Community 108 - "kyivTime.ts"
Cohesion: 0.17
Nodes (18): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), TextFieldProps, CURFEW_KYIV_HOUR, endsBeforeCurfew() (+10 more)

### Community 109 - "VenueEventsList.tsx"
Cohesion: 0.20
Nodes (11): EventCard(), EventRow(), EventRowProps, Skeleton(), styles, base, draft, published (+3 more)

### Community 110 - "moderation.ts"
Cohesion: 0.14
Nodes (19): item, ModerationAction, moderationKeys, runModerationAction(), useModerationAction(), useModerationQueue(), ReportReason, AuthorRow (+11 more)

### Community 111 - "venueProfile.test.ts"
Cohesion: 0.25
Nodes (8): chain(), from, mockProfileQueries(), photoRow, Result, storageFrom, venueRow, venueMediaUrl()

### Community 113 - "QRTicket.tsx"
Cohesion: 0.11
Nodes (24): AppTextProps, QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket() (+16 more)

### Community 114 - "claimedTokens.ts"
Cohesion: 0.50
Nodes (4): getClaimToken(), tokenKey(), useClaimToken(), useMyClaims()

### Community 115 - "pickAvatar"
Cohesion: 0.25
Nodes (10): expo-image-manipulator, expo-image-picker, pickPhoto(), addPhoto(), choosePhoto(), AVATAR_MAX_SIDE_PX, fitWithin(), pickAvatar() (+2 more)

### Community 116 - "eventDjs.ts"
Cohesion: 0.16
Nodes (15): LineupDjPickerProps, useDjSearch(), djMediaUrl(), escapeLike(), getEventDjs(), LinkRow, OptionRow, searchPublishedDjs() (+7 more)

### Community 117 - "sharePost.ts"
Cohesion: 0.53
Nodes (4): expo-linking@~58.0.16, expo-linking, postLink(), sharePost()

### Community 118 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 119 - "useClaimOffer.ts"
Cohesion: 0.17
Nodes (15): rememberClaimToken(), claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState (+7 more)

### Community 120 - "postImagePaths"
Cohesion: 0.70
Nodes (3): save(), postImagePath(), postImagePaths()

### Community 121 - "0013 — Offer builder saves offers with direct table writes"
Cohesion: 0.40
Nodes (4): 0013 — Offer builder saves offers with direct table writes, Consequences, Context, Decision

### Community 122 - "VenueProfileArea.tsx"
Cohesion: 0.33
Nodes (7): cabinetErrorText(), ProfileEditorForVenue(), pickCover(), pickPhoto(), styles, addPhoto(), pickPostPhoto()

### Community 123 - "TimeWindowPicker.tsx"
Cohesion: 0.40
Nodes (4): styles, TimeWindow, TimeWindowPicker(), TimeWindowPickerProps

### Community 124 - "expo-constants@~58.0.15"
Cohesion: 0.33
Nodes (4): expo-constants@~58.0.15, react-native-web@~0.21.4, expo-constants, react-native-web

### Community 126 - "VenueScreenContent.tsx"
Cohesion: 0.19
Nodes (15): CollapsibleSection(), shareVenue(), venueLink(), styles, VenueBody(), VenueScreenContentProps, WeekOfEvents(), WhereIsIt() (+7 more)

### Community 133 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 135 - "MyTicketsContent.tsx"
Cohesion: 0.20
Nodes (11): TicketsScreen(), LoyaltyStampCard(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent() (+3 more)

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1098 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `ui/index.ts` to `package.json`, `devDependencies`, `eventFormat.ts`, `MyTicketsContent.tsx`, `Button.tsx`, `t`, `PostScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `dependencies`, `@tanstack/react-query`, `OffersArea.tsx`, `DjsScreenContent.tsx`, `components/TaxiBar.tsx`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `EventDetails.tsx`, `secureStorage.ts`, `useSession`, `theme/index.ts`, `AppText`, `[offerId].tsx`, `VenueEventsList.tsx`, `QRTicket.tsx`, `sharePost.ts`, `VenueProfileArea.tsx`, `TimeWindowPicker.tsx`, `VenueScreenContent.tsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.12233285917496443 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `package.json`, `eventFormat.ts`, `MyTicketsContent.tsx`, `Button.tsx`, `expo-constants@~58.0.15`, `PostScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `AuthorScreenContent.test.tsx`, `@tanstack/react-query`, `PostScreenContent.test.tsx`, `OffersArea.tsx`, `Hola Fest — design rules`, `usePublishPost.ts`, `DjsScreenContent.tsx`, `components/TaxiBar.tsx`, `ui/index.ts`, `offerBuilder.test.tsx`, `services/claims.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `cabinet/index.ts`, `EventDetails.tsx`, `useSession`, `app/_layout.tsx`, `applications.ts`, `AppText`, `services/venues.ts`, `VenueEventsList.tsx`, `moderation.ts`, `useClaimOffer.ts`, `VenueProfileArea.tsx`, `VenueScreenContent.tsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
- **Why does `@tanstack/react-query` connect `@tanstack/react-query` to `devDependencies`, `Button.tsx`, `jest`, `t`, `PostScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `dependencies`, `AuthorScreenContent.test.tsx`, `useAdminVenueEvents.ts`, `@testing-library/react-native`, `PostScreenContent.test.tsx`, `OffersArea.tsx`, `usePublishPost.ts`, `DjsScreenContent.tsx`, `useFeed.ts`, `useCabinet.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `services/events.ts`, `EventDetails.tsx`, `useSession`, `app/_layout.tsx`, `useDjCabinet.ts`, `applications.ts`, `useEventEditor.ts`, `services/venues.ts`, `moderation.ts`, `claimedTokens.ts`, `eventDjs.ts`, `useClaimOffer.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._