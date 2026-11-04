import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

import { supabase } from './supabase';

export type AuthErrorCode = 'invalid_credentials' | 'network' | 'unknown';

/** Generic, safe-to-show error. Never contains passwords, tokens or server messages. */
export class AuthError extends Error {
  readonly code: AuthErrorCode;

  constructor(code: AuthErrorCode) {
    super(`auth_${code}`);
    this.name = 'AuthError';
    this.code = code;
  }
}

type ClientError = { status?: number; name?: string; code?: string };

function toAuthError(error: ClientError): AuthError {
  if (error.status === 400 || error.status === 401 || error.code === 'invalid_credentials') {
    return new AuthError('invalid_credentials');
  }
  if (error.name === 'AuthRetryableFetchError' || error.status === 0) {
    return new AuthError('network');
  }
  return new AuthError('unknown');
}

export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw toAuthError(error);
  return data.session;
}

/** Returns the existing session, or silently starts an anonymous guest session. */
export async function ensureGuestSession(): Promise<Session> {
  const existing = await getSession();
  if (existing) return existing;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw toAuthError(error);
  if (!data.session) throw new AuthError('unknown');
  return data.session;
}

/** Staff accounts are created by the founder; this only signs in. */
export async function signInStaff(email: string, password: string): Promise<Session> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw toAuthError(error);
  if (!data.session) throw new AuthError('unknown');
  return data.session;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw toAuthError(error);
}

/** Subscribes to auth changes. Returns an unsubscribe function. */
export function onAuthChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
): () => void {
  const { data } = supabase.auth.onAuthStateChange(callback);
  return () => data.subscription.unsubscribe();
}
