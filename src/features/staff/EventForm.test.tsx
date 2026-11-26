import { fireEvent, render, screen } from '@testing-library/react-native';

import { EventForm, type EventFormProps } from './EventForm';
import { emptyEventForm } from './eventFormValidation';

jest.mock('./useDjSearch', () => ({
  useDjSearch: () => ({
    data: [{ id: 'd1', name: 'DJ Nova', photoUrl: null }],
    isError: false,
    isSuccess: true,
  }),
}));

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
      input: expect.objectContaining({ title: 'Ніч', startsAt: new Date('2026-11-07T18:00:00Z') }),
      status: 'draft',
      djIds: [],
    });
  });

  it('adds a searched DJ to the lineup and submits their id', async () => {
    const onSubmit = jest.fn();
    await render(<EventForm {...base} onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByLabelText('Додати: DJ Nova'));
    expect(screen.getByLabelText('Прибрати: DJ Nova')).toBeTruthy();
    await fireEvent.changeText(screen.getByLabelText('Назва'), 'Ніч');
    await fireEvent.changeText(screen.getByLabelText('Початок'), '07.11.2026 20:00');
    await fireEvent.press(screen.getByLabelText('Зберегти'));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ djIds: ['d1'] }));
  });

  it('shows the edit title, the save error and a disabled button while saving', async () => {
    await render(<EventForm {...base} isNew={false} isSaving isSaveError />);
    expect(screen.getByText('Редагувати подію')).toBeTruthy();
    expect(screen.getByText('Не вдалося зберегти подію. Спробуй ще раз.')).toBeTruthy();
    expect(screen.getByLabelText('Зберігаємо…').props.accessibilityState.disabled).toBe(true);
  });
});
