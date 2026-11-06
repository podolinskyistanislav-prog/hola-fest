-- pgTAP: members read their own unpublished venue; strangers and anon still do not.
begin;
select plan(6);

delete from public.venues;

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false),
  ('00000000-0000-0000-0000-0000000000f2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false);

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000a1', 'mine', 'Mine', false),
  ('00000000-0000-0000-0000-0000000000a2', 'other', 'Other', false);

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000f1', 'admin');

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000f1', true);
select results_eq($$select slug from public.venues order by slug$$, array['mine'], 'member reads only own unpublished venue');
select is((select count(*)::int from public.venues where slug = 'other'), 0, 'member cannot read another unpublished venue');
update public.venues set name = 'Hacked' where slug = 'mine';
reset role;
select is((select name from public.venues where slug = 'mine'), 'Mine', 'member still cannot edit the venue');

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000f2', true);
select is((select count(*)::int from public.venues), 0, 'stranger sees no unpublished venues');

reset role;
set local role anon;
select is((select count(*)::int from public.venues), 0, 'anon sees no unpublished venues');
reset role;
select is((select count(*)::int from public.venues), 2, 'rows exist (sanity)');

select * from finish();
rollback;
