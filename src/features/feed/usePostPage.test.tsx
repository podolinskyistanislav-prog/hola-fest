import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

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
} from '@/services/feed';

import {
  useAddComment,
  useAuthorPosts,
  useBlockAuthor,
  useComments,
  useDeleteContent,
  useEditPost,
  useFeedAuthor,
  usePost,
  useReport,
} from './usePostPage';

jest.mock('@/services/feed', () => ({
  blockUser: jest.fn(),
  createComment: jest.fn(),
  deleteComment: jest.fn(),
  deletePost: jest.fn(),
  editPost: jest.fn(),
  getFeedAuthor: jest.fn(),
  getFeedPost: jest.fn(),
  listAuthorPosts: jest.fn(),
  listComments: jest.fn(),
  reportComment: jest.fn(),
  reportPost: jest.fn(),
}));

function setup() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  return { wrapper };
}

describe('usePostPage hooks', () => {
  beforeEach(() => jest.clearAllMocks());

  it('loads a post, its comments and an author', async () => {
    jest.mocked(getFeedPost).mockResolvedValue(null);
    jest.mocked(listComments).mockResolvedValue([]);
    jest.mocked(getFeedAuthor).mockResolvedValue(null);
    const { wrapper } = setup();
    const post = await renderHook(() => usePost('p1'), { wrapper });
    const comments = await renderHook(() => useComments('p1'), { wrapper });
    const author = await renderHook(() => useFeedAuthor('ola'), { wrapper });
    await waitFor(() => expect(post.result.current.isSuccess).toBe(true));
    await waitFor(() => expect(comments.result.current.isSuccess).toBe(true));
    await waitFor(() => expect(author.result.current.isSuccess).toBe(true));
    expect(getFeedPost).toHaveBeenCalledWith('p1');
    expect(listComments).toHaveBeenCalledWith('p1');
    expect(getFeedAuthor).toHaveBeenCalledWith('ola');
  });

  it('does not load author posts until the author is known', async () => {
    jest.mocked(listAuthorPosts).mockResolvedValue({ posts: [], nextCursor: null });
    const { wrapper } = setup();
    const waiting = await renderHook(() => useAuthorPosts(undefined), { wrapper });
    expect(waiting.result.current.fetchStatus).toBe('idle');
    const ready = await renderHook(() => useAuthorPosts('u1'), { wrapper });
    await waitFor(() => expect(ready.result.current.isSuccess).toBe(true));
    expect(listAuthorPosts).toHaveBeenCalledWith('u1', undefined);
  });

  it('adds a trimmed comment with its parent and reports success as null', async () => {
    jest.mocked(createComment).mockResolvedValue({ ok: true, id: 'c1' });
    const { wrapper } = setup();
    const { result } = await renderHook(() => useAddComment('p1'), { wrapper });
    let message: string | null = 'x';
    await act(async () => {
      message = await result.current.mutateAsync({ body: ' hi ', parentId: 'c0' });
    });
    expect(message).toBeNull();
    expect(createComment).toHaveBeenCalledWith({ postId: 'p1', body: 'hi', parentId: 'c0' });
  });

  it('turns a refusal into a friendly message', async () => {
    jest.mocked(createComment).mockResolvedValue({ ok: false, reason: 'links' });
    const { wrapper } = setup();
    const { result } = await renderHook(() => useAddComment('p1'), { wrapper });
    let message: string | null = null;
    await act(async () => {
      message = await result.current.mutateAsync({ body: 'a' });
    });
    expect(message).toContain('Посилання');
  });

  it('reports a post or a comment', async () => {
    jest.mocked(reportPost).mockResolvedValue(undefined);
    jest.mocked(reportComment).mockResolvedValue(undefined);
    const { wrapper } = setup();
    const { result } = await renderHook(() => useReport(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ target: { kind: 'post', id: 'p1' }, reason: 'spam' });
      await result.current.mutateAsync({ target: { kind: 'comment', id: 'c1' }, reason: 'abuse' });
    });
    expect(reportPost).toHaveBeenCalledWith('p1', 'spam');
    expect(reportComment).toHaveBeenCalledWith('c1', 'abuse');
  });

  it('blocks an author', async () => {
    jest.mocked(blockUser).mockResolvedValue(undefined);
    const { wrapper } = setup();
    const { result } = await renderHook(() => useBlockAuthor(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync('u2');
    });
    expect(blockUser).toHaveBeenCalledWith('u2');
  });

  it('deletes a post or a comment', async () => {
    jest.mocked(deletePost).mockResolvedValue(undefined);
    jest.mocked(deleteComment).mockResolvedValue(undefined);
    const { wrapper } = setup();
    const { result } = await renderHook(() => useDeleteContent(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ kind: 'post', id: 'p1' });
      await result.current.mutateAsync({ kind: 'comment', id: 'c1' });
    });
    expect(deletePost).toHaveBeenCalledWith('p1');
    expect(deleteComment).toHaveBeenCalledWith('c1');
  });

  it('edits a post through feed-post', async () => {
    jest.mocked(editPost).mockResolvedValue({ ok: true, id: 'p1' });
    const { wrapper } = setup();
    const { result } = await renderHook(() => useEditPost('p1'), { wrapper });
    let message: string | null = 'x';
    await act(async () => {
      message = await result.current.mutateAsync({ body: 'new', imagePaths: [] });
    });
    expect(message).toBeNull();
    expect(editPost).toHaveBeenCalledWith('p1', { body: 'new', imagePaths: [] });
  });
});
