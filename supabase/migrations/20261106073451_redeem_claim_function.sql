-- Atomic claim redemption. Called only by the redeem-claim Edge Function (service role),
-- which has already authenticated the caller (p_host_id) and hashed the scanned token.
-- The claim row is locked (FOR UPDATE), so two simultaneous scans are serialised and exactly
-- one can move it from 'issued' to 'redeemed'. The membership check comes first so a caller
-- who is not staff of the claim's venue learns nothing about the claim's state.
create or replace function public.redeem_claim(p_token_hash text, p_host_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_claim public.claims%rowtype;
  v_venue_id uuid;
  v_offer public.offers%rowtype;
begin
  if p_host_id is null or p_token_hash is null or p_token_hash !~ '^[0-9a-f]{64}$' then
    return 'invalid';
  end if;

  select * into v_claim from public.claims where token_hash = p_token_hash for update;
  if not found then
    return 'unknown';
  end if;

  select * into v_offer from public.offers where id = v_claim.offer_id;
  select e.venue_id into v_venue_id from public.events e where e.id = v_offer.event_id;

  if not exists (
    select 1 from public.venue_members m
    where m.venue_id = v_venue_id and m.user_id = p_host_id and m.role in ('host', 'admin')
  ) then
    return 'wrong_venue';
  end if;

  if v_claim.status = 'redeemed' then
    return 'already_redeemed';
  end if;
  if v_claim.status <> 'issued' then
    return 'unknown';
  end if;

  if not v_offer.is_active
     or (v_offer.valid_until is not null and v_offer.valid_until <= now()) then
    return 'expired';
  end if;

  update public.claims
    set status = 'redeemed', redeemed_at = now(), redeemed_by = p_host_id
    where id = v_claim.id and status = 'issued';
  if not found then
    return 'already_redeemed';
  end if;
  return 'ok';
end;
$$;

revoke all on function public.redeem_claim(text, uuid) from public, anon, authenticated;
grant execute on function public.redeem_claim(text, uuid) to service_role;
