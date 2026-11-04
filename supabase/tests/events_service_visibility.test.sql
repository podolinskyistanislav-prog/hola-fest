-- pgTAP: what an anonymous visitor sees through the events service queries
-- (getEventsForRange / getEventById): published events of published venues,
-- active offers only, correct half-open range and ordering.
begin;
select plan(9);

delete from public.venues;

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'shown', 'Shown', true),
  ('00000000-0000-0000-0000-0000000000b3', 'hidden', 'Hidden', false);

insert into public.events (id, venue_id, title, starts_at, status) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'late',        '2030-01-02 22:00+00', 'published'),
  ('00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-0000000000b1', 'early',       '2030-01-02 10:00+00', 'published'),
  ('00000000-0000-0000-0000-0000000000c3', '00000000-0000-0000-0000-0000000000b1', 'draft',       '2030-01-02 12:00+00', 'draft'),
  ('00000000-0000-0000-0000-0000000000c4', '00000000-0000-0000-0000-0000000000b3', 'hidden venue', '2030-01-02 12:00+00', 'published'),
  ('00000000-0000-0000-0000-0000000000c5', '00000000-0000-0000-0000-0000000000b1', 'range end',   '2030-01-03 00:00+00', 'published'),
  ('00000000-0000-0000-0000-0000000000c6', '00000000-0000-0000-0000-0000000000b1', 'range start', '2030-01-02 00:00+00', 'published'),
  ('00000000-0000-0000-0000-0000000000c7', '00000000-0000-0000-0000-0000000000b1', 'before',      '2030-01-01 23:59+00', 'published');

insert into public.offers (id, event_id, title, is_active) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c1', 'active',   true),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000c1', 'inactive', false),
  ('00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000c3', 'draft offer', true),
  ('00000000-0000-0000-0000-0000000000d4', '00000000-0000-0000-0000-0000000000c4', 'hidden venue offer', true);

set local role anon;

select results_eq(
  $$select title from public.events
    where status = 'published' and starts_at >= '2030-01-02 00:00+00' and starts_at < '2030-01-03 00:00+00'
    order by starts_at asc$$,
  array['range start', 'early', 'late'],
  'range is half-open, ordered by start, without drafts or hidden venues'
);
select is((select count(*)::int from public.events where title = 'draft'), 0, 'anon cannot read draft events');
select is((select count(*)::int from public.events where title = 'hidden venue'), 0, 'anon cannot read events of unpublished venues');
select is((select count(*)::int from public.venues where slug = 'hidden'), 0, 'anon cannot read unpublished venues');
select results_eq(
  $$select title from public.offers where event_id = '00000000-0000-0000-0000-0000000000c1' and is_active order by title$$,
  array['active'],
  'inactive offers are filtered out by the service query'
);
select is((select count(*)::int from public.offers where event_id = '00000000-0000-0000-0000-0000000000c3'), 0, 'anon cannot read offers of draft events');
select is((select count(*)::int from public.offers where event_id = '00000000-0000-0000-0000-0000000000c4'), 0, 'anon cannot read offers of hidden-venue events');
select is((select count(*)::int from public.events where id = '00000000-0000-0000-0000-0000000000c3'), 0, 'draft event by id is not found');
select is((select count(*)::int from public.events where id = '00000000-0000-0000-0000-0000000000c4'), 0, 'hidden-venue event by id is not found');

select * from finish();
rollback;
