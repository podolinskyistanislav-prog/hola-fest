# Graph Report - hola-fest  (2026-11-04)

## Corpus Check
- 56 files · ~15,851 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 9, .example 1, .toml 1)

## Summary
- 458 nodes · 586 edges · 43 communities (26 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8c2a7fd3`
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
- react-native-reanimated@4.7.1
- react-native-worklets@0.13.0
- expo-web-browser@~58.0.7
- @react-native-async-storage/async-storage
- react-native-web@~0.21.4

## God Nodes (most connected - your core abstractions)
1. `with` - 16 edges
2. `useTheme()` - 15 edges
3. `expo` - 13 edges
4. `with` - 11 edges
5. `scripts` - 10 edges
6. `AppText()` - 10 edges
7. `Hola Fest — Architecture` - 10 edges
8. `steps` - 8 edges
9. `react-native` - 8 edges
10. `Button()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Typography` --references--> `AppText()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/AppText.tsx
- `Liquid glass` --references--> `GlassSurface()`  [INFERRED]
  docs/DESIGN.md → src/components/ui/GlassSurface.tsx
- `How you work` --references--> `useTheme()`  [INFERRED]
  .claude/agents/ui-ux.md → src/theme/useTheme.ts
- `RootLayout()` --calls--> `useTheme()`  [EXTRACTED]
  src/app/_layout.tsx → src/theme/useTheme.ts
- `RootLayout()` --calls--> `useAppFonts()`  [EXTRACTED]
  src/app/_layout.tsx → src/theme/fonts.ts

## Import Cycles
- None detected.

## Communities (43 total, 17 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.18
Nodes (10): expo@~58.0.23, react-native-reanimated@4.7.1, react-native-safe-area-context@~5.11.1, main, name, private, version, expo (+2 more)

### Community 1 - "devDependencies"
Cohesion: 0.07
Nodes (29): { defineConfig }, expoConfig, NO_FEATURES_IN_UI, NO_SERVICES_IN_UI, prettierRecommended, SUPABASE_ONLY_IN_SERVICES, devDependencies, eslint@^9.39.5 (+21 more)

### Community 2 - "expo"
Cohesion: 0.07
Nodes (27): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, reactCompiler (+19 more)

### Community 3 - "Hola Fest — Architecture"
Cohesion: 0.18
Nodes (11): Access rules (RLS), Allowed dependencies (enforced by ESLint where possible), Auth, Code knowledge graph, Data model (initial), Hola Fest — Architecture, Layers, Performance rules (+3 more)

### Community 4 - "compilerOptions"
Cohesion: 0.17
Nodes (11): expo/tsconfig.base, compilerOptions, noFallthroughCasesInSwitch, noUncheckedIndexedAccess, paths, strict, types, exclude (+3 more)

### Community 6 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, check, format, ios, lint, start, test (+2 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.06
Nodes (25): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Explicitly NOT in the MVP, Hola Fest — Product (+17 more)

### Community 8 - "with"
Cohesion: 0.05
Nodes (39): concurrency, if, runs-on, timeout-minutes, cancel-in-progress, group, types, types (+31 more)

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
Cohesion: 0.12
Nodes (32): react-native, Index(), styles, AppText(), AppTextProps, Tone, Button(), ButtonProps (+24 more)

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
Cohesion: 0.17
Nodes (12): dependencies, expo-constants@~58.0.15, expo-glass-effect@~58.0.5, expo-image@~58.0.18, react-dom@19.3.0, react-native@0.88.1, react-native-screens@~4.30.1, expo-constants (+4 more)

### Community 20 - "jest"
Cohesion: 0.50
Nodes (4): jest, moduleNameMapper, preset, testPathIgnorePatterns

### Community 22 - "Hola Fest — design rules"
Cohesion: 0.22
Nodes (8): Colors, Event covers (until real photos exist), Every screen, Hola Fest — design rules, Liquid glass, Look in one sentence, Shape and spacing, Typography

### Community 23 - "_layout.tsx"
Cohesion: 0.20
Nodes (10): expo-router@~58.0.30, expo-splash-screen@~58.0.13, expo-status-bar@~58.0.4, react@19.3.0, expo-router, expo-splash-screen, expo-status-bar, react (+2 more)

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
Cohesion: 0.10
Nodes (23): steps, steps, steps, continue-on-error, id, if, name, run (+15 more)

### Community 30 - "fonts.ts"
Cohesion: 0.40
Nodes (4): @expo-google-fonts/inter@^0.4.2, @expo-google-fonts/unbounded@^0.4.1, @expo-google-fonts/inter, @expo-google-fonts/unbounded

### Community 31 - "ui-ux.md"
Cohesion: 0.50
Nodes (3): How you work, Review mode (on a PR touching src/app, src/features, src/components or src/theme), You may edit only (work mode, on an agent:ui issue)

### Community 34 - "@expo/ui@~58.0.27"
Cohesion: 0.06
Nodes (30): concurrency, cancel-in-progress, group, env, name, runs-on, steps, SUPABASE_ACCESS_TOKEN (+22 more)

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 230 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `Button.tsx` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07126436781609195 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`, `expo-symbols@~58.0.4`, `expo-system-ui@~58.0.7`, `expo-device@~58.0.5`, `expo-linking@~58.0.16`, `react-dom@19.3.0`, `react-native-reanimated@4.7.1`, `react-native-worklets@0.13.0`, `expo-web-browser@~58.0.7`, `@react-native-async-storage/async-storage`, `react-native-web@~0.21.4`, `_layout.tsx`, `expo-image@~58.0.18`, `expo-linking@~58.0.16`, `fonts.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Should `Hola Fest — Product` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._