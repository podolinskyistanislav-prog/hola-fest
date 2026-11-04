-- Inactive offers are not public: anon/authenticated only read active offers of public events.
-- Venue admins of the event's venue and superadmin keep seeing every offer.
drop policy offers_select on public.offers;

create policy offers_select on public.offers
  for select to anon, authenticated
  using (
    (is_active and public.is_event_public(event_id))
    or public.is_venue_member(public.event_venue_id(event_id), 'admin')
    or public.is_superadmin()
  );
