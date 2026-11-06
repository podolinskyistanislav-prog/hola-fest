import { EventsError, getEventById, getEventsForRange } from './events';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({ supabase: { from: jest.fn() } }));

const from = supabase.from as unknown as jest.Mock;

type Result = { data: unknown; error: { message: string } | null };

function mockQuery(result: Result) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'gte', 'lt', 'order', 'contains'])
    query[m] = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  query.maybeSingle = jest.fn(() => Promise.resolve(result));
  from.mockReturnValue(query);
  return query;
}

const venueRow = {
  id: 'v1',
  slug: 'club',
  name: 'Club',
  address: 'Street 1',
  lat: 50.4,
  lng: 30.5,
  has_shelter: true,
  instagram_url: null,
};

const eventRow = {
  id: 'e1',
  title: 'Night',
  starts_at: '2026-11-05T20:00:00+00:00',
  ends_at: null,
  price_from_uah: 200,
  cover_path: null,
  tags: ['techno', 'rooftop'],
  venue: venueRow,
};

beforeEach(() => jest.resetAllMocks());

describe('getEventsForRange', () => {
  it('maps rows to domain types and filters published, time-bounded, ordered', async () => {
    const q = mockQuery({ data: [eventRow], error: null });
    const rangeStart = new Date('2026-11-05T00:00:00Z');
    const rangeEnd = new Date('2026-11-12T00:00:00Z');

    const result = await getEventsForRange(rangeStart, rangeEnd);

    expect(result).toEqual([
      {
        id: 'e1',
        title: 'Night',
        startsAt: new Date('2026-11-05T20:00:00Z'),
        endsAt: null,
        priceFromUah: 200,
        coverPath: null,
        tags: ['techno', 'rooftop'],
        venue: {
          id: 'v1',
          slug: 'club',
          name: 'Club',
          address: 'Street 1',
          lat: 50.4,
          lng: 30.5,
          hasShelter: true,
          instagramUrl: null,
        },
      },
    ]);
    expect(from).toHaveBeenCalledWith('events');
    expect(q.eq).toHaveBeenCalledWith('status', 'published');
    expect(q.eq).toHaveBeenCalledWith('venues.is_published', true);
    expect(q.gte).toHaveBeenCalledWith('starts_at', rangeStart.toISOString());
    expect(q.lt).toHaveBeenCalledWith('starts_at', rangeEnd.toISOString());
    expect(q.order).toHaveBeenCalledWith('starts_at', { ascending: true });
  });

  it('returns an empty list when nothing matches', async () => {
    mockQuery({ data: [], error: null });
    await expect(getEventsForRange(new Date(0), new Date(1000))).resolves.toEqual([]);
  });

  it('keeps the server order and requires an inner venue join', async () => {
    const later = { ...eventRow, id: 'e2', starts_at: '2026-11-06T20:00:00+00:00' };
    const q = mockQuery({ data: [eventRow, later], error: null });
    const result = await getEventsForRange(
      new Date('2026-11-05T00:00:00Z'),
      new Date('2026-11-12T00:00:00Z'),
    );
    expect(result.map((e) => e.id)).toEqual(['e1', 'e2']);
    expect(q.select).toHaveBeenCalledWith(expect.stringContaining('venue:venues!inner('));
  });

  it('throws a typed error without leaking the server message', async () => {
    mockQuery({ data: null, error: { message: 'secret db detail' } });
    const err = await getEventsForRange(new Date(0), new Date(1000)).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(EventsError);
    expect((err as EventsError).code).toBe('unknown');
    expect((err as EventsError).message).not.toContain('secret');
  });

  it('classifies network failures', async () => {
    mockQuery({ data: null, error: { message: 'TypeError: Network request failed' } });
    await expect(getEventsForRange(new Date(0), new Date(1000))).rejects.toMatchObject({
      code: 'network',
    });
  });

  it('defaults missing tags to an empty list', async () => {
    mockQuery({ data: [{ ...eventRow, tags: null }], error: null });
    const result = await getEventsForRange(new Date(0), new Date(1000));
    expect(result[0]?.tags).toEqual([]);
  });

  it('does not filter by tag or offers without a filter', async () => {
    const q = mockQuery({ data: [], error: null });
    await getEventsForRange(new Date(0), new Date(1000));
    expect(q.contains).not.toHaveBeenCalled();
    expect(q.select).toHaveBeenCalledWith(expect.not.stringContaining('offers!inner'));
  });

  it('filters by genre tag', async () => {
    const q = mockQuery({ data: [eventRow], error: null });
    await getEventsForRange(new Date(0), new Date(1000), { tag: 'techno' });
    expect(q.contains).toHaveBeenCalledWith('tags', ['techno']);
  });

  it('filters by has-active-offer with an inner join on active offers', async () => {
    const q = mockQuery({ data: [eventRow], error: null });
    await getEventsForRange(new Date(0), new Date(1000), { hasActiveOffer: true });
    expect(q.select).toHaveBeenCalledWith(expect.stringContaining('offers!inner(id)'));
    expect(q.eq).toHaveBeenCalledWith('offers.is_active', true);
  });

  it('rejects an empty or reversed range without querying', async () => {
    await expect(getEventsForRange(new Date(1000), new Date(0))).rejects.toMatchObject({
      code: 'invalid_range',
    });
    expect(from).not.toHaveBeenCalled();
  });
});

describe('getEventById', () => {
  it('maps details with venue and offers', async () => {
    const q = mockQuery({
      data: {
        ...eventRow,
        description: 'Fun',
        lineup: ['DJ A'],
        offers: [
          { id: 'o1', title: 'Free shot', terms: null, valid_until: '2026-11-06T00:00:00Z' },
        ],
      },
      error: null,
    });

    const result = await getEventById('e1');

    expect(result?.description).toBe('Fun');
    expect(result?.lineup).toEqual(['DJ A']);
    expect(result?.venue.name).toBe('Club');
    expect(result?.offers).toEqual([
      { id: 'o1', title: 'Free shot', terms: null, validUntil: new Date('2026-11-06T00:00:00Z') },
    ]);
    expect(q.eq).toHaveBeenCalledWith('id', 'e1');
    expect(q.eq).toHaveBeenCalledWith('status', 'published');
    expect(q.eq).toHaveBeenCalledWith('venues.is_published', true);
    expect(q.eq).toHaveBeenCalledWith('offers.is_active', true);
  });

  it('defaults missing lineup and offers', async () => {
    mockQuery({
      data: { ...eventRow, description: null, lineup: null, offers: null },
      error: null,
    });
    const result = await getEventById('e1');
    expect(result?.lineup).toEqual([]);
    expect(result?.offers).toEqual([]);
  });

  it('returns null when the event is not visible', async () => {
    mockQuery({ data: null, error: null });
    await expect(getEventById('missing')).resolves.toBeNull();
  });

  it('only reads the events table and joins the venue, so hidden data stays filtered', async () => {
    const q = mockQuery({ data: null, error: null });
    await getEventById('draft-id');
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith('events');
    expect(q.select).toHaveBeenCalledWith(expect.stringContaining('venue:venues!inner('));
    expect(q.eq).toHaveBeenCalledWith('status', 'published');
  });

  it('throws a typed error on failure', async () => {
    mockQuery({ data: null, error: { message: 'boom' } });
    await expect(getEventById('e1')).rejects.toBeInstanceOf(EventsError);
  });
});
