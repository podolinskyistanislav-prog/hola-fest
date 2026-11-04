# 0002 — Anonymous guest accounts for the MVP

**Context.** Sign in with Apple and Google needs an Apple Developer account, a Google Cloud OAuth setup and extra screens. The founder wants the MVP in front of the two clubs fast. Offers still need a per-person identity so that limits and one-time QR codes work.

**Decision.**

- Guests get a Supabase anonymous session silently on first launch. There is no sign-in screen.
- Venue staff and the superadmin use email + password. The founder creates these accounts in the Supabase dashboard.
- Apple / Google sign-in comes after the MVP (roadmap #13). It will link the existing anonymous account, so claims are kept.

**Consequences.** RLS, `claims` and all access tests keep working unchanged, because anonymous users are real auth users. A guest who reinstalls the app becomes a new user and can claim again. That risk is accepted for the MVP and limited by Supabase's per-IP anonymous sign-in rate limit and `per_user_limit`. Anonymous sign-in must be enabled in the Supabase project settings.
