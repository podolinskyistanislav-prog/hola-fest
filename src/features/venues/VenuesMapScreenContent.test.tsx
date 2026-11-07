import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { getEventsForRange } from '@/services/events';
import { getPublishedVenues } from '@/services/venues';
import type { EventSummary } from '@/types/events';
import type { Venue } from '@/types/venues';

import { VenuesMapScreenContent } from './VenuesMapScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@expo/vector-icons', () => ({ Feather: () => null }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));
jest.mock('react-native-maps', () => {
  const { View } = jest.requireActual('react-native');
  const MapView = ({ children, onPress }: { children: React.ReactNode; onPress: () => void }) => (
    <View testID="map" onTouchEnd={onPress}>
      {children}
    </View>
  );
  const Marker = ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress: (event: { stopPropagation: () => void }) => void;
  }) => <View onTouchEnd={() => onPress({ stopPropagation: () => undefined })}>{children}</View>;
  return { __esModule: true, default: MapView, Marker };
});
jest.mock('@/services/events', () => ({
  getEventsForRange: jest.fn(),
  getEventById: jest.fn(),
}));
jest.mock('@/services/venues', () => ({
  getPublishedVenues: jest.fn(),
  getVenueById: jest.fn(),
}));

const venue: Venue = {
  id: 'v1',
  slug: 'bavovna',
  name: 'Bavovna',
  address: null,
  lat: 50.45,
  lng: 30.52,
  hasShelter: true,
};

const panorama: Venue = {
  ...venue,
  id: 'v2',
  slug: 'panorama-bar',
  name: 'Panorama Bar',
  address: 'вул. Хрещатик, 1',
};

const tonight: EventSummary = {
  id: 'e1',
  title: 'Rooftop Sunset',
  startsAt: new Date('2026-11-06T17:00:00Z'),
  endsAt: null,
  priceFromUah: null,
  coverPath: null,
  offers: [],
  venue: { ...panorama, instagramUrl: null },
};

const onOpenVenue = jest.fn();
const onOpenEvent = jest.fn();

async function renderScreen() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  await render(
    <QueryClientProvider client={client}>
      <VenuesMapScreenContent onOpenVenue={onOpenVenue} onOpenEvent={onOpenEvent} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  jest.resetAllMocks();
  jest.mocked(getEventsForRange).mockResolvedValue([]);
});

describe('VenuesMapScreenContent', () => {
  it('shows a loading state while venues are pending', async () => {
    jest.mocked(getPublishedVenues).mockReturnValue(new Promise(() => undefined));
    await renderScreen();
    expect(screen.getByLabelText(t('map.loading'))).toBeTruthy();
  });

  it('shows an empty state when no venue has coordinates', async () => {
    jest.mocked(getPublishedVenues).mockResolvedValue([{ ...venue, lat: null, lng: null }]);
    await renderScreen();
    expect(await screen.findByText(t('map.emptyTitle'))).toBeTruthy();
  });

  it('shows an error state with a retry that refetches', async () => {
    jest.mocked(getPublishedVenues).mockRejectedValueOnce(new Error('boom'));
    jest.mocked(getPublishedVenues).mockResolvedValue([venue]);
    await renderScreen();
    await fireEvent.press(await screen.findByRole('button', { name: t('map.retry') }));
    expect(await screen.findByLabelText('Bavovna')).toBeTruthy();
    expect(getPublishedVenues).toHaveBeenCalledTimes(2);
  });

  it('selects the first venue with an event tonight and opens that event', async () => {
    jest.mocked(getPublishedVenues).mockResolvedValue([venue, panorama]);
    jest.mocked(getEventsForRange).mockResolvedValue([tonight]);
    await renderScreen();

    expect(await screen.findByText('Сьогодні: Rooftop Sunset · 19:00')).toBeTruthy();
    expect(screen.getByText('вул. Хрещатик, 1')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: t('map.openEvent') }));
    expect(onOpenEvent).toHaveBeenCalledWith('e1');
  });

  it('shows the card of a tapped pin; without an event "Подія" opens the venue', async () => {
    jest.mocked(getPublishedVenues).mockResolvedValue([venue]);
    await renderScreen();
    expect(screen.queryByText(t('map.noEventsToday'))).toBeNull();

    await fireEvent(await screen.findByLabelText('Bavovna'), 'touchEnd');
    expect(await screen.findByText(t('map.noEventsToday'))).toBeTruthy();
    expect(screen.getByText(t('map.noAddress'))).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: t('map.openEvent') }));
    expect(onOpenVenue).toHaveBeenCalledWith('v1');
  });

  it('filters venues by name with the search field', async () => {
    jest.mocked(getPublishedVenues).mockResolvedValue([venue, panorama]);
    await renderScreen();
    await screen.findByLabelText('Panorama Bar');

    await fireEvent.changeText(screen.getByLabelText(t('map.searchLabel')), 'pano');
    expect(screen.queryByLabelText('Bavovna')).toBeNull();
    expect(screen.getByLabelText('Panorama Bar')).toBeTruthy();

    await fireEvent.changeText(screen.getByLabelText(t('map.searchLabel')), 'zzz');
    expect(screen.getByText(t('map.noMatches'))).toBeTruthy();
  });
});
