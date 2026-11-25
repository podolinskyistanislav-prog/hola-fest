-- redeem_claim for offer-builder offers (review on PR #271):
-- * the venue comes from offers.venue_id, so venue-level offers (no event) can be redeemed by
--   that venue's staff, and other venues still get 'wrong_venue';
-- * a claim is redeemable only while the offer is effectively live (paused, ended, scheduled or
--   past its window → 'expired'), instead of only checking is_active / valid_until.
-- Owners, admins and hosts may redeem (owner role from the account-types migration).
create or replace function public.redeem_claim(p_token_hash text, p_host_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_claim public.claims%rowtype;
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

  if not exists (
    select 1 from public.venue_members m
    where m.venue_id = v_offer.venue_id and m.user_id = p_host_id and m.role in ('host', 'admin', 'owner')
  ) then
    return 'wrong_venue';
  end if;

  if v_claim.status = 'redeemed' then
    return 'already_redeemed';
  end if;
  if v_claim.status <> 'issued' then
    return 'unknown';
  end if;

  if public.offer_effective_status(v_offer) <> 'live' then
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
