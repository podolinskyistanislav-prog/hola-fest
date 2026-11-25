# 0011 — Offer builder data model

**Context.** Venues build offers themselves (templates, window, limits, pause/duplicate/end, stats). The old model had one event per offer, `is_active` and `valid_until`, and the app and Edge Functions already depend on them.

**Decision.**

- Extend `offers` instead of a new table: `kind`, `value` (text, validated per kind), `starts_at`, `ends_at`, `status`, `venue_id`; `event_id` becomes nullable (an offer can belong to the venue and a time window only). Existing rows are backfilled (`custom`, venue from the event, `ends_at = valid_until`, live/paused from `is_active`).
- Stored `status` is the venue's intent. `live`, `scheduled` and `ended` are derived from the window by `offer_effective_status`, used by the guest RLS policy and by `claim_offer`, so nothing needs a cron job.
- `is_active` and `valid_until` stay as legacy columns kept in sync by the `offers_validate` trigger, so existing code keeps working; new code uses `status` and `ends_at`.
- Validation is a trigger (not an RPC like `save_offer`), so it holds for every write path: percent 1–100, amount > 0, `HH:MM` for free entry, non-empty gift; `venue_id` is always taken from the event; the window must end after it starts and, for an event offer, must not outlive the event (it may open earlier, for early publishing). Limits stay table checks. Write rights stay in RLS (venue `admin`, superadmin).
- Lifecycle RPCs (`pause_offer`, `resume_offer`, `end_offer`, `duplicate_offer`) are `security definer`, check the caller, and answer "not found" for both missing and foreign offers. A duplicate is a draft without a window.
- A guest keeps read access to offers they hold a claim on (`has_claim_on_offer`), so a ticket does not disappear when the offer ends.
- Title and terms text are generated in TypeScript (`src/services/offerBuilder.ts`), not SQL, so there is one copy, shared with the app and tested.

**Consequences.** Offers without an event are not yet shown by the claims list (it joins `events!inner`) or the guest screens; the mobile tasks of the offer builder must handle them. Two legacy columns exist until the app moves to `status` / `ends_at`; dropping them needs a later migration.
