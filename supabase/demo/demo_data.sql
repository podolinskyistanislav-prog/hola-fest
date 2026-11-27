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
delete from public.djs where id::text like 'dddddddd-%';
-- Demo accounts: their profiles and applications go with them.
delete from auth.users where id::text like 'dddddddd-%';

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

-- 6. Demo DJ profiles for every name used in the demo lineups (not linked to a user, so a real
--    DJ can claim one through an application), and the lineup links for the demo events.
insert into public.djs (id, stage_name, slug, bio, genres, is_published)
select
  ('dddddddd-0000-4000-8000-0000000001' || lpad(n::text, 2, '0'))::uuid,
  name,
  'demo-' || slug,
  'Демо-профіль діджея: тут буде біографія.',
  genres,
  true
from (
  values
    (1, 'DJ Kora', 'dj-kora', array['techno']),
    (2, 'Nova Waves', 'nova-waves', array['house']),
    (3, 'Marta Lux', 'marta-lux', array['house', 'disco']),
    (4, 'Kyiv Pulse', 'kyiv-pulse', array['techno']),
    (5, 'Lemko', 'lemko', array['house']),
    (6, 'Dnipro Drift', 'dnipro-drift', array['techno']),
    (7, 'Selecta Yana', 'selecta-yana', array['disco']),
    (8, 'Tolik Bass', 'tolik-bass', array['techno']),
    (9, 'Ostap b2b Ira', 'ostap-b2b-ira', array['house']),
    (10, 'Mira Sound', 'mira-sound', array['house'])
) as d (n, name, slug, genres);

insert into public.event_djs (event_id, dj_id, position)
select e.id, d.id, row_number() over (partition by e.id order by u.ord) - 1
from public.events e
cross join lateral unnest(e.lineup) with ordinality as u (name, ord)
join public.djs d on d.stage_name = u.name and d.id::text like 'dddddddd-%'
where e.id::text like 'dddddddd-%';

