-- pgTAP: claim_offer security properties (hash-only storage, serialisation, isolation).
begin;
select plan(9);

-- No column anywhere in public stores a raw token.
select is(
  (select count(*)::int from information_schema.columns
   where table_schema = 'public' and column_name in ('token', 'raw_token', 'qr_token', 'secret')),
  0, 'no raw token column exists in any public table');
select col_type_is('public', 'claims', 'token_hash', 'text', 'claims.token_hash is text');

-- Concurrency safety is provided by locking the offer row; parallel callers queue on it.
select matches(
  (select prosrc from pg_proc where proname = 'claim_offer' and pronamespace = 'public'::regnamespace),
  'from public\.offers where id = p_offer_id for update',
  'claim_offer locks the offer row so max_claims/per_user_limit hold under parallel calls');
select matches(
  (select prosrc from pg_proc where proname = 'claim_offer' and pronamespace = 'public'::regnamespace),
  'pg_advisory_xact_lock',
  'claim_offer serialises one user''s parallel claims for the rate limit');

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true),
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true);
insert into public.venues (id, slug, name, is_published)
values ('00000000-0000-0000-0000-0000000000b3', 'sec-venue', 'Sec Venue', true);
insert into public.events (id, venue_id, title, starts_at, status)
values ('00000000-0000-0000-0000-0000000000b4', '00000000-0000-0000-0000-0000000000b3', 'E', now() + interval '1 day', 'published');
insert into public.offers (id, event_id, title, per_user_limit)
values ('00000000-0000-0000-0000-0000000000b5', '00000000-0000-0000-0000-0000000000b4', 'o', 1);

-- Only a sha256 hex digest is accepted, so a raw token cannot be stored through the function.
select is(public.claim_offer('00000000-0000-0000-0000-0000000000b5', '00000000-0000-0000-0000-0000000000b1', 'RAW-TOKEN-NOT-A-HASH'), 'invalid', 'non-hash value is refused');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000b5', '00000000-0000-0000-0000-0000000000b1', repeat('A', 64)), 'invalid', 'uppercase / non-canonical hash is refused');
select is((select count(*)::int from public.claims where offer_id = '00000000-0000-0000-0000-0000000000b5'), 0, 'refused calls stored nothing');

-- Another user's claim is invisible to a stranger.
select is(public.claim_offer('00000000-0000-0000-0000-0000000000b5', '00000000-0000-0000-0000-0000000000b1', repeat('a', 64)), 'ok', 'user A claims');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', true);
select is((select count(*)::int from public.claims where offer_id = '00000000-0000-0000-0000-0000000000b5'), 0, 'user B cannot read user A''s claim');
reset role;

select * from finish();
rollback;
