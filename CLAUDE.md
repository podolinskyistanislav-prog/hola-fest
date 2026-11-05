# Hola Fest — rules for every agent

Read before every task:

1. `docs/PRODUCT.md` — what we build and what we do NOT build.
2. `docs/ARCHITECTURE.md` — layers, data model, RLS, trusted flows. This is law.
3. `docs/WORKFLOW.md` — how agents hand work to each other through GitHub.
4. `docs/DESIGN.md` — the look and UI rules (for anything visual).
5. `AGENTS.md` — Expo-specific rules (versioned docs, `npx expo install`, EAS).
6. `graphify-out/GRAPH_REPORT.md` — current shape of the code. For anything you have not touched before, run `graphify query "<question>"` before opening files.

## Golden rules

- **One task = one GitHub issue = one branch = one PR.** Branch name: `<agent>/<issue-number>-short-name`.
- **Stay in your lane.** Only edit the paths your agent file allows. If the task needs work elsewhere, comment on the issue and let the orchestrator create a task for the right agent.
- **Never review or approve your own work.** Never merge — the founder merges.
- **No scope creep.** If it is not in the issue's acceptance criteria, do not build it. Ideas go into a new issue labelled `idea`.
- **Small PRs.** Aim for < 400 changed lines excluding generated files. Split otherwise.
- Agents run headless: run every command in the foreground and wait for it. Never background a command or end your turn waiting for a notification.
- Before saying "done": `npm run check` passes (lint + typecheck + tests). Paste the result in the PR.

## Code quality

- TypeScript strict. No `any`, no `@ts-ignore`, no non-null `!` without a comment explaining why it is safe.
- Name things for what they mean in the product (`claimOffer`, not `handleClick2`).
- Every exported function in `services/`, `lib/` and feature hooks has a test. Bug fix → first a failing test.
- No dead code, no commented-out code, no `console.log`.
- Add a dependency only with `npx expo install`, and only if the issue allows it or the PR explains why. Prefer what is already installed.
- UI text through the i18n helper once it exists (Ukrainian first).

## Security (non-negotiable)

- Secrets never in code, commits, logs, issues or PR text. Only `EXPO_PUBLIC_*` values may reach the app.
- Every new table: RLS enabled + explicit policies + explicit grants in the same migration + a test proving a stranger cannot read/write it.
- Anything a user could cheat (claims, redemptions, limits, roles) is decided on the server (Edge Function or SQL policy), never in the app.
- Validate all Edge Function input; return generic error messages; never echo tokens.
- Store hashes of tokens, never raw tokens.

## Database

- Schema changes only through a new file in `supabase/migrations/` (`supabase migration new <name>`). Never edit an applied migration.
- After a schema change, regenerate `src/types/database.ts`.
- Update the data model / RLS table in `docs/ARCHITECTURE.md` in the same PR.

## Decisions

Any non-obvious choice (library, pattern, trade-off) → a short file in `docs/decisions/NNNN-title.md` (context, decision, consequences).
