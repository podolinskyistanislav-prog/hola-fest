-- pgTAP: structural guarantees across all v1 tables.
-- Per-table access rules live in rls_profiles_venues_members and rls_events_offers_claims.
begin;
select plan(5);

select ok(
  (select bool_and(c.relrowsecurity) from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relname in ('profiles','venues','venue_members','events','offers','claims')),
  'RLS enabled on all v1 tables');
select is(
  (select count(*)::int from information_schema.role_table_grants
   where table_schema = 'public' and table_name = 'claims'
     and grantee in ('anon','authenticated')
     and privilege_type in ('INSERT','UPDATE','DELETE','TRUNCATE')),
  0, 'claims has no write grants for anon/authenticated');
select is(
  (select count(*)::int from information_schema.role_table_grants
   where table_schema = 'public' and table_name = 'claims' and grantee = 'anon'),
  0, 'claims has no grants for anon');

set local role anon;
select throws_ok($$insert into public.claims (offer_id, user_id, token_hash) values (gen_random_uuid(), gen_random_uuid(), 'h')$$, '42501', null, 'anon cannot write claims');
reset role;
set local role authenticated;
select throws_ok($$insert into public.claims (offer_id, user_id, token_hash) values (gen_random_uuid(), gen_random_uuid(), 'h')$$, '42501', null, 'authenticated cannot write claims');
reset role;

select * from finish();
rollback;
