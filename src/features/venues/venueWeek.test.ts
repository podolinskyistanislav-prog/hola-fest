import type { EventSummary } from '@/types/events';

import { groupVenueWeek, safeInstagramUrl, venueCoverUri, venueEventRowProps } from './venueWeek';

function event(id: string, startsAt: string, venueId = 'v1', offers: string[] = []): EventSummary {
  return {
    id,
    title: `Event ${id}`,
    startsAt: new Date(startsAt),
    endsAt: null,
    priceFromUah: null,
    coverPath: null,
    venue: {
      id: venueId,
      slug: 's',
      name: 'Bavovna',
      address: null,
      lat: null,
      lng: null,
      hasShelter: false,
      instagramUrl: null,
    },
    offers: offers.map((title) => ({ id: title, title, terms: null, validUntil: null })),
  };
}

const now = new Date('2026-11-25T10:00:00Z');

describe('groupVenueWeek', () => {
  it('keeps only this venue, groups by Kyiv day and labels today and later days', () => {
    const groups = groupVenueWeek(
      [
        event('late', '2026-11-27T19:00:00Z'),
        event('other', '2026-11-25T19:00:00Z', 'v2'),
        event('today', '2026-11-25T18:00:00Z'),
        event('friday2', '2026-11-27T21:00:00Z'),
      ],
      'v1',
      now,
    );
    expect(groups.map((group) => group.heading)).toEqual(['Сьогодні', 'Пт, 27 листопада']);
    expect(groups[1]?.events.map((e) => e.id)).toEqual(['late', 'friday2']);
  });

  it('returns no groups when the venue has no events', () => {
    expect(groupVenueWeek([event('x', '2026-11-25T18:00:00Z', 'v2')], 'v1', now)).toEqual([]);
  });
});

describe('venueEventRowProps', () => {
  it('shows the first offer in the pill, or none', () => {
    expect(venueEventRowProps(event('a', '2026-11-27T19:00:00Z', 'v1', ['−15%'])).offerText).toBe(
      '−15%',
    );
    expect(venueEventRowProps(event('b', '2026-11-27T19:00:00Z')).offerText).toBeNull();
  });

  it('formats day, short month and Kyiv time', () => {
    const props = venueEventRowProps(event('a', '2026-11-27T19:00:00Z'));
    expect(props.day).toBe('27');
    expect(props.time).toBe('21:00');
  });
});

describe('safeInstagramUrl and venueCoverUri', () => {
  it('accept https only', () => {
    expect(safeInstagramUrl('https://instagram.com/x')).toBe('https://instagram.com/x');
    expect(safeInstagramUrl('javascript:alert(1)')).toBeNull();
    expect(safeInstagramUrl(null)).toBeNull();
    expect(venueCoverUri('https://x.test/a.jpg')).toBe('https://x.test/a.jpg');
    expect(venueCoverUri('covers/a.jpg')).toBeUndefined();
  });
});
