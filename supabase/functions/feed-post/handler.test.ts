import { assertEquals } from 'jsr:@std/assert@1';
import { type FeedPostDeps, handleFeedPost } from './handler.ts';

const USER = '11111111-1111-4111-8111-111111111111';
const POST = '22222222-2222-4222-8222-222222222222';
const VENUE = '33333333-3333-4333-8333-333333333333';

function makeDeps(overrides: Partial<FeedPostDeps> = {}): FeedPostDeps & { inserted: unknown[] } {
  const inserted: unknown[] = [];
  return {
    inserted,
    getUser: () => Promise.resolve({ id: USER, isAnonymous: false }),
    isBanned: () => Promise.resolve(false),
    countPostsSince: () => Promise.resolve(0),
    upcomingEventTitles: () => Promise.resolve([]),
    isVenueMember: () => Promise.resolve(false),
    insertPost: (_user, input) => {
      inserted.push(input);
      return Promise.resolve(POST);
    },
    updateOwnPost: () => Promise.resolve(true),
    now: () => new Date('2026-11-25T12:00:00Z'),
    ...overrides,
  };
}

const call = (body: unknown, deps: FeedPostDeps, headers: Record<string, string> = {}) =>
  handleFeedPost(
    new Request('https://x/functions/v1/feed-post', {
      method: 'POST',
      headers: { Authorization: 'Bearer t', ...headers },
      body: JSON.stringify(body),
    }),
    deps,
  );

Deno.test('creates a post for a confirmed user', async () => {
  const deps = makeDeps();
  const res = await call({ body: 'Вчора був космос у Котельні 🔥' }, deps);
  assertEquals(res.status, 200);
  assertEquals(await res.json(), { id: POST });
  assertEquals(deps.inserted.length, 1);
});

Deno.test('rejects promo without echoing the text', async () => {
  const deps = makeDeps();
  const res = await call({ body: 'Приходьте сьогодні о 22:00, вхід 200 грн' }, deps);
  assertEquals(res.status, 400);
  const text = await res.text();
  assertEquals(JSON.parse(text), { error: 'promo' });
  assertEquals(deps.inserted.length, 0);
});

Deno.test('rejects links and abuse with their reasons', async () => {
  assertEquals(await (await call({ body: 'https://x.com' }, makeDeps())).json(), { error: 'links' });
  assertEquals(await (await call({ body: 'ти мудак' }, makeDeps())).json(), { error: 'abuse' });
});

Deno.test('rejects the title of an upcoming event', async () => {
  const deps = makeDeps({ upcomingEventTitles: () => Promise.resolve([{ title: 'Hola Opening' }]) });
  const res = await call({ body: 'Усі йдемо на hola opening!' }, deps);
  assertEquals(await res.json(), { error: 'promo' });
});

Deno.test('enforces 10 posts per day on create but not on edit', async () => {
  const deps = makeDeps({ countPostsSince: () => Promise.resolve(10) });
  const created = await call({ body: 'Класний вечір' }, deps);
  assertEquals(created.status, 429);
  assertEquals(await created.json(), { error: 'rate_limit' });

  const edited = await call({ post_id: POST, body: 'Класний вечір, дякую' }, deps);
  assertEquals(edited.status, 200);
});

Deno.test('edits only the own post and filters the edit too', async () => {
  const missing = makeDeps({ updateOwnPost: () => Promise.resolve(false) });
  assertEquals((await call({ post_id: POST, body: 'Окей' }, missing)).status, 404);

  const promo = await call({ post_id: POST, body: 'вхід 100 грн' }, makeDeps());
  assertEquals(await promo.json(), { error: 'promo' });
});

Deno.test('guests and banned users cannot post', async () => {
  const guest = makeDeps({ getUser: () => Promise.resolve({ id: USER, isAnonymous: true }) });
  assertEquals((await call({ body: 'Привіт' }, guest)).status, 403);
  const banned = makeDeps({ isBanned: () => Promise.resolve(true) });
  assertEquals((await call({ body: 'Привіт' }, banned)).status, 403);
});

Deno.test('requires a valid session', async () => {
  const noHeader = await handleFeedPost(
    new Request('https://x', { method: 'POST', body: '{}' }),
    makeDeps(),
  );
  assertEquals(noHeader.status, 401);
  const badToken = makeDeps({ getUser: () => Promise.resolve(null) });
  assertEquals((await call({ body: 'Привіт' }, badToken)).status, 401);
});

Deno.test('posting as a venue needs membership', async () => {
  assertEquals((await call({ body: 'Новий звук', as_venue_id: VENUE }, makeDeps())).status, 403);
  const member = makeDeps({ isVenueMember: () => Promise.resolve(true) });
  assertEquals((await call({ body: 'Новий звук', as_venue_id: VENUE }, member)).status, 200);
});

Deno.test('rejects invalid input', async () => {
  const cases: unknown[] = [
    {},
    { body: '   ' },
    { body: 'a'.repeat(501) },
    { body: 'ок', post_id: 'nope' },
    { body: 'ок', as_venue_id: 'nope' },
    { body: 'ок', image_paths: 'x' },
    { body: 'ок', image_paths: ['someone-else/a.jpg'] },
    { body: 'ок', image_paths: [USER + '/../a.jpg'] },
    { body: 'ок', image_paths: Array.from({ length: 5 }, (_, i) => USER + '/' + i + '.jpg') },
  ];
  for (const body of cases) {
    const res = await call(body, makeDeps());
    assertEquals(res.status, 400, JSON.stringify(body));
    assertEquals(await res.json(), { error: 'invalid' });
  }
  const notJson = await handleFeedPost(
    new Request('https://x', { method: 'POST', headers: { Authorization: 'Bearer t' }, body: 'x' }),
    makeDeps(),
  );
  assertEquals(notJson.status, 400);
});

Deno.test('allows an image-only post under the own folder', async () => {
  const res = await call({ image_paths: [USER + '/a.jpg'] }, makeDeps());
  assertEquals(res.status, 200);
});

Deno.test('rejects other methods and hides internal failures', async () => {
  const get = await handleFeedPost(new Request('https://x', { method: 'GET' }), makeDeps());
  assertEquals(get.status, 405);
  const boom = makeDeps({
    countPostsSince: () => Promise.reject(new Error('db password leaked')),
  });
  const res = await call({ body: 'Привіт' }, boom);
  assertEquals(res.status, 500);
  assertEquals(await res.json(), { error: 'server_error' });
});
