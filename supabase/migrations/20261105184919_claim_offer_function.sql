-- Race-safe claim issuing. Called only by the claim-offer Edge Function (service role).
-- The offer row is locked (FOR UPDATE) so parallel claims for one offer are serialised and
-- max_claims / per_user_limit cannot be exceeded. Only the sha256 hash of the token is stored.
create or replace function public.claim_offer(p_offer_id uuid, p_user_id uuid, p_token_hash text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_offer public.offers%rowtype;
  v_total int;
  v_user int;
  v_recent int;
begin
  if p_offer_id is null or p_user_id is null or p_token_hash is null or p_token_hash !~ '^[0-9a-f]{64}$' then
    return 'invalid';
  end if;

  select * into v_offer from public.offers where id = p_offer_id for update;
  if not found then
    return 'unavailable';
  end if;

  if not v_offer.is_active
     or (v_offer.valid_until is not null and v_offer.valid_until <= now())
     or not exists (
       select 1
       from public.events e
       join public.venues v on v.id = e.venue_id
       where e.id = v_offer.event_id and e.status = 'published' and v.is_published
     ) then
    return 'unavailable';
  end if;

  -- Rate limit: at most 10 claims per user per minute (any offer).
  select count(*) into v_recent from public.claims
    where user_id = p_user_id and issued_at > now() - interval '1 minute';
  if v_recent >= 10 then
    return 'rate_limited';
  end if;

  select count(*) filter (where status <> 'void'),
         count(*) filter (where status <> 'void' and user_id = p_user_id)
    into v_total, v_user
    from public.claims where offer_id = p_offer_id;

  if v_offer.max_claims is not null and v_total >= v_offer.max_claims then
    return 'sold_out';
  end if;
  if v_user >= v_offer.per_user_limit then
    return 'limit_reached';
  end if;

  insert into public.claims (offer_id, user_id, token_hash)
  values (p_offer_id, p_user_id, p_token_hash);
  return 'ok';
end;
$$;

revoke all on function public.claim_offer(uuid, uuid, text) from public, anon, authenticated;
grant execute on function public.claim_offer(uuid, uuid, text) to service_role;
