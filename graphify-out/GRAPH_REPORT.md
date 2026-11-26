# Graph Report - hola-fest  (2026-11-26)

## Corpus Check
- 476 files · ~165,320 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2676 nodes · 7260 edges · 142 communities (130 shown, 12 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 109 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `41695545`
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
- EventsScreenContent.test.tsx
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
- FeedComposerFlow.tsx
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
- react
- types/admin.ts
- DjProfileEditor.tsx
- services/admin.ts
- OffersList.tsx
- FeedScreenContent.tsx
- claims.test.ts
- build
- Hola Fest — design rules
- @testing-library/react-native
- DjScreenContent.tsx
- @tanstack/react-query
- feed.ts
- EventTaxiBar.tsx
- services/djs.ts
- ui/index.ts
- eventFormValidation.ts
- VenueMap.tsx
- services/claims.ts
- useCabinet.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- services/events.ts
- ScannerScreenContent.tsx
- feed-post/handler.ts
- useSession
- t
- secureStorage.ts
- 0008-eas-cloud-builds.md
- useVenues.ts
- ProfileScreenContent.tsx
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
- brand
- react-native
- useEventEditor.ts
- [offerId].tsx
- services/venues.ts
- kyivTime.ts
- VenueEventsList.tsx
- mapHtml.ts
- useAdminVenueEvents.ts
- 0011-offer-builder-model.md
- theme/index.ts
- react-native-safe-area-context
- pickAvatar
- eventDjs.ts
- QRTicket.tsx
- TeamPanel.tsx
- claimedTokens.ts
- TeamArea.tsx
- toVenueCabinetError
- VenueCabinetError
- venueProfile.test.ts
- ApplicationScreenContent.tsx
- 0007 — Taxi deep links
- shareEvent.ts
- OfferRow.tsx
- OffersArea.tsx
- EventScreenContent.test.tsx
- useTheme
- TicketScreens.test.tsx
- 0013 — Offer builder saves offers with direct table writes
- jest
- tabsShell.test.tsx
- MyClaim
- VenuesMapScreenContent.test.tsx
- VenueMap.web.test.tsx
- FakeXhr
- uploadPostImage
- env.ts
- chain

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
- `Decision` --references--> `saveVenueOffer()`  [INFERRED]
  docs/decisions/0013-offer-builder-direct-writes.md → src/services/offerBuilder.ts
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts

## Import Cycles
- None detected.

## Communities (142 total, 12 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.11
Nodes (40): ChoiceCard(), StepIndicator(), Stepper(), TimeWindowPicker(), DetailsErrors, INTENT_STATUS, isDraftValid(), kindNeedsValue() (+32 more)

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
Cohesion: 0.12
Nodes (38): FilterChips(), formatHomeDate(), HomeHeader(), styles, SectionHeader(), StatTile(), Dashboard(), styles (+30 more)

### Community 6 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, android, check, db:types, db:verify, format, ios, lint (+5 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.04
Nodes (39): Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Access rules (RLS), Allowed dependencies (enforced by ESLint where possible), Auth (+31 more)

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

### Community 12 - "EventsScreenContent.test.tsx"
Cohesion: 0.13
Nodes (17): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue, ClubRow (+9 more)

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
Cohesion: 0.31
Nodes (7): canUseCabinet(), isValidInstagramUrl(), pickCabinetVenue(), admin, host, owner, CabinetVenue

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.12
Nodes (20): useAcceptInvite(), acceptVenueInvite(), CabinetRow, cancelVenueInvite(), InviteRow, inviteVenueStaff(), listMyCabinetVenues(), listVenueInvites() (+12 more)

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
Cohesion: 0.09
Nodes (29): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, StaffLoginFormProps, styles (+21 more)

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
Cohesion: 0.14
Nodes (31): styles, TaxiBar(), AppText(), Button(), Chip(), CollapsibleSection(), GigRow(), InfoChip() (+23 more)

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

### Community 37 - "FeedComposerFlow.tsx"
Cohesion: 0.15
Nodes (15): FeedScreen(), BottomSheet(), Composer(), FeedRulesSheet(), ReportSheet(), SignInToPostSheet(), FeedComposerFlow(), FeedComposerFlowProps (+7 more)

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
Cohesion: 0.25
Nodes (16): GlassSearchField(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base, TodayOffer (+8 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.05
Nodes (57): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18 (+49 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "homeComponents.test.tsx"
Cohesion: 0.09
Nodes (25): FloatingTabBar(), ITEMS, TabsLayout(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip(), DayStripDay (+17 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "react"
Cohesion: 0.17
Nodes (19): react, ImageUploader(), StringListField(), TextField(), DjApplicationForm(), styles, styles, VenueApplicationForm() (+11 more)

### Community 61 - "types/admin.ts"
Cohesion: 0.17
Nodes (12): EventOffersSectionProps, base, offer, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers (+4 more)

### Community 62 - "DjProfileEditor.tsx"
Cohesion: 0.15
Nodes (21): DjProfileEditorProps, styles, addGenre(), BIO_MAX, buildProfileSave(), DjProfileErrors, DjProfileFormValues, DjProfileSave (+13 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (26): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+18 more)

### Community 64 - "OffersList.tsx"
Cohesion: 0.11
Nodes (22): StatusPill(), StatusPillProps, ErrorText(), OfferRowAction, offerRowActions(), pillStatus(), listBase, readyDraft (+14 more)

### Community 65 - "FeedScreenContent.tsx"
Cohesion: 0.21
Nodes (9): FeedScreenContentProps, styles, onOpenPost, onOpenProfileSetup, post, renderFeed(), postLink(), sharePost() (+1 more)

### Community 66 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "@testing-library/react-native"
Cohesion: 0.20
Nodes (10): @testing-library/react-native, feedErrorMessage(), KEYS, feedKeys, Deps, PostSubmission, PublishResult, setup() (+2 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.15
Nodes (21): DjScreen(), DjsScreen(), filterDjsByName(), genresLine(), alex, nova, DjScreenContent(), DjScreenContentProps (+13 more)

### Community 71 - "@tanstack/react-query"
Cohesion: 0.27
Nodes (11): @tanstack/react-query, FeedData, post(), seed(), useFeedPosts(), useToggleLike(), withLike(), FeedPage (+3 more)

### Community 72 - "feed.ts"
Cohesion: 0.08
Nodes (39): ADR-0012, blockUser(), CommentDraft, createComment(), createPost(), deleteComment(), deletePost(), editPost() (+31 more)

### Community 73 - "EventTaxiBar.tsx"
Cohesion: 0.16
Nodes (14): TaxiBarProps, destination, openMock, EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles, buildTaxiLinks(), isValidCoordinate() (+6 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.14
Nodes (22): djSlug(), normalizeDjName(), byNextGigThenName(), DjEventRow, DjsError, DjsErrorCode, getLineupTextDjs(), getPublishedProfileDjs() (+14 more)

### Community 75 - "ui/index.ts"
Cohesion: 0.09
Nodes (35): react-native-svg, CollapsibleSectionProps, styles, EventCarouselCard(), EventCarouselCardProps, styles, FEATHER_NAME, GlassIconButtonProps (+27 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.13
Nodes (18): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, LINEUP_DJS_MAX, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS (+10 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.18
Nodes (19): encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue, parseFromMap(), venue, ToMapMessage (+11 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.10
Nodes (25): Code quality, requestPermission, Deps, FAILURE_REASON, ScanState, ClaimButtonState, FAILURE_STATE, mockClaim (+17 more)

### Community 79 - "useCabinet.ts"
Cohesion: 0.14
Nodes (29): cabinetKeys, useRemoveVenuePhoto(), useSaveVenueProfile(), useUploadVenueCover(), useUploadVenuePhoto(), useVenueProfile(), ProfileEditorForVenue(), pickCover() (+21 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.20
Nodes (16): AccentBlobs(), GlassIconButton(), QRCard(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps (+8 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.12
Nodes (22): BANNED_WORDS, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText(), FilterReason, FOLDED_BANNED (+14 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.22
Nodes (10): getStaffAccess(), StaffAccess, StaffAreaProps, StaffHome(), StaffHomeProps, styles, base, UseStaffAccess (+2 more)

### Community 83 - "services/events.ts"
Cohesion: 0.10
Nodes (35): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+27 more)

### Community 84 - "ScannerScreenContent.tsx"
Cohesion: 0.23
Nodes (9): ScannerScreen(), ScanResult(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles, useScanRedeem() (+1 more)

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.27
Nodes (21): CommentInput, handleFeedComment(), handleFeedPost(), parseInput(), PostInput, COMMENTS_PER_DAY, dayAgo(), FeedError (+13 more)

### Community 86 - "useSession"
Cohesion: 0.09
Nodes (33): expo-router, AcceptInviteScreen(), CabinetScreen(), CabinetOffersScreen(), CabinetProfileScreen(), CabinetTeamScreen(), DjCabinetScreen(), StaffApplicationsScreen() (+25 more)

### Community 87 - "t"
Cohesion: 0.09
Nodes (34): TicketsScreen(), LineupChip(), tabBarInset(), coverImageUri(), EventDetails(), EventDetailsProps, styles, CurfewInfo (+26 more)

### Community 88 - "secureStorage.ts"
Cohesion: 0.23
Nodes (12): expo-secure-store@~58.0.2, expo-secure-store, acceptRules(), afterAuthor(), hasSeenFeedRules(), markFeedRulesSeen(), mockStore, deleteSecret() (+4 more)

### Community 90 - "useVenues.ts"
Cohesion: 0.44
Nodes (5): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, getPublishedVenues()

### Community 91 - "ProfileScreenContent.tsx"
Cohesion: 0.06
Nodes (50): ProfileScreen(), ProfileSetupScreen(), useIsSuperadmin(), Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade() (+42 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.42
Nodes (5): RootLayout(), SessionGate(), SessionError(), createQueryClient(), useAppFonts()

### Community 93 - "useDjCabinet.ts"
Cohesion: 0.17
Nodes (17): djCabinetKeys, useMyDjProfile(), useMyGigs(), useSaveDjProfile(), getMyDjProfile(), getMyGigs(), GigRow, ProfileRow (+9 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.12
Nodes (29): ACTIONS, offerBuilderKeys, OfferListAction, useVenueOfferStats(), callOfferAction(), ClientError, duplicateOffer(), endOffer() (+21 more)

### Community 95 - "supabase.ts"
Cohesion: 0.18
Nodes (9): rpc, supabase, chain(), events, from, now, Result, setup() (+1 more)

### Community 96 - "applications.ts"
Cohesion: 0.06
Nodes (49): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+41 more)

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
Cohesion: 0.07
Nodes (40): Builder and cabinet kit, styles, GlassPillButton(), GlassPillButtonProps, styles, GlassSearchFieldProps, SEARCH_FIELD_HEIGHT, styles (+32 more)

### Community 104 - "react-native"
Cohesion: 0.06
Nodes (51): react-native, AppTextProps, Tone, BottomSheetProps, styles, ButtonProps, ButtonVariant, styles (+43 more)

### Community 105 - "useEventEditor.ts"
Cohesion: 0.18
Nodes (12): EventSubmission, venueEventsQueryKey(), defaultServices, eventDjsQueryKey(), Services, admin, event, start (+4 more)

### Community 106 - "[offerId].tsx"
Cohesion: 0.43
Nodes (3): TicketScreen(), BackRouter, goBackOr()

### Community 107 - "services/venues.ts"
Cohesion: 0.10
Nodes (23): onBack, onOpenEvent, onOpenMap, renderScreen(), venue, weekEvent, ClientError, getVenueById() (+15 more)

### Community 108 - "kyivTime.ts"
Cohesion: 0.16
Nodes (19): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), TextFieldProps, CURFEW_KYIV_HOUR (+11 more)

### Community 109 - "VenueEventsList.tsx"
Cohesion: 0.18
Nodes (12): useAdminVenueEvents(), VenueEventsArea(), VenueEventsAreaProps, EventRow(), EventRowProps, Skeleton(), styles, base (+4 more)

### Community 110 - "mapHtml.ts"
Cohesion: 0.22
Nodes (12): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+4 more)

### Community 111 - "useAdminVenueEvents.ts"
Cohesion: 0.20
Nodes (8): defaultServices, Services, admin, host, item, UseAdminVenueEvents, myVenuesQueryKey, AdminEventListItem

### Community 113 - "theme/index.ts"
Cohesion: 0.14
Nodes (18): LINEUP_CHIP_HEIGHT, LineupChipProps, styles, FAILURE_MESSAGE, ScanFailureReason, ScanResultProps, styles, contrastRatio() (+10 more)

### Community 114 - "react-native-safe-area-context"
Cohesion: 0.25
Nodes (6): react-native-safe-area-context, StaffLogin(), styles, SessionErrorProps, styles, StaffLoginForm()

### Community 115 - "pickAvatar"
Cohesion: 0.21
Nodes (12): expo-image-manipulator@~58.0.16, expo-image-picker@~58.0.10, expo-image-manipulator, expo-image-picker, pickPhoto(), addPhoto(), choosePhoto(), AVATAR_MAX_SIDE_PX (+4 more)

### Community 116 - "eventDjs.ts"
Cohesion: 0.19
Nodes (13): useDjSearch(), djMediaUrl(), escapeLike(), getEventDjs(), LinkRow, OptionRow, searchPublishedDjs(), setEventDjs() (+5 more)

### Community 117 - "QRTicket.tsx"
Cohesion: 0.20
Nodes (11): QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus (+3 more)

### Community 118 - "TeamPanel.tsx"
Cohesion: 0.18
Nodes (11): editorBase, homeBase, profile, teamBase, CabinetHomeProps, ROLE_KEY, styles, TeamPanel() (+3 more)

### Community 119 - "claimedTokens.ts"
Cohesion: 0.26
Nodes (9): getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), claimKeys, useClaimToken(), useMyClaims() (+1 more)

### Community 120 - "TeamArea.tsx"
Cohesion: 0.39
Nodes (8): cabinetErrorText(), styles, TeamForVenue(), useCancelInvite(), useInviteStaff(), useRemoveMember(), useVenueInvites(), useVenueMembers()

### Community 121 - "toVenueCabinetError"
Cohesion: 0.31
Nodes (10): useVenueDashboard(), listVenueEvents(), toVenueCabinetError(), countClaims(), DashboardOffer, getVenueDashboard(), listLiveOffers(), LiveOfferRow (+2 more)

### Community 122 - "VenueCabinetError"
Cohesion: 0.39
Nodes (3): ClientError, VenueCabinetError, VenueCabinetErrorCode

### Community 123 - "venueProfile.test.ts"
Cohesion: 0.29
Nodes (7): chain(), from, mockProfileQueries(), photoRow, Result, storageFrom, venueRow

### Community 124 - "ApplicationScreenContent.tsx"
Cohesion: 0.27
Nodes (8): ApplyScreen(), ApplicationScreenContent(), ApplicationScreenContentProps, ApplicationStatusView(), currentApplication(), styles, useMyApplications(), AccountApplication

### Community 125 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 126 - "shareEvent.ts"
Cohesion: 0.33
Nodes (6): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent(), shareVenue(), venueLink()

### Community 127 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

### Community 128 - "OffersArea.tsx"
Cohesion: 0.31
Nodes (9): offerBuilderErrorText(), draftFromOffer(), Mode, styles, VenueOffers(), useOfferAction(), useSaveVenueOffer(), useVenueEventChoices() (+1 more)

### Community 129 - "EventScreenContent.test.tsx"
Cohesion: 0.28
Nodes (7): EventScreen(), EventScreenContent(), event, onBack, onOpenDj, onOpenVenue, renderScreen()

### Community 130 - "useTheme"
Cohesion: 0.27
Nodes (11): VenueScreen(), SwitchField(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), EventOffersSection() (+3 more)

### Community 131 - "TicketScreens.test.tsx"
Cohesion: 0.20
Nodes (8): expo-brightness@~58.0.2, expo-brightness, claim, mockClaims, mockToken, getBrightness, setBrightness, useMaxBrightness()

### Community 132 - "0013 — Offer builder saves offers with direct table writes"
Cohesion: 0.40
Nodes (4): 0013 — Offer builder saves offers with direct table writes, Consequences, Context, Decision

### Community 133 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 134 - "tabsShell.test.tsx"
Cohesion: 0.38
Nodes (4): EventsScreen(), MapScreen(), mockNavigate, mockPush

### Community 135 - "MyClaim"
Cohesion: 0.38
Nodes (4): ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), MyClaim

### Community 136 - "VenuesMapScreenContent.test.tsx"
Cohesion: 0.29
Nodes (6): onOpenEvent, onOpenVenue, panorama, renderScreen(), tonight, venue

### Community 137 - "VenueMap.web.test.tsx"
Cohesion: 0.33
Nodes (4): Listener, listeners, mount(), venue

### Community 139 - "uploadPostImage"
Cohesion: 0.50
Nodes (3): 0012 — Post image upload through XHR, randomSuffix(), uploadPostImage()

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1068 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `t` to `OffersArea.tsx`, `EventScreenContent.test.tsx`, `package.json`, `TicketScreens.test.tsx`, `useTheme`, `supabase.ts`, `tabsShell.test.tsx`, `VenuesMapScreenContent.test.tsx`, `EventsScreenContent.test.tsx`, `auth.ts`, `AppText`, `FeedComposerFlow.tsx`, `VenuesMapScreenContent.tsx`, `homeComponents.test.tsx`, `react`, `DjProfileEditor.tsx`, `OffersList.tsx`, `FeedScreenContent.tsx`, `Hola Fest — design rules`, `@testing-library/react-native`, `DjScreenContent.tsx`, `EventTaxiBar.tsx`, `services/claims.ts`, `useCabinet.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent.tsx`, `useSession`, `ProfileScreenContent.tsx`, `app/_layout.tsx`, `applications.ts`, `brand`, `services/venues.ts`, `VenueEventsList.tsx`, `react-native-safe-area-context`, `TeamPanel.tsx`, `TeamArea.tsx`, `VenueCabinetError`, `ApplicationScreenContent.tsx`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10741971207087486 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `OffersArea.tsx`, `EventScreenContent.test.tsx`, `useTheme`, `package.json`, `supabase.ts`, `tabsShell.test.tsx`, `auth.ts`, `AppText`, `expo-linking@~58.0.16`, `FeedComposerFlow.tsx`, `VenuesMapScreenContent.tsx`, `package.json`, `homeComponents.test.tsx`, `react`, `DjProfileEditor.tsx`, `OffersList.tsx`, `FeedScreenContent.tsx`, `DjScreenContent.tsx`, `EventTaxiBar.tsx`, `ui/index.ts`, `VenueMap.tsx`, `useCabinet.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `ScannerScreenContent.tsx`, `useSession`, `t`, `secureStorage.ts`, `ProfileScreenContent.tsx`, `brand`, `[offerId].tsx`, `VenueEventsList.tsx`, `theme/index.ts`, `react-native-safe-area-context`, `QRTicket.tsx`, `TeamPanel.tsx`, `TeamArea.tsx`, `ApplicationScreenContent.tsx`, `shareEvent.ts`, `OfferRow.tsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `OffersArea.tsx`, `package.json`, `TicketScreens.test.tsx`, `supabase.ts`, `auth.ts`, `AppText`, `FeedComposerFlow.tsx`, `VenuesMapScreenContent.tsx`, `package.json`, `homeComponents.test.tsx`, `types/admin.ts`, `DjProfileEditor.tsx`, `FeedScreenContent.tsx`, `@testing-library/react-native`, `DjScreenContent.tsx`, `@tanstack/react-query`, `EventTaxiBar.tsx`, `ui/index.ts`, `VenueMap.tsx`, `services/claims.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `services/events.ts`, `useSession`, `t`, `useVenues.ts`, `ProfileScreenContent.tsx`, `app/_layout.tsx`, `applications.ts`, `react-native`, `useEventEditor.ts`, `kyivTime.ts`, `useAdminVenueEvents.ts`, `QRTicket.tsx`, `TeamPanel.tsx`, `claimedTokens.ts`, `TeamArea.tsx`, `ApplicationScreenContent.tsx`, `OfferRow.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._