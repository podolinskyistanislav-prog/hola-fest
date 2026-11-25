-- pgTAP: offer builder model (#261): validation, visibility, lifecycle RPCs, stats, claim window.
begin;
select plan(47);

delete from public.venues;

insert into auth.users (id, instance_id, aud, role)
select ('00000000-0000-0000-0000-0000000000' || n)::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'
from (values ('a2'), ('a3'), ('a4'), ('a5'), ('a6')) t(n);

-- a2 admin of A, a3 host of A, a4 stranger, a5 admin of B, a6 guest who holds a claim
insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'a', 'A', true),
  ('00000000-0000-0000-0000-0000000000b2', 'b', 'B', true);

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a2', 'admin'),
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a3', 'host'),
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a5', 'admin');

insert into public.events (id, venue_id, title, starts_at, ends_at, status) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'A night',
   now() + interval '1 day', now() + interval '1 day 6 hours', 'published');

-- Legacy-style inserts (only the old columns) keep working.
insert into public.offers (id, event_id, title, is_active, valid_until) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c1', 'legacy live', true, null),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000c1', 'legacy off', false, null);

select is((select kind || '/' || status || '/' || venue_id::text from public.offers where id = '00000000-0000-0000-0000-0000000000d1'),
  'custom/live/00000000-0000-0000-0000-0000000000b1', 'legacy offer: kind custom, live, venue taken from the event');
select is((select status from public.offers where id = '00000000-0000-0000-0000-0000000000d2'), 'paused', 'legacy inactive offer is paused');

-- Legacy toggles stay in sync.
update public.offers set is_active = false where id = '00000000-0000-0000-0000-0000000000d1';
select is((select status from public.offers where id = '00000000-0000-0000-0000-0000000000d1'), 'paused', 'is_active=false pauses');
update public.offers set is_active = true where id = '00000000-0000-0000-0000-0000000000d1';
select is((select status from public.offers where id = '00000000-0000-0000-0000-0000000000d1'), 'live', 'is_active=true resumes');
update public.offers set status = 'ended' where id = '00000000-0000-0000-0000-0000000000d1';
select is((select is_active from public.offers where id = '00000000-0000-0000-0000-0000000000d1'), false, 'ended offer is not active');
update public.offers set status = 'live' where id = '00000000-0000-0000-0000-0000000000d1';

-- Value validation per kind.
select throws_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'percent_off', '0')$$,
  '22023', null, 'percent 0 rejected');
select throws_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'percent_off', '101')$$,
  '22023', null, 'percent 101 rejected');
select throws_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'percent_off', null)$$,
  '22023', null, 'percent without value rejected');
select throws_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'amount_off', '0')$$,
  '22023', null, 'amount 0 rejected');
select throws_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'free_entry_until', '25:00')$$,
  '22023', null, 'bad time rejected');
select throws_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'gift', '  ')$$,
  '22023', null, 'empty gift rejected');
select lives_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'percent_off', '20')$$,
  'percent 20 accepted');
select lives_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'amount_off', '150.50')$$,
  'amount 150.50 accepted');
select lives_ok($$insert into public.offers (event_id, title, kind, value) values ('00000000-0000-0000-0000-0000000000c1', 't', 'free_entry_until', '23:00')$$,
  'free entry until 23:00 accepted');

-- Limits and window.
select throws_ok($$insert into public.offers (event_id, title, max_claims) values ('00000000-0000-0000-0000-0000000000c1', 't', 0)$$,
  '23514', null, 'max_claims 0 rejected');
select throws_ok($$insert into public.offers (event_id, title, per_user_limit) values ('00000000-0000-0000-0000-0000000000c1', 't', 0)$$,
  '23514', null, 'per_user_limit 0 rejected');
select throws_ok($$insert into public.offers (event_id, title, starts_at, ends_at) values ('00000000-0000-0000-0000-0000000000c1', 't', now() + interval '2 hours', now() + interval '1 hour')$$,
  '23514', null, 'window ending before it starts rejected');
select throws_ok($$insert into public.offers (event_id, title, ends_at) values ('00000000-0000-0000-0000-0000000000c1', 't', now() + interval '3 days')$$,
  '22023', null, 'window ending after the event rejected');
select throws_ok($$insert into public.offers (event_id, title, valid_until) values ('00000000-0000-0000-0000-0000000000c1', 't', now() + interval '3 days')$$,
  '22023', null, 'legacy valid_until after the event rejected');
select lives_ok($$insert into public.offers (event_id, title, starts_at, ends_at) values ('00000000-0000-0000-0000-0000000000c1', 't', now() + interval '1 hour', now() + interval '1 day 2 hours')$$,
  'window opening before the event and ending inside it accepted');

-- Visibility for guests: only live offers.
insert into public.offers (id, venue_id, title, kind, value, status, starts_at, ends_at) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000b1', 'venue live', 'gift', 'shot', 'live', null, null),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-0000000000b1', 'venue draft', 'custom', null, 'draft', null, null),
  ('00000000-0000-0000-0000-0000000000e3', '00000000-0000-0000-0000-0000000000b1', 'venue future', 'custom', null, 'scheduled', now() + interval '1 day', null),
  ('00000000-0000-0000-0000-0000000000e4', '00000000-0000-0000-0000-0000000000b1', 'venue expired', 'custom', null, 'live', now() - interval '2 days', now() - interval '1 day'),
  ('00000000-0000-0000-0000-0000000000e5', '00000000-0000-0000-0000-0000000000b1', 'venue paused', 'custom', null, 'paused', null, null);

