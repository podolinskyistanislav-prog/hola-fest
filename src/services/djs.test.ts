import { djSlug, normalizeDjName } from '@/lib/djName';

import { DjsError, getDjBySlug, getUpcomingDjs, groupDjs, setMyDjPublished } from './djs';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({ supabase: { from: jest.fn(), rpc: jest.fn() } }));

const from = supabase.from as unknown as jest.Mock;
const rpc = supabase.rpc as unknown as jest.Mock;

function mockQuery(result: { data: unknown; error: { message: string } | null }) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'gte', 'lt', 'order']) query[m] = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  from.mockReturnValue(query);
  return query;
}

function event(id: string, startsAt: string, lineup: string[], tags: string[] = []) {
  return {
    eventId: id,
    title: `Event ${id}`,
    startsAt: new Date(startsAt),
    venueName: 'Club',
    tags,
    lineup,
    offerTitle: null,
  };
}

beforeEach(() => jest.resetAllMocks());

describe('normalizeDjName', () => {
  it('trims and collapses whitespace', () => {
    expect(normalizeDjName('  DJ   Nova ')).toBe('DJ Nova');
  });
});

describe('djSlug', () => {
  it('lowercases and joins words, keeping Cyrillic', () => {
    expect(djSlug('DJ Nova!')).toBe('dj-nova');
    expect(djSlug(' Влад  Котик ')).toBe('влад-котик');
  });

  it('is empty for a name without letters', () => {
    expect(djSlug(' -- ')).toBe('');
  });

  it('round-trips through the encoded URL segment', () => {
    const slug = djSlug('Влад Котик');
    expect(decodeURIComponent(encodeURIComponent(slug))).toBe(slug);
  });
});

describe('groupDjs', () => {
  it('dedupes names that differ by case or spacing and merges gigs and genres', () => {
    const djs = groupDjs([
      event('a', '2026-12-02T20:00:00Z', ['DJ Nova', 'dj  nova'], ['techno']),
      event('b', '2026-12-01T20:00:00Z', ['dj nova'], ['house', 'techno']),
    ]);
    expect(djs).toHaveLength(1);
    expect(djs[0]?.name).toBe('DJ Nova');
    expect(djs[0]?.gigs.map((g) => g.eventId)).toEqual(['b', 'a']);
    expect(djs[0]?.genres).toEqual(['techno', 'house']);
  });

  it('skips empty names', () => {
    expect(groupDjs([event('a', '2026-12-01T20:00:00Z', ['  ', ''])])).toEqual([]);
  });

  it('sorts by next gig, then by name', () => {
    const djs = groupDjs([
      event('a', '2026-12-03T20:00:00Z', ['Zed']),
      event('b', '2026-12-01T20:00:00Z', ['Yan', 'Alex']),
    ]);
    expect(djs.map((dj) => dj.name)).toEqual(['Alex', 'Yan', 'Zed']);
  });
});

describe('getUpcomingDjs', () => {
  const row = {
    id: 'e1',
    title: 'House Friday',
    starts_at: '2026-12-01T20:00:00Z',
    tags: ['house'],
    lineup: ['DJ Nova'],
    venue: { name: 'Club' },
    offers: [{ title: '-20%' }],
  };

  it('queries published events in the next 30 days and maps them', async () => {
    const q = mockQuery({ data: [row], error: null });
    const now = new Date('2026-11-23T10:00:00Z');

    const djs = await getUpcomingDjs(now);

    expect(from).toHaveBeenCalledWith('events');
    expect(q.eq).toHaveBeenCalledWith('status', 'published');
    expect(q.gte).toHaveBeenCalledWith('starts_at', now.toISOString());
    expect(q.lt).toHaveBeenCalledWith('starts_at', '2026-12-23T10:00:00.000Z');
    expect(djs[0]?.gigs[0]).toMatchObject({ eventId: 'e1', venueName: 'Club', offerTitle: '-20%' });
  });

  it('throws a generic error', async () => {
    mockQuery({ data: null, error: { message: 'secret detail' } });
    await expect(getUpcomingDjs()).rejects.toMatchObject({
      code: 'unknown',
      message: 'djs_unknown',
    });
  });

  it('maps fetch failures to network', async () => {
    mockQuery({ data: null, error: { message: 'Failed to fetch' } });
    await expect(getUpcomingDjs()).rejects.toMatchObject({ code: 'network' });
  });
});

describe('getDjBySlug', () => {
  it('finds a DJ by the slug of their name, or null', async () => {
    mockQuery({
      data: [
        {
          id: 'e1',
          title: 'T',
          starts_at: '2026-12-01T20:00:00Z',
          tags: null,
          lineup: ['Влад Котик'],
          venue: { name: 'Club' },
          offers: null,
        },
      ],
      error: null,
    });
    expect((await getDjBySlug(djSlug('Влад Котик')))?.name).toBe('Влад Котик');
    mockQuery({ data: [], error: null });
    expect(await getDjBySlug('nobody')).toBeNull();
  });
});

describe('setMyDjPublished', () => {
  beforeEach(() => rpc.mockReset());

  it('calls the RPC with the flag', async () => {
    rpc.mockResolvedValue({ error: null });
    await setMyDjPublished(false);
    expect(rpc).toHaveBeenCalledWith('set_my_dj_published', { p_published: false });
  });

  it('maps forbidden, missing profile, network and unknown errors', async () => {
    rpc.mockResolvedValueOnce({ error: { code: '42501', message: 'secret' } });
    await expect(setMyDjPublished(true)).rejects.toMatchObject({ code: 'forbidden' });
    rpc.mockResolvedValueOnce({ error: { code: 'P0002', message: 'x' } });
    await expect(setMyDjPublished(true)).rejects.toMatchObject({ code: 'no_profile' });
    rpc.mockResolvedValueOnce({ error: { message: 'Failed to fetch' } });
    await expect(setMyDjPublished(true)).rejects.toMatchObject({ code: 'network' });
    rpc.mockResolvedValueOnce({ error: { message: 'boom' } });
    const failure = await setMyDjPublished(true).catch((e: unknown) => e);
    expect(failure).toBeInstanceOf(DjsError);
    expect(failure).toMatchObject({ code: 'unknown' });
  });
});
