-- Feed (Стрічка): profile identity, posts, likes, comments, reports, blocks, feed view, storage.
-- Posts and comments are created/edited only by the Edge Function (service role, M16.2);
-- clients get read access, likes/reports/blocks, deleting their own content, and superadmin moderation.

-- ---------------------------------------------------------------- profiles
alter table public.profiles
  add column handle text,
  add column avatar_path text,
  add column is_dj boolean not null default false,
  add column is_banned boolean not null default false,
  add constraint profiles_display_name_length
    check (display_name is null or char_length(display_name) between 2 and 30),
  add constraint profiles_handle_format
    check (handle is null or handle ~ '^[a-z0-9_.]{3,20}$'),
  add constraint profiles_handle_unique unique (handle);

-- Users may edit their identity; is_dj / is_banned are guarded by a trigger (superadmin only).
grant insert (handle, avatar_path) on public.profiles to authenticated;
grant update (handle, avatar_path, is_dj, is_banned) on public.profiles to authenticated;

create function public.guard_profile_flags()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (new.is_dj is distinct from old.is_dj or new.is_banned is distinct from old.is_banned)
     and auth.uid() is not null
     and not public.is_superadmin() then
    raise exception 'only superadmin can change is_dj or is_banned' using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke all on function public.guard_profile_flags() from public, anon, authenticated;

create trigger profiles_guard_flags
  before update on public.profiles
  for each row execute function public.guard_profile_flags();

-- Superadmin may ban / mark DJs on any profile.
create policy profiles_select_superadmin on public.profiles
  for select to authenticated
  using (public.is_superadmin());

create policy profiles_update_superadmin on public.profiles
  for update to authenticated
  using (public.is_superadmin())
  with check (public.is_superadmin());

-- Insert policy must also keep new rows unflagged.
drop policy profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check (
    id = (select auth.uid())
    and is_superadmin = false
    and is_dj = false
    and is_banned = false
  );

-- ------------------------------------------------------------------ tables
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  as_venue_id uuid references public.venues (id) on delete cascade,
  body text not null default '' check (char_length(body) <= 500),
  image_paths text[] not null default '{}' check (cardinality(image_paths) <= 4),
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  hidden_at timestamptz,
  hidden_reason text check (hidden_reason in ('reports', 'moderator')),
  check (char_length(btrim(body)) > 0 or cardinality(image_paths) > 0)
);

create table public.post_likes (
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  parent_id uuid references public.post_comments (id) on delete cascade,
  body text not null check (char_length(btrim(body)) > 0 and char_length(body) <= 500),
  created_at timestamptz not null default now(),
  hidden_at timestamptz,
  hidden_reason text check (hidden_reason in ('reports', 'moderator'))
);

create table public.post_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts (id) on delete cascade,
  comment_id uuid references public.post_comments (id) on delete cascade,
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  reason text not null check (reason in ('event_promo', 'abuse', 'adult', 'spam', 'other')),
  created_at timestamptz not null default now(),
  check ((post_id is null) <> (comment_id is null))
);

