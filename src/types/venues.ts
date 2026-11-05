export type Venue = {
  id: string;
  slug: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  hasShelter: boolean;
};

export type VenueEvent = {
  id: string;
  title: string;
  startsAt: Date;
  endsAt: Date | null;
  priceFromUah: number | null;
  coverPath: string | null;
};

export type VenueDetails = Venue & {
  upcomingEvents: VenueEvent[];
};
