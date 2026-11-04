-- RLS v1 part 2: events, offers, claims.
-- claims has no write grants for anon/authenticated: only the service role (Edge Functions) writes.

-- Resolve ownership through security definer helpers so policies do not depend on the
-- caller's own RLS visibility of parent rows (e.g. a host must see claims of a draft event).
create function public.event_venue_id(p_event_id uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select e.venue_id from public.events e where e.id = p_event_id;
$$;

create function public.offer_venue_id(p_offer_id uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select e.venue_id
  from public.offers o
  join public.events e on e.id = o.event_id
  where o.id = p_offer_id;
$$;

create function public.is_event_public(p_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.events e
    join public.venues v on v.id = e.venue_id
    where e.id = p_event_id and e.status = 'published' and v.is_published
  );
$$;

revoke all on function public.event_venue_id(uuid) from public;
revoke all on function public.offer_venue_id(uuid) from public;
revoke all on function public.is_event_public(uuid) from public;
-- anon needs is_event_public (used by the anon-readable offers policy); it returns only a boolean.
grant execute on function public.is_event_public(uuid) to anon, authenticated;
grant execute on function public.event_venue_id(uuid) to authenticated;
grant execute on function public.offer_venue_id(uuid) to authenticated;

-- events
grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;

create policy events_select on public.events
  for select to anon, authenticated
  using (
    (
      status = 'published'
      and exists (select 1 from public.venues v where v.id = venue_id and v.is_published)
    )
    or public.is_venue_member(venue_id)
    or public.is_superadmin()
  );

create policy events_insert on public.events
  for insert to authenticated
  with check (public.is_venue_member(venue_id, 'admin') or public.is_superadmin());

create policy events_update on public.events
  for update to authenticated
  using (public.is_venue_member(venue_id, 'admin') or public.is_superadmin())
  with check (public.is_venue_member(venue_id, 'admin') or public.is_superadmin());

create policy events_delete on public.events
  for delete to authenticated
  using (public.is_venue_member(venue_id, 'admin') or public.is_superadmin());

-- offers
grant select on public.offers to anon, authenticated;
grant insert, update, delete on public.offers to authenticated;

create policy offers_select on public.offers
  for select to anon, authenticated
  using (
    public.is_event_public(event_id)
    or public.is_venue_member(public.event_venue_id(event_id), 'admin')
    or public.is_superadmin()
  );

create policy offers_insert on public.offers
  for insert to authenticated
  with check (public.is_venue_member(public.event_venue_id(event_id), 'admin') or public.is_superadmin());

create policy offers_update on public.offers
  for update to authenticated
  using (public.is_venue_member(public.event_venue_id(event_id), 'admin') or public.is_superadmin())
  with check (public.is_venue_member(public.event_venue_id(event_id), 'admin') or public.is_superadmin());

create policy offers_delete on public.offers
  for delete to authenticated
  using (public.is_venue_member(public.event_venue_id(event_id), 'admin') or public.is_superadmin());

-- claims: read only. token_hash is never exposed to clients (column-level grant).
grant select (id, offer_id, user_id, status, issued_at, redeemed_at, redeemed_by)
  on public.claims to authenticated;

create policy claims_select on public.claims
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or public.is_venue_member(public.offer_venue_id(offer_id))
    or public.is_superadmin()
  );
