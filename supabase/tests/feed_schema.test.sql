-- pgTAP: feed schema, labels and RLS.
begin;
select plan(26);

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- alice
  ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- bob
  ('00000000-0000-0000-0000-0000000000b3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true),  -- anon guest
  ('00000000-0000-0000-0000-0000000000b4', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- banned
  ('00000000-0000-0000-0000-0000000000b5', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- dj
  ('00000000-0000-0000-0000-0000000000b6', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- superadmin
  ('00000000-0000-0000-0000-0000000000b7', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false); -- extra reporter

update public.profiles set is_banned = true where id = '00000000-0000-0000-0000-0000000000b4';
update public.profiles set is_dj = true, handle = 'dj_x' where id = '00000000-0000-0000-0000-0000000000b5';
update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000b6';

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000c1', 'feed-club', 'Feed Club', true);
insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b1', 'host');

insert into public.posts (id, author_id, as_venue_id, body) values
  ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000c1', 'club news'),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b2', null, 'plain post'),
  ('00000000-0000-0000-0000-0000000000d3', '00000000-0000-0000-0000-0000000000b5', null, 'dj post'),
  ('00000000-0000-0000-0000-0000000000d4', '00000000-0000-0000-0000-0000000000b6', null, 'team post'),
  ('00000000-0000-0000-0000-0000000000d5', '00000000-0000-0000-0000-0000000000b4', null, 'banned post');

-- constraints
select throws_ok($$insert into public.posts (author_id, as_venue_id, body) values ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000c1', 'x')$$,
  '42501', null, 'cannot post as a venue you are not a member of');
select throws_ok($$update public.profiles set handle = 'AB' where id = '00000000-0000-0000-0000-0000000000b2'$$,
  '23514', null, 'handle format enforced');
insert into public.post_comments (id, post_id, author_id, body) values
  ('00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b2', 'top');
select lives_ok($$insert into public.post_comments (id, post_id, author_id, parent_id, body) values ('00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000e1', 'reply')$$, 'one level reply allowed');
select throws_ok($$insert into public.post_comments (post_id, author_id, parent_id, body) values ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000e2', 'nested')$$,
  '23514', null, 'replies are one level deep');

-- labels (anonymous reader)
set local role anon;
select results_eq($$select label from public.feed_posts where id = '00000000-0000-0000-0000-0000000000d1'$$, array['club'], 'club label');
select results_eq($$select label from public.feed_posts where id = '00000000-0000-0000-0000-0000000000d3'$$, array['dj'], 'dj label');
select results_eq($$select label from public.feed_posts where id = '00000000-0000-0000-0000-0000000000d4'$$, array['hola'], 'hola label');
select is((select label from public.feed_posts where id = '00000000-0000-0000-0000-0000000000d2'), null, 'no label for a regular user');
select is((select count(*)::int from public.feed_posts where id = '00000000-0000-0000-0000-0000000000d5'), 0, 'banned author is excluded');
select is((select count(*)::int from public.posts where id = '00000000-0000-0000-0000-0000000000d5'), 0, 'banned author post hidden in posts too');
select throws_ok($$insert into public.posts (author_id, body) values ('00000000-0000-0000-0000-0000000000b2', 'x')$$, '42501', null, 'anon cannot insert posts');
select throws_ok($$insert into public.post_likes (post_id, user_id) values ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b2')$$, '42501', null, 'anon cannot like');
reset role;

-- anonymous (guest) user
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b3","is_anonymous":true}', true);
select throws_ok($$insert into public.post_likes (post_id, user_id) values ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b3')$$, '42501', null, 'anonymous guest cannot like');
select throws_ok($$insert into public.post_reports (post_id, reporter_id, reason) values ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b3', 'spam')$$, '42501', null, 'anonymous guest cannot report');

-- banned user
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b4","is_anonymous":false}', true);
select throws_ok($$insert into public.post_likes (post_id, user_id) values ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b4')$$, '42501', null, 'banned user cannot like');

-- confirmed user bob
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","is_anonymous":false}', true);
select lives_ok($$insert into public.post_likes (post_id, user_id) values ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000b2')$$, 'confirmed user likes');
select throws_ok($$insert into public.post_likes (post_id, user_id) values ('00000000-0000-0000-0000-0000000000d1', '00000000-0000-0000-0000-0000000000b1')$$, '42501', null, 'cannot like as someone else');
select throws_ok($$insert into public.posts (author_id, body) values ('00000000-0000-0000-0000-0000000000b2', 'direct')$$, '42501', null, 'direct insert on posts denied');
select throws_ok($$update public.profiles set is_dj = true where id = '00000000-0000-0000-0000-0000000000b2'$$, '42501', null, 'user cannot make themself a DJ');
select results_eq($$select like_count from public.feed_posts where id = '00000000-0000-0000-0000-0000000000d1'$$, array[1], 'like counted');
select results_eq($$select liked_by_me from public.feed_posts where id = '00000000-0000-0000-0000-0000000000d1'$$, array[true], 'liked_by_me');

-- block hides content for the blocker only
select lives_ok($$insert into public.user_blocks (blocker_id, blocked_id) values ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000b5')$$, 'bob blocks the dj');
select is((select count(*)::int from public.feed_posts where author_id = '00000000-0000-0000-0000-0000000000b5'), 0, 'block hides content for the blocker');
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","is_anonymous":false}', true);
select is((select count(*)::int from public.feed_posts where author_id = '00000000-0000-0000-0000-0000000000b5'), 1, 'others still see it');
reset role;

-- auto-hide on 3 distinct reports
insert into public.post_reports (post_id, reporter_id, reason) values
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b1', 'spam'),
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b5', 'spam');
select is((select hidden_at from public.posts where id = '00000000-0000-0000-0000-0000000000d2'), null, '2 reports do not hide');
insert into public.post_reports (post_id, reporter_id, reason) values
  ('00000000-0000-0000-0000-0000000000d2', '00000000-0000-0000-0000-0000000000b7', 'abuse');
select is((select hidden_reason from public.posts where id = '00000000-0000-0000-0000-0000000000d2'), 'reports', '3 reports hide the post');

select * from finish();
rollback;
