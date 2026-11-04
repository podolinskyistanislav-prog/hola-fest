# Graph Report - hola-fest  (2026-11-04)

## Corpus Check
- 31 files · ~6,260 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 9, .example 1, .toml 1)

## Summary
- 335 nodes · 370 edges · 42 communities (21 shown, 21 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2461742a`
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
- react-native
- .prettierrc.json
- db-backend.md
- mobile.md
- expo-router
- orchestrator.md
- reviewer.md
- security-qa.md
- jest
- 0001-foundation.md
- on
- dependencies
- task.md
- pull_request_template.md
- expo-constants@~58.0.15
- expo-glass-effect@~58.0.5
- expo-image@~58.0.18
- expo-linking@~58.0.16
- expo-splash-screen@~58.0.13
- expo-status-bar@~58.0.4
- expo-symbols@~58.0.4
- expo-system-ui@~58.0.7
- @expo/ui@~58.0.27
- expo-web-browser@~58.0.7
- react@19.3.0
- react-dom@19.3.0
- react-native-gesture-handler@~3.3.0
- react-native-reanimated@4.7.1
- react-native-safe-area-context@~5.11.1
- react-native-worklets@0.13.0

## God Nodes (most connected - your core abstractions)
1. `expo` - 13 edges
2. `with` - 12 edges
3. `Hola Fest — Architecture` - 10 edges
4. `scripts` - 10 edges
5. `with` - 9 edges
6. `Hola Fest — Product` - 8 edges
7. `permissions` - 6 edges
8. `work-on-issue` - 6 edges
9. `review-pr` - 6 edges
10. `compilerOptions` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (42 total, 21 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.22
Nodes (8): expo-device@~58.0.5, react-native-web@~0.21.4, main, name, private, version, expo-device, react-native-web

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

### Community 5 - "supabase.ts"
Cohesion: 0.32
Nodes (4): @supabase/supabase-js@^2.118.0, @supabase/supabase-js, env, supabase

### Community 6 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, check, format, ios, lint, start, test (+2 more)

### Community 7 - "Hola Fest — Product"
Cohesion: 0.06
Nodes (25): Code quality, Database, Decisions, Golden rules, Hola Fest — rules for every agent, Security (non-negotiable), Explicitly NOT in the MVP, Hola Fest — Product (+17 more)

### Community 8 - "with"
Cohesion: 0.06
Nodes (40): cancel-in-progress, group, jobs, mention, review-pr, work-on-issue, if, runs-on (+32 more)

### Community 9 - "with"
Cohesion: 0.06
Nodes (35): name, runs-on, steps, concurrency, cancel-in-progress, group, GITHUB_TOKEN, name (+27 more)

### Community 10 - "AGENTS.md"
Cohesion: 0.33
Nodes (5): Building with EAS, Commands, Expo has changed — do not trust your training data, Navigation & Routing, Rules

### Community 11 - "steps"
Cohesion: 0.12
Nodes (16): jobs, refresh, name, on, push, permissions, contents, branches (+8 more)

### Community 12 - "react-native"
Cohesion: 0.40
Nodes (3): react-native@0.88.1, react-native, styles

### Community 13 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 14 - "db-backend.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 15 - "mobile.md"
Cohesion: 0.50
Nodes (3): How you work, Never, You may edit only

### Community 20 - "jest"
Cohesion: 0.67
Nodes (3): jest, preset, testPathIgnorePatterns

### Community 22 - "on"
Cohesion: 0.22
Nodes (9): types, types, on, issue_comment, issues, pull_request, pull_request_review_comment, types (+1 more)

### Community 23 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, expo@~58.0.23, expo-font@~58.0.11, @react-native-async-storage/async-storage@2.2.0, react-native-screens@~4.30.1, expo, expo-font, @react-native-async-storage/async-storage (+1 more)

### Community 24 - "task.md"
Cohesion: 0.33
Nodes (5): Acceptance criteria, Dependencies, Goal, Out of scope, Owner & allowed paths

### Community 25 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): How it was verified, Security checklist (if data, auth or offers are touched), What changed

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 177 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`, `supabase.ts`, `react-native`, `expo-router`, `expo-constants@~58.0.15`, `expo-glass-effect@~58.0.5`, `expo-image@~58.0.18`, `expo-linking@~58.0.16`, `expo-splash-screen@~58.0.13`, `expo-status-bar@~58.0.4`, `expo-symbols@~58.0.4`, `expo-system-ui@~58.0.7`, `@expo/ui@~58.0.27`, `expo-web-browser@~58.0.7`, `react@19.3.0`, `react-dom@19.3.0`, `react-native-gesture-handler@~3.3.0`, `react-native-reanimated@4.7.1`, `react-native-safe-area-context@~5.11.1`, `react-native-worklets@0.13.0`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07126436781609195 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Hola Fest — Product` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `with` be split into smaller, more focused modules?**
  _Cohesion score 0.05609756097560976 - nodes in this community are weakly interconnected._