-- M17.1: account applications (venue / DJ), venue owner role + invites, DJ profiles, lineup links, media buckets.
-- Rights are granted only by server-side RPCs run by a superadmin (approval) or by the owner (invites).

-- ------------------------------------------------------------ owner role
alter table public.venue_members drop constraint venue_members_role_check;
alter table public.venue_members
  add constraint venue_members_role_check check (role in ('owner', 'admin', 'host'));

-- An owner can do everything an admin can: asking for 'admin' also matches 'owner'.
create or replace function public.is_venue_member(p_venue_id uuid, p_role text default null)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.venue_members vm
    where vm.venue_id = p_venue_id
      and vm.user_id = (select auth.uid())
      and (
        p_role is null
        or vm.role = p_role
        or (p_role = 'admin' and vm.role = 'owner')
      )
  );
$$;

-- Redeeming a claim is allowed for owners too.
create or replace function public.redeem_claim(p_token_hash text, p_host_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_claim public.claims%rowtype;
  v_venue_id uuid;
  v_offer public.offers%rowtype;
begin
  if p_host_id is null or p_token_hash is null or p_token_hash !~ '^[0-9a-f]{64}$' then
    return 'invalid';
  end if;

  select * into v_claim from public.claims where token_hash = p_token_hash for update;
  if not found then
    return 'unknown';
  end if;

  select * into v_offer from public.offers where id = v_claim.offer_id;
  select e.venue_id into v_venue_id from public.events e where e.id = v_offer.event_id;

  if not exists (
    select 1 from public.venue_members m
    where m.venue_id = v_venue_id and m.user_id = p_host_id and m.role in ('host', 'admin', 'owner')
  ) then
    return 'wrong_venue';
  end if;

  if v_claim.status = 'redeemed' then
    return 'already_redeemed';
  end if;
  if v_claim.status <> 'issued' then
    return 'unknown';
  end if;

  if not v_offer.is_active
     or (v_offer.valid_until is not null and v_offer.valid_until <= now()) then
    return 'expired';
  end if;

  update public.claims
    set status = 'redeemed', redeemed_at = now(), redeemed_by = p_host_id
    where id = v_claim.id and status = 'issued';
  if not found then
    return 'already_redeemed';
  end if;
  return 'ok';
end;
$$;

revoke all on function public.redeem_claim(text, uuid) from public, anon, authenticated;
grant execute on function public.redeem_claim(text, uuid) to service_role;

-- The owner removes admins and hosts of their own venue (never owners).
create policy venue_members_delete_owner on public.venue_members
  for delete to authenticated
  using (role in ('admin', 'host') and public.is_venue_member(venue_id, 'owner'));

-- The owner edits their own venue's details; slug and publishing stay with the team.
create policy venues_update_owner on public.venues
  for update to authenticated
  using (public.is_venue_member(id, 'owner'))
  with check (public.is_venue_member(id, 'owner'));

create function public.guard_venue_team_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (new.slug is distinct from old.slug or new.is_published is distinct from old.is_published)
     and auth.uid() is not null
     and not public.is_superadmin() then
    raise exception 'only superadmin can change slug or publishing' using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke all on function public.guard_venue_team_fields() from public, anon, authenticated;

create trigger venues_guard_team_fields
  before update on public.venues
  for each row execute function public.guard_venue_team_fields();

-- ----------------------------------------------------------------- helpers
-- Payload shape per application kind. Venue: a new venue (name) or an existing one (venue_id).
create function public.application_payload_valid(p_kind text, p_payload jsonb)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select case
    when p_payload is null or jsonb_typeof(p_payload) <> 'object' then false
    when p_kind = 'venue' then
      (
        (
          jsonb_typeof(p_payload -> 'name') = 'string'
          and char_length(btrim(p_payload ->> 'name')) between 2 and 80
        )
        or (
          jsonb_typeof(p_payload -> 'venue_id') = 'string'
          and (p_payload ->> 'venue_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        )
      )
      and (p_payload -> 'address' is null
        or (jsonb_typeof(p_payload -> 'address') = 'string' and char_length(p_payload ->> 'address') <= 200))
      and (p_payload -> 'contact' is null
        or (jsonb_typeof(p_payload -> 'contact') = 'string' and char_length(p_payload ->> 'contact') <= 200))
    when p_kind = 'dj' then
      jsonb_typeof(p_payload -> 'stage_name') = 'string'
      and char_length(btrim(p_payload ->> 'stage_name')) between 2 and 40
      and (p_payload -> 'contact' is null
        or (jsonb_typeof(p_payload -> 'contact') = 'string' and char_length(p_payload ->> 'contact') <= 200))
      and (
        p_payload -> 'dj_id' is null
        or (
          jsonb_typeof(p_payload -> 'dj_id') = 'string'
          and (p_payload ->> 'dj_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        )
      )
    else false
  end;
$$;

-- Folder (first path segment) of a storage object as a uuid, or null.
create function public.storage_folder_uuid(p_name text)
returns uuid
language sql
immutable
set search_path = ''
as $$
  select case
    when split_part(p_name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    then split_part(p_name, '/', 1)::uuid
  end;
$$;

revoke all on function public.application_payload_valid(text, jsonb) from public;
revoke all on function public.storage_folder_uuid(text) from public;
grant execute on function public.application_payload_valid(text, jsonb) to authenticated;
grant execute on function public.storage_folder_uuid(text) to anon, authenticated;

-- ------------------------------------------------------------- applications
create table public.account_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('venue', 'dj')),
  payload jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reject_reason text check (reject_reason is null or char_length(reject_reason) between 1 and 500),
  created_at timestamptz not null default now(),
  decided_by uuid references public.profiles (id) on delete set null,
  decided_at timestamptz,
  constraint account_applications_payload_valid check (public.application_payload_valid(kind, payload)),
  constraint account_applications_decision_consistent check (
    (status = 'pending' and decided_at is null and reject_reason is null)
    or (status = 'approved' and decided_at is not null and reject_reason is null)
    or (status = 'rejected' and decided_at is not null and reject_reason is not null)
  )
);

create unique index account_applications_one_pending_idx
  on public.account_applications (user_id, kind) where status = 'pending';
create index account_applications_status_created_idx
  on public.account_applications (status, created_at);
create index account_applications_decided_by_idx on public.account_applications (decided_by);

alter table public.account_applications enable row level security;
revoke all on public.account_applications from anon, authenticated;
grant select on public.account_applications to authenticated;
grant insert (id, kind, payload) on public.account_applications to authenticated;

create policy account_applications_select on public.account_applications
  for select to authenticated
  using (user_id = (select auth.uid()) or public.is_superadmin());

-- Only confirmed (non-anonymous), non-banned users apply, as themselves; status stays 'pending' by default.
create policy account_applications_insert_own on public.account_applications
  for insert to authenticated
  with check (user_id = (select auth.uid()) and public.can_interact());

-- --------------------------------------------------------------------- DJs
create table public.djs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.profiles (id) on delete set null,
  stage_name text not null check (char_length(btrim(stage_name)) between 2 and 40),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  bio text check (bio is null or char_length(bio) <= 1000),
  genres text[] not null default '{}' check (cardinality(genres) <= 10),
  photo_path text,
  cover_path text,
  instagram_url text check (instagram_url is null or char_length(instagram_url) <= 200),
  soundcloud_url text check (soundcloud_url is null or char_length(soundcloud_url) <= 200),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.event_djs (
  event_id uuid not null references public.events (id) on delete cascade,
  dj_id uuid not null references public.djs (id) on delete cascade,
  position integer not null default 0 check (position >= 0),
  primary key (event_id, dj_id)
);

create index event_djs_dj_id_idx on public.event_djs (dj_id);
create index djs_genres_idx on public.djs using gin (genres);

alter table public.djs enable row level security;
alter table public.event_djs enable row level security;
revoke all on public.djs, public.event_djs from anon, authenticated;

create function public.is_dj_owner(p_dj_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.djs d
    where d.id = p_dj_id and d.user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_dj_owner(uuid) from public;
grant execute on function public.is_dj_owner(uuid) to anon, authenticated;

-- Slug from a name; falls back to a random suffix when taken or empty (e.g. Cyrillic names).
create function public.unique_slug(p_base text, p_table text)
returns text
language plpgsql
volatile
set search_path = ''
as $$
declare
  v_base text := left(trim(both '-' from regexp_replace(lower(coalesce(p_base, '')), '[^a-z0-9]+', '-', 'g')), 40);
  v_slug text;
  v_taken boolean;
begin
  if v_base = '' then
    v_base := case p_table when 'venues' then 'venue' else 'dj' end;
  end if;
  v_slug := v_base;
  loop
    if p_table = 'venues' then
      select exists (select 1 from public.venues where slug = v_slug) into v_taken;
    else
      select exists (select 1 from public.djs where slug = v_slug) into v_taken;
    end if;
    exit when not v_taken;
    v_slug := v_base || '-' || substr(md5(random()::text || clock_timestamp()::text), 1, 5);
  end loop;
  return v_slug;
end;
$$;

revoke all on function public.unique_slug(text, text) from public, anon, authenticated;

-- A DJ edits their profile; ownership, slug and publishing stay with the team.
create function public.guard_dj_team_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (
       new.user_id is distinct from old.user_id
       or new.slug is distinct from old.slug
       or new.is_published is distinct from old.is_published
     )
     and auth.uid() is not null
     and not public.is_superadmin() then
    raise exception 'only superadmin can change owner, slug or publishing' using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke all on function public.guard_dj_team_fields() from public, anon, authenticated;

create trigger djs_guard_team_fields
  before update on public.djs
  for each row execute function public.guard_dj_team_fields();

grant select on public.djs to anon, authenticated;
grant insert, update, delete on public.djs to authenticated;

create policy djs_select on public.djs
  for select to anon, authenticated
  using (is_published or user_id = (select auth.uid()) or public.is_superadmin());

create policy djs_insert_superadmin on public.djs
  for insert to authenticated
  with check (public.is_superadmin());

create policy djs_update on public.djs
  for update to authenticated
  using (user_id = (select auth.uid()) or public.is_superadmin())
  with check (user_id = (select auth.uid()) or public.is_superadmin());

create policy djs_delete_superadmin on public.djs
  for delete to authenticated
  using (public.is_superadmin());

grant select on public.event_djs to anon, authenticated;
grant insert, update, delete on public.event_djs to authenticated;

create policy event_djs_select on public.event_djs
  for select to anon, authenticated
  using (
    (
      public.is_event_public(event_id)
      and exists (select 1 from public.djs d where d.id = dj_id and d.is_published)
    )
    or public.is_venue_member(public.event_venue_id(event_id))
    or public.is_superadmin()
  );

create policy event_djs_insert on public.event_djs
  for insert to authenticated
  with check (
    (public.is_venue_member(public.event_venue_id(event_id), 'admin') or public.is_superadmin())
    and exists (select 1 from public.djs d where d.id = dj_id and d.is_published)
  );

create policy event_djs_update on public.event_djs
  for update to authenticated
  using (public.is_venue_member(public.event_venue_id(event_id), 'admin') or public.is_superadmin())
  with check (public.is_venue_member(public.event_venue_id(event_id), 'admin') or public.is_superadmin());

create policy event_djs_delete on public.event_djs
  for delete to authenticated
  using (public.is_venue_member(public.event_venue_id(event_id), 'admin') or public.is_superadmin());

-- ------------------------------------------------------------ venue invites
create table public.venue_invites (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues (id) on delete cascade,
  email text not null check (email = lower(email) and char_length(email) between 3 and 254),
  role text not null check (role in ('admin', 'host')),
  token_hash text not null unique,
  invited_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '7 days',
  accepted_by uuid references public.profiles (id) on delete set null,
  accepted_at timestamptz
);

create index venue_invites_venue_id_idx on public.venue_invites (venue_id);
create index venue_invites_invited_by_idx on public.venue_invites (invited_by);
create index venue_invites_accepted_by_idx on public.venue_invites (accepted_by);
create unique index venue_invites_one_open_idx
  on public.venue_invites (venue_id, email) where accepted_at is null;

alter table public.venue_invites enable row level security;
revoke all on public.venue_invites from anon, authenticated;
-- token_hash is not readable by clients.
grant select (id, venue_id, email, role, invited_by, created_at, expires_at, accepted_by, accepted_at)
  on public.venue_invites to authenticated;
grant delete on public.venue_invites to authenticated;

create policy venue_invites_select on public.venue_invites
  for select to authenticated
  using (public.is_venue_member(venue_id, 'owner') or public.is_superadmin());

-- Owner / superadmin cancel an open invite.
create policy venue_invites_delete on public.venue_invites
  for delete to authenticated
  using (accepted_at is null and (public.is_venue_member(venue_id, 'owner') or public.is_superadmin()));

-- ---------------------------------------------------------------------- RPCs
-- Creates an invite and returns the raw token ONCE; only sha256(token) is stored.
create function public.create_venue_invite(p_venue_id uuid, p_email text, p_role text)
returns text
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_email text := lower(btrim(coalesce(p_email, '')));
  v_token text;
begin
  if (select auth.uid()) is null
     or not (public.is_venue_member(p_venue_id, 'owner') or public.is_superadmin()) then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if p_role not in ('admin', 'host')
     or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
     or char_length(v_email) > 254 then
    raise exception 'invalid invite' using errcode = '22023';
  end if;

  v_token := encode(extensions.gen_random_bytes(32), 'hex');

  -- A new invite replaces an unaccepted one for the same email.
  delete from public.venue_invites
    where venue_id = p_venue_id and email = v_email and accepted_at is null;
  insert into public.venue_invites (venue_id, email, role, token_hash, invited_by)
    values (p_venue_id, v_email, p_role, encode(sha256(convert_to(v_token, 'UTF8')), 'hex'), (select auth.uid()));

  return v_token;
end;
$$;

-- The invited, confirmed user accepts. Single-use: the conditional update claims the invite atomically.
create function public.accept_venue_invite(p_token text)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_email text;
  v_invite public.venue_invites%rowtype;
begin
  if v_uid is null or not public.can_interact() then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  select lower(u.email) into v_email from auth.users u where u.id = v_uid;

  update public.venue_invites
    set accepted_by = v_uid, accepted_at = now()
    where token_hash = encode(sha256(convert_to(coalesce(p_token, ''), 'UTF8')), 'hex')
      and accepted_at is null
      and expires_at > now()
      and email = v_email
    returning * into v_invite;
  if not found then
    raise exception 'invalid invite' using errcode = '22023';
  end if;

  insert into public.venue_members (venue_id, user_id, role)
    values (v_invite.venue_id, v_uid, v_invite.role)
    on conflict (venue_id, user_id) do update
      set role = case when public.venue_members.role = 'owner' then 'owner' else excluded.role end;
  return v_invite.venue_id;
end;
$$;

-- Returns the venue id (venue applications) or the DJ profile id (DJ applications).
create function public.approve_application(p_id uuid)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_admin uuid := (select auth.uid());
  v_app public.account_applications%rowtype;
  v_result uuid;
begin
  if v_admin is null or not public.is_superadmin() then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  select * into v_app from public.account_applications where id = p_id for update;
  if not found or v_app.status <> 'pending' then
    raise exception 'application not pending' using errcode = '22023';
  end if;
  if v_app.user_id = v_admin then
    raise exception 'cannot approve your own application' using errcode = '42501';
  end if;

  if v_app.kind = 'venue' then
    if v_app.payload ? 'venue_id' then
      select v.id into v_result from public.venues v where v.id = (v_app.payload ->> 'venue_id')::uuid;
      if v_result is null then
        raise exception 'venue not found' using errcode = '22023';
      end if;
    else
      insert into public.venues (slug, name, address)
        values (
          public.unique_slug(v_app.payload ->> 'name', 'venues'),
          btrim(v_app.payload ->> 'name'),
          nullif(btrim(v_app.payload ->> 'address'), '')
        )
        returning id into v_result;
    end if;
    insert into public.venue_members (venue_id, user_id, role)
      values (v_result, v_app.user_id, 'owner')
      on conflict (venue_id, user_id) do update set role = 'owner';
  else
    if v_app.payload ? 'dj_id' then
      update public.djs set user_id = v_app.user_id
        where id = (v_app.payload ->> 'dj_id')::uuid
          and (user_id is null or user_id = v_app.user_id)
        returning id into v_result;
      if v_result is null then
        raise exception 'dj profile not available' using errcode = '22023';
      end if;
    else
      select d.id into v_result from public.djs d where d.user_id = v_app.user_id;
      if v_result is null then
        insert into public.djs (user_id, stage_name, slug, is_published)
          values (
            v_app.user_id,
            btrim(v_app.payload ->> 'stage_name'),
            public.unique_slug(v_app.payload ->> 'stage_name', 'djs'),
            true
          )
          returning id into v_result;
      end if;
    end if;
    update public.profiles set is_dj = true where id = v_app.user_id;
  end if;

  update public.account_applications
    set status = 'approved', decided_by = v_admin, decided_at = now()
    where id = v_app.id;
  return v_result;
end;
$$;

create function public.reject_application(p_id uuid, p_reason text)
returns void
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_admin uuid := (select auth.uid());
begin
  if v_admin is null or not public.is_superadmin() then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if p_reason is null or char_length(btrim(p_reason)) not between 1 and 500 then
    raise exception 'reason required' using errcode = '22023';
  end if;

  update public.account_applications
    set status = 'rejected', reject_reason = btrim(p_reason), decided_by = v_admin, decided_at = now()
    where id = p_id and status = 'pending';
  if not found then
    raise exception 'application not pending' using errcode = '22023';
  end if;
end;
$$;

revoke all on function public.create_venue_invite(uuid, text, text) from public, anon;
revoke all on function public.accept_venue_invite(text) from public, anon;
revoke all on function public.approve_application(uuid) from public, anon;
revoke all on function public.reject_application(uuid, text) from public, anon;
grant execute on function public.create_venue_invite(uuid, text, text) to authenticated;
grant execute on function public.accept_venue_invite(text) to authenticated;
grant execute on function public.approve_application(uuid) to authenticated;
grant execute on function public.reject_application(uuid, text) to authenticated;

-- ----------------------------------------------------------------- storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('venue-media', 'venue-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('dj-media', 'dj-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy venue_media_select on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'venue-media');

-- Folder = venue id. Owner / admin of that venue (or superadmin) write.
create policy venue_media_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'venue-media'
    and (public.is_venue_member(public.storage_folder_uuid(name), 'admin') or public.is_superadmin())
  );

create policy venue_media_update on storage.objects
  for update to authenticated
  using (
    bucket_id = 'venue-media'
    and (public.is_venue_member(public.storage_folder_uuid(name), 'admin') or public.is_superadmin())
  );

create policy venue_media_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'venue-media'
    and (public.is_venue_member(public.storage_folder_uuid(name), 'admin') or public.is_superadmin())
  );

create policy dj_media_select on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'dj-media');

-- Folder = DJ profile id. Only that DJ (or superadmin) writes.
create policy dj_media_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'dj-media'
    and (public.is_dj_owner(public.storage_folder_uuid(name)) or public.is_superadmin())
  );

create policy dj_media_update on storage.objects
  for update to authenticated
  using (
    bucket_id = 'dj-media'
    and (public.is_dj_owner(public.storage_folder_uuid(name)) or public.is_superadmin())
  );

create policy dj_media_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'dj-media'
    and (public.is_dj_owner(public.storage_folder_uuid(name)) or public.is_superadmin())
  );
