import { assertEquals, assertNotEquals } from 'jsr:@std/assert@1';
import { handleClaimOffer, sha256Hex, type ClaimDeps } from './handler.ts';

const OFFER = '00000000-0000-4000-8000-000000000001';
const post = (body: unknown, auth: string | null = 'Bearer t') =>
  new Request('http://x/claim-offer', {
    method: 'POST',
    headers: auth ? { Authorization: auth } : {},
    body: JSON.stringify(body),
  });

const deps = (over: Partial<ClaimDeps> = {}): ClaimDeps => ({
  getUserId: () => Promise.resolve('user-1'),
  claim: () => Promise.resolve('ok'),
  randomBytes: (n) => new Uint8Array(n).fill(171),
  ...over,
});

Deno.test('happy path returns the raw token and stores only its hash', async () => {
  let stored = '';
  const res = await handleClaimOffer(
    post({ offer_id: OFFER }),
    deps({
      claim: (_o, _u, hash) => {
        stored = hash;
        return Promise.resolve('ok');
      },
    }),
  );
  const { token } = await res.json();
  assertEquals(res.status, 200);
  assertEquals(token.length, 64);
  assertEquals(stored, await sha256Hex(token));
  assertNotEquals(stored, token);
});

Deno.test('unauthenticated requests are rejected', async () => {
  assertEquals((await handleClaimOffer(post({ offer_id: OFFER }, null), deps())).status, 401);
  const res = await handleClaimOffer(
    post({ offer_id: OFFER }),
    deps({ getUserId: () => Promise.resolve(null) }),
  );
  assertEquals(res.status, 401);
});

Deno.test('invalid input is rejected', async () => {
  assertEquals((await handleClaimOffer(post({ offer_id: 'nope' }), deps())).status, 400);
  assertEquals((await handleClaimOffer(post({}), deps())).status, 400);
});

Deno.test('over-limit and unavailable offers give generic errors without a token', async () => {
  const cases = [
    ['limit_reached', 409],
    ['sold_out', 409],
    ['unavailable', 409],
    ['rate_limited', 429],
  ] as const;
  for (const [result, status] of cases) {
    const res = await handleClaimOffer(
      post({ offer_id: OFFER }),
      deps({ claim: () => Promise.resolve(result) }),
    );
    assertEquals(res.status, status);
    assertEquals('token' in (await res.json()), false);
  }
});

Deno.test('database failure returns a generic 500', async () => {
  const res = await handleClaimOffer(
    post({ offer_id: OFFER }),
    deps({ claim: () => Promise.resolve(null) }),
  );
  assertEquals(res.status, 500);
  assertEquals(await res.json(), { error: 'server_error' });
});
