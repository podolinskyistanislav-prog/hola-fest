import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { useSession } from '@/features/auth';
import { useFeedAccess } from '@/features/profile';
import { t } from '@/lib/i18n';
import {
  blockUser,
  deleteComment,
  deletePost,
  getFeedPost,
  listComments,
  reportPost,
  type FeedComment,
  type FeedPost,
} from '@/services/feed';

import { PostScreenContent } from './PostScreenContent';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('expo-linking', () => ({ createURL: (path: string) => `holafest://${path}` }));
jest.mock('@/services/feed', () => ({
  getFeedPost: jest.fn(),
  listComments: jest.fn(),
  createComment: jest.fn(),
  likePost: jest.fn(),
  unlikePost: jest.fn(),
  reportPost: jest.fn(),
  reportComment: jest.fn(),
  blockUser: jest.fn(),
  deletePost: jest.fn(),
  deleteComment: jest.fn(),
  editPost: jest.fn(),
}));
jest.mock('@/features/auth', () => ({
  useSession: jest.fn(),
  SignInToPostSheet: ({ visible }: { visible: boolean }) => {
    const { Text } = jest.requireActual('react-native');
    return visible ? <Text>sign-in-sheet</Text> : null;
  },
}));
jest.mock('@/features/profile', () => ({ useFeedAccess: jest.fn() }));

const post: FeedPost = {
  id: 'p1',
  authorId: 'u2',
  authorName: 'Ola',
  handle: 'ola',
  avatarUrl: null,
  label: 'club',
  body: 'Чудова ніч',
  imageUrls: [],
  createdAt: '2026-11-20T10:00:00Z',
  editedAt: null,
  likeCount: 2,
  commentCount: 2,
  likedByMe: false,
  asVenueId: null,
};

function comment(id: string, authorId: string, parentId: string | null = null): FeedComment {
  return {
    id,
    postId: 'p1',
    parentId,
    authorId,
    authorName: `Name ${id}`,
    handle: `h${id}`,
    avatarUrl: null,
    label: null,
    body: `Текст ${id}`,
    createdAt: '2026-11-20T11:00:00Z',
  };
}

const onBack = jest.fn();
const onOpenAuthor = jest.fn();
const onOpenProfileSetup = jest.fn();

function renderPost() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <PostScreenContent
        postId="p1"
        onBack={onBack}
        onOpenAuthor={onOpenAuthor}
        onOpenProfileSetup={onOpenProfileSetup}
      />
    </QueryClientProvider>,
  );
}

describe('PostScreenContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useSession).mockReturnValue({
      session: { user: { id: 'u1', is_anonymous: false } },
    } as ReturnType<typeof useSession>);
    jest.mocked(useFeedAccess).mockReturnValue('ready');
    jest.mocked(getFeedPost).mockResolvedValue(post);
    jest.mocked(listComments).mockResolvedValue([comment('c1', 'u3'), comment('c2', 'u1', 'c1')]);
  });

  it('shows "Допис недоступний" for a hidden or deleted post', async () => {
    jest.mocked(getFeedPost).mockResolvedValue(null);
    await renderPost();
    expect(await screen.findByText(t('feed.post.unavailableTitle'))).toBeTruthy();
  });

  it('shows the post with its comment and reply', async () => {
    await renderPost();
    expect(await screen.findByText('Чудова ніч')).toBeTruthy();
    expect(await screen.findByText('Текст c1')).toBeTruthy();
    expect(screen.getByText('Текст c2')).toBeTruthy();
  });

  it('shows the empty state when there are no comments', async () => {
    jest.mocked(listComments).mockResolvedValue([]);
    await renderPost();
    expect(await screen.findByText(t('feed.post.commentsEmpty'))).toBeTruthy();
  });

  it("reports someone else's post with a chosen reason", async () => {
    jest.mocked(reportPost).mockResolvedValue(undefined);
    await renderPost();
    await screen.findByText('Чудова ніч');
    await fireEvent.press(screen.getAllByLabelText('Ще')[0]!);
    await fireEvent.press(screen.getByLabelText(t('feed.menu.report')));
    await fireEvent.press(screen.getByLabelText('Спам'));
    await waitFor(() => expect(reportPost).toHaveBeenCalledWith('p1', 'spam'));
  });

  it('blocks the author only after confirmation, then leaves the page', async () => {
    jest.mocked(blockUser).mockResolvedValue(undefined);
    await renderPost();
    await screen.findByText('Чудова ніч');
    await fireEvent.press(screen.getAllByLabelText('Ще')[0]!);
    await fireEvent.press(screen.getByLabelText(t('feed.menu.block')));
    expect(blockUser).not.toHaveBeenCalled();
    await fireEvent.press(screen.getAllByLabelText(t('feed.menu.block')).at(-1)!);
    await waitFor(() => expect(blockUser).toHaveBeenCalledWith('u2'));
    await waitFor(() => expect(onBack).toHaveBeenCalled());
  });

  it("offers delete on the user's own comment and confirms first", async () => {
    jest.mocked(deleteComment).mockResolvedValue(undefined);
    await renderPost();
    await screen.findByText('Текст c2');
    // menus in order: post, c1, c2
    await fireEvent.press(screen.getAllByLabelText('Ще')[2]!);
    expect(screen.queryByLabelText(t('feed.menu.report'))).toBeNull();
    await fireEvent.press(screen.getByLabelText(t('feed.menu.delete')));
    expect(deleteComment).not.toHaveBeenCalled();
    await fireEvent.press(screen.getAllByLabelText(t('feed.menu.delete')).at(-1)!);
    await waitFor(() => expect(deleteComment).toHaveBeenCalledWith('c2'));
  });

  it("deletes the user's own post and goes back", async () => {
    jest.mocked(useSession).mockReturnValue({
      session: { user: { id: 'u2', is_anonymous: false } },
    } as ReturnType<typeof useSession>);
    jest.mocked(deletePost).mockResolvedValue(undefined);
    await renderPost();
    await screen.findByText('Чудова ніч');
    await fireEvent.press(screen.getAllByLabelText('Ще')[0]!);
    expect(screen.getByLabelText(t('feed.menu.edit'))).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(t('feed.menu.delete')));
    await fireEvent.press(screen.getAllByLabelText(t('feed.menu.delete')).at(-1)!);
    await waitFor(() => expect(deletePost).toHaveBeenCalledWith('p1'));
    await waitFor(() => expect(onBack).toHaveBeenCalled());
  });

  it('asks a guest to confirm their email before reporting', async () => {
    jest.mocked(useFeedAccess).mockReturnValue('needs_email');
    await renderPost();
    await screen.findByText('Чудова ніч');
    await fireEvent.press(screen.getAllByLabelText('Ще')[0]!);
    await fireEvent.press(screen.getByLabelText(t('feed.menu.report')));
    expect(await screen.findByText('sign-in-sheet')).toBeTruthy();
  });
});
