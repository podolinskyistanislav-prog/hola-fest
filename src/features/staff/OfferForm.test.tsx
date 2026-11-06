import { fireEvent, render, screen } from '@testing-library/react-native';

import { OfferForm, type OfferFormProps } from './OfferForm';
import { emptyOfferForm } from './offerFormValidation';

const base: OfferFormProps = {
  initialValues: emptyOfferForm,
  isNew: true,
  isSaving: false,
  isSaveError: false,
  onSubmit: jest.fn(),
};

describe('OfferForm', () => {
  it('shows field errors and does not submit an invalid form', async () => {
    const onSubmit = jest.fn();
    await render(<OfferForm {...base} onSubmit={onSubmit} />);
    expect(screen.queryByText('Вкажи назву пропозиції.')).toBeNull();
    await fireEvent.changeText(screen.getByLabelText('Ліміт на гостя'), '0');
    await fireEvent.press(screen.getByLabelText('Зберегти'));
    expect(screen.getByText('Вкажи назву пропозиції.')).toBeTruthy();
    expect(screen.getByText('Вкажи ціле число, не менше 1.')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits trimmed values when valid', async () => {
    const onSubmit = jest.fn();
    await render(<OfferForm {...base} onSubmit={onSubmit} />);
    await fireEvent.changeText(screen.getByLabelText('Назва'), ' Шот ');
    await fireEvent.changeText(
      screen.getByLabelText('Максимум отримань (порожньо — без ліміту)'),
      '30',
    );
    await fireEvent.changeText(screen.getByLabelText('Діє до (необов’язково)'), '08.11.2026 23:00');
    await fireEvent.press(screen.getByLabelText('Зберегти'));
    expect(onSubmit).toHaveBeenCalledWith({
      input: {
        title: 'Шот',
        terms: null,
        maxClaims: 30,
        perUserLimit: 1,
        validUntil: new Date(2026, 10, 8, 23, 0),
      },
      isActive: true,
    });
  });

  it('shows the edit title, the save error and a disabled button while saving', async () => {
    await render(<OfferForm {...base} isNew={false} isSaving isSaveError />);
    expect(screen.getByText('Редагувати пропозицію')).toBeTruthy();
    expect(screen.getByText('Не вдалося зберегти пропозицію. Спробуй ще раз.')).toBeTruthy();
    expect(screen.getByLabelText('Зберігаємо…')).toBeDisabled();
  });
});
