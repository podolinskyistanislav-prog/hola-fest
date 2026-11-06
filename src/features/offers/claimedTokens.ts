import { readSecret, saveSecret } from '@/lib/secureStorage';

// SecureStore keys may only contain letters, digits, ".", "-" and "_".
function tokenKey(offerId: string): string {
  return `claim-token.${offerId.replace(/[^A-Za-z0-9._-]/g, '_')}`;
}

/**
 * Keeps the just-issued token in the device's secure storage so the ticket can be
 * shown without signal. Never put in a URL, a log or a request.
 */
export async function rememberClaimToken(offerId: string, token: string): Promise<boolean> {
  return saveSecret(tokenKey(offerId), token);
}

export async function getClaimToken(offerId: string): Promise<string | null> {
  return readSecret(tokenKey(offerId));
}
