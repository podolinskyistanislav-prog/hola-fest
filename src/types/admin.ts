export type AdminVenue = {
  id: string;
  slug: string;
  name: string;
  isPublished: boolean;
  role: 'admin' | 'host';
};

export type EventStatus = 'draft' | 'published';

export type AdminEvent = {
  id: string;
  venueId: string;
  title: string;
  description: string | null;
  lineup: string[];
  startsAt: Date;
  endsAt: Date | null;
  priceFromUah: number | null;
  status: EventStatus;
};

export type EventInput = {
  title: string;
  description?: string | null;
  lineup?: string[];
  startsAt: Date;
  endsAt?: Date | null;
  priceFromUah?: number | null;
};

export type AdminOffer = {
  id: string;
  eventId: string;
  title: string;
  terms: string | null;
  maxClaims: number | null;
  perUserLimit: number;
  validUntil: Date | null;
  isActive: boolean;
};

export type OfferInput = {
  title: string;
  terms?: string | null;
  maxClaims?: number | null;
  perUserLimit?: number;
  validUntil?: Date | null;
};
