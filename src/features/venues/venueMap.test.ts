import type { Venue } from '@/types/venues';

import {
  filterVenuesByName,
  firstEventByVenue,
  KYIV_REGION,
  mappableVenues,
  resolveSelectedVenueId,
  venueAccent,
} from './venueMap';

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

describe('venueAccent', () => {
  it('uses yellow for Bavovna and pink for Panorama Bar', () => {
    expect(venueAccent('bavovna')).toBe('yellow');
    expect(venueAccent('panorama-bar')).toBe('pink');
  });

  it('is stable for future venues', () => {
    expect(venueAccent('new-club')).toBe(venueAccent('new-club'));
    expect(['yellow', 'pink']).toContain(venueAccent('new-club'));
  });
});

describe('filterVenuesByName', () => {
  const venues = [{ name: 'Bavovna' }, { name: 'Panorama Bar' }];

  it('matches part of the name ignoring case and spaces', () => {
    expect(filterVenuesByName(venues, '  PANO ')).toEqual([{ name: 'Panorama Bar' }]);
  });

  it('returns everything for an empty query and nothing for no match', () => {
    expect(filterVenuesByName(venues, '')).toHaveLength(2);
    expect(filterVenuesByName(venues, 'zzz')).toEqual([]);
  });
});

describe('firstEventByVenue', () => {
  it('keeps the earliest event of each venue', () => {
    const late = { id: 'late', startsAt: new Date('2026-11-06T20:00:00Z'), venue: { id: 'v1' } };
    const early = { id: 'early', startsAt: new Date('2026-11-06T18:00:00Z'), venue: { id: 'v1' } };
    expect(firstEventByVenue([late, early]).get('v1')).toBe(early);
  });
});

describe('resolveSelectedVenueId', () => {
  const venues = [{ id: 'v1' }, { id: 'v2' }];

  it('defaults to the first venue with an event tonight', () => {
    expect(resolveSelectedVenueId(venues, undefined, new Set(['v2']))).toBe('v2');
    expect(resolveSelectedVenueId(venues, undefined, new Set())).toBeNull();
  });

  it('respects an explicit choice and a dismissal', () => {
    expect(resolveSelectedVenueId(venues, 'v1', new Set(['v2']))).toBe('v1');
    expect(resolveSelectedVenueId(venues, null, new Set(['v2']))).toBeNull();
  });

  it('drops a choice that the search filtered out', () => {
    expect(resolveSelectedVenueId([{ id: 'v2' }], 'v1', new Set())).toBeNull();
  });
});

describe('KYIV_REGION', () => {
  it('is centered on Kyiv', () => {
    expect(KYIV_REGION.latitude).toBeCloseTo(50.45, 1);
    expect(KYIV_REGION.longitude).toBeCloseTo(30.52, 1);
  });
});
