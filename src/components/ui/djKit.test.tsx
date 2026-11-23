import { fireEvent, render, screen } from '@testing-library/react-native';
import * as ReactNative from 'react-native';

import { DjAvatar, djInitials } from './DjAvatar';
import { DjRow } from './DjRow';
import { GigRow } from './GigRow';
import { TabBar } from './TabBar';
import { TabIcon, type TabIconName } from './TabIcon';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

describe('djInitials', () => {
  it('takes up to two initials and skips the DJ prefix', () => {
    expect(djInitials('DJ Vlad Kotyk')).toBe('VK');
    expect(djInitials('Nova')).toBe('N');
    expect(djInitials('DJ')).toBe('D');
  });
});

describe.each(['dark', 'light'] as const)('DJ kit in %s theme', (scheme) => {
  beforeEach(() => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(scheme);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('TabBar shows four tabs including Діджеї', async () => {
    const defs: readonly [string, string, TabIconName][] = [
      ['index', 'Події', 'calendar'],
      ['map', 'Карта', 'map-pin'],
      ['djs', 'Діджеї', 'headphones'],
      ['tickets', 'Мої QR', 'qr'],
    ];
    const onSelect = jest.fn();
    await render(
      <TabBar
        items={defs.map(([id, label, icon]) => ({
          id,
          label,
          renderIcon: (p: { color: string; size: number }) => <TabIcon name={icon} {...p} />,
        }))}
        activeId="djs"
        onSelect={onSelect}
      />,
    );
    expect(screen.getAllByRole('tab')).toHaveLength(4);
    expect(screen.getByRole('tab', { name: 'Діджеї' })).toBeSelected();
    await fireEvent.press(screen.getByRole('tab', { name: 'Мої QR' }));
    expect(onSelect).toHaveBeenCalledWith('tickets');
  });

  it('DjAvatar shows initials without a photo, in both sizes', async () => {
    await render(<DjAvatar name="DJ Vlad Kotyk" size={96} />);
    expect(screen.getByText('VK', { includeHiddenElements: true })).toBeTruthy();
  });

  it('DjRow shows genres and next gig and is pressable', async () => {
    const onPress = jest.fn();
    await render(
      <DjRow
        name="Nova"
        genresLine="Techno · House"
        nextGigLine="Пт, 27 листопада · Котельня"
        onPress={onPress}
      />,
    );
    expect(screen.getByText('Techno · House')).toBeTruthy();
    await fireEvent.press(
      screen.getByRole('button', { name: 'Nova, Techno · House, Пт, 27 листопада · Котельня' }),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('DjRow falls back to a placeholder when there is no gig', async () => {
    await render(<DjRow name="Nova" />);
    expect(screen.getByText('Найближчих виступів немає')).toBeTruthy();
  });

  it('GigRow shows date, event, venue, time and the offer pill', async () => {
    await render(
      <GigRow
        day="27"
        month="лис"
        title="House Friday"
        venue="Котельня"
        time="22:00"
        offerText="−15%"
      />,
    );
    expect(screen.getByText('27', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText('Котельня · 22:00')).toBeTruthy();
    expect(screen.getByText('−15%')).toBeTruthy();
  });

  it('GigRow has no pill without an offer', async () => {
    await render(
      <GigRow day="27" month="лис" title="House Friday" venue="Котельня" time="22:00" />,
    );
    expect(screen.queryByText('−15%')).toBeNull();
  });
});
