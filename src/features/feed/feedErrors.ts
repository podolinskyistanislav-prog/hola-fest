import { t, type TranslationKey } from '@/lib/i18n';
import type { FeedFailureReason } from '@/services/feed';

const KEYS: Record<FeedFailureReason, TranslationKey> = {
  promo: 'feed.error.promo',
  links: 'feed.error.links',
  abuse: 'feed.error.abuse',
  rate_limit: 'feed.error.rate_limit',
  invalid: 'feed.error.invalid',
  unauthenticated: 'feed.error.unauthenticated',
  forbidden: 'feed.error.forbidden',
  not_found: 'feed.error.not_found',
  network: 'feed.error.network',
  unknown: 'feed.error.unknown',
};

/** Friendly Ukrainian text for a server refusal; never shows the submitted text. */
export function feedErrorMessage(reason: FeedFailureReason): string {
  return t(KEYS[reason]);
}
