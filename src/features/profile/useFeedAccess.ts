import { useSession } from '@/features/auth';

import { useMyProfile } from './useProfile';

export type FeedAccess =
  /** Session or profile is still loading: do not decide yet. */
  | 'loading'
  /** Anonymous guest: show the "confirm your email" sheet. */
  | 'needs_email'
  /** Confirmed account (or staff) without name and handle: open profile setup. */
  | 'needs_profile'
  | 'ready';

/**
 * What a user must do before posting, liking, commenting or reporting. Staff sign in with
 * email and password, so they are never anonymous and skip the code step. Whether the
 * action is finally allowed is decided by the server, not by this hook.
 */
export function useFeedAccess(): FeedAccess {
  const { session, isAnonymous, isLoading } = useSession();
  const profile = useMyProfile(isAnonymous ? undefined : session?.user.id);

  if (isLoading || !session) return 'loading';
  if (isAnonymous) return 'needs_email';
  if (profile.isPending) return 'loading';
  if (profile.isError) return 'needs_profile';
  return profile.data?.handle && profile.data.displayName ? 'ready' : 'needs_profile';
}
