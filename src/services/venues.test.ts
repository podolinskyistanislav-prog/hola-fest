import { supabase } from './supabase';
import { getPublishedVenues, getVenueById, VenuesError } from './venues';

jest.mock('./supabase', () => ({ supabase: { from: jest.fn() } }));

const from = supabase.from as unknown as jest.Mock;

type Result = { data: unknown; error: { message: string } | null };

function mockQuery(result: Result) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'gte', 'order']) query[m] = jest.fn(() => query);
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
};

const venue = {
  id: 'v1',
  slug: 'club',
  name: 'Club',
  address: 'Street 1',
  lat: 50.4,
  lng: 30.5,
  hasShelter: true,
};

beforeEach(() => jest.resetAllMocks());

describe('getPublishedVenues', () => {
  it('maps rows to domain venues and asks only for published ones', async () => {
    const q = mockQuery({ data: [venueRow], error: null });

    expect(await getPublishedVenues()).toEqual([venue]);
    expect(from).toHaveBeenCalledWith('venues');
    expect(q.select).toHaveBeenCalledWith('id, slug, name, address, lat, lng, has_shelter');
    expect(q.eq).toHaveBeenCalledWith('is_published', true);
  });

  it('keeps venues without coordinates', async () => {
    mockQuery({ data: [{ ...venueRow, lat: null, lng: null }], error: null });

    expect(await getPublishedVenues()).toEqual([{ ...venue, lat: null, lng: null }]);
  });

  it('returns an empty list when nothing is published', async () => {
    mockQuery({ data: [], error: null });
    expect(await getPublishedVenues()).toEqual([]);
  });

  it('throws a typed error without leaking the server message', async () => {
    mockQuery({ data: null, error: { message: 'secret db detail' } });

    await expect(getPublishedVenues()).rejects.toMatchObject({
      name: 'VenuesError',
      code: 'unknown',
      message: 'venues_unknown',
    });
  });

  it('classifies network failures', async () => {
    mockQuery({ data: null, error: { message: 'TypeError: Network request failed' } });
    await expect(getPublishedVenues()).rejects.toBeInstanceOf(VenuesError);
    await expect(getPublishedVenues()).rejects.toMatchObject({ code: 'network' });
  });
});

describe('getVenueById', () => {
  it('maps the venue with its upcoming published events', async () => {
    const q = mockQuery({
      data: {
        ...venueRow,
        events: [
          {
            id: 'e1',
            title: 'Night',
            starts_at: '2026-11-05T20:00:00+00:00',
            ends_at: '2026-11-06T02:00:00+00:00',
            price_from_uah: 200,
            cover_path: 'c.jpg',
          },
        ],
      },
      error: null,
    });

    expect(await getVenueById('v1')).toEqual({
      ...venue,
      upcomingEvents: [
        {
          id: 'e1',
          title: 'Night',
          startsAt: new Date('2026-11-05T20:00:00Z'),
          endsAt: new Date('2026-11-06T02:00:00Z'),
          priceFromUah: 200,
          coverPath: 'c.jpg',
        },
      ],
    });
    expect(q.eq).toHaveBeenCalledWith('id', 'v1');
    expect(q.eq).toHaveBeenCalledWith('is_published', true);
    expect(q.eq).toHaveBeenCalledWith('events.status', 'published');
    expect(q.gte).toHaveBeenCalledWith('events.starts_at', expect.any(String));
    expect(q.order).toHaveBeenCalledWith('starts_at', {
      referencedTable: 'events',
      ascending: true,
    });
  });

  it('returns no events when the venue has none', async () => {
    mockQuery({ data: { ...venueRow, events: null }, error: null });
    expect(await getVenueById('v1')).toEqual({ ...venue, upcomingEvents: [] });
  });

  it('returns null when the venue is not visible', async () => {
    mockQuery({ data: null, error: null });
    expect(await getVenueById('nope')).toBeNull();
  });

  it('throws a typed error without leaking the server message', async () => {
    mockQuery({ data: null, error: { message: 'secret db detail' } });
    await expect(getVenueById('v1')).rejects.toMatchObject({
      code: 'unknown',
      message: 'venues_unknown',
    });
  });
});
