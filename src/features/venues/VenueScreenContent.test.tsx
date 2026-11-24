import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { getEventsForRange } from '@/services/events';
import { getPublishedVenues, getVenueById } from '@/services/venues';
import type { EventSummary } from '@/types/events';
import type { VenueDetails } from '@/types/venues';

import { VenueScreenContent } from './VenueScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@expo/vector-icons', () => ({ Feather: () => null }));
jest.mock('expo-linking', () => ({ createURL: (path: string) => `holafest://${path}` }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));
jest.mock('@/services/venues', () => ({
  getPublishedVenues: jest.fn(),
  getVenueById: jest.fn(),
}));
jest.mock('@/services/events', () => ({ getEventsForRange: jest.fn() }));
jest.mock('@/features/map', () => {
  const { Text } = jest.requireActual('react-native');
  return {
    VenueMap: ({ selectedId, compact }: { selectedId: string | null; compact?: boolean }) => (
      <Text>{`map:${selectedId}:${compact === true}`}</Text>
    ),
  };
});

const venue: VenueDetails = {
  id: 'v1',
  slug: 'bavovna',
  name: 'Bavovna',
  address: 'вул. Хрещатик, 1',
  lat: 50.45,
  lng: 30.52,
  hasShelter: true,
  instagramUrl: null,
  coverPath: null,
  upcomingEvents: [],
};

const weekEvent: EventSummary = {
  id: 'e1',
  title: 'Hola Night',
  startsAt: new Date(Date.now() + 2 * 86_400_000),
  endsAt: null,
  priceFromUah: 350,
  coverPath: null,
  venue: {
    id: 'v1',
    slug: 'bavovna',
    name: 'Bavovna',
    address: null,
    lat: null,
    lng: null,
    hasShelter: true,
    instagramUrl: null,
  },
  offers: [{ id: 'o1', title: 'Шот у подарунок', terms: null, validUntil: null }],
};

const onBack = jest.fn();
const onOpenEvent = jest.fn();
const onOpenMap = jest.fn();

async function renderScreen() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  await render(
    <QueryClientProvider client={client}>
      <VenueScreenContent
        venueId="v1"
        onBack={onBack}
        onOpenEvent={onOpenEvent}
        onOpenMap={onOpenMap}
      />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  jest.resetAllMocks();
  jest.mocked(getEventsForRange).mockResolvedValue([weekEvent]);
  jest.mocked(getPublishedVenues).mockResolvedValue([venue]);
});

describe('VenueScreenContent', () => {
  it('shows a loading state while the venue is pending', async () => {
    jest.mocked(getVenueById).mockReturnValue(new Promise(() => undefined));
    await renderScreen();
    expect(screen.getByLabelText(t('venue.loading'))).toBeTruthy();
  });

  it('shows name, address, shelter chip, photo placeholders and the loyalty placeholder', async () => {
    jest.mocked(getVenueById).mockResolvedValue(venue);
    await renderScreen();
    expect(await screen.findByRole('header', { name: 'Bavovna' })).toBeTruthy();
    expect(screen.getByText('вул. Хрещатик, 1')).toBeTruthy();
    expect(screen.getByLabelText(t('venues.shelter'))).toBeTruthy();
    expect(screen.getByText(t('venue.photosOutside'))).toBeTruthy();
    expect(screen.getByText(t('venue.photosInside'))).toBeTruthy();
    expect(screen.getByText(t('venue.loyaltySoon'))).toBeTruthy();
    expect(screen.queryByLabelText(t('venue.instagram'))).toBeNull();
  });

  it('lists this week events with their offer and opens one', async () => {
    jest.mocked(getVenueById).mockResolvedValue(venue);
    await renderScreen();
    expect(await screen.findByText('Hola Night')).toBeTruthy();
    expect(screen.getByText('Шот у подарунок')).toBeTruthy();
    fireEvent.press(screen.getByText('Hola Night'));
    expect(onOpenEvent).toHaveBeenCalledWith('e1');
  });

  it('shows an empty week message', async () => {
    jest.mocked(getVenueById).mockResolvedValue(venue);
    jest.mocked(getEventsForRange).mockResolvedValue([]);
    await renderScreen();
    expect(await screen.findByText(t('venue.weekEmpty'))).toBeTruthy();
  });

  it('keeps the map collapsed, then shows it centred on the club and opens the Map tab', async () => {
    jest.mocked(getVenueById).mockResolvedValue(venue);
    await renderScreen();
    await screen.findByText('Hola Night');
    expect(screen.queryByText('map:v1:true')).toBeNull();
    fireEvent.press(screen.getByLabelText(t('venue.where')));
    expect(await screen.findByText('map:v1:true')).toBeTruthy();
    fireEvent.press(screen.getByLabelText(t('venue.openOnMap')));
    expect(onOpenMap).toHaveBeenCalledWith('v1');
  });

  it('goes back from the glass back button', async () => {
    jest.mocked(getVenueById).mockResolvedValue(venue);
    await renderScreen();
    fireEvent.press(await screen.findByLabelText(t('venue.back')));
    expect(onBack).toHaveBeenCalled();
  });

  it('shows an Instagram link when the club has one', async () => {
    jest
      .mocked(getVenueById)
      .mockResolvedValue({ ...venue, instagramUrl: 'https://instagram.com/bavovna' });
    await renderScreen();
    expect(await screen.findByLabelText(t('venue.instagram'))).toBeTruthy();
  });

  it('shows a not-found state when the venue is not visible', async () => {
    jest.mocked(getVenueById).mockResolvedValue(null);
    await renderScreen();
    expect(await screen.findByText(t('venue.notFoundTitle'))).toBeTruthy();
  });

  it('shows an error with retry when loading fails', async () => {
    jest.mocked(getVenueById).mockRejectedValue(new Error('boom'));
    await renderScreen();
    expect(await screen.findByText(t('venue.errorTitle'))).toBeTruthy();
    jest.mocked(getVenueById).mockResolvedValue(venue);
    fireEvent.press(screen.getByLabelText(t('venue.retry')));
    expect(await screen.findByText('Hola Night')).toBeTruthy();
  });
});
