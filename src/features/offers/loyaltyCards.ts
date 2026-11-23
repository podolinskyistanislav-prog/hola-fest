import type { MyClaim } from '@/types/claims';

export const LOYALTY_GOAL = 5;

export interface ClubLoyalty {
  venueId: string;
  venueName: string;
  /** Used claims at this club, capped at the card size. */
  visits: number;
}

/** One placeholder card per club the guest has claimed at; visits = redeemed claims there. */
export function loyaltyCards(claims: readonly MyClaim[]): ClubLoyalty[] {
  const clubs = new Map<string, ClubLoyalty>();
  for (const claim of claims) {
    const { venue } = claim.offer.event;
    const club = clubs.get(venue.id) ?? { venueId: venue.id, venueName: venue.name, visits: 0 };
    if (claim.status === 'redeemed') club.visits = Math.min(club.visits + 1, LOYALTY_GOAL);
    clubs.set(venue.id, club);
  }
  return [...clubs.values()];
}
