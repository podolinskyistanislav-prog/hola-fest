// Create a feed comment. Pure handler with injected dependencies, unit-testable without Supabase.
import { filterFeedText, type UpcomingEvent } from '../_shared/feed-filter.ts';
import {
  COMMENTS_PER_DAY,
  dayAgo,
  feedError,
  forbidden,
  type FeedUser,
  isUuid,
  json,
  MAX_BODY_LENGTH,
  readJsonObject,
  serverError,
  unauthorized,
  upcomingHorizon,
} from '../_shared/feed-http.ts';

export interface CommentInput {
  postId: string;
  parentId: string | null;
  body: string;
}

export interface FeedCommentDeps {
  getUser: (authorization: string) => Promise<FeedUser | null>;
  isBanned: (userId: string) => Promise<boolean>;
  countCommentsSince: (userId: string, since: Date) => Promise<number>;
  upcomingEventTitles: (from: Date, to: Date) => Promise<UpcomingEvent[]>;
  /** True when the post exists and is not hidden. */
  postIsOpen: (postId: string) => Promise<boolean>;
  /** True when the parent comment belongs to the given post. */
  parentBelongsToPost: (parentId: string, postId: string) => Promise<boolean>;
  insertComment: (userId: string, input: CommentInput) => Promise<string | null>;
  now: () => Date;
}

export async function handleFeedComment(req: Request, deps: FeedCommentDeps): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const authorization = req.headers.get('Authorization');
  if (!authorization) return unauthorized();

  const raw = await readJsonObject(req);
  if (!raw) return feedError('invalid');

  const { post_id: postId, body: text } = raw;
  const parentId = raw.parent_id ?? null;
  if (!isUuid(postId) || (parentId !== null && !isUuid(parentId))) return feedError('invalid');
  if (typeof text !== 'string' || text.trim().length === 0 || text.length > MAX_BODY_LENGTH) {
    return feedError('invalid');
  }

  try {
    const user = await deps.getUser(authorization);
    if (!user) return unauthorized();
    if (user.isAnonymous || (await deps.isBanned(user.id))) return forbidden();

    const now = deps.now();
    if ((await deps.countCommentsSince(user.id, dayAgo(now))) >= COMMENTS_PER_DAY) {
      return feedError('rate_limit');
    }

    const input: CommentInput = {
      postId: postId.toLowerCase(),
      parentId: parentId === null ? null : parentId.toLowerCase(),
      body: text,
    };
    if (!(await deps.postIsOpen(input.postId))) return feedError('invalid');
    if (input.parentId && !(await deps.parentBelongsToPost(input.parentId, input.postId))) {
      return feedError('invalid');
    }

    const rejection = filterFeedText(text, await deps.upcomingEventTitles(now, upcomingHorizon(now)));
    if (rejection) return feedError(rejection);

    const id = await deps.insertComment(user.id, input);
    return id ? json(200, { id }) : serverError();
  } catch {
    return serverError();
  }
}
