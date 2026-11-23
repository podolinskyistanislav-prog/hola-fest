export type DjGig = {
  eventId: string;
  title: string;
  startsAt: Date;
  venueName: string;
  /** Title of the event's first active offer, if any. */
  offerTitle: string | null;
};

export type Dj = {
  /** URL-safe id derived from the name, e.g. `dj-vlad-kotyk`. */
  slug: string;
  name: string;
  /** Genre tags of the DJ's upcoming events, deduped, in first-seen order. */
  genres: string[];
  /** Upcoming gigs, earliest first. Never empty. */
  gigs: DjGig[];
};
