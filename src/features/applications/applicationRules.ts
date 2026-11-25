export const MAX_VENUE_PHOTOS = 4;

export type VenueFormValues = {
  name: string;
  address: string;
  pin: { lat: number; lng: number } | null;
  instagram: string;
  contact: string;
  /** Local resized JPEG files picked on this device. */
  photoUris: string[];
  comment: string;
};

export type DjFormValues = {
  stageName: string;
  genresText: string;
  bio: string;
  photoUri: string | null;
  instagram: string;
  soundcloud: string;
};

/** Genres typed as "techno, house" → clean unique list (max 10, like the database). */
export function parseGenres(text: string): string[] {
  const seen = new Set<string>();
  for (const part of text.split(',')) {
    const genre = part.trim().toLowerCase();
    if (genre) seen.add(genre);
  }
  return [...seen].slice(0, 10);
}

/** A venue application needs a name, an address, a pin, a contact and 1–4 photos. */
export function isVenueFormComplete(values: VenueFormValues): boolean {
  const name = values.name.trim();
  return (
    name.length >= 2 &&
    name.length <= 80 &&
    values.address.trim().length > 0 &&
    values.address.trim().length <= 200 &&
    values.pin !== null &&
    values.contact.trim().length > 0 &&
    values.contact.trim().length <= 200 &&
    values.photoUris.length >= 1 &&
    values.photoUris.length <= MAX_VENUE_PHOTOS
  );
}

/** A DJ application needs a stage name, at least one genre and a link to hear or see them. */
export function isDjFormComplete(values: DjFormValues): boolean {
  const stageName = values.stageName.trim();
  return (
    stageName.length >= 2 &&
    stageName.length <= 40 &&
    parseGenres(values.genresText).length > 0 &&
    (values.instagram.trim().length > 0 || values.soundcloud.trim().length > 0)
  );
}
