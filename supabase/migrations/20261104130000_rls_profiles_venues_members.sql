-- RLS v1 part 1: helper functions, profiles, venues, venue_members.
-- events/offers/claims stay closed (no grants, no policies) until their own task.

create function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select p.is_superadmin from public.profiles p where p.id = (select auth.uid())),
    false
  );
$$;

create function public.is_venue_member(p_venue_id uuid, p_role text default null)
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
      and (p_role is null or vm.role = p_role)
  );
$$;

-- Policies on anon-readable tables call these helpers, so anon needs execute.
-- Both return false for anon (auth.uid() is null) and leak nothing else.
revoke all on function public.is_superadmin() from public;
revoke all on function public.is_venue_member(uuid, text) from public;
grant execute on function public.is_superadmin() to anon, authenticated;
grant execute on function public.is_venue_member(uuid, text) to anon, authenticated;

-- profiles: the user reads/writes only their own row; is_superadmin is not grantable.
grant select on public.profiles to authenticated;
grant insert (id, display_name) on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;

create policy profiles_select_own on public.profiles
  for select to authenticated
  using (id = (select auth.uid()));

create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check (id = (select auth.uid()) and is_superadmin = false);

create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- venues: published venues are public (anon needs read to browse); only superadmin writes.
grant select on public.venues to anon, authenticated;
grant insert, update, delete on public.venues to authenticated;

create policy venues_select_published on public.venues
  for select to anon, authenticated
  using (is_published or public.is_superadmin());

create policy venues_insert_superadmin on public.venues
  for insert to authenticated
  with check (public.is_superadmin());

create policy venues_update_superadmin on public.venues
  for update to authenticated
  using (public.is_superadmin())
  with check (public.is_superadmin());

create policy venues_delete_superadmin on public.venues
  for delete to authenticated
  using (public.is_superadmin());

-- venue_members: the member and the venue's admins read; only superadmin writes.
grant select, insert, update, delete on public.venue_members to authenticated;

create policy venue_members_select on public.venue_members
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or public.is_venue_member(venue_id, 'admin')
    or public.is_superadmin()
  );

create policy venue_members_insert_superadmin on public.venue_members
  for insert to authenticated
  with check (public.is_superadmin());

create policy venue_members_update_superadmin on public.venue_members
  for update to authenticated
  using (public.is_superadmin())
  with check (public.is_superadmin());

create policy venue_members_delete_superadmin on public.venue_members
  for delete to authenticated
  using (public.is_superadmin());
