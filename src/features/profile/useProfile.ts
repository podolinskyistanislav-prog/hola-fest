import { useQuery } from '@tanstack/react-query';

import { getMyProfile, listMyPosts } from '@/services/profile';

export const profileKeys = {
  all: ['profile'] as const,
  mine: (userId: string) => [...profileKeys.all, 'mine', userId] as const,
  posts: (userId: string) => [...profileKeys.all, 'posts', userId] as const,
};

/** The signed-in user's own profile; null data while no row exists. */
export function useMyProfile(userId: string | undefined) {
  return useQuery({
    queryKey: profileKeys.mine(userId ?? ''),
    queryFn: () => getMyProfile(userId ?? ''),
    enabled: Boolean(userId),
  });
}

/** The signed-in user's own posts, newest first. */
export function useMyPosts(userId: string | undefined) {
  return useQuery({
    queryKey: profileKeys.posts(userId ?? ''),
    queryFn: () => listMyPosts(userId ?? ''),
    enabled: Boolean(userId),
  });
}
