# Graph Report - hola-fest  (2026-11-07)

## Corpus Check
- 269 files · ~82,786 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1651 nodes · 3625 edges · 103 communities (89 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 79 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `98afca6e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- devDependencies
- expo
- Hola Fest — Architecture
- compilerOptions
- supabase.ts
- scripts
- Hola Fest — rules for every agent
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
- components/TaxiBar.tsx
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
- AppText
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
- useTheme
- edge-functions
- on
- package.json
- Accessibility (WCAG 2.2)
- with
- claimedTokens.ts
- Quick Reference
- claims.test.ts
- space
- homeComponents.test.tsx
- services/admin.ts
- types/admin.ts
- QRTicket.tsx
- VenueMap.tsx
- build
- Hola Fest — design rules
- useAdminVenueEvents.ts
- useEventEditor.ts
- @tanstack/react-query
- useMyClaims.ts
- react-native-web@~0.21.4
- useSession
- theme/index.ts
- eventFormValidation.ts
- t
- auth.ts
- useClaimOffer.ts
- Button
- kit.test.tsx
- VenueEventsList.tsx
- ui/index.ts
- EventFormArea.tsx
- GlassSurface
- ScannerScreenContent.tsx
- app/_layout.tsx
- Hola Fest — Architecture
- 0008-eas-cloud-builds.md
- @expo/ui@~58.0.27
- MyTicketsContent.tsx
- 0007 — Taxi deep links
- @react-native-async-storage/async-storage
- main
- tabsShell.test.tsx
- Hola Fest — Product
- How the agent team works
- Hola Fest
- @testing-library/react-native
- react-dom@19.3.0
- react-native-reanimated@4.7.1
- react-native-screens@~4.30.1

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 98 edges
2. `useTheme()` - 93 edges
3. `t()` - 79 edges
4. `react-native` - 67 edges
5. `Button()` - 52 edges
6. `space` - 44 edges
7. `@testing-library/react-native` - 36 edges
8. `GlassSurface()` - 33 edges
9. `react` - 31 edges
10. `@tanstack/react-query` - 29 edges

## Surprising Connections (you probably didn't know these)
- `Одноразове налаштування` --references--> `main()`  [INFERRED]
  README.md → scripts/screenshots/run.ts
- `Typography` --references--> `AppText()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/AppText.tsx
- `Day strip` --references--> `DayStrip()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/DayStrip.tsx
- `Event card` --references--> `EventCard()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/EventCard.tsx
- `Liquid glass` --references--> `GlassSurface()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/GlassSurface.tsx

## Import Cycles
- None detected.

## Communities (103 total, 14 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.07
Nodes (28): dependencies, expo-build-properties@~58.0.12, expo-constants@~58.0.15, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-router@~58.0.30, expo-secure-store@~58.0.2, expo-splash-screen@~58.0.13 (+20 more)

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
Cohesion: 0.07
Nodes (42): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, KYIV_REGION, mappableVenues(), base, formatEventWhen() (+34 more)

### Community 6 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, android, check, db:types, db:verify, format, ios, lint (+5 more)

### Community 7 - "Hola Fest — rules for every agent"
Cohesion: 0.17
Nodes (7): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), MVP roadmap

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
Cohesion: 0.13
Nodes (20): Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage() (+12 more)

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.15
Nodes (14): 0005 — Web build is a single-page app, appEnvFromSupabaseStatus(), buildShotPlan(), resolveStaticPath(), Shot, exportWeb(), MIME, readSupabaseStatus() (+6 more)

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

### Community 22 - "components/TaxiBar.tsx"
Cohesion: 0.20
Nodes (14): styles, TaxiBar(), TaxiBarProps, destination, openMock, buildTaxiLinks(), isValidCoordinate(), LinkOpener (+6 more)

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
Cohesion: 0.05
Nodes (76): DayStripDay, formatHomeDate(), tabBarInset(), EventDetailsProps, dayFromId(), eventCardProps(), formatEventDay(), formatEventTime() (+68 more)

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

### Community 36 - "AppText"
Cohesion: 0.21
Nodes (14): AppText(), Chip(), availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles (+6 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.18
Nodes (12): StaffScreen(), getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, StaffHome(), StaffHomeProps, styles (+4 more)

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
Cohesion: 0.11
Nodes (16): ClaimDeps, ClaimResult, ERRORS, handleClaimOffer(), json(), sha256Hex(), toHex(), admin (+8 more)

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

### Community 52 - "useTheme"
Cohesion: 0.25
Nodes (11): expo-router, react-native, EventScreen(), StaffLogin(), styles, MapScreen(), TicketScreen(), TicketsScreen() (+3 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.10
Nodes (20): expo@~58.0.23, expo-device@~58.0.5, expo-image@~58.0.18, expo-linking@~58.0.16, expo-symbols@~58.0.4, react-native-maps@1.29.11, react-native-worklets@0.13.0, toqr@^0.1.1 (+12 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "claimedTokens.ts"
Cohesion: 0.31
Nodes (10): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret(), readSecret() (+2 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "claims.test.ts"
Cohesion: 0.25
Nodes (4): from, getSession, invoke, row

### Community 61 - "space"
Cohesion: 0.12
Nodes (18): styles, AppTextProps, Tone, ButtonProps, ButtonVariant, styles, StringListFieldProps, styles (+10 more)

### Community 62 - "homeComponents.test.tsx"
Cohesion: 0.14
Nodes (21): react-native-svg, EventCarouselCard(), EventCarouselCardProps, styles, CoverColor, coverColors(), HolaStar(), HolaStarCover() (+13 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (21): AdminError, AdminErrorCode, ClientError, createEvent(), eventColumns(), EventListRow, EventRow, getMyVenues() (+13 more)

### Community 64 - "types/admin.ts"
Cohesion: 0.18
Nodes (15): OfferFormProps, base, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH, OfferFormErrors, OfferFormValues, OfferSubmission (+7 more)

### Community 65 - "QRTicket.tsx"
Cohesion: 0.21
Nodes (10): QRCard(), QRCardProps, styles, DarkRun, QRCode(), qrDarkRuns(), QRTicketProps, QRTicketStatus (+2 more)

### Community 66 - "VenueMap.tsx"
Cohesion: 0.27
Nodes (9): Map pin and venue preview card, MapPin(), VenuePreviewCard(), MappableVenue, styles, VenueMap(), VenueMapProps, styles (+1 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.12
Nodes (15): Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence (+7 more)

### Community 69 - "useAdminVenueEvents.ts"
Cohesion: 0.17
Nodes (11): defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), myVenuesQueryKey (+3 more)

### Community 70 - "useEventEditor.ts"
Cohesion: 0.18
Nodes (11): EventSubmission, venueEventsQueryKey(), defaultServices, Services, admin, event, start, UseEventEditor (+3 more)

### Community 71 - "@tanstack/react-query"
Cohesion: 0.14
Nodes (17): @tanstack/react-query, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers, defaultServices, Services (+9 more)

### Community 74 - "useSession"
Cohesion: 0.39
Nodes (5): StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), useSession(), VenueEventsArea()

### Community 75 - "theme/index.ts"
Cohesion: 0.17
Nodes (16): FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles, contrastRatio(), parseHex(), relativeLuminance() (+8 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.16
Nodes (12): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS, start (+4 more)

### Community 77 - "t"
Cohesion: 0.20
Nodes (11): SessionError(), SessionErrorProps, styles, StaffLoginForm(), StaffLoginFormProps, styles, Deps, UseStaffLogin (+3 more)

### Community 78 - "auth.ts"
Cohesion: 0.10
Nodes (24): @supabase/supabase-js, createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest (+16 more)

### Community 79 - "useClaimOffer.ts"
Cohesion: 0.21
Nodes (12): ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE, mockClaim (+4 more)

### Community 80 - "Button"
Cohesion: 0.19
Nodes (22): Admin form fields, react, react-native-safe-area-context, Button(), DateTimeField(), formatDateTime(), pad(), parseDateTime() (+14 more)

### Community 81 - "kit.test.tsx"
Cohesion: 0.07
Nodes (32): Event, QR and map kit, @expo/vector-icons, AccentBlobs(), styles, FEATHER_NAME, GlassIconButton(), GlassIconButtonProps, GlassIconName (+24 more)

### Community 82 - "VenueEventsList.tsx"
Cohesion: 0.23
Nodes (9): EventRow(), EventRowProps, Skeleton(), styles, base, draft, published, VenueEventsList() (+1 more)

### Community 83 - "ui/index.ts"
Cohesion: 0.10
Nodes (27): ChipProps, styles, DateTimeFieldProps, DAY_PILL_HEIGHT, DayStrip(), DayStripProps, styles, EventCard() (+19 more)

### Community 84 - "EventFormArea.tsx"
Cohesion: 0.21
Nodes (12): EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), EventOffersSection(), EventOffersSectionProps, OfferItem() (+4 more)

### Community 85 - "GlassSurface"
Cohesion: 0.15
Nodes (16): Tab bar, GlassPillButton(), GlassPillButtonProps, styles, GlassSurface(), GlassSurfaceProps, styles, MapVenueCard() (+8 more)

### Community 86 - "ScannerScreenContent.tsx"
Cohesion: 0.18
Nodes (11): expo-camera@~58.0.14, expo-camera, ScannerScreen(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles (+3 more)

### Community 87 - "app/_layout.tsx"
Cohesion: 0.46
Nodes (4): RootLayout(), SessionGate(), createQueryClient(), useAppFonts()

### Community 88 - "Hola Fest — Architecture"
Cohesion: 0.18
Nodes (11): Access rules (RLS), Allowed dependencies (enforced by ESLint where possible), Auth, Code knowledge graph, Data model (initial), Hola Fest — Architecture, Layers, Performance rules (+3 more)

### Community 91 - "MyTicketsContent.tsx"
Cohesion: 0.16
Nodes (16): Message(), MyTicketsContent(), MyTicketsContentProps, styles, TicketRow(), styles, TicketScreenContent(), TicketScreenContentProps (+8 more)

### Community 92 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 94 - "main"
Cohesion: 0.22
Nodes (7): How you work, Never, You may edit only, Check, in this order, Output, main(), serveWeb()

### Community 95 - "tabsShell.test.tsx"
Cohesion: 0.28
Nodes (7): EventsScreen(), FloatingTabBar(), ITEMS, TabsLayout(), TabBarItem, mockNavigate, mockPush

### Community 96 - "Hola Fest — Product"
Cohesion: 0.25
Nodes (8): Explicitly NOT in the MVP, Hola Fest — Product, Kyiv-specific requirements, MVP goal, One-liner, Roles, Scope: 2 partner clubs in Kyiv., User stories (MVP)

### Community 97 - "How the agent team works"
Cohesion: 0.29
Nodes (6): Escalate to the founder when, How the agent team works, Labels, Life of a task, Queue and usage limits, The team

### Community 98 - "Hola Fest"
Cohesion: 0.40
Nodes (5): Hola Fest, Агенти (`.claude/agents/`), Документи, Запуск на телефоні, Одноразове налаштування

### Community 99 - "@testing-library/react-native"
Cohesion: 0.40
Nodes (3): @testing-library/react-native, QRTicket(), baseProps

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 748 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `devDependencies`, `supabase.ts`, `components/TaxiBar.tsx`, `fonts.ts`, `react-dom@19.3.0`, `package.json`, `homeComponents.test.tsx`, `types/admin.ts`, `useAdminVenueEvents.ts`, `useEventEditor.ts`, `@tanstack/react-query`, `useMyClaims.ts`, `theme/index.ts`, `eventFormValidation.ts`, `t`, `auth.ts`, `useClaimOffer.ts`, `Button`, `kit.test.tsx`, `VenueEventsList.tsx`, `ui/index.ts`, `EventFormArea.tsx`, `ScannerScreenContent.tsx`, `app/_layout.tsx`, `MyTicketsContent.tsx`, `tabsShell.test.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `useTheme` to `dependencies`, `supabase.ts`, `components/TaxiBar.tsx`, `fonts.ts`, `AppText`, `react-dom@19.3.0`, `package.json`, `space`, `homeComponents.test.tsx`, `QRTicket.tsx`, `VenueMap.tsx`, `theme/index.ts`, `t`, `Button`, `kit.test.tsx`, `VenueEventsList.tsx`, `ui/index.ts`, `EventFormArea.tsx`, `GlassSurface`, `ScannerScreenContent.tsx`, `MyTicketsContent.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `t` to `VenueMap.tsx`, `Hola Fest — design rules`, `AppText`, `react-dom@19.3.0`, `supabase.ts`, `useClaimOffer.ts`, `Button`, `VenueEventsList.tsx`, `useTheme`, `EventFormArea.tsx`, `components/TaxiBar.tsx`, `fonts.ts`, `app/_layout.tsx`, `ScannerScreenContent.tsx`, `MyTicketsContent.tsx`, `space`, `homeComponents.test.tsx`, `tabsShell.test.tsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._