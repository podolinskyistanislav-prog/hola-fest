import type { CabinetVenue } from '@/services/venueTeam';

/** Hosts only scan; the cabinet is for owners and admins. The server still checks every call. */
export function canUseCabinet(venues: readonly CabinetVenue[]): boolean {
  return venues.some((venue) => venue.role === 'owner' || venue.role === 'admin');
}

/** The first venue the user owns, else the first they administer; null for host-only or none. */
export function pickCabinetVenue(venues: readonly CabinetVenue[]): CabinetVenue | null {
  return (
    venues.find((venue) => venue.role === 'owner') ??
    venues.find((venue) => venue.role === 'admin') ??
    null
  );
}

const INSTAGRAM_PATTERN = /^https:\/\/(www\.)?instagram\.com\/[^\s]+$/i;

/** Empty is allowed (clears it); otherwise a plain https Instagram link. */
export function isValidInstagramUrl(value: string): boolean {
  const trimmed = value.trim();
  return trimmed === '' || INSTAGRAM_PATTERN.test(trimmed);
}
