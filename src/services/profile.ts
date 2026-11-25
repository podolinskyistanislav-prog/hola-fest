import { supabase } from './supabase';

export interface MyProfile {
  displayName: string | null;
  handle: string | null;
  avatarPath: string | null;
}

export interface ProfileDraft {
  displayName: string;
  handle: string;
  avatarPath: string | null;
}

export interface MyPost {
  id: string;
  body: string;
  imagePaths: string[];
  createdAt: string;
}

/** True when the handle is well-formed and not used by another profile. */
export async function checkHandleAvailable(handle: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('handle_available', { p_handle: handle });
  if (error) throw new Error('handle_check_failed');
  return data === true;
}

/** Public URL of a file in the feed-images bucket. */
export function feedImageUrl(path: string): string {
  return supabase.storage.from('feed-images').getPublicUrl(path).data.publicUrl;
}

export async function getMyProfile(userId: string): Promise<MyProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('display_name, handle, avatar_path')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw new Error('profile_load_failed');
  if (!data) return null;
  return { displayName: data.display_name, handle: data.handle, avatarPath: data.avatar_path };
}

/** Saves name, @handle and avatar. Throws `handle_taken` when the handle was just claimed. */
export async function saveMyProfile(userId: string, draft: ProfileDraft): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: draft.displayName,
      handle: draft.handle,
      avatar_path: draft.avatarPath,
    })
    .eq('id', userId);
  if (error) throw new Error(error.code === '23505' ? 'handle_taken' : 'profile_save_failed');
}

/** Uploads an already resized JPEG from the device into the user's own folder. */
export async function uploadAvatar(userId: string, fileUri: string): Promise<string> {
  const path = `${userId}/avatar-${Date.now()}.jpg`;
  let blob: Blob;
  try {
    blob = await (await fetch(fileUri)).blob();
  } catch {
    throw new Error('avatar_upload_failed');
  }
  const { error } = await supabase.storage
    .from('feed-images')
    .upload(path, blob, { contentType: 'image/jpeg' });
  if (error) throw new Error('avatar_upload_failed');
  return path;
}

/** The user's own visible posts, newest first. */
export async function listMyPosts(userId: string): Promise<MyPost[]> {
  const { data, error } = await supabase
    .from('feed_posts')
    .select('id, body, image_paths, created_at')
    .eq('author_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw new Error('posts_load_failed');
  return (data ?? []).flatMap((row) =>
    row.id && row.body !== null && row.created_at
      ? [
          {
            id: row.id,
            body: row.body,
            imagePaths: row.image_paths ?? [],
            createdAt: row.created_at,
          },
        ]
      : [],
  );
}
