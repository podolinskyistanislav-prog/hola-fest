-- Local development seed. Fictional test data only: no secrets, no users.
-- Events and offers are marked [TEST]. Dates are relative to the reset time.

-- TODO: confirm with venue (has_shelter is false for both until confirmed).
insert into public.venues
  (id, slug, name, address, lat, lng, instagram_url, has_shelter, is_published)
values
  ('00000000-0000-4000-8000-000000000001', 'bavovna', 'Bavovna',
   'вул. Васильківська, 72, Київ, 02000',
   50.432550, 30.515416,
   'https://www.instagram.com/bavovna.event/',
   false, -- TODO: confirm with venue
   true),
  ('00000000-0000-4000-8000-000000000002', 'panorama-bar', 'Panorama Bar',
   'вул. Хрещатик, 1/2, Київ, 01001',
   50.451369, 30.527492,
   'https://www.instagram.com/panorama_bar17/',
   false, -- TODO: confirm with venue
   true);

insert into public.events (id, venue_id, title, starts_at, ends_at, status)
values
  -- Bavovna: past, this week
  ('00000000-0000-4000-8000-000000000011', '00000000-0000-4000-8000-000000000001',
   '[TEST] Past night', now() - interval '7 days', now() - interval '7 days' + interval '8 hours', 'published'),
  ('00000000-0000-4000-8000-000000000012', '00000000-0000-4000-8000-000000000001',
   '[TEST] This week night', now() + interval '2 days', now() + interval '2 days' + interval '8 hours', 'published'),
  -- Panorama Bar: this week, draft
  ('00000000-0000-4000-8000-000000000021', '00000000-0000-4000-8000-000000000002',
   '[TEST] This week night', now() + interval '3 days', now() + interval '3 days' + interval '8 hours', 'published'),
  ('00000000-0000-4000-8000-000000000022', '00000000-0000-4000-8000-000000000002',
   '[TEST] Draft night', now() + interval '10 days', now() + interval '10 days' + interval '8 hours', 'draft');

-- Tonight in Kyiv: 20:00-23:00 local time today, one event per venue.
insert into public.events (id, venue_id, title, starts_at, ends_at, status)
values
  ('00000000-0000-4000-8000-000000000013', '00000000-0000-4000-8000-000000000001',
   '[TEST] Tonight',
   (date_trunc('day', now() at time zone 'Europe/Kyiv') + interval '20 hours') at time zone 'Europe/Kyiv',
   (date_trunc('day', now() at time zone 'Europe/Kyiv') + interval '23 hours') at time zone 'Europe/Kyiv',
   'published'),
  ('00000000-0000-4000-8000-000000000023', '00000000-0000-4000-8000-000000000002',
   '[TEST] Tonight',
   (date_trunc('day', now() at time zone 'Europe/Kyiv') + interval '20 hours') at time zone 'Europe/Kyiv',
   (date_trunc('day', now() at time zone 'Europe/Kyiv') + interval '23 hours') at time zone 'Europe/Kyiv',
   'published');

insert into public.offers (id, event_id, title, terms, max_claims, per_user_limit, is_active)
values
  ('00000000-0000-4000-8000-000000000113', '00000000-0000-4000-8000-000000000013',
   '[TEST] Free tonight cocktail', 'Test offer. One per guest.', 50, 1, true),
  ('00000000-0000-4000-8000-000000000123', '00000000-0000-4000-8000-000000000023',
   '[TEST] Free tonight shot', 'Test offer. One per guest.', 50, 1, true),
  ('00000000-0000-4000-8000-000000000112', '00000000-0000-4000-8000-000000000012',
   '[TEST] Free welcome shot', 'Test offer. One per guest.', 50, 1, true),
  ('00000000-0000-4000-8000-000000000121', '00000000-0000-4000-8000-000000000021',
   '[TEST] Free coat check', 'Test offer. One per guest.', 50, 1, true);
