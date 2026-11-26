import { listVenueEvents, type AdminEventListItem } from './admin';
import { listVenueOfferStats } from './offerBuilder';
import { supabase } from './supabase';
import { toVenueCabinetError } from './venueCabinetError';

const DAY_MS = 24 * 60 * 60 * 1000;
const UPCOMING_DAYS = 7;

export type DashboardOffer = {
  id: string;
  title: string;
  claims: number;
  redemptions: number;
};

export type VenueDashboard = {
  todayEvents: AdminEventListItem[];
  nextEvents: AdminEventListItem[];
  liveOffers: DashboardOffer[];
  claimsToday: number;
  redemptionsToday: number;
};

type LiveOfferRow = { id: string; title: string; starts_at: string | null; ends_at: string | null };

function startOfDay(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

async function countClaims(
  venueId: string,
  column: 'issued_at' | 'redeemed_at',
  since: Date,
  until: Date,
): Promise<number> {
  const { count, error } = await supabase
    .from('claims')
    .select('id, offers!inner(venue_id)', { count: 'exact', head: true })
    .eq('offers.venue_id', venueId)
    .neq('status', 'void')
    .gte(column, since.toISOString())
    .lt(column, until.toISOString());
  if (error) throw toVenueCabinetError(error);
  return count ?? 0;
}

async function listLiveOffers(venueId: string, now: Date): Promise<DashboardOffer[]> {
  const { data, error } = await supabase
    .from('offers')
    .select('id, title, starts_at, ends_at')
    .eq('venue_id', venueId)
    .eq('status', 'live')
    .returns<LiveOfferRow[]>();
  if (error) throw toVenueCabinetError(error);
  const stats = await listVenueOfferStats(venueId);
  const statsById = new Map(stats.map((s) => [s.offerId, s]));
  return (data ?? [])
    .filter((o) => !(o.starts_at && new Date(o.starts_at) > now))
    .filter((o) => !(o.ends_at && new Date(o.ends_at) <= now))
    .map((o) => ({
      id: o.id,
      title: o.title,
      claims: statsById.get(o.id)?.claims ?? 0,
      redemptions: statsById.get(o.id)?.redemptions ?? 0,
    }));
}

/**
 * Numbers for the cabinet home: today's events, the next 7 days, live offers (with totals),
 * and claims / redemptions made today. "Today" is the device's local day. RLS limits it to members.
 */
export async function getVenueDashboard(
  venueId: string,
  now: Date = new Date(),
): Promise<VenueDashboard> {
  try {
    const dayStart = startOfDay(now);
    const dayEnd = new Date(dayStart.getTime() + DAY_MS);
    const weekEnd = new Date(dayEnd.getTime() + UPCOMING_DAYS * DAY_MS);

    const [events, liveOffers, claimsToday, redemptionsToday] = await Promise.all([
      listVenueEvents(venueId),
      listLiveOffers(venueId, now),
      countClaims(venueId, 'issued_at', dayStart, dayEnd),
      countClaims(venueId, 'redeemed_at', dayStart, dayEnd),
    ]);

    const byStart = (a: AdminEventListItem, b: AdminEventListItem) =>
      a.startsAt.getTime() - b.startsAt.getTime();
    return {
      todayEvents: events
        .filter((e) => e.startsAt >= dayStart && e.startsAt < dayEnd)
        .sort(byStart),
      nextEvents: events.filter((e) => e.startsAt >= dayEnd && e.startsAt < weekEnd).sort(byStart),
      liveOffers,
      claimsToday,
      redemptionsToday,
    };
  } catch (error) {
    throw toVenueCabinetError(error);
  }
}
