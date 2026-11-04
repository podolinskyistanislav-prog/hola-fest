-- Only anonymous guests may self-register. Email accounts (venue staff, superadmin) are
-- created by the founder via the Supabase dashboard / admin API.
-- The auth setting enable_signup=false would also block anonymous sign-ins, so a
-- before-user-created hook (registered in supabase/config.toml) does the filtering.

create or replace function public.hook_before_user_created(event jsonb)
returns jsonb
language plpgsql
stable
set search_path = ''
as $$
begin
  if coalesce((event -> 'user' ->> 'is_anonymous')::boolean, false) then
    return '{}'::jsonb;
  end if;

  return jsonb_build_object(
    'error', jsonb_build_object(
      'http_code', 403,
      'message', 'Sign-up is not allowed.'
    )
  );
end;
$$;

revoke all on function public.hook_before_user_created(jsonb) from public, anon, authenticated;
grant execute on function public.hook_before_user_created(jsonb) to supabase_auth_admin;
