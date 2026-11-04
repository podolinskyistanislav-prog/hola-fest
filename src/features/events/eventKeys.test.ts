import { endOfWeek, eventKeys, localDayKey, startOfWeek } from './eventKeys';

describe('eventKeys', () => {
  it('formats a local day key with zero padding', () => {
    expect(localDayKey(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05');
  });

  it('starts the week on Monday, including for a Sunday', () => {
    expect(localDayKey(startOfWeek(new Date(2026, 10, 4)))).toBe('2026-11-02');
    expect(localDayKey(startOfWeek(new Date(2026, 10, 8)))).toBe('2026-11-02');
  });

  it('ends the week at the next Monday', () => {
    expect(localDayKey(endOfWeek(new Date(2026, 10, 4)))).toBe('2026-11-09');
  });

  it('gives the same key for any time on a day and any day in a week', () => {
    expect(eventKeys.day(new Date(2026, 10, 4, 1))).toEqual(
      eventKeys.day(new Date(2026, 10, 4, 22)),
    );
    expect(eventKeys.week(new Date(2026, 10, 3))).toEqual(eventKeys.week(new Date(2026, 10, 8)));
    expect(eventKeys.detail('a')).not.toEqual(eventKeys.detail('b'));
  });
});
