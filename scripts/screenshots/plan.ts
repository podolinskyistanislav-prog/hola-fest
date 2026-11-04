import type { ScreenConfig, Theme } from './screens';

export type Shot = {
  screen: string;
  theme: Theme;
  path: string;
  file: string;
};

/** One shot per screen and theme, e.g. `home.dark.png`. */
export function buildShotPlan(screens: readonly ScreenConfig[], themes: readonly Theme[]): Shot[] {
  const names = new Set<string>();
  for (const { name, path } of screens) {
    if (!/^[a-z0-9-]+$/.test(name)) throw new Error(`Invalid screen name: ${name}`);
    if (!path.startsWith('/')) throw new Error(`Screen path must start with "/": ${name}`);
    if (names.has(name)) throw new Error(`Duplicate screen name: ${name}`);
    names.add(name);
  }
  return screens.flatMap(({ name, path }) =>
    themes.map((theme) => ({ screen: name, theme, path, file: `${name}.${theme}.png` })),
  );
}

/**
 * Reads `KEY="value"` lines (the output of `supabase status -o env`) and returns the
 * `EXPO_PUBLIC_*` values the app needs. Errors never contain the values.
 */
export function appEnvFromSupabaseStatus(output: string): Record<string, string> {
  const values = new Map<string, string>();
  for (const line of output.split('\n')) {
    const match = /^([A-Z_]+)="?([^"]*)"?$/.exec(line.trim());
    if (match?.[1] && match[2] !== undefined) values.set(match[1], match[2]);
  }
  const url = values.get('API_URL');
  const anonKey = values.get('ANON_KEY');
  if (!url || !anonKey) {
    throw new Error('Local Supabase is not running. Run `supabase start` and `supabase db reset`.');
  }
  return { EXPO_PUBLIC_SUPABASE_URL: url, EXPO_PUBLIC_SUPABASE_ANON_KEY: anonKey };
}

/** Maps a request URL to a file in the static export; falls back to index.html (SPA). */
export function resolveStaticPath(
  requestUrl: string,
  exists: (path: string) => boolean,
): string | null {
  let pathname: string;
  try {
    pathname = decodeURIComponent(requestUrl.split('?')[0] ?? '/');
  } catch {
    return null;
  }
  if (pathname.includes('..')) return null;
  const clean = pathname.replace(/\/+$/, '');
  for (const candidate of [clean, `${clean}.html`, `${clean}/index.html`]) {
    if (candidate && exists(candidate)) return candidate;
  }
  return exists('/index.html') ? '/index.html' : null;
}
