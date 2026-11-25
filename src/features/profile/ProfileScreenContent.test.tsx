import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { useSession, useStaffLogin } from '@/features/auth';
import { t } from '@/lib/i18n';
import { getMyProfile, listMyPosts } from '@/services/profile';

import { ProfileScreenContent } from './ProfileScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('@/features/auth', () => ({
  useSession: jest.fn(),
  useStaffLogin: jest.fn(),
  SignInToPostSheet: () => null,
}));
jest.mock('@/services/profile', () => ({
  getMyProfile: jest.fn(),
  listMyPosts: jest.fn(),
  feedImageUrl: (path: string) => `https://cdn/${path}`,
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

function session(isAnonymous: boolean) {
  jest.mocked(useSession).mockReturnValue({
    session: { user: { id: 'u1', is_anonymous: isAnonymous } } as never,
    isAnonymous,
    isLoading: false,
    isError: false,
    isRetrying: false,
    retry: jest.fn(),
  });
}

const signOut = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  signOut.mockResolvedValue(true);
  jest
    .mocked(useStaffLogin)
    .mockReturnValue({ signIn: jest.fn(), signOut, isLoading: false, error: null });
});

describe('ProfileScreenContent', () => {
  it('asks a guest to confirm the email', async () => {
    session(true);
    await render(<ProfileScreenContent onOpenSetup={jest.fn()} />, { wrapper });
    expect(screen.getByText(t('profile.guestHint'))).toBeTruthy();
    expect(screen.getByLabelText(t('profile.confirmEmail'))).toBeTruthy();
  });

  it('shows name, handle, my posts and signs out', async () => {
    session(false);
    jest
      .mocked(getMyProfile)
      .mockResolvedValue({ displayName: 'Nova', handle: 'nova', avatarPath: null });
    jest
      .mocked(listMyPosts)
      .mockResolvedValue([
        { id: 'p1', body: 'Чудова ніч', imagePaths: [], createdAt: '2026-11-01' },
      ]);
    await render(<ProfileScreenContent onOpenSetup={jest.fn()} />, { wrapper });
    await waitFor(() => expect(screen.getByText('Nova')).toBeTruthy());
    expect(screen.getByText('@nova')).toBeTruthy();
    await waitFor(() => expect(screen.getByText('Чудова ніч')).toBeTruthy());
    await fireEvent.press(screen.getByLabelText(t('profile.signOut')));
    expect(signOut).toHaveBeenCalled();
  });

  it('shows the empty state and offers setup when the profile has no handle', async () => {
    session(false);
    jest
      .mocked(getMyProfile)
      .mockResolvedValue({ displayName: null, handle: null, avatarPath: null });
    jest.mocked(listMyPosts).mockResolvedValue([]);
    const onOpenSetup = jest.fn();
    await render(<ProfileScreenContent onOpenSetup={onOpenSetup} />, { wrapper });
    await waitFor(() => expect(screen.getByText(t('profile.noPosts'))).toBeTruthy());
    await fireEvent.press(screen.getByLabelText(t('profile.setup')));
    expect(onOpenSetup).toHaveBeenCalled();
  });

  it('shows an error with retry when the profile fails to load', async () => {
    session(false);
    jest.mocked(getMyProfile).mockRejectedValue(new Error('profile_load_failed'));
    jest.mocked(listMyPosts).mockResolvedValue([]);
    await render(<ProfileScreenContent onOpenSetup={jest.fn()} />, { wrapper });
    await waitFor(() => expect(screen.getByText(t('profile.loadError'))).toBeTruthy());
    expect(screen.getByLabelText(t('profile.retry'))).toBeTruthy();
  });
});
