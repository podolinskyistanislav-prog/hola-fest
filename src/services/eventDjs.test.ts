import { escapeLike, getEventDjs, searchPublishedDjs, setEventDjs } from './eventDjs';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: {
    from: jest.fn(),
    storage: {
      from: () => ({
        getPublicUrl: (path: string) => ({ data: { publicUrl: `https://cdn/${path}` } }),
      }),
    },
  },
}));

const from = supabase.from as unknown as jest.Mock;

type Result = { data?: unknown; error: { message: string } | null };

/** A thenable query builder: every method returns it, awaiting it gives the result. */
function builder(result: Result) {
  const query: Record<string, jest.Mock> & { then?: unknown } = {};
  for (const m of ['select', 'eq', 'in', 'order', 'limit', 'ilike', 'update', 'delete', 'insert']) {
    query[m] = jest.fn(() => query);
  }
  query.returns = jest.fn(() => Promise.resolve(result));
  query.then = (resolve: (value: Result) => unknown) => Promise.resolve(result).then(resolve);
  return query;
}

beforeEach(() => jest.resetAllMocks());

describe('escapeLike', () => {
  it('escapes wildcards', () => {
    expect(escapeLike('50%_off\\')).toBe('50\\%\\_off\\\\');
  });
});

describe('searchPublishedDjs', () => {
  it('searches published DJs by escaped name', async () => {
    const q = builder({
      data: [{ id: 'd1', stage_name: 'Nova', photo_path: 'd1/p.jpg' }],
      error: null,
    });
    from.mockReturnValue(q);
    const result = await searchPublishedDjs(' no%va ');
    expect(q.eq).toHaveBeenCalledWith('is_published', true);
    expect(q.ilike).toHaveBeenCalledWith('stage_name', '%no\\%va%');
    expect(result).toEqual([{ id: 'd1', name: 'Nova', photoUrl: 'https://cdn/d1/p.jpg' }]);
  });

  it('lists without a filter when the text is empty, and throws a generic error', async () => {
    const q = builder({ data: [], error: null });
    from.mockReturnValue(q);
    await searchPublishedDjs('  ');
    expect(q.ilike).not.toHaveBeenCalled();
    from.mockReturnValue(builder({ data: null, error: { message: 'secret' } }));
    await expect(searchPublishedDjs('a')).rejects.toMatchObject({ message: 'djs_unknown' });
  });
});

describe('getEventDjs', () => {
  it('returns linked DJs in order and skips hidden profiles', async () => {
    const q = builder({
      data: [
        { dj_id: 'd1', position: 0, dj: { id: 'd1', stage_name: 'Nova', photo_path: null } },
        { dj_id: 'd2', position: 1, dj: null },
      ],
      error: null,
    });
    from.mockReturnValue(q);
    expect(await getEventDjs('e1')).toEqual([{ id: 'd1', name: 'Nova', photoUrl: null }]);
    expect(q.order).toHaveBeenCalledWith('position', { ascending: true });
  });
});

describe('setEventDjs', () => {
  it('removes, inserts and reorders so the event links exactly the given DJs', async () => {
    const queries: ReturnType<typeof builder>[] = [];
    const next = (result: Result) => {
      const q = builder(result);
      queries.push(q);
      return q;
    };
    from
      .mockReturnValueOnce(next({ data: [{ dj_id: 'old' }, { dj_id: 'keep' }], error: null }))
      .mockReturnValueOnce(next({ error: null }))
      .mockReturnValueOnce(next({ error: null }))
      .mockReturnValueOnce(next({ error: null }));

    await setEventDjs('e1', ['new', 'keep', 'new']);

    expect(queries[1]?.delete).toHaveBeenCalled();
    expect(queries[1]?.in).toHaveBeenCalledWith('dj_id', ['old']);
    expect(queries[2]?.insert).toHaveBeenCalledWith([
      { event_id: 'e1', dj_id: 'new', position: 0 },
    ]);
    expect(queries[3]?.update).toHaveBeenCalledWith({ position: 1 });
  });

  it('throws a generic error when a write fails', async () => {
    from
      .mockReturnValueOnce(builder({ data: [], error: null }))
      .mockReturnValueOnce(builder({ error: { message: 'secret' } }));
    await expect(setEventDjs('e1', ['d1'])).rejects.toMatchObject({ message: 'djs_unknown' });
  });
});
