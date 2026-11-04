import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from './Button';
import { Chip } from './Chip';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

describe('Button', () => {
  it('renders an accessible button and calls onPress', async () => {
    const onPress = jest.fn();
    await render(<Button label="Взяти офер" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Взяти офер' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(<Button label="Взяти офер" onPress={onPress} disabled />);
    await fireEvent.press(screen.getByRole('button', { name: 'Взяти офер' }));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders the glass variant', async () => {
    await render(<Button label="Uklon" variant="glass" />);
    expect(screen.getByText('Uklon')).toBeTruthy();
  });
});

describe('Chip', () => {
  it('exposes its selected state to screen readers', async () => {
    await render(<Chip label="Techno" selected />);
    expect(screen.getByRole('button', { name: 'Techno' })).toHaveProp(
      'accessibilityState',
      expect.objectContaining({ selected: true }),
    );
  });
});
