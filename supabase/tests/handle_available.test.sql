-- pgTAP: handle_available RPC.
begin;
select plan(7);

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false);
update public.profiles set handle = 'mine_e1' where id = '00000000-0000-0000-0000-0000000000e1';
update public.profiles set handle = 'taken_e2' where id = '00000000-0000-0000-0000-0000000000e2';

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000e1', true);

select is(public.handle_available('free_handle'), true, 'free handle is available');
select is(public.handle_available('taken_e2'), false, 'handle of another profile is taken');
select is(public.handle_available('mine_e1'), true, 'own current handle is available');
select is(public.handle_available('Bad Handle!'), false, 'invalid format is not available');
select is(public.handle_available('ab'), false, 'too short is not available');
select is(public.handle_available(null), false, 'null is not available');

reset role;
set local role anon;
select throws_ok($$select public.handle_available('free_handle')$$, '42501', null, 'anon cannot execute');

select * from finish();
rollback;
