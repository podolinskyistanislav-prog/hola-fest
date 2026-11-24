import type { EventSummary } from '@/types/events';
import type { Venue } from '@/types/venues';

import { clubRows } from './clubList';

const day = '2026-11-04';

function venue(id: string, name: string, address: string | null = null): Venue {
  return {
    id,
    slug: id,
    name,
    address,
    lat: null,
    lng: null,
    hasShelter: false,
    instagramUrl: null,
    coverPath: null,
  };
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
  it('puts venues with an event that day first, then sorts by name', () => {
    const rows = clubRows(
      [venue('a', 'Альфа'), venue('b', 'Бета'), venue('c', 'Гамма')],
      [eventAt('c', '2026-11-04T18:00:00Z')],
      day,
    );
    expect(rows.map((row) => row.name)).toEqual(['Гамма', 'Альфа', 'Бета']);
  });

  it("shows the picked day's first event, +N for more, or a placeholder", () => {
    const rows = clubRows(
      [venue('a', 'А'), venue('b', 'Б'), venue('c', 'В')],
      [
        eventAt('a', '2026-11-04T18:00:00Z'),
        eventAt('b', '2026-11-04T19:00:00Z'),
        eventAt('b', '2026-11-04T21:00:00Z'),
        eventAt('c', '2026-11-05T18:00:00Z'),
      ],
      day,
    );
    expect(rows[0]?.eventLine).toBe('House Friday · 20:00');
    expect(rows[1]?.eventLine).toBe('House Friday · 21:00 +1');
    expect(rows[2]?.eventLine).toBe('Цього дня подій немає');
  });

  it('follows the picked day', () => {
    const events = [eventAt('a', '2026-11-05T18:00:00Z')];
    expect(clubRows([venue('a', 'А')], events, day)[0]?.hasEvents).toBe(false);
    expect(clubRows([venue('a', 'А')], events, '2026-11-05')[0]?.hasEvents).toBe(true);
  });

  it('groups by the Kyiv day, not the UTC day', () => {
    const events = [eventAt('a', '2026-11-04T22:30:00Z')];
    expect(clubRows([venue('a', 'А')], events, day)[0]?.hasEvents).toBe(false);
    expect(clubRows([venue('a', 'А')], events, '2026-11-05')[0]?.eventLine).toBe(
      'House Friday · 00:30',
    );
  });

  it('uses a placeholder when the address is unknown', () => {
    expect(clubRows([venue('a', 'А', null)], [], day)[0]?.address).toBe(
      'Адресу буде додано згодом',
    );
  });
});
