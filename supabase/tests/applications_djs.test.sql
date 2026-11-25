-- pgTAP: account applications, owner role + invites, DJ profiles, lineup links, media buckets.
begin;
select plan(44);

insert into auth.users (id, instance_id, aud, role, is_anonymous, email) values
  ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'applicant@example.com'),
  ('00000000-0000-0000-0000-0000000000f2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'dj@example.com'),
  ('00000000-0000-0000-0000-0000000000f3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true, null),
  ('00000000-0000-0000-0000-0000000000f4', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'root@example.com'),
  ('00000000-0000-0000-0000-0000000000f5', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'other-owner@example.com'),
  ('00000000-0000-0000-0000-0000000000f6', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'invitee@example.com'),
  ('00000000-0000-0000-0000-0000000000f7', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'wrong@example.com'),
  ('00000000-0000-0000-0000-0000000000f8', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'dj2@example.com');

update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000f4';

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000a1', 'app-venue-1', 'App Venue 1', true),
  ('00000000-0000-0000-0000-0000000000a2', 'app-venue-2', 'App Venue 2', true);
insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-0000000000f5', 'owner'),
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000f8', 'owner');
insert into public.events (id, venue_id, title, starts_at, status) values
  ('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-0000000000a1', 'Night', now() + interval '1 day', 'published'),
  ('00000000-0000-0000-0000-0000000000a4', '00000000-0000-0000-0000-0000000000a2', 'Other night', now() + interval '1 day', 'published');
insert into public.djs (id, stage_name, slug, is_published) values
  ('00000000-0000-0000-0000-0000000000d1', 'Unclaimed', 'unclaimed', true),
  ('00000000-0000-0000-0000-0000000000d9', 'Hidden', 'hidden', false);

-- anonymous guest and anon role cannot apply
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f3","is_anonymous":true}', true);
select throws_ok($$insert into public.account_applications (kind, payload) values ('dj', '{"stage_name":"Guest DJ"}')$$,
  '42501', null, 'anonymous guest cannot apply');
select throws_ok($$select public.accept_venue_invite('x')$$, '42501', null, 'anonymous guest cannot accept an invite');

set local role anon;
select throws_ok($$insert into public.account_applications (kind, payload) values ('dj', '{"stage_name":"Anon DJ"}')$$,
  '42501', null, 'anon role cannot apply');
select throws_ok($$select public.approve_application('00000000-0000-0000-0000-000000000000')$$, '42501', null, 'anon cannot call approve');
reset role;

-- confirmed applicant
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f1","is_anonymous":false}', true);
select lives_ok($$insert into public.account_applications (id, kind, payload) values ('00000000-0000-0000-0000-0000000000b1', 'venue', '{"name":"My Club","address":"Kyiv"}')$$,
  'confirmed user applies for a venue');
select throws_ok($$insert into public.account_applications (kind, payload) values ('venue', '{"name":"My Club 2"}')$$,
  '23505', null, 'one pending application per user and kind');
select throws_ok($$insert into public.account_applications (kind, payload) values ('dj', '{"stage_name":"x"}')$$,
  '23514', null, 'invalid payload is rejected');
select throws_ok($$insert into public.account_applications (user_id, kind, payload) values ('00000000-0000-0000-0000-0000000000f2', 'dj', '{"stage_name":"Fake"}')$$,
  '42501', null, 'cannot apply on behalf of another user');
select throws_ok($$insert into public.account_applications (kind, payload, status) values ('dj', '{"stage_name":"Sneaky"}', 'approved')$$,
  '42501', null, 'cannot set status on insert');
select throws_ok($$update public.account_applications set status = 'approved' where id = '00000000-0000-0000-0000-0000000000b1'$$,
  '42501', null, 'applicant cannot approve by update');
select throws_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000b1')$$,
  '42501', null, 'non-superadmin cannot approve');
select is((select count(*)::int from public.account_applications), 1, 'applicant reads own application');
update public.venues set name = 'Hacked' where id = '00000000-0000-0000-0000-0000000000a1';
select is((select name from public.venues where id = '00000000-0000-0000-0000-0000000000a1'), 'App Venue 1', 'applicant cannot edit a venue before approval');
reset role;

-- DJ applicant
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f2","is_anonymous":false}', true);
select lives_ok($$insert into public.account_applications (id, kind, payload) values ('00000000-0000-0000-0000-0000000000b2', 'dj', '{"stage_name":"DJ Нічка"}')$$,
  'confirmed user applies as DJ');
select is((select count(*)::int from public.account_applications), 1, 'does not see other users applications');
reset role;

-- superadmin applies and cannot approve themself
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f4","is_anonymous":false}', true);
select lives_ok($$insert into public.account_applications (id, kind, payload) values ('00000000-0000-0000-0000-0000000000b3', 'dj', '{"stage_name":"Boss DJ"}')$$,
  'superadmin can apply');
select throws_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000b3')$$,
  '42501', null, 'superadmin cannot approve their own application');
