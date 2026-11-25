import {
  isValidCode,
  isValidDisplayName,
  isValidEmail,
  isValidHandle,
  normalizeHandle,
} from './profileRules';

describe('profileRules', () => {
  it('normalizes a handle', () => {
    expect(normalizeHandle('  @Nova.DJ ')).toBe('nova.dj');
  });

  it('validates handles like the database constraint', () => {
    expect(isValidHandle('nova_1.x')).toBe(true);
    expect(isValidHandle('ab')).toBe(false);
    expect(isValidHandle('a'.repeat(21))).toBe(false);
    expect(isValidHandle('Nova')).toBe(false);
    expect(isValidHandle('no va')).toBe(false);
  });

  it('validates display names by length', () => {
    expect(isValidDisplayName(' Ія ')).toBe(true);
    expect(isValidDisplayName('a')).toBe(false);
    expect(isValidDisplayName('a'.repeat(31))).toBe(false);
  });

  it('validates email and 6-digit code', () => {
    expect(isValidEmail(' a@b.ua ')).toBe(true);
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidCode('123456')).toBe(true);
    expect(isValidCode('12345')).toBe(false);
    expect(isValidCode('12a456')).toBe(false);
  });
});
