import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import * as ReactNative from 'react-native';

import { brand } from '@/theme';

import { AccentBlobs } from './AccentBlobs';
import { GlassIconButton } from './GlassIconButton';
import { GlassSearchField, SEARCH_FIELD_HEIGHT } from './GlassSearchField';
import { INFO_CHIP_HEIGHT, InfoChip } from './InfoChip';
import { LINEUP_CHIP_HEIGHT, LineupChip } from './LineupChip';
import { MAP_PIN_DOT_SIZE, MAP_PIN_LABEL_HEIGHT, MapPin } from './MapPin';
import { MapVenueCard } from './MapVenueCard';
import { OFFER_CTA_HEIGHT, OfferCard } from './OfferCard';
import { QRCard } from './QRCard';
import { TAXI_BAR_HEIGHT, TaxiBar } from './TaxiBar';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

const flat = (element: { props: { style?: unknown } }) =>
  StyleSheet.flatten(element.props.style as never) as Record<string, unknown>;

describe.each(['dark', 'light'] as const)('UI kit in %s theme', (scheme) => {
  beforeEach(() => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(scheme);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('GlassIconButton is a 44px labelled button', async () => {
    const onPress = jest.fn();
    await render(<GlassIconButton icon="back" label="Назад" kind="cover" onPress={onPress} />);
    const button = screen.getByRole('button', { name: 'Назад' });
    await fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(flat(button.children[0] as never).width).toBe(44);
  });

  it('InfoChip is 32 high with and without an icon', async () => {
    await render(
      <>
        <InfoChip label="До комендантської" icon="check" />
        <InfoChip label="Укриття: [уточнити]" icon="shield" />
        <InfoChip label="від 300 ₴" />
      </>,
    );
    for (const name of ['До комендантської', 'Укриття: [уточнити]', 'від 300 ₴']) {
      expect(flat(screen.getByLabelText(name)).height).toBe(INFO_CHIP_HEIGHT);
    }
    expect(INFO_CHIP_HEIGHT).toBe(32);
  });

  it('LineupChip shows the placeholder in an outlined 32px chip', async () => {
    await render(<LineupChip label="[Артист 1]" />);
    const chip = screen.getByLabelText('[Артист 1]');
    expect(flat(chip).height).toBe(LINEUP_CHIP_HEIGHT);
    expect(flat(chip).borderWidth).toBe(1);
  });

  it('OfferCard shows every element and fires the CTA', async () => {
    const onPress = jest.fn();
    await render(
      <OfferCard
        kicker="ТІЛЬКИ В HOLA"
        title="−20% на вхід"
        condition="Покажи QR на вході до 22:00"
        ctaLabel="Взяти офер"
        onPress={onPress}
      />,
    );
    for (const text of ['ТІЛЬКИ В HOLA', '−20% на вхід', 'Покажи QR на вході до 22:00']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
    const cta = screen.getByRole('button', { name: 'Взяти офер' });
    expect(flat(cta)).toMatchObject({ height: OFFER_CTA_HEIGHT, backgroundColor: '#000000' });
    expect(OFFER_CTA_HEIGHT).toBe(50);
    await fireEvent.press(cta);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(flat(screen.getByText('−20% на вхід')).fontFamily).toBe('Unbounded_700Bold');
  });

  it('TaxiBar is 72 high with a button per provider', async () => {
    const onUklon = jest.fn();
    await render(
      <TaxiBar
        label="Поїхати"
        providers={[
          { id: 'uklon', label: 'Uklon', onPress: onUklon },
          { id: 'bolt', label: 'Bolt' },
          { id: 'uber', label: 'Uber' },
        ]}
      />,
    );
    expect(screen.getByText('Поїхати')).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(3);
    await fireEvent.press(screen.getByRole('button', { name: 'Uklon' }));
    expect(onUklon).toHaveBeenCalledTimes(1);
    expect(TAXI_BAR_HEIGHT).toBe(72);
  });

  it('QRCard shows the QR, title, details, code label and countdown', async () => {
    await render(
      <QRCard
        token="claim-token-123"
        offerTitle="−20% на вхід"
        details="Techno Night · сьогодні до 22:00"
        codeLabel="Одноразовий код"
        countdown="Діє ще 2 год 14 хв"
        qrLabel="QR-код офера"
      />,
    );
    expect(screen.getByLabelText('QR-код офера')).toBeTruthy();
    for (const text of [
      '−20% на вхід',
      'Techno Night · сьогодні до 22:00',
      'Одноразовий код',
      'Діє ще 2 год 14 хв',
    ]) {
      expect(screen.getByText(text)).toBeTruthy();
    }
    expect(screen.queryByText('claim-token-123')).toBeNull();
  });

  it('AccentBlobs draws a yellow and a pink circle', async () => {
    await render(<AccentBlobs />);
    const hidden = { includeHiddenElements: true };
    expect(flat(screen.getByTestId('accent-blob-yellow', hidden)).backgroundColor).toBe(
      brand.yellow,
    );
    expect(flat(screen.getByTestId('accent-blob-pink', hidden)).backgroundColor).toBe(brand.pink);
  });

  it('MapPin shows the name pill and a 16px dot in the venue color', async () => {
    await render(<MapPin label="Panorama Bar" color="pink" />);
    expect(screen.getByText('Panorama Bar')).toBeTruthy();
    expect(MAP_PIN_DOT_SIZE).toBe(16);
    expect(MAP_PIN_LABEL_HEIGHT).toBe(28);
    const pill = screen.getByText('Panorama Bar').parent;
    expect(flat(pill as never).backgroundColor).toBe(brand.pink);
  });

  it('MapVenueCard shows every element and both actions', async () => {
    const onOpenEvent = jest.fn();
    const onTaxi = jest.fn();
    await render(
      <MapVenueCard
        name="Panorama Bar"
        address="вул. Хрещатик, 1/2"
        todayEvent="Сьогодні: Rooftop Sunset · 19:00"
        eventLabel="Подія"
        taxiLabel="Поїхати"
        onOpenEvent={onOpenEvent}
        onTaxi={onTaxi}
      />,
    );
    for (const text of ['Panorama Bar', 'вул. Хрещатик, 1/2', 'Сьогодні: Rooftop Sunset · 19:00']) {
      expect(screen.getByText(text)).toBeTruthy();
    }
    await fireEvent.press(screen.getByRole('button', { name: 'Подія' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Поїхати' }));
    expect(onOpenEvent).toHaveBeenCalledTimes(1);
    expect(onTaxi).toHaveBeenCalledTimes(1);
  });

  it('GlassSearchField is a 52px labelled input with the placeholder', async () => {
    const onChangeText = jest.fn();
    await render(
      <GlassSearchField
        label="Пошук клубу"
        placeholder="Клуби поруч"
        onChangeText={onChangeText}
      />,
    );
    const input = screen.getByLabelText('Пошук клубу');
    expect(input).toHaveProp('placeholder', 'Клуби поруч');
    await fireEvent.changeText(input, 'Bav');
    expect(onChangeText).toHaveBeenCalledWith('Bav');
    expect(SEARCH_FIELD_HEIGHT).toBe(52);
  });
});
