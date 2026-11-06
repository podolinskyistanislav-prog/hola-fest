import { fireEvent, render, screen } from '@testing-library/react-native';

import { EventForm, type EventFormProps } from './EventForm';
import { emptyEventForm } from './eventFormValidation';

const base: EventFormProps = {
  initialValues: emptyEventForm,
  isNew: true,
  isSaving: false,
  isSaveError: false,
  onSubmit: jest.fn(),
};

describe('EventForm', () => {
  it('shows per-field errors and does not submit an empty form', async () => {
    const onSubmit = jest.fn();
    await render(<EventForm {...base} onSubmit={onSubmit} />);
    expect(screen.queryByText('Вкажи назву події.')).toBeNull();
    await fireEvent.press(screen.getByLabelText('Зберегти'));
    expect(screen.getByText('Вкажи назву події.')).toBeTruthy();
    expect(screen.getByText('Вкажи дату й час початку.')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits trimmed values when valid', async () => {
    const onSubmit = jest.fn();
    await render(<EventForm {...base} onSubmit={onSubmit} />);
    await fireEvent.changeText(screen.getByLabelText('Назва'), ' Ніч ');
    await fireEvent.changeText(screen.getByLabelText('Початок'), '07.11.2026 20:00');
    await fireEvent.press(screen.getByLabelText('Зберегти'));
    expect(onSubmit).toHaveBeenCalledWith({
      input: expect.objectContaining({ title: 'Ніч', startsAt: new Date(2026, 10, 7, 20, 0) }),
      status: 'draft',
    });
  });

  it('shows the edit title, the save error and a disabled button while saving', async () => {
    await render(<EventForm {...base} isNew={false} isSaving isSaveError />);
    expect(screen.getByText('Редагувати подію')).toBeTruthy();
    expect(screen.getByText('Не вдалося зберегти подію. Спробуй ще раз.')).toBeTruthy();
    expect(screen.getByLabelText('Зберігаємо…').props.accessibilityState.disabled).toBe(true);
  });
});
