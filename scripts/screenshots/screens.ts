/** Screens to capture. To add a screen, add one line: `{ name, path }`. */
export type ScreenConfig = {
  /** File-name friendly id, e.g. `home`. */
  name: string;
  /** Route in the web build, starting with `/`. */
  path: string;
};

export const SCREENS: readonly ScreenConfig[] = [
  { name: 'home', path: '/' },
  { name: 'staff-login', path: '/staff-login' },
];

export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

/** Phone viewport (iPhone 14 class). */
export const VIEWPORT = { width: 390, height: 844 } as const;

/** Where PNGs are written. `dist/` is git-ignored. */
export const OUTPUT_DIR = 'dist/screenshots';
