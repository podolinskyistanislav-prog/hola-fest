# Graph Report - hola-fest  (2026-11-06)

## Corpus Check
- 226 files · ~66,166 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 10, .example 1, .toml 1)

## Summary
- 1371 nodes · 2857 edges · 84 communities (70 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e466fcb4`
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
- services/claims.ts
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
- ticketStatus.ts
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
- tokens.ts
- edge-functions
- on
- package.json
- Accessibility (WCAG 2.2)
- ui/index.ts
- claimedTokens.ts
- Quick Reference
- t
- index.tsx
- TaxiBar.tsx
- services/admin.ts
- claims.test.ts
- AppText
- useTheme
- useMyClaims.ts
- useClaimOffer.ts
- ScannerScreenContent.tsx
- useEventEditor.ts
- @testing-library/react-native
- @expo/ui@~58.0.27
- supabase.ts
- expo@~58.0.23
- expo-device@~58.0.5
- expo-system-ui@~58.0.7
- @react-native-async-storage/async-storage
- @tanstack/react-query
- @supabase/supabase-js
- toqr
- useAdminVenueEvents.ts
- eventFormValidation.ts
- VenueEventsList.tsx

## God Nodes (most connected - your core abstractions)
1. `useTheme()` - 72 edges
2. `t()` - 70 edges
3. `AppText()` - 69 edges
4. `react-native` - 46 edges
5. `Button()` - 46 edges
6. `space` - 31 edges
7. `@testing-library/react-native` - 30 edges
8. `react` - 28 edges
9. `@tanstack/react-query` - 25 edges
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

## Communities (84 total, 14 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.07
Nodes (28): dependencies, expo-constants@~58.0.15, expo-font@~58.0.11, expo-linking@~58.0.16, expo-router@~58.0.30, expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, expo-symbols@~58.0.4 (+20 more)

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
Cohesion: 0.08
Nodes (32): useVenue(), useVenues(), venueKeys, VENUES_STALE_TIME_MS, KYIV_REGION, mappableVenues(), base, onBack (+24 more)

### Community 6 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, android, check, db:types, db:verify, format, ios, lint (+5 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.05
Nodes (38): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Access rules (RLS), Allowed dependencies (enforced by ESLint where possible) (+30 more)

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

### Community 12 - "services/claims.ts"
Cohesion: 0.14
Nodes (19): ScanFailureReason, Deps, FAILURE_REASON, ScanState, ClaimRow, ClaimsErrorCode, isNetworkMessage(), readFailureReason() (+11 more)

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
Cohesion: 0.10
Nodes (21): Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence (+13 more)

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
Cohesion: 0.06
Nodes (55): DayStripDay, EventDetailsProps, dayFromId(), eventCardProps(), formatEventTime(), pad(), event, weekDays() (+47 more)

### Community 31 - "ui-ux.md"
Cohesion: 0.50
Nodes (3): How you work, Review mode (on a PR touching src/app, src/features, src/components or src/theme), You may edit only (work mode, on an agent:ui issue)

### Community 32 - "expo-symbols@~58.0.4"
Cohesion: 0.10
Nodes (25): RootLayout(), SessionGate(), createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore (+17 more)

### Community 33 - "expo-system-ui@~58.0.7"
Cohesion: 0.22
Nodes (8): name, runs-on, concurrency, cancel-in-progress, group, jobs, check, name

### Community 34 - "@expo/ui@~58.0.27"
Cohesion: 0.06
Nodes (30): concurrency, cancel-in-progress, group, env, name, runs-on, steps, SUPABASE_ACCESS_TOKEN (+22 more)

### Community 36 - "expo-linking@~58.0.16"
Cohesion: 0.07
Nodes (42): react-native, AppTextProps, Tone, ButtonProps, ButtonVariant, styles, ChipProps, styles (+34 more)

### Community 37 - "ticketStatus.ts"
Cohesion: 0.36
Nodes (5): QRTicketStatus, formatValidUntil(), pad(), now, MyClaim

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

### Community 52 - "tokens.ts"
Cohesion: 0.23
Nodes (12): contrastRatio(), parseHex(), relativeLuminance(), ColorScheme, fontFamily, glassOnCover, Palette, palettes (+4 more)

### Community 53 - "edge-functions"
Cohesion: 0.40
Nodes (5): if, name, needs, runs-on, edge-functions

### Community 54 - "on"
Cohesion: 0.50
Nodes (4): on, pull_request, push, branches

### Community 55 - "package.json"
Cohesion: 0.11
Nodes (18): expo-camera@~58.0.14, expo-glass-effect@~58.0.5, expo-image@~58.0.18, react-dom@19.3.0, react-native-reanimated@4.7.1, react-native-screens@~4.30.1, react-native-worklets@0.13.0, main (+10 more)

### Community 56 - "Accessibility (WCAG 2.2)"
Cohesion: 0.10
Nodes (19): Accessibility Architecture Diagram, Accessibility (WCAG 2.2), Android: Accessible Toggle, Anti-Patterns to Avoid, Best Practices Checklist, Core Concepts, Cross-Platform Mapping, Examples (+11 more)

### Community 57 - "ui/index.ts"
Cohesion: 0.20
Nodes (20): Admin form fields, react, DateTimeField(), DateTimeFieldProps, formatDateTime(), pad(), parseDateTime(), Harness() (+12 more)

### Community 58 - "claimedTokens.ts"
Cohesion: 0.28
Nodes (11): expo-secure-store@~58.0.2, expo-secure-store, getClaimToken(), rememberClaimToken(), mockRead, mockSave, tokenKey(), deleteSecret() (+3 more)

### Community 59 - "Quick Reference"
Cohesion: 0.20
Nodes (9): Anti-Pattern Detection, Common Patterns, Configuration Template, Data Type Quick Reference, Index Cheat Sheet, PostgreSQL Patterns, Quick Reference, Related (+1 more)

### Community 60 - "t"
Cohesion: 0.13
Nodes (20): react-native-safe-area-context, StaffLogin(), styles, SessionError(), SessionErrorProps, styles, StaffLoginForm(), StaffLoginFormProps (+12 more)

### Community 61 - "index.tsx"
Cohesion: 0.21
Nodes (10): Tab bar, EventsScreen(), styles, FloatingTabBar(), ITEMS, TabsLayout(), TabBar(), TabBarItem (+2 more)

### Community 62 - "TaxiBar.tsx"
Cohesion: 0.14
Nodes (17): 0007 — Taxi deep links, Consequences, Context, Decision, styles, TaxiBarProps, destination, openMock (+9 more)

### Community 63 - "services/admin.ts"
Cohesion: 0.13
Nodes (27): AdminError, AdminErrorCode, ClientError, createEvent(), createOffer(), eventColumns(), EventListRow, EventRow (+19 more)

### Community 64 - "claims.test.ts"
Cohesion: 0.20
Nodes (5): ClaimsError, from, getSession, invoke, row

### Community 65 - "AppText"
Cohesion: 0.23
Nodes (21): TaxiBar(), AppText(), Button(), Chip(), EventCard(), GlassSurface(), EventDetails(), offerStatus() (+13 more)

### Community 66 - "useTheme"
Cohesion: 0.10
Nodes (31): Map pin and venue preview card, expo-router, EventScreen(), MapScreen(), TicketScreen(), TicketsScreen(), VenueScreen(), MapPin() (+23 more)

### Community 67 - "useMyClaims.ts"
Cohesion: 0.43
Nodes (4): claimKeys, useClaimToken(), useMyClaims(), getMyClaims()

### Community 68 - "useClaimOffer.ts"
Cohesion: 0.21
Nodes (12): ClaimOfferButton(), ClaimOfferButtonProps, LABEL, mockClaim, renderButton(), ClaimButtonState, FAILURE_STATE, mockClaim (+4 more)

### Community 69 - "ScannerScreenContent.tsx"
Cohesion: 0.25
Nodes (6): ScannerScreen(), MessageAction, ScannerScreenContent(), ScannerScreenContentProps, styles, requestPermission

### Community 70 - "useEventEditor.ts"
Cohesion: 0.20
Nodes (11): EventSubmission, venueEventsQueryKey(), defaultServices, Services, admin, event, start, UseEventEditor (+3 more)

### Community 71 - "@testing-library/react-native"
Cohesion: 0.15
Nodes (8): @testing-library/react-native, useScanRedeem(), onCodeScanned(), claim, mockClaims, mockToken, StaffHomeProps, base

### Community 78 - "@tanstack/react-query"
Cohesion: 0.17
Nodes (13): @tanstack/react-query, StaffEventFormScreen(), StaffEventsScreen(), StaffScreen(), useSession(), getStaffAccess(), StaffAccess, StaffArea() (+5 more)

### Community 81 - "useAdminVenueEvents.ts"
Cohesion: 0.19
Nodes (10): defaultServices, Services, admin, host, item, UseAdminVenueEvents, useAdminVenueEvents(), myVenuesQueryKey (+2 more)

### Community 83 - "eventFormValidation.ts"
Cohesion: 0.14
Nodes (17): EventFormProps, base, emptyEventForm, EventFormErrors, EventFormValues, LINEUP_ITEM_MAX_LENGTH, LINEUP_MAX_ITEMS, parsePrice() (+9 more)

### Community 86 - "VenueEventsList.tsx"
Cohesion: 0.22
Nodes (10): EventRow(), EventRowProps, formatDate(), Skeleton(), styles, base, draft, published (+2 more)

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 625 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@testing-library/react-native` connect `@testing-library/react-native` to `devDependencies`, `supabase.ts`, `Hola Fest — design rules`, `fonts.ts`, `expo-symbols@~58.0.4`, `expo-linking@~58.0.16`, `package.json`, `ui/index.ts`, `t`, `index.tsx`, `TaxiBar.tsx`, `useMyClaims.ts`, `useClaimOffer.ts`, `ScannerScreenContent.tsx`, `useEventEditor.ts`, `@tanstack/react-query`, `useAdminVenueEvents.ts`, `eventFormValidation.ts`, `VenueEventsList.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `react` connect `ui/index.ts` to `dependencies`, `expo-symbols@~58.0.4`, `AppText`, `useTheme`, `expo-linking@~58.0.16`, `useClaimOffer.ts`, `useMyClaims.ts`, `useEventEditor.ts`, `supabase.ts`, `services/claims.ts`, `@tanstack/react-query`, `useAdminVenueEvents.ts`, `fonts.ts`, `Hola Fest — design rules`, `package.json`, `t`, `TaxiBar.tsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `expo-linking@~58.0.16` to `dependencies`, `AppText`, `useTheme`, `ScannerScreenContent.tsx`, `fonts.ts`, `tokens.ts`, `Hola Fest — design rules`, `package.json`, `VenueEventsList.tsx`, `ui/index.ts`, `t`, `index.tsx`, `TaxiBar.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._