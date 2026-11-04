# 0004 — Screenshot tool: Playwright on the Expo web build

## Context

Reviewers (UI/UX agent and the founder) need to see screens without running a simulator. Native device screenshots are out of scope.

## Decision

`npm run screenshots` (`scripts/screenshots/run.ts`):

1. reads the URL and anon key of the **local Supabase** from `supabase status -o env` (run `supabase start` and `supabase db reset` first, so the seed is loaded);
2. exports the web build with `expo export --platform web`, passing them only as `EXPO_PUBLIC_*` variables;
3. serves the export from a tiny local static server;
4. opens each screen in headless Chromium (**Playwright**) at 390x844, 2x scale, once per theme, emulating `prefers-color-scheme` (the app reads it through `useColorScheme`);
5. writes `dist/screenshots/<screen>.<theme>.png` (git-ignored).

Screens are listed in `scripts/screenshots/screens.ts`; a new screen is one line. Nothing is printed except file names; the local keys are never logged.

Playwright was chosen over Puppeteer for built-in colour-scheme and viewport emulation. `tsx` runs the TypeScript script. First run on a machine needs `npx playwright install chromium`.

## Detecting changed screens (next task)

The follow-up task will map a PR's changed files to screens: a change under `src/theme/**` or `src/components/ui/**` affects all screens; a change under `src/app/<route>` or `src/features/<name>` affects the screens whose route imports it. The script will accept an optional list of screen names and only capture those. Until then, all screens are captured.

## Consequences

- Web rendering approximates native (no real glass blur, fonts may differ slightly); good for layout, colour and contrast review, not pixel-perfect.
- Adds dev dependencies `playwright` and `tsx`.
