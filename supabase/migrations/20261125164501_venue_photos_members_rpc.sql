-- Business cabinet services (#282): venue photo gallery + team listing with profile names.

-- ------------------------------------------------------------- venue photos
create table public.venue_photos (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues (id) on delete cascade,
  kind text not null check (kind in ('outside', 'inside')),
  path text not null unique check (path like venue_id::text || '/%'),
  created_at timestamptz not null default now()
);

create index venue_photos_venue_id_idx on public.venue_photos (venue_id, kind, created_at);

alter table public.venue_photos enable row level security;
revoke all on public.venue_photos from anon, authenticated;
grant select on public.venue_photos to anon, authenticated;
grant insert (venue_id, kind, path), delete on public.venue_photos to authenticated;

-- Public for published venues (venues RLS decides what the caller sees); members see their own always.
create policy venue_photos_select on public.venue_photos
  for select to anon, authenticated
  using (
    exists (select 1 from public.venues v where v.id = venue_id and v.is_published)
    or public.is_venue_member(venue_id)
    or public.is_superadmin()
  );

create policy venue_photos_insert on public.venue_photos
  for insert to authenticated
  with check (public.is_venue_member(venue_id, 'admin') or public.is_superadmin());

create policy venue_photos_delete on public.venue_photos
  for delete to authenticated
  using (public.is_venue_member(venue_id, 'admin') or public.is_superadmin());

-- ------------------------------------------------------------- team listing
-- Profiles are private, so the team list goes through a definer function limited to venue admins.
create function public.list_venue_members(p_venue_id uuid)
returns table (user_id uuid, role text, display_name text, handle text)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null
     or not (public.is_venue_member(p_venue_id, 'admin') or public.is_superadmin()) then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  return query
    select vm.user_id, vm.role, p.display_name, p.handle
    from public.venue_members vm
    join public.profiles p on p.id = vm.user_id
    where vm.venue_id = p_venue_id
    order by case vm.role when 'owner' then 0 when 'admin' then 1 else 2 end, p.display_name;
end;
$$;

revoke all on function public.list_venue_members(uuid) from public, anon, authenticated;
grant execute on function public.list_venue_members(uuid) to authenticated;
