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
      venue: { id: string; name: string; address: string | null };
    };
  };
}
