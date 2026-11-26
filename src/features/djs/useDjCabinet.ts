import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getMyDjProfile, getMyGigs, updateMyDjProfile, uploadDjFile } from '@/services/djCabinet';
import { setMyDjPublished } from '@/services/djs';
import type { MyDjProfile } from '@/types/djs';

import { buildProfileSave, type DjProfileFormValues } from './djProfileRules';
import { djKeys } from './useDjs';

export const djCabinetKeys = {
  profile: (userId: string) => [...djKeys.all, 'mine', userId] as const,
  gigs: (profileId: string) => [...djKeys.all, 'my-gigs', profileId] as const,
};

/** The signed-in DJ's own profile; null data when they have none. */
export function useMyDjProfile(userId: string | undefined) {
  return useQuery({
    queryKey: djCabinetKeys.profile(userId ?? ''),
    queryFn: () => getMyDjProfile(userId ?? ''),
    enabled: Boolean(userId),
  });
}

/** Upcoming gigs of the DJ profile, from the lineup links of events. */
export function useMyGigs(profileId: string | undefined) {
  return useQuery({
    queryKey: djCabinetKeys.gigs(profileId ?? ''),
    queryFn: () => getMyGigs(profileId ?? ''),
    enabled: Boolean(profileId),
  });
}

/** Uploads picked images into the DJ's folder, then saves the profile fields. */
export function useSaveDjProfile(userId: string | undefined) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({
      profile,
      values,
    }: {
      profile: MyDjProfile;
      values: DjProfileFormValues;
    }) => {
      const { fields, newPhotoUri, newCoverUri } = buildProfileSave(values, profile);
      if (newPhotoUri) fields.photoPath = await uploadDjFile(profile.id, newPhotoUri, 'photo');
      if (newCoverUri) fields.coverPath = await uploadDjFile(profile.id, newCoverUri, 'cover');
      return updateMyDjProfile(profile.id, fields);
    },
    onSuccess: (saved) => {
      client.setQueryData(djCabinetKeys.profile(userId ?? ''), saved);
      void client.invalidateQueries({ queryKey: djKeys.list() });
    },
  });
}

/** Publishes or unpublishes the profile through the server RPC. */
export function usePublishMyDj(userId: string | undefined) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: setMyDjPublished,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: djCabinetKeys.profile(userId ?? '') });
      void client.invalidateQueries({ queryKey: djKeys.all });
    },
  });
}
