import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { t } from '@/lib/i18n';
import { getDjBySlug, getUpcomingDjs } from '@/services/djs';
import type { Dj } from '@/types/djs';

import { DjScreenContent } from './DjScreenContent';
import { DjsScreenContent } from './DjsScreenContent';
import { filterDjsByName, genresLine, gigRowProps, nextGigLine } from './djFormat';
import { useDj, useDjs } from './useDjs';

jest.mock('@/services/djs', () => ({ getUpcomingDjs: jest.fn(), getDjBySlug: jest.fn() }));
jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@expo/vector-icons', () => ({ Feather: () => null }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));

const nova: Dj = {
  slug: 'dj-nova',
  name: 'DJ Nova',
  genres: ['techno', 'house'],
  gigs: [
    {
      eventId: 'e1',
      title: 'House Friday',
      startsAt: new Date('2026-11-27T20:00:00Z'),
      venueName: 'Котельня',
      offerTitle: '-20%',
    },
  ],
};
const alex: Dj = { ...nova, slug: 'alex', name: 'Alex', genres: [] };

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => jest.resetAllMocks());

describe('djFormat', () => {
  it('formats genres, the next gig line and gig rows', () => {
    expect(genresLine(['techno', 'house'])).toBe('Techno · House');
    expect(nextGigLine(nova)).toBe('Пт, 27 листопада · Котельня');
    expect(nextGigLine({ ...nova, gigs: [] })).toBeNull();
    expect(gigRowProps(nova.gigs[0]!)).toMatchObject({
      day: '27',
      month: 'лис',
      time: '22:00',
      offerText: '-20%',
    });
  });

  it('filters by name ignoring case', () => {
    expect(filterDjsByName([nova, alex], ' nov ').map((dj) => dj.slug)).toEqual(['dj-nova']);
    expect(filterDjsByName([nova, alex], '')).toHaveLength(2);
  });
});

describe('hooks', () => {
  it('useDjs returns the upcoming DJs', async () => {
    jest.mocked(getUpcomingDjs).mockResolvedValue([nova]);
    const { result } = await renderHook(() => useDjs(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([nova]);
  });

  it('useDj loads by slug and stays idle without one', async () => {
    jest.mocked(getDjBySlug).mockResolvedValue(nova);
    const { result } = await renderHook(() => useDj('dj-nova'), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getDjBySlug).toHaveBeenCalledWith('dj-nova');
    const idle = await renderHook(() => useDj(undefined), { wrapper });
    expect(idle.result.current.fetchStatus).toBe('idle');
  });
});

describe('DjsScreenContent', () => {
  const onOpenDj = jest.fn();
  const renderTab = () => render(<DjsScreenContent onOpenDj={onOpenDj} />, { wrapper });

  it('lists DJs, filters by search and opens one', async () => {
    jest.mocked(getUpcomingDjs).mockResolvedValue([nova, alex]);
    await renderTab();
    await fireEvent.press(await screen.findByRole('button', { name: /DJ Nova/ }));
    expect(onOpenDj).toHaveBeenCalledWith('dj-nova');
    await fireEvent.changeText(screen.getByLabelText(t('djs.searchLabel')), 'zzz');
    expect(screen.getByText(t('djs.noMatches'))).toBeTruthy();
  });

  it('shows the empty state', async () => {
    jest.mocked(getUpcomingDjs).mockResolvedValue([]);
    await renderTab();
    expect(await screen.findByText(t('djs.emptyTitle'))).toBeTruthy();
  });

  it('shows the error state', async () => {
    jest.mocked(getUpcomingDjs).mockRejectedValue(new Error('x'));
    await renderTab();
    expect(await screen.findByText(t('djs.errorTitle'))).toBeTruthy();
  });
});

describe('DjScreenContent', () => {
  const onBack = jest.fn();
  const onOpenEvent = jest.fn();
  const renderPage = () =>
    render(<DjScreenContent slug="dj-nova" onBack={onBack} onOpenEvent={onOpenEvent} />, {
      wrapper,
    });

  it('shows the name, genres, bio placeholder and gigs that open the event', async () => {
    jest.mocked(getDjBySlug).mockResolvedValue(nova);
    await renderPage();
    expect(await screen.findByText('DJ Nova')).toBeTruthy();
    expect(screen.getByText(t('dj.bioPlaceholder'))).toBeTruthy();
    expect(screen.getByText(t('dj.gigs'))).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: /House Friday/ }));
    expect(onOpenEvent).toHaveBeenCalledWith('e1');
  });

  it('shows not found', async () => {
    jest.mocked(getDjBySlug).mockResolvedValue(null);
    await renderPage();
    expect(await screen.findByText(t('dj.notFoundTitle'))).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: t('dj.back') }));
    expect(onBack).toHaveBeenCalled();
  });
});
