import { appEnvFromSupabaseStatus, buildShotPlan, resolveStaticPath } from './plan';
import { SCREENS, THEMES } from './screens';

describe('buildShotPlan', () => {
  it('makes one shot per screen and theme', () => {
    const plan = buildShotPlan(
      [
        { name: 'home', path: '/' },
        { name: 'staff-login', path: '/staff-login' },
      ],
      THEMES,
    );
    expect(plan.map((s) => s.file)).toEqual([
      'home.light.png',
      'home.dark.png',
      'staff-login.light.png',
      'staff-login.dark.png',
    ]);
  });

  it('accepts the real screen config', () => {
    expect(buildShotPlan(SCREENS, THEMES)).toHaveLength(SCREENS.length * THEMES.length);
  });

  it('rejects duplicates, bad names and bad paths', () => {
    expect(() =>
      buildShotPlan(
        [
          { name: 'a', path: '/' },
          { name: 'a', path: '/b' },
        ],
        THEMES,
      ),
    ).toThrow(/Duplicate/);
    expect(() => buildShotPlan([{ name: '../x', path: '/' }], THEMES)).toThrow(/Invalid/);
    expect(() => buildShotPlan([{ name: 'x', path: 'x' }], THEMES)).toThrow(/start with/);
  });
});

describe('appEnvFromSupabaseStatus', () => {
  it('maps API_URL and ANON_KEY to EXPO_PUBLIC values', () => {
    const env = appEnvFromSupabaseStatus(
      'API_URL="http://127.0.0.1:54321"\nANON_KEY="abc"\nJWT_SECRET="s"\n',
    );
    expect(env).toEqual({
      EXPO_PUBLIC_SUPABASE_URL: 'http://127.0.0.1:54321',
      EXPO_PUBLIC_SUPABASE_ANON_KEY: 'abc',
    });
  });

  it('fails without echoing values when Supabase is not running', () => {
    expect(() => appEnvFromSupabaseStatus('JWT_SECRET="topsecret"')).toThrow(/supabase start/);
    expect(() => appEnvFromSupabaseStatus('JWT_SECRET="topsecret"')).not.toThrow(/topsecret/);
  });
});

describe('resolveStaticPath', () => {
  const files = new Set(['/index.html', '/staff-login.html', '/_expo/app.js']);
  const exists = (p: string) => files.has(p);

  it('serves exact files, .html routes and the SPA fallback', () => {
    expect(resolveStaticPath('/_expo/app.js?x=1', exists)).toBe('/_expo/app.js');
    expect(resolveStaticPath('/staff-login', exists)).toBe('/staff-login.html');
    expect(resolveStaticPath('/', exists)).toBe('/index.html');
    expect(resolveStaticPath('/unknown', exists)).toBe('/index.html');
  });

  it('refuses path traversal', () => {
    expect(resolveStaticPath('/../secret', exists)).toBeNull();
  });

  it('returns null for a malformed URL instead of throwing', () => {
    expect(resolveStaticPath('/%E0%A4%A', exists)).toBeNull();
  });
});
