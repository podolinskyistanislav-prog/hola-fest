# Graph Report - hola-fest  (2026-11-26)

## Corpus Check
- 474 files · ~163,194 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2660 nodes · 7228 edges · 138 communities (125 shown, 13 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 109 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `592ad14e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- OfferWizard.tsx
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
- cabinetAccess.ts
- 0001-foundation.md
- Hola Fest — design rules
- _layout.tsx
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- Button
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- feedKit.test.tsx
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
- dependencies
- Accessibility (WCAG 2.2)
- with
- ui.test.tsx
- Quick Reference
- VenueApplicationForm.tsx
- EventFormArea.tsx
- DjProfileEditor.tsx
- services/admin.ts
- OffersList.tsx
- FeedScreenContent.tsx
- claims.test.ts
- build
- Hola Fest — design rules
- react
- DjScreenContent.tsx
- package.json
- @tanstack/react-query
- components/TaxiBar.tsx
- services/djs.ts
- radius
- TextField
- VenueMap.tsx
- services/claims.ts
- venueProfile.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- kyivTime.ts
- @testing-library/react-native
- feed-post/handler.ts
- useSession
- MyTicketsContent.tsx
- FeedComposerFlow
- 0008-eas-cloud-builds.md
- VenueScreenContent.tsx
- supabase.ts
- i18n/index.ts
- useDjCabinet.ts
- services/offerBuilder.ts
- venueDashboard.test.ts
- applications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- EventDetails.tsx
- react-native
- useEventEditor.ts
- [offerId].tsx
- services/venues.ts
- AppText.tsx
- VenueEventsList.test.tsx
- VenueProfileArea.tsx
- useApplications.ts
- 0011-offer-builder-model.md
- theme/index.ts
- useClaimOffer.ts
- pickAvatar
- eventDjs.ts
- QRTicket.tsx
- VenueProfileEditor.tsx
- TicketScreens.test.tsx
- useCabinet.ts
- cabinet/index.ts
- AcceptInviteArea.tsx
- database.ts
- ApplicationScreenContent.tsx
- 0007 — Taxi deep links
- shareEvent.ts
- ui/index.ts
- OffersArea.tsx
- EventScreenContent.test.tsx
- EventOffersSection.tsx
- useMaxBrightness.test.tsx
- 0013 — Offer builder saves offers with direct table writes
- jest
- expo-device@~58.0.5
- expo-glass-effect
- expo-splash-screen
- expo-status-bar

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 208 edges
2. `useTheme()` - 197 edges
3. `t()` - 180 edges
4. `react-native` - 137 edges
5. `Button()` - 103 edges
6. `space` - 89 edges
7. `react` - 66 edges
8. `radius` - 59 edges
9. `@testing-library/react-native` - 53 edges
10. `@tanstack/react-query` - 47 edges

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

## Communities (138 total, 13 thin omitted)

### Community 0 - "OfferWizard.tsx"
Cohesion: 0.11
Nodes (38): TimeWindowPicker(), ErrorText(), DetailsErrors, INTENT_STATUS, isDraftValid(), kindNeedsValue(), LimitsErrors, MAX_PER_GUEST (+30 more)

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
Cohesion: 0.14
Nodes (43): formatHomeDate(), nextGigLine(), coverImageUri(), EventDetails(), carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId() (+35 more)

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
Nodes (19): CTA_BY_STATE, EventOfferCardProps, ClientError, EventDetailsRow, EventsErrorCode, EventsFilter, EventSummaryRow, OfferRow (+11 more)

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

### Community 20 - "cabinetAccess.ts"
Cohesion: 0.31
Nodes (7): canUseCabinet(), isValidInstagramUrl(), pickCabinetVenue(), admin, host, owner, CabinetVenue

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.13
Nodes (19): ROLE_KEY, styles, TeamPanelProps, CabinetRow, InviteRow, inviteVenueStaff(), listMyCabinetVenues(), listVenueInvites() (+11 more)

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
Cohesion: 0.21
Nodes (15): @supabase/supabase-js, AuthError, AuthErrorCode, ClientError, confirmEmailCode(), ensureGuestSession(), getSession(), onAuthChange() (+7 more)

### Community 27 - "expo-glass-effect@~58.0.5"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, deno-version, fetch-depth, node-version (+5 more)

### Community 28 - "expo-image@~58.0.18"
Cohesion: 0.04
Nodes (47): 1. Tests BEFORE Code, 2. Coverage Requirements, 3. Test Types, 4. Git Checkpoints, API Integration Test Pattern, Best Practices, Bun Native Test Pattern (`bun:test`), CI/CD Integration (+39 more)

### Community 29 - "expo-linking@~58.0.16"
Cohesion: 0.20
Nodes (10): GITHUB_TOKEN, secrets-scan, permissions, contents, pull-requests, name, permissions, runs-on (+2 more)

### Community 30 - "Button"
Cohesion: 0.19
Nodes (17): react-native-safe-area-context, Button(), GigRow(), DjCabinetScreenContent(), DjCabinetScreenContentProps, Message(), MyGigs(), styles (+9 more)

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

### Community 36 - "feedKit.test.tsx"
Cohesion: 0.12
Nodes (25): expo-image, @expo/vector-icons, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles, TEXT (+17 more)

### Community 37 - "AppText"
Cohesion: 0.07
Nodes (45): StaffLogin(), styles, DjsScreen(), VenueScreen(), AppText(), BottomSheet(), BottomSheetProps, styles (+37 more)

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
Cohesion: 0.26
Nodes (15): filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base, TodayOffer, todayOffers() (+7 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-image@~58.0.18, expo-image-manipulator@~58.0.16, expo-image-picker@~58.0.10, expo-router@~58.0.30, expo-secure-store@~58.0.2 (+21 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "ui.test.tsx"
Cohesion: 0.10
Nodes (22): EventsScreen(), FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), DAY_PILL_HEIGHT, DayStrip(), DayStripDay (+14 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenueApplicationForm.tsx"
Cohesion: 0.23
Nodes (12): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+4 more)

### Community 61 - "EventFormArea.tsx"
Cohesion: 0.21
Nodes (11): EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), defaultServices, eventOffersQueryKey(), Services (+3 more)

### Community 62 - "DjProfileEditor.tsx"
Cohesion: 0.14
Nodes (23): DjProfileEditor(), DjProfileEditorProps, styles, addGenre(), BIO_MAX, buildProfileSave(), DjProfileErrors, DjProfileFormValues (+15 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (29): AdminError, AdminErrorCode, AdminEventListItem, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow (+21 more)

### Community 64 - "OffersList.tsx"
Cohesion: 0.13
Nodes (19): OfferRowAction, offerRowActions(), pillStatus(), listBase, readyDraft, wizardBase, emptyOfferDraft, OfferWizardDraft (+11 more)

### Community 65 - "FeedScreenContent.tsx"
Cohesion: 0.14
Nodes (15): FeedScreen(), SignInToPostSheet(), FeedScreenContent(), like(), whenReady(), FeedScreenContentProps, Message(), styles (+7 more)

### Community 66 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "react"
Cohesion: 0.12
Nodes (22): react, SignInToPostSheetProps, styles, Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade() (+14 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.21
Nodes (14): DjScreen(), alex, nova, DjScreenContent(), DjScreenContentProps, Message(), styles, djKeys (+6 more)

### Community 71 - "package.json"
Cohesion: 0.09
Nodes (22): expo-constants@~58.0.15, expo-font@~58.0.11, expo-symbols@~58.0.4, expo-web-browser@~58.0.7, react-dom@19.3.0, react-native-gesture-handler@~3.3.0, react-native-web@~0.21.4, react-native-webview@14.0.1 (+14 more)

### Community 72 - "@tanstack/react-query"
Cohesion: 0.06
Nodes (48): ADR-0012, 0012 — Post image upload through XHR, @tanstack/react-query, feedKeys, FeedData, post(), seed(), useFeedPosts() (+40 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.17
Nodes (19): styles, TaxiBar(), TaxiBarProps, destination, openMock, EventTaxiBar(), EventTaxiBarProps, PLACEHOLDER_PROVIDERS (+11 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.15
Nodes (19): djSlug(), normalizeDjName(), byNextGigThenName(), DjEventRow, DjsErrorCode, getLineupTextDjs(), getPublishedProfileDjs(), groupDjs() (+11 more)

### Community 75 - "radius"
Cohesion: 0.10
Nodes (27): react-native-svg, DjRowProps, styles, EventCarouselCard(), EventCarouselCardProps, styles, GigRowProps, styles (+19 more)

### Community 76 - "TextField"
Cohesion: 0.11
Nodes (31): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), SwitchField() (+23 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (36): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+28 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.15
Nodes (18): Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+10 more)

### Community 79 - "venueProfile.ts"
Cohesion: 0.17
Nodes (22): toVenueCabinetError(), addVenuePhoto(), getMyVenueProfile(), listPhotos(), PhotoRow, ProfileRow, randomSuffix(), removeVenuePhoto() (+14 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.24
Nodes (14): AccentBlobs(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow(), formatCountdown() (+6 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.12
Nodes (20): getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles, base (+12 more)

### Community 83 - "kyivTime.ts"
Cohesion: 0.12
Nodes (31): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), EventScreenContentProps, styles, WEDNESDAY (+23 more)

### Community 84 - "@testing-library/react-native"
Cohesion: 0.24
Nodes (6): @testing-library/react-native, ScannerScreen(), ScannerScreenContent(), requestPermission, useScanRedeem(), onCodeScanned()

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "useSession"
Cohesion: 0.08
Nodes (28): expo-router, AcceptInviteScreen(), CabinetScreen(), CabinetOffersScreen(), CabinetProfileScreen(), CabinetTeamScreen(), DjCabinetScreen(), StaffApplicationsScreen() (+20 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.22
Nodes (9): TicketsScreen(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps (+1 more)

### Community 88 - "FeedComposerFlow"
Cohesion: 0.19
Nodes (15): expo-secure-store, FeedComposerFlow(), acceptRules(), afterAuthor(), submit(), hasSeenFeedRules(), markFeedRulesSeen(), mockStore (+7 more)

### Community 90 - "VenueScreenContent.tsx"
Cohesion: 0.15
Nodes (18): shareVenue(), venueLink(), useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, Message(), styles (+10 more)

### Community 91 - "supabase.ts"
Cohesion: 0.09
Nodes (32): ProfileScreen(), ProfileSetupScreen(), PostRow(), ProfileScreenContent(), ProfileScreenContentProps, styles, session(), signOut (+24 more)

### Community 92 - "i18n/index.ts"
Cohesion: 0.16
Nodes (11): RootLayout(), SessionGate(), SessionError(), SessionErrorProps, styles, feedErrorMessage(), KEYS, uk (+3 more)

### Community 93 - "useDjCabinet.ts"
Cohesion: 0.19
Nodes (17): djCabinetKeys, useSaveDjProfile(), getMyDjProfile(), getMyGigs(), GigRow, ProfileRow, randomSuffix(), from (+9 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.12
Nodes (28): ACTIONS, offerBuilderKeys, OfferListAction, callOfferAction(), ClientError, duplicateOffer(), endOffer(), generateOfferTitle() (+20 more)

### Community 95 - "venueDashboard.test.ts"
Cohesion: 0.22
Nodes (7): chain(), events, from, now, Result, setup(), stats

### Community 96 - "applications.ts"
Cohesion: 0.14
Nodes (18): useSubmitApplication(), ApplicationError, ApplicationErrorCode, ApplicationKind, ApplicationRow, ApplicationStatus, DjApplicationDraft, djPayload() (+10 more)

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

### Community 103 - "EventDetails.tsx"
Cohesion: 0.05
Nodes (59): Builder and cabinet kit, styles, EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButton(), GlassIconButtonProps (+51 more)

### Community 104 - "react-native"
Cohesion: 0.09
Nodes (24): react-native, ChoiceCard(), ChoiceCardProps, styles, ImageUploader(), ImageUploaderProps, styles, StatTile() (+16 more)

### Community 105 - "useEventEditor.ts"
Cohesion: 0.18
Nodes (12): EventSubmission, venueEventsQueryKey(), defaultServices, eventDjsQueryKey(), Services, admin, event, start (+4 more)

### Community 106 - "[offerId].tsx"
Cohesion: 0.43
Nodes (3): TicketScreen(), BackRouter, goBackOr()

### Community 107 - "services/venues.ts"
Cohesion: 0.06
Nodes (40): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue, ClubRow (+32 more)

### Community 108 - "AppText.tsx"
Cohesion: 0.13
Nodes (15): AppTextProps, Tone, ButtonProps, ButtonVariant, styles, COMPOSER_MAX_CHARS, COMPOSER_MAX_PHOTOS, ComposerProps (+7 more)

### Community 109 - "VenueEventsList.test.tsx"
Cohesion: 0.40
Nodes (4): base, draft, published, VenueEventsListProps

### Community 110 - "VenueProfileArea.tsx"
Cohesion: 0.25
Nodes (14): useRemoveVenuePhoto(), useSaveVenueProfile(), useUploadVenueCover(), useUploadVenuePhoto(), useVenueProfile(), Message(), ProfileEditorForVenue(), pickCover() (+6 more)

### Community 111 - "useApplications.ts"
Cohesion: 0.22
Nodes (15): ApplicationCard(), ApplicationsReviewContent(), styles, pending, applicationKeys, Decision, SubmitInput, useDecideApplication() (+7 more)

### Community 113 - "theme/index.ts"
Cohesion: 0.17
Nodes (15): FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles, contrastRatio(), parseHex(), relativeLuminance() (+7 more)

### Community 114 - "useClaimOffer.ts"
Cohesion: 0.20
Nodes (13): rememberClaimToken(), claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState (+5 more)

### Community 115 - "pickAvatar"
Cohesion: 0.24
Nodes (11): expo-image-manipulator, expo-image-picker, pickPhoto(), VenueApplicationForm(), addPhoto(), choosePhoto(), AVATAR_MAX_SIDE_PX, fitWithin() (+3 more)

### Community 116 - "eventDjs.ts"
Cohesion: 0.19
Nodes (13): useDjSearch(), djMediaUrl(), escapeLike(), getEventDjs(), LinkRow, OptionRow, searchPublishedDjs(), setEventDjs() (+5 more)

### Community 117 - "QRTicket.tsx"
Cohesion: 0.19
Nodes (12): QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps (+4 more)

### Community 118 - "VenueProfileEditor.tsx"
Cohesion: 0.16
Nodes (12): editorBase, homeBase, profile, teamBase, KINDS, styles, textOrNull(), save() (+4 more)

### Community 119 - "TicketScreens.test.tsx"
Cohesion: 0.26
Nodes (8): getClaimToken(), tokenKey(), claim, mockClaims, mockToken, useClaimToken(), useMyClaims(), getMyClaims()

### Community 120 - "useCabinet.ts"
Cohesion: 0.29
Nodes (12): styles, TeamArea(), TeamForVenue(), TeamPanel(), cabinetKeys, useCancelInvite(), useInviteStaff(), useRemoveMember() (+4 more)

### Community 121 - "cabinet/index.ts"
Cohesion: 0.16
Nodes (19): CabinetArea(), CabinetAreaProps, CabinetDashboard(), Message(), styles, CabinetHome(), CabinetHomeProps, Dashboard() (+11 more)

### Community 122 - "AcceptInviteArea.tsx"
Cohesion: 0.22
Nodes (9): AcceptInviteArea(), AcceptInviteAreaProps, styles, cabinetErrorText(), useAcceptInvite(), ClientError, VenueCabinetError, VenueCabinetErrorCode (+1 more)

### Community 123 - "database.ts"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 124 - "ApplicationScreenContent.tsx"
Cohesion: 0.26
Nodes (9): ApplyScreen(), ApplicationScreenContent(), ApplicationScreenContentProps, ApplicationStatusView(), currentApplication(), styles, DjApplicationForm(), useMyApplications() (+1 more)

### Community 125 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 126 - "shareEvent.ts"
Cohesion: 0.53
Nodes (4): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent()

### Community 127 - "ui/index.ts"
Cohesion: 0.08
Nodes (29): ChipProps, styles, FilterChipItem, FilterChips(), FilterChipsProps, styles, availabilityHint(), OfferRow() (+21 more)

### Community 128 - "OffersArea.tsx"
Cohesion: 0.27
Nodes (11): offerBuilderErrorText(), draftFromOffer(), Mode, OffersArea(), styles, VenueOffers(), useOfferAction(), useSaveVenueOffer() (+3 more)

### Community 129 - "EventScreenContent.test.tsx"
Cohesion: 0.22
Nodes (9): EventScreen(), EventDetailsProps, EventScreenContent(), event, onBack, onOpenDj, onOpenVenue, renderScreen() (+1 more)

### Community 130 - "EventOffersSection.tsx"
Cohesion: 0.18
Nodes (11): EventOffersSection(), EventOffersSectionProps, OfferItem(), styles, base, offer, AdminOffer, AdminVenue (+3 more)

### Community 131 - "useMaxBrightness.test.tsx"
Cohesion: 0.38
Nodes (5): expo-brightness@~58.0.2, expo-brightness, getBrightness, setBrightness, useMaxBrightness()

### Community 132 - "0013 — Offer builder saves offers with direct table writes"
Cohesion: 0.40
Nodes (4): 0013 — Offer builder saves offers with direct table writes, Consequences, Context, Decision

### Community 133 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1063 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `supabase.ts` to `OffersArea.tsx`, `EventScreenContent.test.tsx`, `OfferWizard.tsx`, `EventOffersSection.tsx`, `Button.tsx`, `Hola Fest — design rules`, `expo-constants@~58.0.15`, `Button`, `AppText`, `VenuesMapScreenContent.tsx`, `ui.test.tsx`, `VenueApplicationForm.tsx`, `EventFormArea.tsx`, `DjProfileEditor.tsx`, `OffersList.tsx`, `FeedScreenContent.tsx`, `Hola Fest — design rules`, `react`, `DjScreenContent.tsx`, `@tanstack/react-query`, `components/TaxiBar.tsx`, `radius`, `TextField`, `TicketScreenContent.tsx`, `staff/index.ts`, `kyivTime.ts`, `@testing-library/react-native`, `useSession`, `MyTicketsContent.tsx`, `FeedComposerFlow`, `VenueScreenContent.tsx`, `supabase.ts`, `i18n/index.ts`, `EventDetails.tsx`, `react-native`, `services/venues.ts`, `VenueProfileArea.tsx`, `useApplications.ts`, `useClaimOffer.ts`, `pickAvatar`, `VenueProfileEditor.tsx`, `TicketScreens.test.tsx`, `useCabinet.ts`, `cabinet/index.ts`, `AcceptInviteArea.tsx`, `ApplicationScreenContent.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `OfferWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11097560975609756 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `OffersArea.tsx`, `EventScreenContent.test.tsx`, `OfferWizard.tsx`, `EventOffersSection.tsx`, `supabase.ts`, `Hola Fest — design rules`, `Button`, `feedKit.test.tsx`, `AppText`, `VenuesMapScreenContent.tsx`, `dependencies`, `ui.test.tsx`, `VenueApplicationForm.tsx`, `EventFormArea.tsx`, `DjProfileEditor.tsx`, `OffersList.tsx`, `FeedScreenContent.tsx`, `react`, `DjScreenContent.tsx`, `package.json`, `components/TaxiBar.tsx`, `radius`, `TextField`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `kyivTime.ts`, `useSession`, `MyTicketsContent.tsx`, `FeedComposerFlow`, `VenueScreenContent.tsx`, `supabase.ts`, `i18n/index.ts`, `EventDetails.tsx`, `[offerId].tsx`, `AppText.tsx`, `VenueProfileArea.tsx`, `useApplications.ts`, `theme/index.ts`, `QRTicket.tsx`, `VenueProfileEditor.tsx`, `useCabinet.ts`, `cabinet/index.ts`, `AcceptInviteArea.tsx`, `ApplicationScreenContent.tsx`, `shareEvent.ts`, `ui/index.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `OffersArea.tsx`, `OfferWizard.tsx`, `useMaxBrightness.test.tsx`, `supabase.ts`, `Hola Fest — design rules`, `Button`, `AppText`, `VenuesMapScreenContent.tsx`, `dependencies`, `ui.test.tsx`, `VenueApplicationForm.tsx`, `EventFormArea.tsx`, `DjProfileEditor.tsx`, `FeedScreenContent.tsx`, `DjScreenContent.tsx`, `package.json`, `@tanstack/react-query`, `components/TaxiBar.tsx`, `TextField`, `VenueMap.tsx`, `services/claims.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `kyivTime.ts`, `useSession`, `MyTicketsContent.tsx`, `VenueScreenContent.tsx`, `supabase.ts`, `i18n/index.ts`, `react-native`, `useEventEditor.ts`, `AppText.tsx`, `useApplications.ts`, `useClaimOffer.ts`, `QRTicket.tsx`, `VenueProfileEditor.tsx`, `TicketScreens.test.tsx`, `useCabinet.ts`, `AcceptInviteArea.tsx`, `ApplicationScreenContent.tsx`, `ui/index.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._