const tokens = new Map<string, string>();

/** Keeps the just-issued token in memory so the ticket screen can show it. Never persisted or put in a URL. */
export function rememberClaimToken(offerId: string, token: string): void {
  tokens.set(offerId, token);
}

export function getClaimToken(offerId: string): string | undefined {
  return tokens.get(offerId);
}
