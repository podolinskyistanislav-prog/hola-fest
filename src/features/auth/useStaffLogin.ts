import { useState } from 'react';

import { t } from '@/lib/i18n';
import { signInStaff, signOut } from '@/services/auth';

type Deps = {
  signInStaff: (email: string, password: string) => Promise<unknown>;
  signOut: () => Promise<void>;
};

export type UseStaffLogin = {
  /** Resolves true on success. Failures never reveal whether the email exists. */
  signIn: (email: string, password: string) => Promise<boolean>;
  /** Ends the staff session; the session store then starts a fresh guest session. */
  signOut: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
};

export function useStaffLogin(deps: Deps = { signInStaff, signOut }): UseStaffLogin {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: () => Promise<unknown>, failure: string): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    try {
      await action();
      return true;
    } catch {
      setError(failure);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    signIn: (email, password) =>
      run(() => deps.signInStaff(email.trim(), password), t('auth.signInFailed')),
    signOut: () => run(() => deps.signOut(), t('auth.signOutFailed')),
    isLoading,
    error,
  };
}
