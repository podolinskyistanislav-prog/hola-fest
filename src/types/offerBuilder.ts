export type OfferKind =
  'percent_off' | 'amount_off' | 'free_entry_until' | 'gift' | 'two_for_one' | 'custom';

/** Stored status is the venue's intent; `effective` status also looks at the time window. */
export type OfferStatus = 'draft' | 'scheduled' | 'live' | 'paused' | 'ended';

export type OfferWindow = {
  status: OfferStatus;
  startsAt: Date | null;
  endsAt: Date | null;
};

export type BuilderOffer = {
  id: string;
  eventId: string | null;
  venueId: string;
  kind: OfferKind;
  value: string | null;
  title: string;
  terms: string | null;
  maxClaims: number | null;
  perUserLimit: number;
  startsAt: Date | null;
  endsAt: Date | null;
  status: OfferStatus;
};

export type OfferStats = {
  offerId: string;
  claims: number;
  redemptions: number;
};
