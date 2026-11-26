import { useQuery } from '@tanstack/react-query';

import { searchPublishedDjs } from '@/services/eventDjs';

/** Published DJs matching the typed name (the first few alphabetically while empty). */
export function useDjSearch(query: string) {
  const text = query.trim();
  return useQuery({
    queryKey: ['staff', 'dj-search', text] as const,
    queryFn: () => searchPublishedDjs(text),
    staleTime: 60_000,
  });
}
