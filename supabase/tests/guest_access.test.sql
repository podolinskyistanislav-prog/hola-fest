-- pgTAP: an anonymous guest (is_anonymous = true) cannot escalate and sees only their own data.
begin;
select plan(16);

insert into auth.users (id, instance_id, aud, role, is_anonymous)
values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true);

insert into public.venues (id, slug, name, is_published)
values ('00000000-0000-0000-0000-0000000000f1', 'guest-test-venue', 'Guest Test', true);
insert into public.events (id, venue_id, title, starts_at, status)
values ('00000000-0000-0000-0000-0000000000f2', '00000000-0000-0000-0000-0000000000f1', 'Public', now() + interval '1 day', 'published');
insert into public.offers (id, event_id, title)
values ('00000000-0000-0000-0000-0000000000f3', '00000000-0000-0000-0000-0000000000f2', 'Free shot');
-- e2 holds a claim; e1 must not see it
insert into public.claims (offer_id, user_id, token_hash)
values ('00000000-0000-0000-0000-0000000000f3', '00000000-0000-0000-0000-0000000000e2', 'hash-of-e2');

select is((select count(*)::int from public.profiles where id = '00000000-0000-0000-0000-0000000000e1'), 1,
  'guest got a profile on sign-in');

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000e1', true);

select is(public.is_superadmin(), false, 'guest is not superadmin');
select is(public.is_venue_member('00000000-0000-0000-0000-0000000000f1', 'admin'), false, 'guest is not a venue admin');
select is(public.is_venue_member('00000000-0000-0000-0000-0000000000f1', 'host'), false, 'guest is not a venue host');
select is((select count(*)::int from public.venue_members), 0, 'guest sees no venue memberships');

-- escalation attempts
select throws_ok(
  $$update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000e1'$$,
  '42501', null, 'guest cannot update own is_superadmin');
select is((select is_superadmin from public.profiles where id = '00000000-0000-0000-0000-0000000000e1'), false,
  'guest is still not superadmin after the attempt');
select throws_ok(
  $$insert into public.venue_members (venue_id, user_id, role) values ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000e1', 'admin')$$,
  '42501', null, 'guest cannot make themselves a venue admin');

-- reads of other people's data
select is((select count(*)::int from public.profiles where id = '00000000-0000-0000-0000-0000000000e2'), 0,
  'guest cannot read another guest''s profile');
select is((select count(*)::int from public.claims), 0, 'guest cannot read another user''s claims');
select throws_ok('select token_hash from public.claims', '42501', null, 'guest cannot read token_hash');

-- writes to content
select throws_ok(
  $$insert into public.events (venue_id, title, starts_at) values ('00000000-0000-0000-0000-0000000000f1', 'Fake', now() + interval '1 day')$$,
  '42501', null, 'guest cannot create events');
select is_empty(
  $$with u as (update public.events set title = 'Hacked' returning 1) select * from u$$,
  'guest cannot update events');
select throws_ok(
  $$insert into public.offers (event_id, title) values ('00000000-0000-0000-0000-0000000000f2', 'Free everything')$$,
  '42501', null, 'guest cannot create offers');
select is_empty(
  $$with u as (update public.offers set max_claims = 1000000 returning 1) select * from u$$,
  'guest cannot update offers');
select throws_ok(
  $$insert into public.claims (offer_id, user_id, token_hash) values ('00000000-0000-0000-0000-0000000000f3', '00000000-0000-0000-0000-0000000000e1', 'forged')$$,
  '42501', null, 'guest cannot insert claims directly');
reset role;

select * from finish();
rollback;
