# 0008 — Native builds with EAS from GitHub Actions

**Context.** The founder needs the app on real phones for the club demo, with nothing heavier than Node installed locally. The repo is public, so builds must not need secrets in code.

**Decision.**

- The Expo project is `@errer09s-team/hola-fest` (`owner` and `extra.eas.projectId` in `app.json`). CI signs in with a robot user's token stored as the `EXPO_TOKEN` repo secret.
- `eas.json` has two profiles. `preview` is internal distribution with an Android APK that installs from a link. `production` is store builds with a remote, auto-incremented build number.
- The `App build (EAS)` workflow runs only when someone starts it by hand. Before every build it copies `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` into the matching EAS environment, reading the anon key with the Supabase CLI, so nothing is pasted by hand. Only the anon key is read.
- Android signing credentials are generated and stored by EAS on the first build.

**Consequences.**

- Android: the APK works for the demo. The map stays blank until the Google Maps key exists (0006).
- iOS: an iPhone build needs an Apple Developer account ($99/year) and an interactive credentials setup once. Until then, iPhone users test in the web preview.
- Free EAS builds wait in a shared queue, and a build can take 10–60 minutes.
