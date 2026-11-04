import { ensureGuestSession, onAuthChange } from '@/services/auth';

export type Session = Awaited<ReturnType<typeof ensureGuestSession>>;

export type SessionState =
  | { status: 'loading'; session: null; retrying: boolean }
  | { status: 'ready'; session: Session | null }
  | { status: 'error'; session: null };

type Deps = {
  ensureGuestSession: () => Promise<Session>;
  onAuthChange: (callback: (event: string, session: Session | null) => void) => () => void;
};

export type SessionStore = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => SessionState;
  retry: () => void;
};

/**
 * Holds the current session. Sign-in starts lazily when the first listener subscribes,
 * so no component has to fetch inside an effect.
 */
export function createSessionStore(
  deps: Deps = { ensureGuestSession, onAuthChange },
): SessionStore {
  let state: SessionState = { status: 'loading', session: null, retrying: false };
  const listeners = new Set<() => void>();
  let unsubscribeAuth: (() => void) | null = null;
  let attempt = 0;

  function set(next: SessionState) {
    state = next;
    listeners.forEach((listener) => listener());
  }

  function start() {
    const current = ++attempt;
    deps.ensureGuestSession().then(
      (session) => {
        if (current === attempt) set({ status: 'ready', session });
      },
      () => {
        if (current === attempt) set({ status: 'error', session: null });
      },
    );
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1) {
        unsubscribeAuth = deps.onAuthChange((_event, session) => {
          if (state.status === 'ready') set({ status: 'ready', session });
        });
        if (state.status === 'loading') start();
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          unsubscribeAuth?.();
          unsubscribeAuth = null;
        }
      };
    },
    getSnapshot: () => state,
    retry() {
      set({ status: 'loading', session: null, retrying: true });
      start();
    },
  };
}

export const sessionStore = createSessionStore();
