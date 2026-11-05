import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import MapScreen from '@/app/(tabs)/map';
import EventsScreen from '@/app/(tabs)/index';
import TabsLayout from '@/app/(tabs)/_layout';
import { t } from '@/lib/i18n';

const mockPush = jest.fn();
const mockNavigate = jest.fn();

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('@/services/events', () => ({
  getEventsForDay: jest.fn().mockResolvedValue([]),
  getEventsForRange: jest.fn(),
  getEventById: jest.fn(),
}));
jest.mock('react-native-maps', () => ({
  __esModule: true,
  default: () => null,
  Marker: () => null,
}));
jest.mock('@/services/venues', () => ({
  getPublishedVenues: jest.fn().mockResolvedValue([]),
}));
jest.mock('expo-router/js-tabs', () => {
  const Tabs = ({ tabBar }: { tabBar: (props: unknown) => React.ReactNode }): React.ReactNode =>
    tabBar({
      state: {
        index: 1,
        routes: [
          { name: 'index', key: 'index-key' },
          { name: 'map', key: 'map-key' },
        ],
      },
      insets: { top: 0, bottom: 0, left: 0, right: 0 },
      navigateToTab: mockNavigate,
    });
  Tabs.Screen = function Screen() {
    return null;
  };
  return { Tabs };
});

describe('tab navigation shell', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows Події and Карта tabs with the current route selected', async () => {
    await render(<TabsLayout />);
    expect(screen.getByRole('tab', { name: t('tabs.events') })).not.toBeSelected();
    expect(screen.getByRole('tab', { name: t('tabs.map') })).toBeSelected();
  });

  it('navigates to the tapped route', async () => {
    await render(<TabsLayout />);
    await fireEvent.press(screen.getByRole('tab', { name: t('tabs.events') }));
    expect(mockNavigate).toHaveBeenCalledWith('index-key');
  });

  it('shows an empty state on the map tab when there are no venues', async () => {
    await render(
      <QueryClientProvider client={new QueryClient()}>
        <MapScreen />
      </QueryClientProvider>,
    );
    expect(await screen.findByText(t('map.emptyTitle'))).toBeTruthy();
  });

  it('keeps the staff-login route reachable by long-pressing the events title', async () => {
    await render(
      <QueryClientProvider client={new QueryClient()}>
        <EventsScreen />
      </QueryClientProvider>,
    );
    await fireEvent(screen.getByText(t('events.title')), 'longPress');
    expect(mockPush).toHaveBeenCalledWith('/staff-login');
  });
});
