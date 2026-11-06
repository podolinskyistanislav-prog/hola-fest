-- pgTAP: redeem_claim security properties (single use, venue isolation, caller roles).
-- True parallelism cannot be simulated inside one pgTAP transaction, so the serialisation
-- guarantee is proven structurally (row lock + conditional update) and the outcome
-- (exactly one 'ok' out of many attempts at the same QR) is proven by behaviour.
begin;
select plan(13);

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true),
  ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false),
  ('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false);
insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000a4', 'rcs-venue-a', 'A', true),
  ('00000000-0000-0000-0000-0000000000a5', 'rcs-venue-b', 'B', true);
insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000a4', '00000000-0000-0000-0000-0000000000a2', 'host'),
  ('00000000-0000-0000-0000-0000000000a5', '00000000-0000-0000-0000-0000000000a3', 'host');
insert into public.events (id, venue_id, title, starts_at, status)
values ('00000000-0000-0000-0000-0000000000a6', '00000000-0000-0000-0000-0000000000a4', 'E', now() + interval '1 day', 'published');
insert into public.offers (id, event_id, title, per_user_limit)
values ('00000000-0000-0000-0000-0000000000a7', '00000000-0000-0000-0000-0000000000a6', 'o', 5);
insert into public.claims (offer_id, user_id, token_hash, status) values
  ('00000000-0000-0000-0000-0000000000a7', '00000000-0000-0000-0000-0000000000a1', repeat('a', 64), 'issued'),
  ('00000000-0000-0000-0000-0000000000a7', '00000000-0000-0000-0000-0000000000a1', repeat('b', 64), 'issued');

select matches(
  (select prosrc from pg_proc where proname = 'redeem_claim' and pronamespace = 'public'::regnamespace),
  'where token_hash = p_token_hash for update',
  'redeem_claim locks the claim row so parallel scans queue');
select matches(
  (select prosrc from pg_proc where proname = 'redeem_claim' and pronamespace = 'public'::regnamespace),
  'where id = v_claim\.id and status = ''issued''',
  'redeem_claim update is conditional on status = issued');

select is(
  (select count(*)::int from (
     select public.redeem_claim(repeat('a', 64), '00000000-0000-0000-0000-0000000000a2') as r
     from generate_series(1, 5)) t where r = 'ok'),
  1, 'five scans of one QR give exactly one ok');
select is(
  (select count(*)::int from public.claims where token_hash = repeat('a', 64) and status = 'redeemed'),
  1, 'claim is redeemed once');

select is(public.redeem_claim(repeat('a', 64), '00000000-0000-0000-0000-0000000000a3'), 'wrong_venue',
  'other venue host learns nothing about a redeemed claim');
select is((select redeemed_by from public.claims where token_hash = repeat('a', 64)),
  '00000000-0000-0000-0000-0000000000a2'::uuid, 'redeemed_by was not overwritten');

select is(public.redeem_claim(repeat('b', 64), '00000000-0000-0000-0000-0000000000a3'), 'wrong_venue',
  'host of venue B cannot redeem venue A claim');
select is(public.redeem_claim(repeat('b', 64), '00000000-0000-0000-0000-0000000000a1'), 'wrong_venue',
  'guest cannot redeem even own claim');
select is(public.redeem_claim(repeat('b', 64), null), 'invalid', 'null caller refused');
select is((select status from public.claims where token_hash = repeat('b', 64)), 'issued',
  'refused calls left the claim unredeemed');

set local role authenticated;
select throws_ok($$select public.redeem_claim(repeat('b', 64), '00000000-0000-0000-0000-0000000000a2')$$,
  '42501', null, 'authenticated cannot execute redeem_claim');
reset role;
set local role anon;
select throws_ok($$select public.redeem_claim(repeat('b', 64), '00000000-0000-0000-0000-0000000000a2')$$,
  '42501', null, 'anon cannot execute redeem_claim');
reset role;

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a3","role":"authenticated"}', true);
select is((select count(*)::int from public.claims where offer_id = '00000000-0000-0000-0000-0000000000a7'), 0,
  'host of venue B cannot read venue A claims');
reset role;

select * from finish();
rollback;
