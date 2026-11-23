import { assertEquals } from 'jsr:@std/assert@1';
import { corsHeaders, isAllowedOrigin, withCors } from './cors.ts';

const ok = () => Promise.resolve(new Response('{"ok":true}', { status: 200 }));

Deno.test('allows the production web app and EAS previews', () => {
  assertEquals(isAllowedOrigin('https://hola-fest.expo.app'), true);
  assertEquals(isAllowedOrigin('https://hola-fest--abc123.expo.app'), true);
  assertEquals(isAllowedOrigin('http://localhost:8081'), true);
});

Deno.test('rejects other origins and lookalikes', () => {
  assertEquals(isAllowedOrigin('https://evil.example'), false);
  assertEquals(isAllowedOrigin('https://hola-fest.expo.app.evil.example'), false);
  assertEquals(isAllowedOrigin('https://other--abc.expo.app'), false);
  assertEquals(isAllowedOrigin(null), false);
  assertEquals(corsHeaders('https://evil.example')['Access-Control-Allow-Origin'], undefined);
});

Deno.test(
  'answers the preflight with 204 and CORS headers, without calling the handler',
  async () => {
    let called = false;
    const handler = withCors(() => {
      called = true;
      return ok();
    });
    const res = await handler(
      new Request('https://x/functions/v1/claim-offer', {
        method: 'OPTIONS',
        headers: { Origin: 'https://hola-fest.expo.app' },
      }),
    );
    assertEquals(res.status, 204);
    assertEquals(res.headers.get('Access-Control-Allow-Origin'), 'https://hola-fest.expo.app');
    assertEquals(res.headers.get('Access-Control-Allow-Headers')?.includes('authorization'), true);
    assertEquals(called, false);
  },
);

Deno.test('adds CORS headers to the real response and keeps status and body', async () => {
  const res = await withCors(ok)(
    new Request('https://x/functions/v1/claim-offer', {
      method: 'POST',
      headers: { Origin: 'https://hola-fest.expo.app' },
    }),
  );
  assertEquals(res.status, 200);
  assertEquals(await res.json(), { ok: true });
  assertEquals(res.headers.get('Access-Control-Allow-Origin'), 'https://hola-fest.expo.app');
});

Deno.test('native requests without Origin pass through unchanged', async () => {
  const res = await withCors(ok)(new Request('https://x', { method: 'POST' }));
  assertEquals(res.status, 200);
  assertEquals(res.headers.get('Access-Control-Allow-Origin'), null);
});
