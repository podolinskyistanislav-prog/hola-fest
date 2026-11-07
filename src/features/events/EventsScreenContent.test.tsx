import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { getEventsForRange } from '@/services/events';
import type { EventSummary } from '@/types/events';

import { EventsScreenContent } from './EventsScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));
jest.mock('@/services/events', () => ({
  getEventsForRange: jest.fn(),
  getEventById: jest.fn(),
}));

const event: EventSummary = {
  id: 'e1',
  title: 'Hola Night',
  startsAt: new Date(),
  endsAt: null,
  priceFromUah: 350,
  coverPath: null,
  tags: ['techno'],
  offers: [{ id: 'o1', title: '−20% на вхід', terms: null, validUntil: null }],
  venue: {
    id: 'v1',
    slug: 'bavovna',
    name: 'Bavovna',
    address: null,
    lat: null,
    lng: null,
    hasShelter: false,
    instagramUrl: null,
  },
};

const onOpenEvent = jest.fn();
const onOpenMap = jest.fn();
const onTitleLongPress = jest.fn();

async function renderScreen() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  await render(
    <QueryClientProvider client={client}>
      <EventsScreenContent
        onOpenEvent={onOpenEvent}
        onOpenMap={onOpenMap}
        onTitleLongPress={onTitleLongPress}
      />
    </QueryClientProvider>,
  );
}

beforeEach(() => jest.resetAllMocks());

describe('EventsScreenContent', () => {
  it('shows a loading state while the events are pending', async () => {
    jest.mocked(getEventsForRange).mockReturnValue(new Promise(() => undefined));
    await renderScreen();
    expect(screen.getByLabelText(t('events.loading'))).toBeTruthy();
  });

  it('shows the events once loaded', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([event]);
    await renderScreen();
    expect((await screen.findAllByText('Hola Night')).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bavovna/).length).toBeGreaterThan(0);
  });

  it('opens the event when its card is tapped', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([event]);
    await renderScreen();
    const [card] = await screen.findAllByRole('button', { name: /Hola Night/ });
    await fireEvent.press(card as NonNullable<typeof card>);
    expect(onOpenEvent).toHaveBeenCalledWith('e1');
  });

  it('shows an error state and retries', async () => {
    jest.mocked(getEventsForRange).mockRejectedValueOnce(new Error('events_network'));
    await renderScreen();
    expect(await screen.findByText(t('events.errorTitle'))).toBeTruthy();
    jest.mocked(getEventsForRange).mockResolvedValue([event]);
    await fireEvent.press(screen.getByRole('button', { name: t('events.retry') }));
    expect(await screen.findAllByText('Hola Night')).not.toHaveLength(0);
  });

  it('shows "Сьогодні" with the Ukrainian event count, the offer badge and the week offer', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([event]);
    await renderScreen();
    expect(await screen.findByText('Сьогодні · 1 подія')).toBeTruthy();
    expect(screen.getAllByText('−20% на вхід').length).toBeGreaterThan(0);
    expect(screen.getByText(t('home.weekOffers'))).toBeTruthy();
  });

  it('shows the empty-today state', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    await renderScreen();
    expect(await screen.findByText(t('home.emptyTodayTitle'))).toBeTruthy();
  });

  it('fetches the week once and filters the list by chip', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([event]);
    await renderScreen();
    await screen.findAllByText('Hola Night');
    await fireEvent.press(screen.getByRole('button', { name: t('home.filter.house') }));
    expect(await screen.findByText(t('home.emptyFilteredTitle'))).toBeTruthy();
    expect(getEventsForRange).toHaveBeenCalledTimes(1);
  });

  it('shows another day as empty when it is selected in the strip', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([event]);
    await renderScreen();
    await screen.findAllByText('Hola Night');
    const days = screen.getAllByRole('button', { name: /^\S+, \d+ \S+$/, selected: false });
    await fireEvent.press(days[0] as (typeof days)[number]);
    expect(await screen.findByText(t('events.emptyDayTitle'))).toBeTruthy();
  });

  it('opens the map tab from the "На карті" link', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    await renderScreen();
    await fireEvent.press(await screen.findByRole('link', { name: t('home.onMap') }));
    expect(onOpenMap).toHaveBeenCalled();
  });

  it('opens the search placeholder sheet', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    await renderScreen();
    await fireEvent.press(screen.getByRole('button', { name: t('home.searchLabel') }));
    expect(await screen.findByText(t('home.searchSoonTitle'))).toBeTruthy();
  });

  it('keeps the staff entry reachable by long-pressing the title', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    await renderScreen();
    await fireEvent(screen.getByText(t('events.title')), 'longPress');
    expect(onTitleLongPress).toHaveBeenCalled();
  });
});
