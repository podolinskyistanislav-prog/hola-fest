import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { openTaxiLink } from '@/lib/taxi';

import { TaxiBar } from './TaxiBar';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@/lib/taxi', () => ({
  ...jest.requireActual('@/lib/taxi'),
  openTaxiLink: jest.fn(),
}));

const openMock = jest.mocked(openTaxiLink);
const destination = { name: 'Bavovna', address: 'вул. Хрещатик, 1', lat: 50.45, lng: 30.52 };

beforeEach(() => openMock.mockReset());

describe('TaxiBar', () => {
  it('shows Uklon, Bolt, Uber in that order', async () => {
    await render(<TaxiBar destination={destination} />);
    const labels = screen.getAllByRole('button').map((b) => b.props.accessibilityLabel);
    expect(labels).toEqual(['Uklon', 'Bolt', 'Uber']);
  });

  it('opens the tapped provider', async () => {
    openMock.mockResolvedValue();
    await render(<TaxiBar destination={destination} />);
    await fireEvent.press(screen.getByLabelText('Bolt'));
    expect(openMock).toHaveBeenCalledWith(expect.objectContaining({ provider: 'bolt' }));
    expect(screen.queryByText(t('taxi.openFailed'))).toBeNull();
  });

  it('shows a friendly message when nothing can be opened', async () => {
    openMock.mockRejectedValue(new Error('no'));
    await render(<TaxiBar destination={destination} />);
    await fireEvent.press(screen.getByLabelText('Uber'));
    expect(await screen.findByText(t('taxi.openFailed'))).toBeTruthy();
  });

  it('renders nothing without valid coordinates', async () => {
    await render(<TaxiBar destination={{ ...destination, lat: null, lng: null }} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
