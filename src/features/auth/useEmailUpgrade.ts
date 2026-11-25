import { useState } from 'react';

import { t } from '@/lib/i18n';
import { isValidCode, isValidEmail } from '@/lib/profileRules';
import { confirmEmailCode, requestEmailCode } from '@/services/auth';

type Deps = {
  requestEmailCode: (email: string) => Promise<void>;
  confirmEmailCode: (email: string, code: string) => Promise<void>;
};

export type EmailUpgradeStep = 'email' | 'code';

export type UseEmailUpgrade = {
  step: EmailUpgradeStep;
  email: string;
  /** Sends the 6-digit code. Resolves true when the code step should be shown. */
  requestCode: (email: string) => Promise<boolean>;
  /** Confirms the code. Resolves true once the guest became a permanent account. */
  confirm: (code: string) => Promise<boolean>;
  /** Returns to the email step to fix a typo. */
  changeEmail: () => void;
  isLoading: boolean;
  error: string | null;
};

/** Two-step "confirm your email" flow that upgrades the anonymous guest in place. */
export function useEmailUpgrade(
  deps: Deps = { requestEmailCode, confirmEmailCode },
): UseEmailUpgrade {
  const [step, setStep] = useState<EmailUpgradeStep>('email');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: () => Promise<void>, failure: string): Promise<boolean> {
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
    step,
    email,
    isLoading,
    error,
    async requestCode(input) {
      const clean = input.trim();
      if (!isValidEmail(clean)) {
        setError(t('feedAuth.invalidEmail'));
        return false;
      }
      const sent = await run(() => deps.requestEmailCode(clean), t('feedAuth.requestFailed'));
      if (sent) {
        setEmail(clean);
        setStep('code');
      }
      return sent;
    },
    async confirm(code) {
      const clean = code.trim();
      if (!isValidCode(clean)) {
        setError(t('feedAuth.codeFailed'));
        return false;
      }
      return run(() => deps.confirmEmailCode(email, clean), t('feedAuth.codeFailed'));
    },
    changeEmail() {
      setError(null);
      setStep('email');
    },
  };
}
