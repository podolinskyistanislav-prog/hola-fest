/** Screens to capture. To add a screen, add one line: `{ name, path }`. */
export type ScreenConfig = {
  /** File-name friendly id, e.g. `home`. */
  name: string;
  /** Route in the web build, starting with `/`. */
  path: string;
  /** localStorage entries written before the page loads (e.g. a claim token for the ticket). */
  seed?: Readonly<Record<string, string>>;
};

/** Seeded offer "Free tonight cocktail" (supabase/seed.sql). */
const TICKET_OFFER_ID = '00000000-0000-4000-8000-000000000113';

export const SCREENS: readonly ScreenConfig[] = [
  { name: 'home', path: '/' },
  { name: 'event', path: '/event/00000000-0000-4000-8000-000000000013' },
  { name: 'venue', path: '/venue/00000000-0000-4000-8000-000000000001' },
  { name: 'map', path: '/map' },
  { name: 'tickets', path: '/tickets' },
  {
    name: 'ticket',
    path: '/ticket/' + TICKET_OFFER_ID,
    // Same key as claimedTokens.ts; a fake token that is only drawn as a QR.
    seed: { ['claim-token.' + TICKET_OFFER_ID]: 'screenshot-demo-claim-token' },
  },
  { name: 'staff-login', path: '/staff-login' },
];

export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

/** Phone viewport (iPhone 14 class). */
export const VIEWPORT = { width: 390, height: 844 } as const;

/** Where PNGs are written. `dist/` is git-ignored. */
export const OUTPUT_DIR = 'dist/screenshots';
