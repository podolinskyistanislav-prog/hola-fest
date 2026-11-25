# Graph Report - hola-fest  (2026-11-25)

## Corpus Check
- 343 files · ~111,358 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1980 nodes · 4925 edges · 111 communities (101 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1f929d81`
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
- useTheme
- .prettierrc.json
- db-backend.md
- mobile.md
- dependencies
- orchestrator.md
- reviewer.md
- security-qa.md
- jest
- 0001-foundation.md
- react
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
- expo-linking@~58.0.16
- VenueScreenContent.tsx
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
- GlassSurface
- Quick Reference
- services/venues.ts
- EventsScreenContent.test.tsx
- react-native
- services/admin.ts
- OfferForm.tsx
- types/admin.ts
- @tanstack/react-query
- build
- Hola Fest — design rules
- useEventEditor.ts
- DjScreenContent.tsx
- EventsScreenContent.tsx
- sessionStore.ts
- components/TaxiBar.tsx
- claimedTokens.ts
- HolaStar.tsx
- EventForm.tsx
- VenueMap.tsx
- services/claims.ts
- EventDetails.tsx
- TicketScreenContent.tsx
- theme/index.ts
- ui/index.ts
- kyivDayKey
- t
- auth.ts
- @testing-library/react-native
- MyTicketsContent.tsx
- AppText
- 0008-eas-cloud-builds.md
- tabsShell.test.tsx
- QRTicket.tsx
- app/_layout.tsx
- expo-router
- OfferRow.tsx
- TicketScreens.test.tsx
- VenueEventsList.tsx
- db-backend.md
- reviewer.md
- OfferFormArea.tsx
- useScanRedeem.ts
- Feed rules (Стрічка)
- expo-splash-screen
- expo-system-ui@~58.0.7
- mapHtml.ts
- i18n/index.ts
- useAdminVenueEvents.ts
- useVenues.ts
- loyaltyCards.ts
- 0007 — Taxi deep links
- contrast.ts

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 153 edges
2. `useTheme()` - 151 edges
3. `react-native` - 107 edges
4. `t()` - 106 edges
5. `space` - 67 edges
6. `Button()` - 60 edges
7. `radius` - 49 edges
8. `@testing-library/react-native` - 44 edges
9. `react` - 41 edges
10. `brand` - 32 edges

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

## Communities (111 total, 10 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (22): expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-status-bar@~58.0.4, react-dom@19.3.0, @react-native-async-storage/async-storage@2.2.0, react-native-web@~0.21.4, react-native-worklets@0.13.0 (+14 more)

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
Cohesion: 0.08
Nodes (32): Builder and cabinet kit, styles, HolaStar(), INFO_CHIP_HEIGHT, InfoChipProps, styles, LINEUP_CHIP_HEIGHT, LineupChip() (+24 more)

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

### Community 12 - "useTheme"
Cohesion: 0.12
Nodes (24): EventScreen(), EventsScreen(), VenueScreen(), ButtonProps, ButtonVariant, styles, Composer(), COMPOSER_MAX_CHARS (+16 more)

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

### Community 22 - "react"
Cohesion: 0.29
Nodes (7): react, StaffLoginFormProps, styles, UseSession, Deps, UseStaffLogin, useStaffLogin()

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

### Community 30 - "fonts.ts"
Cohesion: 0.33
Nodes (6): expo-linking@~58.0.16, expo-linking, eventLink(), shareEvent(), shareVenue(), venueLink()

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

### Community 37 - "VenueScreenContent.tsx"
Cohesion: 0.19
Nodes (17): formatEventDay(), EventRow(), Message(), styles, VenueBody(), VenueScreenContent(), VenueScreenContentProps, WeekOfEvents() (+9 more)

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
Cohesion: 0.09
Nodes (20): ClaimDeps, ClaimResult, ERRORS, handleClaimOffer(), json(), sha256Hex(), toHex(), admin (+12 more)

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
Cohesion: 0.24
Nodes (16): filterVenuesByName(), firstEventByVenue(), KNOWN_ACCENTS, mappableVenues(), resolveSelectedVenueId(), base, TodayOffer, todayOffers() (+8 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "dependencies"
Cohesion: 0.07
Nodes (30): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-image@~58.0.18, expo-symbols@~58.0.4, @expo/ui@~58.0.27, @expo/vector-icons@^15.0.2 (+22 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "GlassSurface"
Cohesion: 0.08
Nodes (30): DAY_PILL_HEIGHT, DayStrip(), DayStripDay, DayStripProps, styles, EventCard(), EventCardProps, EventCoverColor (+22 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "services/venues.ts"
Cohesion: 0.07
Nodes (31): eventAt(), venue(), onBack, onOpenEvent, onOpenMap, renderScreen(), venue, weekEvent (+23 more)

### Community 61 - "EventsScreenContent.test.tsx"
Cohesion: 0.25
Nodes (7): event, onOpenEvent, onOpenMap, onOpenVenue, onTitleLongPress, renderScreen(), venue

### Community 62 - "react-native"
Cohesion: 0.10
Nodes (25): react-native, AppTextProps, Tone, ChoiceCard(), ChoiceCardProps, styles, GigRowProps, styles (+17 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (27): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+19 more)

### Community 64 - "OfferForm.tsx"
Cohesion: 0.20
Nodes (15): OfferForm(), OfferFormProps, styles, base, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH, OfferFormErrors (+7 more)

### Community 65 - "types/admin.ts"
Cohesion: 0.17
Nodes (11): EventOffersSectionProps, base, offer, defaultServices, Services, offer, UseEventOffers, setOfferActive() (+3 more)

### Community 66 - "@tanstack/react-query"
Cohesion: 0.23
Nodes (8): @tanstack/react-query, claimKeys, ClaimButtonState, FAILURE_STATE, mockClaim, setup(), ClaimFailureReason, ClaimOfferResult

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.09
Nodes (20): Admin form fields, Club kit, Colors, Day strip, Event card, Event covers (until real photos exist), Event, QR and map kit, Every screen (+12 more)

### Community 69 - "useEventEditor.ts"
Cohesion: 0.17
Nodes (11): venueEventsQueryKey(), defaultServices, Services, admin, event, start, UseEventEditor, useEventEditor() (+3 more)

### Community 70 - "DjScreenContent.tsx"
Cohesion: 0.08
Nodes (37): DjScreen(), DjsScreen(), GigRow(), GlassSearchField(), filterDjsByName(), genresLine(), gigRowProps(), nextGigLine() (+29 more)

### Community 71 - "EventsScreenContent.tsx"
Cohesion: 0.15
Nodes (27): FilterChips(), SectionHeader(), carouselCardProps(), CurfewInfo, dayFromId(), dayTile(), eventsOnDay(), filterEvents() (+19 more)

### Community 72 - "sessionStore.ts"
Cohesion: 0.22
Nodes (9): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+1 more)

### Community 73 - "components/TaxiBar.tsx"
Cohesion: 0.17
Nodes (18): styles, TaxiBar(), TaxiBarProps, destination, openMock, EventTaxiBarProps, PLACEHOLDER_PROVIDERS, styles (+10 more)

### Community 74 - "claimedTokens.ts"
Cohesion: 0.24
Nodes (12): expo-secure-store@~58.0.2, expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret() (+4 more)

### Community 75 - "HolaStar.tsx"
Cohesion: 0.19
Nodes (16): EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStarCover(), HolaStarCoverProps, HolaStarProps (+8 more)

### Community 76 - "EventForm.tsx"
Cohesion: 0.19
Nodes (15): EventFormProps, styles, base, emptyEventForm, EventFormErrors, EventFormValues, EventSubmission, LINEUP_ITEM_MAX_LENGTH (+7 more)

### Community 77 - "VenueMap.tsx"
Cohesion: 0.13
Nodes (24): encodeToMap(), FromMapMessage, injectedScriptFor(), MapAccent, MapVenue, parseFromMap(), venue, ToMapMessage (+16 more)

### Community 78 - "services/claims.ts"
Cohesion: 0.11
Nodes (19): requestPermission, claimOffer(), ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage(), readFailureReason() (+11 more)

### Community 79 - "EventDetails.tsx"
Cohesion: 0.13
Nodes (22): GlassIconButton(), InfoChip(), coverImageUri(), EventDetails(), EventDetailsProps, styles, curfewInfo(), formatEventWhen() (+14 more)

### Community 80 - "TicketScreenContent.tsx"
Cohesion: 0.20
Nodes (17): AccentBlobs(), QRCard(), detailsText(), pillText(), styles, TicketScreenContent(), TicketScreenContentProps, useNow() (+9 more)

### Community 81 - "theme/index.ts"
Cohesion: 0.22
Nodes (12): FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles, ColorScheme, glassOnCover, Palette (+4 more)

### Community 82 - "ui/index.ts"
Cohesion: 0.09
Nodes (31): BottomSheet(), BottomSheetProps, styles, Chip(), ChipProps, styles, FEED_RULES, FeedRulesSheet() (+23 more)

### Community 83 - "kyivDayKey"
Cohesion: 0.07
Nodes (54): DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), TextFieldProps, weekDays(), dayRange(), endOfWeek() (+46 more)

### Community 84 - "t"
Cohesion: 0.14
Nodes (22): react-native-safe-area-context, StaffLogin(), styles, Button(), SessionError(), SessionErrorProps, styles, StaffLoginForm() (+14 more)

### Community 85 - "auth.ts"
Cohesion: 0.30
Nodes (11): AuthError, AuthErrorCode, ClientError, ensureGuestSession(), getSession(), onAuthChange(), signInStaff(), signOut() (+3 more)

### Community 86 - "@testing-library/react-native"
Cohesion: 0.18
Nodes (13): @testing-library/react-native, StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps (+5 more)

### Community 87 - "MyTicketsContent.tsx"
Cohesion: 0.29
Nodes (9): TicketsScreen(), LoyaltyStampCard(), tabBarInset(), LoyaltySection(), Message(), MyTicketsContent(), MyTicketsContentProps, styles (+1 more)

### Community 88 - "AppText"
Cohesion: 0.09
Nodes (28): react-native-svg, AppText(), CollapsibleSection(), CollapsibleSectionProps, styles, GlassPillButton(), GlassPillButtonProps, styles (+20 more)

### Community 90 - "tabsShell.test.tsx"
Cohesion: 0.27
Nodes (7): FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), TabBarItem, mockNavigate, mockPush

### Community 91 - "QRTicket.tsx"
Cohesion: 0.25
Nodes (9): DarkRun, QRCode(), qrDarkRuns(), QRTicket(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles (+1 more)

### Community 92 - "app/_layout.tsx"
Cohesion: 0.46
Nodes (4): RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 93 - "expo-router"
Cohesion: 0.19
Nodes (10): expo-router@~58.0.30, expo-router, StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), TicketScreen(), useSession(), VenueEventsArea() (+2 more)

### Community 94 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

### Community 95 - "TicketScreens.test.tsx"
Cohesion: 0.20
Nodes (8): expo-brightness@~58.0.2, expo-brightness, claim, mockClaims, mockToken, getBrightness, setBrightness, useMaxBrightness()

### Community 96 - "VenueEventsList.tsx"
Cohesion: 0.24
Nodes (8): EventRowProps, Skeleton(), styles, base, draft, published, VenueEventsList(), VenueEventsListProps

### Community 97 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 99 - "OfferFormArea.tsx"
Cohesion: 0.21
Nodes (10): OfferFormArea(), OfferFormAreaProps, styles, offerToFormValues(), eventOffersQueryKey(), defaultServices, Services, offer (+2 more)

### Community 100 - "useScanRedeem.ts"
Cohesion: 0.21
Nodes (9): ScannerScreen(), ScannerScreenContent(), Deps, FAILURE_REASON, ScanState, useScanRedeem(), onCodeScanned(), RedeemClaimResult (+1 more)

### Community 101 - "Feed rules (Стрічка)"
Cohesion: 0.50
Nodes (3): Enforcement, Feed rules (Стрічка), For everyone (guests, clubs, DJs)

### Community 104 - "mapHtml.ts"
Cohesion: 0.22
Nodes (12): buildMapHtml(), inlineJson(), KYIV_CENTER, LEAFLET_CSS_SRI, LEAFLET_CSS_URL, LEAFLET_JS_SRI, LEAFLET_JS_URL, MAP_ATTRIBUTION (+4 more)

### Community 105 - "i18n/index.ts"
Cohesion: 0.24
Nodes (8): ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), useClaimOffer(), TranslationKey, uk

### Community 106 - "useAdminVenueEvents.ts"
Cohesion: 0.21
Nodes (9): defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), VenueEventsAreaProps (+1 more)

### Community 107 - "useVenues.ts"
Cohesion: 0.44
Nodes (5): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, getPublishedVenues()

### Community 108 - "loyaltyCards.ts"
Cohesion: 0.40
Nodes (3): ClubLoyalty, LOYALTY_GOAL, loyaltyCards()

### Community 109 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 110 - "contrast.ts"
Cohesion: 0.83
Nodes (3): contrastRatio(), parseHex(), relativeLuminance()

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 857 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `react-native` to `package.json`, `supabase.ts`, `useTheme`, `react`, `fonts.ts`, `expo-linking@~58.0.16`, `VenueScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `dependencies`, `GlassSurface`, `OfferForm.tsx`, `DjScreenContent.tsx`, `EventsScreenContent.tsx`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `HolaStar.tsx`, `EventForm.tsx`, `VenueMap.tsx`, `EventDetails.tsx`, `TicketScreenContent.tsx`, `theme/index.ts`, `ui/index.ts`, `t`, `@testing-library/react-native`, `MyTicketsContent.tsx`, `AppText`, `tabsShell.test.tsx`, `QRTicket.tsx`, `expo-router`, `OfferRow.tsx`, `VenueEventsList.tsx`, `OfferFormArea.tsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `package.json`, `devDependencies`, `supabase.ts`, `useTheme`, `react`, `expo-linking@~58.0.16`, `GlassSurface`, `services/venues.ts`, `EventsScreenContent.test.tsx`, `react-native`, `OfferForm.tsx`, `types/admin.ts`, `@tanstack/react-query`, `useEventEditor.ts`, `DjScreenContent.tsx`, `sessionStore.ts`, `components/TaxiBar.tsx`, `claimedTokens.ts`, `EventForm.tsx`, `VenueMap.tsx`, `services/claims.ts`, `EventDetails.tsx`, `theme/index.ts`, `kyivDayKey`, `t`, `AppText`, `tabsShell.test.tsx`, `QRTicket.tsx`, `app/_layout.tsx`, `TicketScreens.test.tsx`, `VenueEventsList.tsx`, `OfferFormArea.tsx`, `useScanRedeem.ts`, `i18n/index.ts`, `useAdminVenueEvents.ts`, `useVenues.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `useTheme`, `react`, `VenueScreenContent.tsx`, `VenuesMapScreenContent.tsx`, `GlassSurface`, `services/venues.ts`, `EventsScreenContent.test.tsx`, `OfferForm.tsx`, `Hola Fest — design rules`, `DjScreenContent.tsx`, `EventsScreenContent.tsx`, `components/TaxiBar.tsx`, `EventForm.tsx`, `services/claims.ts`, `EventDetails.tsx`, `TicketScreenContent.tsx`, `@testing-library/react-native`, `MyTicketsContent.tsx`, `AppText`, `tabsShell.test.tsx`, `app/_layout.tsx`, `TicketScreens.test.tsx`, `VenueEventsList.tsx`, `OfferFormArea.tsx`, `useScanRedeem.ts`, `i18n/index.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._