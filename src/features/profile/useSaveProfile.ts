import { useMutation, useQueryClient } from '@tanstack/react-query';

import { t } from '@/lib/i18n';
import { saveMyProfile, uploadAvatar } from '@/services/profile';

import { profileKeys } from './useProfile';

export interface ProfileSubmission {
  displayName: string;
  handle: string;
  /** Local resized JPEG chosen on this device; uploaded before saving. */
  avatarUri: string | null;
  /** Path already stored for the profile, kept when no new photo was chosen. */
  currentAvatarPath: string | null;
}

export type SaveProfileResult = { ok: true } | { ok: false; error: string };

type Deps = {
  saveMyProfile: typeof saveMyProfile;
  uploadAvatar: typeof uploadAvatar;
};

/** Uploads the optional avatar, then saves name, handle and avatar. Never throws. */
export function useSaveProfile(
  userId: string | undefined,
  deps: Deps = { saveMyProfile, uploadAvatar },
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (input: ProfileSubmission): Promise<SaveProfileResult> => {
      if (!userId) return { ok: false, error: t('profileSetup.saveFailed') };
      let avatarPath = input.currentAvatarPath;
      if (input.avatarUri) {
        try {
          avatarPath = await deps.uploadAvatar(userId, input.avatarUri);
        } catch {
          // The photo is optional: save the profile without it; it can be added later.
        }
      }
      try {
        await deps.saveMyProfile(userId, {
          displayName: input.displayName.trim(),
          handle: input.handle,
          avatarPath,
        });
      } catch (caught) {
        const taken = caught instanceof Error && caught.message === 'handle_taken';
        return {
          ok: false,
          error: t(taken ? 'profileSetup.handleTaken' : 'profileSetup.saveFailed'),
        };
      }
      await queryClient.invalidateQueries({ queryKey: profileKeys.all });
      return { ok: true };
    },
  });
  return { save: mutation.mutateAsync, isSaving: mutation.isPending };
}
