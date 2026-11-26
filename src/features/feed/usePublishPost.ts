import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { t } from '@/lib/i18n';
import { createPost, uploadPostImage } from '@/services/feed';

import { feedErrorMessage } from './feedErrors';
import { feedKeys } from './feedKeys';

export interface PostSubmission {
  body: string;
  /** Local resized JPEGs chosen on this device; uploaded one after another. */
  photoUris: readonly string[];
  /** Publish as this venue (club). */
  asVenueId?: string;
}

export type PublishResult = { ok: true } | { ok: false; error: string };

type Deps = {
  createPost: typeof createPost;
  uploadPostImage: typeof uploadPostImage;
};

/**
 * Uploads the photos (reporting overall progress 0..1), then publishes through the
 * feed-post function. Never throws: a refusal comes back as a Ukrainian message.
 */
export function usePublishPost(
  userId: string | undefined,
  deps: Deps = { createPost, uploadPostImage },
) {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const mutation = useMutation({
    mutationFn: async (input: PostSubmission): Promise<PublishResult> => {
      if (!userId) return { ok: false, error: feedErrorMessage('unauthenticated') };
      const total = input.photoUris.length;
      const imagePaths: string[] = [];
      try {
        for (const [index, uri] of input.photoUris.entries()) {
          imagePaths.push(
            await deps.uploadPostImage(userId, uri, (fraction) =>
              setProgress((index + fraction) / total),
            ),
          );
        }
      } catch {
        return { ok: false, error: t('feed.error.photo') };
      } finally {
        setProgress(undefined);
      }
      const result = await deps.createPost({
        body: input.body.trim(),
        imagePaths,
        asVenueId: input.asVenueId,
      });
      if (!result.ok) return { ok: false, error: feedErrorMessage(result.reason) };
      await queryClient.invalidateQueries({ queryKey: feedKeys.list() });
      return { ok: true };
    },
  });
  return { publish: mutation.mutateAsync, isPublishing: mutation.isPending, progress };
}