select is((select count(*)::int from public.account_applications), 3, 'superadmin reads all applications');

-- approve venue + DJ
select lives_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000b1')$$, 'superadmin approves the venue application');
select is((select role from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000f1'), 'owner', 'applicant became owner of the new venue');
select is((select count(*)::int from public.venues where name = 'My Club' and not is_published), 1, 'new venue is created unpublished');
select throws_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000b1')$$,
  '22023', null, 'an application cannot be decided twice');
select lives_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000b2')$$, 'superadmin approves the DJ application');
select is((select count(*)::int from public.djs where user_id = '00000000-0000-0000-0000-0000000000f2' and is_published), 1, 'DJ profile created and published');
select is((select is_dj from public.profiles where id = '00000000-0000-0000-0000-0000000000f2'), true, 'profile marked as DJ');
select throws_ok($$select public.reject_application('00000000-0000-0000-0000-0000000000b3', '')$$,
  '22023', null, 'reject needs a reason');
reset role;

-- DJ edits own profile only
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f2","is_anonymous":false}', true);
select lives_ok($$update public.djs set bio = 'Techno' where user_id = '00000000-0000-0000-0000-0000000000f2'$$, 'DJ edits own bio');
select throws_ok($$update public.djs set is_published = false where user_id = '00000000-0000-0000-0000-0000000000f2'$$,
  '42501', null, 'DJ cannot unpublish / change publishing');
update public.djs set bio = 'Hijack' where id = '00000000-0000-0000-0000-0000000000d1';
select is((select bio from public.djs where id = '00000000-0000-0000-0000-0000000000d1'), null, 'DJ cannot edit another DJ');
select is((select count(*)::int from public.djs where id = '00000000-0000-0000-0000-0000000000d9'), 0, 'unpublished DJ hidden from others');
reset role;

-- owner of venue 1 invites staff; owner of venue 2 cannot
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f5","is_anonymous":false}', true);
select throws_ok($$select public.create_venue_invite('00000000-0000-0000-0000-0000000000a1', 'invitee@example.com', 'host')$$,
  '42501', null, 'owner of another venue cannot invite');
select throws_ok($$insert into public.djs (stage_name, slug) values ('Evil', 'evil')$$, '42501', null, 'only superadmin creates DJ profiles directly');
select throws_ok($$insert into public.event_djs (event_id, dj_id) values ('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-0000000000d1')$$,
  '42501', null, 'cannot add a DJ to another venue event');
select lives_ok($$insert into public.event_djs (event_id, dj_id, position) values ('00000000-0000-0000-0000-0000000000a4', '00000000-0000-0000-0000-0000000000d1', 0)$$,
  'owner adds a DJ to own event lineup');
select throws_ok($$update public.venues set is_published = false where id = '00000000-0000-0000-0000-0000000000a2'$$,
  '42501', null, 'owner cannot change publishing');
reset role;

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f8","is_anonymous":false}', true);
create temp table invite_token (t text);
grant all on invite_token to authenticated;
insert into invite_token select public.create_venue_invite('00000000-0000-0000-0000-0000000000a1', 'Invitee@Example.com', 'host');
select throws_ok($$select token_hash from public.venue_invites$$, '42501', null, 'token hash is not readable by clients');
select is((select count(*)::int from public.venue_invites where venue_id = '00000000-0000-0000-0000-0000000000a1'), 1, 'owner sees the open invite');
reset role;

-- invite acceptance: wrong email fails, right email works once
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f7","is_anonymous":false}', true);
select throws_ok($$select public.accept_venue_invite((select t from invite_token))$$, '22023', null, 'a different user cannot use the invite');
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f6","is_anonymous":false}', true);
select lives_ok($$select public.accept_venue_invite((select t from invite_token))$$, 'invited user accepts');
select throws_ok($$select public.accept_venue_invite((select t from invite_token))$$, '22023', null, 'invite token is single-use');
select is((select role from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000f6'), 'host', 'invitee became host');
reset role;

-- owner removes a host; stranger cannot
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f5","is_anonymous":false}', true);
delete from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000f6';
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f8","is_anonymous":false}', true);
select is((select count(*)::int from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000f6'), 1, 'other venue owner cannot remove a member');
delete from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000f6';
select is((select count(*)::int from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000f6'), 0, 'owner removes a host');
reset role;

-- reject
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f4","is_anonymous":false}', true);
select lives_ok($$select public.reject_application('00000000-0000-0000-0000-0000000000b3', 'Not a real DJ')$$, 'superadmin rejects with a reason');
reset role;

select * from finish();
rollback;
