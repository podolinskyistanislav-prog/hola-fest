-- pgTAP: RLS access matrix. Six roles x six tables x read/write, per "Access rules" in docs/ARCHITECTURE.md.
--
-- Each matrix row is one statement, run as each role in turn, with the expected outcome per role:
--   D  = denied (SQLSTATE 42501: no grant, or RLS with-check failure)
--   N  = statement succeeded and touched/returned N rows (0 = silently filtered by RLS)
-- Every statement is rolled back after measuring, so the fixture is identical for every role.
-- Read statements count only fixture rows (uuid prefix), so seed data from supabase/seed.sql cannot change the counts.
-- In statements, @xN is the fixture uuid 00000000-0000-0000-0000-0000000000xN, and @me is the caller's uuid.
begin;
select * from no_plan();

create schema matrix_test;
grant usage on schema matrix_test to anon, authenticated;

create function matrix_test.try(p_sql text) returns text
language plpgsql as $f$
declare n int; res text;
begin
  begin
    execute p_sql;
    get diagnostics n = row_count;
    res := n::text;
    raise exception 'rollback' using errcode = 'P0099';
  exception
    when sqlstate 'P0099' then null;
    when others then res := case sqlstate when '42501' then 'D' else 'E' || sqlstate end;
  end;
  return res;
end
$f$;
grant execute on function matrix_test.try(text) to anon, authenticated;

insert into auth.users (id, instance_id, aud, role)
select ('00000000-0000-0000-0000-0000000000' || n)::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'
from (values ('a1'), ('a2'), ('a3'), ('a4'), ('a5'), ('a6'), ('a7')) t(n);

-- a1 superadmin, a2 admin of venue A, a3 host of venue A, a4 stranger, a5 admin of venue B.
-- a6 has no profile yet; a7 only exists as a target for impersonation.
insert into public.profiles (id, display_name, is_superadmin) values
  ('00000000-0000-0000-0000-0000000000a1', 'root', true),
  ('00000000-0000-0000-0000-0000000000a2', 'adminA', false),
  ('00000000-0000-0000-0000-0000000000a3', 'hostA', false),
  ('00000000-0000-0000-0000-0000000000a4', 'stranger', false),
  ('00000000-0000-0000-0000-0000000000a5', 'adminB', false)
on conflict (id) do update set display_name = excluded.display_name, is_superadmin = excluded.is_superadmin;

-- the sign-up trigger also created a6 and a7; a6 must start without a profile
delete from public.profiles where id = '00000000-0000-0000-0000-0000000000a6';

-- b1 = A, b2 = B (published); b3 hidden (unpublished, has an event); b4 published and empty (deletable)
insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000b1', 'a', 'A', true),
  ('00000000-0000-0000-0000-0000000000b2', 'b', 'B', true),
  ('00000000-0000-0000-0000-0000000000b3', 'hidden', 'Hidden', false),
  ('00000000-0000-0000-0000-0000000000b4', 'empty', 'Empty', true);

insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a2', 'admin'),
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a3', 'host'),
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a5', 'admin');

-- c1 A published, c2 A draft, c3 B published, c4 published but venue hidden, c5 A draft, c6 B draft
insert into public.events (id, venue_id, title, starts_at, status) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'A pub', now() + interval '1 day', 'published'),
  ('00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-0000000000b1', 'A draft', now() + interval '2 day', 'draft'),
  ('00000000-0000-0000-0000-0000000000c3', '00000000-0000-0000-0000-0000000000b2', 'B pub', now() + interval '1 day', 'published'),
  ('00000000-0000-0000-0000-0000000000c4', '00000000-0000-0000-0000-0000000000b3', 'Hidden pub', now() + interval '1 day', 'published'),
  ('00000000-0000-0000-0000-0000000000c5', '00000000-0000-0000-0000-0000000000b1', 'A draft 2', now() + interval '3 day', 'draft'),
  ('00000000-0000-0000-0000-0000000000c6', '00000000-0000-0000-0000-0000000000b2', 'B draft', now() + interval '3 day', 'draft');

