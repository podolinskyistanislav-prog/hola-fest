export const venueKeys = {
  all: ['venues'] as const,
  list: () => [...venueKeys.all, 'list'] as const,
};

export const VENUES_STALE_TIME_MS = 5 * 60_000;
