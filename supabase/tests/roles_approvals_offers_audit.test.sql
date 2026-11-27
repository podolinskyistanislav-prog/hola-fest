-- pgTAP: QA audit (#267) of roles, approvals, invites and the offer builder.
-- Each case is an attack from the issue: self-approval, editing another venue's offers or profile,
-- invite token abuse, a host escalating to admin, a DJ editing another DJ, window / limit bypass via
-- direct API calls, and claims outside the offer window.
begin;
select * from no_plan();

delete from public.venues;

create function pg_temp.as_user(p_id uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', p_id, 'is_anonymous', false)::text, true);
$$;

insert into auth.users (id, instance_id, aud, role, is_anonymous, email) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'owner-a@example.com'),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'admin-a@example.com'),
  ('00000000-0000-0000-0000-0000000000e3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'host-a@example.com'),
  ('00000000-0000-0000-0000-0000000000e4', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'owner-b@example.com'),
  ('00000000-0000-0000-0000-0000000000e5', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'stranger@example.com'),
  ('00000000-0000-0000-0000-0000000000e6', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'root@example.com'),
  ('00000000-0000-0000-0000-0000000000e7', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'invitee@example.com'),
  ('00000000-0000-0000-0000-0000000000e8', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'dj-one@example.com'),
  ('00000000-0000-0000-0000-0000000000e9', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'dj-two@example.com');

update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000e6';

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000a1', 'qa-a', 'QA A', true),
  ('00000000-0000-0000-0000-0000000000a2', 'qa-b', 'QA B', true);
insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000e1', 'owner'),
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000e2', 'admin'),
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000e3', 'host'),
  ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-0000000000e4', 'owner');
insert into public.events (id, venue_id, title, starts_at, ends_at, status) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a1', 'A night',
   now() + interval '1 day', now() + interval '1 day 6 hours', 'published'),
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a2', 'B night',
   now() + interval '1 day', now() + interval '1 day 6 hours', 'published');
insert into public.offers (id, venue_id, title, status, max_claims, per_user_limit) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000a1', 'A offer', 'live', 5, 1),
  ('00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-0000000000a2', 'B offer', 'live', 5, 1);
insert into public.djs (id, user_id, stage_name, slug, is_published) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000e8', 'DJ One', 'dj-one', true),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000e9', 'DJ Two', 'dj-two', true);

-- ---------------------------------------------------------------- self-approval
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e6');
set local role authenticated;
insert into public.account_applications (id, kind, payload)
  values ('00000000-0000-0000-0000-0000000000f1', 'venue', '{"name":"Root Club"}');
select throws_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000f1')$$,
  '42501', null, 'superadmin cannot approve their own application');
reset role;

select pg_temp.as_user('00000000-0000-0000-0000-0000000000e5');
set local role authenticated;
insert into public.account_applications (id, kind, payload)
  values ('00000000-0000-0000-0000-0000000000f2', 'dj',
          '{"stage_name":"Takeover","dj_id":"00000000-0000-0000-0000-0000000000d1"}');
select throws_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000f2')$$,
  '42501', null, 'applicant cannot approve their own application');
select throws_ok($$select public.reject_application('00000000-0000-0000-0000-0000000000f2', 'no')$$,
  '42501', null, 'applicant cannot reject');
select throws_ok($$update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000e5'$$,
  '42501', null, 'user cannot make themselves superadmin');
select throws_ok($$update public.profiles set is_dj = true where id = '00000000-0000-0000-0000-0000000000e5'$$,
  '42501', null, 'user cannot mark themselves as DJ without approval');
select throws_ok($$delete from public.account_applications where id = '00000000-0000-0000-0000-0000000000f2'$$,
  '42501', null, 'applicant cannot delete an application');
reset role;

select pg_temp.as_user('00000000-0000-0000-0000-0000000000e4');
set local role authenticated;
select throws_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000f2')$$,
  '42501', null, 'venue owner cannot approve applications');
select is((select count(*)::int from public.account_applications), 0, 'a venue owner does not see other users applications');
reset role;

-- An approval cannot hijack a DJ profile that already belongs to someone else.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e6');
set local role authenticated;
select throws_ok($$select public.approve_application('00000000-0000-0000-0000-0000000000f2')$$,
  '22023', null, 'approval cannot take over a DJ profile owned by another user');
reset role;

-- ------------------------------------------------- editing another venue's data
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e1');
set local role authenticated;
update public.venues set name = 'Hacked' where id = '00000000-0000-0000-0000-0000000000a2';
update public.offers set title = 'Hacked' where id = '00000000-0000-0000-0000-0000000000c2';
delete from public.offers where id = '00000000-0000-0000-0000-0000000000c2';
select throws_ok($$insert into public.offers (venue_id, title) values ('00000000-0000-0000-0000-0000000000a2', 'planted')$$,
  '42501', null, 'owner of A cannot create an offer for venue B');
