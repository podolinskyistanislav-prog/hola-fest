import { uk } from '@/lib/i18n';
import type { FeedFailureReason } from '@/services/feed';

import { feedErrorMessage } from './feedErrors';

describe('feedErrorMessage', () => {
  it('explains a promo refusal in Ukrainian', () => {
    expect(feedErrorMessage('promo')).toBe(uk['feed.error.promo']);
    expect(feedErrorMessage('promo')).toContain('Події');
  });

  it.each<FeedFailureReason>([
    'promo',
    'links',
    'abuse',
    'rate_limit',
    'invalid',
    'unauthenticated',
    'forbidden',
    'not_found',
    'network',
    'unknown',
  ])('has a non-empty text for %s', (reason) => {
    expect(feedErrorMessage(reason).length).toBeGreaterThan(0);
  });
});
