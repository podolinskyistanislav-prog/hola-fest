import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from './Button';
import { Chip } from './Chip';
import { OfferRow } from './OfferRow';
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
