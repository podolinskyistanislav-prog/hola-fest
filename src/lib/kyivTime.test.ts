import {
  addKyivDays,
  dayKeyParts,
  endsBeforeCurfew,
  formatKyivTime,
  fromKyivParts,
  kyivDayKey,
  kyivDayStart,
  kyivWeekday,
  kyivWeekStartKey,
} from './kyivTime';

describe('endsBeforeCurfew', () => {
  const start = new Date('2026-11-04T18:00:00Z');
  it('is true until 00:00 Kyiv and false after', () => {
    expect(endsBeforeCurfew(start, new Date('2026-11-04T21:59:00Z'))).toBe(true);
    expect(endsBeforeCurfew(start, new Date('2026-11-04T22:00:00Z'))).toBe(true);
    expect(endsBeforeCurfew(start, new Date('2026-11-04T22:01:00Z'))).toBe(false);
  });
});

// Run this file under several device zones: `TZ=America/New_York npx jest src/lib/kyivTime`.
const WINTER_EVENING = new Date('2026-11-04T18:00:00Z'); // 20:00 Kyiv, UTC+2
const SUMMER_EVENING = new Date('2026-07-15T17:00:00Z'); // 20:00 Kyiv, UTC+3

describe('kyivTime', () => {
  it('shows Kyiv clock time in winter and summer', () => {
    expect(formatKyivTime(WINTER_EVENING)).toBe('20:00');
    expect(formatKyivTime(SUMMER_EVENING)).toBe('20:00');
    expect(formatKyivTime(new Date('2026-11-04T07:05:00Z'))).toBe('09:05');
  });

  it('keys the Kyiv day, not the device day', () => {
    expect(kyivDayKey(new Date('2026-11-04T22:30:00Z'))).toBe('2026-11-05');
    expect(kyivDayKey(new Date('2026-11-04T21:59:00Z'))).toBe('2026-11-04');
  });

  it('finds the instant a Kyiv day starts', () => {
    expect(kyivDayStart('2026-11-04').toISOString()).toBe('2026-11-03T22:00:00.000Z');
    expect(kyivDayStart('2026-07-15').toISOString()).toBe('2026-07-14T21:00:00.000Z');
    expect(kyivDayStart('2026-03-29').toISOString()).toBe('2026-03-28T22:00:00.000Z');
    expect(kyivDayStart('2026-03-30').toISOString()).toBe('2026-03-29T21:00:00.000Z');
  });

  it('does calendar arithmetic on day keys', () => {
    expect(addKyivDays('2026-11-30', 1)).toBe('2026-12-01');
    expect(addKyivDays('2026-01-01', -1)).toBe('2025-12-31');
    expect(kyivWeekday('2026-11-04')).toBe(3);
    expect(dayKeyParts('2026-11-04')).toEqual({ day: 4, month: 10 });
    expect(kyivWeekStartKey('2026-11-04')).toBe('2026-11-02');
    expect(kyivWeekStartKey('2026-11-08')).toBe('2026-11-02');
    expect(kyivWeekStartKey('2026-11-02')).toBe('2026-11-02');
  });

  it('converts a Kyiv wall clock back to the instant', () => {
    expect(
      fromKyivParts({ year: 2026, month: 5, day: 13, hour: 21, minute: 5 })?.toISOString(),
    ).toBe('2026-06-13T18:05:00.000Z');
    expect(
      fromKyivParts({ year: 2026, month: 10, day: 4, hour: 20, minute: 0 })?.toISOString(),
    ).toBe(WINTER_EVENING.toISOString());
  });

  it('rejects impossible and DST-skipped wall clocks', () => {
    expect(fromKyivParts({ year: 2026, month: 1, day: 31, hour: 10, minute: 0 })).toBeNull();
    expect(fromKyivParts({ year: 2026, month: 2, day: 29, hour: 3, minute: 30 })).toBeNull();
  });

  it('picks the earlier instant in the repeated autumn hour', () => {
    expect(
      fromKyivParts({ year: 2026, month: 9, day: 25, hour: 3, minute: 30 })?.toISOString(),
    ).toBe('2026-10-25T00:30:00.000Z');
  });
});
