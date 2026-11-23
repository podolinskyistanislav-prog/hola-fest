// CORS for the Edge Functions called from the web app. Native apps send no Origin and are unaffected.
// Only known origins get Access-Control-Allow-Origin; anything else is answered without it, so the
// browser blocks the response. Auth is still checked inside each handler.

const ALLOWED_ORIGINS = new Set([
  'https://hola-fest.expo.app',
  'http://localhost:8081',
  'http://localhost:19006',
]);
// EAS Hosting preview deployments: https://hola-fest--<id>.expo.app
const PREVIEW_ORIGIN = /^https:\/\/hola-fest--[a-z0-9-]+\.expo\.app$/;

export function isAllowedOrigin(origin: string | null): origin is string {
  return origin !== null && (ALLOWED_ORIGINS.has(origin) || PREVIEW_ORIGIN.test(origin));
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = { Vary: 'Origin' };
  if (isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'authorization, x-client-info, apikey, content-type';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

/** Answers the browser preflight and adds CORS headers to every response of `handler`. */
export function withCors(handler: (req: Request) => Promise<Response>) {
  return async (req: Request): Promise<Response> => {
    const cors = corsHeaders(req.headers.get('Origin'));
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const res = await handler(req);
    const headers = new Headers(res.headers);
    for (const [key, value] of Object.entries(cors)) headers.set(key, value);
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  };
}
