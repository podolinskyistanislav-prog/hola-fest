import { assertEquals } from 'jsr:@std/assert@1';
import { type FeedCommentDeps, handleFeedComment } from './handler.ts';

const USER = '11111111-1111-4111-8111-111111111111';
const POST = '22222222-2222-4222-8222-222222222222';
const PARENT = '44444444-4444-4444-8444-444444444444';
const COMMENT = '55555555-5555-4555-8555-555555555555';

function makeDeps(overrides: Partial<FeedCommentDeps> = {}): FeedCommentDeps & { inserted: unknown[] } {
  const inserted: unknown[] = [];
  return {
    inserted,
    getUser: () => Promise.resolve({ id: USER, isAnonymous: false }),
    isBanned: () => Promise.resolve(false),
    countCommentsSince: () => Promise.resolve(0),
    upcomingEventTitles: () => Promise.resolve([]),
    postIsOpen: () => Promise.resolve(true),
    parentBelongsToPost: () => Promise.resolve(true),
    insertComment: (_user, input) => {
      inserted.push(input);
      return Promise.resolve(COMMENT);
    },
    now: () => new Date('2026-11-25T12:00:00Z'),
    ...overrides,
  };
}

const call = (body: unknown, deps: FeedCommentDeps) =>
  handleFeedComment(
    new Request('https://x/functions/v1/feed-comment', {
      method: 'POST',
      headers: { Authorization: 'Bearer t' },
      body: JSON.stringify(body),
    }),
    deps,
  );

Deno.test('creates a comment', async () => {
  const deps = makeDeps();
  const res = await call({ post_id: POST, body: 'Згоден, було вогонь' }, deps);
  assertEquals(res.status, 200);
  assertEquals(await res.json(), { id: COMMENT });
  assertEquals(deps.inserted.length, 1);
});

Deno.test('creates a reply to a comment of the same post', async () => {
  const deps = makeDeps();
  assertEquals((await call({ post_id: POST, parent_id: PARENT, body: 'Так!' }, deps)).status, 200);
  const stranger = makeDeps({ parentBelongsToPost: () => Promise.resolve(false) });
  const res = await call({ post_id: POST, parent_id: PARENT, body: 'Так!' }, stranger);
  assertEquals(await res.json(), { error: 'invalid' });
});

Deno.test('rejects promo, links and abuse generically', async () => {
  const promo = await call({ post_id: POST, body: '−20% з промокодом HOLA' }, makeDeps());
  assertEquals(promo.status, 400);
  assertEquals(await promo.json(), { error: 'promo' });
  const links = await call({ post_id: POST, body: 'www.club.ua' }, makeDeps());
  assertEquals(await links.json(), { error: 'links' });
  const abuse = await call({ post_id: POST, body: 'ти мудак' }, makeDeps());
  assertEquals(await abuse.json(), { error: 'abuse' });
});

Deno.test('enforces 100 comments per day', async () => {
  const deps = makeDeps({ countCommentsSince: () => Promise.resolve(100) });
  const res = await call({ post_id: POST, body: 'Круто' }, deps);
  assertEquals(res.status, 429);
  assertEquals(await res.json(), { error: 'rate_limit' });
  const ok = makeDeps({ countCommentsSince: () => Promise.resolve(99) });
  assertEquals((await call({ post_id: POST, body: 'Круто' }, ok)).status, 200);
});

Deno.test('rejects a missing or hidden post', async () => {
  const deps = makeDeps({ postIsOpen: () => Promise.resolve(false) });
  assertEquals(await (await call({ post_id: POST, body: 'Круто' }, deps)).json(), {
    error: 'invalid',
  });
});

Deno.test('guests and banned users cannot comment', async () => {
  const guest = makeDeps({ getUser: () => Promise.resolve({ id: USER, isAnonymous: true }) });
  assertEquals((await call({ post_id: POST, body: 'Круто' }, guest)).status, 403);
  const banned = makeDeps({ isBanned: () => Promise.resolve(true) });
  assertEquals((await call({ post_id: POST, body: 'Круто' }, banned)).status, 403);
});

Deno.test('requires a valid session', async () => {
  const noHeader = await handleFeedComment(
    new Request('https://x', { method: 'POST', body: '{}' }),
    makeDeps(),
  );
  assertEquals(noHeader.status, 401);
  const badToken = makeDeps({ getUser: () => Promise.resolve(null) });
  assertEquals((await call({ post_id: POST, body: 'Круто' }, badToken)).status, 401);
});

Deno.test('rejects invalid input', async () => {
  const cases: unknown[] = [
    {},
    { post_id: 'nope', body: 'ок' },
    { post_id: POST },
    { post_id: POST, body: '  ' },
    { post_id: POST, body: 'a'.repeat(501) },
    { post_id: POST, parent_id: 'nope', body: 'ок' },
  ];
  for (const body of cases) {
    const res = await call(body, makeDeps());
    assertEquals(res.status, 400, JSON.stringify(body));
    assertEquals(await res.json(), { error: 'invalid' });
  }
});

Deno.test('rejects other methods and hides internal failures', async () => {
  assertEquals(
    (await handleFeedComment(new Request('https://x', { method: 'GET' }), makeDeps())).status,
    405,
  );
  const boom = makeDeps({ insertComment: () => Promise.reject(new Error('secret')) });
  const res = await call({ post_id: POST, body: 'Круто' }, boom);
  assertEquals(res.status, 500);
  assertEquals(await res.json(), { error: 'server_error' });
});
