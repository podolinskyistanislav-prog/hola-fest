import type { MyClaim } from '@/types/claims';

import { loyaltyCards } from './loyaltyCards';

function claim(id: string, venueId: string, status: string): MyClaim {
  return {
    id,
    status,
    issuedAt: new Date(2026, 10, 4),
    redeemedAt: null,
    offer: {
      id: `o${id}`,
      title: 'Офер',
      terms: null,
      validUntil: null,
      event: {
        id: 'e1',
        title: 'Подія',
        startsAt: new Date(2026, 10, 4),
        endsAt: null,
        venue: { id: venueId, name: `Club ${venueId}`, address: null, lat: null, lng: null },
      },
    },
  };
}

describe('loyaltyCards', () => {
  it('returns nothing without claims', () => {
    expect(loyaltyCards([])).toEqual([]);
  });

  it('counts only redeemed claims per club', () => {
    const cards = loyaltyCards([
      claim('1', 'a', 'redeemed'),
      claim('2', 'a', 'issued'),
      claim('3', 'b', 'issued'),
      claim('4', 'a', 'redeemed'),
    ]);
    expect(cards).toEqual([
      { venueId: 'a', venueName: 'Club a', visits: 2 },
      { venueId: 'b', venueName: 'Club b', visits: 0 },
    ]);
  });

  it('caps visits at 5', () => {
    const many = Array.from({ length: 7 }, (_, i) => claim(String(i), 'a', 'redeemed'));
    expect(loyaltyCards(many)[0]?.visits).toBe(5);
  });
});
