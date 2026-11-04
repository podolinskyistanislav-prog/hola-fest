# Graph Report - hola-fest  (2026-11-04)

## Corpus Check
- 78 files · ~21,243 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 9, .example 1, .toml 1)

## Summary
- 521 nodes · 774 edges · 45 communities (32 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e733875`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- devDependencies
- expo
- Hola Fest — Architecture
- compilerOptions
- expo@~58.0.23
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
- expo-glass-effect
- fonts.ts
- ui-ux.md
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-linking@~58.0.16
- expo-system-ui@~58.0.7
- steps
- react-native-reanimated@4.7.1
- jobs
- react-native-worklets@0.13.0
- after-merge
- permissions
- work-on-issue
- 0002-anonymous-auth-for-mvp.md

## God Nodes (most connected - your core abstractions)
1. `useTheme()` - 21 edges
2. `AppText()` - 18 edges
3. `with` - 16 edges
4. `expo` - 13 edges
5. `react-native` - 12 edges
6. `Button()` - 12 edges
7. `with` - 11 edges
8. `scripts` - 10 edges
9. `StaffLoginForm()` - 10 edges
10. `Hola Fest — Architecture` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Typography` --references--> `AppText()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/AppText.tsx
- `Liquid glass` --references--> `GlassSurface()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/GlassSurface.tsx
- `Text fields` --references--> `TextField()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/TextField.tsx
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts
- `RootLayout()` --calls--> `SessionError()`  [EXTRACTED]
  src/app/_layout.tsx → src/features/auth/SessionError.tsx

## Import Cycles
- None detected.

## Communities (45 total, 13 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.13
Nodes (14): expo-constants@~58.0.15, expo-image@~58.0.18, expo-splash-screen@~58.0.13, react-native-gesture-handler@~3.3.0, react-native-web@~0.21.4, main, name, private (+6 more)

### Community 1 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, eslint-config-prettier@^10.1.8, jest@^30.5.2, jest-expo@^58.0.14, prettier@^3.9.10, @testing-library/react-native@^14.1.0, @types/jest@^30.0.0, @types/react@~19.3.0 (+8 more)

### Community 2 - "expo"
Cohesion: 0.07
Nodes (27): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, reactCompiler (+19 more)

### Community 3 - "Hola Fest — Architecture"
Cohesion: 0.15
Nodes (12): { defineConfig }, expoConfig, NO_FEATURES_IN_UI, NO_SERVICES_IN_UI, prettierRecommended, SUPABASE_ONLY_IN_SERVICES, eslint@^9.39.5, eslint-config-expo@^58.0.4 (+4 more)

### Community 4 - "compilerOptions"
Cohesion: 0.17
Nodes (11): expo/tsconfig.base, compilerOptions, noFallthroughCasesInSwitch, noUncheckedIndexedAccess, paths, strict, types, exclude (+3 more)

### Community 6 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, check, format, ios, lint, start, test (+2 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.05
Nodes (37): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Access rules (RLS), Allowed dependencies (enforced by ESLint where possible) (+29 more)

### Community 8 - "with"
Cohesion: 0.22
Nodes (9): types, types, on, issue_comment, issues, pull_request, pull_request_review_comment, types (+1 more)

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
Cohesion: 0.10
Nodes (43): expo-router, react-native, react-native-safe-area-context, Index(), styles, StaffLogin(), styles, AppText() (+35 more)

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 15 - "mobile.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 16 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, expo-device@~58.0.5, expo-font@~58.0.11, expo-router@~58.0.30, expo-symbols@~58.0.4, @expo/ui@~58.0.27, expo-web-browser@~58.0.7, react-dom@19.3.0 (+13 more)

### Community 20 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.20
Nodes (9): Colors, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence, Shape and spacing, Text fields (+1 more)

### Community 23 - "_layout.tsx"
Cohesion: 0.08
Nodes (36): react@19.3.0, react, @supabase/supabase-js, @testing-library/react-native, RootLayout(), createSessionStore(), Deps, Session (+28 more)

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
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, node-version, prompt (+5 more)

### Community 28 - "expo-image@~58.0.18"
Cohesion: 0.50
Nodes (4): review-pr, if, runs-on, timeout-minutes

### Community 30 - "fonts.ts"
Cohesion: 0.40
Nodes (4): @expo-google-fonts/inter@^0.4.2, @expo-google-fonts/unbounded@^0.4.1, @expo-google-fonts/inter, @expo-google-fonts/unbounded

### Community 31 - "ui-ux.md"
Cohesion: 0.50
Nodes (3): How you work, Review mode (on a PR touching src/app, src/features, src/components or src/theme), You may edit only (work mode, on an agent:ui issue)

### Community 34 - "@expo/ui@~58.0.27"
Cohesion: 0.06
Nodes (30): concurrency, cancel-in-progress, group, env, name, runs-on, steps, SUPABASE_ACCESS_TOKEN (+22 more)

### Community 38 - "steps"
Cohesion: 0.22
Nodes (10): steps, steps, steps, continue-on-error, id, if, name, run (+2 more)

### Community 40 - "jobs"
Cohesion: 0.29
Nodes (6): jobs, mention, if, runs-on, timeout-minutes, name

### Community 45 - "after-merge"
Cohesion: 0.50
Nodes (4): if, runs-on, timeout-minutes, after-merge

### Community 46 - "permissions"
Cohesion: 0.29
Nodes (7): permissions, actions, checks, contents, id-token, issues, pull-requests

### Community 48 - "work-on-issue"
Cohesion: 0.25
Nodes (9): concurrency, cancel-in-progress, group, work-on-issue, concurrency, concurrency, if, runs-on (+1 more)

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 254 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Button.tsx` to `package.json`, `dependencies`, `_layout.tsx`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`, `expo-symbols@~58.0.4`, `expo-system-ui@~58.0.7`, `expo-linking@~58.0.16`, `expo-system-ui@~58.0.7`, `expo@~58.0.23`, `react-native-worklets@0.13.0`, `_layout.tsx`, `expo-glass-effect`, `fonts.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `react` connect `_layout.tsx` to `package.json`, `Button.tsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._