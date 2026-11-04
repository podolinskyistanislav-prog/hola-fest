# 0001 — Foundation choices

**Context.** Two-club MVP in Kyiv, built almost entirely by AI agents, tested natively on phones, shipped to stores later. Founder works mostly from the browser on a Mac with little disk space.

**Decision.**

- Expo + Expo Router (one codebase for iOS, Android, web; cloud builds with EAS — no Xcode needed).
- Supabase as backend (Postgres + RLS, Auth, Storage, Edge Functions). Auto-RLS on, auto-expose of new tables off.
- Login with Apple + Google only. No phone numbers (SMS cost, extra personal data).
- GitHub (issues, labels, PRs) is the agents' shared database; Graphify is the shared code map.
- Layer boundaries enforced by ESLint `no-restricted-imports`, not only by convention.
- Offers are redeemed via one-time QR tokens; only token hashes are stored.

**Consequences.** Anyone can browse without an account; trust-sensitive logic lives in Edge Functions; schema changes always go through migrations and review.
