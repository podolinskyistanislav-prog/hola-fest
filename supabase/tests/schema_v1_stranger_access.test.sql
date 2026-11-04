-- pgTAP: strangers (anon and authenticated) cannot touch tables whose policies do not exist yet
-- (events, offers, claims). profiles/venues/venue_members are covered by rls_profiles_venues_members.
begin;
select plan(14);

set local role anon;
select throws_ok('select 1 from public.events', '42501', null, 'anon cannot read events');
select throws_ok('select 1 from public.offers', '42501', null, 'anon cannot read offers');
select throws_ok('select 1 from public.claims', '42501', null, 'anon cannot read claims');
select throws_ok($$insert into public.claims (offer_id, user_id, token_hash) values (gen_random_uuid(), gen_random_uuid(), 'h')$$, '42501', null, 'anon cannot write claims');
reset role;

set local role authenticated;
select throws_ok('select 1 from public.events', '42501', null, 'authenticated cannot read events');
select throws_ok('select 1 from public.offers', '42501', null, 'authenticated cannot read offers');
select throws_ok('select 1 from public.claims', '42501', null, 'authenticated cannot read claims');
select throws_ok($$insert into public.events (venue_id, title, starts_at) values (gen_random_uuid(), 't', now())$$, '42501', null, 'authenticated cannot write events');
select throws_ok($$insert into public.offers (event_id, title) values (gen_random_uuid(), 't')$$, '42501', null, 'authenticated cannot write offers');
select throws_ok($$insert into public.claims (offer_id, user_id, token_hash) values (gen_random_uuid(), gen_random_uuid(), 'h')$$, '42501', null, 'authenticated cannot write claims');
reset role;

select ok(
  (select bool_and(c.relrowsecurity) from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname in ('profiles','venues','venue_members','events','offers','claims')),
  'RLS enabled on all v1 tables');
select is(
  (select count(*)::int from information_schema.role_table_grants
   where table_schema = 'public' and grantee in ('anon','authenticated')
     and table_name in ('events','offers','claims')),
  0, 'no grants to anon/authenticated on events/offers/claims yet');
select is(
  (select count(*)::int from pg_policies
   where schemaname = 'public' and tablename in ('events','offers','claims')),
  0, 'no policies on events/offers/claims yet');
select is(
  (select count(*)::int from pg_policies where schemaname = 'public'),
  (select count(*)::int from pg_policies
   where schemaname = 'public' and tablename in ('profiles','venues','venue_members')),
  'policies exist only on profiles/venues/venue_members');

select * from finish();
rollback;
