import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet, useColorScheme } from 'react-native';

import { brand, layout, palettes } from '@/theme';

import { DayStrip } from './DayStrip';
import { EventCarouselCard } from './EventCarouselCard';
import { FilterChips } from './FilterChips';
import { formatHomeDate, HomeHeader } from './HomeHeader';
import { SectionHeader } from './SectionHeader';
import { TabBar, tabBarInset } from './TabBar';
import { TabIcon } from './TabIcon';
import { WeekOfferRow } from './WeekOfferRow';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedScheme = jest.mocked(useColorScheme);

function flat(node: { props: { style?: unknown } } | null | undefined) {
  return StyleSheet.flatten(node?.props.style as never) ?? {};
}

describe.each(['dark', 'light'] as const)('home components (%s)', (scheme) => {
  const colors = palettes[scheme];

  beforeEach(() => {
    mockedScheme.mockReturnValue(scheme);
  });

  describe('TabBar', () => {
    const icon = (name: 'calendar' | 'map-pin' | 'qr') =>
      function renderIcon() {
        return <TabIcon name={name} color="#000000" size={22} />;
      };
    const items = [
      { id: 'index', label: 'Події', renderIcon: icon('calendar') },
      { id: 'map', label: 'Карта', renderIcon: icon('map-pin') },
      { id: 'qr', label: 'Мої QR', renderIcon: icon('qr') },
    ];

    it('shows three tabs, marks the active one and reports presses', async () => {
      const onSelect = jest.fn();
      await render(<TabBar items={items} activeId="index" onSelect={onSelect} />);
      expect(screen.getAllByRole('tab')).toHaveLength(3);
      expect(screen.getByRole('tab', { name: 'Події' })).toBeSelected();
      await fireEvent.press(screen.getByRole('tab', { name: 'Мої QR' }));
      expect(onSelect).toHaveBeenCalledWith('qr');
    });

    it('colors the active label with the accent and the others subtle', async () => {
      await render(<TabBar items={items} activeId="index" onSelect={jest.fn()} />);
      expect(flat(screen.getByText('Події')).color).toBe(colors.accent);
      expect(flat(screen.getByText('Карта')).color).toBe(colors.textSubtle);
    });

    it('is 68 high with a 34 radius, inset 20 sideways and 30 from the bottom', async () => {
      await render(<TabBar items={items} activeId="index" onSelect={jest.fn()} />);
      const tab = screen.getByRole('tab', { name: 'Події' });
      const bar = tab.parent;
      expect(flat(bar).height).toBe(68);
      expect(flat(bar).borderRadius).toBe(34);
      // bar -> shadow wrapper -> positioned wrapper
      expect(flat(bar?.parent?.parent)).toMatchObject({ left: 20, right: 20, bottom: 30 });
    });

    it('floats above a larger safe area and reserves room for it', async () => {
      await render(
        <TabBar items={items} activeId="index" onSelect={jest.fn()} safeAreaBottom={34} />,
      );
      const wrapper = screen.getByRole('tab', { name: 'Події' }).parent?.parent?.parent;
      expect(flat(wrapper).bottom).toBe(34);
      expect(tabBarInset(34)).toBe(68 + 34 + 16);
      expect(tabBarInset(0)).toBe(68 + 30 + 16);
    });
  });

  describe('HomeHeader', () => {
    it('shows title, Kyiv date and a labelled search button', async () => {
      const onSearchPress = jest.fn();
      await render(
        <HomeHeader
          title="Сьогодні в Києві"
          date={new Date('2026-11-04T10:00:00Z')}
          searchLabel="Пошук"
          onSearchPress={onSearchPress}
        />,
      );
      expect(screen.getByText('Сьогодні в Києві')).toBeTruthy();
      expect(screen.getByText('Середа, 4 листопада')).toBeTruthy();
      expect(screen.getByLabelText('Hola')).toBeTruthy();
      await fireEvent.press(screen.getByRole('button', { name: 'Пошук' }));
      expect(onSearchPress).toHaveBeenCalledTimes(1);
    });

    it('sizes the logo 36 with radius 10', async () => {
      await render(
        <HomeHeader title="T" date={new Date('2026-11-04T10:00:00Z')} searchLabel="Пошук" />,
      );
      expect(flat(screen.getByLabelText('Hola'))).toMatchObject({
        width: 36,
        height: 36,
        borderRadius: 10,
      });
      expect(layout.searchButtonSize).toBe(44);
    });
  });

  describe('DayStrip', () => {
    const days = [
      { id: '2026-11-04', weekday: 'Ср', date: '4' },
      { id: '2026-11-05', weekday: 'Чт', date: '5' },
      { id: '2026-11-06', weekday: 'Пт', date: '6', hasEvents: true },
      { id: '2026-11-07', weekday: 'Сб', date: '7', hasEvents: true },
      { id: '2026-11-08', weekday: 'Нд', date: '8', hasEvents: true },
    ];

    it('renders 5 equal tiles 60 high with radius 20', async () => {
      await render(<DayStrip days={days} selectedId="2026-11-04" onSelect={jest.fn()} />);
      const tiles = screen.getAllByRole('button');
      expect(tiles).toHaveLength(5);
      for (const tile of tiles) {
        expect(flat(tile)).toMatchObject({ flex: 1, height: 60, borderRadius: 20 });
      }
    });

    it('fills the selected tile yellow and dots only days with events', async () => {
      await render(<DayStrip days={days} selectedId="2026-11-04" onSelect={jest.fn()} />);
      expect(flat(screen.getByRole('button', { name: 'Ср 4' })).backgroundColor).toBe(brand.yellow);
      expect(flat(screen.getByRole('button', { name: 'Чт 5' }))).toMatchObject({
        backgroundColor: colors.surfaceRaised,
        borderColor: colors.border,
      });
      const hidden = { includeHiddenElements: true };
      expect(screen.queryByTestId('day-dot-2026-11-04', hidden)).toBeNull();
      expect(screen.queryByTestId('day-dot-2026-11-05', hidden)).toBeNull();
      expect(flat(screen.getByTestId('day-dot-2026-11-06', hidden))).toMatchObject({
        width: 5,
        height: 5,
        backgroundColor: brand.pink,
      });
    });

    it('reports the pressed day', async () => {
      const onSelect = jest.fn();
      await render(<DayStrip days={days} selectedId="2026-11-04" onSelect={onSelect} />);
      await fireEvent.press(screen.getByRole('button', { name: 'Пт 6' }));
      expect(onSelect).toHaveBeenCalledWith('2026-11-06');
    });
  });

  describe('FilterChips', () => {
    const chips = [
      { id: 'all', label: 'Усі' },
      { id: 'offer', label: 'З офером' },
    ];

    it('is 34 high; the selected chip is inverse and the others raised', async () => {
      await render(<FilterChips chips={chips} selectedId="all" onSelect={jest.fn()} />);
      expect(flat(screen.getByRole('button', { name: 'Усі' }))).toMatchObject({
        height: 34,
        backgroundColor: colors.text,
      });
      expect(flat(screen.getByText('Усі')).color).toBe(colors.background);
      expect(flat(screen.getByRole('button', { name: 'З офером' })).backgroundColor).toBe(
        colors.surfaceRaised,
      );
    });

    it('reports the pressed chip', async () => {
      const onSelect = jest.fn();
      await render(<FilterChips chips={chips} selectedId="all" onSelect={onSelect} />);
      await fireEvent.press(screen.getByRole('button', { name: 'З офером' }));
      expect(onSelect).toHaveBeenCalledWith('offer');
    });
  });

  describe('SectionHeader', () => {
    it('shows the title and an accent link that can be pressed', async () => {
      const onActionPress = jest.fn();
      await render(
        <SectionHeader
          title="Сьогодні · 2 події"
          actionLabel="На карті"
          onActionPress={onActionPress}
        />,
      );
      expect(screen.getByRole('header')).toHaveTextContent('Сьогодні · 2 події');
      expect(flat(screen.getByText('На карті')).color).toBe(colors.accent);
      await fireEvent.press(screen.getByRole('link', { name: 'На карті' }));
      expect(onActionPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('EventCarouselCard', () => {
    const base = { title: 'Techno Night', venue: 'Bavovna', timeRange: '20:00 – 23:30' };

    it('shows every element of the mockup card', async () => {
      await render(<EventCarouselCard {...base} priceFrom="від 300 ₴" offerBadge="−20% на вхід" />);
      for (const text of ['Techno Night', 'Bavovna · 20:00 – 23:30', 'від 300 ₴', '−20% на вхід']) {
        expect(screen.getByText(text)).toBeTruthy();
      }
    });

    it('is 290 x 230 with radius 28 and a yellow or pink cover', async () => {
      await render(<EventCarouselCard {...base} />);
      expect(flat(screen.getByRole('button'))).toMatchObject({
        width: 290,
        height: 230,
        borderRadius: 28,
        backgroundColor: brand.yellow,
      });
    });

    it('uses the pink cover when asked', async () => {
      await render(<EventCarouselCard {...base} coverColor="pink" />);
      expect(flat(screen.getByRole('button')).backgroundColor).toBe(brand.pink);
    });

    it('leaves out the badge and price when the event has none, and presses', async () => {
      const onPress = jest.fn();
      await render(<EventCarouselCard {...base} onPress={onPress} />);
      expect(screen.queryByText('від 300 ₴')).toBeNull();
      await fireEvent.press(
        screen.getByRole('button', { name: 'Techno Night, Bavovna · 20:00 – 23:30' }),
      );
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('renders with a cover image instead of stars', async () => {
      await render(<EventCarouselCard {...base} coverImageUri="https://example.com/cover.jpg" />);
      expect(screen.getByRole('button')).toBeTruthy();
    });
  });

  describe('WeekOfferRow', () => {
    it('shows the title, date and venue and the offer pill', async () => {
      const onPress = jest.fn();
      await render(
        <WeekOfferRow
          title="House Friday"
          dateAndVenue="Пт, 6 листопада · Bavovna"
          offerText="−15%"
          onPress={onPress}
        />,
      );
      expect(screen.getByText('House Friday')).toBeTruthy();
      expect(screen.getByText('Пт, 6 листопада · Bavovna')).toBeTruthy();
      expect(screen.getByText('−15%')).toBeTruthy();
      await fireEvent.press(screen.getByRole('button'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('uses the surface, row border and radius 22; the pill is the accent', async () => {
      await render(
        <WeekOfferRow
          title="Weekend Sunset"
          dateAndVenue="Сб, 7 листопада · Panorama Bar"
          offerText="Шот у подарунок"
          accent="pink"
        />,
      );
      expect(flat(screen.getByRole('button'))).toMatchObject({
        backgroundColor: colors.surface,
        borderColor: colors.rowBorder,
        borderRadius: 22,
      });
      expect(flat(screen.getByText('Шот у подарунок').parent)).toMatchObject({
        backgroundColor: brand.pink,
        height: 30,
      });
    });
  });
});

describe('formatHomeDate', () => {
  it('uses the Kyiv calendar day, not the device day', () => {
    expect(formatHomeDate(new Date('2026-11-03T22:30:00Z'))).toBe('Середа, 4 листопада');
    expect(formatHomeDate(new Date('2026-11-04T22:30:00Z'))).toBe('Четвер, 5 листопада');
  });
});
