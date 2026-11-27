import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { useSession } from '@/features/auth';
import { useFeedAccess } from '@/features/profile';
import { t } from '@/lib/i18n';
import {
  blockUser,
  getFeedAuthor,
  listAuthorPosts,
  type FeedAuthor,
  type FeedPost,
} from '@/services/feed';

import { AuthorScreenContent } from './AuthorScreenContent';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@/services/feed', () => ({
  getFeedAuthor: jest.fn(),
  listAuthorPosts: jest.fn(),
  blockUser: jest.fn(),
  reportPost: jest.fn(),
  reportComment: jest.fn(),
  deletePost: jest.fn(),
  deleteComment: jest.fn(),
}));
jest.mock('@/features/auth', () => ({
  useSession: jest.fn(),
  SignInToPostSheet: () => null,
}));
jest.mock('@/features/profile', () => ({ useFeedAccess: jest.fn() }));

const author: FeedAuthor = {
  id: 'u2',
  name: 'Ola',
  handle: 'ola',
  avatarUrl: null,
  label: 'dj',
};

const post: FeedPost = {
  id: 'p1',
  authorId: 'u2',
  authorName: 'Ola',
  handle: 'ola',
  avatarUrl: null,
  label: 'dj',
  body: 'Мій сет',
  imageUrls: [],
  createdAt: '2026-11-20T10:00:00Z',
  editedAt: null,
  likeCount: 0,
  commentCount: 0,
  likedByMe: false,
  asVenueId: null,
};

const onBack = jest.fn();
const onOpenPost = jest.fn();

function renderAuthor() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <AuthorScreenContent
        handle="ola"
        onBack={onBack}
        onOpenPost={onOpenPost}
        onOpenProfileSetup={jest.fn()}
      />
    </QueryClientProvider>,
  );
}

describe('AuthorScreenContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useSession).mockReturnValue({
      session: { user: { id: 'u1', is_anonymous: false } },
    } as ReturnType<typeof useSession>);
    jest.mocked(useFeedAccess).mockReturnValue('ready');
    jest.mocked(getFeedAuthor).mockResolvedValue(author);
    jest.mocked(listAuthorPosts).mockResolvedValue({ posts: [post], nextCursor: null });
  });

  it('shows the author and their posts', async () => {
    await renderAuthor();
    expect(await screen.findByText('@ola')).toBeTruthy();
    expect(await screen.findByText('Мій сет')).toBeTruthy();
    expect(listAuthorPosts).toHaveBeenCalledWith('u2', undefined);
  });

  it('shows an unavailable state for an unknown or blocked author', async () => {
    jest.mocked(getFeedAuthor).mockResolvedValue(null);
    await renderAuthor();
    expect(await screen.findByText(t('feed.author.unavailableTitle'))).toBeTruthy();
  });

  it('opens a post when it is tapped', async () => {
    await renderAuthor();
    await fireEvent.press(await screen.findByText('Мій сет'));
    expect(onOpenPost).toHaveBeenCalledWith('p1');
  });

  it('blocks the author after confirmation and goes back', async () => {
    jest.mocked(blockUser).mockResolvedValue(undefined);
    await renderAuthor();
    await fireEvent.press(await screen.findByLabelText(t('feed.author.block')));
    expect(blockUser).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByLabelText(t('feed.menu.block')));
    await waitFor(() => expect(blockUser).toHaveBeenCalledWith('u2'));
    await waitFor(() => expect(onBack).toHaveBeenCalled());
  });

  it('does not offer to block yourself', async () => {
    jest.mocked(useSession).mockReturnValue({
      session: { user: { id: 'u2', is_anonymous: false } },
    } as ReturnType<typeof useSession>);
    await renderAuthor();
    await screen.findByText('@ola');
    expect(screen.queryByLabelText(t('feed.author.block'))).toBeNull();
  });
});
