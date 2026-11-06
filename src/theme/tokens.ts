/**
 * Hola Fest design tokens — the single source of truth for how the app looks.
 * Approved mockups: https://claude.ai/artifact/AvyZwZkTfX2RScQiXkfCvH
 * Rules: docs/DESIGN.md. Never hardcode a color, radius or font outside this folder.
 */

/** Hola brand colors, taken from the logo. Text on them is always `onAccent` (black). */
export const brand = {
  yellow: '#FDD303',
  pink: '#F1277D',
  onAccent: '#000000',
} as const;

/** Ticket paper and ink for QR codes: always black on white, in both themes, so scanners read it. */
export const ticket = {
  paper: '#FFFFFF',
  ink: '#000000',
  inkMuted: '#52525B',
} as const;

/** Full-screen scan verdict for hosts: bright, unmistakable, same in both themes. Text on it is `ink` (black). */
export const scanResult = {
  success: '#22C55E',
  failure: '#EF4444',
  ink: '#000000',
} as const;

export type ColorScheme = 'dark' | 'light';

export interface Palette {
  /** Screen background. */
  background: string;
  /** Cards and list rows sitting on the background. */
  surface: string;
  /** Chips, inactive pills, inputs. */
  surfaceRaised: string;
  border: string;
  text: string;
  /** Secondary text: dates, venues, captions. */
  textMuted: string;
  /** Inactive tab and icon color. */
  textSubtle: string;
  /** Selected tab / link color. */
  accent: string;
  /** Error text and error borders (validation messages). */
  danger: string;
  /** Floating glass panels (tab bar, sheets) where native liquid glass is unavailable. */
  glass: {
    fill: string;
    border: string;
    highlight: string;
  };
  /** Glass placed over a colored cover (chips and info panels on event covers). Same in both themes. */
  glassOnCover: {
    fill: string;
    border: string;
    text: string;
  };
}

const glassOnCover = {
  fill: 'rgba(0,0,0,0.42)',
  border: 'rgba(255,255,255,0.26)',
  text: '#FFFFFF',
} as const;

export const palettes: Record<ColorScheme, Palette> = {
  dark: {
    background: '#000000',
    surface: '#111113',
    surfaceRaised: '#18181B',
    border: '#27272A',
    text: '#FFFFFF',
    textMuted: '#A1A1AA',
    textSubtle: '#D4D4D8',
    accent: brand.yellow,
    danger: '#FF6B6B',
    glass: {
      fill: 'rgba(28,28,30,0.72)',
      border: 'rgba(255,255,255,0.16)',
      highlight: 'rgba(255,255,255,0.22)',
    },
    glassOnCover,
  },
  light: {
    background: '#FFFFFF',
    surface: '#F4F4F5',
    surfaceRaised: '#F4F4F5',
    border: '#E4E4E7',
    text: '#0A0A0A',
    textMuted: '#52525B',
    textSubtle: '#71717A',
    accent: '#0A0A0A',
    danger: '#B91C1C',
    glass: {
      fill: 'rgba(255,255,255,0.78)',
      border: 'rgba(0,0,0,0.08)',
      highlight: 'rgba(255,255,255,0.95)',
    },
    glassOnCover,
  },
};

/** Corner radii in points. Large, soft corners are part of the look. */
export const radius = {
  chip: 16,
  control: 20,
  row: 22,
  card: 28,
  sheet: 32,
  pill: 999,
} as const;

/** 4-point spacing scale. Screen edge padding is `screen`. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  screen: 20,
} as const;

/** Minimum touch target (Apple HIG). */
export const touchTarget = 44;

export const fontFamily = {
  display: 'Unbounded_700Bold',
  displayMedium: 'Unbounded_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
} as const;

/** Type scale: Unbounded for headings, Inter for everything else. */
export const typography = {
  title: { fontFamily: fontFamily.display, fontSize: 26, lineHeight: 32, letterSpacing: -0.4 },
  heading: { fontFamily: fontFamily.displayMedium, fontSize: 18, lineHeight: 24 },
  cardTitle: { fontFamily: fontFamily.displayMedium, fontSize: 16, lineHeight: 21 },
  body: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 21 },
  bodyStrong: { fontFamily: fontFamily.bodySemibold, fontSize: 15, lineHeight: 21 },
  caption: { fontFamily: fontFamily.body, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fontFamily.bodySemibold, fontSize: 13, lineHeight: 18 },
  tab: { fontFamily: fontFamily.bodyMedium, fontSize: 11, lineHeight: 14 },
} as const;

export type TypographyVariant = keyof typeof typography;
