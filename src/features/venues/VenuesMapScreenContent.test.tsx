import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { getPublishedVenues } from '@/services/venues';
import type { Venue } from '@/types/venues';

import { VenuesMapScreenContent } from './VenuesMapScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
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

const onOpenVenue = jest.fn();

async function renderScreen() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  await render(
    <QueryClientProvider client={client}>
      <VenuesMapScreenContent onOpenVenue={onOpenVenue} />
    </QueryClientProvider>,
  );
}

beforeEach(() => jest.resetAllMocks());

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

  it('shows the preview card on pin tap and opens the venue from the card', async () => {
    jest.mocked(getPublishedVenues).mockResolvedValue([venue]);
    await renderScreen();
    expect(screen.queryByText(t('venues.shelter'))).toBeNull();

    await fireEvent(await screen.findByLabelText('Bavovna'), 'touchEnd');
    expect(await screen.findByText(t('venues.shelter'))).toBeTruthy();

    await fireEvent.press(screen.getByLabelText('Bavovna, Є укриття'));
    expect(onOpenVenue).toHaveBeenCalledWith('v1');
  });
});
