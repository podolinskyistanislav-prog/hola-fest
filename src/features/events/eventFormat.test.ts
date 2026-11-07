import type { EventSummary } from '@/types/events';

import {
  curfewInfo,
  dayFromId,
  carouselCardProps,
  eventsOnDay,
  filterEvents,
  formatDayHeading,
  formatEventsCount,
  homeDays,
  weekOffers,
  formatEventDay,
  formatEventTime,
  formatEventWhen,
  formatPriceFrom,
  offerCondition,
  weekDays,
} from './eventFormat';

const event: EventSummary = {
  id: 'e1',
  title: 'Hola Night',
  startsAt: new Date('2026-11-04T18:05:00Z'),
  endsAt: null,
  priceFromUah: 350,
  coverPath: null,
  offers: [],
  venue: {
    id: 'v1',
    slug: 'bavovna',
    name: 'Bavovna',
    address: null,
    lat: null,
    lng: null,
    hasShelter: false,
    instagramUrl: null,
  },
};

describe('formatEventTime', () => {
  it('pads hours and minutes', () => {
    expect(formatEventTime(new Date('2026-11-04T07:05:00Z'))).toBe('09:05');
  });
});

describe('formatEventDay', () => {
  it('uses the Kyiv calendar day, not the device day', () => {
    expect(formatEventDay(new Date('2026-11-04T22:30:00Z'))).toBe('5 листопада');
  });
});

describe('formatPriceFrom', () => {
  it('formats a price in hryvnias', () => {
    expect(formatPriceFrom(350)).toBe('від 350 ₴');
  });
  it('is undefined when the price is unknown', () => {
    expect(formatPriceFrom(null)).toBeUndefined();
  });
});

describe('weekDays', () => {
  it('returns Monday to Sunday of the week containing the date', () => {
    const days = weekDays(new Date('2026-11-04T10:00:00Z'));
    expect(days.map((day) => day.id)).toEqual([
      '2026-11-02',
      '2026-11-03',
      '2026-11-04',
      '2026-11-05',
      '2026-11-06',
      '2026-11-07',
      '2026-11-08',
    ]);
    expect(days[0]).toMatchObject({
      weekday: 'Пн',
      date: '2',
      accessibilityLabel: 'Понеділок, 2 листопада',
    });
    expect(days[6]?.weekday).toBe('Нд');
  });

  it('crosses a month boundary', () => {
    const days = weekDays(new Date('2026-11-30T10:00:00Z'));
    expect(days[0]?.id).toBe('2026-11-30');
    expect(days[1]?.id).toBe('2026-12-01');
  });
});

describe('formatEventWhen', () => {
  const now = new Date('2026-11-04T10:00:00Z');
  it('says "Сьогодні" for the same Kyiv day, with the end time', () => {
    expect(
      formatEventWhen(new Date('2026-11-04T18:00:00Z'), new Date('2026-11-04T21:30:00Z'), now),
    ).toBe('Сьогодні, 20:00 – 23:30');
  });
  it('uses the date for other days and omits an unknown end', () => {
    expect(formatEventWhen(new Date('2026-11-05T18:00:00Z'), null, now)).toBe('5 листопада, 20:00');
  });
});

describe('curfewInfo', () => {
  const start = new Date('2026-11-04T18:00:00Z');
  it('is ok when the event ends before 00:00 Kyiv', () => {
    expect(curfewInfo(start, new Date('2026-11-04T21:30:00Z'))).toEqual({
      label: 'До комендантської',
      ok: true,
    });
  });
  it('shows a placeholder when the end is after midnight or unknown', () => {
    expect(curfewInfo(start, new Date('2026-11-04T23:00:00Z')).ok).toBe(false);
    expect(curfewInfo(start, null)).toEqual({ label: 'Комендантська: [уточнити]', ok: false });
  });
});

describe('offerCondition', () => {
  it('shows the QR deadline in Kyiv time', () => {
    expect(offerCondition(new Date('2026-11-04T20:00:00Z'))).toBe('Покажи QR на вході до 22:00');
  });
});

describe('dayFromId', () => {
  it('turns a day id into the instant that Kyiv day starts', () => {
    expect(dayFromId('2026-11-04')).toEqual(new Date('2026-11-03T22:00:00Z'));
  });
});

const offer = { id: 'o1', title: '−15%', terms: null, validUntil: null };

describe('carouselCardProps', () => {
  it('maps an event to card props without a badge when there is no offer', () => {
    expect(carouselCardProps(event, 0)).toEqual({
      title: 'Hola Night',
      venue: 'Bavovna',
      timeRange: '20:05',
      priceFrom: 'від 350 ₴',
      offerBadge: undefined,
      coverColor: 'yellow',
    });
  });
  it('alternates cover colors and badges the first offer', () => {
    const props = carouselCardProps({ ...event, offers: [offer] }, 1);
    expect(props.coverColor).toBe('pink');
    expect(props.offerBadge).toBe('−15%');
  });
});

describe('formatEventsCount', () => {
  it.each([
    [0, '0 подій'],
    [1, '1 подія'],
    [2, '2 події'],
    [4, '4 події'],
    [5, '5 подій'],
    [11, '11 подій'],
    [12, '12 подій'],
    [21, '21 подія'],
    [23, '23 події'],
  ])('%i → %s', (count, label) => {
    expect(formatEventsCount(count)).toBe(label);
  });
});

describe('formatDayHeading', () => {
  const today = new Date('2026-11-04T10:00:00Z');
  it('says "Сьогодні" for today', () => {
    expect(formatDayHeading('2026-11-04', today, 2)).toBe('Сьогодні · 2 події');
  });
  it('uses the weekday for another day', () => {
    expect(formatDayHeading('2026-11-06', today, 1)).toBe('Пʼятниця · 1 подія');
  });
});

describe('homeDays', () => {
  it('lists five days from today and dots the ones with events', () => {
    const days = homeDays(new Date('2026-11-04T10:00:00Z'), [event]);
    expect(days.map((day) => day.id)).toEqual([
      '2026-11-04',
      '2026-11-05',
      '2026-11-06',
      '2026-11-07',
      '2026-11-08',
    ]);
    expect(days.map((day) => day.hasEvents)).toEqual([true, false, false, false, false]);
  });
});

describe('filterEvents and eventsOnDay', () => {
  const techno = { ...event, id: 't', tags: ['techno'] };
  const house = { ...event, id: 'h', tags: ['house'], offers: [offer] };
  const list = [techno, house];
  it('keeps everything for "all"', () => {
    expect(filterEvents(list, 'all')).toHaveLength(2);
  });
  it('keeps events with an active offer', () => {
    expect(filterEvents(list, 'offer').map((e) => e.id)).toEqual(['h']);
  });
  it('keeps events carrying the genre tag', () => {
    expect(filterEvents(list, 'techno').map((e) => e.id)).toEqual(['t']);
    expect(filterEvents(list, 'rooftop')).toEqual([]);
  });
  it('picks the events of one Kyiv day', () => {
    expect(eventsOnDay(list, '2026-11-04')).toHaveLength(2);
    expect(eventsOnDay(list, '2026-11-05')).toHaveLength(0);
  });
});

describe('weekOffers', () => {
  it('makes one row per offer with weekday, date and venue', () => {
    expect(weekOffers([{ ...event, offers: [offer] }])).toEqual([
      {
        key: 'e1:o1',
        eventId: 'e1',
        title: 'Hola Night',
        dateAndVenue: 'Ср, 4 листопада · Bavovna',
        offerText: '−15%',
      },
    ]);
  });
});