-- 7. One pending application of each kind, from demo accounts (no password: nobody can sign in as them).
insert into auth.users (id, instance_id, aud, role, email, is_anonymous) values
  ('dddddddd-0000-4000-8000-000000000201', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-venue-applicant@example.invalid', false),
  ('dddddddd-0000-4000-8000-000000000202', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-dj-applicant@example.invalid', false);

insert into public.account_applications (id, user_id, kind, payload) values
  ('dddddddd-0000-4000-8000-000000000301', 'dddddddd-0000-4000-8000-000000000201', 'venue',
   '{"name":"Демо-клуб Пріоритет","address":"вул. Саксаганського, 12","contact":"@demo_club"}'),
  ('dddddddd-0000-4000-8000-000000000302', 'dddddddd-0000-4000-8000-000000000202', 'dj',
   '{"stage_name":"DJ Демо","contact":"@demo_dj"}');

-- 8. Feed: demo authors (guests, DJs, club admins), ~20 posts and a few comments. Text follows
--    docs/FEED_RULES.md: no links, prices, dates or event announcements. Photos are placeholder
--    paths under the author's folder (no files are uploaded). Posts and profiles go away with the
--    demo users and venues deleted in step 1.
insert into auth.users (id, instance_id, aud, role, email, is_anonymous) values
  ('dddddddd-0000-4000-8000-000000000401', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-feed-1@example.invalid', false),
  ('dddddddd-0000-4000-8000-000000000402', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-feed-2@example.invalid', false),
  ('dddddddd-0000-4000-8000-000000000403', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-feed-3@example.invalid', false),
  ('dddddddd-0000-4000-8000-000000000404', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-feed-4@example.invalid', false),
  ('dddddddd-0000-4000-8000-000000000405', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-feed-dj@example.invalid', false),
  ('dddddddd-0000-4000-8000-000000000406', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-feed-club-1@example.invalid', false),
  ('dddddddd-0000-4000-8000-000000000407', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'demo-feed-club-2@example.invalid', false);

update public.profiles p
set display_name = d.name, handle = d.handle, is_dj = d.is_dj
from (
  values
    ('dddddddd-0000-4000-8000-000000000401'::uuid, 'Оля', 'demo_olya', false),
    ('dddddddd-0000-4000-8000-000000000402'::uuid, 'Макс', 'demo_maks', false),
    ('dddddddd-0000-4000-8000-000000000403'::uuid, 'Софія', 'demo_sofiia', false),
    ('dddddddd-0000-4000-8000-000000000404'::uuid, 'Данило', 'demo_danylo', false),
    ('dddddddd-0000-4000-8000-000000000405'::uuid, 'DJ Kora', 'demo_dj_kora', true),
    ('dddddddd-0000-4000-8000-000000000406'::uuid, 'Адмін Котельні', 'demo_kotelnia_admin', false),
    ('dddddddd-0000-4000-8000-000000000407'::uuid, 'Адмін Даху', 'demo_dakh_admin', false)
) as d (id, name, handle, is_dj)
where p.id = d.id;

insert into public.venue_members (venue_id, user_id, role) values
  ('dddddddd-0000-4000-8000-000000000003', 'dddddddd-0000-4000-8000-000000000406', 'admin'),
  ('dddddddd-0000-4000-8000-000000000004', 'dddddddd-0000-4000-8000-000000000407', 'admin');

insert into public.posts (id, author_id, as_venue_id, body, image_paths, created_at) values
  ('dddddddd-0000-4000-8000-000000000501', 'dddddddd-0000-4000-8000-000000000401', null,
   'Вчора на Подолі було неймовірне відчуття, звук просто тримав усю залу.', array['dddddddd-0000-4000-8000-000000000401/demo-1.jpg'], now() - interval '20 minutes'),
  ('dddddddd-0000-4000-8000-000000000502', 'dddddddd-0000-4000-8000-000000000402', null,
   'Хто знає, де у Києві найкращий звук для хауса? Шукаю нові місця.', '{}', now() - interval '45 minutes'),
  ('dddddddd-0000-4000-8000-000000000503', 'dddddddd-0000-4000-8000-000000000403', null,
   'Захід сонця на даху і гарний сет, чого ще треба для суботи.', array['dddddddd-0000-4000-8000-000000000403/demo-1.jpg', 'dddddddd-0000-4000-8000-000000000403/demo-2.jpg'], now() - interval '1 hour 10 minutes'),
  ('dddddddd-0000-4000-8000-000000000504', 'dddddddd-0000-4000-8000-000000000404', null,
   'Нарешті почув наживо той трек, який крутив місяць поспіль.', '{}', now() - interval '2 hours'),
  ('dddddddd-0000-4000-8000-000000000505', 'dddddddd-0000-4000-8000-000000000405', null,
   'Дякую всім, хто танцював до самого ранку. Ви найкраща публіка.', array['dddddddd-0000-4000-8000-000000000405/demo-1.jpg'], now() - interval '3 hours'),
  ('dddddddd-0000-4000-8000-000000000506', 'dddddddd-0000-4000-8000-000000000405', null,
   'Пишу новий мікс у стилі дип-техно. Які треки ви б туди додали?', '{}', now() - interval '5 hours'),
  ('dddddddd-0000-4000-8000-000000000507', 'dddddddd-0000-4000-8000-000000000406', 'dddddddd-0000-4000-8000-000000000003',
   'Ми оновили бар і поставили нову звукову систему. Дякуємо всім, хто допомагав.', array['dddddddd-0000-4000-8000-000000000406/demo-1.jpg'], now() - interval '6 hours'),
  ('dddddddd-0000-4000-8000-000000000508', 'dddddddd-0000-4000-8000-000000000407', 'dddddddd-0000-4000-8000-000000000004',
   'На даху з’явилися нові пледи й обігрівачі, щоб вечори були затишнішими.', array['dddddddd-0000-4000-8000-000000000407/demo-1.jpg'], now() - interval '8 hours'),
  ('dddddddd-0000-4000-8000-000000000509', 'dddddddd-0000-4000-8000-000000000406', 'dddddddd-0000-4000-8000-000000000003',
   'Дякуємо за відгуки про світло в залі, ми їх уважно читаємо.', '{}', now() - interval '1 day'),
  ('dddddddd-0000-4000-8000-000000000510', 'dddddddd-0000-4000-8000-000000000401', null,
   'Атмосфера в підвалі, де грають диско, просто окрема історія.', array['dddddddd-0000-4000-8000-000000000401/demo-2.jpg'], now() - interval '1 day 2 hours'),
  ('dddddddd-0000-4000-8000-000000000511', 'dddddddd-0000-4000-8000-000000000402', null,
   'Порадьте, що послухати, якщо подобається мінімал-техно.', '{}', now() - interval '1 day 4 hours'),
  ('dddddddd-0000-4000-8000-000000000512', 'dddddddd-0000-4000-8000-000000000403', null,
   'Склад на Кирилівській виглядає вражаюче вночі, кращих фото ще не робила.', array['dddddddd-0000-4000-8000-000000000403/demo-3.jpg', 'dddddddd-0000-4000-8000-000000000403/demo-4.jpg', 'dddddddd-0000-4000-8000-000000000403/demo-5.jpg'], now() - interval '1 day 6 hours'),
  ('dddddddd-0000-4000-8000-000000000513', 'dddddddd-0000-4000-8000-000000000404', null,
   'Люблю, коли діджей читає залу й міняє настрій без пауз.', '{}', now() - interval '2 days'),
  ('dddddddd-0000-4000-8000-000000000514', 'dddddddd-0000-4000-8000-000000000405', null,
   'Сьогодні вдома перебирав вініл і знайшов кілька забутих перлин.', array['dddddddd-0000-4000-8000-000000000405/demo-2.jpg'], now() - interval '2 days 3 hours'),
  ('dddddddd-0000-4000-8000-000000000515', 'dddddddd-0000-4000-8000-000000000407', 'dddddddd-0000-4000-8000-000000000004',
   'Команда Даху вчилася робити нові безалкогольні коктейлі, виходить смачно.', '{}', now() - interval '2 days 8 hours'),
  ('dddddddd-0000-4000-8000-000000000516', 'dddddddd-0000-4000-8000-000000000401', null,
   'Дякую незнайомцям, які допомогли знайти мої окуляри в натовпі.', '{}', now() - interval '3 days'),
  ('dddddddd-0000-4000-8000-000000000517', 'dddddddd-0000-4000-8000-000000000402', null,
   'Світло й дим разом створили справжню магію, мурашки по шкірі.', array['dddddddd-0000-4000-8000-000000000402/demo-1.jpg'], now() - interval '3 days 5 hours'),
  ('dddddddd-0000-4000-8000-000000000518', 'dddddddd-0000-4000-8000-000000000403', null,
   'Чи є тут люди, що колекціонують платівки? Давайте знайомитися.', '{}', now() - interval '4 days'),
  ('dddddddd-0000-4000-8000-000000000519', 'dddddddd-0000-4000-8000-000000000404', null,
   'Після ночі на танцполі найкраща кава з пекарні на розі.', array['dddddddd-0000-4000-8000-000000000404/demo-1.jpg'], now() - interval '4 days 6 hours'),
  ('dddddddd-0000-4000-8000-000000000520', 'dddddddd-0000-4000-8000-000000000405', null,
   'Дякую Котельні за теплий прийом, звук там справді особливий.', '{}', now() - interval '5 days');

insert into public.post_comments (id, post_id, author_id, parent_id, body, created_at) values
  ('dddddddd-0000-4000-8000-000000000601', 'dddddddd-0000-4000-8000-000000000501', 'dddddddd-0000-4000-8000-000000000402', null,
   'Погоджуюсь, звук там справді чудовий.', now() - interval '15 minutes'),
  ('dddddddd-0000-4000-8000-000000000602', 'dddddddd-0000-4000-8000-000000000501', 'dddddddd-0000-4000-8000-000000000401', 'dddddddd-0000-4000-8000-000000000601',
   'Так, відчувається кожен бас.', now() - interval '10 minutes'),
  ('dddddddd-0000-4000-8000-000000000603', 'dddddddd-0000-4000-8000-000000000502', 'dddddddd-0000-4000-8000-000000000405', null,
   'Спробуй заглянути в підвальні бари на Подолі, там гарне обладнання.', now() - interval '30 minutes'),
  ('dddddddd-0000-4000-8000-000000000604', 'dddddddd-0000-4000-8000-000000000507', 'dddddddd-0000-4000-8000-000000000403', null,
   'Круто, що ви інвестуєте у звук!', now() - interval '5 hours'),
  ('dddddddd-0000-4000-8000-000000000605', 'dddddddd-0000-4000-8000-000000000505', 'dddddddd-0000-4000-8000-000000000404', null,
   'Це була ніч, яку я запам’ятаю.', now() - interval '2 hours'),
  ('dddddddd-0000-4000-8000-000000000606', 'dddddddd-0000-4000-8000-000000000506', 'dddddddd-0000-4000-8000-000000000401', null,
   'Додай щось із мінімальним басом, це завжди працює.', now() - interval '4 hours'),
  ('dddddddd-0000-4000-8000-000000000607', 'dddddddd-0000-4000-8000-000000000508', 'dddddddd-0000-4000-8000-000000000402', null,
   'Дуже затишно, дякую за турботу про гостей.', now() - interval '7 hours'),
  ('dddddddd-0000-4000-8000-000000000608', 'dddddddd-0000-4000-8000-000000000511', 'dddddddd-0000-4000-8000-000000000405', null,
   'Послухай мінімал із Румунії, там дуже чисте звучання.', now() - interval '1 day 3 hours');

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
