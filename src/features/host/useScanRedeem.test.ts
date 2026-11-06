import { act, renderHook } from '@testing-library/react-native';

import { useScanRedeem } from './useScanRedeem';

jest.mock('@/services/claims', () => ({ redeemClaim: jest.fn() }));

describe('useScanRedeem', () => {
  it('shows success when the server accepts the ticket', async () => {
    const redeemClaim = jest.fn().mockResolvedValue({ ok: true });
    const { result } = await renderHook(() => useScanRedeem({ redeemClaim }));
    await act(async () => {
      await result.current.onCodeScanned('a'.repeat(64));
    });
    expect(redeemClaim).toHaveBeenCalledWith('a'.repeat(64));
    expect(result.current.state).toEqual({ status: 'success' });
  });

  it.each([
    ['already_redeemed', 'alreadyUsed'],
    ['wrong_venue', 'wrongVenue'],
    ['expired', 'expired'],
    ['unknown_token', 'unknown'],
    ['invalid_token', 'unknown'],
  ])('maps %s to a failure verdict', async (serverReason, reason) => {
    const redeemClaim = jest.fn().mockResolvedValue({ ok: false, reason: serverReason });
    const { result } = await renderHook(() => useScanRedeem({ redeemClaim }));
    await act(async () => {
      await result.current.onCodeScanned('t');
    });
    expect(result.current.state).toEqual({ status: 'failure', reason });
  });

  it.each(['network', 'unauthenticated', 'unknown'])(
    'shows a retryable error, not a verdict, for %s',
    async (serverReason) => {
      const redeemClaim = jest.fn().mockResolvedValue({ ok: false, reason: serverReason });
      const { result } = await renderHook(() => useScanRedeem({ redeemClaim }));
      await act(async () => {
        await result.current.onCodeScanned('t');
      });
      expect(result.current.state).toEqual({ status: 'error' });
    },
  );

  it('shows the error state when the service throws', async () => {
    const redeemClaim = jest.fn().mockRejectedValue(new Error('boom'));
    const { result } = await renderHook(() => useScanRedeem({ redeemClaim }));
    await act(async () => {
      await result.current.onCodeScanned('t');
    });
    expect(result.current.state).toEqual({ status: 'error' });
  });

  it('redeems a burst of scans once, then scans again after next()', async () => {
    const redeemClaim = jest.fn().mockResolvedValue({ ok: true });
    const { result } = await renderHook(() => useScanRedeem({ redeemClaim }));
    await act(async () => {
      await Promise.all([
        result.current.onCodeScanned('t'),
        result.current.onCodeScanned('t'),
        result.current.onCodeScanned('t'),
      ]);
    });
    expect(redeemClaim).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.onCodeScanned('other');
    });
    expect(redeemClaim).toHaveBeenCalledTimes(1);

    await act(async () => {
      result.current.next();
    });
    expect(result.current.state).toEqual({ status: 'scanning' });
    await act(async () => {
      await result.current.onCodeScanned('other');
    });
    expect(redeemClaim).toHaveBeenCalledTimes(2);
  });
});
