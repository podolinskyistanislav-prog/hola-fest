import { act, renderHook } from '@testing-library/react-native';
import * as Brightness from 'expo-brightness';

import { useMaxBrightness } from './useMaxBrightness';

jest.mock('expo-brightness', () => ({
  getBrightnessAsync: jest.fn(),
  setBrightnessAsync: jest.fn(),
}));

const getBrightness = Brightness.getBrightnessAsync as jest.Mock;
const setBrightness = Brightness.setBrightnessAsync as jest.Mock;

beforeEach(() => {
  jest.resetAllMocks();
  getBrightness.mockResolvedValue(0.4);
  setBrightness.mockResolvedValue(undefined);
});

describe('useMaxBrightness', () => {
  it('sets max brightness on open and restores the old level on leave', async () => {
    const { unmount } = await renderHook(() => useMaxBrightness());
    await act(async () => undefined);
    expect(setBrightness).toHaveBeenCalledWith(1);
    await unmount();
    expect(setBrightness).toHaveBeenLastCalledWith(0.4);
  });

  it('toggle restores the level and turns max back on', async () => {
    const { result } = await renderHook(() => useMaxBrightness());
    await act(async () => undefined);
    await act(async () => result.current.toggle());
    expect(result.current.enabled).toBe(false);
    expect(setBrightness).toHaveBeenLastCalledWith(0.4);
    await act(async () => result.current.toggle());
    await act(async () => undefined);
    expect(result.current.enabled).toBe(true);
    expect(setBrightness).toHaveBeenLastCalledWith(1);
  });

  it('does not throw when brightness is unavailable', async () => {
    getBrightness.mockRejectedValue(new Error('unavailable'));
    const { unmount } = await renderHook(() => useMaxBrightness());
    await act(async () => undefined);
    await unmount();
    expect(setBrightness).not.toHaveBeenCalled();
  });
});
