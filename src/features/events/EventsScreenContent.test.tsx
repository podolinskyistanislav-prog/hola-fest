import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

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
  startsAt: new Date('2026-11-04T18:00:00Z'),
  endsAt: null,
  priceFromUah: 350,
  coverPath: null,
  offers: [],
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
const onTitleLongPress = jest.fn();

async function renderScreen() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  await render(
    <QueryClientProvider client={client}>
      <EventsScreenContent onOpenEvent={onOpenEvent} onTitleLongPress={onTitleLongPress} />
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
    expect(await screen.findByText('Hola Night')).toBeTruthy();
    expect(screen.getByText('Bavovna')).toBeTruthy();
  });

  it('opens the event when its card is tapped', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([event]);
    await renderScreen();
    await fireEvent.press(await screen.findByRole('button', { name: /Hola Night/ }));
    expect(onOpenEvent).toHaveBeenCalledWith('e1');
  });

  it('shows an empty state when the day has no events', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    await renderScreen();
    expect(await screen.findByText(t('events.emptyDayTitle'))).toBeTruthy();
  });

  it('shows an error state and retries', async () => {
    jest.mocked(getEventsForRange).mockRejectedValueOnce(new Error('events_network'));
    await renderScreen();
    expect(await screen.findByText(t('events.errorTitle'))).toBeTruthy();
    jest.mocked(getEventsForRange).mockResolvedValue([event]);
    await fireEvent.press(screen.getByRole('button', { name: t('events.retry') }));
    expect(await screen.findByText('Hola Night')).toBeTruthy();
  });

  it('loads another day when it is selected in the strip', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    await renderScreen();
    await screen.findByText(t('events.emptyDayTitle'));
    const days = screen.getAllByRole('button', { selected: false });
    await fireEvent.press(days[0] as (typeof days)[number]);
    await waitFor(() => expect(getEventsForRange).toHaveBeenCalledTimes(2));
  });

  it('keeps the staff entry reachable by long-pressing the title', async () => {
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    await renderScreen();
    await fireEvent(screen.getByText(t('events.title')), 'longPress');
    expect(onTitleLongPress).toHaveBeenCalled();
  });
});
