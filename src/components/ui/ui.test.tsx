import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from './Button';
import { Chip } from './Chip';
import { DayStrip } from './DayStrip';
import { EventCard } from './EventCard';
import { OfferRow } from './OfferRow';
import { TAB_BAR_FLOAT_GAP, TAB_BAR_HEIGHT, TabBar, tabBarInset } from './TabBar';
import { TextField } from './TextField';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

describe('Button', () => {
  it('renders an accessible button and calls onPress', async () => {
    const onPress = jest.fn();
    await render(<Button label="Взяти офер" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Взяти офер' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(<Button label="Взяти офер" onPress={onPress} disabled />);
    await fireEvent.press(screen.getByRole('button', { name: 'Взяти офер' }));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders the glass variant', async () => {
    await render(<Button label="Uklon" variant="glass" />);
    expect(screen.getByText('Uklon')).toBeTruthy();
  });
});

describe('Chip', () => {
  it('exposes its selected state to screen readers', async () => {
    await render(<Chip label="Techno" selected />);
    expect(screen.getByRole('button', { name: 'Techno' })).toHaveProp(
      'accessibilityState',
      expect.objectContaining({ selected: true }),
    );
  });
});

describe('DayStrip', () => {
  const days = [
    { id: '2026-06-13', weekday: 'Сб', date: '13' },
    { id: '2026-06-14', weekday: 'Нд', date: '14', accessibilityLabel: 'Неділя, 14 червня' },
  ];

  it('marks only the selected day as selected', async () => {
    await render(<DayStrip days={days} selectedId="2026-06-14" onSelect={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Неділя, 14 червня' })).toHaveProp(
      'accessibilityState',
      expect.objectContaining({ selected: true }),
    );
    expect(screen.getByRole('button', { name: 'Сб 13' })).toHaveProp(
      'accessibilityState',
      expect.objectContaining({ selected: false }),
    );
  });

  it('reports the id of the pressed day', async () => {
    const onSelect = jest.fn();
    await render(<DayStrip days={days} selectedId="2026-06-14" onSelect={onSelect} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Сб 13' }));
    expect(onSelect).toHaveBeenCalledWith('2026-06-13');
  });
});

describe('TextField', () => {
  it('labels the input and reports typed text', async () => {
    const onChangeText = jest.fn();
    await render(<TextField label="Email" onChangeText={onChangeText} />);
    await fireEvent.changeText(screen.getByLabelText('Email'), 'a@b.ua');
    expect(onChangeText).toHaveBeenCalledWith('a@b.ua');
  });

  it('shows the error message as an alert', async () => {
    await render(<TextField label="Email" error="Невірний email" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Невірний email');
  });

  it('shows no alert without an error', async () => {
    await render(<TextField label="Email" />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('hides secure text and toggles visibility', async () => {
    await render(<TextField label="Пароль" secure />);
    expect(screen.getByLabelText('Пароль')).toHaveProp('secureTextEntry', true);
    await fireEvent.press(screen.getByRole('button', { name: 'Показати пароль' }));
    expect(screen.getByLabelText('Пароль')).toHaveProp('secureTextEntry', false);
    expect(screen.getByRole('button', { name: 'Сховати пароль' })).toBeTruthy();
  });

  it('is not editable when disabled', async () => {
    await render(<TextField label="Email" editable={false} />);
    expect(screen.getByLabelText('Email')).toHaveProp('editable', false);
  });
});

describe('OfferRow', () => {
  it('shows terms, remaining hint and the action while available', async () => {
    await render(
      <OfferRow
        title="Знижка 20%"
        terms="На весь бар"
        status="available"
        remaining={12}
        limit={50}
        action={<Button label="Взяти" />}
      />,
    );
    expect(screen.getByText('Знижка 20%')).toBeTruthy();
    expect(screen.getByText('Залишилось 12 із 50')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Взяти' })).toBeTruthy();
  });

  it.each([
    ['claimed', 'Ви взяли цей офер'],
    ['soldOut', 'Розібрали'],
    ['expired', 'Офер завершився'],
  ] as const)('shows %s state without the action', async (status, label) => {
    await render(
      <OfferRow
        title="Знижка 20%"
        terms="На весь бар"
        status={status}
        action={<Button label="Взяти" />}
      />,
    );
    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Взяти' })).toBeNull();
  });
});

describe('TabBar', () => {
  const items = [
    { id: 'events', label: 'Події', renderIcon: () => null },
    { id: 'offers', label: 'Офери', accessibilityLabel: 'Мої офери', renderIcon: () => null },
  ];

  it('marks the active tab as selected', async () => {
    await render(<TabBar items={items} activeId="events" onSelect={jest.fn()} />);
    expect(screen.getByRole('tab', { name: 'Події' })).toBeSelected();
    expect(screen.getByRole('tab', { name: 'Мої офери' })).not.toBeSelected();
  });

  it('calls onSelect with the pressed tab id', async () => {
    const onSelect = jest.fn();
    await render(<TabBar items={items} activeId="events" onSelect={onSelect} />);
    await fireEvent.press(screen.getByRole('tab', { name: 'Мої офери' }));
    expect(onSelect).toHaveBeenCalledWith('offers');
  });

  it('gives icons a color and size for the current state', async () => {
    const renderIcon = jest.fn(() => null);
    await render(
      <TabBar items={[{ id: 'a', label: 'A', renderIcon }]} activeId="a" onSelect={jest.fn()} />,
    );
    expect(renderIcon).toHaveBeenCalledWith({ color: expect.any(String), size: 24 });
  });
});

describe('EventCard', () => {
  const base = { title: 'Techno Night', venue: 'Closer', time: '22:00' };

  it('shows title, venue, time, price and offer badge', async () => {
    await render(<EventCard {...base} priceFrom="від 350 ₴" offerBadge="−20% на напої" />);
    for (const text of ['Techno Night', 'Closer', '22:00', 'від 350 ₴', '−20% на напої']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
  });

  it('omits price when absent', async () => {
    await render(<EventCard {...base} />);
    expect(screen.queryByText('від 350 ₴')).toBeNull();
  });

  it('is a button with a summary label that calls onPress', async () => {
    const onPress = jest.fn();
    await render(<EventCard {...base} priceFrom="від 350 ₴" onPress={onPress} />);
    await fireEvent.press(
      screen.getByRole('button', { name: 'Techno Night, Closer, 22:00, від 350 ₴' }),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the pink cover variant', async () => {
    await render(<EventCard {...base} coverColor="pink" />);
    expect(screen.getByText('Techno Night')).toBeTruthy();
  });
});

describe('tabBarInset', () => {
  it('clears the bar, its float gap and the safe area', () => {
    expect(tabBarInset(34)).toBeGreaterThan(TAB_BAR_HEIGHT + TAB_BAR_FLOAT_GAP + 34);
    expect(tabBarInset(0)).toBeLessThan(tabBarInset(34));
  });
});
