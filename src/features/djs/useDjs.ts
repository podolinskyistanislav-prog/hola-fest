import { useQuery } from '@tanstack/react-query';

import { getDjBySlug, getUpcomingDjs } from '@/services/djs';

export const djKeys = {
  all: ['djs'] as const,
  list: () => [...djKeys.all, 'list'] as const,
  detail: (slug: string) => [...djKeys.all, 'detail', slug] as const,
};

export const DJS_STALE_TIME_MS = 5 * 60_000;

/** DJs of the upcoming events (next 30 days). */
export function useDjs() {
  return useQuery({
    queryKey: djKeys.list(),
    queryFn: () => getUpcomingDjs(),
    staleTime: DJS_STALE_TIME_MS,
  });
}

/** One DJ by slug with their upcoming gigs; null data when unknown. */
export function useDj(slug: string | undefined) {
  return useQuery({
    queryKey: djKeys.detail(slug ?? ''),
    queryFn: () => getDjBySlug(slug ?? ''),
    enabled: Boolean(slug),
    staleTime: DJS_STALE_TIME_MS,
  });
}
