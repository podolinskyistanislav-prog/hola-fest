import type { MyClaim } from '@/types/claims';

import { formatValidUntil, ticketStatus } from './ticketStatus';

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
        venue: { id: 'v1', name: 'Bavovna', address: null },
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

describe('formatValidUntil', () => {
  it('formats the end time', () => {
    expect(formatValidUntil(new Date(2026, 10, 4, 23, 5))).toBe('Діє до 23:05');
  });

  it('handles offers without an end', () => {
    expect(formatValidUntil(null)).toBe('Без обмеження за часом');
  });
});
