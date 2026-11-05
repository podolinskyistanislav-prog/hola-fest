-- pgTAP: unpublished venues (and their coordinates) never reach an anon visitor
-- or an anonymous guest; venue_members is unreadable for both.
begin;
select plan(14);

delete from public.venues;

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true);

insert into public.venues (id, slug, name, address, lat, lng, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'open-club',   'Open Club',   'Street 1', 50.45, 30.52, true),
  ('00000000-0000-0000-0000-0000000000b2', 'secret-club', 'Secret Club', 'Street 2', 49.99, 36.23, false);

insert into public.events (id, venue_id, title, starts_at, status) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b2', 'secret night', now() + interval '1 day', 'published');

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000e2', 'admin');

-- anon visitor
set local role anon;

select results_eq($$select slug from public.venues order by slug$$, array['open-club'], 'anon list returns only published venues');
select is((select count(*)::int from public.venues where id = '00000000-0000-0000-0000-0000000000b2'), 0, 'anon cannot fetch hidden venue by id');
select is((select count(*)::int from public.venues where slug = 'secret-club'), 0, 'anon cannot fetch hidden venue by slug');
select is((select count(*)::int from public.venues where lat = 49.99 or lng = 36.23), 0, 'anon cannot find hidden coordinates by filtering');
select is((select count(*)::int from public.venues where lat is not null and not is_published), 0, 'anon sees no unpublished venue with coordinates');
select is((select count(*)::int from public.events where venue_id = '00000000-0000-0000-0000-0000000000b2'), 0, 'anon cannot reach hidden venue through its events');
select throws_ok($$select * from public.venue_members$$, '42501', null, 'anon cannot read venue_members');

-- anonymous guest, not a member of anything
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000e1', true);

select results_eq($$select slug from public.venues order by slug$$, array['open-club'], 'guest list returns only published venues');
select is((select count(*)::int from public.venues where id = '00000000-0000-0000-0000-0000000000b2'), 0, 'guest cannot fetch hidden venue by id');
select is((select count(*)::int from public.venues where lat = 49.99 or lng = 36.23), 0, 'guest cannot find hidden coordinates by filtering');
select is((select count(*)::int from public.venue_members), 0, 'guest sees no venue_members rows');
select is((select count(*)::int from public.venue_members where venue_id = '00000000-0000-0000-0000-0000000000b1'), 0, 'guest cannot read members of a published venue');
select is((select count(*)::int from public.events where venue_id = '00000000-0000-0000-0000-0000000000b2'), 0, 'guest cannot read events of a hidden venue');
update public.venues set is_published = true where id = '00000000-0000-0000-0000-0000000000b2';
reset role;
select is((select is_published from public.venues where id = '00000000-0000-0000-0000-0000000000b2'), false, 'guest cannot publish a hidden venue');

select * from finish();
rollback;
