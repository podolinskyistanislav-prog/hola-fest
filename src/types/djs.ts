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
  /** Upcoming gigs, earliest first. Empty only for a published profile with no gigs yet. */
  gigs: DjGig[];
  /** Profile fields; absent for a name that only appears in a lineup text. */
  photoUrl?: string | null;
  coverUrl?: string | null;
  bio?: string | null;
  instagramUrl?: string | null;
  soundcloudUrl?: string | null;
};

/** The signed-in DJ's own profile, including an unpublished one. */
export type MyDjProfile = {
  id: string;
  slug: string;
  stageName: string;
  bio: string | null;
  genres: string[];
  photoPath: string | null;
  coverPath: string | null;
  instagramUrl: string | null;
  soundcloudUrl: string | null;
  isPublished: boolean;
};

/** Editable profile fields. Slug, owner and publishing are never sent from the app. */
export type MyDjProfileInput = {
  stageName?: string;
  bio?: string | null;
  genres?: string[];
  photoPath?: string | null;
  coverPath?: string | null;
  instagramUrl?: string | null;
  soundcloudUrl?: string | null;
};

/** A published DJ that a venue can pick for an event lineup. */
export type DjOption = { id: string; name: string; photoUrl: string | null };
