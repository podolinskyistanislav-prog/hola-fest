-- pgTAP: feed abuse and access audit (M16.8): impersonation, venue spoofing, direct REST bypass,
-- storage folder isolation, banned users, and blocked / hidden content leaks.
begin;
select plan(34);

insert into auth.users (id, instance_id, aud, role, is_anonymous) values
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- alice (club member)
  ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- mallory (stranger)
  ('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', true),  -- guest
  ('00000000-0000-0000-0000-0000000000a4', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- banned
  ('00000000-0000-0000-0000-0000000000a5', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- superadmin
  ('00000000-0000-0000-0000-0000000000a6', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false), -- reader who blocks
  ('00000000-0000-0000-0000-0000000000a7', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', false); -- blocked author

update public.profiles set is_banned = true where id = '00000000-0000-0000-0000-0000000000a4';
update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000a5';
update public.profiles set handle = 'blocked_one', display_name = 'Blocked One' where id = '00000000-0000-0000-0000-0000000000a7';

insert into public.venues (id, slug, name, is_published) values
  ('00000000-0000-0000-0000-0000000000f1', 'audit-club', 'Audit Club', true);
insert into public.venue_members (venue_id, user_id, role) values
  ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-0000000000a1', 'admin');

insert into public.posts (id, author_id, body) values
  ('00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a1', 'alice post'),
  ('00000000-0000-0000-0000-0000000000aa', '00000000-0000-0000-0000-0000000000a7', 'blocked author post');
insert into public.post_comments (id, post_id, author_id, body) values
  ('00000000-0000-0000-0000-0000000000b9', '00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a7', 'comment by blocked'),
  ('00000000-0000-0000-0000-0000000000ba', '00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a1', 'comment by alice'),
  ('00000000-0000-0000-0000-0000000000bb', '00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a4', 'comment by banned');
insert into public.post_comments (id, post_id, author_id, parent_id, body) values
  ('00000000-0000-0000-0000-0000000000bc', '00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000b9', 'reply under blocked');
insert into public.post_likes (post_id, user_id) values
  ('00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a1');
insert into public.post_reports (post_id, reporter_id, reason) values
  ('00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a1', 'spam');
insert into public.user_blocks (blocker_id, blocked_id) values
  ('00000000-0000-0000-0000-0000000000a6', '00000000-0000-0000-0000-0000000000a7');
insert into storage.objects (bucket_id, name) values
  ('feed-images', '00000000-0000-0000-0000-0000000000a1/own.jpg');

-- ----------------------------------------------- mallory: confirmed stranger, direct REST attempts
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","is_anonymous":false}', true);

select throws_ok($$insert into public.posts (author_id, as_venue_id, body) values ('00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-0000000000f1', 'fake club')$$,
  '42501', null, 'cannot post as a venue directly');
select throws_ok($$insert into public.posts (author_id, body) values ('00000000-0000-0000-0000-0000000000a1', 'as alice')$$,
  '42501', null, 'cannot post as another user directly');
select throws_ok($$insert into public.post_comments (post_id, author_id, body) values ('00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a2', 'bypass filter')$$,
  '42501', null, 'cannot comment directly (filter bypass)');
select throws_ok($$update public.posts set body = 'hacked' where id = '00000000-0000-0000-0000-0000000000a9'$$,
  '42501', null, 'cannot edit body directly');
select throws_ok($$update public.posts set as_venue_id = '00000000-0000-0000-0000-0000000000f1' where id = '00000000-0000-0000-0000-0000000000a9'$$,
  '42501', null, 'cannot attach a venue to a post directly');
select throws_ok($$update public.posts set image_paths = array['x/y.jpg'] where id = '00000000-0000-0000-0000-0000000000a9'$$,
  '42501', null, 'cannot change images directly');
select throws_ok($$update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000a2'$$,
  '42501', null, 'cannot make self superadmin');
select throws_ok($$update public.profiles set is_banned = true where id = '00000000-0000-0000-0000-0000000000a2'$$,
  '42501', null, 'cannot toggle is_banned on self');

update public.posts set hidden_at = now(), hidden_reason = 'moderator' where id = '00000000-0000-0000-0000-0000000000a9';
update public.post_comments set hidden_at = now(), hidden_reason = 'moderator' where id = '00000000-0000-0000-0000-0000000000ba';
delete from public.posts where id = '00000000-0000-0000-0000-0000000000a9';
delete from public.post_comments where id = '00000000-0000-0000-0000-0000000000ba';
select throws_ok($$insert into public.post_reports (post_id, reporter_id, reason) values ('00000000-0000-0000-0000-0000000000a9', '00000000-0000-0000-0000-0000000000a1', 'abuse')$$,
  '42501', null, 'cannot report as someone else');
select is((select count(*)::int from public.post_reports), 0, 'cannot read other people''s reports');
select is((select count(*)::int from public.user_blocks), 0, 'cannot read other people''s blocks');
select is((select count(*)::int from public.post_likes), 0, 'cannot read other people''s likes');
select throws_ok($$insert into public.user_blocks (blocker_id, blocked_id) values ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000a7')$$,
  '42501', null, 'cannot block as someone else');

-- storage: own folder only
select lives_ok($$insert into storage.objects (bucket_id, name) values ('feed-images', '00000000-0000-0000-0000-0000000000a2/ok.jpg')$$,
  'can upload under the own folder');
select throws_ok($$insert into storage.objects (bucket_id, name) values ('feed-images', '00000000-0000-0000-0000-0000000000a1/evil.jpg')$$,
  '42501', null, 'cannot upload to someone else''s folder');
select throws_ok($$insert into storage.objects (bucket_id, name) values ('feed-images', 'root.jpg')$$,
  '42501', null, 'cannot upload outside a user folder');
update storage.objects set name = '00000000-0000-0000-0000-0000000000a2/stolen.jpg' where name = '00000000-0000-0000-0000-0000000000a1/own.jpg';
reset role;

select is((select count(*)::int from public.posts where id = '00000000-0000-0000-0000-0000000000a9' and hidden_at is null and body = 'alice post'), 1,
  'stranger could neither hide, edit nor delete the post');
select is((select count(*)::int from public.post_comments where id = '00000000-0000-0000-0000-0000000000ba' and hidden_at is null), 1,
  'stranger could neither hide nor delete the comment');
select is((select count(*)::int from storage.objects where name = '00000000-0000-0000-0000-0000000000a1/own.jpg'), 1,
  'other people''s images cannot be moved');
select is((select file_size_limit from storage.buckets where id = 'feed-images'), 5242880::bigint, 'bucket limits files to 5 MB');
select is((select allowed_mime_types from storage.buckets where id = 'feed-images'),
  array['image/jpeg', 'image/png', 'image/webp'], 'bucket allows only jpeg/png/webp');

-- ------------------------------------------- guest and banned: no uploads, reports or blocks
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a3","is_anonymous":true}', true);
select throws_ok($$insert into storage.objects (bucket_id, name) values ('feed-images', '00000000-0000-0000-0000-0000000000a3/g.jpg')$$,
  '42501', null, 'guest cannot upload images');
select throws_ok($$insert into public.user_blocks (blocker_id, blocked_id) values ('00000000-0000-0000-0000-0000000000a3', '00000000-0000-0000-0000-0000000000a7')$$,
  '42501', null, 'guest cannot block');
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a4","is_anonymous":false}', true);
select throws_ok($$insert into storage.objects (bucket_id, name) values ('feed-images', '00000000-0000-0000-0000-0000000000a4/b.jpg')$$,
  '42501', null, 'banned user cannot upload images');
select throws_ok($$insert into public.post_reports (post_id, reason) values ('00000000-0000-0000-0000-0000000000aa', 'spam')$$,
  '42501', null, 'banned user cannot report');
select throws_ok($$insert into public.user_blocks (blocker_id, blocked_id) values ('00000000-0000-0000-0000-0000000000a4', '00000000-0000-0000-0000-0000000000a7')$$,
  '42501', null, 'banned user cannot block');
reset role;

set local role anon;
select throws_ok($$insert into storage.objects (bucket_id, name) values ('feed-images', 'anon.jpg')$$,
  '42501', null, 'anonymous role cannot upload images');
select is((select count(*)::int from public.feed_comments where id = '00000000-0000-0000-0000-0000000000bb'), 0,
  'banned author comment is not in feed_comments');
reset role;

-- ---------------------------------------------------------- reader who blocked the author
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a6","is_anonymous":false}', true);
select is((select count(*)::int from public.feed_comments where author_id = '00000000-0000-0000-0000-0000000000a7'), 0,
  'blocked author comments are not in feed_comments');
select is((select count(*)::int from public.feed_comments where id = '00000000-0000-0000-0000-0000000000bc'), 0,
  'replies under a blocked comment are hidden');
select is((select count(*)::int from public.feed_authors where handle = 'blocked_one'), 0,
  'blocked author is not found by handle');
select is((select count(*)::int from public.post_comments where author_id = '00000000-0000-0000-0000-0000000000a7'), 0,
  'blocked author comments are not readable directly');
select is((select comment_count from public.feed_posts where id = '00000000-0000-0000-0000-0000000000a9'), 2,
  'comment_count excludes blocked and banned authors');
reset role;

-- --------------------------------------------------------------- hidden content for everyone
update public.posts set hidden_at = now(), hidden_reason = 'moderator' where id = '00000000-0000-0000-0000-0000000000a9';
set local role anon;
select is((select count(*)::int from public.feed_comments where post_id = '00000000-0000-0000-0000-0000000000a9'), 0,
  'comments of a hidden post are not in feed_comments');
reset role;

select * from finish();
rollback;
