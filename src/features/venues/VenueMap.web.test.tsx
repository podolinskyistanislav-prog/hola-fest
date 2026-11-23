import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';

import { VenueMap } from './VenueMap.web';
import type { MappableVenue } from './venueMap';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@expo/vector-icons', () => ({ Feather: () => null }));

const bavovna: MappableVenue = {
  id: 'v1',
  slug: 'bavovna',
  name: 'Bavovna',
  address: 'вул. Хрещатик, 1',
  lat: 50.45,
  lng: 30.52,
  hasShelter: false,
};
const panorama: MappableVenue = {
  ...bavovna,
  id: 'v2',
  slug: 'panorama-bar',
  name: 'Panorama Bar',
};

function renderMap(selectedId: string | null, onSelectVenue = jest.fn()) {
  return render(
    <VenueMap
      venues={[bavovna, panorama]}
      selectedId={selectedId}
      todayEvents={new Map()}
      onSelectVenue={onSelectVenue}
      onOpenVenue={jest.fn()}
      onOpenEvent={jest.fn()}
      bottomInset={90}
    />,
  );
}

describe('VenueMap (web)', () => {
  it('draws a pin for every venue and a single card for the selected one', async () => {
    await renderMap('v1');
    expect(screen.getByRole('button', { name: 'Panorama Bar' })).toBeTruthy();
    expect(screen.getAllByRole('button', { name: t('map.openEvent') })).toHaveLength(1);
  });

  it('shows no card without a selection', async () => {
    await renderMap(null);
    expect(screen.queryByRole('button', { name: t('map.openEvent') })).toBeNull();
  });

  it('selects a venue when its pin is pressed', async () => {
    const onSelectVenue = jest.fn();
    await renderMap(null, onSelectVenue);
    await fireEvent.press(screen.getByRole('button', { name: 'Panorama Bar' }));
    expect(onSelectVenue).toHaveBeenCalledWith('v2');
  });
});
