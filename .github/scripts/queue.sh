#!/usr/bin/env bash
# Deterministic task queue: no AI, so it costs nothing and never misses a step.
#  1. Unblock: status:blocked issues whose "Blocked by" issues are all closed → status:queued.
#  2. Release: while active tasks < AGENTS_MAX_PARALLEL, move the next queued (priority:high first,
#     then lowest number)
#     task to status:todo and start its agent (workflow_dispatch of agents.yml).
#  3. Close milestone issues whose tasks are all closed.
# Labels set here use GITHUB_TOKEN, so they never trigger workflows by themselves.
set -euo pipefail

REPO="${GITHUB_REPOSITORY:?}"
MAX="${AGENTS_MAX_PARALLEL:-1}"
act() { if [ "${DRY_RUN:-0}" = 1 ]; then echo "  DRY: $*"; else "$@"; fi; }
WORKERS='agent:db|agent:mobile|agent:ui|agent:qa'

all=$(gh api "repos/$REPO/issues?state=all&per_page=100" --paginate \
  --jq '[.[] | select(.pull_request | not) | {n: .number, state, title, body: (.body // ""), labels: [.labels[].name]}]' \
  | jq -s 'add')

is_closed() { jq -e --argjson n "$1" '.[] | select(.n == $n) | .state == "closed"' <<<"$all" >/dev/null; }

# 1. Unblock
for n in $(jq -r '.[] | select(.state=="open" and (.labels|index("status:blocked"))) | .n' <<<"$all"); do
  deps=$(jq -r --argjson n "$n" '.[] | select(.n==$n) | .body' <<<"$all" \
    | grep -iE 'blocked by' | grep -oE '#[0-9]+' | tr -d '#' | sort -u || true)
  [ -z "$deps" ] && continue
  ok=1
  for d in $deps; do is_closed "$d" || { ok=0; break; }; done
  if [ "$ok" = 1 ]; then
    echo "unblock #$n (deps: $(echo $deps))"
    act gh issue edit "$n" --repo "$REPO" --remove-label status:blocked --add-label status:queued
    all=$(jq --argjson n "$n" 'map(if .n==$n then .labels = (.labels - ["status:blocked"] + ["status:queued"]) else . end)' <<<"$all")
  fi
done

# 2. Release
active=$(jq --arg w "$WORKERS" '[.[] | select(.state=="open")
  | select(any(.labels[]; test("^(" + $w + ")$")))
  | select(any(.labels[]; . == "status:todo" or . == "status:in-progress"))] | length' <<<"$all")
echo "active=$active max=$MAX"
for n in $(jq -r --arg w "$WORKERS" '[.[] | select(.state=="open")
  | select(.labels|index("status:queued"))
  | select((.labels|index("status:blocked")|not) and (.labels|index("status:needs-founder")|not))
  | select(any(.labels[]; test("^(" + $w + ")$")))]
  | sort_by([(if (.labels|index("priority:high")) then 0 else 1 end), .n]) | .[].n' <<<"$all"); do
  [ "$active" -ge "$MAX" ] && break
  echo "release #$n"
  act gh issue edit "$n" --repo "$REPO" --remove-label status:queued --add-label status:todo
  act gh workflow run agents.yml --repo "$REPO" -f issue="$n"
  active=$((active + 1))
done

# 3. Close finished milestones
for m in $(jq -r '.[] | select(.state=="open" and (.title|startswith("Milestone")) and (.labels|index("agent:orchestrator"))) | .n' <<<"$all"); do
  open_tasks=$(jq --arg ref "#$m" '[.[] | select(.state=="open")
    | select(.body | test("Milestone:\\**\\s*" + $ref + "\\b"))] | length' <<<"$all")
  total=$(jq --arg ref "#$m" '[.[] | select(.body | test("Milestone:\\**\\s*" + $ref + "\\b"))] | length' <<<"$all")
  if [ "$total" -gt 0 ] && [ "$open_tasks" -eq 0 ]; then
    echo "close milestone #$m"
    act gh issue close "$m" --repo "$REPO" --reason completed --comment "Усі задачі етапу закрито ✅"
  fi
done
