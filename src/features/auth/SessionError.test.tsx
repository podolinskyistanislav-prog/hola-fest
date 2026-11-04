import { fireEvent, render, screen } from '@testing-library/react-native';

import { SessionError } from './SessionError';
import { authStrings } from './strings';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

describe('SessionError', () => {
  it('shows a header and calls onRetry on press', async () => {
    const onRetry = jest.fn();
    await render(<SessionError onRetry={onRetry} />);
    expect(screen.getByRole('header', { name: authStrings.errorTitle })).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: authStrings.retry }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('stays on screen with a busy, disabled button while retrying', async () => {
    const onRetry = jest.fn();
    await render(<SessionError onRetry={onRetry} isRetrying />);
    const button = screen.getByRole('button', { name: authStrings.retry });
    expect(button).toBeDisabled();
    expect(button).toBeBusy();
    await fireEvent.press(button);
    expect(onRetry).not.toHaveBeenCalled();
  });
});
