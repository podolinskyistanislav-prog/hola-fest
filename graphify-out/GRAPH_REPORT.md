# Graph Report - hola-fest  (2026-11-25)

## Corpus Check
- 406 files · ~139,221 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2291 nodes · 5861 edges · 120 communities (106 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 91 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `31e8d057`
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
- jest
- 0001-foundation.md
- AppText
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
- react-dom@19.3.0
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
- types/admin.ts
- space
- services/admin.ts
- OfferForm.tsx
- react
- useClaimOffer.ts
- build
- Hola Fest — design rules
- t
- DjScreenContent.tsx
- EventsScreenContent.tsx
- feed.ts
- components/TaxiBar.tsx
- claimedTokens.ts
- homeComponents.test.tsx
- TextField
- VenueMap.tsx
- services/claims.ts
- pickAvatar
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- services/events.ts
- ScannerScreenContent.tsx
- feed-post/handler.ts
- sessionStore.ts
- MyTicketsContent.tsx
- react-native
- 0008-eas-cloud-builds.md
- expo-router
- auth/index.ts
- app/_layout.tsx
- EventFormArea.tsx
- services/offerBuilder.ts
- types/events.ts
- applications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- feed-comment/handler.test.ts
- theme/index.ts
- ui/index.ts
- VenueApplicationForm.tsx
- expo@~58.0.23
- services/venues.ts
- @tanstack/react-query
- services/djs.ts
- ApplicationScreenContent.tsx
- useAdminVenueEvents.test.tsx
- 0011-offer-builder-model.md
- GlassSurface.tsx
- Button
- shareEvent.ts
- FakeXhr
- env.ts
- @react-native-async-storage/async-storage
- react-native-screens@~4.30.1

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 172 edges
2. `useTheme()` - 165 edges
3. `t()` - 134 edges
4. `react-native` - 119 edges
5. `Button()` - 76 edges
6. `space` - 75 edges
7. `react` - 54 edges
8. `radius` - 52 edges
9. `@testing-library/react-native` - 50 edges
10. `@tanstack/react-query` - 39 edges

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

## Communities (120 total, 14 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.10
Nodes (20): expo-constants@~58.0.15, expo-device@~58.0.5, expo-glass-effect@~58.0.5, expo-status-bar@~58.0.4, @expo/ui@~58.0.27, expo-web-browser@~58.0.7, react-dom@19.3.0, react-native-reanimated@4.7.1 (+12 more)

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
Nodes (21): styles, GlassSearchFieldProps, SEARCH_FIELD_HEIGHT, styles, INFO_CHIP_HEIGHT, InfoChipProps, styles, LINEUP_CHIP_HEIGHT (+13 more)

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
Cohesion: 0.18
Nodes (17): @supabase/supabase-js, AuthError, AuthErrorCode, ClientError, confirmEmailCode(), ensureGuestSession(), getSession(), onAuthChange() (+9 more)

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

### Community 22 - "AppText"
Cohesion: 0.09
Nodes (48): Builder and cabinet kit, AppText(), ChoiceCard(), CollapsibleSection(), EventCard(), GigRow(), GlassIconButton(), GlassPillButton() (+40 more)

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
Cohesion: 0.11
Nodes (27): ProfileScreen(), ProfileSetupScreen(), useStaffLogin(), PostRow(), ProfileScreenContent(), ProfileScreenContentProps, styles, session() (+19 more)

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
Cohesion: 0.08
Nodes (39): expo-image, @expo/vector-icons, react-native-svg, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles (+31 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.12
Nodes (23): shareVenue(), venueLink(), Message(), styles, onBack, onOpenEvent, onOpenMap, renderScreen() (+15 more)

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
Nodes (31): tabBarInset(), formatEventTime(), ClubRow, clubRows(), eventAt(), venue(), filterVenuesByName(), firstEventByVenue() (+23 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, expo-brightness@~58.0.2, expo-font@~58.0.11, expo-image@~58.0.18, expo-secure-store@~58.0.2, expo-splash-screen@~58.0.13, expo-symbols@~58.0.4, expo-system-ui@~58.0.7 (+21 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "ui.test.tsx"
Cohesion: 0.12
Nodes (17): DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps, styles, availabilityHint(), OfferRow(), OfferRowProps (+9 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "EventsScreenContent.test.tsx"
Cohesion: 0.25
Nodes (7): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue

### Community 61 - "types/admin.ts"
Cohesion: 0.10
Nodes (19): EventOffersSectionProps, base, offer, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers (+11 more)

### Community 62 - "space"
Cohesion: 0.09
Nodes (20): ChoiceCardProps, styles, ImageUploaderProps, styles, LoyaltyStampCardProps, styles, StatTileProps, styles (+12 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.11
Nodes (33): defaultServices, Services, defaultServices, Services, myVenuesQueryKey, AdminError, AdminErrorCode, AdminEventListItem (+25 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.15
Nodes (20): StaffOfferFormScreen(), OfferForm(), OfferFormProps, styles, base, OfferFormArea(), OfferFormAreaProps, styles (+12 more)

### Community 65 - "react"
Cohesion: 0.18
Nodes (13): react, HANDLE_HINTS, ProfileSetupFormProps, styles, HANDLE_DEBOUNCE_MS, HandleStatus, useHandleAvailability(), profileKeys (+5 more)

### Community 66 - "useClaimOffer.ts"
Cohesion: 0.20
Nodes (12): claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+4 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "t"
Cohesion: 0.12
Nodes (20): react-native-safe-area-context, @testing-library/react-native, StaffLogin(), styles, StaffLoginForm(), StaffLoginFormProps, styles, Deps (+12 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.16
Nodes (22): DjScreen(), filterDjsByName(), genresLine(), gigRowProps(), nextGigLine(), alex, nova, DjBody() (+14 more)

### Community 71 - "EventsScreenContent.tsx"
Cohesion: 0.11
Nodes (44): formatHomeDate(), carouselCardProps(), CurfewInfo, curfewInfo(), dayFromId(), dayTile(), eventsOnDay(), filterEvents() (+36 more)

### Community 72 - "feed.ts"
Cohesion: 0.08
Nodes (34): ADR-0012, 0012 — Post image upload through XHR, CommentDraft, createComment(), createPost(), editPost(), encodeCursor(), FeedFailureReason (+26 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.13
Nodes (22): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBar(), TaxiBarProps, destination (+14 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.30
Nodes (11): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret(), readSecret() (+3 more)

### Community 75 - "homeComponents.test.tsx"
Cohesion: 0.12
Nodes (22): EventCarouselCard(), EventCarouselCardProps, styles, GigRowProps, styles, CoverColor, coverColors(), HolaStarCover() (+14 more)

### Community 76 - "TextField"
Cohesion: 0.12
Nodes (28): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), TextField() (+20 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (35): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+27 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.14
Nodes (17): Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason(), readRedeemFailureReason() (+9 more)

### Community 79 - "pickAvatar"
Cohesion: 0.26
Nodes (10): expo-image-manipulator@~58.0.16, expo-image-picker@~58.0.10, expo-image-manipulator, expo-image-picker, DjApplicationForm(), pickPhoto(), choosePhoto(), AVATAR_MAX_SIDE_PX (+2 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.13
Nodes (20): expo-brightness, AccentBlobs(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow() (+12 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.22
Nodes (11): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+3 more)

### Community 83 - "services/events.ts"
Cohesion: 0.11
Nodes (31): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+23 more)

### Community 84 - "ScannerScreenContent.tsx"
Cohesion: 0.17
Nodes (11): expo-camera@~58.0.14, expo-camera, ScannerScreen(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles (+3 more)

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.24
Nodes (10): TicketsScreen(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps (+2 more)

### Community 88 - "react-native"
Cohesion: 0.09
Nodes (22): react-native, DjsScreen(), VenueScreen(), AppTextProps, Tone, ButtonProps, ButtonVariant, styles (+14 more)

### Community 90 - "expo-router"
Cohesion: 0.15
Nodes (12): expo-router@~58.0.30, expo-router, EventsScreen(), FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), TicketScreen() (+4 more)

### Community 91 - "auth/index.ts"
Cohesion: 0.17
Nodes (13): SignInToPostSheet(), SignInToPostSheetProps, styles, Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade() (+5 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.42
Nodes (5): RootLayout(), SessionGate(), SessionError(), createQueryClient(), useAppFonts()

### Community 93 - "EventFormArea.tsx"
Cohesion: 0.13
Nodes (14): StaffEventFormScreen(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, EventOffersSection(), venueEventsQueryKey(), admin (+6 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.11
Nodes (28): callOfferAction(), ClientError, duplicateOffer(), endOffer(), formatKyivTime(), generateOfferTerms(), generateOfferTitle(), listVenueOfferStats() (+20 more)

### Community 95 - "types/events.ts"
Cohesion: 0.15
Nodes (13): EventScreen(), EventDetailsProps, CTA_BY_STATE, EventOfferCardProps, EventScreenContent(), event, onBack, onOpenDj (+5 more)

### Community 96 - "applications.ts"
Cohesion: 0.12
Nodes (28): pending, applicationKeys, Decision, SubmitInput, useDecideApplication(), useSubmitApplication(), ApplicationError, ApplicationErrorCode (+20 more)

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
Cohesion: 0.12
Nodes (22): QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps (+14 more)

### Community 104 - "ui/index.ts"
Cohesion: 0.07
Nodes (37): BottomSheet(), BottomSheetProps, styles, Chip(), ChipProps, styles, FEED_RULES, FeedRulesSheet() (+29 more)

### Community 105 - "VenueApplicationForm.tsx"
Cohesion: 0.20
Nodes (15): ImageUploader(), DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue (+7 more)

### Community 107 - "services/venues.ts"
Cohesion: 0.13
Nodes (20): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, ClientError, getPublishedVenues(), getVenueById(), from (+12 more)

### Community 108 - "@tanstack/react-query"
Cohesion: 0.15
Nodes (10): @tanstack/react-query, useClaimToken(), useMyClaims(), ClaimsError, getMyClaims(), from, getSession, invoke (+2 more)

### Community 109 - "services/djs.ts"
Cohesion: 0.24
Nodes (10): djSlug(), normalizeDjName(), DjEventRow, DjsError, DjsErrorCode, getDjBySlug(), getUpcomingDjs(), groupDjs() (+2 more)

### Community 110 - "ApplicationScreenContent.tsx"
Cohesion: 0.27
Nodes (8): ApplyScreen(), ApplicationScreenContent(), ApplicationScreenContentProps, ApplicationStatusView(), currentApplication(), styles, useMyApplications(), AccountApplication

### Community 111 - "useAdminVenueEvents.test.tsx"
Cohesion: 0.21
Nodes (8): StaffEventsScreen(), admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), VenueEventsArea(), VenueEventsAreaProps

### Community 113 - "GlassSurface.tsx"
Cohesion: 0.17
Nodes (9): EventCardProps, EventCoverColor, styles, FEATHER_NAME, GlassIconButtonProps, GlassIconName, styles, GlassSurfaceProps (+1 more)

### Community 114 - "Button"
Cohesion: 0.35
Nodes (9): StaffApplicationsScreen(), Button(), ApplicationCard(), ApplicationsReviewContent(), styles, useIsSuperadmin(), usePendingApplications(), useSession() (+1 more)

### Community 115 - "shareEvent.ts"
Cohesion: 0.53
Nodes (4): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent()

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 956 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `t` to `Button.tsx`, `AppText`, `ProfileScreenContent.tsx`, `react-dom@19.3.0`, `VenuesMapScreenContent.tsx`, `EventsScreenContent.test.tsx`, `space`, `OfferForm.tsx`, `react`, `useClaimOffer.ts`, `Hola Fest — design rules`, `DjScreenContent.tsx`, `EventsScreenContent.tsx`, `components/TaxiBar.tsx`, `homeComponents.test.tsx`, `TextField`, `pickAvatar`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent.tsx`, `MyTicketsContent.tsx`, `expo-router`, `auth/index.ts`, `app/_layout.tsx`, `EventFormArea.tsx`, `types/events.ts`, `applications.ts`, `VenueApplicationForm.tsx`, `ApplicationScreenContent.tsx`, `Button`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `AppText`, `ProfileScreenContent.tsx`, `expo-linking@~58.0.16`, `react-dom@19.3.0`, `VenuesMapScreenContent.tsx`, `dependencies`, `ui.test.tsx`, `space`, `OfferForm.tsx`, `react`, `t`, `DjScreenContent.tsx`, `EventsScreenContent.tsx`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `homeComponents.test.tsx`, `TextField`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent.tsx`, `MyTicketsContent.tsx`, `expo-router`, `auth/index.ts`, `EventFormArea.tsx`, `types/events.ts`, `theme/index.ts`, `ui/index.ts`, `VenueApplicationForm.tsx`, `ApplicationScreenContent.tsx`, `GlassSurface.tsx`, `Button`, `shareEvent.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `claimOffer()` connect `useClaimOffer.ts` to `@tanstack/react-query`, `services/claims.ts`, `Hola Fest — Product`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._