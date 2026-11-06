import { dayRange, endOfWeek, eventKeys, startOfWeek } from './eventKeys';

describe('eventKeys', () => {
  it('starts the week on Monday Kyiv time, including for a Sunday', () => {
    expect(startOfWeek(new Date('2026-11-04T10:00:00Z')).toISOString()).toBe(
      '2026-11-01T22:00:00.000Z',
    );
    expect(startOfWeek(new Date('2026-11-08T10:00:00Z')).toISOString()).toBe(
      '2026-11-01T22:00:00.000Z',
    );
  });

  it('uses the Kyiv day at the week boundary, not the device day', () => {
    // 23:30 UTC on Sunday is already Monday 01:30 in Kyiv.
    expect(startOfWeek(new Date('2026-11-08T23:30:00Z')).toISOString()).toBe(
      '2026-11-08T22:00:00.000Z',
    );
  });

  it('ends the week at the next Monday', () => {
    expect(endOfWeek(new Date('2026-11-04T10:00:00Z')).toISOString()).toBe(
      '2026-11-08T22:00:00.000Z',
    );
  });

  it('spans a Kyiv day from midnight to the next midnight', () => {
    const { from, to } = dayRange('2026-11-05');
    expect(from.toISOString()).toBe('2026-11-04T22:00:00.000Z');
    expect(to.toISOString()).toBe('2026-11-05T22:00:00.000Z');
  });

  it('gives the same key for any time on a Kyiv day and any day in a week', () => {
    expect(eventKeys.day(new Date('2026-11-04T00:30:00Z'))).toEqual(
      eventKeys.day(new Date('2026-11-04T20:00:00Z')),
    );
    expect(eventKeys.week(new Date('2026-11-03T10:00:00Z'))).toEqual(
      eventKeys.week(new Date('2026-11-08T10:00:00Z')),
    );
    expect(eventKeys.detail('a')).not.toEqual(eventKeys.detail('b'));
  });
});