select throws_ok($$update public.offers set venue_id = '00000000-0000-0000-0000-0000000000a2' where id = '00000000-0000-0000-0000-0000000000c1'$$,
  '42501', null, 'owner of A cannot move an offer into venue B');
select throws_ok($$update public.offers set event_id = '00000000-0000-0000-0000-0000000000b2' where id = '00000000-0000-0000-0000-0000000000c1'$$,
  '42501', null, 'cannot attach an offer to the event of another venue');
select throws_ok($$select public.pause_offer('00000000-0000-0000-0000-0000000000c2')$$,
  'P0002', null, 'cannot pause another venue offer');
select throws_ok($$select public.end_offer('00000000-0000-0000-0000-0000000000c2')$$,
  'P0002', null, 'cannot end another venue offer');
select throws_ok($$select public.duplicate_offer('00000000-0000-0000-0000-0000000000c2')$$,
  'P0002', null, 'cannot duplicate another venue offer');
select throws_ok($$insert into public.venue_members (venue_id, user_id, role) values ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-0000000000e1', 'owner')$$,
  '42501', null, 'owner of A cannot add themselves to venue B');
reset role;
select is((select name from public.venues where id = '00000000-0000-0000-0000-0000000000a2'), 'QA B', 'venue B name unchanged');
select is((select title || '/' || status from public.offers where id = '00000000-0000-0000-0000-0000000000c2'), 'B offer/live', 'offer B unchanged and not deleted');

-- A stranger cannot touch offers or venues.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e5');
set local role authenticated;
update public.offers set max_claims = 100000, per_user_limit = 99 where id = '00000000-0000-0000-0000-0000000000c1';
update public.venues set name = 'Hacked' where id = '00000000-0000-0000-0000-0000000000a1';
select throws_ok($$select public.resume_offer('00000000-0000-0000-0000-0000000000c1')$$, 'P0002', null, 'stranger cannot resume an offer');
reset role;
select is((select max_claims || '/' || per_user_limit from public.offers where id = '00000000-0000-0000-0000-0000000000c1'), '5/1', 'stranger cannot raise offer limits');
select is((select name from public.venues where id = '00000000-0000-0000-0000-0000000000a1'), 'QA A', 'stranger cannot rename a venue');

-- ------------------------------------------------------ host cannot escalate
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e3');
set local role authenticated;
update public.venue_members set role = 'admin' where user_id = '00000000-0000-0000-0000-0000000000e3';
select throws_ok($$insert into public.venue_members (venue_id, user_id, role) values ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000e5', 'admin')$$,
  '42501', null, 'host cannot add an admin');
select throws_ok($$select public.create_venue_invite('00000000-0000-0000-0000-0000000000a1', 'friend@example.com', 'admin')$$,
  '42501', null, 'host cannot invite an admin');
update public.offers set title = 'Hacked' where id = '00000000-0000-0000-0000-0000000000c1';
update public.venues set name = 'Hacked' where id = '00000000-0000-0000-0000-0000000000a1';
select throws_ok($$select public.pause_offer('00000000-0000-0000-0000-0000000000c1')$$, 'P0002', null, 'host cannot pause an offer');
select throws_ok($$insert into public.offers (venue_id, title) values ('00000000-0000-0000-0000-0000000000a1', 'host offer')$$,
  '42501', null, 'host cannot create an offer');
