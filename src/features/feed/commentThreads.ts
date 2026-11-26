import type { FeedComment } from '@/services/feed';

export interface CommentThread {
  comment: FeedComment;
  replies: FeedComment[];
}

/**
 * Groups a flat, oldest-first comment list into top-level comments with their replies.
 * There is one reply level: a reply whose parent is itself a reply joins the parent's thread,
 * and a reply whose parent is hidden or blocked is dropped with it.
 */
export function buildCommentThreads(comments: readonly FeedComment[]): CommentThread[] {
  const byId = new Map(comments.map((comment) => [comment.id, comment]));
  const threads = new Map<string, CommentThread>();
  for (const comment of comments) {
    if (!comment.parentId) threads.set(comment.id, { comment, replies: [] });
  }
  for (const comment of comments) {
    if (!comment.parentId) continue;
    const parent = byId.get(comment.parentId);
    const rootId = parent?.parentId ?? parent?.id;
    if (rootId) threads.get(rootId)?.replies.push(comment);
  }
  return [...threads.values()];
}
