-- pgTAP: access rules for profiles, venues, venue_members and the helper functions.
begin;
select plan(24);

insert into auth.users (id, instance_id, aud, role)
values
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-0000000000a4', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');

-- a1 superadmin, a2 admin of venue 1, a3 host of venue 1, a4 stranger
insert into public.profiles (id, display_name, is_superadmin) values
  ('00000000-0000-0000-0000-0000000000a1', 'root', true),
  ('00000000-0000-0000-0000-0000000000a2', 'admin', false),
  ('00000000-0000-0000-0000-0000000000a3', 'host', false),
  ('00000000-0000-0000-0000-0000000000a4', 'stranger', false);

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'open', 'Open', true),
  ('00000000-0000-0000-0000-0000000000b2', 'hidden', 'Hidden', false);

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a2', 'admin'),
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a3', 'host');

-- helper function hardening
select ok(
  (select bool_and(p.prosecdef and p.provolatile = 's' and p.proconfig @> array['search_path=""'])
   from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname in ('is_superadmin', 'is_venue_member')),
  'helpers are security definer, stable, with fixed search_path');

-- anon
set local role anon;
select is((select count(*)::int from public.venues), 1, 'anon sees only published venues');
select throws_ok('select 1 from public.profiles', '42501', null, 'anon cannot read profiles');
select throws_ok('select 1 from public.venue_members', '42501', null, 'anon cannot read venue_members');
select throws_ok($$insert into public.venues (slug, name) values ('x', 'x')$$, '42501', null, 'anon cannot write venues');
select is(public.is_superadmin(), false, 'is_superadmin false for anon');
reset role;

-- stranger (authenticated, no membership)
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a4', true);
select is((select count(*)::int from public.venues), 1, 'stranger sees only published venues');
select is((select count(*)::int from public.profiles), 1, 'stranger sees only own profile');
select is((select count(*)::int from public.profiles where id = '00000000-0000-0000-0000-0000000000a1'), 0, 'stranger cannot read another profile');
select is((select count(*)::int from public.venue_members), 0, 'stranger sees no venue_members');
select throws_ok($$update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000a4'$$, '42501', null, 'stranger cannot set is_superadmin');
select lives_ok($$update public.profiles set display_name = 'new' where id = '00000000-0000-0000-0000-0000000000a4'$$, 'stranger can edit own display_name');
select lives_ok($$update public.profiles set display_name = 'hacked' where id = '00000000-0000-0000-0000-0000000000a1'$$, 'update of another profile matches no rows');
reset role;
select is((select display_name from public.profiles where id = '00000000-0000-0000-0000-0000000000a1'), 'root', 'another profile is unchanged');
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a4', true);
select throws_ok($$insert into public.venues (slug, name, is_published) values ('y', 'y', true)$$, '42501', null, 'stranger cannot create venues');
select throws_ok($$insert into public.venue_members (venue_id, user_id, role) values ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a4', 'admin')$$, '42501', null, 'stranger cannot make themself admin');
reset role;

-- venue admin
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a2', true);
select is((select count(*)::int from public.venue_members), 2, 'venue admin sees all members of own venue');
select is(public.is_venue_member('00000000-0000-0000-0000-0000000000b1', 'admin'), true, 'is_venue_member admin true');
select is(public.is_venue_member('00000000-0000-0000-0000-0000000000b1', 'host'), false, 'is_venue_member wrong role false');
select throws_ok($$insert into public.venue_members (venue_id, user_id, role) values ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a4', 'host')$$, '42501', null, 'venue admin cannot write venue_members');
reset role;

-- host sees only own membership row
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a3', true);
select is((select count(*)::int from public.venue_members), 1, 'host sees only own membership');
reset role;

-- superadmin
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a1', true);
select is((select count(*)::int from public.venues), 2, 'superadmin sees unpublished venues');
select lives_ok($$insert into public.venues (slug, name) values ('z', 'z')$$, 'superadmin can create venues');
select lives_ok($$insert into public.venue_members (venue_id, user_id, role) values ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a4', 'host')$$, 'superadmin can write venue_members');
reset role;

select * from finish();
rollback;
