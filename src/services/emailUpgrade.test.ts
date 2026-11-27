import { confirmEmailCode, requestEmailCode } from './auth';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: {
    auth: {
      updateUser: jest.fn(),
      signInWithOtp: jest.fn(),
      verifyOtp: jest.fn(),
      refreshSession: jest.fn(),
    },
  },
}));

const auth = supabase.auth as unknown as {
  updateUser: jest.Mock;
  signInWithOtp: jest.Mock;
  verifyOtp: jest.Mock;
  refreshSession: jest.Mock;
};

beforeEach(() => jest.resetAllMocks());

describe('requestEmailCode', () => {
  it('asks Supabase to attach the email to the current guest', async () => {
    auth.updateUser.mockResolvedValue({ data: {}, error: null });
    await expect(requestEmailCode('a@b.ua')).resolves.toBe('upgrade');
    expect(auth.updateUser).toHaveBeenCalledWith({ email: 'a@b.ua' });
    expect(auth.signInWithOtp).not.toHaveBeenCalled();
  });

  it('signs in with a one-time code when the email already has an account', async () => {
    auth.updateUser.mockResolvedValue({ data: {}, error: { status: 422, code: 'email_exists' } });
    auth.signInWithOtp.mockResolvedValue({ data: {}, error: null });
    await expect(requestEmailCode('a@b.ua')).resolves.toBe('signin');
    expect(auth.signInWithOtp).toHaveBeenCalledWith({
      email: 'a@b.ua',
      options: { shouldCreateUser: false },
    });
  });

  it.each([
    ['over_email_send_rate_limit', 429, 'auth_rate_limited'],
    ['email_address_invalid', 400, 'auth_invalid_email'],
  ])('maps %s to a distinct error', async (code, status, message) => {
    auth.updateUser.mockResolvedValue({ data: {}, error: { status, code } });
    await expect(requestEmailCode('a@b.ua')).rejects.toMatchObject({ message });
  });

  it('maps a rate limit on the sign-in path too', async () => {
    auth.updateUser.mockResolvedValue({ data: {}, error: { status: 422, code: 'email_exists' } });
    auth.signInWithOtp.mockResolvedValue({
      data: {},
      error: { status: 429, code: 'over_email_send_rate_limit' },
    });
    await expect(requestEmailCode('a@b.ua')).rejects.toMatchObject({
      message: 'auth_rate_limited',
    });
  });

  it('maps a network failure', async () => {
    auth.updateUser.mockResolvedValue({
      data: {},
      error: { name: 'AuthRetryableFetchError', status: 0 },
    });
    await expect(requestEmailCode('a@b.ua')).rejects.toMatchObject({ message: 'auth_network' });
  });

  it('throws a generic error on failure', async () => {
    auth.updateUser.mockResolvedValue({ data: {}, error: { message: 'smtp secret', status: 500 } });
    await expect(requestEmailCode('a@b.ua')).rejects.toMatchObject({ message: 'auth_unknown' });
  });
});

describe('confirmEmailCode', () => {
  it('verifies the email-change code and refreshes the session', async () => {
    auth.verifyOtp.mockResolvedValue({ data: {}, error: null });
    auth.refreshSession.mockResolvedValue({ data: {}, error: null });
    await confirmEmailCode('a@b.ua', '123456');
    expect(auth.verifyOtp).toHaveBeenCalledWith({
      email: 'a@b.ua',
      token: '123456',
      type: 'email_change',
    });
    expect(auth.refreshSession).toHaveBeenCalled();
  });

  it('verifies a sign-in code with type email and skips the refresh', async () => {
    auth.verifyOtp.mockResolvedValue({ data: {}, error: null });
    await confirmEmailCode('a@b.ua', '123456', 'signin');
    expect(auth.verifyOtp).toHaveBeenCalledWith({
      email: 'a@b.ua',
      token: '123456',
      type: 'email',
    });
    expect(auth.refreshSession).not.toHaveBeenCalled();
  });

  it('throws a generic error for a wrong code', async () => {
    auth.verifyOtp.mockResolvedValue({ data: {}, error: { message: 'bad', status: 403 } });
    await expect(confirmEmailCode('a@b.ua', '000000')).rejects.toMatchObject({
      message: 'auth_unknown',
    });
    expect(auth.refreshSession).not.toHaveBeenCalled();
  });
});
