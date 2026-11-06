# Graph Report - hola-fest  (2026-11-06)

## Corpus Check
- 244 files · ~70,642 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1441 nodes · 3122 edges · 93 communities (79 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 68 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fad95aef`
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
- kyivTime.ts
- ui-ux.md
- eventFormat.ts
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- expo-linking@~58.0.16
- services/events.ts
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
- Hola Fest — design rules
- edge-functions
- on
- package.json
- Accessibility (WCAG 2.2)
- space
- claimedTokens.ts
- Quick Reference
- expo@~58.0.23
- useTheme
- taxi.ts
- services/admin.ts
- claims.test.ts
- QRTicket.tsx
- VenueMap.tsx
- TicketScreenContent.tsx
- useEvents.ts
- ScannerScreenContent
- @tanstack/react-query
- theme/index.ts
- 0007 — Taxi deep links
- expo-device@~58.0.5
- types/admin.ts
- tokens.ts
- OfferForm.tsx
- @react-native-async-storage/async-storage
- react
- useClaimOffer.ts
- Hola Fest — Architecture
- expo-status-bar
- expo-image@~58.0.18
- @testing-library/react-native
- main
- expo-system-ui@~58.0.7
- t
- Hola Fest — Product
- react-native-reanimated@4.7.1
- How the agent team works
- Hola Fest
- VenueEventsList.tsx
- react-native-worklets@0.13.0

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

## Communities (93 total, 14 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, expo-camera@~58.0.14, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-router@~58.0.30, expo-secure-store@~58.0.2, expo-splash-screen@~58.0.13, @expo/ui@~58.0.27 (+19 more)

### Community 1 - "devDependencies"
Cohesion: 0.10
Nodes (20): devDependencies, eslint-config-prettier@^10.1.8, jest@^30.5.2, jest-expo@^58.0.14, playwright@^1.64.1, prettier@^3.9.10, @testing-library/react-native@^14.1.0, tsx@^4.23.15 (+12 more)

### Community 2 - "expo"
Cohesion: 0.07
Nodes (27): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, reactCompiler (+19 more)

### Community 3 - "Hola Fest — Architecture"
Cohesion: 0.15
Nodes (12): { defineConfig }, expoConfig, NO_FEATURES_IN_UI, NO_SERVICES_IN_UI, prettierRecommended, SUPABASE_ONLY_IN_SERVICES, eslint@^9.39.5, eslint-config-expo@^58.0.4 (+4 more)

### Community 4 - "compilerOptions"
Cohesion: 0.17
Nodes (11): expo/tsconfig.base, compilerOptions, noFallthroughCasesInSwitch, noUncheckedIndexedAccess, paths, strict, types, exclude (+3 more)

### Community 5 - "supabase.ts"
Cohesion: 0.07
Nodes (34): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, KYIV_REGION, mappableVenues(), base, onBack (+26 more)

### Community 6 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, android, check, db:types, db:verify, format, ios, lint (+5 more)

### Community 7 - "Hola Fest — Product"
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
Nodes (18): requestPermission, Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason() (+10 more)

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
Cohesion: 0.18
Nodes (24): styles, TaxiBar(), destination, openMock, AppText(), Button(), Chip(), EventCard() (+16 more)

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

### Community 30 - "kyivTime.ts"
Cohesion: 0.23
Nodes (19): dayRange(), endOfWeek(), eventKeys, EVENTS_STALE_TIME_MS, startOfWeek(), addKyivDays(), formatKyivTime(), keyToUtcMs() (+11 more)

### Community 31 - "ui-ux.md"
Cohesion: 0.50
Nodes (3): How you work, Review mode (on a PR touching src/app, src/features, src/components or src/theme), You may edit only (work mode, on an agent:ui issue)

### Community 32 - "eventFormat.ts"
Cohesion: 0.14
Nodes (22): dayFromId(), eventCardProps(), formatEventDay(), formatEventTime(), event, weekDays(), EventsList(), EventsListProps (+14 more)

### Community 33 - "expo-system-ui@~58.0.7"
Cohesion: 0.22
Nodes (8): name, runs-on, concurrency, cancel-in-progress, group, jobs, check, name

### Community 34 - "@expo/ui@~58.0.27"
Cohesion: 0.06
Nodes (30): concurrency, cancel-in-progress, group, env, name, runs-on, steps, SUPABASE_ACCESS_TOKEN (+22 more)

### Community 36 - "expo-linking@~58.0.16"
Cohesion: 0.08
Nodes (43): AppTextProps, Tone, ButtonProps, ButtonVariant, styles, ChipProps, styles, DateTimeFieldProps (+35 more)

### Community 37 - "services/events.ts"
Cohesion: 0.13
Nodes (18): EventDetailsProps, event, onBack, onOpenVenue, renderScreen(), ClientError, EventDetailsRow, EventsErrorCode (+10 more)

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

### Community 52 - "Hola Fest — design rules"
Cohesion: 0.14
Nodes (13): Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence (+5 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.11
Nodes (18): expo-constants@~58.0.15, expo-linking@~58.0.16, expo-symbols@~58.0.4, react-dom@19.3.0, react-native-screens@~4.30.1, react-native-web@~0.21.4, toqr@^0.1.1, main (+10 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "space"
Cohesion: 0.20
Nodes (18): Admin form fields, DateTimeField(), formatDateTime(), pad(), parseDateTime(), Harness(), StringListField(), styles (+10 more)

### Community 58 - "claimedTokens.ts"
Cohesion: 0.23
Nodes (10): expo-secure-store, getClaimToken(), mockRead, mockSave, tokenKey(), useClaimToken(), deleteSecret(), readSecret() (+2 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 61 - "useTheme"
Cohesion: 0.15
Nodes (20): expo-router, react-native, react-native-safe-area-context, EventScreen(), StaffLogin(), styles, MapScreen(), TicketScreen() (+12 more)

### Community 62 - "taxi.ts"
Cohesion: 0.24
Nodes (9): TaxiBarProps, buildTaxiLinks(), isValidCoordinate(), LinkOpener, TaxiDestination, TaxiLink, TaxiProvider, encodedAddress (+1 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.12
Nodes (30): defaultServices, Services, AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns() (+22 more)

### Community 64 - "claims.test.ts"
Cohesion: 0.18
Nodes (7): ClaimsError, getMyClaims(), from, getSession, invoke, row, toMyClaim()

### Community 65 - "QRTicket.tsx"
Cohesion: 0.24
Nodes (8): DarkRun, QRCode(), qrDarkRuns(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles, baseProps

### Community 66 - "VenueMap.tsx"
Cohesion: 0.27
Nodes (9): Map pin and venue preview card, MapPin(), VenuePreviewCard(), MappableVenue, styles, VenueMap(), VenueMapProps, styles (+1 more)

### Community 67 - "TicketScreenContent.tsx"
Cohesion: 0.18
Nodes (12): QRTicket(), styles, TicketScreenContent(), TicketScreenContentProps, claim, mockClaims, mockToken, formatValidUntil() (+4 more)

### Community 68 - "useEvents.ts"
Cohesion: 0.19
Nodes (12): WEDNESDAY, useEvent(), useEventsForDay(), useEventsForWeek(), EventsError, getEventById(), getEventsForRange(), eventRow (+4 more)

### Community 69 - "ScannerScreenContent"
Cohesion: 0.39
Nodes (4): ScannerScreen(), ScannerScreenContent(), useScanRedeem(), onCodeScanned()

### Community 70 - "@tanstack/react-query"
Cohesion: 0.10
Nodes (22): @tanstack/react-query, EventSubmission, defaultServices, Services, admin, host, item, UseAdminVenueEvents (+14 more)

### Community 71 - "theme/index.ts"
Cohesion: 0.23
Nodes (8): FAILURE_MESSAGE, ScanFailureReason, ScanResult(), ScanResultProps, styles, MessageAction, ScannerScreenContentProps, styles

### Community 72 - "0007 — Taxi deep links"
Cohesion: 0.40
Nodes (4): 0007 — Taxi deep links, Consequences, Context, Decision

### Community 74 - "types/admin.ts"
Cohesion: 0.12
Nodes (14): EventOffersSectionProps, base, offer, defaultServices, eventOffersQueryKey(), Services, offer, UseEventOffers (+6 more)

### Community 75 - "tokens.ts"
Cohesion: 0.25
Nodes (11): contrastRatio(), parseHex(), relativeLuminance(), ColorScheme, fontFamily, glassOnCover, Palette, palettes (+3 more)

### Community 76 - "OfferForm.tsx"
Cohesion: 0.17
Nodes (19): OfferForm(), OfferFormProps, styles, base, OfferFormArea(), OfferFormAreaProps, styles, emptyOfferForm (+11 more)

### Community 78 - "react"
Cohesion: 0.06
Nodes (48): react, RootLayout(), SessionGate(), StaffEventFormScreen(), StaffEventsScreen(), StaffOfferFormScreen(), StaffScreen(), createSessionStore() (+40 more)

### Community 79 - "useClaimOffer.ts"
Cohesion: 0.18
Nodes (14): rememberClaimToken(), claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState (+6 more)

### Community 80 - "Hola Fest — Architecture"
Cohesion: 0.18
Nodes (11): Access rules (RLS), Allowed dependencies (enforced by ESLint where possible), Auth, Code knowledge graph, Data model (initial), Hola Fest — Architecture, Layers, Performance rules (+3 more)

### Community 83 - "@testing-library/react-native"
Cohesion: 0.15
Nodes (16): @testing-library/react-native, EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS (+8 more)

### Community 84 - "main"
Cohesion: 0.22
Nodes (7): How you work, Never, You may edit only, Check, in this order, Output, main(), serveWeb()

### Community 86 - "t"
Cohesion: 0.12
Nodes (22): Tab bar, EventsScreen(), styles, FloatingTabBar(), ITEMS, TabsLayout(), TabBar(), SessionError() (+14 more)

### Community 87 - "Hola Fest — Product"
Cohesion: 0.25
Nodes (8): Explicitly NOT in the MVP, Hola Fest — Product, Kyiv-specific requirements, MVP goal, One-liner, Roles, Scope: 2 partner clubs in Kyiv., User stories (MVP)

### Community 89 - "How the agent team works"
Cohesion: 0.29
Nodes (6): Escalate to the founder when, How the agent team works, Labels, Life of a task, Queue and usage limits, The team

### Community 90 - "Hola Fest"
Cohesion: 0.40
Nodes (5): Hola Fest, Агенти (`.claude/agents/`), Документи, Запуск на телефоні, Одноразове налаштування

### Community 91 - "VenueEventsList.tsx"
Cohesion: 0.24
Nodes (8): EventRowProps, Skeleton(), styles, base, draft, published, VenueEventsList(), VenueEventsListProps

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 653 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `claimOffer()` connect `useClaimOffer.ts` to `claims.test.ts`, `Button.tsx`, `Hola Fest — Product`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `Code quality` connect `Hola Fest — Product` to `useClaimOffer.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `devDependencies`, `supabase.ts`, `Button.tsx`, `AppText`, `eventFormat.ts`, `expo-linking@~58.0.16`, `services/events.ts`, `package.json`, `space`, `claimedTokens.ts`, `QRTicket.tsx`, `TicketScreenContent.tsx`, `useEvents.ts`, `ScannerScreenContent`, `@tanstack/react-query`, `theme/index.ts`, `types/admin.ts`, `OfferForm.tsx`, `react`, `useClaimOffer.ts`, `t`, `VenueEventsList.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._