import { env } from './env';

describe('env', () => {
  const original = { ...process.env };

  afterEach(() => {
    process.env = { ...original };
  });

  it('returns the value when the variable is set', () => {
    process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    expect(env.supabaseUrl).toBe('https://example.supabase.co');
  });

  it('throws a helpful error when the variable is missing', () => {
    delete process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
    expect(() => env.supabaseAnonKey).toThrow(/EXPO_PUBLIC_SUPABASE_ANON_KEY/);
  });
});
