import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { useSession } from '@/features/auth';
import { t } from '@/lib/i18n';
import { checkHandleAvailable, getMyProfile } from '@/services/profile';

import { useFeedAccess } from './useFeedAccess';
import { HANDLE_DEBOUNCE_MS, useHandleAvailability } from './useHandleAvailability';
import { useSaveProfile } from './useSaveProfile';

jest.mock('@/services/profile', () => ({
  checkHandleAvailable: jest.fn(),
  getMyProfile: jest.fn(),
  saveMyProfile: jest.fn(),
  uploadAvatar: jest.fn(),
  listMyPosts: jest.fn(),
}));
jest.mock('@/features/auth', () => ({ useSession: jest.fn() }));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

function session(isAnonymous: boolean, isLoading = false) {
  jest.mocked(useSession).mockReturnValue({
    session: isLoading ? null : ({ user: { id: 'u1', is_anonymous: isAnonymous } } as never),
    isAnonymous,
    isLoading,
    isError: false,
    isRetrying: false,
    retry: jest.fn(),
  });
}

beforeEach(() => jest.resetAllMocks());

describe('useFeedAccess', () => {
  it('is loading while the session loads', async () => {
    session(false, true);
    const { result } = await renderHook(() => useFeedAccess(), { wrapper });
    expect(result.current).toBe('loading');
  });

  it('asks a guest to confirm the email', async () => {
    session(true);
    const { result } = await renderHook(() => useFeedAccess(), { wrapper });
    expect(result.current).toBe('needs_email');
    expect(getMyProfile).not.toHaveBeenCalled();
  });

  it('sends a confirmed account without a handle to profile setup (staff skip the code)', async () => {
    session(false);
    jest
      .mocked(getMyProfile)
      .mockResolvedValue({ displayName: null, handle: null, avatarPath: null });
    const { result } = await renderHook(() => useFeedAccess(), { wrapper });
    await waitFor(() => expect(result.current).toBe('needs_profile'));
  });

  it('is ready once name and handle exist', async () => {
    session(false);
    jest
      .mocked(getMyProfile)
      .mockResolvedValue({ displayName: 'Nova', handle: 'nova', avatarPath: null });
    const { result } = await renderHook(() => useFeedAccess(), { wrapper });
    await waitFor(() => expect(result.current).toBe('ready'));
  });
});

describe('useHandleAvailability', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('is invalid without calling the server for a malformed handle', async () => {
    const { result } = await renderHook(() => useHandleAvailability('ab'), { wrapper });
    await act(async () => {
      jest.advanceTimersByTime(HANDLE_DEBOUNCE_MS + 10);
    });
    expect(result.current).toBe('invalid');
    expect(checkHandleAvailable).not.toHaveBeenCalled();
  });

  it('reports a free handle after the debounce', async () => {
    jest.mocked(checkHandleAvailable).mockResolvedValue(true);
    const { result } = await renderHook(() => useHandleAvailability('nova'), { wrapper });
    expect(result.current).toBe('checking');
    await act(async () => {
      jest.advanceTimersByTime(HANDLE_DEBOUNCE_MS + 10);
    });
    await waitFor(() => expect(result.current).toBe('free'));
    expect(checkHandleAvailable).toHaveBeenCalledWith('nova');
  });

  it('reports a taken handle', async () => {
    jest.mocked(checkHandleAvailable).mockResolvedValue(false);
    const { result } = await renderHook(() => useHandleAvailability('nova'), { wrapper });
    await act(async () => {
      jest.advanceTimersByTime(HANDLE_DEBOUNCE_MS + 10);
    });
    await waitFor(() => expect(result.current).toBe('taken'));
  });

  it('reports an error when the check fails', async () => {
    jest.mocked(checkHandleAvailable).mockRejectedValue(new Error('handle_check_failed'));
    const { result } = await renderHook(() => useHandleAvailability('nova'), { wrapper });
    await act(async () => {
      jest.advanceTimersByTime(HANDLE_DEBOUNCE_MS + 10);
    });
    await waitFor(() => expect(result.current).toBe('error'));
  });
});

describe('useSaveProfile', () => {
  const input = {
    displayName: ' Nova ',
    handle: 'nova',
    avatarUri: 'file://a.jpg',
    currentAvatarPath: null,
  };

  it('uploads the avatar, then saves the trimmed profile', async () => {
    const deps = {
      uploadAvatar: jest.fn().mockResolvedValue('u1/avatar-1.jpg'),
      saveMyProfile: jest.fn().mockResolvedValue(undefined),
    };
    const { result } = await renderHook(() => useSaveProfile('u1', deps), { wrapper });
    let outcome: unknown;
    await act(async () => {
      outcome = await result.current.save(input);
    });
    expect(outcome).toEqual({ ok: true });
    expect(deps.saveMyProfile).toHaveBeenCalledWith('u1', {
      displayName: 'Nova',
      handle: 'nova',
      avatarPath: 'u1/avatar-1.jpg',
    });
  });

  it('still saves the profile when the optional avatar upload fails', async () => {
    const deps = {
      uploadAvatar: jest.fn().mockRejectedValue(new Error('avatar_upload_failed')),
      saveMyProfile: jest.fn().mockResolvedValue(undefined),
    };
    const { result } = await renderHook(() => useSaveProfile('u1', deps), { wrapper });
    let outcome: unknown;
    await act(async () => {
      outcome = await result.current.save(input);
    });
    expect(outcome).toEqual({ ok: true });
    expect(deps.saveMyProfile).toHaveBeenCalledWith(
      'u1',
      expect.objectContaining({ avatarPath: null }),
    );
  });

  it('reports a handle taken between the check and the save', async () => {
    const deps = {
      uploadAvatar: jest.fn(),
      saveMyProfile: jest.fn().mockRejectedValue(new Error('handle_taken')),
    };
    const { result } = await renderHook(() => useSaveProfile('u1', deps), { wrapper });
    let outcome: unknown;
    await act(async () => {
      outcome = await result.current.save({ ...input, avatarUri: null });
    });
    expect(outcome).toEqual({ ok: false, error: t('profileSetup.handleTaken') });
  });

  it('reports a generic error for other failures', async () => {
    const deps = {
      uploadAvatar: jest.fn(),
      saveMyProfile: jest.fn().mockRejectedValue(new Error('profile_save_failed')),
    };
    const { result } = await renderHook(() => useSaveProfile('u1', deps), { wrapper });
    let outcome: unknown;
    await act(async () => {
      outcome = await result.current.save({ ...input, avatarUri: null });
    });
    expect(outcome).toEqual({ ok: false, error: t('profileSetup.saveFailed') });
  });
});
