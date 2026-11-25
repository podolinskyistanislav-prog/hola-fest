import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { confirmEmailCode, requestEmailCode } from '@/services/auth';

import { SignInToPostSheet } from './SignInToPostSheet';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@/services/auth', () => ({ requestEmailCode: jest.fn(), confirmEmailCode: jest.fn() }));

describe('SignInToPostSheet', () => {
  beforeEach(() => jest.resetAllMocks());

  it('goes email → code → confirmed', async () => {
    jest.mocked(requestEmailCode).mockResolvedValue(undefined);
    jest.mocked(confirmEmailCode).mockResolvedValue(undefined);
    const onConfirmed = jest.fn();
    await render(<SignInToPostSheet visible onClose={jest.fn()} onConfirmed={onConfirmed} />);

    expect(screen.getByText(t('feedAuth.title'))).toBeTruthy();
    await fireEvent.changeText(screen.getByLabelText(t('auth.email')), 'a@b.ua');
    await fireEvent.press(screen.getByLabelText(t('feedAuth.sendCode')));

    await waitFor(() => expect(screen.getByLabelText(t('feedAuth.codeLabel'))).toBeTruthy());
    await fireEvent.changeText(screen.getByLabelText(t('feedAuth.codeLabel')), '123456');
    await fireEvent.press(screen.getByLabelText(t('feedAuth.confirm')));

    await waitFor(() => expect(onConfirmed).toHaveBeenCalled());
    expect(confirmEmailCode).toHaveBeenCalledWith('a@b.ua', '123456');
  });

  it('shows an error and stays on the code step for a wrong code', async () => {
    jest.mocked(requestEmailCode).mockResolvedValue(undefined);
    jest.mocked(confirmEmailCode).mockRejectedValue(new Error('bad'));
    const onConfirmed = jest.fn();
    await render(<SignInToPostSheet visible onClose={jest.fn()} onConfirmed={onConfirmed} />);

    await fireEvent.changeText(screen.getByLabelText(t('auth.email')), 'a@b.ua');
    await fireEvent.press(screen.getByLabelText(t('feedAuth.sendCode')));
    await waitFor(() => expect(screen.getByLabelText(t('feedAuth.codeLabel'))).toBeTruthy());
    await fireEvent.changeText(screen.getByLabelText(t('feedAuth.codeLabel')), '000000');
    await fireEvent.press(screen.getByLabelText(t('feedAuth.confirm')));

    await waitFor(() => expect(screen.getByText(t('feedAuth.codeFailed'))).toBeTruthy());
    expect(onConfirmed).not.toHaveBeenCalled();
  });
});
