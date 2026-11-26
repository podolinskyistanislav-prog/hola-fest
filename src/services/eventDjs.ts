import type { DjOption } from '@/types/djs';

import { djMediaUrl, toDjsError } from './djs';
import { supabase } from './supabase';

const SEARCH_LIMIT = 8;

type OptionRow = { id: string; stage_name: string; photo_path: string | null };
type LinkRow = { dj_id: string; position: number; dj: OptionRow | null };

function toOption(row: OptionRow): DjOption {
  return {
    id: row.id,
    name: row.stage_name,
    photoUrl: row.photo_path ? djMediaUrl(row.photo_path) : null,
  };
}

/** Escapes LIKE wildcards so the typed text is matched literally. */
export function escapeLike(text: string): string {
  return text.replace(/[\\%_]/g, (char) => `\\${char}`);
}

/** Published DJs whose stage name contains the text (all, alphabetically, when empty). */
export async function searchPublishedDjs(query: string): Promise<DjOption[]> {
  let request = supabase
    .from('djs')
    .select('id, stage_name, photo_path')
    .eq('is_published', true)
    .order('stage_name', { ascending: true })
    .limit(SEARCH_LIMIT);
  const needle = query.trim();
  if (needle !== '') request = request.ilike('stage_name', `%${escapeLike(needle)}%`);
  const { data, error } = await request.returns<OptionRow[]>();
  if (error) throw toDjsError(error);
  return (data ?? []).map(toOption);
}

/** DJs linked to an event, in lineup order. Unpublished profiles are hidden by RLS and skipped. */
export async function getEventDjs(eventId: string): Promise<DjOption[]> {
  const { data, error } = await supabase
    .from('event_djs')
    .select('dj_id, position, dj:djs(id, stage_name, photo_path)')
    .eq('event_id', eventId)
    .order('position', { ascending: true })
    .returns<LinkRow[]>();
  if (error) throw toDjsError(error);
  return (data ?? []).flatMap((row) => (row.dj ? [toOption(row.dj)] : []));
}

/** Makes the event's linked DJs exactly `djIds`, in that order. The server checks who may. */
export async function setEventDjs(eventId: string, djIds: readonly string[]): Promise<void> {
  const wanted = [...new Set(djIds)];
  const current = await supabase.from('event_djs').select('dj_id').eq('event_id', eventId);
  if (current.error) throw toDjsError(current.error);
  const existing = new Set((current.data ?? []).map((row) => row.dj_id));

  const removed = [...existing].filter((id) => !wanted.includes(id));
  if (removed.length > 0) {
    const { error } = await supabase
      .from('event_djs')
      .delete()
      .eq('event_id', eventId)
      .in('dj_id', removed);
    if (error) throw toDjsError(error);
  }

  const added = wanted.flatMap((id, position) => (existing.has(id) ? [] : [{ id, position }]));
  if (added.length > 0) {
    const { error } = await supabase
      .from('event_djs')
      .insert(added.map(({ id, position }) => ({ event_id: eventId, dj_id: id, position })));
    if (error) throw toDjsError(error);
  }

  const kept = wanted.flatMap((id, position) => (existing.has(id) ? [{ id, position }] : []));
  const results = await Promise.all(
    kept.map(({ id, position }) =>
      supabase.from('event_djs').update({ position }).eq('event_id', eventId).eq('dj_id', id),
    ),
  );
  const failed = results.find((result) => result.error);
  if (failed?.error) throw toDjsError(failed.error);
}
