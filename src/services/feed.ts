import { env } from '@/lib/env';

import { supabase } from './supabase';

/** Why the server refused a post or comment. Generic: it never echoes the submitted text. */
export type FeedFailureReason =
  | 'promo'
  | 'links'
  | 'abuse'
  | 'rate_limit'
  | 'invalid'
  | 'unauthenticated'
  | 'forbidden'
  | 'not_found'
  | 'network'
  | 'unknown';

export type FeedWriteResult = { ok: true; id: string } | { ok: false; reason: FeedFailureReason };

export interface PostDraft {
  body: string;
  /** Storage paths in the feed-images bucket, each under the author's own folder. */
  imagePaths?: string[];
  /** Publish as this venue (club); the author must be its member. */
  asVenueId?: string;
}

export interface CommentDraft {
  postId: string;
  body: string;
  parentId?: string;
}

const SERVER_REASONS: Record<string, FeedFailureReason> = {
  promo: 'promo',
  links: 'links',
  abuse: 'abuse',
  rate_limit: 'rate_limit',
  invalid: 'invalid',
  unauthorized: 'unauthenticated',
  forbidden: 'forbidden',
  not_found: 'not_found',
};

const STATUS_REASONS: Record<number, FeedFailureReason> = {
  400: 'invalid',
  401: 'unauthenticated',
  403: 'forbidden',
  404: 'not_found',
  429: 'rate_limit',
};

function isNetworkMessage(message: string | undefined): boolean {
  const text = (message ?? '').toLowerCase();
  return text.includes('fetch') || text.includes('network');
}

async function readFailureReason(error: unknown): Promise<FeedFailureReason> {
  const failure = error as { context?: unknown; message?: string } | null;
  if (failure?.context instanceof Response) {
    try {
      const body = (await failure.context.json()) as { error?: unknown };
      if (typeof body.error === 'string' && body.error in SERVER_REASONS) {
        return SERVER_REASONS[body.error] ?? 'unknown';
      }
    } catch {
      // unreadable body: fall back to the status code
    }
    return STATUS_REASONS[failure.context.status] ?? 'unknown';
  }
  return isNetworkMessage(failure?.message) ? 'network' : 'unknown';
}

async function invokeFeedWrite(
  functionName: 'feed-post' | 'feed-comment',
  body: Record<string, unknown>,
): Promise<FeedWriteResult> {
  const { data, error } = await supabase.functions.invoke<{ id?: unknown }>(functionName, { body });
  if (error) return { ok: false, reason: await readFailureReason(error) };
  if (typeof data?.id !== 'string') return { ok: false, reason: 'unknown' };
  return { ok: true, id: data.id };
}

/** Publishes a post through the feed-post Edge Function, which applies the anti-promo filter. */
export function createPost(draft: PostDraft): Promise<FeedWriteResult> {
  return invokeFeedWrite('feed-post', {
    body: draft.body,
    image_paths: draft.imagePaths ?? [],
    as_venue_id: draft.asVenueId ?? null,
  });
}

/** Edits the user's own post; the new text goes through the same filter as a new post. */
export function editPost(postId: string, draft: PostDraft): Promise<FeedWriteResult> {
  return invokeFeedWrite('feed-post', {
    post_id: postId,
    body: draft.body,
    image_paths: draft.imagePaths ?? [],
    as_venue_id: draft.asVenueId ?? null,
  });
}

/** Adds a comment (or a reply when `parentId` is set) through the feed-comment Edge Function. */
export function createComment(draft: CommentDraft): Promise<FeedWriteResult> {
  return invokeFeedWrite('feed-comment', {
    post_id: draft.postId,
    parent_id: draft.parentId ?? null,
    body: draft.body,
  });
}

export type FeedLabel = 'club' | 'dj' | 'hola';

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  handle: string;
  avatarUrl: string | null;
  label: FeedLabel | null;
  body: string;
  imageUrls: string[];
  createdAt: string;
  editedAt: string | null;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  asVenueId: string | null;
}

export interface FeedPage {
  posts: FeedPost[];
  nextCursor: string | null;
}

export interface MyClub {
  id: string;
  name: string;
}

const FEED_COLUMNS =
  'id, author_id, author_name, author_handle, author_avatar_path, label, body, image_paths, created_at, edited_at, like_count, comment_count, liked_by_me, as_venue_id';

interface FeedRow {
  id: string;
  author_id: string;
  author_name: string | null;
  author_handle: string | null;
  author_avatar_path: string | null;
  label: string | null;
  body: string;
  image_paths: string[] | null;
  created_at: string;
  edited_at: string | null;
  like_count: number | null;
  comment_count: number | null;
  liked_by_me: boolean | null;
  as_venue_id: string | null;
}

function publicFeedUrl(path: string): string {
  return supabase.storage.from('feed-images').getPublicUrl(path).data.publicUrl;
}

