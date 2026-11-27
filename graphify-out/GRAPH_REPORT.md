# Graph Report - hola-fest  (2026-11-27)

## Corpus Check
- 501 files · ~176,747 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2790 nodes · 7769 edges · 140 communities (130 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `20629f10`
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
- ContentMenu.tsx
- ui/index.ts
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
- AppText.tsx
- Quick Reference
- VenueEventsList.tsx
- types/admin.ts
- DjProfileEditor.tsx
- services/admin.ts
- react-native
- PostScreenContent.tsx
- OffersArea.tsx
- build
- Hola Fest — design rules
- @tanstack/react-query
- DjScreenContent.tsx
- AuthorScreenContent.tsx
- touchTarget
- components/TaxiBar.tsx
- services/djs.ts
- FeedScreenContent.tsx
- services/events.ts
- VenueMap.tsx
- services/claims.ts
- venueProfile.ts
- TicketScreenContent.tsx
- feed-filter.ts
- useAdminVenueEvents.ts
- useEvents.ts
- useScanRedeem.ts
- feed-post/handler.ts
- VenueProfileEditor.tsx
- EventDetails.tsx
- claimedTokens.ts
- 0008-eas-cloud-builds.md
- types/offerBuilder.ts
- ProfileScreenContent.tsx
- app/_layout.tsx
- useDjCabinet.ts
- services/offerBuilder.ts
- venueDashboard.ts
- useApplications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- EventForm.tsx
- kit.test.tsx
- space
- useEventEditor.ts
- usePostPage.ts
- services/venues.ts
- react
- useCabinet.ts
- ModerationContent.tsx
- TextField.tsx
- 0011-offer-builder-model.md
- theme/index.ts
- t
- pickAvatar
- supabase.ts
- VenueScreenContent.tsx
- FeedComposerFlow.tsx
- useClaimOffer.ts
- EditPostSheet.tsx
- 0013 — Offer builder saves offers with direct table writes
- useSession
- VenueApplicationForm.tsx
- applications.ts
- cabinetAccess.ts
- kyivDayKey
- ScannerScreenContent.tsx
- useTheme
- OfferWizard.tsx
- QRTicket.tsx
- EventFormArea.tsx
- applications.test.ts
- offerBuilder.test.tsx
- @testing-library/react-native
- MyTicketsContent.tsx
- OfferRow.tsx
- TicketScreens.test.tsx
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
- `Code quality` --references--> `claimOffer()`  [INFERRED]
  CLAUDE.md → src/services/claims.ts
- `Decision` --references--> `saveVenueOffer()`  [INFERRED]
  docs/decisions/0013-offer-builder-direct-writes.md → src/services/offerBuilder.ts
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts

## Import Cycles
- None detected.

## Communities (140 total, 10 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.14
Nodes (27): DetailsErrors, draftFromOffer(), emptyOfferDraft, INTENT_STATUS, isDraftValid(), kindNeedsValue(), LimitsErrors, normalizedValue() (+19 more)

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
Nodes (27): EventsScreen(), FilterChips(), SectionHeader(), carouselCardProps(), CurfewInfo, dayFromId(), dayTile(), eventsOnDay() (+19 more)

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
Cohesion: 0.50
Nodes (3): MapScreen(), mockNavigate, mockPush

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
Cohesion: 0.09
Nodes (30): ADR-0012, 0012 — Post image upload through XHR, feedErrorMessage(), KEYS, CommentDraft, createPost(), encodeCursor(), FeedAuthorRow (+22 more)

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.16
Nodes (12): ClientError, VenueCabinetError, VenueCabinetErrorCode, CabinetRow, InviteRow, listMyCabinetVenues(), MemberRow, toRole() (+4 more)

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

### Community 30 - "AppText"
Cohesion: 0.14
Nodes (34): TaxiBar(), AppText(), Button(), Chip(), Composer(), GigRow(), ImageUploader(), PhotoGallery() (+26 more)

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

### Community 35 - "expo-device@~58.0.5"
Cohesion: 0.40
Nodes (3): 0006 — Map: react-native-maps, platform split, Google Maps key, 0010 — Map: one Leaflet page everywhere (supersedes 0006), Update 2026-11-27: MapLibre + OpenFreeMap instead of Leaflet + CARTO

### Community 36 - "ContentMenu.tsx"
Cohesion: 0.14
Nodes (15): BlockConfirmSheet(), BlockConfirmSheetProps, styles, ContentMenu(), ContentMenuProps, MenuTarget, OpenMenu(), confirmBlock() (+7 more)

### Community 37 - "ui/index.ts"
Cohesion: 0.11
Nodes (27): BottomSheetProps, styles, EventCarouselCard(), EventCarouselCardProps, styles, FEED_RULES, FeedRulesSheetProps, FilterChipItem (+19 more)

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
Nodes (28): GlassSearchField(), formatEventTime(), ClubRow, clubRows(), eventAt(), venue(), filterVenuesByName(), firstEventByVenue() (+20 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.04
Nodes (67): dependencies, expo@~58.0.23, expo-brightness@~58.0.2, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5 (+59 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "AppText.tsx"
Cohesion: 0.12
Nodes (16): react-native-svg, AppTextProps, Tone, CollapsibleSectionProps, styles, HolaStarThumb(), LoyaltyStampCardProps, styles (+8 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "VenueEventsList.tsx"
Cohesion: 0.12
Nodes (20): StaffEventsScreen(), EventCard(), StaffAreaProps, StaffHome(), StaffHomeProps, styles, base, UseAdminVenueEvents (+12 more)

### Community 61 - "types/admin.ts"
Cohesion: 0.18
Nodes (11): EventOffersSectionProps, base, offer, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers (+3 more)

### Community 62 - "DjProfileEditor.tsx"
Cohesion: 0.15
Nodes (21): DjProfileEditorProps, styles, addGenre(), BIO_MAX, buildProfileSave(), DjProfileErrors, DjProfileFormValues, DjProfileSave (+13 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (26): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+18 more)

### Community 64 - "react-native"
Cohesion: 0.09
Nodes (24): react-native, ButtonProps, ButtonVariant, styles, EventCardProps, EventCoverColor, styles, FEATHER_NAME (+16 more)

### Community 65 - "PostScreenContent.tsx"
Cohesion: 0.13
Nodes (17): PostScreen(), buildCommentThreads(), CommentThread, Message(), PostScreenContent(), openCommentMenu(), renderComment(), whenReady() (+9 more)

### Community 66 - "OffersArea.tsx"
Cohesion: 0.39
Nodes (6): offerBuilderErrorText(), Mode, styles, VenueOffers(), useOfferAction(), useVenueEventChoices()

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "@tanstack/react-query"
Cohesion: 0.17
Nodes (17): @tanstack/react-query, feedKeys, FeedData, post(), seed(), useFeedPosts(), useToggleLike(), withLike() (+9 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.15
Nodes (22): DjScreen(), DjsScreen(), filterDjsByName(), genresLine(), gigRowProps(), nextGigLine(), alex, nova (+14 more)

### Community 71 - "AuthorScreenContent.tsx"
Cohesion: 0.09
Nodes (25): FeedScreen(), AuthorScreen(), AuthorScreenContent(), AuthorScreenContentProps, Message(), styles, author, onBack (+17 more)

### Community 72 - "touchTarget"
Cohesion: 0.09
Nodes (34): expo-image, @expo/vector-icons, AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles, TEXT (+26 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.13
Nodes (19): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBarProps, destination, openMock (+11 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.15
Nodes (21): djSlug(), normalizeDjName(), byNextGigThenName(), DjEventRow, djMediaUrl(), DjsErrorCode, getLineupTextDjs(), getPublishedProfileDjs() (+13 more)

### Community 75 - "FeedScreenContent.tsx"
Cohesion: 0.11
Nodes (22): FloatingTabBar(), ITEMS, TabsLayout(), ChipProps, styles, DAY_PILL_HEIGHT, DayStrip(), DayStripDay (+14 more)

### Community 76 - "services/events.ts"
Cohesion: 0.11
Nodes (19): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue, ClientError (+11 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.09
Nodes (36): buildMapHtml(), inlineJson(), KYIV_CENTER, MAP_ATTRIBUTION, MapHtmlOptions, MAPLIBRE_CSS_SRI, MAPLIBRE_CSS_URL, MAPLIBRE_JS_SRI (+28 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.11
Nodes (19): useClaimToken(), useMyClaims(), ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage(), readFailureReason() (+11 more)

### Community 79 - "venueProfile.ts"
Cohesion: 0.14
Nodes (28): useRemoveVenuePhoto(), useSaveVenueProfile(), useUploadVenueCover(), useUploadVenuePhoto(), useVenueProfile(), ProfileEditorForVenue(), toVenueCabinetError(), addVenuePhoto() (+20 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.15
Nodes (16): TicketScreen(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow(), formatCountdown() (+8 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.11
Nodes (24): BANNED_WORDS, demoTexts, feedSection, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText() (+16 more)

### Community 82 - "useAdminVenueEvents.ts"
Cohesion: 0.18
Nodes (11): getStaffAccess(), StaffAccess, defaultServices, Services, myVenuesQueryKey, UseStaffAccess, useStaffAccess(), AdminEventListItem (+3 more)

### Community 83 - "useEvents.ts"
Cohesion: 0.16
Nodes (22): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), WEDNESDAY, useEvent(), useEventsForDay() (+14 more)

### Community 84 - "useScanRedeem.ts"
Cohesion: 0.38
Nodes (5): Deps, FAILURE_REASON, ScanState, RedeemClaimResult, RedeemFailureReason

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.18
Nodes (26): CommentInput, FeedCommentDeps, handleFeedComment(), call(), FeedPostDeps, handleFeedPost(), parseInput(), PostInput (+18 more)

### Community 86 - "VenueProfileEditor.tsx"
Cohesion: 0.15
Nodes (15): StatTile(), editorBase, homeBase, profile, teamBase, CabinetHome(), CabinetHomeProps, Dashboard() (+7 more)

### Community 87 - "EventDetails.tsx"
Cohesion: 0.11
Nodes (23): GlassIconButton(), InfoChip(), coverImageUri(), EventDetails(), EventDetailsProps, styles, curfewInfo(), offerCondition() (+15 more)

### Community 88 - "claimedTokens.ts"
Cohesion: 0.30
Nodes (11): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret(), readSecret() (+3 more)

### Community 90 - "types/offerBuilder.ts"
Cohesion: 0.24
Nodes (8): StatusPillProps, OfferRowAction, offerRowActions(), pillStatus(), OfferKind, OfferStats, OfferStatus, OfferWindow

### Community 91 - "ProfileScreenContent.tsx"
Cohesion: 0.06
Nodes (48): ProfileScreen(), ProfileSetupScreen(), Deps, EmailUpgradeStep, setup(), UseEmailUpgrade, useEmailUpgrade(), session() (+40 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.46
Nodes (4): RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 93 - "useDjCabinet.ts"
Cohesion: 0.16
Nodes (20): djCabinetKeys, useMyDjProfile(), useMyGigs(), usePublishMyDj(), useSaveDjProfile(), getMyDjProfile(), getMyGigs(), GigRow (+12 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.11
Nodes (32): ACTIONS, offerBuilderKeys, OfferListAction, useSaveVenueOffer(), useVenueOffers(), useVenueOfferStats(), callOfferAction(), ClientError (+24 more)

### Community 95 - "venueDashboard.ts"
Cohesion: 0.14
Nodes (14): countClaims(), DashboardOffer, getVenueDashboard(), listLiveOffers(), LiveOfferRow, startOfDay(), chain(), events (+6 more)

### Community 96 - "useApplications.ts"
Cohesion: 0.18
Nodes (17): StaffApplicationsScreen(), ApplicationScreenContentProps, ApplicationsReviewContent(), styles, pending, applicationKeys, Decision, SubmitInput (+9 more)

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

### Community 102 - "EventForm.tsx"
Cohesion: 0.12
Nodes (24): EventFormProps, styles, base, emptyEventForm, EventFormErrors, EventFormValues, EventSubmission, eventToFormValues() (+16 more)

### Community 103 - "kit.test.tsx"
Cohesion: 0.07
Nodes (31): AccentBlobs(), styles, GlassPillButton(), GlassPillButtonProps, styles, HolaStar(), INFO_CHIP_HEIGHT, InfoChipProps (+23 more)

### Community 104 - "space"
Cohesion: 0.09
Nodes (23): Builder and cabinet kit, ChoiceCardProps, styles, ImageUploaderProps, styles, OFFER_CTA_HEIGHT, OfferCard(), OfferCardProps (+15 more)

### Community 105 - "useEventEditor.ts"
Cohesion: 0.18
Nodes (11): venueEventsQueryKey(), defaultServices, eventDjsQueryKey(), Services, admin, event, start, UseEventEditor (+3 more)

### Community 106 - "usePostPage.ts"
Cohesion: 0.20
Nodes (22): refreshFeed(), useAddComment(), useAuthorPosts(), useBlockAuthor(), useComments(), useDeleteContent(), useEditPost(), useFeedAuthor() (+14 more)

### Community 107 - "services/venues.ts"
Cohesion: 0.13
Nodes (20): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, ClientError, getPublishedVenues(), getVenueById(), from (+12 more)

### Community 108 - "react"
Cohesion: 0.29
Nodes (6): react, currentApplication(), styles, useMyApplications(), AccountApplication, listMyApplications()

### Community 109 - "useCabinet.ts"
Cohesion: 0.14
Nodes (21): TeamForVenue(), cabinetKeys, useAcceptInvite(), useCancelInvite(), useInviteStaff(), useRemoveMember(), useVenueInvites(), useVenueMembers() (+13 more)

### Community 110 - "ModerationContent.tsx"
Cohesion: 0.13
Nodes (21): StaffModerationScreen(), ModerationContent(), styles, item, ModerationAction, moderationKeys, runModerationAction(), useModerationAction() (+13 more)

### Community 111 - "TextField.tsx"
Cohesion: 0.13
Nodes (17): DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness(), StringListFieldProps, styles (+9 more)

### Community 113 - "theme/index.ts"
Cohesion: 0.17
Nodes (16): GigRowProps, styles, OfferLifecycleStatus, STATUS_LABEL, styles, contrastRatio(), parseHex(), relativeLuminance() (+8 more)

### Community 114 - "t"
Cohesion: 0.13
Nodes (18): StaffLogin(), styles, SessionError(), SessionErrorProps, styles, SignInToPostSheet(), SignInToPostSheetProps, styles (+10 more)

### Community 115 - "pickAvatar"
Cohesion: 0.25
Nodes (10): expo-image-manipulator, expo-image-picker, pickPhoto(), addPhoto(), choosePhoto(), AVATAR_MAX_SIDE_PX, fitWithin(), pickAvatar() (+2 more)

### Community 116 - "supabase.ts"
Cohesion: 0.14
Nodes (15): useDjSearch(), env, escapeLike(), getEventDjs(), LinkRow, OptionRow, searchPublishedDjs(), setEventDjs() (+7 more)

### Community 117 - "VenueScreenContent.tsx"
Cohesion: 0.14
Nodes (19): VenueScreen(), CollapsibleSection(), shareVenue(), venueLink(), Message(), styles, onBack, onOpenEvent (+11 more)

### Community 118 - "FeedComposerFlow.tsx"
Cohesion: 0.18
Nodes (16): FeedRulesSheet(), pickCover(), pickPhoto(), FeedComposerFlow(), acceptRules(), addPhoto(), afterAuthor(), submit() (+8 more)

### Community 119 - "useClaimOffer.ts"
Cohesion: 0.17
Nodes (14): claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+6 more)

### Community 120 - "EditPostSheet.tsx"
Cohesion: 0.36
Nodes (7): BottomSheet(), ReportSheet(), EditPostSheet(), save(), styles, postImagePath(), postImagePaths()

### Community 121 - "0013 — Offer builder saves offers with direct table writes"
Cohesion: 0.40
Nodes (4): 0013 — Offer builder saves offers with direct table writes, Consequences, Context, Decision

### Community 122 - "useSession"
Cohesion: 0.09
Nodes (31): expo-router, react-native-safe-area-context, AcceptInviteScreen(), CabinetScreen(), CabinetOffersScreen(), CabinetProfileScreen(), CabinetTeamScreen(), DjCabinetScreen() (+23 more)

### Community 123 - "VenueApplicationForm.tsx"
Cohesion: 0.25
Nodes (11): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+3 more)

### Community 124 - "applications.ts"
Cohesion: 0.11
Nodes (18): ApplicationErrorCode, ApplicationKind, ApplicationRow, ApplicationStatus, DjApplicationDraft, text(), toApplication(), VenueApplicationDraft (+10 more)

### Community 125 - "cabinetAccess.ts"
Cohesion: 0.31
Nodes (7): canUseCabinet(), isValidInstagramUrl(), pickCabinetVenue(), admin, host, owner, CabinetVenue

### Community 126 - "kyivDayKey"
Cohesion: 0.14
Nodes (25): formatHomeDate(), HomeHeader(), styles, formatEventDay(), groupVenueWeek(), now, venueDayHeading(), venueEventRowProps() (+17 more)

### Community 127 - "ScannerScreenContent.tsx"
Cohesion: 0.18
Nodes (11): expo-camera, ScannerScreen(), ScanResult(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles (+3 more)

### Community 128 - "useTheme"
Cohesion: 0.20
Nodes (13): ApplyScreen(), EventScreen(), StatusPill(), EventScreenContent(), EventScreenContentProps, styles, ErrorText(), ACTION_LABEL (+5 more)

### Community 129 - "OfferWizard.tsx"
Cohesion: 0.21
Nodes (14): ChoiceCard(), StepIndicator(), Stepper(), TimeWindowPicker(), MAX_PER_GUEST, OfferIntent, errorText(), EventChoices (+6 more)

### Community 130 - "QRTicket.tsx"
Cohesion: 0.19
Nodes (12): QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps (+4 more)

### Community 131 - "EventFormArea.tsx"
Cohesion: 0.26
Nodes (9): StaffEventFormScreen(), SwitchField(), EventFormArea(), EventFormAreaProps, EventOffers(), styles, EventOffersSection(), OfferItem() (+1 more)

### Community 132 - "applications.test.ts"
Cohesion: 0.22
Nodes (8): useSubmitApplication(), ApplicationError, djPayload(), from, row, rpc, uploadApplicationPhoto(), venuePayload()

### Community 133 - "offerBuilder.test.tsx"
Cohesion: 0.20
Nodes (7): listBase, readyDraft, wizardBase, OffersAreaProps, OffersListProps, OfferWizardProps, BuilderOffer

### Community 134 - "@testing-library/react-native"
Cohesion: 0.22
Nodes (6): @testing-library/react-native, getBrightness, setBrightness, admin, host, item

### Community 135 - "MyTicketsContent.tsx"
Cohesion: 0.21
Nodes (10): TicketsScreen(), LoyaltyStampCard(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), Message(), MyTicketsContent() (+2 more)

### Community 136 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

### Community 137 - "TicketScreens.test.tsx"
Cohesion: 0.40
Nodes (3): claim, mockClaims, mockToken

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1100 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `useTheme`, `OfferWizard.tsx`, `QRTicket.tsx`, `EventFormArea.tsx`, `supabase.ts`, `MyTicketsContent.tsx`, `OfferRow.tsx`, `Button.tsx`, `AppText`, `ContentMenu.tsx`, `ui/index.ts`, `VenuesMapScreenContent.tsx`, `package.json`, `AppText.tsx`, `VenueEventsList.tsx`, `DjProfileEditor.tsx`, `PostScreenContent.tsx`, `OffersArea.tsx`, `DjScreenContent.tsx`, `AuthorScreenContent.tsx`, `touchTarget`, `components/TaxiBar.tsx`, `FeedScreenContent.tsx`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `VenueProfileEditor.tsx`, `EventDetails.tsx`, `claimedTokens.ts`, `ProfileScreenContent.tsx`, `useApplications.ts`, `EventForm.tsx`, `kit.test.tsx`, `space`, `react`, `ModerationContent.tsx`, `TextField.tsx`, `theme/index.ts`, `t`, `VenueScreenContent.tsx`, `FeedComposerFlow.tsx`, `EditPostSheet.tsx`, `useSession`, `VenueApplicationForm.tsx`, `kyivDayKey`, `ScannerScreenContent.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.14039408866995073 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `useTheme`, `OfferWizard.tsx`, `EventFormArea.tsx`, `supabase.ts`, `MyTicketsContent.tsx`, `TicketScreens.test.tsx`, `Button.tsx`, `jest`, `expo-constants@~58.0.15`, `AppText`, `ContentMenu.tsx`, `VenuesMapScreenContent.tsx`, `VenueEventsList.tsx`, `DjProfileEditor.tsx`, `PostScreenContent.tsx`, `OffersArea.tsx`, `Hola Fest — design rules`, `@tanstack/react-query`, `DjScreenContent.tsx`, `AuthorScreenContent.tsx`, `components/TaxiBar.tsx`, `FeedScreenContent.tsx`, `services/events.ts`, `venueProfile.ts`, `TicketScreenContent.tsx`, `VenueProfileEditor.tsx`, `EventDetails.tsx`, `ProfileScreenContent.tsx`, `app/_layout.tsx`, `useApplications.ts`, `EventForm.tsx`, `kit.test.tsx`, `react`, `ModerationContent.tsx`, `VenueScreenContent.tsx`, `FeedComposerFlow.tsx`, `useClaimOffer.ts`, `EditPostSheet.tsx`, `useSession`, `VenueApplicationForm.tsx`, `kyivDayKey`, `ScannerScreenContent.tsx`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `@tanstack/react-query` connect `@tanstack/react-query` to `@testing-library/react-native`, `TicketScreens.test.tsx`, `Button.tsx`, `VenuesMapScreenContent.tsx`, `package.json`, `types/admin.ts`, `PostScreenContent.tsx`, `DjScreenContent.tsx`, `AuthorScreenContent.tsx`, `FeedScreenContent.tsx`, `services/events.ts`, `services/claims.ts`, `useAdminVenueEvents.ts`, `useEvents.ts`, `EventDetails.tsx`, `ProfileScreenContent.tsx`, `app/_layout.tsx`, `useDjCabinet.ts`, `services/offerBuilder.ts`, `useApplications.ts`, `useEventEditor.ts`, `usePostPage.ts`, `services/venues.ts`, `react`, `useCabinet.ts`, `ModerationContent.tsx`, `supabase.ts`, `VenueScreenContent.tsx`, `useClaimOffer.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._