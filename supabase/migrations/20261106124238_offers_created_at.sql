-- Offers had no creation time, so "newest first" listings (admin offers editor) were impossible.
-- Existing rows get the migration time; table-level grants and policies already cover the column.
alter table public.offers add column created_at timestamptz not null default now();
