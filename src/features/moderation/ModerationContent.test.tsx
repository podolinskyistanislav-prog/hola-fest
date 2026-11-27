import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { checkIsSuperadmin } from '@/services/applications';
import { t } from '@/lib/i18n';
import {
  listModerationQueue,
  setContentHidden,
  setUserBanned,
  setUserDj,
  type ModerationItem,
} from '@/services/moderation';

import { ModerationContent } from './ModerationContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('react-native-safe-area-context', () => {
  const { View } = jest.requireActual('react-native');
  return { SafeAreaView: View };
});
jest.mock('@/features/auth', () => ({
  useSession: () => ({ session: { user: { id: 'admin' } } }),
}));
jest.mock('@/services/applications', () => ({ checkIsSuperadmin: jest.fn() }));
jest.mock('@/services/moderation', () => ({
  listModerationQueue: jest.fn(),
  setContentHidden: jest.fn(),
  setUserBanned: jest.fn(),
  setUserDj: jest.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const item: ModerationItem = {
  kind: 'post',
  id: 'p1',
  body: 'Приходьте сьогодні',
  createdAt: '2026-11-26T10:00:00Z',
  hidden: true,
  hiddenReason: 'reports',
  reportCount: 3,
  reasons: ['spam', 'spam', 'event_promo'],
  author: { id: 'u1', name: 'Оля', handle: 'olya', isDj: false, isBanned: false },
};

beforeEach(() => {
  jest.resetAllMocks();
  jest.mocked(checkIsSuperadmin).mockResolvedValue(true);
  jest.mocked(listModerationQueue).mockResolvedValue([item]);
  jest.mocked(setContentHidden).mockResolvedValue();
  jest.mocked(setUserBanned).mockResolvedValue();
  jest.mocked(setUserDj).mockResolvedValue();
});

describe('ModerationContent', () => {
  it('shows reported content with its report counts and reasons', async () => {
    await render(<ModerationContent />, { wrapper });
    expect(await screen.findByText('Приходьте сьогодні')).toBeTruthy();
    expect(screen.getByText(/Скарг: 3/)).toBeTruthy();
    expect(screen.getByText(/спам ×2/)).toBeTruthy();
    expect(screen.getByText(t('moderation.hiddenByReports'))).toBeTruthy();
  });

  it('restores a hidden post', async () => {
    await render(<ModerationContent />, { wrapper });
    await fireEvent.press(await screen.findByLabelText(t('moderation.restore')));
    await waitFor(() => expect(setContentHidden).toHaveBeenCalledWith('post', 'p1', false));
  });

  it('bans the author and marks them as DJ', async () => {
    await render(<ModerationContent />, { wrapper });
    await fireEvent.press(await screen.findByLabelText(t('moderation.ban')));
    await waitFor(() => expect(setUserBanned).toHaveBeenCalledWith('u1', true));
    await fireEvent.press(screen.getByLabelText(t('moderation.markDj')));
    await waitFor(() => expect(setUserDj).toHaveBeenCalledWith('u1', true));
  });

  it('shows the empty state', async () => {
    jest.mocked(listModerationQueue).mockResolvedValue([]);
    await render(<ModerationContent />, { wrapper });
    expect(await screen.findByText(t('moderation.empty'))).toBeTruthy();
  });

  it('shows an error with retry when the queue fails', async () => {
    jest.mocked(listModerationQueue).mockRejectedValue(new Error('x'));
    await render(<ModerationContent />, { wrapper });
    expect(await screen.findByText(t('moderation.loadError'))).toBeTruthy();
  });

  it('does not load the queue for a non-admin', async () => {
    jest.mocked(checkIsSuperadmin).mockResolvedValue(false);
    await render(<ModerationContent />, { wrapper });
    expect(await screen.findByText(t('review.forbidden'))).toBeTruthy();
    expect(listModerationQueue).not.toHaveBeenCalled();
  });
});