create table public.user_blocks (
  blocker_id uuid not null references public.profiles (id) on delete cascade,
  blocked_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

create index posts_created_at_idx on public.posts (created_at desc) where hidden_at is null;
create index posts_author_id_idx on public.posts (author_id);
create index posts_as_venue_id_idx on public.posts (as_venue_id);
create index post_likes_user_id_idx on public.post_likes (user_id);
create index post_comments_post_id_idx on public.post_comments (post_id, created_at);
create index post_comments_author_id_idx on public.post_comments (author_id);
create index post_comments_parent_id_idx on public.post_comments (parent_id);
create unique index post_reports_unique_post_idx on public.post_reports (reporter_id, post_id)
  where post_id is not null;
create unique index post_reports_unique_comment_idx on public.post_reports (reporter_id, comment_id)
  where comment_id is not null;
create index post_reports_post_id_idx on public.post_reports (post_id);
create index post_reports_comment_id_idx on public.post_reports (comment_id);
create index user_blocks_blocked_id_idx on public.user_blocks (blocked_id);

alter table public.posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.post_comments enable row level security;
alter table public.post_reports enable row level security;
alter table public.user_blocks enable row level security;

revoke all on public.posts, public.post_likes, public.post_comments,
  public.post_reports, public.user_blocks from anon, authenticated;

-- ----------------------------------------------------------------- helpers
-- Confirmed (non-anonymous), non-banned user.
create function public.can_interact()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and ((select auth.jwt()) ->> 'is_anonymous')::boolean is not true
    and not coalesce(
      (select p.is_banned from public.profiles p where p.id = (select auth.uid())),
      true
    );
$$;

-- Author is not banned and not blocked by the current user.
create function public.feed_author_visible(p_author_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select not coalesce(
      (select p.is_banned from public.profiles p where p.id = p_author_id), true)
    and not exists (
      select 1
      from public.user_blocks b
      where b.blocker_id = (select auth.uid())
        and b.blocked_id = p_author_id
    );
$$;

revoke all on function public.can_interact() from public;
revoke all on function public.feed_author_visible(uuid) from public;
grant execute on function public.can_interact() to anon, authenticated;
grant execute on function public.feed_author_visible(uuid) to anon, authenticated;

-- ---------------------------------------------------------------- triggers
-- Defence in depth (also for the service role): posting as a venue needs membership.
create function public.check_post_as_venue()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.as_venue_id is not null and not exists (
    select 1 from public.venue_members vm
    where vm.venue_id = new.as_venue_id and vm.user_id = new.author_id
  ) then
    raise exception 'author is not a member of this venue' using errcode = '42501';
  end if;
  return new;
end;
$$;

-- Replies are one level deep and stay on the same post.
create function public.check_comment_parent()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  parent public.post_comments;
begin
  if new.parent_id is not null then
    select * into parent from public.post_comments c where c.id = new.parent_id;
    if parent.post_id is distinct from new.post_id or parent.parent_id is not null then
      raise exception 'replies are one level deep on the same post' using errcode = '23514';
    end if;
  end if;
  return new;
end;
$$;

-- 3 or more distinct reporters hide the target until a team member reviews it.
create function public.auto_hide_reported()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.post_id is not null then
    if (select count(distinct r.reporter_id) from public.post_reports r where r.post_id = new.post_id) >= 3 then
      update public.posts
      set hidden_at = now(), hidden_reason = 'reports'
      where id = new.post_id and hidden_at is null;
    end if;
  else
    if (select count(distinct r.reporter_id) from public.post_reports r where r.comment_id = new.comment_id) >= 3 then
      update public.post_comments
      set hidden_at = now(), hidden_reason = 'reports'
      where id = new.comment_id and hidden_at is null;
    end if;
  end if;
  return new;
end;
$$;

revoke all on function public.check_post_as_venue() from public, anon, authenticated;
revoke all on function public.check_comment_parent() from public, anon, authenticated;
revoke all on function public.auto_hide_reported() from public, anon, authenticated;

create trigger posts_check_as_venue
  before insert or update of author_id, as_venue_id on public.posts
  for each row execute function public.check_post_as_venue();

create trigger post_comments_check_parent
  before insert or update of post_id, parent_id on public.post_comments
  for each row execute function public.check_comment_parent();

create trigger post_reports_auto_hide
  after insert on public.post_reports
  for each row execute function public.auto_hide_reported();

-- ---------------------------------------------------------------- policies
-- posts: everyone reads visible posts. No client INSERT; clients may only moderate (superadmin) or delete own.
grant select on public.posts to anon, authenticated;
grant update (hidden_at, hidden_reason) on public.posts to authenticated;
grant delete on public.posts to authenticated;

create policy posts_select_visible on public.posts
  for select to anon, authenticated
  using (
    (hidden_at is null and public.feed_author_visible(author_id))
    or public.is_superadmin()
  );

create policy posts_update_superadmin on public.posts
  for update to authenticated
  using (public.is_superadmin())
  with check (public.is_superadmin());

create policy posts_delete_own on public.posts
  for delete to authenticated
  using (author_id = (select auth.uid()) or public.is_superadmin());

-- comments: same model.
grant select on public.post_comments to anon, authenticated;
grant update (hidden_at, hidden_reason) on public.post_comments to authenticated;
grant delete on public.post_comments to authenticated;

create policy post_comments_select_visible on public.post_comments
  for select to anon, authenticated
  using (
    (
      hidden_at is null
      and public.feed_author_visible(author_id)
      and exists (select 1 from public.posts p where p.id = post_id)
    )
    or public.is_superadmin()
  );

create policy post_comments_update_superadmin on public.post_comments
  for update to authenticated
  using (public.is_superadmin())
  with check (public.is_superadmin());

create policy post_comments_delete_own on public.post_comments
  for delete to authenticated
  using (author_id = (select auth.uid()) or public.is_superadmin());

-- likes: confirmed, non-banned users like as themselves.
grant select, insert, delete on public.post_likes to authenticated;

create policy post_likes_select_own on public.post_likes
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy post_likes_insert_own on public.post_likes
  for insert to authenticated
  with check (user_id = (select auth.uid()) and public.can_interact());

create policy post_likes_delete_own on public.post_likes
  for delete to authenticated
  using (user_id = (select auth.uid()));

-- reports: confirmed, non-banned users; the reporter and superadmin read them.
grant select, insert on public.post_reports to authenticated;

create policy post_reports_select on public.post_reports
  for select to authenticated
  using (reporter_id = (select auth.uid()) or public.is_superadmin());

create policy post_reports_insert_own on public.post_reports
  for insert to authenticated
  with check (reporter_id = (select auth.uid()) and public.can_interact());

-- blocks: private to the blocker.
grant select, insert, delete on public.user_blocks to authenticated;

create policy user_blocks_select_own on public.user_blocks
  for select to authenticated
  using (blocker_id = (select auth.uid()));

create policy user_blocks_insert_own on public.user_blocks
  for insert to authenticated
  with check (blocker_id = (select auth.uid()) and public.can_interact());

create policy user_blocks_delete_own on public.user_blocks
  for delete to authenticated
  using (blocker_id = (select auth.uid()));

-- -------------------------------------------------------------------- view
-- Runs as owner so it can read author profiles (not readable by clients); it applies the
-- visibility filters itself. Label: club (posted as a venue) > dj > hola (superadmin) > none.
create view public.feed_posts
with (security_invoker = false) as
select
  p.id,
  p.author_id,
  p.as_venue_id,
  p.body,
  p.image_paths,
  p.created_at,
  p.edited_at,
  case when v.id is not null then v.name else pr.display_name end as author_name,
  pr.handle as author_handle,
  pr.avatar_path as author_avatar_path,
  case
    when p.as_venue_id is not null then 'club'
    when pr.is_dj then 'dj'
    when pr.is_superadmin then 'hola'
  end as label,
  (select count(*) from public.post_likes l where l.post_id = p.id)::int as like_count,
  (select count(*) from public.post_comments c
    where c.post_id = p.id and c.hidden_at is null
      and public.feed_author_visible(c.author_id))::int as comment_count,
  exists (
    select 1 from public.post_likes l
    where l.post_id = p.id and l.user_id = (select auth.uid())
  ) as liked_by_me
from public.posts p
join public.profiles pr on pr.id = p.author_id
left join public.venues v on v.id = p.as_venue_id
where p.hidden_at is null
  and not pr.is_banned
  and public.feed_author_visible(p.author_id);

revoke all on public.feed_posts from anon, authenticated;
grant select on public.feed_posts to anon, authenticated;

-- ----------------------------------------------------------------- storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'feed-images', 'feed-images', true, 5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy feed_images_select on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'feed-images');

create policy feed_images_insert_own on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'feed-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and public.can_interact()
  );

create policy feed_images_delete_own on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'feed-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
