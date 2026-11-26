import { djSlug, normalizeDjName } from '@/lib/djName';

import {
  DjsError,
  getDjBySlug,
  getUpcomingDjs,
  groupDjs,
  mergeProfilesWithLineup,
  setMyDjPublished,
} from './djs';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: {
    from: jest.fn(),
    rpc: jest.fn(),
    storage: {
      from: () => ({
        getPublicUrl: (path: string) => ({ data: { publicUrl: `https://cdn.test/${path}` } }),
      }),
    },
  },
}));

const from = supabase.from as unknown as jest.Mock;
const rpc = supabase.rpc as unknown as jest.Mock;

type QueryResult = { data: unknown; error: { message: string } | null };

function chain(result: QueryResult) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'gte', 'lt', 'order']) query[m] = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  return query;
}

/** `events` (lineup text) and `djs` (profiles) answer separately; profiles default to none. */
function mockQuery(result: QueryResult, profiles: QueryResult = { data: [], error: null }) {
  const events = chain(result);
  const djs = chain(profiles);
  from.mockImplementation((table: string) => (table === 'djs' ? djs : events));
  return Object.assign(events, { djs });
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

describe('mergeProfilesWithLineup', () => {
  const toGig = (id: string, startsAt: string) => ({
    eventId: id,
    title: id,
    startsAt: new Date(startsAt),
    venueName: 'Club',
    offerTitle: null,
  });

  it('adds lineup gigs to the matching profile once and keeps other names', () => {
    const profile = {
      slug: 'nova-1',
      name: 'Nova',
      genres: ['techno'],
      gigs: [toGig('a', '2026-12-02T20:00:00Z')],
    };
    const lineup = [
      {
        slug: 'nova',
        name: 'nova',
        genres: ['house'],
        gigs: [toGig('a', '2026-12-02T20:00:00Z'), toGig('b', '2026-12-01T20:00:00Z')],
      },
      { slug: 'other', name: 'Other', genres: [], gigs: [toGig('c', '2026-12-03T20:00:00Z')] },
    ];
    const merged = mergeProfilesWithLineup([profile], lineup);
    expect(merged.map((dj) => dj.name)).toEqual(['Nova', 'Other']);
    expect(merged[0]?.gigs.map((g) => g.eventId)).toEqual(['b', 'a']);
    expect(merged[0]?.genres).toEqual(['techno', 'house']);
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

  it('shows a published profile with photo, bio, links and gigs from event_djs', async () => {
    const q = mockQuery(
      { data: [], error: null },
      {
        data: [
          {
            slug: 'nova',
            stage_name: 'Nova',
            bio: 'Techno',
            genres: ['techno'],
            photo_path: 'p/photo.jpg',
            cover_path: null,
            instagram_url: 'https://instagram.com/nova',
            soundcloud_url: null,
            event_djs: [
              {
                event: {
                  id: 'e9',
                  title: 'Linked',
                  starts_at: '2026-12-01T20:00:00Z',
                  status: 'published',
                  venue: { name: 'Club', is_published: true },
                  offers: [{ title: '-10%', is_active: true }],
                },
              },
              {
                event: {
                  id: 'draft',
                  title: 'Draft',
                  starts_at: '2026-12-02T20:00:00Z',
                  status: 'draft',
                  venue: { name: 'Club', is_published: true },
                  offers: null,
                },
              },
              {
                event: {
                  id: 'far',
                  title: 'Far',
                  starts_at: '2027-03-01T20:00:00Z',
                  status: 'published',
                  venue: { name: 'Club', is_published: true },
                  offers: null,
                },
              },
              { event: null },
            ],
          },
        ],
        error: null,
      },
    );

    const djs = await getUpcomingDjs(new Date('2026-11-23T10:00:00Z'));

    expect(from).toHaveBeenCalledWith('djs');
    expect(q.djs.eq).toHaveBeenCalledWith('is_published', true);
    expect(djs).toHaveLength(1);
    expect(djs[0]).toMatchObject({
      slug: 'nova',
      name: 'Nova',
      bio: 'Techno',
      photoUrl: 'https://cdn.test/p/photo.jpg',
      coverUrl: null,
      instagramUrl: 'https://instagram.com/nova',
    });
    expect(djs[0]?.gigs).toMatchObject([{ eventId: 'e9', offerTitle: '-10%' }]);
  });

  it('keeps a profile without gigs and a lineup-only name as fallback', async () => {
    mockQuery(
      { data: [row], error: null },
      {
        data: [
          {
            slug: 'zed',
            stage_name: 'Zed',
            bio: null,
            genres: null,
            photo_path: null,
            cover_path: null,
            instagram_url: null,
            soundcloud_url: null,
            event_djs: null,
          },
        ],
        error: null,
      },
    );
    const djs = await getUpcomingDjs(new Date('2026-11-23T10:00:00Z'));
    expect(djs.map((dj) => dj.name)).toEqual(['DJ Nova', 'Zed']);
    expect(djs[0]?.photoUrl).toBeUndefined();
    expect(djs[1]?.gigs).toEqual([]);
  });

  it('throws a generic error when the profiles query fails', async () => {
    mockQuery({ data: [], error: null }, { data: null, error: { message: 'secret detail' } });
    await expect(getUpcomingDjs()).rejects.toMatchObject({ message: 'djs_unknown' });
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
