import type { Venue } from '@/types/venues';

import { KYIV_REGION, mappableVenues } from './venueMap';

const base: Venue = {
  id: 'v1',
  slug: 'bavovna',
  name: 'Bavovna',
  address: null,
  lat: 50.45,
  lng: 30.52,
  hasShelter: false,
};

describe('mappableVenues', () => {
  it('keeps venues that have both coordinates', () => {
    expect(mappableVenues([base])).toEqual([base]);
  });

  it('drops venues without coordinates', () => {
    const noLat = { ...base, id: 'v2', lat: null };
    const noLng = { ...base, id: 'v3', lng: null };
    expect(mappableVenues([noLat, noLng, base])).toEqual([base]);
  });
});

describe('KYIV_REGION', () => {
  it('is centered on Kyiv', () => {
    expect(KYIV_REGION.latitude).toBeCloseTo(50.45, 1);
    expect(KYIV_REGION.longitude).toBeCloseTo(30.52, 1);
  });
});
