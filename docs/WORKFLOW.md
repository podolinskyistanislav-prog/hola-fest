# How the agent team works

The **shared database of the team is GitHub**: issues are tasks, labels are state, PRs are results, PR comments are reviews, `docs/decisions/` is long-term memory. Agents keep no memory between runs — if it is not in GitHub or the repo, it did not happen.

## The team

| Agent         | File                             | Owns (may edit)                                                                   |
| ------------- | -------------------------------- | --------------------------------------------------------------------------------- |
| Orchestrator  | `.claude/agents/orchestrator.md` | Issues, labels, `docs/ROADMAP.md`                                                 |
| DB / Backend  | `.claude/agents/db-backend.md`   | `supabase/**`, `src/services/**`, `src/types/database.ts`                         |
| Mobile        | `.claude/agents/mobile.md`       | `src/app/**`, `src/features/**`, `src/components/**` (except `ui/`), `src/lib/**` |
| UI/UX         | `.claude/agents/ui-ux.md`        | `src/theme/**`, `src/components/ui/**`, `docs/DESIGN.md`, `assets/**`             |
| Reviewer      | `.claude/agents/reviewer.md`     | Nothing — comments only                                                           |
| Security / QA | `.claude/agents/security-qa.md`  | Test files (`*.test.ts(x)`, `supabase/tests/**`)                                  |

Shared config (`package.json`, `app.json`, CI, docs) changes only when the issue says so.

## Labels

- Owner: `agent:orchestrator`, `agent:db`, `agent:mobile`, `agent:ui`, `agent:qa`
- State: `status:queued` (planned, waiting for a slot) → `status:todo` → `status:in-progress` → `status:review` → `status:changes-requested` → `status:done` (closed by merge) | `status:blocked`
- Kind: `feature`, `bug`, `architecture`, `idea`

## Life of a task

1. **Founder** writes a goal (issue labelled `agent:orchestrator`, or a message to the orchestrator).
2. **Orchestrator** splits it into issues using the task template: goal, acceptance criteria, allowed paths, dependencies (`Blocked by #N`). Labels each with owner + `status:todo`.
3. **Owner agent** picks the lowest-numbered unblocked `status:todo` issue for its label, sets `status:in-progress`, works on branch `<agent>/<n>-name`, runs `npm run check`, opens a PR with `Closes #n`, sets `status:review`.
4. **CI** runs lint, typecheck, tests, rebuilds the Graphify report.
5. **Reviewer** + **Security/QA** review the PR, plus **UI/UX** when it touches screens, components or the theme. Verdict comment starts with `APPROVE` or `CHANGES REQUESTED` and lists findings as a checklist.
6. On changes → owner fixes on the same branch → back to step 4.
7. **Founder** merges. The issue closes; orchestrator unblocks dependents.

## Escalate to the founder when

- acceptance criteria are unclear or contradict `PRODUCT.md` / `ARCHITECTURE.md`;
- a task needs a new external service, a paid plan, or a secret;
- an agent and the reviewer disagree twice on the same point.
  Label the issue `status:blocked` and write one clear question.

## Queue and usage limits

Planned tasks wait as `status:queued`. After every merge the orchestrator releases queued tasks until the number of
active tasks (`status:todo` / `status:in-progress`) reaches `AGENTS_MAX_PARALLEL`, a repo variable that defaults to 1.
Raise it in _Settings → Secrets and variables → Actions → Variables_ to go faster, or keep it at 1 to save usage.
Reviews do not count as active work.
