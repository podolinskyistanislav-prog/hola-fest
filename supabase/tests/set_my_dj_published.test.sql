-- pgTAP: set_my_dj_published lets a DJ toggle only their own publishing.
begin;
select plan(9);

insert into auth.users (id, instance_id, aud, role, is_anonymous, email) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'pub-dj@example.com'),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'pub-other@example.com'),
  ('00000000-0000-0000-0000-0000000000e3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false, 'pub-stranger@example.com');
insert into public.djs (id, user_id, stage_name, slug, is_published) values
  ('00000000-0000-0000-0000-0000000000e4', '00000000-0000-0000-0000-0000000000e1', 'Pub DJ', 'pub-dj', true),
  ('00000000-0000-0000-0000-0000000000e5', '00000000-0000-0000-0000-0000000000e2', 'Other DJ', 'pub-other', true);

set local role anon;
select throws_ok($$select public.set_my_dj_published(false)$$, '42501', null, 'anon cannot call the RPC');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000e3","is_anonymous":false}', true);
select throws_ok($$select public.set_my_dj_published(false)$$, 'P0002', null, 'user without DJ profile is rejected');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000e1","is_anonymous":false}', true);
select lives_ok($$select public.set_my_dj_published(false)$$, 'DJ unpublishes own profile');
select is((select is_published from public.djs where id = '00000000-0000-0000-0000-0000000000e4'), false, 'own profile is unpublished');
select lives_ok($$select public.set_my_dj_published(true)$$, 'DJ publishes own profile');
select is((select is_published from public.djs where id = '00000000-0000-0000-0000-0000000000e4'), true, 'own profile is published');
select throws_ok($$update public.djs set is_published = false where user_id = '00000000-0000-0000-0000-0000000000e1'$$,
  '42501', null, 'direct is_published update still fails');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000e1","is_anonymous":true}', true);
select throws_ok($$select public.set_my_dj_published(false)$$, '42501', null, 'anonymous guest cannot call the RPC');

reset role;
select is((select is_published from public.djs where id = '00000000-0000-0000-0000-0000000000e5'), true, 'another DJ row is untouched');

select * from finish();
rollback;
