import { fireEvent, render, screen } from '@testing-library/react-native';

import type { AdminOffer } from '@/types/admin';

import { EventOffersSection, type EventOffersSectionProps } from './EventOffersSection';

const offer: AdminOffer = {
  id: 'o1',
  eventId: 'e1',
  title: 'Шот',
  terms: null,
  maxClaims: 20,
  perUserLimit: 1,
  validUntil: null,
  isActive: true,
};

const base: EventOffersSectionProps = {
  offers: [offer],
  isLoading: false,
  isError: false,
  isToggleError: false,
  onRetry: jest.fn(),
  onToggleActive: jest.fn(),
};

describe('EventOffersSection', () => {
  it('shows the loading state', async () => {
    await render(<EventOffersSection {...base} offers={[]} isLoading />);
    expect(screen.getByLabelText('Завантажуємо…')).toBeTruthy();
  });

  it('shows the empty state', async () => {
    await render(<EventOffersSection {...base} offers={[]} />);
    expect(screen.getByText('У події ще немає пропозицій.')).toBeTruthy();
  });

  it('shows the error state with a retry button', async () => {
    const onRetry = jest.fn();
    await render(<EventOffersSection {...base} offers={[]} isError onRetry={onRetry} />);
    expect(screen.getByText('Не вдалося завантажити пропозиції. Перевір з’єднання.')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Спробувати ще раз'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('lists offers, opens one, toggles it and adds a new one', async () => {
    const onOpenOffer = jest.fn();
    const onToggleActive = jest.fn();
    const onCreate = jest.fn();
    await render(
      <EventOffersSection
        {...base}
        onOpenOffer={onOpenOffer}
        onToggleActive={onToggleActive}
        onCreate={onCreate}
      />,
    );
    expect(screen.getByText('Ліміт: 20')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Шот, Ліміт: 20'));
    expect(onOpenOffer).toHaveBeenCalledWith('o1');
    await fireEvent(screen.getByLabelText('Активна'), 'valueChange', false);
    expect(onToggleActive).toHaveBeenCalledWith(offer);
    await fireEvent.press(screen.getByLabelText('Додати пропозицію'));
    expect(onCreate).toHaveBeenCalled();
  });

  it('shows a toggle error', async () => {
    await render(<EventOffersSection {...base} isToggleError />);
    expect(screen.getByText('Не вдалося змінити стан пропозиції. Спробуй ще раз.')).toBeTruthy();
  });
});
