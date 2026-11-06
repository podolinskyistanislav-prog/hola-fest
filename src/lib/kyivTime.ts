const KYIV_TIME_ZONE = 'Europe/Kyiv';
const MS_PER_DAY = 86_400_000;
const DAYS_IN_WEEK = 7;

const kyivFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: KYIV_TIME_ZONE,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

export type KyivParts = {
  year: number;
  /** 0-based, like Date#getMonth. */
  month: number;
  day: number;
  hour: number;
  minute: number;
};

/** The calendar date and clock time of an instant as seen in Kyiv, whatever the device time zone. */
export function kyivParts(date: Date): KyivParts {
  const values: Record<string, number> = {};
  for (const part of kyivFormat.formatToParts(date)) {
    if (part.type !== 'literal') values[part.type] = Number(part.value);
  }
  return {
    year: values.year ?? 0,
    month: (values.month ?? 1) - 1,
    day: values.day ?? 1,
    hour: values.hour ?? 0,
    minute: values.minute ?? 0,
  };
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** "20:00" in Kyiv time. */
export function formatKyivTime(date: Date): string {
  const { hour, minute } = kyivParts(date);
  return `${pad(hour)}:${pad(minute)}`;
}

/** "YYYY-MM-DD" of the Kyiv calendar day the instant falls on. */
export function kyivDayKey(date: Date): string {
  const { year, month, day } = kyivParts(date);
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function keyToUtcMs(key: string): number {
  const [year, month, day] = key.split('-').map(Number);
  return Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1);
}

/** The day key `days` calendar days after (or before, if negative) `key`. */
export function addKyivDays(key: string, days: number): string {
  const moved = new Date(keyToUtcMs(key) + days * MS_PER_DAY);
  return `${moved.getUTCFullYear()}-${pad(moved.getUTCMonth() + 1)}-${pad(moved.getUTCDate())}`;
}

/** Day of week of a day key: 0 = Sunday … 6 = Saturday. */
export function kyivWeekday(key: string): number {
  return new Date(keyToUtcMs(key)).getUTCDay();
}

/** Day of month (1-31) and month (0-11) of a day key. */
export function dayKeyParts(key: string): { day: number; month: number } {
  const moved = new Date(keyToUtcMs(key));
  return { day: moved.getUTCDate(), month: moved.getUTCMonth() };
}

function wallClockAsUtcMs(date: Date): number {
  const { year, month, day, hour, minute } = kyivParts(date);
  return Date.UTC(year, month, day, hour, minute);
}

/** The instant when the Kyiv calendar day `key` begins (00:00 Kyiv time). */
export function kyivDayStart(key: string): Date {
  const wanted = keyToUtcMs(key);
  let instant = wanted;
  // Two passes settle the UTC offset, including across a daylight-saving change.
  for (let pass = 0; pass < 2; pass += 1) {
    instant = wanted - (wallClockAsUtcMs(new Date(instant)) - instant);
  }
  return new Date(instant);
}

/** Key of the Monday of the Kyiv week containing the day `key`. */
export function kyivWeekStartKey(key: string): string {
  return addKyivDays(key, -((kyivWeekday(key) + 6) % DAYS_IN_WEEK));
}
