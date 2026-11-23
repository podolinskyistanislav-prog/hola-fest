import type { EventSummary } from '@/types/events';
import type { Venue } from '@/types/venues';

import { clubRows } from './clubList';

const now = new Date('2026-11-04T12:00:00Z');

function venue(id: string, name: string, address: string | null = null): Venue {
  return { id, slug: id, name, address, lat: null, lng: null, hasShelter: false };
}

function eventAt(venueId: string, startsAt: string): EventSummary {
  return {
    id: `e-${venueId}-${startsAt}`,
    title: 'House Friday',
    startsAt: new Date(startsAt),
    endsAt: null,
    priceFromUah: null,
    coverPath: null,
    offers: [],
    venue: { ...venue(venueId, venueId), instagramUrl: null },
  };
}

describe('clubRows', () => {
  it('puts venues with an event today first, then sorts by name', () => {
    const rows = clubRows(
      [venue('a', 'Альфа'), venue('b', 'Бета'), venue('c', 'Гамма')],
      [eventAt('c', '2026-11-04T18:00:00Z')],
      now,
    );
    expect(rows.map((row) => row.name)).toEqual(['Гамма', 'Альфа', 'Бета']);
  });

  it("shows tonight's event, the week count or a placeholder", () => {
    const rows = clubRows(
      [venue('a', 'А'), venue('b', 'Б'), venue('c', 'В')],
      [
        eventAt('a', '2026-11-04T18:00:00Z'),
        eventAt('b', '2026-11-05T18:00:00Z'),
        eventAt('b', '2026-11-06T18:00:00Z'),
        eventAt('b', '2026-11-07T18:00:00Z'),
      ],
      now,
    );
    expect(rows[0]?.eventLine).toBe('Сьогодні: House Friday · 20:00');
    expect(rows[1]?.eventLine).toBe('3 події цього тижня');
    expect(rows[2]?.eventLine).toBe('Подій поки немає');
  });

  it('uses a placeholder when the address is unknown', () => {
    expect(clubRows([venue('a', 'А', null)], [], now)[0]?.address).toBe(
      'Адресу буде додано згодом',
    );
  });
});
