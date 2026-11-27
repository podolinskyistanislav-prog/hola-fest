import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  listModerationQueue,
  setContentHidden,
  setUserBanned,
  setUserDj,
  type ModerationItem,
} from '@/services/moderation';

export const moderationKeys = {
  queue: ['moderation', 'queue'] as const,
};

/** Reported and hidden posts and comments. Enabled only once the server confirmed a superadmin. */
export function useModerationQueue(enabled: boolean) {
  return useQuery({ queryKey: moderationKeys.queue, queryFn: listModerationQueue, enabled });
}

export type ModerationAction = {
  type: 'hide' | 'restore' | 'ban' | 'unban' | 'markDj' | 'unmarkDj';
  item: ModerationItem;
};

export function runModerationAction({ type, item }: ModerationAction): Promise<void> {
  switch (type) {
    case 'hide':
      return setContentHidden(item.kind, item.id, true);
    case 'restore':
      return setContentHidden(item.kind, item.id, false);
    case 'ban':
      return setUserBanned(item.author.id, true);
    case 'unban':
      return setUserBanned(item.author.id, false);
    case 'markDj':
      return setUserDj(item.author.id, true);
    case 'unmarkDj':
      return setUserDj(item.author.id, false);
  }
}

/** Runs one moderation action; the server (RLS) decides whether the caller may. */
export function useModerationAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: runModerationAction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: moderationKeys.queue }),
  });
}
