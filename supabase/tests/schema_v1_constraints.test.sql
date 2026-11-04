-- pgTAP: v1 schema constraints (run as the table owner, bypassing grants/RLS).
begin;
select plan(6);

insert into auth.users (id) values
  ('00000000-0000-0000-0000-0000000000a1'),
  ('00000000-0000-0000-0000-0000000000a2');
insert into public.profiles (id) values
  ('00000000-0000-0000-0000-0000000000a1'),
  ('00000000-0000-0000-0000-0000000000a2')
on conflict (id) do nothing;
insert into public.venues (id, slug, name) values
  ('00000000-0000-0000-0000-0000000000b1', 'v', 'v');
insert into public.events (id, venue_id, title, starts_at) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'e', '2030-01-01 20:00+00');
insert into public.offers (id, event_id, title) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c1', 'o');
insert into public.claims (id, offer_id, user_id, token_hash, status, redeemed_at, redeemed_by) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000d1',
   '00000000-0000-0000-0000-0000000000a1', 'h1', 'redeemed', now(), '00000000-0000-0000-0000-0000000000a2');

select lives_ok(
  $$delete from public.profiles where id = '00000000-0000-0000-0000-0000000000a2'$$,
  'deleting a profile referenced by redeemed_by succeeds');
select is(
  (select redeemed_by from public.claims where id = '00000000-0000-0000-0000-0000000000e1'),
  null::uuid, 'claim is kept with redeemed_by cleared');

select throws_ok(
  $$insert into public.events (venue_id, title, starts_at, ends_at) values ('00000000-0000-0000-0000-0000000000b1', 't', '2030-01-01 20:00+00', '2030-01-01 19:00+00')$$,
  '23514', null, 'ends_at before starts_at is rejected');
select throws_ok(
  $$insert into public.venues (slug, name, lat, lng) values ('bad-lat', 'x', 91, 0)$$,
  '23514', null, 'lat out of range is rejected');
select throws_ok(
  $$insert into public.venues (slug, name, lat, lng) values ('bad-lng', 'x', 0, 181)$$,
  '23514', null, 'lng out of range is rejected');
select lives_ok(
  $$insert into public.venues (slug, name) values ('no-coords', 'x')$$,
  'null coordinates are allowed');

select * from finish();
rollback;
