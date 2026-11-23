-- Demo content for previews: fictional venues plus events and offers for the next 14 days.
--
-- Run in Supabase → SQL Editor (production) whenever the demo needs fresh dates.
-- Safe to re-run: every demo row has an id starting with 'dddddddd', and the script
-- deletes those rows first. Real data (other ids) is never touched, except that the two
-- real venues are published and get demo events too (also 'dddddddd' ids).
--
-- Not a migration: it is not applied by CI and does not run in tests.

begin;

-- 1. Remove the previous demo run (offers and claims go with their events).
delete from public.events where id::text like 'dddddddd-%';
delete from public.venues where id::text like 'dddddddd-%';

-- 2. Real venues stay as they are, just published.
update public.venues set is_published = true
where id in ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000002');

-- 3. Fictional venues (names and venues are made up; streets are real Kyiv streets).
insert into public.venues (id, slug, name, address, lat, lng, description, has_shelter, is_published) values
  ('dddddddd-0000-4000-8000-000000000003', 'demo-kotelnia', 'Котельня', 'вул. Нижній Вал, 37', 50.46552, 30.51302,
   'Демо-заклад: техно в старій котельні на Подолі.', true, true),
  ('dddddddd-0000-4000-8000-000000000004', 'demo-dakh-9', 'Дах 9', 'вул. Велика Васильківська, 5', 50.44010, 30.52050,
   'Демо-заклад: руфтоп із заходами сонця.', false, true),
  ('dddddddd-0000-4000-8000-000000000005', 'demo-luna-bar', 'Луна Бар', 'вул. Рейтарська, 21', 50.45210, 30.51110,
   'Демо-заклад: хаус і диско в підвалі.', true, true),
  ('dddddddd-0000-4000-8000-000000000006', 'demo-sklad-17', 'Склад 17', 'вул. Кирилівська, 104', 50.48010, 30.49020,
   'Демо-заклад: великі рейви на складі.', true, true);

-- 4. Events: every venue tonight, then ~60% of the next 13 days.
with v (venue_id, genres) as (
  values
    ('00000000-0000-4000-8000-000000000001'::uuid, array['techno', 'house']),
    ('00000000-0000-4000-8000-000000000002'::uuid, array['rooftop', 'house']),
    ('dddddddd-0000-4000-8000-000000000003'::uuid, array['techno']),
    ('dddddddd-0000-4000-8000-000000000004'::uuid, array['rooftop']),
    ('dddddddd-0000-4000-8000-000000000005'::uuid, array['house']),
    ('dddddddd-0000-4000-8000-000000000006'::uuid, array['techno', 'house'])
),
slots as (
  select v.venue_id, v.genres, d, md5(v.venue_id::text || '-' || d) as h
  from v cross join generate_series(0, 13) as d
),
picked as (
  select *,
    (date_trunc('day', now() at time zone 'Europe/Kyiv')
      + d * interval '1 day'
      + make_interval(hours => 18 + floor(random() * 4)::int, mins => (array[0, 0, 30])[1 + floor(random() * 3)::int])
    ) at time zone 'Europe/Kyiv' as starts_at
  from slots
  where d = 0 or ('x' || substr(h, 1, 4))::bit(16)::int % 10 < 6
),
new_events as (
  insert into public.events (id, venue_id, title, description, lineup, starts_at, ends_at, price_from_uah, status, tags)
  select
    ('dddddddd-' || substr(h, 9, 4) || '-4' || substr(h, 14, 3) || '-8' || substr(h, 18, 3) || '-' || substr(h, 21, 12))::uuid,
    venue_id,
    (array['Techno Night', 'House Friday', 'Rooftop Sunset', 'Deep Session', 'Warehouse Rave',
           'Disco Fever', 'Afterwork Vibes', 'Vinyl Only', 'Late Night Groove', 'Open Air Warm-up'])[1 + floor(random() * 10)::int],
    'Демо-подія, щоб побачити, як виглядає застосунок. Тут буде опис від клубу.',
    (select coalesce(array_agg(a), '{}') from (
       select a from unnest(array['DJ Kora', 'Nova Waves', 'Marta Lux', 'Kyiv Pulse', 'Lemko',
                                  'Dnipro Drift', 'Selecta Yana', 'Tolik Bass', 'Ostap b2b Ira', 'Mira Sound']) as a
       where length(h) > 0
       order by random()
       limit floor(random() * 4)::int
    ) as s),
    starts_at,
    starts_at + make_interval(hours => 3 + floor(random() * 4)::int),
    (array[150, 200, 250, 300, 400, 500, null])[1 + floor(random() * 7)::int],
    'published',
    array[genres[1 + floor(random() * array_length(genres, 1))::int]]
  from picked
  returning id, starts_at
)
-- 5. Offers on ~85% of tonight's events and ~60% of the rest.
insert into public.offers (id, event_id, title, terms, max_claims, per_user_limit, valid_until, is_active)
select
  ('dddddddd-' || substr(m, 9, 4) || '-4' || substr(m, 14, 3) || '-8' || substr(m, 18, 3) || '-' || substr(m, 21, 12))::uuid,
  id,
  title,
  'Покажи QR на вході до ' || to_char((starts_at + interval '2 hours') at time zone 'Europe/Kyiv', 'HH24:MI'),
  100,
  1,
  starts_at + interval '2 hours',
  true
from (
  select id, starts_at, md5(id::text || '-offer') as m,
    (array['−20% на вхід', 'Шот у подарунок', 'Вхід безкоштовно до 22:00',
           '2 коктейлі за ціною 1', '−15% на бар', 'Welcome drink'])[1 + floor(random() * 6)::int] as title
  from new_events
  where random() < case when starts_at < now() + interval '1 day' then 0.85 else 0.6 end
) as o;

commit;

-- Check: venues, events and offers per day.
select (starts_at at time zone 'Europe/Kyiv')::date as day,
       count(*) as events,
       count(o.id) as with_offer
from public.events e
left join public.offers o on o.event_id = e.id
where e.id::text like 'dddddddd-%'
group by 1
order by 1;
