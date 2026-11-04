-- Schema v1: tables, indexes, RLS enabled. No access policies yet (next tasks):
-- with RLS enabled, no policies and no grants, anon/authenticated get nothing.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  is_superadmin boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.venues (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  address text,
  lat double precision,
  lng double precision,
  description text,
  cover_path text,
  instagram_url text,
  has_shelter boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.venue_members (
  venue_id uuid not null references public.venues (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null check (role in ('admin', 'host')),
  primary key (venue_id, user_id)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues (id) on delete cascade,
  title text not null,
  description text,
  lineup text[] not null default '{}',
  starts_at timestamptz not null,
  ends_at timestamptz,
  price_from_uah integer check (price_from_uah >= 0),
  cover_path text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  title text not null,
  terms text,
  max_claims integer check (max_claims > 0),
  per_user_limit integer not null default 1 check (per_user_limit > 0),
  valid_until timestamptz,
  is_active boolean not null default true
);

create table public.claims (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.offers (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  token_hash text not null unique,
  status text not null default 'issued' check (status in ('issued', 'redeemed', 'void')),
  issued_at timestamptz not null default now(),
  redeemed_at timestamptz,
  redeemed_by uuid references public.profiles (id)
);

create index events_venue_id_starts_at_idx on public.events (venue_id, starts_at);
create index events_published_starts_at_idx on public.events (starts_at) where status = 'published';
create index claims_offer_id_idx on public.claims (offer_id);
create index claims_user_id_idx on public.claims (user_id);
-- Foreign-key indexes not covered above
create index venue_members_user_id_idx on public.venue_members (user_id);
create index offers_event_id_idx on public.offers (event_id);
create index claims_redeemed_by_idx on public.claims (redeemed_by);

alter table public.profiles enable row level security;
alter table public.venues enable row level security;
alter table public.venue_members enable row level security;
alter table public.events enable row level security;
alter table public.offers enable row level security;
alter table public.claims enable row level security;

-- Supabase default privileges grant new tables to anon/authenticated; remove them.
revoke all on public.profiles, public.venues, public.venue_members,
  public.events, public.offers, public.claims from anon, authenticated;
