import type { ReportReason } from './feed';
import { supabase } from './supabase';

export type ModerationKind = 'post' | 'comment';

export interface ModerationItem {
  kind: ModerationKind;
  id: string;
  body: string;
  createdAt: string;
  hidden: boolean;
  hiddenReason: 'reports' | 'moderator' | null;
  reportCount: number;
  reasons: ReportReason[];
  author: {
    id: string;
    name: string;
    handle: string | null;
    isDj: boolean;
    isBanned: boolean;
  };
}

type AuthorRow = {
  id: string;
  display_name: string | null;
  handle: string | null;
  is_dj: boolean;
  is_banned: boolean;
} | null;

type ContentRow = {
  id: string;
  body: string;
  created_at: string;
  hidden_at: string | null;
  hidden_reason: string | null;
  author: AuthorRow;
  reports: { reason: string }[];
};

const AUTHOR = 'author:profiles!inner(id, display_name, handle, is_dj, is_banned)';
const COLUMNS = `id, body, created_at, hidden_at, hidden_reason, ${AUTHOR}`;
const QUEUE_LIMIT = 100;

function toItem(kind: ModerationKind, row: ContentRow): ModerationItem {
  return {
    kind,
    id: row.id,
    body: row.body,
    createdAt: row.created_at,
    hidden: row.hidden_at !== null,
    hiddenReason:
      row.hidden_reason === 'reports' || row.hidden_reason === 'moderator'
        ? row.hidden_reason
        : null,
    reportCount: row.reports.length,
    reasons: row.reports.map((report) => report.reason as ReportReason),
    author: {
      id: row.author?.id ?? '',
      name: row.author?.display_name ?? row.author?.handle ?? '',
      handle: row.author?.handle ?? null,
      isDj: row.author?.is_dj ?? false,
      isBanned: row.author?.is_banned ?? false,
    },
  };
}

async function queryQueue(kind: ModerationKind): Promise<ModerationItem[]> {
  const table = kind === 'post' ? 'posts' : 'post_comments';
  const reportsKey = kind === 'post' ? 'post_id' : 'comment_id';
  const reports = `reports:post_reports!post_reports_${reportsKey}_fkey`;
  const [reported, hidden] = await Promise.all([
    supabase
      .from(table)
      .select(`${COLUMNS}, ${reports}!inner(reason)`)
      .order('created_at', { ascending: false })
      .limit(QUEUE_LIMIT),
    supabase
      .from(table)
      .select(`${COLUMNS}, ${reports}(reason)`)
      .not('hidden_at', 'is', null)
      .order('created_at', { ascending: false })
      .limit(QUEUE_LIMIT),
  ]);
  if (reported.error || hidden.error) throw new Error('moderation_load_failed');
  const rows = new Map<string, ContentRow>();
  const all = [...(reported.data ?? []), ...(hidden.data ?? [])] as unknown as ContentRow[];
  for (const row of all) rows.set(row.id, row);
  return [...rows.values()].map((row) => toItem(kind, row));
}

/** Reported and hidden posts and comments, newest first. RLS returns them only to a superadmin. */
export async function listModerationQueue(): Promise<ModerationItem[]> {
  const [posts, comments] = await Promise.all([queryQueue('post'), queryQueue('comment')]);
  return [...posts, ...comments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Hides (reason "moderator") or restores a post or comment. The server allows only a superadmin. */
export async function setContentHidden(
  kind: ModerationKind,
  id: string,
  hidden: boolean,
): Promise<void> {
  const patch = hidden
    ? { hidden_at: new Date().toISOString(), hidden_reason: 'moderator' }
    : { hidden_at: null, hidden_reason: null };
  const { error } = await supabase
    .from(kind === 'post' ? 'posts' : 'post_comments')
    .update(patch)
    .eq('id', id);
  if (error) throw new Error('moderation_hide_failed');
}

/** Bans or unbans an author. The server allows only a superadmin. */
export async function setUserBanned(userId: string, banned: boolean): Promise<void> {
  const { error } = await supabase.from('profiles').update({ is_banned: banned }).eq('id', userId);
  if (error) throw new Error('moderation_ban_failed');
}

/** Marks or unmarks a user as a DJ. The server allows only a superadmin. */
export async function setUserDj(userId: string, isDj: boolean): Promise<void> {
  const { error } = await supabase.from('profiles').update({ is_dj: isDj }).eq('id', userId);
  if (error) throw new Error('moderation_dj_failed');
}
