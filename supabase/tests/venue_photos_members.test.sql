-- pgTAP: venue photos and list_venue_members — strangers, anon, hosts and other venues get nothing.
begin;
select plan(11);

delete from public.venues;

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false),
  ('00000000-0000-0000-0000-0000000000e3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false);

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'closed', 'Closed', false),
  ('00000000-0000-0000-0000-0000000000b2', 'open', 'Open', true);

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000e1', 'owner'),
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000e3', 'host');

insert into public.venue_photos (venue_id, kind, path) values
  ('00000000-0000-0000-0000-0000000000b1', 'inside', '00000000-0000-0000-0000-0000000000b1/a.jpg'),
  ('00000000-0000-0000-0000-0000000000b2', 'outside', '00000000-0000-0000-0000-0000000000b2/b.jpg');

-- owner
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000e1', true);
select is((select count(*)::int from public.venue_photos), 2, 'owner sees own unpublished photos and public ones');
select is((select count(*)::int from public.list_venue_members('00000000-0000-0000-0000-0000000000b1')), 2, 'owner lists the team');
insert into public.venue_photos (venue_id, kind, path)
  values ('00000000-0000-0000-0000-0000000000b1', 'outside', '00000000-0000-0000-0000-0000000000b1/c.jpg');
select is((select count(*)::int from public.venue_photos where venue_id = '00000000-0000-0000-0000-0000000000b1'), 2, 'owner adds a photo');
select throws_ok(
  $$insert into public.venue_photos (venue_id, kind, path) values ('00000000-0000-0000-0000-0000000000b1', 'inside', 'other/x.jpg')$$,
  '23514', null, 'photo path must live in the venue folder');
select throws_ok(
  $$insert into public.venue_photos (venue_id, kind, path) values ('00000000-0000-0000-0000-0000000000b2', 'inside', '00000000-0000-0000-0000-0000000000b2/z.jpg')$$,
  '42501', null, 'owner cannot add photos to another venue');

-- host: reads, cannot manage
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000e3', true);
select throws_ok($$select * from public.list_venue_members('00000000-0000-0000-0000-0000000000b1')$$, '42501', null, 'host cannot list the team');
delete from public.venue_photos where venue_id = '00000000-0000-0000-0000-0000000000b1';
reset role;
select is((select count(*)::int from public.venue_photos where venue_id = '00000000-0000-0000-0000-0000000000b1'), 2, 'host cannot delete photos');

-- stranger
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000e2', true);
select is((select count(*)::int from public.venue_photos), 1, 'stranger sees only published venue photos');
select throws_ok($$select * from public.list_venue_members('00000000-0000-0000-0000-0000000000b1')$$, '42501', null, 'stranger cannot list the team');

-- anon
reset role;
set local role anon;
select is((select count(*)::int from public.venue_photos), 1, 'anon sees only published venue photos');
reset role;
select is((select count(*)::int from public.venue_photos), 3, 'rows exist (sanity)');

select * from finish();
rollback;
