import type { TranslationKey } from '@/lib/i18n';
import type { MyDjProfile, MyDjProfileInput } from '@/types/djs';

export const STAGE_NAME_MIN = 2;
export const STAGE_NAME_MAX = 40;
export const BIO_MAX = 1000;
export const GENRES_MAX = 10;
export const URL_MAX = 200;

/** What the cabinet form holds while the DJ edits. Photo URIs are remote (saved) or local (picked). */
export type DjProfileFormValues = {
  stageName: string;
  bio: string;
  genres: string[];
  instagram: string;
  soundcloud: string;
  photoUri: string | null;
  coverUri: string | null;
};

export type DjProfileErrors = Partial<
  Record<'stageName' | 'bio' | 'instagram' | 'soundcloud', TranslationKey>
>;

export function profileToFormValues(
  profile: MyDjProfile,
  photoUri: string | null,
  coverUri: string | null,
): DjProfileFormValues {
  return {
    stageName: profile.stageName,
    bio: profile.bio ?? '',
    genres: profile.genres,
    instagram: profile.instagramUrl ?? '',
    soundcloud: profile.soundcloudUrl ?? '',
    photoUri,
    coverUri,
  };
}

/** Adds one typed genre as a clean chip: trimmed, lower case, no duplicates, at most 10. */
export function addGenre(genres: readonly string[], text: string): string[] {
  const genre = text.trim().toLowerCase();
  if (genre === '' || genres.includes(genre) || genres.length >= GENRES_MAX) return [...genres];
  return [...genres, genre];
}

/** Field errors; an empty object means the profile may be saved. */
export function validateDjProfile(values: DjProfileFormValues): DjProfileErrors {
  const errors: DjProfileErrors = {};
  const name = values.stageName.trim();
  if (name.length < STAGE_NAME_MIN) errors.stageName = 'djCabinet.error.nameRequired';
  else if (name.length > STAGE_NAME_MAX) errors.stageName = 'djCabinet.error.nameTooLong';
  if (values.bio.length > BIO_MAX) errors.bio = 'djCabinet.error.bioTooLong';
  if (values.instagram.trim().length > URL_MAX) errors.instagram = 'djCabinet.error.linkTooLong';
  if (values.soundcloud.trim().length > URL_MAX) errors.soundcloud = 'djCabinet.error.linkTooLong';
  return errors;
}

/** A picked file lives on the device; a saved one is an http(s) URL. */
export function isLocalUri(uri: string | null): uri is string {
  return uri !== null && !/^https?:\/\//.test(uri);
}

function textOrNull(text: string): string | null {
  const trimmed = text.trim();
  return trimmed === '' ? null : trimmed;
}

export type DjProfileSave = {
  fields: MyDjProfileInput;
  /** Picked file to upload as the new photo; the hook then stores its path. */
  newPhotoUri: string | null;
  newCoverUri: string | null;
};

/** Splits the form into the text fields to save and the picked images to upload first. */
export function buildProfileSave(
  values: DjProfileFormValues,
  original: MyDjProfile,
): DjProfileSave {
  const fields: MyDjProfileInput = {
    stageName: values.stageName.trim(),
    bio: textOrNull(values.bio),
    genres: values.genres,
    instagramUrl: textOrNull(values.instagram),
    soundcloudUrl: textOrNull(values.soundcloud),
  };
  if (values.photoUri === null && original.photoPath !== null) fields.photoPath = null;
  if (values.coverUri === null && original.coverPath !== null) fields.coverPath = null;
  return {
    fields,
    newPhotoUri: isLocalUri(values.photoUri) ? values.photoUri : null,
    newCoverUri: isLocalUri(values.coverUri) ? values.coverUri : null,
  };
}
