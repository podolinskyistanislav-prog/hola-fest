import { act, renderHook } from '@testing-library/react-native';

import { t } from '@/lib/i18n';

import { useStaffLogin } from './useStaffLogin';

jest.mock('@/services/auth', () => ({ signInStaff: jest.fn(), signOut: jest.fn() }));

describe('useStaffLogin', () => {
  it('signs in with a trimmed email and reports success', async () => {
    const signInStaff = jest.fn().mockResolvedValue({});
    const { result } = await renderHook(() => useStaffLogin({ signInStaff, signOut: jest.fn() }));
    let ok = false;
    await act(async () => {
      ok = await result.current.signIn('  a@b.ua ', 'secret');
    });
    expect(ok).toBe(true);
    expect(signInStaff).toHaveBeenCalledWith('a@b.ua', 'secret');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('shows one generic error whatever the failure', async () => {
    const signInStaff = jest.fn().mockRejectedValue(new Error('user_not_found'));
    const { result } = await renderHook(() => useStaffLogin({ signInStaff, signOut: jest.fn() }));
    let ok = true;
    await act(async () => {
      ok = await result.current.signIn('a@b.ua', 'bad');
    });
    expect(ok).toBe(false);
    expect(result.current.error).toBe(t('auth.signInFailed'));
  });

  it('is loading while the request is pending and clears the old error on retry', async () => {
    let resolve: (value: unknown) => void = () => undefined;
    const signInStaff = jest
      .fn()
      .mockRejectedValueOnce(new Error('x'))
      .mockReturnValueOnce(new Promise((r) => (resolve = r)));
    const { result } = await renderHook(() => useStaffLogin({ signInStaff, signOut: jest.fn() }));
    await act(async () => {
      await result.current.signIn('a@b.ua', 'bad');
    });
    expect(result.current.error).not.toBeNull();
    let pending: Promise<boolean> = Promise.resolve(false);
    await act(async () => {
      pending = result.current.signIn('a@b.ua', 'good');
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    await act(async () => {
      resolve({});
      await pending;
    });
    expect(result.current.isLoading).toBe(false);
  });

  it('signs out and reports a failure generically', async () => {
    const signOut = jest.fn().mockRejectedValueOnce(new Error('x')).mockResolvedValue(undefined);
    const { result } = await renderHook(() => useStaffLogin({ signInStaff: jest.fn(), signOut }));
    await act(async () => {
      expect(await result.current.signOut()).toBe(false);
    });
    expect(result.current.error).toBe(t('auth.signOutFailed'));
    await act(async () => {
      expect(await result.current.signOut()).toBe(true);
    });
    expect(result.current.error).toBeNull();
  });
});
