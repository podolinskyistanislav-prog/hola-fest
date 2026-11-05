# Graph Report - hola-fest  (2026-11-05)

## Corpus Check
- 123 files · ~33,546 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 9, .example 1, .toml 1)

## Summary
- 804 nodes · 1470 edges · 44 communities (39 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dce75839`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app/_layout.tsx
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
- package.json
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
- t
- fonts.ts
- ui-ux.md
- auth.ts
- @expo/ui@~58.0.27
- steps
- react-native-reanimated@4.7.1
- jobs
- react-native-worklets@0.13.0
- @react-native-async-storage/async-storage
- react-native-web@~0.21.4
- fonts.ts
- permissions
- review-pr
- 0002-anonymous-auth-for-mvp.md

## God Nodes (most connected - your core abstractions)
1. `AppText()` - 39 edges
2. `useTheme()` - 39 edges
3. `t()` - 32 edges
4. `react-native` - 25 edges
5. `Button()` - 16 edges
6. `GlassSurface()` - 16 edges
7. `space` - 15 edges
8. `with` - 14 edges
9. `EventsScreenContent()` - 14 edges
10. `expo` - 13 edges

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

## Communities (44 total, 5 thin omitted)

### Community 0 - "app/_layout.tsx"
Cohesion: 0.19
Nodes (12): expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, react@19.3.0, @tanstack/react-query@^5.105.3, expo-splash-screen, expo-status-bar, react, @tanstack/react-query (+4 more)

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
Cohesion: 0.13
Nodes (18): ClientError, getPublishedVenues(), getVenueById(), from, Result, venue, venueRow, toVenue() (+10 more)

### Community 6 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, android, check, format, ios, lint, screenshots, start (+3 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.05
Nodes (37): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Access rules (RLS), Allowed dependencies (enforced by ESLint where possible) (+29 more)

### Community 8 - "with"
Cohesion: 0.14
Nodes (14): issue, types, description, required, types, on, issue_comment, issues (+6 more)

### Community 9 - "with"
Cohesion: 0.06
Nodes (43): name, runs-on, steps, concurrency, cancel-in-progress, group, name, runs-on (+35 more)

### Community 10 - "AGENTS.md"
Cohesion: 0.33
Nodes (5): Building with EAS, Commands, Expo has changed — do not trust your training data, Navigation & Routing, Rules

### Community 11 - "steps"
Cohesion: 0.12
Nodes (16): jobs, refresh, name, on, push, permissions, contents, branches (+8 more)

### Community 12 - "Button.tsx"
Cohesion: 0.06
Nodes (85): Map pin and venue preview card, Tab bar, expo-router, react-native, react-native-safe-area-context, EventScreen(), StaffLogin(), styles (+77 more)

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.10
Nodes (21): How you work, Never, You may edit only, Check, in this order, Output, 0005 — Web build is a single-page app, appEnvFromSupabaseStatus(), buildShotPlan() (+13 more)

### Community 15 - "mobile.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 16 - "package.json"
Cohesion: 0.06
Nodes (48): dependencies, expo@~58.0.23, expo-constants@~58.0.15, expo-device@~58.0.5, expo-font@~58.0.11, expo-glass-effect@~58.0.5, expo-image@~58.0.18, expo-linking@~58.0.16 (+40 more)

### Community 18 - "reviewer.md"
Cohesion: 0.33
Nodes (5): 0004 — Screenshot tool: Playwright on the Expo web build, Consequences, Context, Decision, Detecting changed screens (next task)

### Community 20 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.17
Nodes (11): Colors, Day strip, Event card, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence (+3 more)

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
Cohesion: 0.17
Nodes (12): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, node-version, prompt (+4 more)

### Community 28 - "expo-image@~58.0.18"
Cohesion: 0.40
Nodes (5): BODY, BRANCH, GH_TOKEN, TITLE, env

### Community 29 - "t"
Cohesion: 0.13
Nodes (17): @testing-library/react-native, FloatingTabBar(), ITEMS, TabsLayout(), MapScreen(), styles, Deps, UseStaffLogin (+9 more)

### Community 30 - "fonts.ts"
Cohesion: 0.06
Nodes (55): DayStrip(), EventDetailsProps, dayFromId(), eventCardProps(), formatEventTime(), formatPriceFrom(), pad(), event (+47 more)

### Community 31 - "ui-ux.md"
Cohesion: 0.50
Nodes (3): How you work, Review mode (on a PR touching src/app, src/features, src/components or src/theme), You may edit only (work mode, on an agent:ui issue)

### Community 32 - "auth.ts"
Cohesion: 0.12
Nodes (22): createSessionStore(), Deps, Session, SessionState, SessionStore, sessionStore, guest, setup() (+14 more)

### Community 34 - "@expo/ui@~58.0.27"
Cohesion: 0.06
Nodes (30): concurrency, cancel-in-progress, group, env, name, runs-on, steps, SUPABASE_ACCESS_TOKEN (+22 more)

### Community 38 - "steps"
Cohesion: 0.31
Nodes (10): steps, steps, continue-on-error, id, if, name, run, uses (+2 more)

### Community 40 - "jobs"
Cohesion: 0.20
Nodes (9): jobs, mention, sync-status, if, runs-on, timeout-minutes, name, if (+1 more)

### Community 41 - "react-native-worklets@0.13.0"
Cohesion: 0.08
Nodes (25): if, runs-on, steps, concurrency, cancel-in-progress, group, AGENTS_MAX_PARALLEL, GH_TOKEN (+17 more)

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

### Community 48 - "review-pr"
Cohesion: 0.29
Nodes (8): cancel-in-progress, group, review-pr, concurrency, if, runs-on, timeout-minutes, concurrency

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 357 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `playwright` connect `devDependencies` to `package.json`, `db-backend.md`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `main()` connect `db-backend.md` to `Hola Fest — Product`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `Button.tsx` to `package.json`, `t`, `fonts.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Should `supabase.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._