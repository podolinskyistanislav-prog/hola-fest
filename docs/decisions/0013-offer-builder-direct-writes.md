# 0013 — Offer builder saves offers with direct table writes

## Context

The offer builder wizard (#265) creates and edits offers. Migration #261 already validates every write in the `offers_validate` trigger (value format, window inside the event) and limits insert/update to venue admins with RLS. Pause, resume, end and duplicate have their own RPCs.

## Decision

The wizard saves with `insert` / `update` on `offers` through `saveVenueOffer` in `src/services/offerBuilder.ts`. No new RPC. The app only sends the venue's intent as `status` (`draft`, `scheduled`, `live`); `live`, `scheduled` and `ended` are derived on the server from the time window. Client-side validation only gives early feedback; the server stays the judge, and its errors are mapped to generic texts.

For an offer tied to an event the window is left empty (the event's own visibility rules apply); scheduling is offered only for a date and time window.

## Consequences

- No schema change and no new grants.
- If a rule needs to be hidden from the client later (for example per-plan limits), move the write into an RPC.
- The old staff offer form is removed; `/staff-offer-form` redirects to `/cabinet-offers`.
