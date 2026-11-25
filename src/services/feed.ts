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
