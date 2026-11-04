import { uk } from './uk';

export type TranslationKey = keyof typeof uk;

/** Returns the Ukrainian text for a key. Keys are checked at compile time. */
export function t(key: TranslationKey): string {
  return uk[key];
}

export { uk };
