import { assert, assertEquals } from 'jsr:@std/assert@1';
import { filterFeedText } from './feed-filter.ts';

// The demo feed in supabase/demo/demo_data.sql must obey docs/FEED_RULES.md: every demo post and
// comment has to pass the same server filter real users go through.
const demoSql = await Deno.readTextFile(new URL('../../demo/demo_data.sql', import.meta.url));
const feedSection = demoSql.slice(demoSql.indexOf('-- 8. Feed'));
const demoTexts = [...feedSection.matchAll(/'((?:[^']|'')+)'/g)]
  .map((match) => match[1])
  .filter((text) => /[А-Яа-яІіЇїЄє]/.test(text) && text.length > 25);

Deno.test('demo feed has about 20 posts plus comments to check', () => {
  assert(demoTexts.length >= 28, `found only ${demoTexts.length} demo texts`);
});

for (const text of demoTexts) {
  Deno.test('demo feed text passes the filter: ' + text, () =>
    assertEquals(filterFeedText(text), null),
  );
}
