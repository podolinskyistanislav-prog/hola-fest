import type { QRTicketStatus } from '@/components/ui';
import { formatKyivTime } from '@/lib/kyivTime';
import type { MyClaim } from '@/types/claims';

/** Maps a claim to what the ticket shows. The server decides redemption; this only labels it. */
export function ticketStatus(claim: MyClaim, now: Date): QRTicketStatus {
  if (claim.status === 'redeemed') return 'redeemed';
  if (claim.status !== 'issued') return 'expired';
  const { validUntil } = claim.offer;
  if (validUntil && validUntil.getTime() < now.getTime()) return 'expired';
  return 'active';
}

const MS_PER_MINUTE = 60_000;
const MINUTES_PER_HOUR = 60;

/** When the ticket stops working: the offer's `valid_until`, else the end of the event. */
export function ticketDeadline(claim: MyClaim): Date | null {
  return claim.offer.validUntil ?? claim.offer.event.endsAt;
}

/** "Діє ще 2 год 14 хв", "Діє ще 14 хв", or null when the deadline is unknown or has passed. */
export function formatCountdown(deadline: Date | null, now: Date): string | null {
  if (!deadline) return null;
  const minutes = Math.ceil((deadline.getTime() - now.getTime()) / MS_PER_MINUTE);
  if (minutes <= 0) return null;
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const rest = minutes % MINUTES_PER_HOUR;
  if (hours === 0) return `Діє ще ${rest} хв`;
  return rest === 0 ? `Діє ще ${hours} год` : `Діє ще ${hours} год ${rest} хв`;
}

/** "Діє до 23:00", or a neutral line when the offer has no end. */
export function formatValidUntil(validUntil: Date | null): string {
  if (!validUntil) return 'Без обмеження за часом';
  return `Діє до ${formatKyivTime(validUntil)}`;
}
