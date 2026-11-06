import { fireEvent, render, screen } from '@testing-library/react-native';

import { VenueEventsList, type VenueEventsListProps } from './VenueEventsList';

const base: VenueEventsListProps = {
  events: [],
  isLoading: false,
  isError: false,
  onRetry: jest.fn(),
};

const draft = {
  id: 'e1',
  title: 'Нова ніч',
  startsAt: new Date(2026, 10, 7, 20, 0),
  status: 'draft' as const,
  offersCount: 0,
};
const published = {
  id: 'e2',
  title: 'Вечірка',
  startsAt: new Date(2026, 10, 8, 21, 30),
  status: 'published' as const,
  offersCount: 2,
};

describe('VenueEventsList', () => {
  it('shows loading', async () => {
    await render(<VenueEventsList {...base} isLoading />);
    expect(screen.getByLabelText('Завантажуємо…')).toBeTruthy();
  });

  it('shows an error with retry', async () => {
    const onRetry = jest.fn();
    await render(<VenueEventsList {...base} isError onRetry={onRetry} />);
    await fireEvent.press(screen.getByLabelText('Спробувати ще раз'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('shows the empty state and the create button', async () => {
    const onCreate = jest.fn();
    await render(<VenueEventsList {...base} onCreate={onCreate} />);
    expect(screen.getByText('У закладу ще немає подій.')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Створити подію'));
    expect(onCreate).toHaveBeenCalled();
  });

  it('marks drafts and opens an event', async () => {
    const onOpenEvent = jest.fn();
    await render(
      <VenueEventsList {...base} events={[draft, published]} onOpenEvent={onOpenEvent} />,
    );
    expect(screen.getAllByText('Чернетка')).toHaveLength(1);
    expect(screen.getByText('Пропозицій: 2')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText(/^Вечірка/));
    expect(onOpenEvent).toHaveBeenCalledWith('e2');
  });
});