function toFeedLabel(label: string | null): FeedLabel | null {
  return label === 'club' || label === 'dj' || label === 'hola' ? label : null;
}

function toFeedPost(row: FeedRow): FeedPost | null {
  if (!row.author_name || !row.author_handle) return null;
  return {
    id: row.id,
    authorId: row.author_id,
    authorName: row.author_name,
    handle: row.author_handle,
    avatarUrl: row.author_avatar_path ? publicFeedUrl(row.author_avatar_path) : null,
    label: toFeedLabel(row.label),
    body: row.body,
    imageUrls: (row.image_paths ?? []).map(publicFeedUrl),
    createdAt: row.created_at,
    editedAt: row.edited_at,
    likeCount: row.like_count ?? 0,
    commentCount: row.comment_count ?? 0,
    likedByMe: row.liked_by_me ?? false,
    asVenueId: row.as_venue_id,
  };
}

const CURSOR_SEPARATOR = '|';

function encodeCursor(row: { created_at: string; id: string }): string {
  return `${row.created_at}${CURSOR_SEPARATOR}${row.id}`;
}

function keysetFilter(cursor: string): string | null {
  const at = cursor.indexOf(CURSOR_SEPARATOR);
  if (at < 1) return null;
  const createdAt = cursor.slice(0, at);
  const id = cursor.slice(at + 1);
  if (!/^[0-9TZ:.+\- ]+$/.test(createdAt) || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  return `created_at.lt."${createdAt}",and(created_at.eq."${createdAt}",id.lt.${id})`;
}

/** One page of the feed, newest first, using a keyset cursor on (created_at, id). */
export async function listFeedPage(cursor?: string, limit = 20): Promise<FeedPage> {
  let query = supabase
    .from('feed_posts')
    .select(FEED_COLUMNS)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(limit + 1);
  if (cursor) {
    const filter = keysetFilter(cursor);
    if (!filter) throw new Error('feed_load_failed');
    query = query.or(filter);
  }
  const { data, error } = await query;
  if (error || !data) throw new Error('feed_load_failed');
  const rows = data as FeedRow[];
  const pageRows = rows.slice(0, limit);
  const last = pageRows[pageRows.length - 1];
  return {
    posts: pageRows.flatMap((row) => toFeedPost(row) ?? []),
    nextCursor: rows.length > limit && last ? encodeCursor(last) : null,
  };
}

/** A single post for the post page, or null when it is missing or hidden. */
export async function getFeedPost(id: string): Promise<FeedPost | null> {
  const { data, error } = await supabase
    .from('feed_posts')
    .select(FEED_COLUMNS)
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error('feed_load_failed');
  return data ? toFeedPost(data as FeedRow) : null;
}

/** Likes a post. Liking twice is not an error. */
export async function likePost(postId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('post_likes')
    .upsert(
      { post_id: postId, user_id: userId },
      { onConflict: 'post_id,user_id', ignoreDuplicates: true },
    );
  if (error) throw new Error('post_like_failed');
}

export async function unlikePost(postId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('post_likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);
  if (error) throw new Error('post_unlike_failed');
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Uploads an already resized JPEG into the user's own folder and reports progress 0..1.
 * Uses XHR because fetch and supabase-js storage give no upload progress (see ADR 0012).
 */
export async function uploadPostImage(
  userId: string,
  fileUri: string,
  onProgress?: (fraction: number) => void,
): Promise<string> {
  const path = `${userId}/post-${Date.now()}-${randomSuffix()}.jpg`;
  try {
    const blob = await (await fetch(fileUri)).blob();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) throw new Error('no session');
    await new Promise<void>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('POST', `${env.supabaseUrl}/storage/v1/object/feed-images/${path}`);
      request.setRequestHeader('Authorization', `Bearer ${token}`);
      request.setRequestHeader('apikey', env.supabaseAnonKey);
      request.setRequestHeader('Content-Type', 'image/jpeg');
      request.upload.onprogress = (event) => {
        if (onProgress && event.lengthComputable && event.total > 0) {
          onProgress(Math.min(1, event.loaded / event.total));
        }
      };
      request.onload = () =>
        request.status >= 200 && request.status < 300 ? resolve() : reject(new Error('rejected'));
      request.onerror = () => reject(new Error('network'));
      request.send(blob);
    });
  } catch {
    throw new Error('post_image_upload_failed');
  }
  onProgress?.(1);
  return path;
}

/** Venues the caller is a member of, for publishing "as the club". Empty for non-members. */
export async function listMyClubs(): Promise<MyClub[]> {
  const { data, error } = await supabase.from('venue_members').select('venues(id, name)');
  if (error) throw new Error('my_clubs_load_failed');
  const rows = (data ?? []) as unknown as { venues: MyClub | null }[];
  return rows.flatMap((row) => (row.venues ? [{ id: row.venues.id, name: row.venues.name }] : []));
}
