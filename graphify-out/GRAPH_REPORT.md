# Graph Report - hola-fest  (2026-11-06)

## Corpus Check
- 212 files · ~62,207 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1298 nodes · 2604 edges · 81 communities (65 shown, 16 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `66731867`
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
- fonts.ts
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
- QRTicket.tsx
- edge-functions
- on
- package.json
- Accessibility (WCAG 2.2)
- react
- claimedTokens.ts
- Quick Reference
- useClaimOffer.ts
- i18n/index.ts
- TaxiBar.tsx
- services/admin.ts
- claims.test.ts
- AppText
- useTheme
- TicketScreenContent.tsx
- space
- OfferRow.tsx
- (tabs)/_layout.tsx
- expo-constants@~58.0.15
- expo-status-bar
- expo-splash-screen
- @expo/ui@~58.0.27
- expo-symbols@~58.0.4
- @react-native-async-storage/async-storage
- react-native-gesture-handler@~3.3.0
- react-native-maps
- react-dom@19.3.0
- toqr

## God Nodes (most connected - your core abstractions)
1. `useTheme()` - 65 edges
2. `AppText()` - 63 edges
3. `t()` - 61 edges
4. `react-native` - 43 edges
5. `Button()` - 40 edges
6. `space` - 28 edges
7. `@testing-library/react-native` - 26 edges
8. `react` - 25 edges
9. `@tanstack/react-query` - 21 edges
10. `GlassSurface()` - 18 edges

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

## Communities (81 total, 16 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.08
Nodes (24): dependencies, expo@~58.0.23, expo-camera@~58.0.14, expo-device@~58.0.5, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-router@~58.0.30, @expo/vector-icons@^15.0.2 (+16 more)

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
Cohesion: 0.05
Nodes (37): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Access rules (RLS), Allowed dependencies (enforced by ESLint where possible) (+29 more)

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
Nodes (20): requestPermission, Deps, FAILURE_REASON, ScanState, useScanRedeem(), onCodeScanned(), ClaimRow, ClaimsErrorCode (+12 more)

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.10
Nodes (21): How you work, Never, You may edit only, Check, in this order, Output, 0005 — Web build is a single-page app, appEnvFromSupabaseStatus(), buildShotPlan() (+13 more)

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

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.14
Nodes (13): Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence (+5 more)

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
Cohesion: 0.07
Nodes (50): @tanstack/react-query, EventDetailsProps, dayFromId(), eventCardProps(), formatEventTime(), pad(), event, weekDays() (+42 more)

### Community 31 - "ui-ux.md"
Cohesion: 0.50
Nodes (3): How you work, Review mode (on a PR touching src/app, src/features, src/components or src/theme), You may edit only (work mode, on an agent:ui issue)

### Community 32 - "expo-symbols@~58.0.4"
Cohesion: 0.06
Nodes (43): @testing-library/react-native, RootLayout(), SessionGate(), ScannerScreen(), StaffScreen(), createSessionStore(), Deps, Session (+35 more)

### Community 33 - "expo-system-ui@~58.0.7"
Cohesion: 0.22
Nodes (8): name, runs-on, concurrency, cancel-in-progress, group, jobs, check, name

### Community 34 - "@expo/ui@~58.0.27"
Cohesion: 0.06
Nodes (30): concurrency, cancel-in-progress, group, env, name, runs-on, steps, SUPABASE_ACCESS_TOKEN (+22 more)

### Community 36 - "expo-linking@~58.0.16"
Cohesion: 0.09
Nodes (34): AppTextProps, Tone, ButtonProps, ButtonVariant, styles, ChipProps, styles, DateTimeFieldProps (+26 more)

### Community 37 - "react-dom@19.3.0"
Cohesion: 0.21
Nodes (11): TicketsScreen(), Message(), MyTicketsContent(), MyTicketsContentProps, styles, TicketRow(), formatValidUntil(), pad() (+3 more)

### Community 38 - "steps"
Cohesion: 0.19
Nodes (15): BODY, BRANCH, GH_TOKEN, TITLE, steps, steps, continue-on-error, env (+7 more)

### Community 40 - "jobs"
Cohesion: 0.20
Nodes (9): jobs, mention, sync-status, if, runs-on, timeout-minutes, name, if (+1 more)

### Community 41 - "react-native-worklets@0.13.0"
Cohesion: 0.08
Nodes (25): if, runs-on, steps, concurrency, cancel-in-progress, group, AGENTS_MAX_PARALLEL, GH_TOKEN (+17 more)

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

### Community 52 - "QRTicket.tsx"
Cohesion: 0.12
Nodes (19): DarkRun, QRCode(), qrDarkRuns(), QRTicketProps, QRTicketStatus, STATUS_LABEL, styles, baseProps (+11 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.12
Nodes (16): expo-font@~58.0.11, expo-linking@~58.0.16, expo-system-ui@~58.0.7, react-native-web@~0.21.4, react-native-worklets@0.13.0, @supabase/supabase-js@^2.118.0, main, name (+8 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "react"
Cohesion: 0.21
Nodes (16): Admin form fields, react, DateTimeField(), formatDateTime(), pad(), parseDateTime(), Harness(), StringListField() (+8 more)

### Community 58 - "claimedTokens.ts"
Cohesion: 0.28
Nodes (11): expo-secure-store@~58.0.2, expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret() (+3 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "useClaimOffer.ts"
Cohesion: 0.20
Nodes (12): claimKeys, ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE (+4 more)

### Community 61 - "i18n/index.ts"
Cohesion: 0.21
Nodes (7): SessionError(), SessionErrorProps, styles, StaffLoginFormProps, styles, TranslationKey, uk

### Community 62 - "TaxiBar.tsx"
Cohesion: 0.14
Nodes (17): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBarProps, destination, openMock (+9 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.10
Nodes (30): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventRow, getMyVenues() (+22 more)

### Community 64 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 65 - "AppText"
Cohesion: 0.15
Nodes (31): StaffLogin(), TaxiBar(), AppText(), Button(), Chip(), EventCard(), GlassSurface(), ScanResult() (+23 more)

### Community 66 - "useTheme"
Cohesion: 0.13
Nodes (21): expo-router, react-native, react-native-safe-area-context, EventScreen(), styles, EventsScreen(), styles, MapScreen() (+13 more)

### Community 67 - "TicketScreenContent.tsx"
Cohesion: 0.20
Nodes (11): QRTicket(), styles, TicketScreenContent(), TicketScreenContentProps, claim, mockClaims, mockToken, useClaimToken() (+3 more)

### Community 68 - "space"
Cohesion: 0.18
Nodes (15): Map pin and venue preview card, MapPin(), tabBarInset(), VenuePreviewCard(), MappableVenue, styles, VenueMap(), VenueMapProps (+7 more)

### Community 69 - "OfferRow.tsx"
Cohesion: 0.33
Nodes (6): availabilityHint(), OfferRow(), OfferRowProps, OfferRowStatus, STATUS_LABEL, styles

### Community 70 - "(tabs)/_layout.tsx"
Cohesion: 0.38
Nodes (6): Tab bar, FloatingTabBar(), ITEMS, TabsLayout(), TabBar(), TabBarItem

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 597 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `useTheme` to `package.json`, `AppText`, `expo-symbols@~58.0.4`, `TicketScreenContent.tsx`, `expo-linking@~58.0.16`, `react-dom@19.3.0`, `OfferRow.tsx`, `space`, `QRTicket.tsx`, `fonts.ts`, `package.json`, `react`, `i18n/index.ts`, `TaxiBar.tsx`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `expo-symbols@~58.0.4` to `devDependencies`, `useTheme`, `TicketScreenContent.tsx`, `expo-linking@~58.0.16`, `supabase.ts`, `Button.tsx`, `QRTicket.tsx`, `fonts.ts`, `package.json`, `react`, `useClaimOffer.ts`, `i18n/index.ts`, `TaxiBar.tsx`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `package.json`, `expo-symbols@~58.0.4`, `AppText`, `TicketScreenContent.tsx`, `expo-linking@~58.0.16`, `OfferRow.tsx`, `react-dom@19.3.0`, `supabase.ts`, `space`, `Button.tsx`, `QRTicket.tsx`, `fonts.ts`, `package.json`, `useClaimOffer.ts`, `i18n/index.ts`, `TaxiBar.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._