// Create or edit a feed post. Pure handler with injected dependencies, unit-testable without Supabase.
import { filterFeedText, type UpcomingEvent } from '../_shared/feed-filter.ts';
import {
  dayAgo,
  feedError,
  forbidden,
  type FeedUser,
  isUuid,
  json,
  MAX_BODY_LENGTH,
  MAX_IMAGES,
  POSTS_PER_DAY,
  readJsonObject,
  serverError,
  unauthorized,
  upcomingHorizon,
} from '../_shared/feed-http.ts';

export interface PostInput {
  body: string;
  imagePaths: string[];
  asVenueId: string | null;
}

export interface FeedPostDeps {
  /** The signed-in user, or null for a missing or invalid token. */
  getUser: (authorization: string) => Promise<FeedUser | null>;
  isBanned: (userId: string) => Promise<boolean>;
  countPostsSince: (userId: string, since: Date) => Promise<number>;
  upcomingEventTitles: (from: Date, to: Date) => Promise<UpcomingEvent[]>;
  isVenueMember: (userId: string, venueId: string) => Promise<boolean>;
  insertPost: (userId: string, input: PostInput) => Promise<string | null>;
  /** Updates the post only if it is the user's own and not hidden. Returns false when nothing changed. */
  updateOwnPost: (userId: string, postId: string, input: PostInput) => Promise<boolean>;
  now: () => Date;
}

function parseInput(body: Record<string, unknown>, userId: string): PostInput | null {
  const text = typeof body.body === 'string' ? body.body : '';
  const rawImages = body.image_paths ?? [];
  if (!Array.isArray(rawImages) || rawImages.length > MAX_IMAGES) return null;

  const imagePaths: string[] = [];
  for (const path of rawImages) {
    // Images live under the author's own folder of the feed-images bucket.
    if (typeof path !== 'string' || path.length > 200 || path.includes('..')) return null;
    if (!path.startsWith(userId + '/')) return null;
    imagePaths.push(path);
  }
  if (text.length > MAX_BODY_LENGTH) return null;
  if (text.trim().length === 0 && imagePaths.length === 0) return null;

  const asVenue = body.as_venue_id ?? null;
  if (asVenue !== null && !isUuid(asVenue)) return null;
  return { body: text, imagePaths, asVenueId: asVenue === null ? null : asVenue.toLowerCase() };
}

export async function handleFeedPost(req: Request, deps: FeedPostDeps): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const authorization = req.headers.get('Authorization');
  if (!authorization) return unauthorized();

  const raw = await readJsonObject(req);
  if (!raw) return feedError('invalid');

  const postId = raw.post_id ?? null;
  if (postId !== null && !isUuid(postId)) return feedError('invalid');

  try {
    const user = await deps.getUser(authorization);
    if (!user) return unauthorized();
    // Guests (anonymous sessions) and banned users cannot post.
    if (user.isAnonymous || (await deps.isBanned(user.id))) return forbidden();

    const input = parseInput(raw, user.id);
    if (!input) return feedError('invalid');
    if (input.asVenueId && !(await deps.isVenueMember(user.id, input.asVenueId))) {
      return forbidden();
    }

    const now = deps.now();
    if (postId === null && (await deps.countPostsSince(user.id, dayAgo(now))) >= POSTS_PER_DAY) {
      return feedError('rate_limit');
    }

    const upcoming = await deps.upcomingEventTitles(now, upcomingHorizon(now));
    const rejection = filterFeedText(input.body, upcoming);
    if (rejection) return feedError(rejection);

    if (postId === null) {
      const id = await deps.insertPost(user.id, input);
      return id ? json(200, { id }) : serverError();
    }
    const updated = await deps.updateOwnPost(user.id, postId.toLowerCase(), input);
    return updated ? json(200, { id: postId.toLowerCase() }) : json(404, { error: 'not_found' });
  } catch {
    return serverError();
  }
}
