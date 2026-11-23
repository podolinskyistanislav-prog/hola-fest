import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import * as ReactNative from 'react-native';

import { brand } from '@/theme';

import { AppText } from './AppText';
import { CollapsibleSection } from './CollapsibleSection';
import { LoyaltyStampCard } from './LoyaltyStampCard';
import { PhotoGallery } from './PhotoGallery';
import { TaxiBar } from './TaxiBar';
import { VenueRow } from './VenueRow';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

const flat = (element: { props: { style?: unknown } }) =>
  StyleSheet.flatten(element.props.style as never) as Record<string, unknown>;

describe.each(['dark', 'light'] as const)('club kit in %s theme', (scheme) => {
  beforeEach(() => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(scheme);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('VenueRow shows name, address, event line and is pressable', async () => {
    const onPress = jest.fn();
    await render(
      <VenueRow
        name="Bavovna"
        address="вул. Хрещатик, 1"
        eventLine="Сьогодні: House Friday · 20:00"
        onPress={onPress}
      />,
    );
    expect(screen.getByText('Сьогодні: House Friday · 20:00')).toBeTruthy();
    await fireEvent.press(
      screen.getByRole('button', {
        name: 'Bavovna, вул. Хрещатик, 1, Сьогодні: House Friday · 20:00',
      }),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('PhotoGallery shows a placeholder tile for an empty slot', async () => {
    await render(
      <PhotoGallery
        slots={[
          { id: 'outside', label: 'Ззовні', uri: 'https://example.com/a.jpg' },
          { id: 'inside', label: 'Всередині' },
        ]}
      />,
    );
    expect(screen.getByText('Ззовні')).toBeTruthy();
    expect(screen.getByText('Всередині')).toBeTruthy();
    expect(screen.getAllByText('Фото скоро')).toHaveLength(1);
    expect(screen.getByLabelText('Всередині, Фото скоро')).toBeTruthy();
  });

  it('CollapsibleSection toggles content and announces expanded state', async () => {
    await render(
      <CollapsibleSection title="Правила" count={3}>
        <AppText>Вміст</AppText>
      </CollapsibleSection>,
    );
    const header = screen.getByRole('button', { name: 'Правила, 3' });
    expect(header.props.accessibilityState).toEqual({ expanded: false });
    expect(screen.queryByText('Вміст')).toBeNull();
    await fireEvent.press(header);
    expect(screen.getByText('Вміст')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Правила, 3' }).props.accessibilityState).toEqual({
      expanded: true,
    });
    await fireEvent.press(screen.getByRole('button', { name: 'Правила, 3' }));
    expect(screen.queryByText('Вміст')).toBeNull();
  });

  it('LoyaltyStampCard draws goal stamps, filled up to visits, with the badge', async () => {
    await render(<LoyaltyStampCard visits={2} goal={5} reward="коктейль у подарунок" />);
    expect(screen.getByText('Серія походів')).toBeTruthy();
    expect(screen.getByText('5 візитів — коктейль у подарунок')).toBeTruthy();
    expect(screen.getByText('Скоро')).toBeTruthy();
    expect(screen.getAllByTestId('stamp-filled')).toHaveLength(2);
    expect(screen.getAllByTestId('stamp-empty')).toHaveLength(3);
  });

  it('LoyaltyStampCard clamps visits to the goal', async () => {
    await render(<LoyaltyStampCard visits={9} goal={5} reward="коктейль" />);
    expect(screen.getAllByTestId('stamp-filled')).toHaveLength(5);
  });

  it('TaxiBar puts Bolt first and filled, others secondary', async () => {
    await render(
      <TaxiBar
        label="Поїхати"
        providers={[
          { id: 'uklon', label: 'Uklon' },
          { id: 'bolt', label: 'Bolt' },
          { id: 'uber', label: 'Uber' },
        ]}
      />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((button) => button.props.accessibilityLabel)).toEqual([
      'Bolt',
      'Uklon',
      'Uber',
    ]);
    expect(flat(buttons[0] as never).backgroundColor).toBe(brand.yellow);
    expect(flat(buttons[1] as never).backgroundColor).not.toBe(brand.yellow);
  });
});
