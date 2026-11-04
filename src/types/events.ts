export type EventVenue = {
  id: string;
  slug: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  hasShelter: boolean;
  instagramUrl: string | null;
};

export type EventOffer = {
  id: string;
  title: string;
  terms: string | null;
  validUntil: Date | null;
};

export type EventSummary = {
  id: string;
  title: string;
  startsAt: Date;
  endsAt: Date | null;
  priceFromUah: number | null;
  coverPath: string | null;
  venue: EventVenue;
};

export type EventDetails = EventSummary & {
  description: string | null;
  lineup: string[];
  offers: EventOffer[];
};
