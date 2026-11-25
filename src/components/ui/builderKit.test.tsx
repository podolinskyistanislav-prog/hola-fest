import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import * as ReactNative from 'react-native';

import { ChoiceCard } from './ChoiceCard';
import { ImageUploader } from './ImageUploader';
import { OfferPreview } from './OfferPreview';
import { StatTile } from './StatTile';
import { StatusPill } from './StatusPill';
import { StepIndicator } from './StepIndicator';
import { Stepper } from './Stepper';
import { TimeWindowPicker } from './TimeWindowPicker';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

describe.each(['dark', 'light'] as const)('Builder kit in %s theme', (scheme) => {
  beforeEach(() => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(scheme);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('StepIndicator fills finished and current steps', async () => {
    await render(<StepIndicator total={4} current={2} label="Крок 2 з 4" />);
    expect(screen.getByRole('progressbar', { name: 'Крок 2 з 4' })).toBeTruthy();
    expect(screen.getAllByTestId('step-done')).toHaveLength(2);
    expect(screen.getAllByTestId('step-todo')).toHaveLength(2);
  });

  it('StepIndicator clamps an out-of-range current step', async () => {
    await render(<StepIndicator total={3} current={9} label="Крок 3 з 3" />);
    expect(screen.getAllByTestId('step-done')).toHaveLength(3);
  });

  it('ChoiceCard is a radio that reports selection and presses', async () => {
    const onPress = jest.fn();
    await render(
      <ChoiceCard
        title="Я заклад"
        subtitle="Створюю події та офери"
        icon={<Text>🏠</Text>}
        selected
        onPress={onPress}
      />,
    );
    const card = screen.getByRole('radio', { name: 'Я заклад, Створюю події та офери' });
    expect(card.props.accessibilityState).toMatchObject({ selected: true });
    await fireEvent.press(card);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['draft', 'Чернетка'],
    ['scheduled', 'Заплановано'],
    ['active', 'Активний'],
    ['paused', 'Пауза'],
    ['ended', 'Завершено'],
  ] as const)('StatusPill shows %s as %s', async (status, text) => {
    await render(<StatusPill status={status} />);
    expect(screen.getByText(text)).toBeTruthy();
  });

  it('Stepper changes by step and stops at the minimum', async () => {
    const onChange = jest.fn();
    await render(<Stepper label="Ліміт" value={1} min={1} max={3} onChange={onChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Більше, Ліміт' }));
    expect(onChange).toHaveBeenCalledWith(2);
    const minus = screen.getByRole('button', { name: 'Менше, Ліміт' });
    expect(minus.props.accessibilityState).toMatchObject({ disabled: true });
    await fireEvent.press(minus);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Stepper disables + at the maximum', async () => {
    await render(<Stepper label="Ліміт" value={3} max={3} onChange={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Більше, Ліміт' }).props.accessibilityState,
    ).toMatchObject({ disabled: true });
  });

  it('TimeWindowPicker reports each end as Kyiv time and shows the error', async () => {
    const onChange = jest.fn();
    const from = new Date('2026-06-13T18:00:00Z');
    await render(
      <TimeWindowPicker value={{ from, to: null }} onChange={onChange} error="Кінець раніше" />,
    );
    expect(screen.getByDisplayValue('13.06.2026 21:00')).toBeTruthy();
    expect(screen.getByText('Кінець раніше')).toBeTruthy();
    await fireEvent.changeText(screen.getByLabelText('Кінець'), '13.06.2026 23:30');
    expect(onChange).toHaveBeenCalledWith({ from, to: new Date('2026-06-13T20:30:00Z') });
  });

  it('ImageUploader offers add, then replace and remove', async () => {
    const onPick = jest.fn();
    const onRemove = jest.fn();
    const view = await render(
      <ImageUploader label="Обкладинка" onPick={onPick} onRemove={onRemove} />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Додати фото, Обкладинка' }));
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Видалити фото')).toBeNull();

    await view.rerender(
      <ImageUploader
        label="Обкладинка"
        uri="https://example.com/a.jpg"
        onPick={onPick}
        onRemove={onRemove}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Видалити фото, Обкладинка' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Замінити фото, Обкладинка' })).toBeTruthy();
  });

  it('ImageUploader shows progress and blocks actions while uploading', async () => {
    const onPick = jest.fn();
    await render(
      <ImageUploader
        label="Обкладинка"
        uri="https://example.com/a.jpg"
        progress={0.4}
        onPick={onPick}
        onRemove={jest.fn()}
      />,
    );
    expect(screen.getByText('Завантаження 40%')).toBeTruthy();
    expect(screen.queryByText('Видалити фото')).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Замінити фото, Обкладинка' }));
    expect(onPick).not.toHaveBeenCalled();
  });

  it('StatTile reads as one labelled element', async () => {
    await render(<StatTile value="128" label="Взято" />);
    expect(screen.getByLabelText('Взято: 128')).toBeTruthy();
  });

  it('OfferPreview renders badge, card and QR header from the draft', async () => {
    await render(
      <OfferPreview
        draft={{
          title: '−20% на вхід',
          condition: 'Покажи QR на вході до 23:00',
          venueName: 'Club Hola',
          validUntil: 'Діє до 23:00',
        }}
      />,
    );
    expect(screen.getAllByText('−20% на вхід')).toHaveLength(3);
    expect(screen.getByText('Покажи QR на вході до 23:00')).toBeTruthy();
    expect(screen.getByText('Club Hola')).toBeTruthy();
    expect(screen.getByText('Діє до 23:00')).toBeTruthy();
    expect(screen.getByText('Взяти офер')).toBeTruthy();
  });
});
