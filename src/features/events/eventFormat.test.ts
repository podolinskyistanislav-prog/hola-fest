import type { EventSummary } from '@/types/events';

import {
  dayFromId,
  eventCardProps,
  formatEventDay,
  formatEventTime,
  formatPriceFrom,
  weekDays,
} from './eventFormat';

const event: EventSummary = {
  id: 'e1',
  title: 'Hola Night',
  startsAt: new Date('2026-11-04T18:05:00Z'),
  endsAt: null,
  priceFromUah: 350,
  coverPath: null,
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

describe('dayFromId', () => {
  it('turns a day id into the instant that Kyiv day starts', () => {
    expect(dayFromId('2026-11-04')).toEqual(new Date('2026-11-03T22:00:00Z'));
  });
});

describe('eventCardProps', () => {
  it('maps an event to formatted card props', () => {
    expect(eventCardProps(event, 0)).toEqual({
      title: 'Hola Night',
      venue: 'Bavovna',
      time: '20:05',
      priceFrom: 'від 350 ₴',
      coverColor: 'yellow',
    });
  });
  it('alternates cover colors', () => {
    expect(eventCardProps(event, 1).coverColor).toBe('pink');
  });
});
