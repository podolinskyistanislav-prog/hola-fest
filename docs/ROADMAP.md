# MVP roadmap

The orchestrator turns each milestone into issues. Order matters: each step depends on the previous ones.

| #   | Milestone                                                                            | Owner(s)              | Done when                                         |
| --- | ------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| 0   | Foundation: Expo, tooling, docs, agents, CI                                          | —                     | This PR merged                                    |
| 1   | Schema v1: profiles, venues, venue_members, events, offers, claims + RLS + RLS tests | db                    | Stranger/guest/host/admin access tests pass       |
| 2   | Auth: Sign in with Apple + Google, profile auto-created                              | db, mobile            | Can sign in on a device; profile row exists       |
| 3   | Events list: today / this week, event page                                           | mobile (+ db service) | Real data from Supabase, virtualized list, tests  |
| 4   | Map of venues                                                                        | mobile                | Pins for published venues, tap → venue page       |
| 5   | Claim offer → one-time QR (`claim-offer` function)                                   | db, mobile            | Limits enforced server-side; QR shown offline     |
| 6   | Host scanner (`redeem-claim` function)                                               | db, mobile            | ✅/❌ in < 1 s; second scan of same QR fails      |
| 7   | Venue admin: create/edit events and offers                                           | mobile (+ db)         | Admin of venue A cannot touch venue B             |
| 8   | Taxi buttons: Uklon, Bolt, Uber deep links                                           | mobile                | Unit-tested links; verified on real phone         |
| 9   | Kyiv specifics: curfew hint, shelter badge                                           | mobile                | Curfew is config, not hardcoded                   |
| 10  | Push notifications for tonight's offers                                              | db, mobile            | Opt-in, one push per venue per day max            |
| 11  | Observability: Sentry + PostHog funnel events                                        | mobile                | Funnel viewed → claimed → redeemed → taxi visible |
| 12  | Test builds: EAS → TestFlight + APK                                                  | mobile                | Partner clubs have the app installed              |
