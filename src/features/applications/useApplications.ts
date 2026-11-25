import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  approveApplication,
  checkIsSuperadmin,
  djPayload,
  listMyApplications,
  listPendingApplications,
  rejectApplication,
  submitApplication,
  uploadApplicationPhoto,
  venuePayload,
} from '@/services/applications';

import { parseGenres, type DjFormValues, type VenueFormValues } from './applicationRules';

export const applicationKeys = {
  all: ['applications'] as const,
  mine: (userId: string) => [...applicationKeys.all, 'mine', userId] as const,
  pending: () => [...applicationKeys.all, 'pending'] as const,
  superadmin: (userId: string) => [...applicationKeys.all, 'superadmin', userId] as const,
};

/** The signed-in user's own applications, newest first. */
export function useMyApplications(userId: string | undefined) {
  return useQuery({
    queryKey: applicationKeys.mine(userId ?? ''),
    queryFn: listMyApplications,
    enabled: Boolean(userId),
  });
}

/** True only when the server says the signed-in user is a superadmin. */
export function useIsSuperadmin(userId: string | undefined) {
  return useQuery({
    queryKey: applicationKeys.superadmin(userId ?? ''),
    queryFn: checkIsSuperadmin,
    enabled: Boolean(userId),
  });
}

type SubmitInput =
  { kind: 'venue'; values: VenueFormValues } | { kind: 'dj'; values: DjFormValues };

/** Uploads the photos into the applicant's folder, then sends the application. */
export function useSubmitApplication(userId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SubmitInput) => {
      if (!userId) throw new Error('not_signed_in');
      if (input.kind === 'venue') {
        const { values } = input;
        if (!values.pin) throw new Error('pin_missing');
        const photoPaths = await Promise.all(
          values.photoUris.map((uri) => uploadApplicationPhoto(userId, uri)),
        );
        await submitApplication(
          'venue',
          venuePayload({
            name: values.name,
            address: values.address,
            lat: values.pin.lat,
            lng: values.pin.lng,
            instagram: values.instagram,
            contact: values.contact,
            photoPaths,
            comment: values.comment,
          }),
        );
        return;
      }
      const { values } = input;
      const photoPath = values.photoUri
        ? await uploadApplicationPhoto(userId, values.photoUri)
        : null;
      await submitApplication(
        'dj',
        djPayload({
          stageName: values.stageName,
          genres: parseGenres(values.genresText),
          bio: values.bio,
          photoPath,
          instagram: values.instagram,
          soundcloud: values.soundcloud,
          contact: values.instagram || values.soundcloud,
        }),
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applicationKeys.all }),
  });
}

/** Pending queue for the superadmin. */
export function usePendingApplications(enabled: boolean) {
  return useQuery({
    queryKey: applicationKeys.pending(),
    queryFn: listPendingApplications,
    enabled,
  });
}

type Decision = { id: string; approve: true } | { id: string; approve: false; reason: string };

/** Approves or rejects one application through the server RPCs. */
export function useDecideApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (decision: Decision) =>
      decision.approve
        ? approveApplication(decision.id)
        : rejectApplication(decision.id, decision.reason),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applicationKeys.all }),
  });
}
