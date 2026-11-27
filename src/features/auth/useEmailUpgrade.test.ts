import { act, renderHook } from '@testing-library/react-native';

import { t } from '@/lib/i18n';

import { useEmailUpgrade } from './useEmailUpgrade';

jest.mock('@/services/auth', () => ({ requestEmailCode: jest.fn(), confirmEmailCode: jest.fn() }));

async function setup(overrides: Partial<Parameters<typeof useEmailUpgrade>[0]> = {}) {
  const deps = {
    requestEmailCode: jest.fn().mockResolvedValue('upgrade'),
    confirmEmailCode: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  };
  const { result } = await renderHook(() => useEmailUpgrade(deps));
  return { deps, result };
}

describe('useEmailUpgrade', () => {
  it('moves to the code step after the code is sent to the trimmed email', async () => {
    const { deps, result } = await setup();
    let ok = false;
    await act(async () => {
      ok = await result.current.requestCode(' a@b.ua ');
    });
    expect(ok).toBe(true);
    expect(deps.requestEmailCode).toHaveBeenCalledWith('a@b.ua');
    expect(result.current.step).toBe('code');
    expect(result.current.email).toBe('a@b.ua');
  });

  it('rejects an invalid email without calling the server', async () => {
    const { deps, result } = await setup();
    await act(async () => {
      await result.current.requestCode('nope');
    });
    expect(deps.requestEmailCode).not.toHaveBeenCalled();
    expect(result.current.error).toBe(t('feedAuth.invalidEmail'));
    expect(result.current.step).toBe('email');
  });

  it('stays on the email step with a generic error when sending fails', async () => {
    const { result } = await setup({
      requestEmailCode: jest.fn().mockRejectedValue(new Error('smtp')),
    });
    await act(async () => {
      await result.current.requestCode('a@b.ua');
    });
    expect(result.current.step).toBe('email');
    expect(result.current.error).toBe(t('feedAuth.requestFailed'));
  });

  it('confirms a 6-digit code for the same email', async () => {
    const { deps, result } = await setup();
    await act(async () => {
      await result.current.requestCode('a@b.ua');
    });
    let ok = false;
    await act(async () => {
      ok = await result.current.confirm('123456');
    });
    expect(ok).toBe(true);
    expect(deps.confirmEmailCode).toHaveBeenCalledWith('a@b.ua', '123456', 'upgrade');
  });

  it.each([
    ['rate_limited', 'feedAuth.rateLimited'],
    ['invalid_email', 'feedAuth.invalidEmail'],
    ['network', 'feedAuth.networkFailed'],
  ] as const)('shows a distinct message for %s', async (code, key) => {
    const { result } = await setup({ requestEmailCode: jest.fn().mockRejectedValue({ code }) });
    await act(async () => {
      await result.current.requestCode('a@b.ua');
    });
    expect(result.current.error).toBe(t(key));
  });

  it('remembers the sign-in mode for an existing account and confirms with it', async () => {
    const { deps, result } = await setup({
      requestEmailCode: jest.fn().mockResolvedValue('signin'),
    });
    await act(async () => {
      await result.current.requestCode('a@b.ua');
    });
    expect(result.current.mode).toBe('signin');
    await act(async () => {
      await result.current.confirm('123456');
    });
    expect(deps.confirmEmailCode).toHaveBeenCalledWith('a@b.ua', '123456', 'signin');
  });

  it('shows one error for a malformed or wrong code', async () => {
    const { deps, result } = await setup({
      confirmEmailCode: jest.fn().mockRejectedValue(new Error('bad')),
    });
    await act(async () => {
      await result.current.requestCode('a@b.ua');
    });
    await act(async () => {
      await result.current.confirm('12');
    });
    expect(deps.confirmEmailCode).not.toHaveBeenCalled();
    await act(async () => {
      await result.current.confirm('000000');
    });
    expect(result.current.error).toBe(t('feedAuth.codeFailed'));
  });

  it('goes back to the email step', async () => {
    const { result } = await setup();
    await act(async () => {
      await result.current.requestCode('a@b.ua');
    });
    await act(async () => result.current.changeEmail());
    expect(result.current.step).toBe('email');
  });
});
