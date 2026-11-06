import { getClaimToken, rememberClaimToken } from './claimedTokens';

describe('claimedTokens', () => {
  it('returns the token remembered for an offer', () => {
    rememberClaimToken('o1', 'tok');
    expect(getClaimToken('o1')).toBe('tok');
  });

  it('returns undefined for an offer that was not claimed here', () => {
    expect(getClaimToken('other')).toBeUndefined();
  });
});
