export type ClaimFailureReason =
  | 'unavailable'
  | 'limit_reached'
  | 'rate_limited'
  | 'unauthenticated'
  | 'invalid_request'
  | 'network'
  | 'unknown';

/** The token is shown once; only its hash is stored on the server. */
export type ClaimOfferResult =
  { ok: true; token: string } | { ok: false; reason: ClaimFailureReason };

export type RedeemFailureReason =
  | 'invalid_token'
  | 'unknown_token'
  | 'wrong_venue'
  | 'already_redeemed'
  | 'expired'
  | 'unauthenticated'
  | 'network'
  | 'unknown';

/** The server confirms only success; it returns no guest data, so nothing personal can leak. */
export type RedeemClaimResult = { ok: true } | { ok: false; reason: RedeemFailureReason };

export interface MyClaim {
  id: string;
  status: string;
  issuedAt: Date;
  redeemedAt: Date | null;
  offer: {
    id: string;
    title: string;
    terms: string | null;
    validUntil: Date | null;
    event: {
      id: string;
      title: string;
      startsAt: Date;
      endsAt: Date | null;
      venue: {
        id: string;
        name: string;
        address: string | null;
        lat: number | null;
        lng: number | null;
      };
    };
  };
}
