import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

import { supabase } from './supabase';

export type AuthErrorCode =
  'invalid_credentials' | 'email_exists' | 'rate_limited' | 'invalid_email' | 'network' | 'unknown';

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
  if (error.code === 'email_exists' || error.code === 'user_already_exists') {
    return new AuthError('email_exists');
  }
  if (
    error.code === 'over_email_send_rate_limit' ||
    error.code === 'over_request_rate_limit' ||
    error.status === 429
  ) {
    return new AuthError('rate_limited');
  }
  if (error.code === 'email_address_invalid' || error.code === 'validation_failed') {
    return new AuthError('invalid_email');
  }
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

/** `upgrade`: the guest keeps its user id. `signin`: the email already had an account. */
export type EmailCodeMode = 'upgrade' | 'signin';

/**
 * Emails a 6-digit code. A new email is attached to the current anonymous guest (same user id,
 * claims and QR stay). An email that already has an account gets a sign-in code instead.
 */
export async function requestEmailCode(email: string): Promise<EmailCodeMode> {
  const { error } = await supabase.auth.updateUser({ email });
  if (!error) return 'upgrade';
  const failure = toAuthError(error);
  if (failure.code !== 'email_exists') throw failure;

  const signIn = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });
  if (signIn.error) throw toAuthError(signIn.error);
  return 'signin';
}

/** Confirms the emailed code, either upgrading the guest or signing in to the existing account. */
export async function confirmEmailCode(
  email: string,
  code: string,
  mode: EmailCodeMode = 'upgrade',
): Promise<void> {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: mode === 'signin' ? 'email' : 'email_change',
  });
  if (error) throw toAuthError(error);
  if (mode === 'signin') return;
  const refreshed = await supabase.auth.refreshSession();
  if (refreshed.error) throw toAuthError(refreshed.error);
}

/** Subscribes to auth changes. Returns an unsubscribe function. */
export function onAuthChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
): () => void {
  const { data } = supabase.auth.onAuthStateChange(callback);
  return () => data.subscription.unsubscribe();
}
