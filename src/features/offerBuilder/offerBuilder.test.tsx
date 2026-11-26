import { fireEvent, render, screen } from '@testing-library/react-native';

import type { BuilderOffer } from '@/types/offerBuilder';

import { emptyOfferDraft, type OfferWizardDraft } from './offerDraft';
import { OfferWizard, type OfferWizardProps } from './OfferWizard';
import { OffersList, type OffersListProps } from './OffersList';

jest.mock('@/services/supabase', () => ({ supabase: {} }));

const wizardBase: OfferWizardProps = {
  venueName: 'Club',
  initialDraft: emptyOfferDraft,
  isEditing: false,
  eventChoices: { events: [], isLoading: false, isError: false },
  isSaving: false,
  serverError: null,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
};

const readyDraft: OfferWizardDraft = {
  ...emptyOfferDraft,
  kind: 'two_for_one',
  window: { from: null, to: new Date('2099-12-31T21:00:00.000Z') },
};

async function pressNext(times: number) {
  for (let i = 0; i < times; i += 1) await fireEvent.press(screen.getByText('Далі'));
}

beforeEach(() => jest.clearAllMocks());

describe('OfferWizard', () => {
  it('does not leave the template step without a choice', async () => {
    await render(<OfferWizard {...wizardBase} />);
    await pressNext(1);
    expect(screen.getByText('Крок 1 з 5')).toBeTruthy();
  });

  it('walks through the steps and submits a published offer', async () => {
    const onSubmit = jest.fn();
    await render(<OfferWizard {...wizardBase} onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByLabelText(/^−% на вхід/));
    await pressNext(1);
    await fireEvent.changeText(screen.getByLabelText('Знижка, %'), '20');
    expect(screen.getByDisplayValue('−20% на вхід')).toBeTruthy();
    await pressNext(1);

    await fireEvent.press(screen.getByText('До події'));
    expect(screen.getByText('У закладу ще немає подій. Обери «Дата й час».')).toBeTruthy();
    await fireEvent.press(screen.getByText('Дата й час'));
    await fireEvent.changeText(screen.getByLabelText('Кінець'), '31.12.2099 23:00');
    await pressNext(2);

    expect(screen.getByText('Крок 5 з 5')).toBeTruthy();
    await fireEvent.press(screen.getByText('Опублікувати зараз'));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ kind: 'percent_off', value: '20', status: 'live' }),
    );
  });

  it('shows an inline error for a wrong value and stays on the step', async () => {
    await render(
      <OfferWizard
        {...wizardBase}
        initialDraft={{ ...emptyOfferDraft, kind: 'percent_off', value: '500' }}
        isEditing
      />,
    );
    await pressNext(1);
    expect(screen.getByText('Крок 2 з 5')).toBeTruthy();
    expect(screen.getByText('Вкажи ціле число від 1 до 100.')).toBeTruthy();
  });

  it('shows the server error on the preview step and keeps what was typed', async () => {
    await render(
      <OfferWizard
        {...wizardBase}
        initialDraft={readyDraft}
        isEditing
        serverError="Сервер не прийняв пропозицію."
      />,
    );
    await pressNext(3);
    expect(screen.getByText('Сервер не прийняв пропозицію.')).toBeTruthy();
    await fireEvent.press(screen.getByText('Назад'));
    await fireEvent.press(screen.getByText('Назад'));
    await fireEvent.press(screen.getByText('Назад'));
    expect(screen.getByDisplayValue('2 за ціною 1')).toBeTruthy();
  });

  it('offers to schedule a time window and shows saving state', async () => {
    await render(<OfferWizard {...wizardBase} initialDraft={readyDraft} isEditing isSaving />);
    await pressNext(3);
    expect(screen.getByText('Запланувати')).toBeTruthy();
    expect(screen.getByText('Зберігаємо…')).toBeTruthy();
  });

  it('explains why a past end cannot be published', async () => {
    const past = {
      ...readyDraft,
      window: { from: null, to: new Date('2020-01-01T10:00:00.000Z') },
    };
    await render(<OfferWizard {...wizardBase} initialDraft={past} isEditing />);
    await pressNext(3);
    await fireEvent.press(screen.getByText('Опублікувати зараз'));
    expect(screen.getByText('Кінець уже минув.')).toBeTruthy();
    expect(wizardBase.onSubmit).not.toHaveBeenCalled();
  });

  it('can be cancelled', async () => {
    const onCancel = jest.fn();
    await render(<OfferWizard {...wizardBase} onCancel={onCancel} />);
    await fireEvent.press(screen.getByText('Скасувати'));
    expect(onCancel).toHaveBeenCalled();
  });
});

const offer = (patch: Partial<BuilderOffer>): BuilderOffer => ({
  id: 'o1',
  eventId: null,
  venueId: 'v1',
  kind: 'percent_off',
  value: '20',
  title: '−20% на вхід',
  terms: null,
  maxClaims: null,
  perUserLimit: 1,
  startsAt: null,
  endsAt: null,
  status: 'paused',
  ...patch,
});

const listBase: OffersListProps = {
  offers: [],
  stats: [],
  isLoading: false,
  isError: false,
  actionError: null,
  isBusy: false,
  onRetry: jest.fn(),
  onCreate: jest.fn(),
  onAction: jest.fn(),
};

describe('OffersList', () => {
  it('shows the loading state', async () => {
    await render(<OffersList {...listBase} isLoading />);
    expect(screen.getByLabelText('Завантажуємо…')).toBeTruthy();
  });

  it('shows the error state with retry', async () => {
    await render(<OffersList {...listBase} isError />);
    await fireEvent.press(screen.getByText('Спробувати ще раз'));
    expect(listBase.onRetry).toHaveBeenCalled();
  });

  it('shows the empty state', async () => {
    await render(<OffersList {...listBase} />);
    expect(screen.getByText(/Пропозицій ще немає/)).toBeTruthy();
  });

  it('shows status and stats and runs an action', async () => {
    const onAction = jest.fn();
    const paused = offer({});
    await render(
      <OffersList
        {...listBase}
        offers={[paused]}
        stats={[{ offerId: 'o1', claims: 5, redemptions: 3 }]}
        onAction={onAction}
      />,
    );
    expect(screen.getByLabelText('Пауза')).toBeTruthy();
    expect(screen.getByText('Взято: 5 · Використано: 3')).toBeTruthy();
    await fireEvent.press(screen.getByText('Відновити'));
    expect(onAction).toHaveBeenCalledWith('resume', paused);
  });

  it('shows the action error and creates a new offer', async () => {
    const onCreate = jest.fn();
    await render(<OffersList {...listBase} actionError="Немає зв’язку." onCreate={onCreate} />);
    expect(screen.getByText('Немає зв’язку.')).toBeTruthy();
    await fireEvent.press(screen.getByText('Нова пропозиція'));
    expect(onCreate).toHaveBeenCalled();
  });
});
