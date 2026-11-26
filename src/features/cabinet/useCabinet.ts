import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getVenueDashboard } from '@/services/venueDashboard';
import {
  getMyVenueProfile,
  removeVenuePhoto,
  updateVenueProfile,
  uploadVenueFile,
  uploadVenuePhoto,
  type VenuePhoto,
  type VenuePhotoKind,
  type VenueProfileInput,
} from '@/services/venueProfile';
import {
  acceptVenueInvite,
  cancelVenueInvite,
  inviteVenueStaff,
  listMyCabinetVenues,
  listVenueInvites,
  listVenueMembers,
  removeVenueMember,
  type VenueStaffRole,
} from '@/services/venueTeam';

import { pickCabinetVenue } from './cabinetAccess';

export const cabinetKeys = {
  all: ['cabinet'] as const,
  venues: () => [...cabinetKeys.all, 'venues'] as const,
  dashboard: (venueId: string) => [...cabinetKeys.all, 'dashboard', venueId] as const,
  profile: (venueId: string) => [...cabinetKeys.all, 'profile', venueId] as const,
  members: (venueId: string) => [...cabinetKeys.all, 'members', venueId] as const,
  invites: (venueId: string) => [...cabinetKeys.all, 'invites', venueId] as const,
};

/** The venue the cabinet works with (first owned, else first admin) and the caller's role in it. */
export function useCabinetVenue() {
  const query = useQuery({ queryKey: cabinetKeys.venues(), queryFn: listMyCabinetVenues });
  return {
    venue: query.data ? pickCabinetVenue(query.data) : null,
    isLoading: query.isPending,
    isError: query.isError,
    retry: () => void query.refetch(),
  };
}

export function useVenueDashboard(venueId: string) {
  return useQuery({
    queryKey: cabinetKeys.dashboard(venueId),
    queryFn: () => getVenueDashboard(venueId),
  });
}

export function useVenueProfile(venueId: string) {
  return useQuery({
    queryKey: cabinetKeys.profile(venueId),
    queryFn: () => getMyVenueProfile(venueId),
  });
}

export function useSaveVenueProfile(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: VenueProfileInput) => updateVenueProfile(venueId, input),
    onSuccess: (profile) => queryClient.setQueryData(cabinetKeys.profile(venueId), profile),
  });
}

/** Uploads a cover and stores its path on the venue. */
export function useUploadVenueCover(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fileUri: string) => {
      const path = await uploadVenueFile(venueId, fileUri, 'cover');
      return updateVenueProfile(venueId, { coverPath: path });
    },
    onSuccess: (profile) => queryClient.setQueryData(cabinetKeys.profile(venueId), profile),
  });
}

export function useUploadVenuePhoto(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { fileUri: string; kind: VenuePhotoKind }) =>
      uploadVenuePhoto(venueId, input.fileUri, input.kind),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cabinetKeys.profile(venueId) }),
  });
}

export function useRemoveVenuePhoto(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (photo: Pick<VenuePhoto, 'id' | 'path'>) => removeVenuePhoto(photo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cabinetKeys.profile(venueId) }),
  });
}

export function useVenueMembers(venueId: string) {
  return useQuery({
    queryKey: cabinetKeys.members(venueId),
    queryFn: () => listVenueMembers(venueId),
  });
}

export function useVenueInvites(venueId: string) {
  return useQuery({
    queryKey: cabinetKeys.invites(venueId),
    queryFn: () => listVenueInvites(venueId),
  });
}

export function useRemoveMember(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => removeVenueMember(venueId, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cabinetKeys.members(venueId) }),
  });
}

/** Resolves with the one-time raw invite token; the caller shows it once and drops it. */
export function useInviteStaff(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { email: string; role: VenueStaffRole }) =>
      inviteVenueStaff(venueId, input.email, input.role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cabinetKeys.invites(venueId) }),
  });
}

export function useCancelInvite(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) => cancelVenueInvite(inviteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cabinetKeys.invites(venueId) }),
  });
}

/** The invited user accepts with the token; refreshes memberships so the cabinet appears. */
export function useAcceptInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => acceptVenueInvite(token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cabinetKeys.all }),
  });
}
