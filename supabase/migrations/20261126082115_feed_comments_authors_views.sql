-- Feed read models for the post page: comments with author identity, and author lookup by handle.
-- Owner views (profiles are not readable by clients) that apply visibility filters themselves:
-- hidden content, banned authors and authors the caller blocked are excluded.

create view public.feed_comments
with (security_invoker = false) as
select
  c.id,
  c.post_id,
  c.parent_id,
  c.author_id,
  c.body,
  c.created_at,
  pr.display_name as author_name,
  pr.handle as author_handle,
  pr.avatar_path as author_avatar_path,
  case
    when pr.is_dj then 'dj'
    when pr.is_superadmin then 'hola'
  end as label
from public.post_comments c
join public.profiles pr on pr.id = c.author_id
where c.hidden_at is null
  and not pr.is_banned
  and public.feed_author_visible(c.author_id)
  and exists (
    select 1 from public.posts p
    where p.id = c.post_id and p.hidden_at is null and public.feed_author_visible(p.author_id)
  )
  and (
    c.parent_id is null
    or exists (
      select 1 from public.post_comments pc
      where pc.id = c.parent_id and pc.hidden_at is null
        and public.feed_author_visible(pc.author_id)
    )
  );

create view public.feed_authors
with (security_invoker = false) as
select
  pr.id,
  pr.display_name as name,
  pr.handle,
  pr.avatar_path,
  case
    when pr.is_dj then 'dj'
    when pr.is_superadmin then 'hola'
  end as label
from public.profiles pr
where pr.handle is not null
  and pr.display_name is not null
  and not pr.is_banned
  and public.feed_author_visible(pr.id);

revoke all on public.feed_comments, public.feed_authors from anon, authenticated;
grant select on public.feed_comments, public.feed_authors to anon, authenticated;

-- Clients report and block as themselves: the owner column defaults to the caller,
-- and the existing insert policies still require it to equal auth.uid().
alter table public.post_reports alter column reporter_id set default auth.uid();
alter table public.user_blocks alter column blocker_id set default auth.uid();
