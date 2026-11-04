-- pgTAP: access rules for events, offers, claims.
begin;
select plan(30);

-- Start from empty tables so the dev seed does not affect counts (rolled back at the end).
delete from public.venues;

insert into auth.users (id, instance_id, aud, role)
select ('00000000-0000-0000-0000-0000000000' || n)::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'
from (values ('a1'), ('a2'), ('a3'), ('a4'), ('a5')) t(n);

-- a1 superadmin, a2 admin of A, a3 host of A, a4 stranger, a5 admin of B
insert into public.profiles (id, display_name, is_superadmin) values
  ('00000000-0000-0000-0000-0000000000a1', 'root', true),
  ('00000000-0000-0000-0000-0000000000a2', 'adminA', false),
  ('00000000-0000-0000-0000-0000000000a3', 'hostA', false),
  ('00000000-0000-0000-0000-0000000000a4', 'stranger', false),
  ('00000000-0000-0000-0000-0000000000a5', 'adminB', false);

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'a', 'A', true),
  ('00000000-0000-0000-0000-0000000000b2', 'b', 'B', true),
  ('00000000-0000-0000-0000-0000000000b3', 'hidden', 'Hidden', false);

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a2', 'admin'),
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a3', 'host'),
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a5', 'admin');

insert into public.events (id, venue_id, title, starts_at, status) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'A pub', now() + interval '1 day', 'published'),
  ('00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-0000000000b1', 'A draft', now() + interval '2 day', 'draft'),
  ('00000000-0000-0000-0000-0000000000c3', '00000000-0000-0000-0000-0000000000b2', 'B pub', now() + interval '1 day', 'published'),
  ('00000000-0000-0000-0000-0000000000c4', '00000000-0000-0000-0000-0000000000b3', 'Hidden venue pub', now() + interval '1 day', 'published');

insert into public.offers (id, event_id, title) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c1', 'A offer'),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000c2', 'A draft offer'),
  ('00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000c3', 'B offer');

insert into public.claims (id, offer_id, user_id, token_hash) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000a4', 'h1'),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000a3', 'h2');

-- anon
set local role anon;
select is((select count(*)::int from public.events), 2, 'anon sees only published events of published venues');
select is((select count(*)::int from public.offers), 2, 'anon sees only offers of public events');
select throws_ok('select 1 from public.claims', '42501', null, 'anon cannot read claims');
select throws_ok($$insert into public.events (venue_id, title, starts_at) values ('00000000-0000-0000-0000-0000000000b1', 'x', now())$$, '42501', null, 'anon cannot write events');
select throws_ok($$insert into public.offers (event_id, title) values ('00000000-0000-0000-0000-0000000000c1', 'x')$$, '42501', null, 'anon cannot write offers');
reset role;

-- stranger a4
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a4', true);
select is((select count(*)::int from public.events), 2, 'stranger sees no drafts');
select is((select count(*)::int from public.offers), 2, 'stranger sees only public offers');
select is((select count(*)::int from public.claims), 1, 'stranger sees only own claim');
select is((select count(*)::int from public.claims where id = '00000000-0000-0000-0000-0000000000e2'), 0, 'stranger cannot read another user claim');
select throws_ok($$insert into public.claims (offer_id, user_id, token_hash) values ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000a4', 'forged')$$, '42501', null, 'stranger cannot create a claim directly');
select throws_ok($$update public.claims set status = 'redeemed' where id = '00000000-0000-0000-0000-0000000000e1'$$, '42501', null, 'stranger cannot update own claim');
select throws_ok($$delete from public.claims where id = '00000000-0000-0000-0000-0000000000e1'$$, '42501', null, 'stranger cannot delete own claim');
select throws_ok('select token_hash from public.claims', '42501', null, 'token_hash is not readable');
select throws_ok($$insert into public.events (venue_id, title, starts_at) values ('00000000-0000-0000-0000-0000000000b1', 'x', now())$$, '42501', null, 'stranger cannot create events');
select throws_ok($$insert into public.offers (event_id, title) values ('00000000-0000-0000-0000-0000000000c1', 'x')$$, '42501', null, 'stranger cannot create offers');
reset role;

-- host of A a3
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a3', true);
select is((select count(*)::int from public.events where venue_id = '00000000-0000-0000-0000-0000000000b1'), 2, 'host sees drafts of own venue');
select is((select count(*)::int from public.claims), 2, 'host sees own claim and claims of own venue');
select throws_ok($$insert into public.events (venue_id, title, starts_at) values ('00000000-0000-0000-0000-0000000000b1', 'x', now())$$, '42501', null, 'host cannot create events');
reset role;

-- admin of A a2
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a2', true);
select is((select count(*)::int from public.offers), 3, 'admin sees offers of own draft event plus public ones');
select is((select count(*)::int from public.claims), 1, 'admin sees only claims of own venue');
select lives_ok($$insert into public.events (venue_id, title, starts_at) values ('00000000-0000-0000-0000-0000000000b1', 'new', now())$$, 'admin writes events in own venue');
select lives_ok($$insert into public.offers (event_id, title) values ('00000000-0000-0000-0000-0000000000c2', 'new')$$, 'admin writes offers in own venue');
select throws_ok($$insert into public.events (venue_id, title, starts_at) values ('00000000-0000-0000-0000-0000000000b2', 'x', now())$$, '42501', null, 'admin A cannot create events in venue B');
select throws_ok($$insert into public.offers (event_id, title) values ('00000000-0000-0000-0000-0000000000c3', 'x')$$, '42501', null, 'admin A cannot create offers in venue B');
select lives_ok($$update public.events set title = 'hacked' where id = '00000000-0000-0000-0000-0000000000c3'$$, 'update of venue B event matches no rows');
select lives_ok($$delete from public.offers where id = '00000000-0000-0000-0000-0000000000d3'$$, 'delete of venue B offer matches no rows');
select throws_ok($$update public.events set venue_id = '00000000-0000-0000-0000-0000000000b2' where id = '00000000-0000-0000-0000-0000000000c1'$$, '42501', null, 'admin A cannot move event into venue B');
reset role;
select is((select title from public.events where id = '00000000-0000-0000-0000-0000000000c3'), 'B pub', 'venue B event unchanged');
select is((select count(*)::int from public.offers where id = '00000000-0000-0000-0000-0000000000d3'), 1, 'venue B offer still exists');

-- superadmin a1
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a1', true);
select is((select count(*)::int from public.claims), 2, 'superadmin sees all claims');
reset role;

select * from finish();
rollback;
