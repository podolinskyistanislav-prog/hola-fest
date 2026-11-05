import { assertEquals } from 'jsr:@std/assert@1';
import { handleClaimOffer, type ClaimDeps } from './handler.ts';

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

Deno.test('forged or expired JWT is rejected before any claim is attempted', async () => {
  let claimed = false;
  const res = await handleClaimOffer(
    post({ offer_id: OFFER }, 'Bearer forged.jwt.value'),
    deps({
      getUserId: () => Promise.resolve(null),
      claim: () => {
        claimed = true;
        return Promise.resolve('ok');
      },
    }),
  );
  assertEquals(res.status, 401);
  assertEquals(claimed, false);
});

Deno.test('a failing JWT check gives a generic 500, never the internal error', async () => {
  const res = await handleClaimOffer(
    post({ offer_id: OFFER }, 'Bearer super-secret-jwt'),
    deps({ getUserId: () => Promise.reject(new Error('auth backend down at 10.0.0.5')) }),
  );
  const text = await res.text();
  assertEquals(res.status, 500);
  assertEquals(text, '{"error":"server_error"}');
});

Deno.test('the claiming user comes from the JWT, never from the request body', async () => {
  let claimedFor = '';
  await handleClaimOffer(
    post({ offer_id: OFFER, user_id: 'victim', userId: 'victim' }),
    deps({
      claim: (_offer, userId) => {
        claimedFor = userId;
        return Promise.resolve('ok');
      },
    }),
  );
  assertEquals(claimedFor, 'user-1');
});

Deno.test('error bodies never echo the token, the auth header or internals', async () => {
  const res = await handleClaimOffer(
    post({ offer_id: OFFER }, 'Bearer super-secret-jwt'),
    deps({ claim: () => Promise.reject(new Error('relation "claims" violates constraint xyz')) }),
  );
  const text = await res.text();
  assertEquals(res.status, 500);
  assertEquals(text, '{"error":"server_error"}');
  assertEquals(text.includes('super-secret'), false);
  assertEquals(text.includes('claims'), false);
});

Deno.test('responses are never cached and non-POST is refused', async () => {
  const ok = await handleClaimOffer(post({ offer_id: OFFER }), deps());
  assertEquals(ok.headers.get('Cache-Control'), 'no-store');
  const get = await handleClaimOffer(new Request('http://x/claim-offer'), deps());
  assertEquals(get.status, 405);
});

Deno.test('malformed JSON and non-object bodies give 400', async () => {
  const bad = new Request('http://x/claim-offer', {
    method: 'POST',
    headers: { Authorization: 'Bearer t' },
    body: 'not json',
  });
  assertEquals((await handleClaimOffer(bad, deps())).status, 400);
  assertEquals((await handleClaimOffer(post(null), deps())).status, 400);
  assertEquals((await handleClaimOffer(post({ offer_id: 42 }), deps())).status, 400);
});
