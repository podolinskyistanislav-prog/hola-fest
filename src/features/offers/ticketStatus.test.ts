import type { MyClaim } from '@/types/claims';

import { formatCountdown, formatValidUntil, ticketDeadline, ticketStatus } from './ticketStatus';

function claim(status: string, validUntil: Date | null): MyClaim {
  return {
    id: 'c1',
    status,
    issuedAt: new Date(2026, 10, 4, 18),
    redeemedAt: null,
    offer: {
      id: 'o1',
      title: 'Напій',
      terms: null,
      validUntil,
      event: {
        id: 'e1',
        title: 'Hola Night',
        startsAt: new Date(2026, 10, 4, 20),
        endsAt: null,
        venue: { id: 'v1', name: 'Bavovna', address: null, lat: null, lng: null },
      },
    },
  };
}

const now = new Date(2026, 10, 4, 22);

describe('ticketStatus', () => {
  it('is active for an issued claim that is still valid', () => {
    expect(ticketStatus(claim('issued', new Date(2026, 10, 4, 23)), now)).toBe('active');
    expect(ticketStatus(claim('issued', null), now)).toBe('active');
  });

  it('is expired after the offer end', () => {
    expect(ticketStatus(claim('issued', new Date(2026, 10, 4, 21)), now)).toBe('expired');
  });

  it('is redeemed for a redeemed claim', () => {
    expect(ticketStatus(claim('redeemed', null), now)).toBe('redeemed');
  });

  it('is expired for a voided claim', () => {
    expect(ticketStatus(claim('void', null), now)).toBe('expired');
  });
});

describe('ticketDeadline', () => {
  it('prefers the offer end, else the event end', () => {
    const offerEnd = new Date(2026, 10, 4, 23);
    const eventEnd = new Date(2026, 10, 5, 2);
    const withEventEnd = claim('issued', null);
    withEventEnd.offer.event.endsAt = eventEnd;
    expect(ticketDeadline(withEventEnd)).toBe(eventEnd);
    expect(
      ticketDeadline({ ...withEventEnd, offer: { ...withEventEnd.offer, validUntil: offerEnd } }),
    ).toBe(offerEnd);
    expect(ticketDeadline(claim('issued', null))).toBeNull();
  });
});

describe('formatCountdown', () => {
  const at = (minutes: number) => new Date(now.getTime() + minutes * 60_000);

  it('formats hours and minutes', () => {
    expect(formatCountdown(at(134), now)).toBe('Діє ще 2 год 14 хв');
    expect(formatCountdown(at(120), now)).toBe('Діє ще 2 год');
    expect(formatCountdown(at(14), now)).toBe('Діє ще 14 хв');
  });

  it('rounds a partial minute up', () => {
    expect(formatCountdown(new Date(now.getTime() + 1000), now)).toBe('Діє ще 1 хв');
  });

  it('is null without a deadline or after it', () => {
    expect(formatCountdown(null, now)).toBeNull();
    expect(formatCountdown(at(0), now)).toBeNull();
    expect(formatCountdown(at(-5), now)).toBeNull();
  });
});

describe('formatValidUntil', () => {
  it('formats the end time', () => {
    expect(formatValidUntil(new Date('2026-11-04T21:05:00Z'))).toBe('Діє до 23:05');
  });

  it('handles offers without an end', () => {
    expect(formatValidUntil(null)).toBe('Без обмеження за часом');
  });
});
