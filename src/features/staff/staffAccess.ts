import type { AdminVenue } from '@/types/admin';

export type StaffAccess = {
  /** Host or admin of at least one venue. The server still checks every redemption. */
  canScan: boolean;
  /** Admin of at least one venue. */
  canManageEvents: boolean;
};

/** Derives menu access from the memberships the server returned, never from client claims. */
export function getStaffAccess(venues: AdminVenue[]): StaffAccess {
  return {
    canScan: venues.length > 0,
    canManageEvents: venues.some((venue) => venue.role === 'admin'),
  };
}
