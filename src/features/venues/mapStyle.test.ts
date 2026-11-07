import { palettes } from '@/theme';

import { darkMapStyle } from './mapStyle';

describe('darkMapStyle', () => {
  it('paints the base map and water from the dark theme', () => {
    const rules = darkMapStyle(palettes.dark);
    expect(rules[0]).toEqual({
      elementType: 'geometry',
      stylers: [{ color: palettes.dark.surface }],
    });
    expect(rules.find((rule) => rule.featureType === 'water')?.stylers).toEqual([
      { color: palettes.dark.background },
    ]);
  });

  it('hides points of interest', () => {
    const poi = darkMapStyle(palettes.dark).find((rule) => rule.featureType === 'poi');
    expect(poi?.stylers).toEqual([{ visibility: 'off' }]);
  });
});
