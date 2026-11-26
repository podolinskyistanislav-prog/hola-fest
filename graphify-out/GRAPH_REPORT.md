# Graph Report - hola-fest  (2026-11-26)

## Corpus Check
- 454 files · ~153,241 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2508 nodes · 6679 edges · 132 communities (119 shown, 13 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 102 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `237995aa`
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
- Button.tsx
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- cabinet/index.ts
- 0001-foundation.md
- Hola Fest — design rules
- _layout.tsx
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- kyivDayKey
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- ui/index.ts
- AppText
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
- package.json
- Accessibility (WCAG 2.2)
- with
- homeComponents.test.tsx
- Quick Reference
- applicationRules.ts
- @tanstack/react-query
- useSession
- services/admin.ts
- OfferForm.tsx
- FeedScreenContent.tsx
- claims.test.ts
- build
- Hola Fest — design rules
- useEmailUpgrade.ts
- DjScreenContent.tsx
- EventsScreenContent.test.tsx
- feed.ts
- taxi.ts
- services/djs.ts
- radius
- eventFormValidation.ts
- VenueMap.tsx
- services/claims.ts
- useCabinet.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- useEvents.ts
- ScannerScreenContent.tsx
- feed-post/handler.ts
- sessionStore.ts
- MyTicketsContent.tsx
- FeedComposerFlow
- 0008-eas-cloud-builds.md
- useVenues.ts
- ProfileScreenContent.tsx
- app/_layout.tsx
- useFeed.ts
- services/offerBuilder.ts
- venueDashboard.test.ts
- applications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- theme/index.ts
- react-native
- useEventEditor.ts
- expo-router
- services/venues.ts
- usePublishPost.ts
- @testing-library/react-native
- VenueProfileArea.tsx
- useAdminVenueEvents.ts
- 0011-offer-builder-model.md
- QRTicket.tsx
- mapHtml.ts
- pickAvatar
- FakeXhr
- sharePost.ts
- uploadPostImage
- feed.test.ts
- TeamArea.tsx
- venueDashboard.ts
- AcceptInviteArea.tsx
- database.ts
- ApplicationScreenContent.tsx
- 0007 — Taxi deep links
- shareEvent.ts
- OfferRow.tsx
- FeedScreenContent.test.tsx
- VenueMap.web.test.tsx
- types/admin.ts
- env.ts

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 192 edges
2. `useTheme()` - 185 edges
3. `t()` - 164 edges
4. `react-native` - 131 edges
5. `Button()` - 94 edges
6. `space` - 84 edges
7. `react` - 63 edges
8. `radius` - 55 edges
9. `@testing-library/react-native` - 54 edges
10. `@tanstack/react-query` - 46 edges

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

## Communities (132 total, 13 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.16
Nodes (14): session(), HANDLE_HINTS, ProfileSetupFormProps, styles, HANDLE_DEBOUNCE_MS, HandleStatus, useHandleAvailability(), profileKeys (+6 more)

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
Nodes (32): coverImageUri(), EventDetails(), styles, carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId(), eventsOnDay() (+24 more)

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
Cohesion: 0.08
Nodes (25): EventDetailsProps, EventOfferCardProps, event, onBack, onOpenDj, onOpenVenue, renderScreen(), ClientError (+17 more)

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

### Community 20 - "cabinet/index.ts"
Cohesion: 0.13
Nodes (18): CabinetScreen(), editorBase, homeBase, profile, teamBase, canUseCabinet(), isValidInstagramUrl(), pickCabinetVenue() (+10 more)

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.13
Nodes (23): ClientError, toVenueCabinetError(), VenueCabinetError, VenueCabinetErrorCode, acceptVenueInvite(), CabinetRow, cancelVenueInvite(), InviteRow (+15 more)

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

### Community 30 - "kyivDayKey"
Cohesion: 0.13
Nodes (32): formatHomeDate(), HomeHeader(), HomeHeaderProps, styles, Dashboard(), gigRowProps(), nextGigLine(), dayTile() (+24 more)

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
Cohesion: 0.06
Nodes (57): expo-image, @expo/vector-icons, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles, TEXT (+49 more)

### Community 37 - "AppText"
Cohesion: 0.06
Nodes (78): react, react-native-safe-area-context, EventScreen(), StaffLogin(), styles, styles, TaxiBar(), AppText() (+70 more)

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
Nodes (23): filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base, TodayOffer, todayOffers() (+15 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.05
Nodes (58): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18 (+50 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "homeComponents.test.tsx"
Cohesion: 0.09
Nodes (27): Chip(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps, styles (+19 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "applicationRules.ts"
Cohesion: 0.26
Nodes (10): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+2 more)

### Community 61 - "@tanstack/react-query"
Cohesion: 0.17
Nodes (13): @tanstack/react-query, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, useEventOffers(), defaultServices (+5 more)

### Community 62 - "useSession"
Cohesion: 0.17
Nodes (10): StaffApplicationsScreen(), StaffEventFormScreen(), StaffOfferFormScreen(), SignInToPostSheetProps, useSession(), Deps, UseStaffLogin, useStaffLogin() (+2 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (28): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+20 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.18
Nodes (16): OfferFormProps, styles, base, OfferFormAreaProps, styles, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH (+8 more)

### Community 65 - "FeedScreenContent.tsx"
Cohesion: 0.11
Nodes (17): DjsScreen(), FeedScreen(), DjRow(), DjRowProps, styles, tabBarInset(), SignInToPostSheet(), DjsScreenContent() (+9 more)

### Community 66 - "claims.test.ts"
Cohesion: 0.15
Nodes (9): claimKeys, useClaimToken(), useMyClaims(), ClaimsError, getMyClaims(), from, getSession, invoke (+1 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "useEmailUpgrade.ts"
Cohesion: 0.26
Nodes (9): Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade(), isValidCode(), isValidDisplayName(), isValidEmail() (+1 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.16
Nodes (18): DjScreen(), filterDjsByName(), genresLine(), alex, nova, DjBody(), DjScreenContent(), DjScreenContentProps (+10 more)

### Community 71 - "EventsScreenContent.test.tsx"
Cohesion: 0.13
Nodes (15): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue, ClubRow (+7 more)

### Community 72 - "feed.ts"
Cohesion: 0.14
Nodes (19): ADR-0012, CommentDraft, encodeCursor(), FeedLabel, FeedPage, FeedRow, FeedWriteResult, getFeedPost() (+11 more)

### Community 73 - "taxi.ts"
Cohesion: 0.18
Nodes (12): TaxiBarProps, destination, openMock, EventTaxiBarProps, buildMainTaxiLink(), buildTaxiLinks(), isValidCoordinate(), LinkOpener (+4 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.23
Nodes (10): djSlug(), normalizeDjName(), DjEventRow, DjsError, DjsErrorCode, groupDjs(), LineupEvent, setMyDjPublished() (+2 more)

### Community 75 - "radius"
Cohesion: 0.10
Nodes (28): react-native-svg, CollapsibleSectionProps, styles, EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors() (+20 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.19
Nodes (14): emptyEventForm, EventFormErrors, EventFormValues, eventToFormValues(), LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS, parsePrice(), start (+6 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.17
Nodes (21): buildMapHtml(), encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue, parseFromMap(), venue (+13 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.10
Nodes (29): Deps, FAILURE_REASON, ScanState, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton() (+21 more)

### Community 79 - "useCabinet.ts"
Cohesion: 0.12
Nodes (29): cabinetKeys, useSaveVenueProfile(), useUploadVenueCover(), useUploadVenuePhoto(), useVenueProfile(), addVenuePhoto(), getMyVenueProfile(), listPhotos() (+21 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.12
Nodes (24): expo-brightness@~58.0.2, expo-brightness, AccentBlobs(), GlassIconButton(), QRCard(), detailsText(), pillText(), styles (+16 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.20
Nodes (12): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+4 more)

### Community 83 - "useEvents.ts"
Cohesion: 0.21
Nodes (19): weekDays(), dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent() (+11 more)

### Community 84 - "ScannerScreenContent.tsx"
Cohesion: 0.18
Nodes (10): expo-camera, ScannerScreen(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles, requestPermission (+2 more)

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.21
Nodes (10): TicketsScreen(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps (+2 more)

### Community 88 - "FeedComposerFlow"
Cohesion: 0.17
Nodes (19): expo-secure-store, FeedComposerFlow(), acceptRules(), addPhoto(), afterAuthor(), submit(), hasSeenFeedRules(), markFeedRulesSeen() (+11 more)

### Community 90 - "useVenues.ts"
Cohesion: 0.30
Nodes (8): VenueScreen(), useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, renderScreen(), VenueScreenContent(), getPublishedVenues()

### Community 91 - "ProfileScreenContent.tsx"
Cohesion: 0.13
Nodes (24): ProfileScreen(), ProfileSetupScreen(), PostRow(), ProfileScreenContent(), ProfileScreenContentProps, styles, ProfileSetupForm(), ProfileSetupScreenContent() (+16 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.26
Nodes (8): expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, expo-splash-screen, expo-status-bar, RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 93 - "useFeed.ts"
Cohesion: 0.28
Nodes (10): FeedData, post(), seed(), useFeedPosts(), useMyClubs(), useToggleLike(), withLike(), likePost() (+2 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.11
Nodes (27): callOfferAction(), ClientError, duplicateOffer(), endOffer(), formatKyivTime(), generateOfferTerms(), generateOfferTitle(), OFFER_KINDS (+19 more)

### Community 95 - "venueDashboard.test.ts"
Cohesion: 0.22
Nodes (7): chain(), events, from, now, Result, setup(), stats

### Community 96 - "applications.ts"
Cohesion: 0.12
Nodes (31): ApplicationsReviewContent(), styles, pending, applicationKeys, Decision, SubmitInput, useDecideApplication(), useIsSuperadmin() (+23 more)

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
Nodes (62): Builder and cabinet kit, styles, AppTextProps, Tone, EventCard(), EventCardProps, EventCoverColor, styles (+54 more)

### Community 104 - "react-native"
Cohesion: 0.08
Nodes (28): react-native, ChoiceCard(), ChoiceCardProps, styles, FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps (+20 more)

### Community 105 - "useEventEditor.ts"
Cohesion: 0.18
Nodes (11): EventSubmission, venueEventsQueryKey(), defaultServices, Services, admin, event, start, UseEventEditor (+3 more)

### Community 106 - "expo-router"
Cohesion: 0.15
Nodes (12): expo-router@~58.0.30, expo-router, EventsScreen(), FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), TicketScreen() (+4 more)

### Community 107 - "services/venues.ts"
Cohesion: 0.11
Nodes (21): onBack, onOpenEvent, onOpenMap, venue, weekEvent, ClientError, getVenueById(), from (+13 more)

### Community 108 - "usePublishPost.ts"
Cohesion: 0.22
Nodes (9): feedErrorMessage(), KEYS, feedKeys, Deps, PostSubmission, PublishResult, setup(), usePublishPost() (+1 more)

### Community 109 - "@testing-library/react-native"
Cohesion: 0.15
Nodes (10): @testing-library/react-native, EventFormProps, base, EventOffersSectionProps, base, offer, base, draft (+2 more)

### Community 110 - "VenueProfileArea.tsx"
Cohesion: 0.27
Nodes (11): CabinetProfileScreen(), useCabinetVenue(), useRemoveVenuePhoto(), Message(), ProfileEditorForVenue(), pickCover(), pickPhoto(), styles (+3 more)

### Community 111 - "useAdminVenueEvents.ts"
Cohesion: 0.17
Nodes (11): StaffEventsScreen(), defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+3 more)

### Community 113 - "QRTicket.tsx"
Cohesion: 0.13
Nodes (19): DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles (+11 more)

### Community 114 - "mapHtml.ts"
Cohesion: 0.21
Nodes (11): inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION, MapHtmlOptions (+3 more)

### Community 115 - "pickAvatar"
Cohesion: 0.24
Nodes (11): expo-image-manipulator, expo-image-picker, DjApplicationForm(), pickPhoto(), addPhoto(), choosePhoto(), AVATAR_MAX_SIDE_PX, fitWithin() (+3 more)

### Community 117 - "sharePost.ts"
Cohesion: 0.33
Nodes (6): expo-linking@~58.0.16, expo-linking, postLink(), sharePost(), shareVenue(), venueLink()

### Community 118 - "uploadPostImage"
Cohesion: 0.50
Nodes (3): 0012 — Post image upload through XHR, randomSuffix(), uploadPostImage()

### Community 119 - "feed.test.ts"
Cohesion: 0.24
Nodes (7): createComment(), createPost(), editPost(), invokeFeedWrite(), chain(), q, invoke

### Community 120 - "TeamArea.tsx"
Cohesion: 0.31
Nodes (9): CabinetTeamScreen(), styles, TeamArea(), TeamForVenue(), useCancelInvite(), useInviteStaff(), useRemoveMember(), useVenueInvites() (+1 more)

### Community 121 - "venueDashboard.ts"
Cohesion: 0.25
Nodes (10): CabinetDashboard(), useVenueDashboard(), listVenueOfferStats(), countClaims(), DashboardOffer, getVenueDashboard(), listLiveOffers(), LiveOfferRow (+2 more)

### Community 122 - "AcceptInviteArea.tsx"
Cohesion: 0.31
Nodes (6): AcceptInviteScreen(), AcceptInviteArea(), AcceptInviteAreaProps, styles, cabinetErrorText(), useAcceptInvite()

### Community 123 - "database.ts"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 124 - "ApplicationScreenContent.tsx"
Cohesion: 0.25
Nodes (9): ApplyScreen(), ApplicationScreenContent(), ApplicationScreenContentProps, ApplicationStatusView(), currentApplication(), styles, useMyApplications(), AccountApplication (+1 more)

### Community 125 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 127 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

### Community 128 - "FeedScreenContent.test.tsx"
Cohesion: 0.33
Nodes (5): onOpenPost, onOpenProfileSetup, post, renderFeed(), FeedPost

### Community 129 - "VenueMap.web.test.tsx"
Cohesion: 0.33
Nodes (4): Listener, listeners, mount(), venue

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1015 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `supabase.ts` to `FeedScreenContent.test.tsx`, `package.json`, `Button.tsx`, `cabinet/index.ts`, `expo-constants@~58.0.15`, `kyivDayKey`, `ui/index.ts`, `AppText`, `VenuesMapScreenContent.tsx`, `useSession`, `OfferForm.tsx`, `FeedScreenContent.tsx`, `Hola Fest — design rules`, `useEmailUpgrade.ts`, `DjScreenContent.tsx`, `EventsScreenContent.test.tsx`, `taxi.ts`, `radius`, `services/claims.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent.tsx`, `MyTicketsContent.tsx`, `FeedComposerFlow`, `useVenues.ts`, `ProfileScreenContent.tsx`, `app/_layout.tsx`, `applications.ts`, `expo-router`, `services/venues.ts`, `usePublishPost.ts`, `VenueProfileArea.tsx`, `pickAvatar`, `TeamArea.tsx`, `AcceptInviteArea.tsx`, `ApplicationScreenContent.tsx`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `Button.tsx`, `kyivDayKey`, `ui/index.ts`, `AppText`, `VenuesMapScreenContent.tsx`, `package.json`, `homeComponents.test.tsx`, `useSession`, `OfferForm.tsx`, `FeedScreenContent.tsx`, `DjScreenContent.tsx`, `taxi.ts`, `radius`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent.tsx`, `MyTicketsContent.tsx`, `FeedComposerFlow`, `useVenues.ts`, `ProfileScreenContent.tsx`, `applications.ts`, `theme/index.ts`, `expo-router`, `VenueProfileArea.tsx`, `QRTicket.tsx`, `sharePost.ts`, `TeamArea.tsx`, `AcceptInviteArea.tsx`, `ApplicationScreenContent.tsx`, `shareEvent.ts`, `OfferRow.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Why does `AppText()` connect `AppText` to `package.json`, `supabase.ts`, `cabinet/index.ts`, `kyivDayKey`, `ui/index.ts`, `VenuesMapScreenContent.tsx`, `homeComponents.test.tsx`, `OfferForm.tsx`, `FeedScreenContent.tsx`, `DjScreenContent.tsx`, `radius`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent.tsx`, `MyTicketsContent.tsx`, `FeedComposerFlow`, `ProfileScreenContent.tsx`, `applications.ts`, `theme/index.ts`, `react-native`, `VenueProfileArea.tsx`, `QRTicket.tsx`, `pickAvatar`, `TeamArea.tsx`, `AcceptInviteArea.tsx`, `ApplicationScreenContent.tsx`, `OfferRow.tsx`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `Hola Fest — Product` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._