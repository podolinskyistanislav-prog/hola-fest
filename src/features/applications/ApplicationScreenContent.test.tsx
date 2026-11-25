import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { t } from '@/lib/i18n';
import { listMyApplications, type AccountApplication } from '@/services/applications';

import { ApplicationScreenContent, currentApplication } from './ApplicationScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('@/features/auth', () => ({
  useSession: () => ({ session: { user: { id: 'u1' } } }),
}));
jest.mock('@/features/map', () => ({ VenueMap: () => null }));
jest.mock('@/lib/pickAvatar', () => ({ pickAvatar: jest.fn() }));
jest.mock('@/services/applications', () => ({
  listMyApplications: jest.fn(),
  submitApplication: jest.fn(),
  uploadApplicationPhoto: jest.fn(),
  venuePayload: jest.fn(),
  djPayload: jest.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

function application(change: Partial<AccountApplication>): AccountApplication {
  return {
    id: 'a1',
    kind: 'venue',
    status: 'pending',
    rejectReason: null,
    createdAt: '2026-11-25T10:00:00Z',
    title: 'Bavovna',
    applicantName: null,
    contact: null,
    ...change,
  };
}

beforeEach(() => jest.mocked(listMyApplications).mockReset());

describe('currentApplication', () => {
  it('prefers a pending application over a newer decision', () => {
    const pending = application({ id: 'p', status: 'pending' });
    const rejected = application({ id: 'r', status: 'rejected' });
    expect(currentApplication([rejected, pending])).toBe(pending);
    expect(currentApplication([rejected])).toBe(rejected);
    expect(currentApplication([])).toBeNull();
  });
});

describe('ApplicationScreenContent', () => {
  it('offers the two account types first', async () => {
    jest.mocked(listMyApplications).mockResolvedValue([]);
    await render(<ApplicationScreenContent onDone={jest.fn()} />, { wrapper });
    expect(await screen.findByLabelText(/Я заклад/)).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(/Я діджей/));
    expect(await screen.findByText(t('apply.djTitle'))).toBeTruthy();
  });

  it('shows the pending screen', async () => {
    jest.mocked(listMyApplications).mockResolvedValue([application({ status: 'pending' })]);
    await render(<ApplicationScreenContent onDone={jest.fn()} />, { wrapper });
    expect(await screen.findByText(t('apply.pending'))).toBeTruthy();
  });

  it('shows the reason of a rejection and lets the user apply again', async () => {
    jest
      .mocked(listMyApplications)
      .mockResolvedValue([application({ status: 'rejected', rejectReason: 'Немає адреси' })]);
    await render(<ApplicationScreenContent onDone={jest.fn()} />, { wrapper });
    expect(await screen.findByText('Причина: Немає адреси')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(t('apply.again')));
    expect(await screen.findByLabelText(/Я заклад/)).toBeTruthy();
  });

  it('shows an error with retry when applications fail to load', async () => {
    jest.mocked(listMyApplications).mockRejectedValue(new Error('x'));
    await render(<ApplicationScreenContent onDone={jest.fn()} />, { wrapper });
    expect(await screen.findByText(t('apply.loadError'))).toBeTruthy();
  });
});