-- d1..d6 hang off c1..c6
insert into public.offers (id, event_id, title) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000c1', 'o1'),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000c2', 'o2'),
  ('00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000c3', 'o3'),
  ('00000000-0000-0000-0000-0000000000d4', '00000000-0000-0000-0000-0000000000c4', 'o4'),
  ('00000000-0000-0000-0000-0000000000d5', '00000000-0000-0000-0000-0000000000c5', 'o5'),
  ('00000000-0000-0000-0000-0000000000d6', '00000000-0000-0000-0000-0000000000c6', 'o6');

-- e1: stranger's claim on venue A offer; e2: host A's own claim on venue B offer
insert into public.claims (id, offer_id, user_id, token_hash) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000a4', 'h1'),
  ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000a3', 'h2');

create function matrix_test.run() returns setof text
language plpgsql as $f$
declare
  roles text[] := array['anon', 'stranger', 'host A', 'admin A', 'admin B', 'superadmin'];
  subs text[] := array['', '00000000-0000-0000-0000-0000000000a4', '00000000-0000-0000-0000-0000000000a3',
                       '00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-0000000000a5',
                       '00000000-0000-0000-0000-0000000000a1'];
  r record;
  i int;
  stmt text;
  got text;
  want text;
begin
  for r in
    select label, sql, string_to_array(expected, ' ') as expected
    from (values
      -- reads                         anon stranger host adminA adminB super
      ('read venues',                  $$select 1 from public.venues where id::text like '00000000-0000-0000-0000-0000000000%'$$,         '3 3 3 3 3 4'),
      ('read events',                  $$select 1 from public.events where id::text like '00000000-0000-0000-0000-0000000000%'$$,         '2 2 4 4 3 6'),
      ('read offers',                  $$select 1 from public.offers where id::text like '00000000-0000-0000-0000-0000000000%'$$,         '2 2 2 4 3 6'),
      ('read claims',                  $$select 1 from public.claims where id::text like '00000000-0000-0000-0000-0000000000%'$$,         'D 1 2 1 1 2'),
      ('read venue_members',           $$select 1 from public.venue_members where venue_id::text like '00000000-0000-0000-0000-0000000000%'$$, 'D 0 1 2 1 3'),
      ('read profiles',                $$select 1 from public.profiles where id::text like '00000000-0000-0000-0000-0000000000%'$$,       'D 1 1 1 1 1'),
      ('read claims.token_hash',       'select token_hash from public.claims', 'D D D D D D'),
      ('is_superadmin()',              'select 1 where public.is_superadmin()', '0 0 0 0 0 1'),
      -- venues: only superadmin writes
      ('venues insert',                $$insert into public.venues (slug, name) values ('new', 'new')$$, 'D D D D D 1'),
      ('venues update',                $$update public.venues set name = 'x' where id = '@b1'$$,        'D 0 0 0 0 1'),
      ('venues delete',                $$delete from public.venues where id = '@b4'$$,                   'D 0 0 0 0 1'),
      -- events: venue admin of that venue and superadmin only; host and stranger never
      ('events insert in venue A',     $$insert into public.events (venue_id, title, starts_at) values ('@b1', 'x', now())$$, 'D D D 1 D 1'),
      ('events update in venue A',     $$update public.events set title = 'x' where id = '@c5'$$,        'D 0 0 1 0 1'),
      ('events delete in venue A',     $$delete from public.events where id = '@c5'$$,                   'D 0 0 1 0 1'),
      ('events insert in venue B',     $$insert into public.events (venue_id, title, starts_at) values ('@b2', 'x', now())$$, 'D D D D 1 1'),
      ('events update in venue B',     $$update public.events set title = 'x' where id = '@c6'$$,        'D 0 0 0 1 1'),
      ('events delete in venue B',     $$delete from public.events where id = '@c6'$$,                   'D 0 0 0 1 1'),
      ('events move A -> B',           $$update public.events set venue_id = '@b2' where id = '@c5'$$,   'D 0 0 D 0 1'),
      -- offers
      ('offers insert in venue A',     $$insert into public.offers (event_id, title) values ('@c5', 'x')$$, 'D D D 1 D 1'),
      ('offers update in venue A',     $$update public.offers set title = 'x' where id = '@d5'$$,        'D 0 0 1 0 1'),
      ('offers delete in venue A',     $$delete from public.offers where id = '@d5'$$,                   'D 0 0 1 0 1'),
      ('offers insert in venue B',     $$insert into public.offers (event_id, title) values ('@c6', 'x')$$, 'D D D D 1 1'),
      ('offers update in venue B',     $$update public.offers set title = 'x' where id = '@d6'$$,        'D 0 0 0 1 1'),
      ('offers delete in venue B',     $$delete from public.offers where id = '@d6'$$,                   'D 0 0 0 1 1'),
      ('offers move A -> B',           $$update public.offers set event_id = '@c6' where id = '@d5'$$,   'D 0 0 D 0 1'),
      -- claims: nobody writes directly, not even superadmin (service role only)
      ('claims insert',                $$insert into public.claims (offer_id, user_id, token_hash) values ('@d1', '@me', 'forged')$$, 'D D D D D D'),
      ('claims update',                $$update public.claims set status = 'redeemed' where id = '@e1'$$, 'D D D D D D'),
      ('claims delete',                $$delete from public.claims where id = '@e1'$$,                   'D D D D D D'),
      -- venue_members: only superadmin writes (nobody makes themself admin or host)
      ('venue_members insert self',    $$insert into public.venue_members (venue_id, user_id, role) values ('@b1', '@me', 'admin')$$, 'D D D D D 1'),
      ('venue_members update',         $$update public.venue_members set role = 'admin' where venue_id = '@b1' and user_id = '@a3'$$, 'D 0 0 0 0 1'),
      ('venue_members delete',         $$delete from public.venue_members where venue_id = '@b1' and user_id = '@a3'$$, 'D 0 0 0 0 1'),
      ('venue_members move A -> B',    $$update public.venue_members set venue_id = '@b2' where user_id = '@a3'$$, 'D 0 0 0 0 1'),
      -- profiles: only your own row, never is_superadmin
      ('profiles update own name',     $$update public.profiles set display_name = 'x' where id = '@me'$$, 'D 1 1 1 1 1'),
      ('profiles update own is_superadmin', $$update public.profiles set is_superadmin = true where id = '@me'$$, 'D D D D D D'),
      ('profiles update other name',   $$update public.profiles set display_name = 'x' where id = '@a1'$$, 'D 0 0 0 0 1'),
      ('profiles insert is_superadmin', $$insert into public.profiles (id, display_name, is_superadmin) values ('@me', 'x', true)$$, 'D D D D D D'),
      ('profiles insert for someone else', $$insert into public.profiles (id, display_name) values ('@a7', 'impostor')$$, 'D D D D D D'),
      ('profiles delete own',          $$delete from public.profiles where id = '@me'$$, 'D D D D D D')
    ) as m(label, sql, expected)
  loop
    for i in 1..6 loop
      stmt := regexp_replace(replace(r.sql, '@me', coalesce(nullif(subs[i], ''), '00000000-0000-0000-0000-000000000000')), '@([a-e][0-9])', '00000000-0000-0000-0000-0000000000\1', 'g');
      perform set_config('request.jwt.claim.sub', subs[i], true);
      perform set_config('role', case when i = 1 then 'anon' else 'authenticated' end, true);
      got := matrix_test.try(stmt);
      reset role;
      want := r.expected[i];
      return next is(got, want, roles[i] || ': ' || r.label);
    end loop;
  end loop;
end
$f$;

select * from matrix_test.run();

-- a user without a profile may create their own, but only as a non-superadmin
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a6', true);
select lives_ok(
  $$insert into public.profiles (id, display_name) values ('00000000-0000-0000-0000-0000000000a6', 'me')$$,
  'user creates own profile'
);
reset role;

select * from finish();
rollback;
