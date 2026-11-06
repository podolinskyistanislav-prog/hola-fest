import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { useCameraPermissions } from 'expo-camera';

import { t } from '@/lib/i18n';
import { redeemClaim } from '@/services/claims';

import { ScannerScreenContent } from './ScannerScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('expo-camera', () => {
  const { View } = jest.requireActual('react-native');
  return { CameraView: View, useCameraPermissions: jest.fn() };
});
jest.mock('@/services/claims', () => ({ redeemClaim: jest.fn() }));

const requestPermission = jest.fn();
function permission(value: { granted: boolean; canAskAgain: boolean } | null) {
  jest.mocked(useCameraPermissions).mockReturnValue([value, requestPermission, jest.fn()] as never);
}

describe('ScannerScreenContent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows a loading state while the permission is unknown', async () => {
    permission(null);
    await render(<ScannerScreenContent onBack={jest.fn()} />);
    expect(screen.getByLabelText(t('scanner.loading'))).toBeTruthy();
  });

  it('asks for the camera and can go back when permission is missing', async () => {
    permission({ granted: false, canAskAgain: true });
    const onBack = jest.fn();
    await render(<ScannerScreenContent onBack={onBack} />);
    await fireEvent.press(screen.getByRole('button', { name: t('scanner.permissionAllow') }));
    expect(requestPermission).toHaveBeenCalled();
    await fireEvent.press(screen.getByRole('button', { name: t('scanner.back') }));
    expect(onBack).toHaveBeenCalled();
  });

  it('points to settings when permission is permanently denied', async () => {
    permission({ granted: false, canAskAgain: false });
    await render(<ScannerScreenContent onBack={jest.fn()} />);
    expect(screen.getByText(t('scanner.permissionDeniedBody'))).toBeTruthy();
    expect(screen.queryByRole('button', { name: t('scanner.permissionAllow') })).toBeNull();
  });

  it('scans a code, shows the verdict, then returns to the camera', async () => {
    permission({ granted: true, canAskAgain: true });
    jest.mocked(redeemClaim).mockResolvedValue({ ok: false, reason: 'already_redeemed' });
    await render(<ScannerScreenContent onBack={jest.fn()} />);

    const camera = screen.getByLabelText(t('scanner.cameraLabel'));
    await act(async () => {
      camera.props.onBarcodeScanned({ data: 'token' });
      camera.props.onBarcodeScanned({ data: 'token' });
    });

    expect(redeemClaim).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('scan-result')).toBeTruthy();
    expect(screen.getByText('Вже використано')).toBeTruthy();

    await fireEvent.press(screen.getByRole('button', { name: 'Далі' }));
    expect(screen.getByLabelText(t('scanner.cameraLabel'))).toBeTruthy();
  });

  it('shows a retry when the check could not be completed', async () => {
    permission({ granted: true, canAskAgain: true });
    jest.mocked(redeemClaim).mockResolvedValue({ ok: false, reason: 'network' });
    await render(<ScannerScreenContent onBack={jest.fn()} />);
    await act(async () => {
      screen.getByLabelText(t('scanner.cameraLabel')).props.onBarcodeScanned({ data: 'token' });
    });
    expect(screen.getByText(t('scanner.errorTitle'))).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: t('scanner.retry') }));
    expect(screen.getByLabelText(t('scanner.cameraLabel'))).toBeTruthy();
  });
});
