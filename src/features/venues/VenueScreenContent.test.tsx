import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { getVenueById } from '@/services/venues';
import type { VenueDetails } from '@/types/venues';

import { VenueScreenContent } from './VenueScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));
jest.mock('@/services/venues', () => ({
  getPublishedVenues: jest.fn(),
  getVenueById: jest.fn(),
}));

const venue: VenueDetails = {
  id: 'v1',
  slug: 'bavovna',
  name: 'Bavovna',
  address: 'вул. Хрещатик, 1',
  lat: null,
  lng: null,
  hasShelter: true,
  upcomingEvents: [
    {
      id: 'e1',
      title: 'Hola Night',
      startsAt: new Date(2026, 10, 5, 20, 0),
      endsAt: null,
      priceFromUah: 350,
      coverPath: null,
    },
  ],
};

const onBack = jest.fn();
const onOpenEvent = jest.fn();

async function renderScreen() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  await render(
    <QueryClientProvider client={client}>
      <VenueScreenContent venueId="v1" onBack={onBack} onOpenEvent={onOpenEvent} />
    </QueryClientProvider>,
  );
}

beforeEach(() => jest.resetAllMocks());

describe('VenueScreenContent', () => {
  it('shows a loading state while the venue is pending', async () => {
    jest.mocked(getVenueById).mockReturnValue(new Promise(() => undefined));
    await renderScreen();
    expect(screen.getByLabelText(t('venue.loading'))).toBeTruthy();
  });

  it('shows name, address, shelter badge and upcoming events', async () => {
    jest.mocked(getVenueById).mockResolvedValue(venue);
    await renderScreen();
    expect(await screen.findByRole('header', { name: 'Bavovna' })).toBeTruthy();
    expect(screen.getByText('вул. Хрещатик, 1')).toBeTruthy();
    expect(screen.getByText(t('venues.shelter'))).toBeTruthy();
    expect(screen.getByText('Hola Night')).toBeTruthy();
  });

  it('opens an event when its card is pressed', async () => {
    jest.mocked(getVenueById).mockResolvedValue(venue);
    await renderScreen();
    fireEvent.press(await screen.findByText('Hola Night'));
    expect(onOpenEvent).toHaveBeenCalledWith('e1');
  });

  it('hides the shelter badge and shows an empty message when there is nothing', async () => {
    jest
      .mocked(getVenueById)
      .mockResolvedValue({ ...venue, hasShelter: false, upcomingEvents: [] });
    await renderScreen();
    expect(await screen.findByText(t('venue.upcomingEmpty'))).toBeTruthy();
    expect(screen.queryByText(t('venues.shelter'))).toBeNull();
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
