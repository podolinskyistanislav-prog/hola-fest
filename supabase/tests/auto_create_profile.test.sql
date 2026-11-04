-- pgTAP: every new auth user gets a profile automatically; nobody can become superadmin via sign-up.
begin;
select plan(11);

-- anonymous guest and email user (same shape GoTrue inserts)
insert into auth.users (id, instance_id, aud, role, is_anonymous, email)
values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true, null),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'staff@example.com');

select is((select count(*)::int from public.profiles where id = '00000000-0000-0000-0000-0000000000d1'), 1,
  'anonymous user gets a profile');
select is((select count(*)::int from public.profiles where id = '00000000-0000-0000-0000-0000000000d2'), 1,
  'email user gets a profile');
select is((select count(*)::int from public.profiles
  where id in ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000d2') and is_superadmin), 0,
  'new users are never superadmin');

-- sign-up metadata must not be able to grant superadmin
insert into auth.users (id, instance_id, aud, role, raw_user_meta_data, raw_app_meta_data)
values ('00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
  '{"is_superadmin": true}', '{"is_superadmin": true}');
select is((select is_superadmin from public.profiles where id = '00000000-0000-0000-0000-0000000000d3'), false,
  'sign-up metadata cannot make a user superadmin');

-- hardening: security definer, fixed search_path, not callable by API roles
select ok(
  (select p.prosecdef and p.proconfig @> array['search_path=""']
   from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'handle_new_user'),
  'handle_new_user is security definer with fixed search_path');
select ok(not has_function_privilege('anon', 'public.handle_new_user()', 'execute'), 'anon cannot execute handle_new_user');
select ok(not has_function_privilege('authenticated', 'public.handle_new_user()', 'execute'), 'authenticated cannot execute handle_new_user');

-- backfill is idempotent: re-running the insert changes nothing
delete from public.profiles where id = '00000000-0000-0000-0000-0000000000d2';
insert into public.profiles (id)
select u.id from auth.users u on conflict (id) do nothing;
insert into public.profiles (id)
select u.id from auth.users u on conflict (id) do nothing;
select is((select count(*)::int from public.profiles where id = '00000000-0000-0000-0000-0000000000d2'), 1,
  'backfill restores a missing profile and is idempotent');

-- a stranger still cannot read other profiles
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000d1', true);
select is((select count(*)::int from public.profiles where id = '00000000-0000-0000-0000-0000000000d2'), 0,
  'guest cannot read another user''s profile');
select is((select count(*)::int from public.profiles), 1, 'guest sees only their own profile');
reset role;

set local role anon;
select throws_ok('select 1 from public.profiles', '42501', null, 'anon cannot read profiles');
reset role;

select * from finish();
rollback;
