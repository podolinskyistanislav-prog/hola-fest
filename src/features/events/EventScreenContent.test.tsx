import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { getEventById } from '@/services/events';
import type { EventDetails } from '@/types/events';

import { EventScreenContent } from './EventScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));
jest.mock('@/services/events', () => ({
  getEventsForDay: jest.fn(),
  getEventsForRange: jest.fn(),
  getEventById: jest.fn(),
}));

const event: EventDetails = {
  id: 'e1',
  title: 'Hola Night',
  startsAt: new Date(2026, 10, 4, 20, 0),
  endsAt: null,
  priceFromUah: 350,
  coverPath: null,
  description: 'Велика вечірка',
  lineup: ['DJ Alpha', 'DJ Beta'],
  offers: [{ id: 'o1', title: '−20% на напої', terms: 'До півночі', validUntil: null }],
  venue: {
    id: 'v1',
    slug: 'bavovna',
    name: 'Bavovna',
    address: 'вул. Хрещатик, 1',
    lat: null,
    lng: null,
    hasShelter: false,
    instagramUrl: null,
  },
};

const onBack = jest.fn();
const onOpenVenue = jest.fn();

async function renderScreen() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  await render(
    <QueryClientProvider client={client}>
      <EventScreenContent eventId="e1" onBack={onBack} onOpenVenue={onOpenVenue} />
    </QueryClientProvider>,
  );
}

beforeEach(() => jest.resetAllMocks());

describe('EventScreenContent', () => {
  it('shows a loading state while the event is pending', async () => {
    jest.mocked(getEventById).mockReturnValue(new Promise(() => undefined));
    await renderScreen();
    expect(screen.getByLabelText(t('event.loading'))).toBeTruthy();
  });

  it('shows venue, time, price, lineup and offers once loaded', async () => {
    jest.mocked(getEventById).mockResolvedValue(event);
    await renderScreen();
    expect(await screen.findByText('Hola Night')).toBeTruthy();
    expect(screen.getByText('Bavovna')).toBeTruthy();
    expect(screen.getByText('вул. Хрещатик, 1')).toBeTruthy();
    expect(screen.getByText('20:00')).toBeTruthy();
    expect(screen.getByText('від 350 ₴')).toBeTruthy();
    expect(screen.getByText('DJ Alpha')).toBeTruthy();
    expect(screen.getByText('−20% на напої')).toBeTruthy();
  });

  it('shows an empty offers message when there are no offers', async () => {
    jest.mocked(getEventById).mockResolvedValue({ ...event, offers: [] });
    await renderScreen();
    expect(await screen.findByText(t('event.offersEmpty'))).toBeTruthy();
  });

  it('marks an offer past its end time as expired', async () => {
    const expired = {
      id: 'o2',
      title: 'Старий офер',
      terms: null,
      validUntil: new Date(2000, 0, 1),
    };
    jest.mocked(getEventById).mockResolvedValue({ ...event, offers: [expired] });
    await renderScreen();
    expect(await screen.findByText('Офер завершився')).toBeTruthy();
  });

  it('shows an error state and retries', async () => {
    jest.mocked(getEventById).mockRejectedValueOnce(new Error('events_network'));
    await renderScreen();
    expect(await screen.findByText(t('event.errorTitle'))).toBeTruthy();
    jest.mocked(getEventById).mockResolvedValue(event);
    await fireEvent.press(screen.getByRole('button', { name: t('events.retry') }));
    expect(await screen.findByText('Hola Night')).toBeTruthy();
  });

  it('shows a not-found state when the event is not visible', async () => {
    jest.mocked(getEventById).mockResolvedValue(null);
    await renderScreen();
    expect(await screen.findByText(t('event.notFoundTitle'))).toBeTruthy();
  });

  it('goes back and opens the venue stub', async () => {
    jest.mocked(getEventById).mockResolvedValue(event);
    await renderScreen();
    await fireEvent.press(await screen.findByRole('button', { name: t('event.venueLink') }));
    expect(onOpenVenue).toHaveBeenCalledWith('v1');
    await fireEvent.press(screen.getByRole('button', { name: t('event.back') }));
    expect(onBack).toHaveBeenCalled();
  });
});
