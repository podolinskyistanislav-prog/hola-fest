import { useSyncExternalStore } from 'react';

import { sessionStore, type Session, type SessionStore } from './sessionStore';

export type UseSession = {
  session: Session | null;
  isAnonymous: boolean;
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
};

export function useSession(store: SessionStore = sessionStore): UseSession {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return {
    session: state.session,
    isAnonymous: state.session?.user.is_anonymous ?? false,
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    retry: store.retry,
  };
}
