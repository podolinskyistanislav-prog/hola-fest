-- Live "is this @handle free?" check for profile setup. Returns only a boolean.
create function public.handle_available(p_handle text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select p_handle is not null
    and p_handle ~ '^[a-z0-9_.]{3,20}$'
    and not exists (
      select 1 from public.profiles pr
      where pr.handle = p_handle
        and pr.id is distinct from auth.uid()
    );
$$;

revoke all on function public.handle_available(text) from public, anon;
grant execute on function public.handle_available(text) to authenticated;
