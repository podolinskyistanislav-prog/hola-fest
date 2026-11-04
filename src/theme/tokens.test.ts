import { contrastRatio } from './contrast';
import { brand, palettes, type ColorScheme } from './tokens';

const AA_TEXT = 4.5;

describe('contrastRatio', () => {
  it('is 21 for black on white and 1 for identical colors', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 0);
    expect(contrastRatio('#FDD303', '#FDD303')).toBeCloseTo(1, 5);
  });

  it('accepts short hex and rejects non-hex values', () => {
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 0);
    expect(() => contrastRatio('rgba(0,0,0,0.5)', '#fff')).toThrow(/opaque hex/);
  });
});

describe('brand accents', () => {
  it.each([
    ['yellow', brand.yellow],
    ['pink', brand.pink],
  ])('black text on %s meets WCAG AA', (_name, accent) => {
    expect(contrastRatio(brand.onAccent, accent)).toBeGreaterThanOrEqual(AA_TEXT);
  });
});

describe.each<ColorScheme>(['dark', 'light'])('%s palette', (scheme) => {
  const p = palettes[scheme];

  it.each([
    ['text on background', p.text, p.background],
    ['muted text on background', p.textMuted, p.background],
    ['subtle text on background', p.textSubtle, p.background],
    ['accent on background', p.accent, p.background],
    ['text on surface', p.text, p.surface],
    ['muted text on surface', p.textMuted, p.surface],
  ])('%s meets WCAG AA', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA_TEXT);
  });
});
