import { useState } from 'react';

import { t } from '@/lib/i18n';
import { isValidCode, isValidEmail } from '@/lib/profileRules';
import { confirmEmailCode, requestEmailCode, type EmailCodeMode } from '@/services/auth';

type Deps = {
  requestEmailCode: (email: string) => Promise<EmailCodeMode>;
  confirmEmailCode: (email: string, code: string, mode: EmailCodeMode) => Promise<void>;
};

export type EmailUpgradeStep = 'email' | 'code';

export type UseEmailUpgrade = {
  step: EmailUpgradeStep;
  email: string;
  /** `signin` when the email already has an account, so the UI can explain it. */
  mode: EmailCodeMode;
  /** Sends the 6-digit code. Resolves true when the code step should be shown. */
  requestCode: (email: string) => Promise<boolean>;
  /** Confirms the code. Resolves true once the user is signed in with a permanent account. */
  confirm: (code: string) => Promise<boolean>;
  /** Returns to the email step to fix a typo. */
  changeEmail: () => void;
  isLoading: boolean;
  error: string | null;
};

function requestFailureMessage(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : null;
  if (code === 'rate_limited') return t('feedAuth.rateLimited');
  if (code === 'invalid_email') return t('feedAuth.invalidEmail');
  if (code === 'network') return t('feedAuth.networkFailed');
  return t('feedAuth.requestFailed');
}

type RunResult<T> = { ok: true; value: T } | { ok: false };

/** Two-step "confirm your email" flow: upgrades the guest, or signs in to an existing account. */
export function useEmailUpgrade(
  deps: Deps = { requestEmailCode, confirmEmailCode },
): UseEmailUpgrade {
  const [step, setStep] = useState<EmailUpgradeStep>('email');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<EmailCodeMode>('upgrade');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run<T>(
    action: () => Promise<T>,
    failure: (error: unknown) => string,
  ): Promise<RunResult<T>> {
    setIsLoading(true);
    setError(null);
    try {
      return { ok: true, value: await action() };
    } catch (caught) {
      setError(failure(caught));
      return { ok: false };
    } finally {
      setIsLoading(false);
    }
  }

  return {
    step,
    email,
    mode,
    isLoading,
    error,
    async requestCode(input) {
      const clean = input.trim();
      if (!isValidEmail(clean)) {
        setError(t('feedAuth.invalidEmail'));
        return false;
      }
      const sent = await run(() => deps.requestEmailCode(clean), requestFailureMessage);
      if (!sent.ok) return false;
      setEmail(clean);
      setMode(sent.value);
      setStep('code');
      return true;
    },
    async confirm(code) {
      const clean = code.trim();
      if (!isValidCode(clean)) {
        setError(t('feedAuth.codeFailed'));
        return false;
      }
      const result = await run(
        () => deps.confirmEmailCode(email, clean, mode),
        () => t('feedAuth.codeFailed'),
      );
      return result.ok;
    },
    changeEmail() {
      setError(null);
      setStep('email');
    },
  };
}
