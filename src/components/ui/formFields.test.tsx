import { fireEvent, render, screen } from '@testing-library/react-native';
import { useState } from 'react';

import { DateTimeField, formatDateTime, parseDateTime } from './DateTimeField';
import { StringListField } from './StringListField';
import { SwitchField } from './SwitchField';
import { TextField } from './TextField';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

describe('formatDateTime / parseDateTime', () => {
  it('round-trips a local date and time', () => {
    const date = new Date('2026-06-13T18:05:00Z');
    expect(formatDateTime(date)).toBe('13.06.2026 21:05');
    expect(parseDateTime('13.06.2026 21:05')?.getTime()).toBe(date.getTime());
  });

  it('rejects incomplete and impossible values', () => {
    expect(parseDateTime('13.06.2026')).toBeNull();
    expect(parseDateTime('31.02.2026 10:00')).toBeNull();
    expect(parseDateTime('13.06.2026 25:00')).toBeNull();
    expect(parseDateTime('')).toBeNull();
    expect(parseDateTime('29.03.2026 03:30')).toBeNull();
  });

  it('uses winter time (UTC+2) in winter', () => {
    const date = new Date('2026-01-15T10:00:00Z');
    expect(formatDateTime(date)).toBe('15.01.2026 12:00');
    expect(parseDateTime('15.01.2026 12:00')?.toISOString()).toBe(date.toISOString());
  });
});

describe('DateTimeField', () => {
  it('shows the formatted value', async () => {
    await render(
      <DateTimeField
        label="Початок"
        value={new Date('2026-06-13T18:05:00Z')}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByLabelText('Початок')).toHaveProp('value', '13.06.2026 21:05');
  });

  it('reports a Date when the text is complete and null when not', async () => {
    const onChange = jest.fn();
    await render(<DateTimeField label="Початок" value={null} onChange={onChange} />);
    await fireEvent.changeText(screen.getByLabelText('Початок'), '13.06.2026 21:05');
    expect(onChange).toHaveBeenLastCalledWith(new Date('2026-06-13T18:05:00Z'));
    await fireEvent.changeText(screen.getByLabelText('Початок'), '13.06');
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('shows the error as an alert', async () => {
    await render(
      <DateTimeField label="Початок" value={null} onChange={jest.fn()} error="Вкажіть дату" />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Вкажіть дату');
  });
});

describe('SwitchField', () => {
  it('exposes switch state and reports changes', async () => {
    const onValueChange = jest.fn();
    await render(<SwitchField label="Опубліковано" value={false} onValueChange={onValueChange} />);
    const toggle = screen.getByRole('switch', { name: 'Опубліковано' });
    expect(toggle).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
    await fireEvent(toggle, 'valueChange', true);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('renders the hint', async () => {
    await render(
      <SwitchField label="Активний" value hint="Видно гостям" onValueChange={jest.fn()} />,
    );
    expect(screen.getByText('Видно гостям')).toBeTruthy();
  });
});

describe('StringListField', () => {
  function Harness({ maxItems }: { maxItems?: number }) {
    const [items, setItems] = useState(['DJ A']);
    return <StringListField label="Лайнап" items={items} onChange={setItems} maxItems={maxItems} />;
  }

  it('edits, adds and removes rows', async () => {
    await render(<Harness />);
    await fireEvent.changeText(screen.getByLabelText('Лайнап 1'), 'DJ B');
    expect(screen.getByLabelText('Лайнап 1')).toHaveProp('value', 'DJ B');
    await fireEvent.press(screen.getByRole('button', { name: 'Додати' }));
    expect(screen.getByLabelText('Лайнап 2')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Видалити: Лайнап 1' }));
    expect(screen.queryByLabelText('Лайнап 2')).toBeNull();
    expect(screen.getByLabelText('Лайнап 1')).toHaveProp('value', '');
  });

  it('hides the add button at maxItems', async () => {
    await render(<Harness maxItems={1} />);
    expect(screen.queryByRole('button', { name: 'Додати' })).toBeNull();
  });

  it('shows the error as an alert', async () => {
    await render(
      <StringListField label="Лайнап" items={[]} onChange={jest.fn()} error="Забагато" />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Забагато');
  });
});

describe('TextField multiline', () => {
  it('supports multiline input', async () => {
    await render(<TextField label="Опис" multiline />);
    expect(screen.getByLabelText('Опис')).toHaveProp('multiline', true);
  });
});
