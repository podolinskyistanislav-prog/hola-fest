import { t, uk } from './index';

describe('t', () => {
  it('returns the Ukrainian text for a key', () => {
    expect(t('auth.signIn')).toBe('Увійти');
  });

  it('has a non-empty text for every key', () => {
    for (const key of Object.keys(uk) as (keyof typeof uk)[]) {
      expect(t(key).trim().length).toBeGreaterThan(0);
    }
  });

  it('rejects unknown keys at compile time', () => {
    // @ts-expect-error unknown keys must not type-check
    const text: string = t('auth.doesNotExist');
    expect(text).toBeUndefined();
  });
});
