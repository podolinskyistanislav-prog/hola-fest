import { listVenueEvents } from './admin';
import { listVenueOfferStats } from './offerBuilder';
import { supabase } from './supabase';
import { getVenueDashboard } from './venueDashboard';

jest.mock('./supabase', () => ({ supabase: { from: jest.fn() } }));
jest.mock('./admin', () => ({ listVenueEvents: jest.fn() }));
jest.mock('./offerBuilder', () => ({ listVenueOfferStats: jest.fn() }));

const from = supabase.from as unknown as jest.Mock;
const events = listVenueEvents as jest.Mock;
const stats = listVenueOfferStats as jest.Mock;

type Result = { data?: unknown; count?: number | null; error: { message: string } | null };

function chain(result: Result) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'neq', 'gte', 'lt']) query[m] = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  query.then = jest.fn((resolve: (value: Result) => unknown) => resolve(result));
  return query;
}

const now = new Date(2026, 10, 25, 15, 0, 0);
const at = (day: number, hour: number) => new Date(2026, 10, day, hour, 0, 0);
const event = (id: string, startsAt: Date) => ({
  id,
  title: id,
  startsAt,
  status: 'published' as const,
  offersCount: 0,
});

function setup(offers: Result, claims: Result[]) {
  const issuedQuery = chain(claims[0] ?? { count: 0, error: null });
  const redeemedQuery = chain(claims[1] ?? { count: 0, error: null });
  const offerQuery = chain(offers);
  const claimQueries = [issuedQuery, redeemedQuery];
  let claimCall = 0;
  from.mockImplementation((table: string) =>
    table === 'offers' ? offerQuery : claimQueries[claimCall++],
  );
  return { issuedQuery, redeemedQuery, offerQuery };
}

beforeEach(() => jest.resetAllMocks());

describe('getVenueDashboard', () => {
  it('splits events into today and the next 7 days, sorted, ignoring the rest', async () => {
    events.mockResolvedValue([
      event('late', at(25, 23)),
      event('past', at(24, 23)),
      event('early', at(25, 1)),
      event('tomorrow', at(26, 0)),
      event('day7', at(2, 20) /* Dec 2 is within 7 days after today */),
      event('far', new Date(2026, 11, 3, 12, 0, 0)),
    ]);
    stats.mockResolvedValue([]);
    setup({ data: [], error: null }, [
      { count: 0, error: null },
      { count: 0, error: null },
    ]);

    const result = await getVenueDashboard('v1', now);

    expect(result.todayEvents.map((e) => e.id)).toEqual(['early', 'late']);
    expect(result.nextEvents.map((e) => e.id)).toEqual(['tomorrow']);
  });

  it('keeps events up to the end of the 7th day after today', async () => {
    events.mockResolvedValue([
      event('edge', new Date(2026, 11, 2, 23, 0, 0)),
      event('over', new Date(2026, 11, 3, 0, 0, 0)),
    ]);
    stats.mockResolvedValue([]);
    setup({ data: [], error: null }, [
      { count: 0, error: null },
      { count: 0, error: null },
    ]);

    const result = await getVenueDashboard('v1', now);

    expect(result.nextEvents.map((e) => e.id)).toEqual(['edge']);
  });

  it('lists only live offers with their totals and counts claims/redemptions today', async () => {
    events.mockResolvedValue([]);
    stats.mockResolvedValue([{ offerId: 'o1', claims: 5, redemptions: 2 }]);
    const { issuedQuery, redeemedQuery, offerQuery } = setup(
      {
        data: [
          { id: 'o1', title: 'Free entry', starts_at: null, ends_at: null },
          { id: 'o2', title: 'Scheduled', starts_at: at(26, 10).toISOString(), ends_at: null },
          { id: 'o3', title: 'Expired', starts_at: null, ends_at: at(25, 10).toISOString() },
          { id: 'o4', title: 'No stats yet', starts_at: at(25, 9).toISOString(), ends_at: null },
        ],
        error: null,
      },
      [
        { count: 7, error: null },
        { count: 3, error: null },
      ],
    );

    const result = await getVenueDashboard('v1', now);

    expect(result.liveOffers).toEqual([
      { id: 'o1', title: 'Free entry', claims: 5, redemptions: 2 },
      { id: 'o4', title: 'No stats yet', claims: 0, redemptions: 0 },
    ]);
    expect(result.claimsToday).toBe(7);
    expect(result.redemptionsToday).toBe(3);
    expect(offerQuery.eq).toHaveBeenCalledWith('status', 'live');
    expect(issuedQuery.gte).toHaveBeenCalledWith('issued_at', at(25, 0).toISOString());
    expect(issuedQuery.lt).toHaveBeenCalledWith('issued_at', at(26, 0).toISOString());
    expect(redeemedQuery.gte).toHaveBeenCalledWith('redeemed_at', at(25, 0).toISOString());
    expect(issuedQuery.eq).toHaveBeenCalledWith('offers.venue_id', 'v1');
  });

  it('treats missing counts as zero', async () => {
    events.mockResolvedValue([]);
    stats.mockResolvedValue([]);
    setup({ data: null, error: null }, [
      { count: null, error: null },
      { count: null, error: null },
    ]);

    const result = await getVenueDashboard('v1', now);

    expect(result).toMatchObject({ liveOffers: [], claimsToday: 0, redemptionsToday: 0 });
  });

  it('throws a generic error when a query fails', async () => {
    events.mockResolvedValue([]);
    stats.mockResolvedValue([]);
    setup({ data: [], error: null }, [
      { count: null, error: { message: 'relation claims leaked detail' } },
      { count: 0, error: null },
    ]);

    await expect(getVenueDashboard('v1', now)).rejects.toMatchObject({
      message: 'venue_cabinet_unknown',
    });
  });

  it('wraps errors from reused services', async () => {
    events.mockRejectedValue(Object.assign(new Error('admin_forbidden'), { code: 'x' }));
    stats.mockResolvedValue([]);
    setup({ data: [], error: null }, [
      { count: 0, error: null },
      { count: 0, error: null },
    ]);

    await expect(getVenueDashboard('v1', now)).rejects.toMatchObject({
      message: 'venue_cabinet_unknown',
    });
  });
});
