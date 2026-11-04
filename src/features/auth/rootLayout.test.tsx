import { fireEvent, render, screen } from '@testing-library/react-native';

import RootLayout from '@/app/_layout';
import { ensureGuestSession } from '@/services/auth';

import { authStrings } from './strings';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('expo-router', () => ({ Stack: () => null }));
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn().mockResolvedValue(undefined),
  hideAsync: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('expo-status-bar', () => ({ StatusBar: () => null }));
jest.mock('@/theme', () => ({
  ...jest.requireActual('@/theme'),
  useAppFonts: () => true,
}));
jest.mock('@/services/auth', () => ({
  ensureGuestSession: jest.fn(),
  onAuthChange: jest.fn(() => jest.fn()),
}));

describe('RootLayout session gate', () => {
  it('keeps the error screen mounted, busy, while a retry is in flight', async () => {
    jest
      .mocked(ensureGuestSession)
      .mockRejectedValueOnce(new Error('offline'))
      .mockReturnValueOnce(new Promise(() => undefined));

    await render(<RootLayout />);
    const retry = await screen.findByRole('button', { name: authStrings.retry });
    expect(retry).toBeEnabled();

    await fireEvent.press(retry);

    const busy = screen.getByRole('button', { name: authStrings.retry });
    expect(busy).toBeDisabled();
    expect(busy).toBeBusy();
    expect(screen.getByText(authStrings.errorTitle)).toBeTruthy();
  });
});
