export const venueKeys = {
  all: ['venues'] as const,
  list: () => [...venueKeys.all, 'list'] as const,
  detail: (id: string) => [...venueKeys.all, 'detail', id] as const,
};

export const VENUES_STALE_TIME_MS = 5 * 60_000;
