// Pure request handler with injected dependencies, so it is unit-testable without Supabase.
export type RedeemResult =
  'ok' | 'invalid' | 'unknown' | 'wrong_venue' | 'already_redeemed' | 'expired';

export interface RedeemDeps {
  getUserId: (authorization: string) => Promise<string | null>;
  redeem: (tokenHash: string, hostId: string) => Promise<RedeemResult | null>;
}

// The QR encodes a 32-byte token as 64 lowercase hex characters.
const TOKEN = /^[0-9a-f]{64}$/;

const FAILURES: Record<Exclude<RedeemResult, 'ok'>, { status: number; error: string }> = {
  invalid: { status: 400, error: 'invalid_request' },
  unknown: { status: 404, error: 'unknown_token' },
  wrong_venue: { status: 403, error: 'wrong_venue' },
  already_redeemed: { status: 409, error: 'already_redeemed' },
  expired: { status: 409, error: 'expired' },
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function handleRedeemClaim(req: Request, deps: RedeemDeps): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const authorization = req.headers.get('Authorization');
  if (!authorization) return json(401, { error: 'unauthorized' });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'invalid_request' });
  }
  const token = (body as { token?: unknown } | null)?.token;
  if (typeof token !== 'string' || !TOKEN.test(token.toLowerCase())) {
    return json(400, { error: 'invalid_request' });
  }

  try {
    const hostId = await deps.getUserId(authorization);
    if (!hostId) return json(401, { error: 'unauthorized' });

    const result = await deps.redeem(await sha256Hex(token.toLowerCase()), hostId);
    if (result === 'ok') return json(200, { result: 'ok' });
    if (result === null) return json(500, { error: 'server_error' });
    const failure = FAILURES[result];
    return json(failure.status, { error: failure.error });
  } catch {
    return json(500, { error: 'server_error' });
  }
}
