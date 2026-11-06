import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { listEventOffers, setOfferActive } from '@/services/admin';
import type { AdminOffer } from '@/types/admin';

export const eventOffersQueryKey = (eventId: string) => ['staff', 'event-offers', eventId] as const;

export type UseEventOffers = {
  offers: AdminOffer[];
  isLoading: boolean;
  isError: boolean;
  isToggleError: boolean;
  retry: () => void;
  /** Shows or hides an offer for guests. */
  toggleActive: (offer: AdminOffer) => void;
};

type Services = { fetchOffers: typeof listEventOffers; changeActive: typeof setOfferActive };

const defaultServices: Services = { fetchOffers: listEventOffers, changeActive: setOfferActive };

/** Offers of one event for the admin editor. The server enforces access. */
export function useEventOffers(
  eventId: string,
  { fetchOffers, changeActive }: Services = defaultServices,
): UseEventOffers {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: eventOffersQueryKey(eventId),
    queryFn: () => fetchOffers(eventId),
  });
  const toggle = useMutation({
    mutationFn: (offer: AdminOffer) => changeActive(offer.id, !offer.isActive),
    onSuccess: () => client.invalidateQueries({ queryKey: eventOffersQueryKey(eventId) }),
  });

  return {
    offers: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    isToggleError: toggle.isError,
    retry: () => void query.refetch(),
    toggleActive: (offer) => toggle.mutate(offer),
  };
}
