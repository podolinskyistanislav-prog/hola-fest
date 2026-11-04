-- Every new auth user (anonymous guest or staff) automatically gets a profiles row.
-- is_superadmin is never set here: it keeps its default (false) and is changed only manually by the founder.

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Only the trigger runs this function; no API role may call it.
revoke all on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill users created before the trigger existed (idempotent).
insert into public.profiles (id)
select u.id
from auth.users u
on conflict (id) do nothing;
