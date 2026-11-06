import type { QRTicketStatus } from '@/components/ui';
import type { MyClaim } from '@/types/claims';

/** Maps a claim to what the ticket shows. The server decides redemption; this only labels it. */
export function ticketStatus(claim: MyClaim, now: Date): QRTicketStatus {
  if (claim.status === 'redeemed') return 'redeemed';
  if (claim.status !== 'issued') return 'expired';
  const { validUntil } = claim.offer;
  if (validUntil && validUntil.getTime() < now.getTime()) return 'expired';
  return 'active';
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** "Діє до 23:00", or a neutral line when the offer has no end. */
export function formatValidUntil(validUntil: Date | null): string {
  if (!validUntil) return 'Без обмеження за часом';
  return `Діє до ${pad(validUntil.getHours())}:${pad(validUntil.getMinutes())}`;
}
