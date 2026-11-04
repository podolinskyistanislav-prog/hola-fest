import {
  AuthError,
  ensureGuestSession,
  getSession,
  onAuthChange,
  signInStaff,
  signOut,
} from './auth';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      signInAnonymously: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

const auth = supabase.auth as unknown as {
  getSession: jest.Mock;
  signInAnonymously: jest.Mock;
  signInWithPassword: jest.Mock;
  signOut: jest.Mock;
  onAuthStateChange: jest.Mock;
};

const session = { access_token: 'secret-token', user: { id: 'u1' } };

beforeEach(() => jest.resetAllMocks());

describe('getSession', () => {
  it('returns the current session', async () => {
    auth.getSession.mockResolvedValue({ data: { session }, error: null });
    await expect(getSession()).resolves.toBe(session);
  });

  it('returns null when there is none', async () => {
    auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    await expect(getSession()).resolves.toBeNull();
  });
});

describe('ensureGuestSession', () => {
  it('reuses an existing session without creating a guest', async () => {
    auth.getSession.mockResolvedValue({ data: { session }, error: null });
    await expect(ensureGuestSession()).resolves.toBe(session);
    expect(auth.signInAnonymously).not.toHaveBeenCalled();
  });

  it('signs in anonymously when the session is empty', async () => {
    auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    auth.signInAnonymously.mockResolvedValue({ data: { session }, error: null });
    await expect(ensureGuestSession()).resolves.toBe(session);
    expect(auth.signInAnonymously).toHaveBeenCalledTimes(1);
  });

  it('throws a generic error when anonymous sign-in fails', async () => {
    auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    auth.signInAnonymously.mockResolvedValue({
      data: { session: null },
      error: { status: 500, message: 'db exploded' },
    });
    await expect(ensureGuestSession()).rejects.toMatchObject({ code: 'unknown' });
  });
});

describe('signInStaff', () => {
  it('returns the session on success', async () => {
    auth.signInWithPassword.mockResolvedValue({ data: { session }, error: null });
    await expect(signInStaff('a@b.co', 'pw')).resolves.toBe(session);
    expect(auth.signInWithPassword).toHaveBeenCalledWith({ email: 'a@b.co', password: 'pw' });
  });

  it('gives a generic error for a wrong password', async () => {
    auth.signInWithPassword.mockResolvedValue({
      data: { session: null },
      error: { status: 400, code: 'invalid_credentials', message: 'Invalid login credentials' },
    });
    const caught = await signInStaff('a@b.co', 'hunter2').catch((e: unknown) => e);
    expect(caught).toBeInstanceOf(AuthError);
    expect(caught).toMatchObject({ code: 'invalid_credentials' });
    expect(String((caught as Error).message)).not.toMatch(/hunter2|a@b\.co|Invalid login/);
  });

  it('maps network failures', async () => {
    auth.signInWithPassword.mockResolvedValue({
      data: { session: null },
      error: { name: 'AuthRetryableFetchError', status: 0 },
    });
    await expect(signInStaff('a@b.co', 'pw')).rejects.toMatchObject({ code: 'network' });
  });
});

describe('signOut', () => {
  it('resolves on success', async () => {
    auth.signOut.mockResolvedValue({ error: null });
    await expect(signOut()).resolves.toBeUndefined();
  });

  it('throws a generic error on failure', async () => {
    auth.signOut.mockResolvedValue({ error: { status: 500 } });
    await expect(signOut()).rejects.toMatchObject({ code: 'unknown' });
  });
});

describe('onAuthChange', () => {
  it('subscribes and returns an unsubscribe function', () => {
    const unsubscribe = jest.fn();
    auth.onAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe } } });
    const callback = jest.fn();
    const stop = onAuthChange(callback);
    expect(auth.onAuthStateChange).toHaveBeenCalledWith(callback);
    stop();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
