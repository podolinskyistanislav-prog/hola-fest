-- Venue staff must read their own venue even while it is unpublished (admin app: "my venues").
-- Everyone else still sees published venues only; writes stay superadmin-only.
drop policy venues_select_published on public.venues;

create policy venues_select on public.venues
  for select to anon, authenticated
  using (is_published or public.is_venue_member(id) or public.is_superadmin());
