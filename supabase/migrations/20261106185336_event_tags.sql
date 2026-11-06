-- Genre tags on events (techno, house, rooftop) for the home filter chips.
-- RLS and grants are unchanged: the column is covered by the existing events policies.
alter table public.events
  add column tags text[] not null default '{}';

-- The home screen filters with `tags @> array['techno']`.
create index events_tags_idx on public.events using gin (tags);
