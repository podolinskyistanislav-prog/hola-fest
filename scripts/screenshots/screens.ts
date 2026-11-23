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
export const TICKET_OFFER_ID = '00000000-0000-4000-8000-000000000113';

/** A fake token that is only drawn as a QR; its hash is stored on the demo claim. */
export const TICKET_TOKEN = 'screenshot-demo-claim-token';

export const SCREENS: readonly ScreenConfig[] = [
  { name: 'home', path: '/' },
  { name: 'event', path: '/event/00000000-0000-4000-8000-000000000013' },
  {
    name: 'ticket',
    path: '/ticket/' + TICKET_OFFER_ID,
    // Same key as claimedTokens.ts.
    seed: { ['claim-token.' + TICKET_OFFER_ID]: TICKET_TOKEN },
  },
  { name: 'map', path: '/map' },
  { name: 'my-qr', path: '/tickets' },
];

export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

/** Phone viewport (iPhone 14 class). */
export const VIEWPORT = { width: 390, height: 844 } as const;

/** Where PNGs are written. `dist/` is git-ignored. */
export const OUTPUT_DIR = 'dist/screenshots';
