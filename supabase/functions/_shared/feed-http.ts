// Small helpers shared by the feed Edge Functions.
export type FeedError = 'promo' | 'links' | 'abuse' | 'rate_limit' | 'invalid';

export interface FeedUser {
  id: string;
  isAnonymous: boolean;
}

export const POSTS_PER_DAY = 10;
export const COMMENTS_PER_DAY = 100;
export const MAX_BODY_LENGTH = 500;
export const MAX_IMAGES = 4;
export const UPCOMING_WINDOW_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isUuid = (value: unknown): value is string =>
  typeof value === 'string' && UUID.test(value);

export const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

/** Generic rejection: only the reason, never the submitted text. */
export const feedError = (error: FeedError) => json(error === 'rate_limit' ? 429 : 400, { error });

export const unauthorized = () => json(401, { error: 'unauthorized' });
export const forbidden = () => json(403, { error: 'forbidden' });
export const serverError = () => json(500, { error: 'server_error' });

export async function readJsonObject(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await req.json();
    return body !== null && typeof body === 'object' && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/** Start of the rolling 24-hour window used by the daily limits. */
export const dayAgo = (now: Date) => new Date(now.getTime() - DAY_MS);

/** End of the window in which an upcoming event title counts as promo. */
export const upcomingHorizon = (now: Date) =>
  new Date(now.getTime() + UPCOMING_WINDOW_DAYS * DAY_MS);
