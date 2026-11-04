# 0003 — Block public email sign-up with a before-user-created hook

**Context.** Only anonymous guests may self-register (decision 0002). Staff accounts are created by the founder. The obvious setting, `[auth] enable_signup = false`, was verified on local Supabase (gotrue v2.197.0): it rejects anonymous sign-ins too (`422 signup_disabled`), which would break every guest.

**Decision.** Keep `enable_signup = true` and `enable_anonymous_sign_ins = true`. Register the Postgres hook `public.hook_before_user_created` (`[auth.hook.before_user_created]` in `supabase/config.toml`). It allows the request only when `user.is_anonymous` is true and otherwise returns a generic 403.

Verified locally: anonymous sign-up → 200; email+password sign-up → 403; magic-link/OTP with `create_user` → 403; admin API `POST /admin/users` (founder/dashboard) → 200, because the hook does not run for admin-created users. Existing email users can still sign in.

**Consequences.**

- The hook is a SQL function executable only by `supabase_auth_admin`; covered by a pgTAP test.
- Sign in with Apple / Google (roadmap #13) creates new non-anonymous users and would be blocked. That work must either link the existing anonymous user (`linkIdentity`, which creates no new user) or extend the hook.
- The hosted project needs the hook enabled by hand (config.toml only applies locally) — see the Auth section in `docs/ARCHITECTURE.md`.
