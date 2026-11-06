-- pgTAP: redeem_claim results, atomicity and isolation.
begin;
select plan(14);

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true),
  ('00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false),
  ('00000000-0000-0000-0000-0000000000c3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false),
  ('00000000-0000-0000-0000-0000000000c4', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false);
insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000d1', 'rc-venue-1', 'V1', true),
  ('00000000-0000-0000-0000-0000000000d2', 'rc-venue-2', 'V2', true);
insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c2', 'host'),
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c4', 'admin'),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000c3', 'host');
insert into public.events (id, venue_id, title, starts_at, status)
values ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000d1', 'E', now() + interval '1 day', 'published');
insert into public.offers (id, event_id, title, per_user_limit, valid_until, is_active) values
  ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000e1', 'live', 5, null, true),
  ('00000000-0000-0000-0000-0000000000f2', '00000000-0000-0000-0000-0000000000e1', 'expired', 5, now() - interval '1 hour', true),
  ('00000000-0000-0000-0000-0000000000f3', '00000000-0000-0000-0000-0000000000e1', 'off', 5, null, false);
insert into public.claims (offer_id, user_id, token_hash, status) values
  ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000c1', repeat('1', 64), 'issued'),
  ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000c1', repeat('2', 64), 'issued'),
  ('00000000-0000-0000-0000-0000000000f2', '00000000-0000-0000-0000-0000000000c1', repeat('3', 64), 'issued'),
  ('00000000-0000-0000-0000-0000000000f3', '00000000-0000-0000-0000-0000000000c1', repeat('4', 64), 'issued'),
  ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000c1', repeat('5', 64), 'void');

select is(public.redeem_claim(repeat('1', 64), '00000000-0000-0000-0000-0000000000c2'), 'ok', 'host of the venue redeems');
select is((select redeemed_by from public.claims where token_hash = repeat('1', 64)),
  '00000000-0000-0000-0000-0000000000c2'::uuid, 'redeemed_by is the host');
select isnt((select redeemed_at from public.claims where token_hash = repeat('1', 64)), null, 'redeemed_at is set');
select is(public.redeem_claim(repeat('1', 64), '00000000-0000-0000-0000-0000000000c2'), 'already_redeemed', 'second scan fails');
select is(public.redeem_claim(repeat('2', 64), '00000000-0000-0000-0000-0000000000c4'), 'ok', 'venue admin redeems');
select is(public.redeem_claim(repeat('9', 64), '00000000-0000-0000-0000-0000000000c2'), 'unknown', 'unknown token');
select is(public.redeem_claim(repeat('5', 64), '00000000-0000-0000-0000-0000000000c2'), 'unknown', 'void claim looks unknown');
select is(public.redeem_claim(repeat('3', 64), '00000000-0000-0000-0000-0000000000c2'), 'expired', 'offer past valid_until');
select is(public.redeem_claim(repeat('4', 64), '00000000-0000-0000-0000-0000000000c2'), 'expired', 'inactive offer');
select is(public.redeem_claim('not-a-hash', '00000000-0000-0000-0000-0000000000c2'), 'invalid', 'non-hash input refused');

-- Staff of another venue, and plain guests, cannot redeem or learn the claim state.
select is(public.redeem_claim(repeat('2', 64), '00000000-0000-0000-0000-0000000000c3'), 'wrong_venue', 'other venue host gets wrong_venue, not already_redeemed');
select is(public.redeem_claim(repeat('3', 64), '00000000-0000-0000-0000-0000000000c1'), 'wrong_venue', 'guest cannot redeem');
select is((select status from public.claims where token_hash = repeat('3', 64)), 'issued', 'refused calls changed nothing');

-- Callable only by service_role.
select is((select count(*)::int from information_schema.role_routine_grants
  where routine_name = 'redeem_claim' and grantee in ('anon', 'authenticated', 'PUBLIC')),
  0, 'anon/authenticated cannot execute redeem_claim');

select * from finish();
rollback;
