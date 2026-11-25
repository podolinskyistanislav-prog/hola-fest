import { confirmEmailCode, requestEmailCode } from './auth';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: { auth: { updateUser: jest.fn(), verifyOtp: jest.fn(), refreshSession: jest.fn() } },
}));

const auth = supabase.auth as unknown as {
  updateUser: jest.Mock;
  verifyOtp: jest.Mock;
  refreshSession: jest.Mock;
};

beforeEach(() => jest.resetAllMocks());

describe('requestEmailCode', () => {
  it('asks Supabase to attach the email to the current guest', async () => {
    auth.updateUser.mockResolvedValue({ data: {}, error: null });
    await expect(requestEmailCode('a@b.ua')).resolves.toBeUndefined();
    expect(auth.updateUser).toHaveBeenCalledWith({ email: 'a@b.ua' });
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

  it('throws a generic error for a wrong code', async () => {
    auth.verifyOtp.mockResolvedValue({ data: {}, error: { message: 'bad', status: 403 } });
    await expect(confirmEmailCode('a@b.ua', '000000')).rejects.toMatchObject({
      message: 'auth_unknown',
    });
    expect(auth.refreshSession).not.toHaveBeenCalled();
  });
});