reset role;
select is((select role from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000e3'), 'host', 'host cannot promote themselves to admin');
select is((select title from public.offers where id = '00000000-0000-0000-0000-0000000000c1'), 'A offer', 'host cannot edit offers');
select is((select name from public.venues where id = '00000000-0000-0000-0000-0000000000a1'), 'QA A', 'host cannot edit the venue');

-- An admin (not owner) cannot invite, cannot grant owner, cannot remove the owner.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e2');
set local role authenticated;
select throws_ok($$select public.create_venue_invite('00000000-0000-0000-0000-0000000000a1', 'friend@example.com', 'host')$$,
  '42501', null, 'admin (not owner) cannot invite');
update public.venue_members set role = 'owner' where user_id = '00000000-0000-0000-0000-0000000000e2';
delete from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000e1';
reset role;
select is((select count(*)::int from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000e1'), 1, 'admin cannot remove the owner');
select is((select role from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000e2'), 'admin', 'admin cannot promote themselves to owner');

-- An invite cannot carry the owner role.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e1');
set local role authenticated;
select throws_ok($$select public.create_venue_invite('00000000-0000-0000-0000-0000000000a1', 'friend@example.com', 'owner')$$,
  '22023', null, 'an invite cannot carry the owner role');
reset role;

-- --------------------------------------------------------------- invite tokens
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e1');
set local role authenticated;
create temp table qa_tokens (name text primary key, token text);
grant all on qa_tokens to authenticated;
insert into qa_tokens select 'ok', public.create_venue_invite('00000000-0000-0000-0000-0000000000a1', 'invitee@example.com', 'host');
reset role;

select is((select count(*)::int from public.venue_invites where token_hash = (select token from qa_tokens where name = 'ok')), 0,
  'the raw token is not stored');
select is((select count(*)::int from public.venue_invites where token_hash = encode(sha256(convert_to((select token from qa_tokens where name = 'ok'), 'UTF8')), 'hex')), 1,
  'only the sha256 of the token is stored');

select pg_temp.as_user('00000000-0000-0000-0000-0000000000e5');
set local role authenticated;
select throws_ok($$select public.accept_venue_invite((select token from qa_tokens where name = 'ok'))$$,
  '22023', null, 'a leaked token is useless to a user with another email');
select throws_ok($$select public.accept_venue_invite('not-a-token')$$, '22023', null, 'a guessed token fails');
select throws_ok($$select public.accept_venue_invite(null)$$, '22023', null, 'null token fails');
reset role;

select pg_temp.as_user('00000000-0000-0000-0000-0000000000e7');
set local role authenticated;
select lives_ok($$select public.accept_venue_invite((select token from qa_tokens where name = 'ok'))$$, 'the invited user accepts');
select throws_ok($$select public.accept_venue_invite((select token from qa_tokens where name = 'ok'))$$,
  '22023', null, 'a used token cannot be reused, even by the same user');
reset role;
select is((select role from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000e7'), 'host', 'invitee is a host, not more');

-- Expired invite.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e1');
set local role authenticated;
insert into qa_tokens select 'expired', public.create_venue_invite('00000000-0000-0000-0000-0000000000a1', 'stranger@example.com', 'admin');
reset role;
update public.venue_invites set expires_at = now() - interval '1 minute' where email = 'stranger@example.com';
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e5');
set local role authenticated;
select throws_ok($$select public.accept_venue_invite((select token from qa_tokens where name = 'expired'))$$,
  '22023', null, 'an expired invite cannot be accepted');
reset role;
select is((select count(*)::int from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000e5'), 0, 'expired invite gave no rights');

-- An invite never downgrades an owner.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e1');
set local role authenticated;
insert into qa_tokens select 'self', public.create_venue_invite('00000000-0000-0000-0000-0000000000a1', 'owner-a@example.com', 'host');
select lives_ok($$select public.accept_venue_invite((select token from qa_tokens where name = 'self'))$$, 'owner accepts an invite for own venue');
reset role;
select is((select role from public.venue_members where user_id = '00000000-0000-0000-0000-0000000000e1'), 'owner', 'owner stays owner');

-- Invites and members of another venue are invisible; nobody reads token hashes.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e4');
set local role authenticated;
select is((select count(*)::int from public.venue_invites), 0, 'owner of B sees no invites of A');
select throws_ok($$select token_hash from public.venue_invites$$, '42501', null, 'token hashes are not readable');
select is((select count(*)::int from public.venue_members where venue_id = '00000000-0000-0000-0000-0000000000a1'), 0, 'owner of B does not see members of A');
reset role;

-- ------------------------------------------------------ a DJ editing another DJ
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e8');
set local role authenticated;
update public.djs set bio = 'Hacked' where id = '00000000-0000-0000-0000-0000000000d2';
delete from public.djs where id = '00000000-0000-0000-0000-0000000000d2';
update public.djs set user_id = '00000000-0000-0000-0000-0000000000e8' where id = '00000000-0000-0000-0000-0000000000d2';
select throws_ok($$update public.djs set user_id = '00000000-0000-0000-0000-0000000000e9' where id = '00000000-0000-0000-0000-0000000000d1'$$,
  '42501', null, 'DJ cannot hand their profile to someone else');
select throws_ok($$update public.djs set slug = 'taken-over' where id = '00000000-0000-0000-0000-0000000000d1'$$,
  '42501', null, 'DJ cannot change their slug');
select throws_ok($$insert into public.event_djs (event_id, dj_id) values ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000d1')$$,
  '42501', null, 'DJ cannot put themselves on a venue lineup');
select throws_ok($$select public.pause_offer('00000000-0000-0000-0000-0000000000c1')$$, 'P0002', null, 'DJ cannot manage offers');
reset role;
select is((select bio from public.djs where id = '00000000-0000-0000-0000-0000000000d2'), null, 'DJ Two profile unchanged');
select is((select count(*)::int from public.djs where id = '00000000-0000-0000-0000-0000000000d2'), 1, 'DJ Two profile not deleted');
select is((select user_id from public.djs where id = '00000000-0000-0000-0000-0000000000d2'), '00000000-0000-0000-0000-0000000000e9'::uuid, 'DJ cannot claim another DJ profile');

-- --------------------------------- window and limit bypass through direct API calls
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e1');
set local role authenticated;
select throws_ok($$insert into public.offers (event_id, venue_id, title, starts_at, ends_at)
  values ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a1', 'too long', now(), now() + interval '3 days')$$,
  '22023', null, 'offer window cannot outlive the event');
select throws_ok($$insert into public.offers (venue_id, title, starts_at, ends_at)
  values ('00000000-0000-0000-0000-0000000000a1', 'backwards', now() + interval '2 hours', now() + interval '1 hour')$$,
  '23514', null, 'offer window must end after it starts');
select throws_ok($$insert into public.offers (venue_id, title, kind, value)
  values ('00000000-0000-0000-0000-0000000000a1', 'free beer', 'percent_off', '500')$$,
  '22023', null, 'percent over 100 is rejected');
select throws_ok($$insert into public.offers (venue_id, title, per_user_limit)
  values ('00000000-0000-0000-0000-0000000000a1', 'unlimited', 0)$$,
  '23514', null, 'per-user limit must be positive');
select throws_ok($$insert into public.offers (venue_id, title, status)
  values ('00000000-0000-0000-0000-0000000000a1', 'bad status', 'hacked')$$,
  '23514', null, 'unknown status is rejected');
reset role;

-- Claims and redemptions are server-only: no direct writes, no direct RPC.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e5');
set local role authenticated;
select throws_ok($$insert into public.claims (offer_id, user_id, token_hash) values ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000e5', repeat('a', 64))$$,
  '42501', null, 'a user cannot insert a claim directly');
select throws_ok($$select public.claim_offer('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000e5', repeat('a', 64))$$,
  '42501', null, 'a user cannot call claim_offer directly');
select throws_ok($$select public.redeem_claim(repeat('a', 64), '00000000-0000-0000-0000-0000000000e5')$$,
  '42501', null, 'a user cannot call redeem_claim directly');
reset role;
set local role anon;
select throws_ok($$select public.claim_offer('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000e5', repeat('a', 64))$$,
  '42501', null, 'anon cannot call claim_offer');
select throws_ok($$select public.pause_offer('00000000-0000-0000-0000-0000000000c1')$$,
  '42501', null, 'anon cannot call lifecycle RPCs');
reset role;

-- A claim cannot be edited by its owner (status and redemption stay server-side).
select is(public.claim_offer('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000e5', repeat('b', 64)), 'ok', 'first claim works');
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e5');
set local role authenticated;
select throws_ok($$update public.claims set status = 'void' where user_id = '00000000-0000-0000-0000-0000000000e5'$$,
  '42501', null, 'a user cannot change their own claim');
select throws_ok($$delete from public.claims where user_id = '00000000-0000-0000-0000-0000000000e5'$$,
  '42501', null, 'a user cannot delete their own claim');
reset role;

-- Limits hold on the server: per-user limit, then window and status.
select is(public.claim_offer('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000e5', repeat('c', 64)),
  'limit_reached', 'second claim by the same user is refused');

insert into public.offers (id, venue_id, title, status, starts_at, ends_at) values
  ('00000000-0000-0000-0000-0000000000c3', '00000000-0000-0000-0000-0000000000a1', 'future', 'scheduled', now() + interval '1 hour', null),
  ('00000000-0000-0000-0000-0000000000c4', '00000000-0000-0000-0000-0000000000a1', 'past', 'live', now() - interval '2 hours', now() - interval '1 hour'),
  ('00000000-0000-0000-0000-0000000000c5', '00000000-0000-0000-0000-0000000000a1', 'draft', 'draft', null, null);
select is(public.claim_offer('00000000-0000-0000-0000-0000000000c3', '00000000-0000-0000-0000-0000000000e5', repeat('d', 64)),
  'unavailable', 'claim before the window opens is refused');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000c4', '00000000-0000-0000-0000-0000000000e5', repeat('e', 64)),
  'unavailable', 'claim after the window closes is refused');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000c5', '00000000-0000-0000-0000-0000000000e5', repeat('f', 64)),
  'unavailable', 'claim on a draft is refused');

-- A host cannot reopen an ended window through the legacy columns.
select pg_temp.as_user('00000000-0000-0000-0000-0000000000e3');
set local role authenticated;
update public.offers set is_active = true, ends_at = now() + interval '5 days' where id = '00000000-0000-0000-0000-0000000000c4';
reset role;
select is((select (ends_at < now())::text from public.offers where id = '00000000-0000-0000-0000-0000000000c4'),
  'true', 'host cannot reopen an ended window');

select * from finish();
rollback;
