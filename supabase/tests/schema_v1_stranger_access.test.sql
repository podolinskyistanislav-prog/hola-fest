-- pgTAP: strangers (anon and authenticated) cannot read or write any v1 table.
begin;
select plan(24);

set local role anon;
select throws_ok('select 1 from public.profiles', '42501', null, 'anon cannot read profiles');
select throws_ok('select 1 from public.venues', '42501', null, 'anon cannot read venues');
select throws_ok('select 1 from public.venue_members', '42501', null, 'anon cannot read venue_members');
select throws_ok('select 1 from public.events', '42501', null, 'anon cannot read events');
select throws_ok('select 1 from public.offers', '42501', null, 'anon cannot read offers');
select throws_ok('select 1 from public.claims', '42501', null, 'anon cannot read claims');
select throws_ok($$insert into public.venues (slug, name) values ('x', 'x')$$, '42501', null, 'anon cannot write venues');
select throws_ok($$insert into public.profiles (id) values (gen_random_uuid())$$, '42501', null, 'anon cannot write profiles');
select throws_ok($$insert into public.claims (offer_id, user_id, token_hash) values (gen_random_uuid(), gen_random_uuid(), 'h')$$, '42501', null, 'anon cannot write claims');
reset role;

set local role authenticated;
select throws_ok('select 1 from public.profiles', '42501', null, 'authenticated cannot read profiles');
select throws_ok('select 1 from public.venues', '42501', null, 'authenticated cannot read venues');
select throws_ok('select 1 from public.venue_members', '42501', null, 'authenticated cannot read venue_members');
select throws_ok('select 1 from public.events', '42501', null, 'authenticated cannot read events');
select throws_ok('select 1 from public.offers', '42501', null, 'authenticated cannot read offers');
select throws_ok('select 1 from public.claims', '42501', null, 'authenticated cannot read claims');
select throws_ok($$insert into public.venues (slug, name) values ('x', 'x')$$, '42501', null, 'authenticated cannot write venues');
select throws_ok($$insert into public.venue_members (venue_id, user_id, role) values (gen_random_uuid(), gen_random_uuid(), 'admin')$$, '42501', null, 'authenticated cannot write venue_members');
select throws_ok($$insert into public.events (venue_id, title, starts_at) values (gen_random_uuid(), 't', now())$$, '42501', null, 'authenticated cannot write events');
select throws_ok($$insert into public.offers (event_id, title) values (gen_random_uuid(), 't')$$, '42501', null, 'authenticated cannot write offers');
select throws_ok($$insert into public.claims (offer_id, user_id, token_hash) values (gen_random_uuid(), gen_random_uuid(), 'h')$$, '42501', null, 'authenticated cannot write claims');
select throws_ok($$update public.profiles set is_superadmin = true$$, '42501', null, 'authenticated cannot escalate profiles');
reset role;

select ok(
  (select bool_and(c.relrowsecurity) from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname in ('profiles','venues','venue_members','events','offers','claims')),
  'RLS enabled on all v1 tables');
select is(
  (select count(*)::int from information_schema.role_table_grants
   where table_schema = 'public' and grantee in ('anon','authenticated')
     and table_name in ('profiles','venues','venue_members','events','offers','claims')),
  0, 'no grants to anon/authenticated on v1 tables');
select is((select count(*)::int from pg_policies where schemaname = 'public'), 0, 'no policies yet');

select * from finish();
rollback;
