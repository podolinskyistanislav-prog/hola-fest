-- pgTAP: a user who is admin of venue A and only host of venue B must not gain admin rights in B,
-- and must not be able to move events/offers between venues. Complements rls_access_matrix.
begin;
select plan(9);

insert into auth.users (id, instance_id, aud, role)
select ('00000000-0000-0000-0000-0000000000' || n)::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'
from (values ('a2'), ('a5')) t(n);

insert into public.profiles (id, display_name) values
  ('00000000-0000-0000-0000-0000000000a2', 'mixed'),
  ('00000000-0000-0000-0000-0000000000a5', 'adminB')
on conflict (id) do update set display_name = excluded.display_name;

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'a', 'A', true),
  ('00000000-0000-0000-0000-0000000000b2', 'b', 'B', true);

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a2', 'admin'),
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a2', 'host'),
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a5', 'admin');

insert into public.events (id, venue_id, title, starts_at, status) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'A', now() + interval '1 day', 'draft'),
  ('00000000-0000-0000-0000-0000000000c3', '00000000-0000-0000-0000-0000000000b2', 'B', now() + interval '1 day', 'draft');
insert into public.offers (id, event_id, title) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c1', 'oA'),
  ('00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000c3', 'oB');

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a2', true);

select throws_ok($$insert into public.events (venue_id, title, starts_at) values ('00000000-0000-0000-0000-0000000000b2', 'x', now())$$, '42501', null, 'admin A / host B cannot create events in B');
select throws_ok($$insert into public.offers (event_id, title) values ('00000000-0000-0000-0000-0000000000c3', 'x')$$, '42501', null, 'admin A / host B cannot create offers in B');
select results_eq($$with u as (update public.events set title = 'x' where id = '00000000-0000-0000-0000-0000000000c3' returning 1) select count(*)::int from u$$, $$values (0)$$, 'admin A / host B cannot update events of B');
select results_eq($$with d as (delete from public.offers where id = '00000000-0000-0000-0000-0000000000d3' returning 1) select count(*)::int from d$$, $$values (0)$$, 'admin A / host B cannot delete offers of B');
select throws_ok($$update public.events set venue_id = '00000000-0000-0000-0000-0000000000b2' where id = '00000000-0000-0000-0000-0000000000c1'$$, '42501', null, 'cannot move event from A into B (host there)');
select throws_ok($$update public.offers set event_id = '00000000-0000-0000-0000-0000000000c3' where id = '00000000-0000-0000-0000-0000000000d1'$$, '42501', null, 'cannot move offer from A onto event of B');
select lives_ok($$update public.events set title = 'ok' where id = '00000000-0000-0000-0000-0000000000c1'$$, 'still administers A');

select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a5', true);
select throws_ok($$update public.events set venue_id = '00000000-0000-0000-0000-0000000000b1' where id = '00000000-0000-0000-0000-0000000000c3'$$, '42501', null, 'admin B cannot move event into A');
select results_eq($$with u as (update public.offers set title = 'x' where id = '00000000-0000-0000-0000-0000000000d1' returning 1) select count(*)::int from u$$, $$values (0)$$, 'admin B cannot update offers of A');

select * from finish();
rollback;
