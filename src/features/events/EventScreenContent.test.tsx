import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Share } from 'react-native';

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
jest.mock('@expo/vector-icons', () => {
  const { Text } = jest.requireActual('react-native');
  return { Feather: Text };
});
jest.mock('expo-linking', () => ({ createURL: (path: string) => `holafest://${path}` }));
jest.mock('@/services/claims', () => ({ claimOffer: jest.fn() }));
jest.mock('@/services/events', () => ({
  getEventsForRange: jest.fn(),
  getEventById: jest.fn(),
}));

const event: EventDetails = {
  id: 'e1',
  title: 'Hola Night',
  startsAt: new Date('2026-11-04T18:00:00Z'),
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
      <EventScreenContent
        eventId="e1"
        onBack={onBack}
        onOpenVenue={onOpenVenue}
        onClaimed={jest.fn()}
      />
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

  it('shows title, venue line, info chips, lineup and the offer once loaded', async () => {
    jest.mocked(getEventById).mockResolvedValue(event);
    await renderScreen();
    expect(await screen.findByText('Hola Night')).toBeTruthy();
    expect(screen.getByText('Bavovna · вул. Хрещатик, 1')).toBeTruthy();
    expect(screen.getByText(/, 20:00$/)).toBeTruthy();
    expect(screen.getByText('від 350 ₴')).toBeTruthy();
    expect(screen.getByText(t('event.curfewUnknown'))).toBeTruthy();
    expect(screen.getByText(t('event.shelterUnknown'))).toBeTruthy();
    expect(screen.getByText('DJ Alpha')).toBeTruthy();
    expect(screen.getByText('−20% на напої')).toBeTruthy();
    expect(screen.getByText('До півночі')).toBeTruthy();
    expect(screen.getByRole('button', { name: t('event.offerCta') })).toBeTruthy();
  });

  it('shows placeholders for missing price, lineup and shelter', async () => {
    jest.mocked(getEventById).mockResolvedValue({ ...event, priceFromUah: null, lineup: [] });
    await renderScreen();
    expect(await screen.findByText(t('event.priceUnknown'))).toBeTruthy();
    expect(screen.getByText(t('event.artistPlaceholder1'))).toBeTruthy();
    expect(screen.getByText(t('event.artistPlaceholder2'))).toBeTruthy();
    expect(screen.getByText(t('event.shelterUnknown'))).toBeTruthy();
  });

  it('shows the curfew check and the shelter when the data says so', async () => {
    jest.mocked(getEventById).mockResolvedValue({
      ...event,
      endsAt: new Date('2026-11-04T21:30:00Z'),
      venue: { ...event.venue, hasShelter: true },
    });
    await renderScreen();
    expect(await screen.findByText(t('event.curfewOk'))).toBeTruthy();
    expect(screen.getByText(t('event.shelterYes'))).toBeTruthy();
  });

  it('shows the QR deadline when an offer has no terms', async () => {
    const offer = {
      id: 'o3',
      title: '−20% на вхід',
      terms: null,
      validUntil: new Date('2099-11-04T20:00:00Z'),
    };
    jest.mocked(getEventById).mockResolvedValue({ ...event, offers: [offer] });
    await renderScreen();
    expect(await screen.findByText('Покажи QR на вході до 22:00')).toBeTruthy();
  });

  it('hides the offer card only when the event has no offers', async () => {
    jest.mocked(getEventById).mockResolvedValue({ ...event, offers: [] });
    await renderScreen();
    expect(await screen.findByText('Hola Night')).toBeTruthy();
    expect(screen.queryByText(t('event.offerKicker'))).toBeNull();
  });

  it('marks an offer past its end time as expired and not claimable', async () => {
    const expired = {
      id: 'o2',
      title: 'Старий офер',
      terms: null,
      validUntil: new Date(2000, 0, 1),
    };
    jest.mocked(getEventById).mockResolvedValue({ ...event, offers: [expired] });
    await renderScreen();
    const cta = await screen.findByRole('button', { name: t('event.offerExpired') });
    expect(cta.props.accessibilityState).toMatchObject({ disabled: true });
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

  it('goes back, shares and opens the venue', async () => {
    const share = jest
      .spyOn(Share, 'share')
      .mockResolvedValue({ action: 'dismissedAction', activityType: undefined });
    jest.mocked(getEventById).mockResolvedValue(event);
    await renderScreen();
    await fireEvent.press(await screen.findByRole('link', { name: 'Bavovna · вул. Хрещатик, 1' }));
    expect(onOpenVenue).toHaveBeenCalledWith('v1');
    await fireEvent.press(screen.getByRole('button', { name: t('event.back') }));
    expect(onBack).toHaveBeenCalled();
    await fireEvent.press(screen.getByRole('button', { name: t('event.share') }));
    expect(share).toHaveBeenCalledTimes(1);
  });

  it('shows the taxi bar with the three providers', async () => {
    jest.mocked(getEventById).mockResolvedValue(event);
    await renderScreen();
    expect(await screen.findByText(t('event.taxiLabel'))).toBeTruthy();
    for (const name of ['Uklon', 'Bolt', 'Uber']) {
      expect(screen.getByRole('button', { name })).toBeTruthy();
    }
  });
});
