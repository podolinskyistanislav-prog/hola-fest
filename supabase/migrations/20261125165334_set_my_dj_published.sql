-- A DJ publishes / unpublishes their own profile through an RPC.
-- Direct edits of owner, slug and publishing stay blocked by the trigger; the RPC passes
-- through with a transaction-local marker naming the one row it is allowed to change.

create or replace function public.guard_dj_team_fields()
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
     and not public.is_superadmin()
     and not (
       new.user_id is not distinct from old.user_id
       and new.slug is not distinct from old.slug
       and old.user_id = auth.uid()
       and coalesce(current_setting('app.publishing_dj_id', true), '') = old.id::text
     ) then
    raise exception 'only superadmin can change owner, slug or publishing' using errcode = '42501';
  end if;
  return new;
end;
$$;

create function public.set_my_dj_published(p_published boolean)
returns void
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_dj_id uuid;
begin
  if p_published is null or not public.can_interact() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  select d.id into v_dj_id from public.djs d where d.user_id = (select auth.uid());
  if v_dj_id is null then
    raise exception 'no dj profile' using errcode = 'P0002';
  end if;

  perform set_config('app.publishing_dj_id', v_dj_id::text, true);
  update public.djs set is_published = p_published where id = v_dj_id;
  perform set_config('app.publishing_dj_id', '', true);
end;
$$;

revoke all on function public.set_my_dj_published(boolean) from public, anon;
grant execute on function public.set_my_dj_published(boolean) to authenticated;
