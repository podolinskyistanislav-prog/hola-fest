import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { listVenueEvents } from '@/services/admin';
import {
  duplicateOffer,
  endOffer,
  listVenueOfferStats,
  listVenueOffers,
  pauseOffer,
  resumeOffer,
  saveVenueOffer,
  type VenueOfferInput,
} from '@/services/offerBuilder';

export const offerBuilderKeys = {
  all: ['offer-builder'] as const,
  offers: (venueId: string) => [...offerBuilderKeys.all, 'offers', venueId] as const,
  stats: (venueId: string) => [...offerBuilderKeys.all, 'stats', venueId] as const,
  events: (venueId: string) => [...offerBuilderKeys.all, 'events', venueId] as const,
};

export function useVenueOffers(venueId: string) {
  return useQuery({
    queryKey: offerBuilderKeys.offers(venueId),
    queryFn: () => listVenueOffers(venueId),
  });
}

export function useVenueOfferStats(venueId: string) {
  return useQuery({
    queryKey: offerBuilderKeys.stats(venueId),
    queryFn: () => listVenueOfferStats(venueId),
  });
}

/** Events of the venue the offer can be tied to. */
export function useVenueEventChoices(venueId: string) {
  return useQuery({
    queryKey: offerBuilderKeys.events(venueId),
    queryFn: () => listVenueEvents(venueId),
  });
}

export function useSaveVenueOffer(venueId: string, offerId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: VenueOfferInput) => saveVenueOffer(venueId, input, offerId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: offerBuilderKeys.offers(venueId) }),
  });
}

export type OfferListAction = 'pause' | 'resume' | 'end' | 'duplicate';

const ACTIONS = {
  pause: pauseOffer,
  resume: resumeOffer,
  end: endOffer,
  duplicate: duplicateOffer,
} as const;

/** Pause, resume, end or duplicate one offer; refreshes the list and the stats. */
export function useOfferAction(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { action: OfferListAction; offerId: string }) =>
      ACTIONS[input.action](input.offerId),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: offerBuilderKeys.offers(venueId) }),
        queryClient.invalidateQueries({ queryKey: offerBuilderKeys.stats(venueId) }),
      ]),
  });
}