select is((select public.offer_effective_status(o) from public.offers o where id = '00000000-0000-0000-0000-0000000000e3'), 'scheduled', 'future window is scheduled');
select is((select public.offer_effective_status(o) from public.offers o where id = '00000000-0000-0000-0000-0000000000e4'), 'ended', 'past window is ended');

insert into public.claims (offer_id, user_id, token_hash, status) values
  ('00000000-0000-0000-0000-0000000000e4', '00000000-0000-0000-0000-0000000000a6', repeat('a', 64), 'issued'),
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000a6', repeat('b', 64), 'redeemed');

set local role anon;
select is((select count(*)::int from public.offers where venue_id = '00000000-0000-0000-0000-0000000000b1' and event_id is null), 1,
  'anon sees only the live venue offer (not draft, scheduled, ended, paused)');
select is((select count(*)::int from public.offers where event_id is not null and status in ('paused', 'draft', 'ended')), 0,
  'anon sees no paused / draft / ended event offers');
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a6', true);
select is((select count(*)::int from public.offers where id = '00000000-0000-0000-0000-0000000000e4'), 1,
  'a guest keeps seeing an ended offer they hold a claim on');
select is((select count(*)::int from public.offers where id = '00000000-0000-0000-0000-0000000000e2'), 0,
  'a guest does not see a draft');
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a2', true);
select is((select count(*)::int from public.offers where venue_id = '00000000-0000-0000-0000-0000000000b1' and event_id is null), 5,
  'venue admin sees every offer of the venue');
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a5', true);
select is((select count(*)::int from public.offers where id = '00000000-0000-0000-0000-0000000000e2'), 0,
  'admin of another venue does not see a draft');
reset role;

-- Writes: owner/admin of that venue only.
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a2', true);
select lives_ok($$insert into public.offers (venue_id, title) values ('00000000-0000-0000-0000-0000000000b1', 'by admin A')$$,
  'admin creates a venue offer without an event');
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a5', true);
select throws_ok($$insert into public.offers (venue_id, title) values ('00000000-0000-0000-0000-0000000000b1', 'by admin B')$$,
  '42501', null, 'admin of another venue cannot create a venue offer');
select throws_ok($$insert into public.offers (venue_id, event_id, title) values ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000c1', 'by admin B')$$,
  '42501', null, 'passing own venue_id with a foreign event does not help');
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a3', true);
select throws_ok($$insert into public.offers (venue_id, title) values ('00000000-0000-0000-0000-0000000000b1', 'by host')$$,
  '42501', null, 'host cannot create an offer');
reset role;

-- Lifecycle RPCs.
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a2', true);
select is((select status from public.pause_offer('00000000-0000-0000-0000-0000000000e1')), 'paused', 'admin pauses a live offer');
select is((select is_active from public.offers where id = '00000000-0000-0000-0000-0000000000e1'), false, 'paused offer is inactive');
select throws_ok($$select public.pause_offer('00000000-0000-0000-0000-0000000000e1')$$, '22023', null, 'cannot pause twice');
select is((select status from public.resume_offer('00000000-0000-0000-0000-0000000000e1')), 'live', 'admin resumes');
select is((select status || '/' || venue_id::text from public.duplicate_offer('00000000-0000-0000-0000-0000000000e1')),
  'draft/00000000-0000-0000-0000-0000000000b1', 'admin duplicates into a draft of the same venue');
select is((select status from public.end_offer('00000000-0000-0000-0000-0000000000e1')), 'ended', 'admin ends an offer');
select throws_ok($$select public.resume_offer('00000000-0000-0000-0000-0000000000e1')$$, '22023', null, 'an ended offer cannot be resumed');

select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a5', true);
select throws_ok($$select public.pause_offer('00000000-0000-0000-0000-0000000000e5')$$, 'P0002', null, 'admin of another venue cannot pause');
select throws_ok($$select public.duplicate_offer('00000000-0000-0000-0000-0000000000e5')$$, 'P0002', null, 'admin of another venue cannot duplicate');
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a3', true);
select throws_ok($$select public.end_offer('00000000-0000-0000-0000-0000000000e5')$$, 'P0002', null, 'host cannot end an offer');
reset role;

set local role anon;
select throws_ok($$select public.pause_offer('00000000-0000-0000-0000-0000000000e5')$$, '42501', null, 'anon cannot call pause_offer');
select throws_ok($$select * from public.offer_stats$$, '42501', null, 'anon cannot read offer stats');
reset role;

-- Stats: claims and redemptions, venue admins only.
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a2', true);
select is((select claims || '/' || redemptions from public.offer_stats where offer_id = '00000000-0000-0000-0000-0000000000e1'), '1/1',
  'admin sees claims and redemptions per offer');
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a4', true);
select is((select count(*)::int from public.offer_stats), 0, 'stranger sees no stats');
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a6', true);
select is((select count(*)::int from public.offer_stats), 0, 'a guest with a claim sees no stats');
reset role;

select * from finish();
rollback;
