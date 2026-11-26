import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';

import { likePost, listFeedPage, listMyClubs, unlikePost, type FeedPage } from '@/services/feed';

import { feedKeys } from './feedKeys';

/** The shared stream, newest first, loaded page by page with a keyset cursor. */
export function useFeedPosts() {
  return useInfiniteQuery({
    queryKey: feedKeys.list(),
    queryFn: ({ pageParam }) => listFeedPage(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

/** Venues the user belongs to; empty for everyone else, so no "as club" choice is offered. */
export function useMyClubs(enabled: boolean) {
  return useQuery({
    queryKey: feedKeys.myClubs(),
    queryFn: listMyClubs,
    enabled,
  });
}

type FeedData = InfiniteData<FeedPage, string | undefined>;

/** Returns the cached feed with one post's like state flipped. Pure; exported for tests. */
export function withLike(data: FeedData, postId: string, liked: boolean): FeedData {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      posts: page.posts.map((post) =>
        post.id === postId && post.likedByMe !== liked
          ? { ...post, likedByMe: liked, likeCount: Math.max(0, post.likeCount + (liked ? 1 : -1)) }
          : post,
      ),
    })),
  };
}

/** Like or unlike with an instant update; rolls back when the server refuses. */
export function useToggleLike(userId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, liked }: { postId: string; liked: boolean }) => {
      if (!userId) throw new Error('post_like_failed');
      await (liked ? likePost(postId, userId) : unlikePost(postId, userId));
    },
    onMutate: async ({ postId, liked }) => {
      await queryClient.cancelQueries({ queryKey: feedKeys.list() });
      const previous = queryClient.getQueryData<FeedData>(feedKeys.list());
      if (previous) queryClient.setQueryData(feedKeys.list(), withLike(previous, postId, liked));
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(feedKeys.list(), context.previous);
    },
  });
}
