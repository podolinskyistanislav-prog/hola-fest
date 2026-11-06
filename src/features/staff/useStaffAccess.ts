import { useQuery } from '@tanstack/react-query';

import { getMyVenues } from '@/services/admin';

import { getStaffAccess, type StaffAccess } from './staffAccess';

export type UseStaffAccess = {
  access: StaffAccess | null;
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
};

export const myVenuesQueryKey = ['staff', 'my-venues'] as const;

export function useStaffAccess(fetchVenues: typeof getMyVenues = getMyVenues): UseStaffAccess {
  const query = useQuery({ queryKey: myVenuesQueryKey, queryFn: fetchVenues });
  return {
    access: query.data ? getStaffAccess(query.data) : null,
    isLoading: query.isPending,
    isError: query.isError,
    retry: () => void query.refetch(),
  };
}
