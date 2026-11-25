import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { useSession } from '@/features/auth';
import { useFeedAccess } from '@/features/profile';
import { t } from '@/lib/i18n';
import { likePost, listFeedPage, type FeedPost } from '@/services/feed';

import { FeedScreenContent } from './FeedScreenContent';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('expo-linking', () => ({ createURL: (path: string) => `holafest://${path}` }));
jest.mock('@/services/feed', () => ({
  listFeedPage: jest.fn(),
  listMyClubs: jest.fn().mockResolvedValue([]),
  likePost: jest.fn(),
  unlikePost: jest.fn(),
  createPost: jest.fn(),
  uploadPostImage: jest.fn(),
}));
jest.mock('@/features/auth', () => ({
  useSession: jest.fn(),
  SignInToPostSheet: ({ visible }: { visible: boolean }) => {
    const { Text } = jest.requireActual('react-native');
    return visible ? <Text>sign-in-sheet</Text> : null;
  },
}));
jest.mock('@/features/profile', () => ({ useFeedAccess: jest.fn() }));
jest.mock('@/lib/secureStorage', () => ({
  readSecret: jest.fn().mockResolvedValue(null),
  saveSecret: jest.fn().mockResolvedValue(true),
}));
jest.mock('@/lib/pickPostPhoto', () => ({ pickPostPhoto: jest.fn() }));

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
  commentCount: 1,
  likedByMe: false,
  asVenueId: null,
};

const onOpenPost = jest.fn();
const onOpenProfileSetup = jest.fn();

function renderFeed() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <FeedScreenContent onOpenPost={onOpenPost} onOpenProfileSetup={onOpenProfileSetup} />
    </QueryClientProvider>,
  );
}

describe('FeedScreenContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useSession).mockReturnValue({
      session: { user: { id: 'u1', is_anonymous: false } },
    } as ReturnType<typeof useSession>);
    jest.mocked(useFeedAccess).mockReturnValue('ready');
  });

  it('shows a skeleton while loading', async () => {
    jest.mocked(listFeedPage).mockReturnValue(new Promise(() => undefined));
    await renderFeed();
    expect(screen.getByLabelText(t('feed.loading'))).toBeTruthy();
  });

  it('shows the empty state', async () => {
    jest.mocked(listFeedPage).mockResolvedValue({ posts: [], nextCursor: null });
    await renderFeed();
    expect(await screen.findByText(t('feed.emptyTitle'))).toBeTruthy();
  });

  it('shows an error with retry', async () => {
    jest.mocked(listFeedPage).mockRejectedValue(new Error('feed_load_failed'));
    await renderFeed();
    expect(await screen.findByText(t('feed.errorTitle'))).toBeTruthy();
    expect(screen.getByRole('button', { name: t('feed.retry') })).toBeTruthy();
  });

  it('lists posts with the Клуб label and opens the post on tap', async () => {
    jest.mocked(listFeedPage).mockResolvedValue({ posts: [post], nextCursor: null });
    await renderFeed();
    expect(await screen.findByText('Чудова ніч')).toBeTruthy();
    expect(screen.getByText('Клуб')).toBeTruthy();
    await fireEvent.press(screen.getByText('Чудова ніч'));
    expect(onOpenPost).toHaveBeenCalledWith('p1');
  });

  it('likes a post at once for a ready account', async () => {
    jest.mocked(listFeedPage).mockResolvedValue({ posts: [post], nextCursor: null });
    jest.mocked(likePost).mockResolvedValue(undefined);
    await renderFeed();
    await fireEvent.press(await screen.findByRole('button', { name: 'Вподобати, 2' }));
    expect(await screen.findByRole('button', { name: 'Прибрати вподобання, 3' })).toBeTruthy();
    expect(likePost).toHaveBeenCalledWith('p1', 'u1');
  });

  it('asks an anonymous guest to confirm email instead of liking', async () => {
    jest.mocked(useFeedAccess).mockReturnValue('needs_email');
    jest.mocked(listFeedPage).mockResolvedValue({ posts: [post], nextCursor: null });
    await renderFeed();
    await fireEvent.press(await screen.findByRole('button', { name: 'Вподобати, 2' }));
    expect(screen.getByText('sign-in-sheet')).toBeTruthy();
    expect(likePost).not.toHaveBeenCalled();
  });

  it('opens profile setup from "+" when the profile is incomplete', async () => {
    jest.mocked(useFeedAccess).mockReturnValue('needs_profile');
    jest.mocked(listFeedPage).mockResolvedValue({ posts: [], nextCursor: null });
    await renderFeed();
    await fireEvent.press(screen.getByRole('button', { name: t('feed.write') }));
    expect(onOpenProfileSetup).toHaveBeenCalled();
  });

  it('shows the feed rules before the first post', async () => {
    jest.mocked(listFeedPage).mockResolvedValue({ posts: [], nextCursor: null });
    await renderFeed();
    await fireEvent.press(screen.getByRole('button', { name: t('feed.write') }));
    expect(await screen.findByText('Правила стрічки')).toBeTruthy();
  });
});
