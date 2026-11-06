import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { scanResult } from '@/theme';

import { ScanResult, type ScanFailureReason } from './ScanResult';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

describe('ScanResult', () => {
  it('shows a green success verdict and announces it', async () => {
    await render(<ScanResult status="success" onNext={jest.fn()} />);
    const alert = screen.getByRole('alert');
    expect(alert.props.accessibilityLabel).toBe('Дійсний');
    expect(StyleSheet.flatten(screen.getByTestId('scan-result').props.style).backgroundColor).toBe(
      scanResult.success,
    );
    expect(screen.getByText('✅')).toBeTruthy();
  });

  it.each<[ScanFailureReason, string]>([
    ['alreadyUsed', 'Вже використано'],
    ['wrongVenue', 'Не цей заклад'],
    ['expired', 'Термін дії минув'],
    ['unknown', 'Невідомий квиток'],
  ])('shows a red failure with reason %s', async (reason, message) => {
    await render(<ScanResult status="failure" reason={reason} onNext={jest.fn()} />);
    const alert = screen.getByRole('alert');
    expect(alert.props.accessibilityLabel).toBe(`Недійсний. ${message}`);
    expect(StyleSheet.flatten(screen.getByTestId('scan-result').props.style).backgroundColor).toBe(
      scanResult.failure,
    );
    expect(screen.getByText('❌')).toBeTruthy();
  });

  it('calls onNext when the host taps next', async () => {
    const onNext = jest.fn();
    await render(<ScanResult status="success" onNext={onNext} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Далі' }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
