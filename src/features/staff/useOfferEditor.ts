import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createOffer, listEventOffers, setOfferActive, updateOffer } from '@/services/admin';
import type { AdminOffer } from '@/types/admin';

import type { OfferSubmission } from './offerFormValidation';
import { eventOffersQueryKey } from './useEventOffers';

export type UseOfferEditor = {
  /** The offer being edited; null when creating or while loading. */
  offer: AdminOffer | null;
  isLoading: boolean;
  isLoadError: boolean;
  isSaving: boolean;
  isSaveError: boolean;
  retry: () => void;
  /** Saves the offer; resolves true on success. */
  save: (submission: OfferSubmission) => Promise<boolean>;
};

type Services = {
  fetchOffers: typeof listEventOffers;
  create: typeof createOffer;
  update: typeof updateOffer;
  changeActive: typeof setOfferActive;
};

const defaultServices: Services = {
  fetchOffers: listEventOffers,
  create: createOffer,
  update: updateOffer,
  changeActive: setOfferActive,
};

/** Loads one offer of an event (when editing) and saves a new or changed one. */
export function useOfferEditor(
  eventId: string,
  offerId?: string,
  { fetchOffers, create, update, changeActive }: Services = defaultServices,
): UseOfferEditor {
  const client = useQueryClient();
  const offers = useQuery({
    queryKey: eventOffersQueryKey(eventId),
    queryFn: () => fetchOffers(eventId),
    enabled: offerId !== undefined,
  });
  const offer = offers.data?.find((candidate) => candidate.id === offerId) ?? null;

  const mutation = useMutation({
    mutationFn: async ({ input, isActive }: OfferSubmission) => {
      const saved =
        offerId === undefined ? await create(eventId, input) : await update(offerId, input);
      return saved.isActive === isActive ? saved : changeActive(saved.id, isActive);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: eventOffersQueryKey(eventId) }),
  });

  const isMissing = offerId !== undefined && offers.isSuccess && offer === null;

  return {
    offer,
    isLoading: offerId !== undefined && offers.isPending,
    isLoadError: offerId !== undefined && (offers.isError || isMissing),
    isSaving: mutation.isPending,
    isSaveError: mutation.isError,
    retry: () => void offers.refetch(),
    save: async (submission) => {
      try {
        await mutation.mutateAsync(submission);
        return true;
      } catch {
        return false;
      }
    },
  };
}
