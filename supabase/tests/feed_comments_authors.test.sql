-- pgTAP: feed_comments / feed_authors views and delete-own rules.
begin;
select plan(10);

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- alice
  ('00000000-0000-0000-0000-0000000000f2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- bob
  ('00000000-0000-0000-0000-0000000000f3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false); -- banned

update public.profiles set handle = 'alice_f', display_name = 'Alice' where id = '00000000-0000-0000-0000-0000000000f1';
update public.profiles set handle = 'bob_f', display_name = 'Bob', is_dj = true where id = '00000000-0000-0000-0000-0000000000f2';
update public.profiles set handle = 'ban_f', display_name = 'Banned', is_banned = true where id = '00000000-0000-0000-0000-0000000000f3';

insert into public.posts (id, author_id, body) values
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000f1', 'alice post');
insert into public.post_comments (id, post_id, author_id, parent_id, body, hidden_at, hidden_reason) values
  ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000f2', null, 'bob top', null, null),
  ('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000a2', 'alice reply', null, null),
  ('00000000-0000-0000-0000-0000000000a4', '00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000f2', null, 'hidden one', now(), 'reports'),
  ('00000000-0000-0000-0000-0000000000a5', '00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000f3', null, 'banned one', null, null);

set local role anon;
select is((select count(*)::int from public.feed_comments where post_id = '00000000-0000-0000-0000-0000000000a1'), 2,
  'anon sees only visible comments (hidden and banned excluded)');
select is((select label from public.feed_comments where id = '00000000-0000-0000-0000-0000000000a2'), 'dj', 'dj label on comments');
select is((select author_handle from public.feed_comments where id = '00000000-0000-0000-0000-0000000000a3'), 'alice_f', 'author handle on comments');
select is((select count(*)::int from public.feed_authors where handle = 'bob_f'), 1, 'author found by handle');
select is((select count(*)::int from public.feed_authors where handle = 'ban_f'), 0, 'banned author not found');
reset role;

-- alice blocks bob: his comment and the reply under it disappear for her only
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f1","is_anonymous":false}', true);
insert into public.user_blocks (blocker_id, blocked_id) values ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000f2');
select is((select count(*)::int from public.feed_comments where post_id = '00000000-0000-0000-0000-0000000000a1'), 0,
  'blocked author comments and replies under them are filtered');
select is((select count(*)::int from public.feed_authors where handle = 'bob_f'), 0, 'blocked author not found');

-- a stranger cannot delete others' content nor read hidden comments
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000f2","is_anonymous":false}', true);
select is((select count(*)::int from public.post_comments where id = '00000000-0000-0000-0000-0000000000a4'), 0,
  'a hidden comment is not readable, even by its own author');
delete from public.posts where id = '00000000-0000-0000-0000-0000000000a1';
delete from public.post_comments where id = '00000000-0000-0000-0000-0000000000a3';
reset role;
select is((select count(*)::int from public.post_comments where id = '00000000-0000-0000-0000-0000000000a3'), 1,
  'stranger cannot delete another user''s comment');
select is((select count(*)::int from public.posts where id = '00000000-0000-0000-0000-0000000000a1'), 1,
  'stranger cannot delete another user''s post');

select * from finish();
rollback;
