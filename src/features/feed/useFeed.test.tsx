import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { likePost, listFeedPage, unlikePost, type FeedPost } from '@/services/feed';

import { feedKeys } from './feedKeys';
import { useFeedPosts, useToggleLike, withLike } from './useFeed';

jest.mock('@/services/feed', () => ({
  listFeedPage: jest.fn(),
  listMyClubs: jest.fn(),
  likePost: jest.fn(),
  unlikePost: jest.fn(),
}));

function post(id: string, likedByMe = false, likeCount = 1): FeedPost {
  return {
    id,
    authorId: 'u1',
    authorName: 'Ola',
    handle: 'ola',
    avatarUrl: null,
    label: null,
    body: 'Text',
    imageUrls: [],
    createdAt: '2026-11-20T10:00:00Z',
    editedAt: null,
    likeCount,
    commentCount: 0,
    likedByMe,
    asVenueId: null,
  };
}

function setup() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  return { client, wrapper };
}

describe('withLike', () => {
  it('flips only the chosen post and keeps the count in step', () => {
    const data = {
      pages: [{ posts: [post('a'), post('b', true, 3)], nextCursor: null }],
      pageParams: [undefined],
    };
    const liked = withLike(data, 'a', true);
    expect(liked.pages[0]?.posts[0]).toMatchObject({ likedByMe: true, likeCount: 2 });
    expect(liked.pages[0]?.posts[1]).toMatchObject({ likedByMe: true, likeCount: 3 });
    const unliked = withLike(data, 'b', false);
    expect(unliked.pages[0]?.posts[1]).toMatchObject({ likedByMe: false, likeCount: 2 });
  });
});

describe('useFeedPosts', () => {
  beforeEach(() => jest.resetAllMocks());

  it('loads the next page with the cursor of the previous one', async () => {
    jest
      .mocked(listFeedPage)
      .mockResolvedValueOnce({ posts: [post('a')], nextCursor: 'cursor-1' })
      .mockResolvedValueOnce({ posts: [post('b')], nextCursor: null });
    const { wrapper } = setup();
    const { result } = await renderHook(() => useFeedPosts(), { wrapper });
    await waitFor(() => expect(result.current.data?.pages).toHaveLength(1));
    expect(result.current.hasNextPage).toBe(true);
    await act(async () => {
      await result.current.fetchNextPage();
    });
    expect(listFeedPage).toHaveBeenLastCalledWith('cursor-1');
    await waitFor(() => expect(result.current.hasNextPage).toBe(false));
  });
});

describe('useToggleLike', () => {
  beforeEach(() => jest.resetAllMocks());

  function seed(client: QueryClient) {
    client.setQueryData(feedKeys.list(), {
      pages: [{ posts: [post('a')], nextCursor: null }],
      pageParams: [undefined],
    });
  }
  const read = (client: QueryClient) =>
    client.getQueryData<{ pages: { posts: FeedPost[] }[] }>(feedKeys.list())?.pages[0]?.posts[0];

  it('shows the like at once and keeps it when the server accepts', async () => {
    jest.mocked(likePost).mockResolvedValue(undefined);
    const { client, wrapper } = setup();
    seed(client);
    const { result } = await renderHook(() => useToggleLike('u1'), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ postId: 'a', liked: true });
    });
    expect(likePost).toHaveBeenCalledWith('a', 'u1');
    expect(read(client)).toMatchObject({ likedByMe: true, likeCount: 2 });
  });

  it('rolls the like back when the server refuses', async () => {
    jest.mocked(likePost).mockRejectedValue(new Error('post_like_failed'));
    const { client, wrapper } = setup();
    seed(client);
    const { result } = await renderHook(() => useToggleLike('u1'), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ postId: 'a', liked: true }).catch(() => undefined);
    });
    expect(read(client)).toMatchObject({ likedByMe: false, likeCount: 1 });
  });

  it('unlikes through the unlike service', async () => {
    jest.mocked(unlikePost).mockResolvedValue(undefined);
    const { client, wrapper } = setup();
    seed(client);
    const { result } = await renderHook(() => useToggleLike('u1'), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ postId: 'a', liked: false });
    });
    expect(unlikePost).toHaveBeenCalledWith('a', 'u1');
  });
});
