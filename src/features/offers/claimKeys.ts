export const claimKeys = {
  mine: ['claims', 'mine'] as const,
  token: (offerId: string) => ['claims', 'token', offerId] as const,
};
