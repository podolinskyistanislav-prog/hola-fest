-- pgTAP: claim_offer enforces all limits, stores the hash, and is service-role only.
begin;
select plan(16);

insert into auth.users (id, instance_id, aud, role, is_anonymous)
values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true),
  ('00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true);
insert into public.venues (id, slug, name, is_published)
values ('00000000-0000-0000-0000-0000000000d1', 'claim-venue', 'Claim Venue', true);
insert into public.events (id, venue_id, title, starts_at, status)
values ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000d1', 'E', now() + interval '1 day', 'published');
insert into public.offers (id, event_id, title, max_claims, per_user_limit, valid_until, is_active) values
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000d2', 'ok', 2, 1, null, true),
  ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-0000000000d2', 'inactive', null, 1, null, false),
  ('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-0000000000d2', 'expired', null, 1, now() - interval '1 hour', true);

select is(public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c1', repeat('a', 64)), 'ok', 'happy path');
select is((select token_hash from public.claims where user_id = '00000000-0000-0000-0000-0000000000c1'), repeat('a', 64), 'hash stored');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c1', repeat('b', 64)), 'limit_reached', 'per_user_limit enforced');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c2', repeat('c', 64)), 'ok', 'second user can claim');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-0000000000c2', repeat('d', 64)), 'unavailable', 'inactive offer');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-0000000000c2', repeat('e', 64)), 'unavailable', 'expired offer');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000ff', '00000000-0000-0000-0000-0000000000c2', repeat('f', 64)), 'unavailable', 'unknown offer');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c2', 'not-a-hash'), 'invalid', 'bad hash rejected');

-- max_claims: void claims free a slot
update public.offers set per_user_limit = 5 where id = '00000000-0000-0000-0000-0000000000a1';
select is(public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c1', repeat('1', 64)), 'sold_out', 'max_claims enforced');
update public.claims set status = 'void' where token_hash = repeat('a', 64);
select is(public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c1', repeat('2', 64)), 'ok', 'void claim frees a slot');

-- rate limit
update public.offers set max_claims = null, per_user_limit = 100 where id = '00000000-0000-0000-0000-0000000000a1';
insert into public.claims (offer_id, user_id, token_hash)
select '00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c2', 'rl' || g from generate_series(1, 10) g;
select is(public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c2', repeat('3', 64)), 'rate_limited', 'rate limit enforced');

select is((select count(*)::int from public.claims where user_id = '00000000-0000-0000-0000-0000000000c2' and token_hash like 'rl%'), 10, 'rate limit still holds: no extra claim inserted');

-- strangers cannot call it
set local role authenticated;
select throws_ok($$select public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c1', repeat('4', 64))$$, '42501', null, 'authenticated cannot execute');
reset role;
set local role anon;
select throws_ok($$select public.claim_offer('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000c1', repeat('5', 64))$$, '42501', null, 'anon cannot execute');
reset role;
select has_function('public', 'claim_offer', array['uuid', 'uuid', 'text'], 'function exists');
select is((select prosecdef from pg_proc where proname = 'claim_offer'), true, 'security definer');

select * from finish();
rollback;
