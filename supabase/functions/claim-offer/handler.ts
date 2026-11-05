// Pure request handler with injected dependencies, so it is unit-testable without Supabase.
export type ClaimResult =
  'ok' | 'invalid' | 'unavailable' | 'rate_limited' | 'sold_out' | 'limit_reached';

export interface ClaimDeps {
  getUserId: (authorization: string) => Promise<string | null>;
  claim: (offerId: string, userId: string, tokenHash: string) => Promise<ClaimResult | null>;
  randomBytes: (length: number) => Uint8Array;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ERRORS: Record<Exclude<ClaimResult, 'ok'>, { status: number; error: string }> = {
  invalid: { status: 400, error: 'invalid_request' },
  unavailable: { status: 409, error: 'offer_unavailable' },
  sold_out: { status: 409, error: 'offer_unavailable' },
  limit_reached: { status: 409, error: 'limit_reached' },
  rate_limited: { status: 429, error: 'rate_limited' },
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return toHex(new Uint8Array(digest));
}

export async function handleClaimOffer(req: Request, deps: ClaimDeps): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const authorization = req.headers.get('Authorization');
  if (!authorization) return json(401, { error: 'unauthorized' });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'invalid_request' });
  }
  const offerId = (body as { offer_id?: unknown } | null)?.offer_id;
  if (typeof offerId !== 'string' || !UUID.test(offerId)) {
    return json(400, { error: 'invalid_request' });
  }

  try {
    const userId = await deps.getUserId(authorization);
    if (!userId) return json(401, { error: 'unauthorized' });

    const token = toHex(deps.randomBytes(32));
    const result = await deps.claim(offerId.toLowerCase(), userId, await sha256Hex(token));
    if (result === 'ok') return json(200, { token });
    if (result === null) return json(500, { error: 'server_error' });
    const failure = ERRORS[result];
    return json(failure.status, { error: failure.error });
  } catch {
    return json(500, { error: 'server_error' });
  }
}
