import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { t } from '@/lib/i18n';
import {
  approveApplication,
  checkIsSuperadmin,
  listPendingApplications,
  rejectApplication,
} from '@/services/applications';

import { ApplicationsReviewContent } from './ApplicationsReviewContent';

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
jest.mock('@/services/applications', () => ({
  checkIsSuperadmin: jest.fn(),
  listPendingApplications: jest.fn(),
  approveApplication: jest.fn(),
  rejectApplication: jest.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const pending = {
  id: 'a1',
  kind: 'venue' as const,
  status: 'pending' as const,
  rejectReason: null,
  createdAt: '2026-11-25T10:00:00Z',
  title: 'Bavovna',
  applicantName: 'Оля',
  contact: '@bavovna',
};

beforeEach(() => {
  jest.resetAllMocks();
  jest.mocked(checkIsSuperadmin).mockResolvedValue(true);
  jest.mocked(listPendingApplications).mockResolvedValue([pending]);
  jest.mocked(approveApplication).mockResolvedValue();
  jest.mocked(rejectApplication).mockResolvedValue();
});

describe('ApplicationsReviewContent', () => {
  it('approves an application', async () => {
    await render(<ApplicationsReviewContent />, { wrapper });
    await fireEvent.press(await screen.findByLabelText(t('review.approve')));
    await waitFor(() => expect(approveApplication).toHaveBeenCalledWith('a1'));
  });

  it('rejects only with a reason', async () => {
    await render(<ApplicationsReviewContent />, { wrapper });
    await fireEvent.press(await screen.findByLabelText(t('review.reject')));
    await fireEvent.changeText(screen.getByLabelText(t('review.reason')), 'Невірна адреса');
    await fireEvent.press(screen.getByLabelText(t('review.confirmReject')));
    await waitFor(() => expect(rejectApplication).toHaveBeenCalledWith('a1', 'Невірна адреса'));
  });

  it('shows the empty state', async () => {
    jest.mocked(listPendingApplications).mockResolvedValue([]);
    await render(<ApplicationsReviewContent />, { wrapper });
    expect(await screen.findByText(t('review.empty'))).toBeTruthy();
  });

  it('does not load the queue for a non-admin', async () => {
    jest.mocked(checkIsSuperadmin).mockResolvedValue(false);
    await render(<ApplicationsReviewContent />, { wrapper });
    expect(await screen.findByText(t('review.forbidden'))).toBeTruthy();
    expect(listPendingApplications).not.toHaveBeenCalled();
  });
});
