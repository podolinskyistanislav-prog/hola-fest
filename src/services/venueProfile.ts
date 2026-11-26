import { supabase } from './supabase';
import { toVenueCabinetError, VenueCabinetError } from './venueCabinetError';

export type VenuePhotoKind = 'outside' | 'inside';

export type VenuePhoto = { id: string; kind: VenuePhotoKind; path: string };

/** Everything the owner can edit, including unpublished venues. */
export type VenueProfile = {
  id: string;
  slug: string;
  name: string;
  isPublished: boolean;
  description: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  instagramUrl: string | null;
  hasShelter: boolean;
  coverPath: string | null;
  photos: VenuePhoto[];
};

/** Editable fields only: slug and publishing are never sent from the app. */
export type VenueProfileInput = {
  description?: string | null;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  instagramUrl?: string | null;
  hasShelter?: boolean;
  coverPath?: string | null;
};

const PROFILE_COLUMNS =
  'id, slug, name, is_published, description, address, lat, lng, instagram_url, has_shelter, cover_path';
const PHOTO_COLUMNS = 'id, kind, path';
const MEDIA_BUCKET = 'venue-media';

type ProfileRow = {
  id: string;
  slug: string;
  name: string;
  is_published: boolean;
  description: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  instagram_url: string | null;
  has_shelter: boolean;
  cover_path: string | null;
};

type PhotoRow = { id: string; kind: string; path: string };

function toPhoto(row: PhotoRow): VenuePhoto {
  if (row.kind !== 'outside' && row.kind !== 'inside') throw new VenueCabinetError('unknown');
  return { id: row.id, kind: row.kind, path: row.path };
}

function toProfile(row: ProfileRow, photos: VenuePhoto[]): VenueProfile {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    isPublished: row.is_published,
    description: row.description,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    instagramUrl: row.instagram_url,
    hasShelter: row.has_shelter,
    coverPath: row.cover_path,
    photos,
  };
}

async function listPhotos(venueId: string): Promise<VenuePhoto[]> {
  const { data, error } = await supabase
    .from('venue_photos')
    .select(PHOTO_COLUMNS)
    .eq('venue_id', venueId)
    .order('created_at', { ascending: true })
    .returns<PhotoRow[]>();
  if (error) throw toVenueCabinetError(error);
  return (data ?? []).map(toPhoto);
}

/** The venue with all editable fields (unpublished too) and its photos. RLS limits this to members. */
export async function getMyVenueProfile(venueId: string): Promise<VenueProfile> {
  try {
    const { data, error } = await supabase
      .from('venues')
      .select(PROFILE_COLUMNS)
      .eq('id', venueId)
      .maybeSingle<ProfileRow>();
    if (error) throw toVenueCabinetError(error);
    if (!data) throw new VenueCabinetError('forbidden');
    return toProfile(data, await listPhotos(venueId));
  } catch (error) {
    throw toVenueCabinetError(error);
  }
}

function toUpdate(input: VenueProfileInput) {
  return {
    ...(input.description !== undefined && { description: input.description }),
    ...(input.address !== undefined && { address: input.address }),
    ...(input.lat !== undefined && { lat: input.lat }),
    ...(input.lng !== undefined && { lng: input.lng }),
    ...(input.instagramUrl !== undefined && { instagram_url: input.instagramUrl }),
    ...(input.hasShelter !== undefined && { has_shelter: input.hasShelter }),
    ...(input.coverPath !== undefined && { cover_path: input.coverPath }),
  };
}

/** Updates the editable fields. The server (RLS + trigger) decides who may; slug/publishing never sent. */
export async function updateVenueProfile(
  venueId: string,
  input: VenueProfileInput,
): Promise<VenueProfile> {
  try {
    const { data, error } = await supabase
      .from('venues')
      .update(toUpdate(input))
      .eq('id', venueId)
      .select(PROFILE_COLUMNS)
      .maybeSingle<ProfileRow>();
    if (error) throw toVenueCabinetError(error);
    // RLS hides rows the caller may not update: zero rows means "not allowed".
    if (!data) throw new VenueCabinetError('forbidden');
    return toProfile(data, await listPhotos(venueId));
  } catch (error) {
    throw toVenueCabinetError(error);
  }
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** Uploads an already resized JPEG into the venue's folder of `venue-media` and returns its path. */
export async function uploadVenueFile(
  venueId: string,
  fileUri: string,
  prefix: string,
): Promise<string> {
  const path = `${venueId}/${prefix}-${Date.now()}-${randomSuffix()}.jpg`;
  try {
    const blob = await (await fetch(fileUri)).blob();
    const { error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(path, blob, { contentType: 'image/jpeg' });
    if (error) throw toVenueCabinetError(error);
  } catch (error) {
    throw toVenueCabinetError(error);
  }
  return path;
}

/** Records an already uploaded file as a gallery photo. */
export async function addVenuePhoto(
  venueId: string,
  path: string,
  kind: VenuePhotoKind,
): Promise<VenuePhoto> {
  const { data, error } = await supabase
    .from('venue_photos')
    .insert({ venue_id: venueId, kind, path })
    .select(PHOTO_COLUMNS)
    .single<PhotoRow>();
  if (error) throw toVenueCabinetError(error);
  return toPhoto(data);
}

/** Uploads a photo to `venue-media` and adds it to the gallery (outside / inside). */
export async function uploadVenuePhoto(
  venueId: string,
  fileUri: string,
  kind: VenuePhotoKind,
): Promise<VenuePhoto> {
  const path = await uploadVenueFile(venueId, fileUri, kind);
  try {
    return await addVenuePhoto(venueId, path, kind);
  } catch (error) {
    await supabase.storage.from(MEDIA_BUCKET).remove([path]);
    throw toVenueCabinetError(error);
  }
}

/** Removes a gallery photo and its file. */
export async function removeVenuePhoto(photo: Pick<VenuePhoto, 'id' | 'path'>): Promise<void> {
  const { error } = await supabase.from('venue_photos').delete().eq('id', photo.id);
  if (error) throw toVenueCabinetError(error);
  // The row is gone; a leftover file is harmless, so a failed cleanup is not surfaced.
  await supabase.storage.from(MEDIA_BUCKET).remove([photo.path]);
}
