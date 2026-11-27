import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';

import {
  blockUser,
  createComment,
  deleteComment,
  deletePost,
  editPost,
  getFeedAuthor,
  getFeedPost,
  listAuthorPosts,
  listComments,
  reportComment,
  reportPost,
  type PostDraft,
  type ReportReason,
} from '@/services/feed';

import { feedErrorMessage } from './feedErrors';
import { feedKeys } from './feedKeys';

export function usePost(postId: string) {
  return useQuery({ queryKey: feedKeys.post(postId), queryFn: () => getFeedPost(postId) });
}

export function useComments(postId: string) {
  return useQuery({ queryKey: feedKeys.comments(postId), queryFn: () => listComments(postId) });
}

export function useFeedAuthor(handle: string) {
  return useQuery({ queryKey: feedKeys.author(handle), queryFn: () => getFeedAuthor(handle) });
}

/** One author's posts, newest first. Waits until the author is known. */
export function useAuthorPosts(authorId: string | undefined) {
  return useInfiniteQuery({
    queryKey: feedKeys.authorPosts(authorId ?? ''),
    queryFn: ({ pageParam }) => listAuthorPosts(authorId ?? '', pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: Boolean(authorId),
  });
}

function refreshFeed(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: feedKeys.all });
}

/** Adds a comment or a reply; resolves to a Ukrainian error message or null on success. */
export function useAddComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { body: string; parentId?: string }): Promise<string | null> => {
      const result = await createComment({
        postId,
        body: input.body.trim(),
        parentId: input.parentId,
      });
      if (!result.ok) return feedErrorMessage(result.reason);
      await refreshFeed(queryClient);
      return null;
    },
  });
}

export interface ContentTarget {
  kind: 'post' | 'comment';
  id: string;
}

export function useReport() {
  return useMutation({
    mutationFn: ({ target, reason }: { target: ContentTarget; reason: ReportReason }) =>
      target.kind === 'post' ? reportPost(target.id, reason) : reportComment(target.id, reason),
  });
}

/** Blocking hides the author's content everywhere, so every feed query is refreshed. */
export function useBlockAuthor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (authorId: string) => {
      await blockUser(authorId);
      await refreshFeed(queryClient);
    },
  });
}

export function useDeleteContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (target: ContentTarget) => {
      await (target.kind === 'post' ? deletePost(target.id) : deleteComment(target.id));
      await refreshFeed(queryClient);
    },
  });
}

/** Edits the user's own post through feed-post; resolves to an error message or null. */
export function useEditPost(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (draft: PostDraft): Promise<string | null> => {
      const result = await editPost(postId, draft);
      if (!result.ok) return feedErrorMessage(result.reason);
      await refreshFeed(queryClient);
      return null;
    },
  });
}
