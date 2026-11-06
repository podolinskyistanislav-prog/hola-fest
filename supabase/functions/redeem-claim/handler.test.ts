import { assertEquals } from 'jsr:@std/assert@1';
import { handleRedeemClaim, sha256Hex, type RedeemDeps } from './handler.ts';

const TOKEN = 'ab'.repeat(32);
const post = (body: unknown, auth: string | null = 'Bearer t') =>
  new Request('http://x/redeem-claim', {
    method: 'POST',
    headers: auth ? { Authorization: auth } : {},
    body: JSON.stringify(body),
  });

const deps = (over: Partial<RedeemDeps> = {}): RedeemDeps => ({
  getUserId: () => Promise.resolve('host-1'),
  redeem: () => Promise.resolve('ok'),
  ...over,
});

Deno.test('ok: passes only the token hash and the host id to the database', async () => {
  let seen: [string, string] = ['', ''];
  const res = await handleRedeemClaim(
    post({ token: TOKEN }),
    deps({
      redeem: (hash, host) => {
        seen = [hash, host];
        return Promise.resolve('ok');
      },
    }),
  );
  assertEquals(res.status, 200);
  assertEquals(await res.json(), { result: 'ok' });
  assertEquals(seen, [await sha256Hex(TOKEN), 'host-1']);
});

Deno.test('each failure result maps to a distinct generic error', async () => {
  const cases = [
    ['already_redeemed', 409, 'already_redeemed'],
    ['wrong_venue', 403, 'wrong_venue'],
    ['expired', 409, 'expired'],
    ['unknown', 404, 'unknown_token'],
  ] as const;
  for (const [result, status, error] of cases) {
    const res = await handleRedeemClaim(
      post({ token: TOKEN }),
      deps({ redeem: () => Promise.resolve(result) }),
    );
    assertEquals(res.status, status);
    assertEquals(await res.json(), { error });
  }
});

Deno.test('unauthenticated requests are rejected', async () => {
  assertEquals((await handleRedeemClaim(post({ token: TOKEN }, null), deps())).status, 401);
  const res = await handleRedeemClaim(
    post({ token: TOKEN }),
    deps({ getUserId: () => Promise.resolve(null) }),
  );
  assertEquals(res.status, 401);
});

Deno.test('invalid input is rejected before touching the database', async () => {
  const failing = deps({ redeem: () => Promise.reject(new Error('must not be called')) });
  for (const body of [{}, { token: 5 }, { token: 'short' }, { token: 'z'.repeat(64) }, null]) {
    assertEquals((await handleRedeemClaim(post(body), failing)).status, 400);
  }
  const get = new Request('http://x/redeem-claim', { method: 'GET' });
  assertEquals((await handleRedeemClaim(get, failing)).status, 405);
});

Deno.test('database failure returns a generic 500 that does not echo the token', async () => {
  for (const redeem of [() => Promise.resolve(null), () => Promise.reject(new Error(TOKEN))]) {
    const res = await handleRedeemClaim(post({ token: TOKEN }), deps({ redeem }));
    assertEquals(res.status, 500);
    assertEquals(await res.json(), { error: 'server_error' });
  }
});
