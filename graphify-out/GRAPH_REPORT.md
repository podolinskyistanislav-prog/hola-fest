# Graph Report - hola-fest  (2026-11-04)

## Corpus Check
- 74 files · ~20,133 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 9, .example 1, .toml 1)

## Summary
- 506 nodes · 709 edges · 47 communities (33 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `69d67d6e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- devDependencies
- expo
- eslint.config.js
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
- expo-splash-screen
- expo-linking@~58.0.16
- fonts.ts
- ui-ux.md
- @react-native-async-storage/async-storage
- react-native-reanimated@4.7.1
- @expo/ui@~58.0.27
- expo-device@~58.0.5
- react-native-safe-area-context
- react-dom@19.3.0
- steps
- react-native-reanimated@4.7.1
- jobs
- react-native-web@~0.21.4
- after-merge
- permissions
- work-on-issue
- group
- 0002-anonymous-auth-for-mvp.md

## God Nodes (most connected - your core abstractions)
1. `useTheme()` - 19 edges
2. `with` - 16 edges
3. `AppText()` - 14 edges
4. `expo` - 13 edges
5. `with` - 11 edges
6. `react-native` - 10 edges
7. `scripts` - 10 edges
8. `Button()` - 10 edges
9. `Hola Fest — Architecture` - 10 edges
10. `Hola Fest — design rules` - 9 edges

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

## Communities (47 total, 14 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.13
Nodes (14): expo-font@~58.0.11, expo-image@~58.0.18, expo-router@~58.0.30, expo-system-ui@~58.0.7, react-native-screens@~4.30.1, main, name, private (+6 more)

### Community 1 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, eslint-config-prettier@^10.1.8, jest@^30.5.2, jest-expo@^58.0.14, prettier@^3.9.10, @testing-library/react-native@^14.1.0, @types/jest@^30.0.0, @types/react@~19.3.0 (+8 more)

### Community 2 - "expo"
Cohesion: 0.07
Nodes (27): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, reactCompiler (+19 more)

### Community 3 - "eslint.config.js"
Cohesion: 0.15
Nodes (12): { defineConfig }, expoConfig, NO_FEATURES_IN_UI, NO_SERVICES_IN_UI, prettierRecommended, SUPABASE_ONLY_IN_SERVICES, eslint@^9.39.5, eslint-config-expo@^58.0.4 (+4 more)

### Community 4 - "compilerOptions"
Cohesion: 0.17
Nodes (11): expo/tsconfig.base, compilerOptions, noFallthroughCasesInSwitch, noUncheckedIndexedAccess, paths, strict, types, exclude (+3 more)

### Community 5 - "supabase.ts"
Cohesion: 0.19
Nodes (14): @supabase/supabase-js, env, AuthError, AuthErrorCode, ClientError, ensureGuestSession(), getSession(), onAuthChange() (+6 more)

### Community 6 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, check, format, ios, lint, start, test (+2 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.05
Nodes (36): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Access rules (RLS), Allowed dependencies (enforced by ESLint where possible) (+28 more)

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
Cohesion: 0.11
Nodes (38): react-native, Index(), styles, AppText(), AppTextProps, Tone, Button(), ButtonProps (+30 more)

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
Nodes (21): dependencies, expo@~58.0.23, expo-constants@~58.0.15, expo-glass-effect@~58.0.5, expo-linking@~58.0.16, expo-status-bar@~58.0.4, expo-symbols@~58.0.4, expo-web-browser@~58.0.7 (+13 more)

### Community 20 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.20
Nodes (9): Colors, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence, Shape and spacing, Text fields (+1 more)

### Community 23 - "_layout.tsx"
Cohesion: 0.13
Nodes (17): react@19.3.0, react, @testing-library/react-native, RootLayout(), createSessionStore(), Deps, Session, SessionState (+9 more)

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
Nodes (9): review-pr, if, runs-on, steps, timeout-minutes, continue-on-error, id, if (+1 more)

### Community 40 - "jobs"
Cohesion: 0.29
Nodes (6): jobs, mention, if, runs-on, timeout-minutes, name

### Community 45 - "after-merge"
Cohesion: 0.29
Nodes (7): if, runs-on, steps, timeout-minutes, after-merge, steps, uses

### Community 46 - "permissions"
Cohesion: 0.29
Nodes (7): permissions, actions, checks, contents, id-token, issues, pull-requests

### Community 47 - "work-on-issue"
Cohesion: 0.33
Nodes (6): work-on-issue, run, if, runs-on, steps, timeout-minutes

### Community 48 - "group"
Cohesion: 0.50
Nodes (5): concurrency, cancel-in-progress, group, concurrency, concurrency

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 247 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Button.tsx` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`, `@react-native-async-storage/async-storage`, `react-native-reanimated@4.7.1`, `expo-device@~58.0.5`, `react-native-safe-area-context`, `react-dom@19.3.0`, `react-native-web@~0.21.4`, `_layout.tsx`, `expo-splash-screen`, `expo-linking@~58.0.16`, `fonts.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react-native` connect `_layout.tsx` to `package.json`, `devDependencies`, `Button.tsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._