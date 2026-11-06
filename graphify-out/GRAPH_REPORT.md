# Graph Report - hola-fest  (2026-11-06)

## Corpus Check
- 249 files · ~71,949 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1554 nodes · 3241 edges · 94 communities (80 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 68 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0b7dded1`
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
- AppText
- _layout.tsx
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- fonts.ts
- ui-ux.md
- with
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
- useTheme
- edge-functions
- on
- package.json
- Accessibility (WCAG 2.2)
- with
- claimedTokens.ts
- Quick Reference
- useScanRedeem.ts
- space
- taxi.ts
- services/admin.ts
- offerFormValidation.ts
- QRTicket.tsx
- VenuesMapScreenContent.tsx
- build
- Hola Fest — design rules
- @testing-library/react-native
- useEventEditor.ts
- ScannerScreenContent.tsx
- Hola Fest — Architecture
- react-native-web@~0.21.4
- @tanstack/react-query
- tokens.ts
- eventFormValidation.ts
- EventFormArea.tsx
- StaffLoginForm.tsx
- useClaimOffer.ts
- main
- Hola Fest — Product
- react-native
- How the agent team works
- 0007 — Taxi deep links
- useAdminVenueEvents.ts
- Hola Fest
- expo-linking@~58.0.16
- expo-symbols@~58.0.4
- 0008-eas-cloud-builds.md
- @expo/ui@~58.0.27
- react-dom@19.3.0
- react-native-maps
- toqr

## God Nodes (most connected - your core abstractions)
1. `useTheme()` - 79 edges
2. `AppText()` - 76 edges
3. `t()` - 76 edges
4. `Button()` - 52 edges
5. `react-native` - 49 edges
6. `@testing-library/react-native` - 34 edges
7. `space` - 34 edges
8. `react` - 31 edges
9. `@tanstack/react-query` - 29 edges
10. `radius` - 19 edges

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

## Communities (94 total, 14 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, expo-camera@~58.0.14, expo-constants@~58.0.15, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-router@~58.0.30, expo-secure-store@~58.0.2 (+19 more)

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
Nodes (32): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, KYIV_REGION, mappableVenues(), base, onBack (+24 more)

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
Cohesion: 0.11
Nodes (20): useClaimToken(), useMyClaims(), claimOffer(), ClaimRow, ClaimsError, ClaimsErrorCode, getMyClaims(), isNetworkMessage() (+12 more)

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

### Community 22 - "AppText"
Cohesion: 0.11
Nodes (39): react-native-safe-area-context, StaffLogin(), styles, styles, TaxiBar(), destination, openMock, AppText() (+31 more)

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
Nodes (77): DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), TextFieldProps, EventDetailsProps, dayFromId(), eventCardProps() (+69 more)

### Community 31 - "ui-ux.md"
Cohesion: 0.50
Nodes (3): How you work, Review mode (on a PR touching src/app, src/features, src/components or src/theme), You may edit only (work mode, on an agent:ui issue)

### Community 32 - "with"
Cohesion: 0.07
Nodes (29): concurrency, cancel-in-progress, group, env, runs-on, steps, timeout-minutes, EXPO_TOKEN (+21 more)

### Community 33 - "expo-system-ui@~58.0.7"
Cohesion: 0.22
Nodes (8): name, runs-on, concurrency, cancel-in-progress, group, jobs, check, name

### Community 34 - "@expo/ui@~58.0.27"
Cohesion: 0.06
Nodes (30): concurrency, cancel-in-progress, group, env, name, runs-on, steps, SUPABASE_ACCESS_TOKEN (+22 more)

### Community 36 - "expo-linking@~58.0.16"
Cohesion: 0.07
Nodes (47): Tab bar, FloatingTabBar(), ITEMS, TabsLayout(), AppTextProps, Tone, ButtonProps, ButtonVariant (+39 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.27
Nodes (7): getStaffAccess(), StaffAccess, StaffArea(), StaffAreaProps, UseStaffAccess, useStaffAccess(), AdminVenue

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
Cohesion: 0.14
Nodes (21): expo-router, EventScreen(), EventsScreen(), styles, MapScreen(), TicketScreen(), TicketsScreen(), VenueScreen() (+13 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.10
Nodes (20): expo@~58.0.23, expo-build-properties@~58.0.12, expo-device@~58.0.5, expo-status-bar@~58.0.4, expo-system-ui@~58.0.7, @react-native-async-storage/async-storage@2.2.0, react-native-gesture-handler@~3.3.0, react-native-worklets@0.13.0 (+12 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "with"
Cohesion: 0.06
Nodes (33): default, description, description, required, API_LEVEL, APK_URL, api_level, apk_url (+25 more)

### Community 58 - "claimedTokens.ts"
Cohesion: 0.23
Nodes (13): expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), mockClaim, setup() (+5 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "useScanRedeem.ts"
Cohesion: 0.19
Nodes (10): Deps, FAILURE_REASON, ScanState, formatValidUntil(), now, ClaimFailureReason, ClaimOfferResult, MyClaim (+2 more)

### Community 61 - "space"
Cohesion: 0.18
Nodes (20): Admin form fields, react, DateTimeField(), Harness(), StringListField(), styles, styles, SwitchField() (+12 more)

### Community 62 - "taxi.ts"
Cohesion: 0.24
Nodes (9): TaxiBarProps, buildTaxiLinks(), isValidCoordinate(), LinkOpener, TaxiDestination, TaxiLink, TaxiProvider, encodedAddress (+1 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.14
Nodes (27): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+19 more)

### Community 64 - "offerFormValidation.ts"
Cohesion: 0.18
Nodes (13): OfferFormProps, base, emptyOfferForm, OFFER_TERMS_MAX_LENGTH, OFFER_TITLE_MAX_LENGTH, OfferFormErrors, OfferFormValues, OfferSubmission (+5 more)

### Community 65 - "QRTicket.tsx"
Cohesion: 0.24
Nodes (8): DarkRun, QRCode(), qrDarkRuns(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles, baseProps

### Community 66 - "VenuesMapScreenContent.tsx"
Cohesion: 0.18
Nodes (14): Map pin and venue preview card, MapPin(), tabBarInset(), VenuePreviewCard(), MappableVenue, styles, VenueMap(), VenueMapProps (+6 more)

### Community 67 - "build"
Cohesion: 0.05
Nodes (38): env, name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+30 more)

### Community 68 - "Hola Fest — design rules"
Cohesion: 0.14
Nodes (13): Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence (+5 more)

### Community 69 - "@testing-library/react-native"
Cohesion: 0.13
Nodes (10): @testing-library/react-native, claim, mockClaims, mockToken, StaffHomeProps, base, base, draft (+2 more)

### Community 70 - "useEventEditor.ts"
Cohesion: 0.18
Nodes (11): EventSubmission, venueEventsQueryKey(), defaultServices, Services, admin, event, start, UseEventEditor (+3 more)

### Community 71 - "ScannerScreenContent.tsx"
Cohesion: 0.20
Nodes (10): expo-camera, ScannerScreen(), Message(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles, requestPermission (+2 more)

### Community 72 - "Hola Fest — Architecture"
Cohesion: 0.18
Nodes (11): Access rules (RLS), Allowed dependencies (enforced by ESLint where possible), Auth, Code knowledge graph, Data model (initial), Hola Fest — Architecture, Layers, Performance rules (+3 more)

### Community 74 - "@tanstack/react-query"
Cohesion: 0.13
Nodes (18): @tanstack/react-query, EventOffersSectionProps, base, offer, defaultServices, eventOffersQueryKey(), Services, offer (+10 more)

### Community 75 - "tokens.ts"
Cohesion: 0.23
Nodes (12): contrastRatio(), parseHex(), relativeLuminance(), ColorScheme, fontFamily, glassOnCover, Palette, palettes (+4 more)

### Community 76 - "eventFormValidation.ts"
Cohesion: 0.19
Nodes (13): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS, parsePrice() (+5 more)

### Community 77 - "EventFormArea.tsx"
Cohesion: 0.31
Nodes (8): EventFormArea(), EventFormAreaProps, EventOffers(), styles, eventToFormValues(), EventOffersSection(), OfferItem(), styles

### Community 78 - "StaffLoginForm.tsx"
Cohesion: 0.07
Nodes (37): @supabase/supabase-js, RootLayout(), SessionGate(), StaffEventFormScreen(), StaffOfferFormScreen(), StaffScreen(), createSessionStore(), Deps (+29 more)

### Community 79 - "useClaimOffer.ts"
Cohesion: 0.20
Nodes (8): claimKeys, ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE, TranslationKey

### Community 80 - "main"
Cohesion: 0.22
Nodes (7): How you work, Never, You may edit only, Check, in this order, Output, main(), serveWeb()

### Community 81 - "Hola Fest — Product"
Cohesion: 0.25
Nodes (8): Explicitly NOT in the MVP, Hola Fest — Product, Kyiv-specific requirements, MVP goal, One-liner, Roles, Scope: 2 partner clubs in Kyiv., User stories (MVP)

### Community 82 - "react-native"
Cohesion: 0.36
Nodes (6): react-native, FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles

### Community 83 - "How the agent team works"
Cohesion: 0.29
Nodes (6): Escalate to the founder when, How the agent team works, Labels, Life of a task, Queue and usage limits, The team

### Community 84 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 85 - "useAdminVenueEvents.ts"
Cohesion: 0.15
Nodes (13): StaffEventsScreen(), defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents() (+5 more)

### Community 86 - "Hola Fest"
Cohesion: 0.40
Nodes (5): Hola Fest, Агенти (`.claude/agents/`), Документи, Запуск на телефоні, Одноразове налаштування

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 724 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@tanstack/react-query` connect `@tanstack/react-query` to `dependencies`, `@testing-library/react-native`, `useEventEditor.ts`, `react-dom@19.3.0`, `supabase.ts`, `Button.tsx`, `StaffLoginForm.tsx`, `useClaimOffer.ts`, `useTheme`, `useAdminVenueEvents.ts`, `package.json`, `claimedTokens.ts`, `fonts.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `claimOffer()` connect `Button.tsx` to `claimedTokens.ts`, `useClaimOffer.ts`, `Hola Fest — rules for every agent`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Should `supabase.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08019323671497584 - nodes in this community are weakly interconnected._