import { fireEvent, render, screen } from '@testing-library/react-native';

import { StaffHome, type StaffHomeProps } from './StaffHome';

const base: StaffHomeProps = {
  access: null,
  isLoading: false,
  isError: false,
  isSigningOut: false,
  signOutError: null,
  onRetry: jest.fn(),
  onOpenScanner: jest.fn(),
  onOpenVenueEvents: jest.fn(),
  onSignOut: jest.fn(),
};

describe('StaffHome', () => {
  it('shows loading', async () => {
    await render(<StaffHome {...base} isLoading />);
    expect(screen.getByText('Завантажуємо…')).toBeTruthy();
  });

  it('shows an error with retry', async () => {
    const onRetry = jest.fn();
    await render(<StaffHome {...base} isError onRetry={onRetry} />);
    await fireEvent.press(screen.getByLabelText('Спробувати ще раз'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('shows the empty state when there is no access', async () => {
    await render(<StaffHome {...base} access={{ canScan: false, canManageEvents: false }} />);
    expect(screen.getByText('Тебе ще не додано до жодного закладу.')).toBeTruthy();
    expect(screen.queryByLabelText('Сканер')).toBeNull();
  });

  it('shows only the scanner to a host', async () => {
    const onOpenScanner = jest.fn();
    await render(
      <StaffHome
        {...base}
        access={{ canScan: true, canManageEvents: false }}
        onOpenScanner={onOpenScanner}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Сканер'));
    expect(onOpenScanner).toHaveBeenCalled();
    expect(screen.queryByLabelText('Події закладу')).toBeNull();
  });

  it('shows both items to an admin and signs out', async () => {
    const onSignOut = jest.fn();
    const onOpenVenueEvents = jest.fn();
    await render(
      <StaffHome
        {...base}
        access={{ canScan: true, canManageEvents: true }}
        onSignOut={onSignOut}
        onOpenVenueEvents={onOpenVenueEvents}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Події закладу'));
    expect(onOpenVenueEvents).toHaveBeenCalled();
    await fireEvent.press(screen.getByLabelText('Вийти'));
    expect(onSignOut).toHaveBeenCalled();
  });
});
