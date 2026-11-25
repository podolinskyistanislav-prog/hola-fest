-- Offer builder data model (#261): offer kinds, window, status, offers tied to a venue instead of an event.
-- Existing offers keep working: kind = custom, venue_id taken from the event, ends_at = valid_until,
-- status live / paused from is_active. is_active and valid_until stay in sync with status / ends_at
-- (trigger below) so older code paths keep behaving the same.

alter table public.offers
  add column kind text not null default 'custom'
    check (kind in ('percent_off', 'amount_off', 'free_entry_until', 'gift', 'two_for_one', 'custom')),
  add column value text,
  add column starts_at timestamptz,
  add column ends_at timestamptz,
  add column status text not null default 'live'
    check (status in ('draft', 'scheduled', 'live', 'paused', 'ended')),
  add column venue_id uuid references public.venues (id) on delete cascade;

update public.offers o
set venue_id = e.venue_id,
    ends_at = o.valid_until,
    status = case when o.is_active then 'live' else 'paused' end
from public.events e
where e.id = o.event_id;

alter table public.offers
  alter column venue_id set not null,
  alter column event_id drop not null,
  add constraint offers_window_order check (starts_at is null or ends_at is null or ends_at > starts_at);

create index offers_venue_id_idx on public.offers (venue_id, status);

-- Effective status: the stored status is the venue's intent; live / scheduled / ended are derived from time.
create function public.offer_effective_status(p_offer public.offers)
returns text
language sql
stable
set search_path = ''
as $$
  select case
    when p_offer.status in ('draft', 'paused', 'ended') then p_offer.status
    when p_offer.ends_at is not null and p_offer.ends_at <= now() then 'ended'
    when p_offer.starts_at is not null and p_offer.starts_at > now() then 'scheduled'
    else 'live'
  end;
$$;

create function public.offer_is_live(p_offer public.offers)
returns boolean
language sql
stable
set search_path = ''
as $$
  select public.offer_effective_status(p_offer) = 'live';
$$;

-- True when the caller holds a claim on the offer: a ticket stays readable after the offer ends.
create function public.has_claim_on_offer(p_offer_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.claims c
    where c.offer_id = p_offer_id and c.user_id = (select auth.uid())
  );
$$;

create or replace function public.offer_venue_id(p_offer_id uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select o.venue_id from public.offers o where o.id = p_offer_id;
$$;

-- Server-side validation and consistency for every offer write.
create function public.offers_validate()
returns trigger
language plpgsql
security definer
set search_path = ''
as $fn$
declare
  v_event public.events%rowtype;
  v_event_end timestamptz;
begin
  if new.event_id is not null then
    select * into v_event from public.events where id = new.event_id;
    if not found then
      raise exception 'offer event not found' using errcode = '23503';
    end if;
    new.venue_id := v_event.venue_id;
  end if;

  -- Keep the legacy columns in step with the new ones.
  if tg_op = 'INSERT' then
    if not new.is_active and new.status = 'live' then
      new.status := 'paused';
    end if;
    if new.ends_at is null then
      new.ends_at := new.valid_until;
    end if;
  else
    if new.is_active is distinct from old.is_active and new.status is not distinct from old.status then
      new.status := case
        when not new.is_active then 'paused'
        when old.status = 'paused' then 'live'
        else old.status
      end;
    end if;
    if new.valid_until is distinct from old.valid_until and new.ends_at is not distinct from old.ends_at then
      new.ends_at := new.valid_until;
    end if;
  end if;
  new.valid_until := new.ends_at;
  new.is_active := new.status in ('live', 'scheduled');

  if tg_op = 'INSERT' or new.kind is distinct from old.kind or new.value is distinct from old.value then
    if not coalesce(case new.kind
      when 'percent_off' then new.value ~ '^[0-9]{1,3}\Z' and new.value::int between 1 and 100
      when 'amount_off' then new.value ~ '^[0-9]{1,6}(\.[0-9]{1,2})?\Z' and new.value::numeric > 0
      when 'free_entry_until' then new.value ~ '^([01][0-9]|2[0-3]):[0-5][0-9]\Z'
      when 'gift' then btrim(coalesce(new.value, '')) <> '' and length(new.value) <= 80
      else true
    end, false) then
      raise exception 'invalid offer value' using errcode = '22023';
    end if;
  end if;

  -- The window may open before the event (early publishing) but must not outlive it.
  if new.event_id is not null and (
       tg_op = 'INSERT'
       or new.starts_at is distinct from old.starts_at
       or new.ends_at is distinct from old.ends_at
       or new.event_id is distinct from old.event_id
     ) then
    v_event_end := coalesce(v_event.ends_at, v_event.starts_at + interval '24 hours');
    if (new.ends_at is not null and new.ends_at > v_event_end)
       or (new.starts_at is not null and new.starts_at >= v_event_end) then
      raise exception 'offer window outside the event' using errcode = '22023';
    end if;
  end if;

  return new;
end;
$fn$;

revoke all on function public.offers_validate() from public, anon, authenticated;

create trigger offers_validate
  before insert or update on public.offers
  for each row execute function public.offers_validate();

-- Policies: guests see live offers (and offers they hold a claim on); venue admins see all of their venue.
drop policy offers_select on public.offers;
drop policy offers_insert on public.offers;
drop policy offers_update on public.offers;
drop policy offers_delete on public.offers;

create policy offers_select on public.offers
  for select to anon, authenticated
  using (
    (
      public.offer_is_live(offers)
      and (
        public.is_event_public(event_id)
        or (event_id is null and exists (
          select 1 from public.venues v where v.id = venue_id and v.is_published
        ))
      )
    )
    or public.is_venue_member(venue_id, 'admin')
    or public.is_superadmin()
    or public.has_claim_on_offer(id)
  );

create policy offers_insert on public.offers
  for insert to authenticated
  with check (public.is_venue_member(venue_id, 'admin') or public.is_superadmin());

create policy offers_update on public.offers
  for update to authenticated
  using (public.is_venue_member(venue_id, 'admin') or public.is_superadmin())
  with check (public.is_venue_member(venue_id, 'admin') or public.is_superadmin());

create policy offers_delete on public.offers
  for delete to authenticated
  using (public.is_venue_member(venue_id, 'admin') or public.is_superadmin());

-- Function grants. anon needs offer_effective_status / offer_is_live / has_claim_on_offer for the
-- offers_select policy; they return only a text/boolean about the row being filtered.
revoke all on function public.offer_effective_status(public.offers) from public, anon, authenticated;
revoke all on function public.offer_is_live(public.offers) from public, anon, authenticated;
revoke all on function public.has_claim_on_offer(uuid) from public, anon, authenticated;
grant execute on function public.offer_effective_status(public.offers) to anon, authenticated;
grant execute on function public.offer_is_live(public.offers) to anon, authenticated;
grant execute on function public.has_claim_on_offer(uuid) to anon, authenticated;

-- claim_offer: the offer must be live now (status + window) and its event / venue public.
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

  if not public.offer_is_live(v_offer)
     or not (
       case
         when v_offer.event_id is not null then public.is_event_public(v_offer.event_id)
         else exists (select 1 from public.venues v where v.id = v_offer.venue_id and v.is_published)
       end
     ) then
    return 'unavailable';
  end if;

  perform pg_advisory_xact_lock(hashtext(p_user_id::text));
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

-- Lifecycle RPCs. Not found and not allowed look the same, so ids cannot be probed.
create function public.set_offer_status(p_offer_id uuid, p_from text[], p_to text)
returns public.offers
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_offer public.offers;
begin
  select * into v_offer from public.offers where id = p_offer_id for update;
  if not found or not (public.is_venue_member(v_offer.venue_id, 'admin') or public.is_superadmin()) then
    raise exception 'offer not found' using errcode = 'P0002';
  end if;
  if not (v_offer.status = any (p_from)) then
    raise exception 'offer cannot change to this status' using errcode = '22023';
  end if;
  update public.offers set status = p_to where id = p_offer_id returning * into v_offer;
  return v_offer;
end;
$$;

create function public.pause_offer(p_offer_id uuid)
returns public.offers
language sql
security definer
set search_path = ''
as $$
  select * from public.set_offer_status(p_offer_id, array['live', 'scheduled'], 'paused');
$$;

create function public.resume_offer(p_offer_id uuid)
returns public.offers
language sql
security definer
set search_path = ''
as $$
  select * from public.set_offer_status(p_offer_id, array['paused'], 'live');
$$;

create function public.end_offer(p_offer_id uuid)
returns public.offers
language sql
security definer
set search_path = ''
as $$
  select * from public.set_offer_status(p_offer_id, array['draft', 'scheduled', 'live', 'paused'], 'ended');
$$;

-- A copy as a draft without a window, ready to edit. Claims are not copied.
create function public.duplicate_offer(p_offer_id uuid)
returns public.offers
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_offer public.offers;
  v_copy public.offers;
begin
  select * into v_offer from public.offers where id = p_offer_id;
  if not found or not (public.is_venue_member(v_offer.venue_id, 'admin') or public.is_superadmin()) then
    raise exception 'offer not found' using errcode = 'P0002';
  end if;
  insert into public.offers (event_id, venue_id, title, terms, kind, value, max_claims, per_user_limit, status)
  values (v_offer.event_id, v_offer.venue_id, v_offer.title, v_offer.terms, v_offer.kind, v_offer.value,
          v_offer.max_claims, v_offer.per_user_limit, 'draft')
  returning * into v_copy;
  return v_copy;
end;
$$;

revoke all on function public.set_offer_status(uuid, text[], text) from public, anon, authenticated;
revoke all on function public.pause_offer(uuid) from public, anon, authenticated;
revoke all on function public.resume_offer(uuid) from public, anon, authenticated;
revoke all on function public.end_offer(uuid) from public, anon, authenticated;
revoke all on function public.duplicate_offer(uuid) from public, anon, authenticated;
grant execute on function public.pause_offer(uuid) to authenticated;
grant execute on function public.resume_offer(uuid) to authenticated;
grant execute on function public.end_offer(uuid) to authenticated;
grant execute on function public.duplicate_offer(uuid) to authenticated;

-- Stats per offer. security_invoker: offers and claims RLS apply; the filter limits rows to venue admins.
create view public.offer_stats with (security_invoker = true) as
select
  o.id as offer_id,
  o.venue_id,
  count(c.id) filter (where c.status <> 'void')::int as claims,
  count(c.id) filter (where c.status = 'redeemed')::int as redemptions
from public.offers o
left join public.claims c on c.offer_id = o.id
where public.is_venue_member(o.venue_id, 'admin') or public.is_superadmin()
group by o.id;

revoke all on public.offer_stats from public, anon, authenticated;
grant select on public.offer_stats to authenticated;
