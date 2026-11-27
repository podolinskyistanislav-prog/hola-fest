# Graph Report - hola-fest  (2026-11-27)

## Corpus Check
- 501 files · ~177,498 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 2794 nodes · 7775 edges · 137 communities (128 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a2c002c0`
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
- usePostPage.ts
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- feed.ts
- 0001-foundation.md
- profile.ts
- _layout.tsx
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- useCabinet.ts
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
- package.json
- Accessibility (WCAG 2.2)
- with
- FeedScreenContent
- Quick Reference
- @testing-library/react-native
- types/admin.ts
- DjProfileEditor.tsx
- services/admin.ts
- VenueProfileArea.tsx
- PostScreenContent.test.tsx
- OffersArea.tsx
- build
- Hola Fest — design rules
- feed.test.ts
- djs.test.tsx
- AuthorScreenContent.test.tsx
- PostScreenContent.tsx
- components/TaxiBar.tsx
- services/djs.ts
- ui/index.ts
- services/events.ts
- VenueMap.tsx
- claims.test.ts
- venueProfile.ts
- TicketScreenContent.tsx
- feed-filter.ts
- staff/index.ts
- kyivTime.ts
- sessionStore.ts
- feed-post/handler.ts
- VenueProfileEditor.tsx
- EventDetails.tsx
- claimedTokens.ts
- 0008-eas-cloud-builds.md
- OffersList.tsx
- space
- mapHtml.ts
- useDjCabinet.ts
- services/offerBuilder.ts
- venueDashboard.test.ts
- applications.ts
- db-backend.md
- reviewer.md
- cors.ts
- redeem-claim/handler.ts
- Feed rules (Стрічка)
- eventFormValidation.ts
- venueDashboard.ts
- AppText
- useEventEditor.ts
- usePublishPost.ts
- services/venues.ts
- profileHooks.test.tsx
- venueTeam.ts
- moderation.ts
- useTheme
- 0011-offer-builder-model.md
- QRTicket.tsx
- app/_layout.tsx
- pickAvatar
- eventDjs.ts
- VenueScreenContent.tsx
- t
- useClaimOffer.ts
- postImagePaths
- 0013 — Offer builder saves offers with direct table writes
- TicketScreenContent
- tabsShell.test.tsx
- useStaffLogin.ts
- types/djs.ts
- clubList.ts
- services/claims.ts
- useSession
- supabase.ts
- useAdminVenueEvents.ts
- EventsScreenContent.tsx
- @tanstack/react-query
- FakeXhr
- VenueMap.web.test.tsx
- 0007 — Taxi deep links
- jest

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 224 edges
2. `useTheme()` - 213 edges
3. `t()` - 201 edges
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

## Communities (137 total, 9 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.13
Nodes (28): DetailsErrors, emptyOfferDraft, INTENT_STATUS, isDraftValid(), kindNeedsValue(), LimitsErrors, MAX_PER_GUEST, normalizedValue() (+20 more)

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
Cohesion: 0.16
Nodes (30): gigRowProps(), nextGigLine(), carouselCardProps(), CurfewInfo, dayFromId(), dayTile(), eventsOnDay(), filterEvents() (+22 more)

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

### Community 12 - "usePostPage.ts"
Cohesion: 0.21
Nodes (20): refreshFeed(), useAddComment(), useAuthorPosts(), useBlockAuthor(), useComments(), useDeleteContent(), useEditPost(), usePost() (+12 more)

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.09
Nodes (27): 0005 — Web build is a single-page app, 0009 — Web fallback for secret storage, Consequences, Context, Decision, @supabase/supabase-js@^2.118.0, @supabase/supabase-js, appEnvFromSupabaseStatus() (+19 more)

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
Cohesion: 0.11
Nodes (25): ADR-0012, useFeedAuthor(), CommentDraft, createPost(), encodeCursor(), FeedAuthorRow, FeedCommentRow, FeedLabel (+17 more)

### Community 22 - "profile.ts"
Cohesion: 0.15
Nodes (16): session(), signOut, profileKeys, useMyPosts(), Deps, ProfileSubmission, SaveProfileResult, getMyProfile() (+8 more)

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
Cohesion: 0.22
Nodes (14): AuthError, AuthErrorCode, ClientError, confirmEmailCode(), ensureGuestSession(), getSession(), onAuthChange(), requestEmailCode() (+6 more)

### Community 27 - "expo-glass-effect@~58.0.5"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, deno-version, fetch-depth, node-version (+5 more)

### Community 28 - "expo-image@~58.0.18"
Cohesion: 0.04
Nodes (47): 1. Tests BEFORE Code, 2. Coverage Requirements, 3. Test Types, 4. Git Checkpoints, API Integration Test Pattern, Best Practices, Bun Native Test Pattern (`bun:test`), CI/CD Integration (+39 more)

### Community 29 - "expo-linking@~58.0.16"
Cohesion: 0.20
Nodes (10): GITHUB_TOKEN, secrets-scan, permissions, contents, pull-requests, name, permissions, runs-on (+2 more)

### Community 30 - "useCabinet.ts"
Cohesion: 0.31
Nodes (11): styles, TeamForVenue(), cabinetKeys, useAcceptInvite(), useCancelInvite(), useInviteStaff(), useRemoveMember(), useVenueInvites() (+3 more)

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

### Community 36 - "expo-linking@~58.0.16"
Cohesion: 0.19
Nodes (13): Deps, EmailUpgradeStep, requestFailureMessage(), RunResult, setup(), UseEmailUpgrade, useEmailUpgrade(), isValidCode() (+5 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.17
Nodes (19): expo-image, react-native-svg, EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStarCover() (+11 more)

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
Cohesion: 0.18
Nodes (22): GlassPillButton(), GlassSearchField(), GlassSurface(), MapVenueCard(), filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues() (+14 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.05
Nodes (51): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18 (+43 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "FeedScreenContent"
Cohesion: 0.21
Nodes (9): FeedScreen(), FeedScreenContent(), like(), whenReady(), Message(), onOpenPost, onOpenProfileSetup, post (+1 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "@testing-library/react-native"
Cohesion: 0.33
Nodes (5): @testing-library/react-native, base, draft, published, VenueEventsListProps

### Community 61 - "types/admin.ts"
Cohesion: 0.16
Nodes (13): EventOffersSectionProps, base, offer, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers (+5 more)

### Community 62 - "DjProfileEditor.tsx"
Cohesion: 0.16
Nodes (21): safeLinkUrl(), DjProfileEditor(), DjProfileEditorProps, styles, addGenre(), BIO_MAX, buildProfileSave(), DjProfileErrors (+13 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (27): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+19 more)

### Community 64 - "VenueProfileArea.tsx"
Cohesion: 0.21
Nodes (13): CabinetProfileScreen(), cabinetErrorText(), useCabinetVenue(), useRemoveVenuePhoto(), Message(), ProfileEditorForVenue(), pickCover(), pickPhoto() (+5 more)

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
Cohesion: 0.08
Nodes (22): Admin form fields, Builder and cabinet kit, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit (+14 more)

### Community 69 - "feed.test.ts"
Cohesion: 0.17
Nodes (15): feedKeys, FeedData, post(), seed(), useFeedPosts(), useMyClubs(), useToggleLike(), withLike() (+7 more)

### Community 70 - "djs.test.tsx"
Cohesion: 0.24
Nodes (11): DjScreen(), filterDjsByName(), alex, nova, DjScreenContent(), djKeys, DJS_STALE_TIME_MS, useDj() (+3 more)

### Community 71 - "AuthorScreenContent.test.tsx"
Cohesion: 0.22
Nodes (8): author, onBack, onOpenPost, post, renderAuthor(), EditPostSheetProps, FeedAuthor, FeedPost

### Community 72 - "PostScreenContent.tsx"
Cohesion: 0.08
Nodes (38): @expo/vector-icons, PostScreen(), AuthorScreen(), AuthorKind, AuthorLabel(), AuthorLabelProps, FILL, styles (+30 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.17
Nodes (18): styles, TaxiBar(), TaxiBarProps, destination, openMock, EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles (+10 more)

### Community 74 - "services/djs.ts"
Cohesion: 0.15
Nodes (19): djSlug(), normalizeDjName(), byNextGigThenName(), DjEventRow, DjsErrorCode, getLineupTextDjs(), getPublishedProfileDjs(), groupDjs() (+11 more)

### Community 75 - "ui/index.ts"
Cohesion: 0.03
Nodes (136): react-native, FloatingTabBar(), ITEMS, TabsLayout(), AccentBlobs(), styles, Tone, BottomSheetProps (+128 more)

### Community 76 - "services/events.ts"
Cohesion: 0.09
Nodes (27): event, onBack, onOpenDj, onOpenVenue, renderScreen(), WEDNESDAY, useEvent(), ClientError (+19 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.16
Nodes (22): react-native-webview@14.0.1, react-native-webview, buildMapHtml(), encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue (+14 more)

### Community 78 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 79 - "venueProfile.ts"
Cohesion: 0.13
Nodes (25): useSaveVenueProfile(), useUploadVenueCover(), useUploadVenuePhoto(), useVenueProfile(), addVenuePhoto(), getMyVenueProfile(), listPhotos(), PhotoRow (+17 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.15
Nodes (17): LoyaltyStampCard(), ClubLoyalty, LOYALTY_GOAL, loyaltyCards(), LoyaltySection(), MyTicketsContentProps, styles, detailsText() (+9 more)

### Community 81 - "feed-filter.ts"
Cohesion: 0.11
Nodes (24): BANNED_WORDS, demoTexts, feedSection, anyMatch(), DATE, DISCOUNT_PATTERNS, EVENT_DATE_TIME, filterFeedText() (+16 more)

### Community 82 - "staff/index.ts"
Cohesion: 0.18
Nodes (12): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+4 more)

### Community 83 - "kyivTime.ts"
Cohesion: 0.19
Nodes (23): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), useEventsForDay(), useEventsForWeek(), useHomeEvents() (+15 more)

### Community 84 - "sessionStore.ts"
Cohesion: 0.21
Nodes (10): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+2 more)

### Community 85 - "feed-post/handler.ts"
Cohesion: 0.18
Nodes (26): CommentInput, FeedCommentDeps, handleFeedComment(), call(), FeedPostDeps, handleFeedPost(), parseInput(), PostInput (+18 more)

### Community 86 - "VenueProfileEditor.tsx"
Cohesion: 0.11
Nodes (25): InfoChip(), PhotoGallery(), AcceptInviteAreaProps, editorBase, homeBase, profile, teamBase, canUseCabinet() (+17 more)

### Community 87 - "EventDetails.tsx"
Cohesion: 0.17
Nodes (17): HolaStar(), LineupChip(), OfferCard(), coverImageUri(), EventDetails(), EventDetailsProps, styles, curfewInfo() (+9 more)

### Community 88 - "claimedTokens.ts"
Cohesion: 0.19
Nodes (14): expo-secure-store@~58.0.2, expo-secure-store, acceptRules(), afterAuthor(), hasSeenFeedRules(), markFeedRulesSeen(), mockStore, mockRead (+6 more)

### Community 90 - "OffersList.tsx"
Cohesion: 0.11
Nodes (22): StatusPill(), StatusPillProps, ErrorText(), OfferRowAction, offerRowActions(), pillStatus(), listBase, readyDraft (+14 more)

### Community 91 - "space"
Cohesion: 0.15
Nodes (19): ProfileScreen(), ProfileSetupScreen(), PostRow(), ProfileScreenContent(), ProfileScreenContentProps, styles, HANDLE_HINTS, ProfileSetupForm() (+11 more)

### Community 92 - "mapHtml.ts"
Cohesion: 0.19
Nodes (12): DARK_CANVAS_FILTER, inlineJson(), KYIV_CENTER, MAP_ATTRIBUTION, MapHtmlOptions, MAPLIBRE_CSS_SRI, MAPLIBRE_CSS_URL, MAPLIBRE_JS_SRI (+4 more)

### Community 93 - "useDjCabinet.ts"
Cohesion: 0.14
Nodes (19): DjProfileFormValues, djCabinetKeys, useMyDjProfile(), useMyGigs(), usePublishMyDj(), getMyDjProfile(), getMyGigs(), GigRow (+11 more)

### Community 94 - "services/offerBuilder.ts"
Cohesion: 0.13
Nodes (24): callOfferAction(), ClientError, duplicateOffer(), endOffer(), formatKyivTime(), generateOfferTerms(), listVenueOffers(), OFFER_KINDS (+16 more)

### Community 95 - "venueDashboard.test.ts"
Cohesion: 0.22
Nodes (7): chain(), events, from, now, Result, setup(), stats

### Community 96 - "applications.ts"
Cohesion: 0.06
Nodes (51): DjFormValues, isDjFormComplete(), isVenueFormComplete(), MAX_VENUE_PHOTOS, parseGenres(), dj, venue, VenueFormValues (+43 more)

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
Cohesion: 0.17
Nodes (15): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, eventToFormValues(), LINEUP_DJS_MAX, LINEUP_ITEM_MAX_LENGTH (+7 more)

### Community 103 - "venueDashboard.ts"
Cohesion: 0.27
Nodes (9): useVenueDashboard(), AdminEventListItem, countClaims(), DashboardOffer, getVenueDashboard(), listLiveOffers(), LiveOfferRow, startOfDay() (+1 more)

### Community 104 - "AppText"
Cohesion: 0.10
Nodes (33): ApplyScreen(), AppText(), Chip(), ChoiceCard(), styles, ImageUploader(), OfferPreview(), StepIndicator() (+25 more)

### Community 105 - "useEventEditor.ts"
Cohesion: 0.18
Nodes (12): EventSubmission, venueEventsQueryKey(), defaultServices, eventDjsQueryKey(), Services, admin, event, start (+4 more)

### Community 106 - "usePublishPost.ts"
Cohesion: 0.17
Nodes (11): 0012 — Post image upload through XHR, feedErrorMessage(), KEYS, Deps, PostSubmission, PublishResult, setup(), usePublishPost() (+3 more)

### Community 107 - "services/venues.ts"
Cohesion: 0.09
Nodes (28): onBack, onOpenEvent, onOpenMap, venue, weekEvent, onOpenEvent, onOpenVenue, panorama (+20 more)

### Community 108 - "profileHooks.test.tsx"
Cohesion: 0.39
Nodes (5): session(), HANDLE_DEBOUNCE_MS, HandleStatus, useHandleAvailability(), checkHandleAvailable()

### Community 109 - "venueTeam.ts"
Cohesion: 0.13
Nodes (22): ClientError, toVenueCabinetError(), VenueCabinetError, VenueCabinetErrorCode, acceptVenueInvite(), CabinetRow, CabinetVenue, InviteRow (+14 more)

### Community 110 - "moderation.ts"
Cohesion: 0.14
Nodes (19): item, ModerationAction, moderationKeys, runModerationAction(), useModerationAction(), useModerationQueue(), ReportReason, AuthorRow (+11 more)

### Community 111 - "useTheme"
Cohesion: 0.09
Nodes (37): react, EventScreen(), TicketsScreen(), VenueScreen(), DateTimeField(), DateTimeFieldProps, formatDateTime(), pad() (+29 more)

### Community 113 - "QRTicket.tsx"
Cohesion: 0.10
Nodes (25): toqr@^0.1.1, toqr, AppTextProps, QRCard(), DarkRun, QRCode(), qrDarkRuns(), QRTicket() (+17 more)

### Community 114 - "app/_layout.tsx"
Cohesion: 0.26
Nodes (8): expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, expo-splash-screen, expo-status-bar, RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 115 - "pickAvatar"
Cohesion: 0.25
Nodes (10): expo-image-manipulator, expo-image-picker, pickPhoto(), addPhoto(), choosePhoto(), AVATAR_MAX_SIDE_PX, fitWithin(), pickAvatar() (+2 more)

### Community 116 - "eventDjs.ts"
Cohesion: 0.20
Nodes (14): useDjSearch(), djMediaUrl(), toDjsError(), escapeLike(), getEventDjs(), LinkRow, OptionRow, searchPublishedDjs() (+6 more)

### Community 117 - "VenueScreenContent.tsx"
Cohesion: 0.17
Nodes (17): CollapsibleSection(), GlassIconButton(), shareVenue(), venueLink(), useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS (+9 more)

### Community 118 - "t"
Cohesion: 0.05
Nodes (71): react-native-safe-area-context, DjsScreen(), BottomSheet(), Button(), Composer(), COMPOSER_MAX_CHARS, EventCard(), FEED_RULES (+63 more)

### Community 119 - "useClaimOffer.ts"
Cohesion: 0.21
Nodes (13): rememberClaimToken(), tokenKey(), ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState (+5 more)

### Community 120 - "postImagePaths"
Cohesion: 0.70
Nodes (3): save(), postImagePath(), postImagePaths()

### Community 121 - "0013 — Offer builder saves offers with direct table writes"
Cohesion: 0.40
Nodes (4): 0013 — Offer builder saves offers with direct table writes, Consequences, Context, Decision

### Community 122 - "TicketScreenContent"
Cohesion: 0.17
Nodes (10): expo-brightness@~58.0.2, expo-brightness, TicketScreen(), TicketScreenContent(), useNow(), getBrightness, setBrightness, useMaxBrightness() (+2 more)

### Community 123 - "tabsShell.test.tsx"
Cohesion: 0.38
Nodes (4): EventsScreen(), MapScreen(), mockNavigate, mockPush

### Community 124 - "useStaffLogin.ts"
Cohesion: 0.47
Nodes (3): Deps, UseStaffLogin, useStaffLogin()

### Community 125 - "types/djs.ts"
Cohesion: 0.33
Nodes (5): LineupDjPickerProps, Dj, DjGig, DjOption, MyDjProfileInput

### Community 126 - "clubList.ts"
Cohesion: 0.43
Nodes (5): ClubRow, clubRows(), eventAt(), venue(), EventSummary

### Community 127 - "services/claims.ts"
Cohesion: 0.10
Nodes (22): ScanFailureReason, requestPermission, Deps, FAILURE_REASON, ScanState, useScanRedeem(), onCodeScanned(), ClaimRow (+14 more)

### Community 128 - "useSession"
Cohesion: 0.08
Nodes (32): expo-router, AcceptInviteScreen(), CabinetScreen(), CabinetOffersScreen(), CabinetTeamScreen(), DjCabinetScreen(), ScannerScreen(), StaffApplicationsScreen() (+24 more)

### Community 129 - "supabase.ts"
Cohesion: 0.36
Nodes (3): env, rpc, supabase

### Community 134 - "useAdminVenueEvents.ts"
Cohesion: 0.16
Nodes (12): StaffEventsScreen(), defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+4 more)

### Community 136 - "EventsScreenContent.tsx"
Cohesion: 0.11
Nodes (23): DayStrip(), FilterChips(), mockedScheme, formatHomeDate(), HomeHeader(), styles, SectionHeader(), HOME_FILTER_IDS (+15 more)

### Community 137 - "@tanstack/react-query"
Cohesion: 0.23
Nodes (9): @tanstack/react-query, getClaimToken(), claimKeys, claim, mockClaims, mockToken, useClaimToken(), useMyClaims() (+1 more)

### Community 139 - "VenueMap.web.test.tsx"
Cohesion: 0.33
Nodes (4): Listener, listeners, mount(), venue

### Community 140 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 142 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

## Knowledge Gaps
- **2 isolated node(s):** `ADR-0012`, `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1102 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `t()` connect `t` to `useSession`, `supabase.ts`, `EventsScreenContent.tsx`, `@tanstack/react-query`, `profile.ts`, `expo-constants@~58.0.15`, `useCabinet.ts`, `expo-linking@~58.0.16`, `VenuesMapScreenContent.tsx`, `FeedScreenContent`, `DjProfileEditor.tsx`, `VenueProfileArea.tsx`, `PostScreenContent.test.tsx`, `OffersArea.tsx`, `Hola Fest — design rules`, `djs.test.tsx`, `AuthorScreenContent.test.tsx`, `PostScreenContent.tsx`, `components/TaxiBar.tsx`, `ui/index.ts`, `services/events.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `VenueProfileEditor.tsx`, `EventDetails.tsx`, `OffersList.tsx`, `space`, `applications.ts`, `AppText`, `usePublishPost.ts`, `services/venues.ts`, `profileHooks.test.tsx`, `moderation.ts`, `useTheme`, `app/_layout.tsx`, `VenueScreenContent.tsx`, `useClaimOffer.ts`, `TicketScreenContent`, `tabsShell.test.tsx`, `useStaffLogin.ts`, `clubList.ts`, `services/claims.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `ADR-0012`, `expo/tsconfig.base` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1310344827586207 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `ui/index.ts` to `useSession`, `EventsScreenContent.tsx`, `useCabinet.ts`, `react-dom@19.3.0`, `VenuesMapScreenContent.tsx`, `package.json`, `FeedScreenContent`, `DjProfileEditor.tsx`, `VenueProfileArea.tsx`, `OffersArea.tsx`, `djs.test.tsx`, `PostScreenContent.tsx`, `components/TaxiBar.tsx`, `services/events.ts`, `VenueMap.tsx`, `TicketScreenContent.tsx`, `staff/index.ts`, `VenueProfileEditor.tsx`, `EventDetails.tsx`, `claimedTokens.ts`, `OffersList.tsx`, `space`, `AppText`, `useTheme`, `QRTicket.tsx`, `VenueScreenContent.tsx`, `t`, `TicketScreenContent`, `tabsShell.test.tsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `AppText()` connect `AppText` to `useSession`, `supabase.ts`, `EventsScreenContent.tsx`, `useCabinet.ts`, `react-dom@19.3.0`, `VenuesMapScreenContent.tsx`, `FeedScreenContent`, `DjProfileEditor.tsx`, `VenueProfileArea.tsx`, `OffersArea.tsx`, `PostScreenContent.tsx`, `components/TaxiBar.tsx`, `ui/index.ts`, `TicketScreenContent.tsx`, `staff/index.ts`, `VenueProfileEditor.tsx`, `EventDetails.tsx`, `OffersList.tsx`, `space`, `useTheme`, `QRTicket.tsx`, `VenueScreenContent.tsx`, `t`, `TicketScreenContent`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._