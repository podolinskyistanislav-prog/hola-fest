-- pgTAP: claim_offer respects the offer status and window, for event offers and venue offers (#261).
begin;
select plan(8);

delete from public.venues;

insert into auth.users (id, instance_id, aud, role)
values ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'a', 'A', true),
  ('00000000-0000-0000-0000-0000000000b2', 'b', 'B (hidden)', false);

insert into public.events (id, venue_id, title, starts_at, status) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'A night', now() + interval '1 hour', 'published');

insert into public.offers (id, event_id, venue_id, title, status, starts_at, ends_at) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c1', null, 'live', 'live', null, null),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000c1', null, 'paused', 'paused', null, null),
  ('00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000c1', null, 'not yet', 'scheduled', now() + interval '30 minutes', null),
  ('00000000-0000-0000-0000-0000000000d4', '00000000-0000-0000-0000-0000000000c1', null, 'over', 'live', now() - interval '2 hours', now() - interval '1 hour'),
  ('00000000-0000-0000-0000-0000000000d5', '00000000-0000-0000-0000-0000000000c1', null, 'draft', 'draft', null, null);

insert into public.offers (id, venue_id, title, status) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000b1', 'venue live', 'live'),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-0000000000b2', 'hidden venue', 'live');

select is(public.claim_offer('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000a2', repeat('1', 64)), 'ok', 'live offer is claimable');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000a2', repeat('2', 64)), 'unavailable', 'paused offer is not claimable');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000a2', repeat('3', 64)), 'unavailable', 'offer before its window is not claimable');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000d4', '00000000-0000-0000-0000-0000000000a2', repeat('4', 64)), 'unavailable', 'offer after its window is not claimable');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000d5', '00000000-0000-0000-0000-0000000000a2', repeat('5', 64)), 'unavailable', 'draft is not claimable');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000a2', repeat('6', 64)), 'ok', 'live venue offer without an event is claimable');
select is(public.claim_offer('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-0000000000a2', repeat('7', 64)), 'unavailable', 'offer of an unpublished venue is not claimable');

update public.offers set status = 'ended' where id = '00000000-0000-0000-0000-0000000000e1';
select is(public.claim_offer('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000a2', repeat('8', 64)), 'unavailable', 'ended offer is not claimable');

select * from finish();
rollback;
