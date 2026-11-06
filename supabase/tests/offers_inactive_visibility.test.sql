-- pgTAP: who can list inactive offers of an event (admin offers editor, listEventOffers).
begin;
select plan(6);

delete from public.venues;

insert into auth.users (id, instance_id, aud, role)
select ('00000000-0000-0000-0000-0000000000' || n)::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'
from (values ('a2'), ('a3'), ('a4'), ('a5')) t(n);

-- a2 admin of A, a3 host of A, a4 stranger, a5 admin of B
insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'a', 'A', true),
  ('00000000-0000-0000-0000-0000000000b2', 'b', 'B', true);

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a2', 'admin'),
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a3', 'host'),
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a5', 'admin');

insert into public.events (id, venue_id, title, starts_at, status) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'A pub', now() + interval '1 day', 'published');

insert into public.offers (id, event_id, title, is_active, created_at) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c1', 'active', true, now() - interval '1 hour'),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000c1', 'inactive', false, now());

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a2', true);
select results_eq(
  $$select title from public.offers where event_id = '00000000-0000-0000-0000-0000000000c1' order by created_at desc$$,
  array['inactive', 'active'],
  'admin of the venue lists active and inactive offers, newest first');

select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a3', true);
select is((select count(*)::int from public.offers where not is_active), 0, 'host does not see inactive offers');

select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a5', true);
select is((select count(*)::int from public.offers where not is_active), 0, 'admin of another venue does not see inactive offers');

select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a4', true);
select is((select count(*)::int from public.offers where not is_active), 0, 'stranger does not see inactive offers');
reset role;

set local role anon;
select is((select count(*)::int from public.offers where not is_active), 0, 'anon does not see inactive offers');
reset role;

select is((select count(*)::int from public.offers), 2, 'rows exist (sanity)');

select * from finish();
rollback;
