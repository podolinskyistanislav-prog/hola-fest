-- pgTAP: the before-user-created hook lets anonymous guests in and rejects everything else.
begin;
select plan(7);

select is(
  public.hook_before_user_created('{"user":{"is_anonymous":true}}'::jsonb),
  '{}'::jsonb,
  'anonymous guest sign-up is allowed');
select is(
  public.hook_before_user_created('{"user":{"is_anonymous":false,"email":"a@example.com"}}'::jsonb) -> 'error' ->> 'http_code',
  '403',
  'email sign-up is rejected with 403');
select is(
  public.hook_before_user_created('{"user":{"email":"a@example.com"}}'::jsonb) -> 'error' ->> 'http_code',
  '403',
  'user without is_anonymous flag is rejected');
select is(
  public.hook_before_user_created('{}'::jsonb) -> 'error' ->> 'http_code',
  '403',
  'malformed event is rejected');

select ok(
  has_function_privilege('supabase_auth_admin', 'public.hook_before_user_created(jsonb)', 'execute'),
  'supabase_auth_admin can run the hook');
select ok(
  not has_function_privilege('anon', 'public.hook_before_user_created(jsonb)', 'execute'),
  'anon cannot run the hook');
select ok(
  not has_function_privilege('authenticated', 'public.hook_before_user_created(jsonb)', 'execute'),
  'authenticated cannot run the hook');

select * from finish();
rollback;
