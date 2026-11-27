import { listModerationQueue, setContentHidden, setUserBanned, setUserDj } from './moderation';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({ supabase: { from: jest.fn() } }));

const from = supabase.from as unknown as jest.Mock;

function selectChain(result: unknown) {
  const query: Record<string, jest.Mock> = {};
  query.select = jest.fn(() => query);
  query.not = jest.fn(() => query);
  query.order = jest.fn(() => query);
  query.limit = jest.fn(() => Promise.resolve(result));
  return query;
}

function updateChain(result: unknown) {
  const query: Record<string, jest.Mock> = {};
  query.update = jest.fn(() => query);
  query.eq = jest.fn(() => Promise.resolve(result));
  return query;
}

const author = { id: 'u1', display_name: 'Оля', handle: 'olya', is_dj: false, is_banned: true };

function postRow(overrides: Record<string, unknown> = {}) {
  return {
    id: 'p1',
    body: 'Реклама',
    created_at: '2026-11-26T10:00:00Z',
    hidden_at: '2026-11-26T11:00:00Z',
    hidden_reason: 'reports',
    author,
    reports: [{ reason: 'spam' }, { reason: 'spam' }, { reason: 'abuse' }],
    ...overrides,
  };
}

beforeEach(() => jest.resetAllMocks());

describe('listModerationQueue', () => {
  it('merges reported and hidden rows, counts reports and sorts newest first', async () => {
    const comment = postRow({
      id: 'c1',
      created_at: '2026-11-27T10:00:00Z',
      hidden_at: null,
      hidden_reason: null,
      reports: [{ reason: 'other' }],
    });
    from.mockImplementation((table: string) =>
      table === 'posts'
        ? selectChain({ data: [postRow()], error: null })
        : selectChain({ data: [comment], error: null }),
    );

    const queue = await listModerationQueue();

    expect(queue.map((item) => [item.kind, item.id])).toEqual([
      ['comment', 'c1'],
      ['post', 'p1'],
    ]);
    expect(queue[1]).toMatchObject({
      hidden: true,
      hiddenReason: 'reports',
      reportCount: 3,
      author: { id: 'u1', name: 'Оля', handle: 'olya', isDj: false, isBanned: true },
    });
    expect(queue[0]?.hidden).toBe(false);
  });

  it('deduplicates a row that is both reported and hidden', async () => {
    from.mockImplementation((table: string) =>
      selectChain({ data: table === 'posts' ? [postRow()] : [], error: null }),
    );
    expect(await listModerationQueue()).toHaveLength(1);
  });

  it('fails with a generic error', async () => {
    from.mockImplementation(() => selectChain({ data: null, error: { message: 'secret' } }));
    await expect(listModerationQueue()).rejects.toThrow('moderation_load_failed');
  });
});

describe('moderation actions', () => {
  it('hides a post as moderator and restores a comment', async () => {
    const posts = updateChain({ error: null });
    const comments = updateChain({ error: null });
    from.mockImplementation((table: string) => (table === 'posts' ? posts : comments));

    await setContentHidden('post', 'p1', true);
    await setContentHidden('comment', 'c1', false);

    expect(posts.update).toHaveBeenCalledWith(
      expect.objectContaining({ hidden_reason: 'moderator', hidden_at: expect.any(String) }),
    );
    expect(posts.eq).toHaveBeenCalledWith('id', 'p1');
    expect(comments.update).toHaveBeenCalledWith({ hidden_at: null, hidden_reason: null });
  });

  it('bans and marks a DJ through the profile', async () => {
    const profiles = updateChain({ error: null });
    from.mockReturnValue(profiles);

    await setUserBanned('u1', true);
    await setUserDj('u1', true);

    expect(profiles.update).toHaveBeenNthCalledWith(1, { is_banned: true });
    expect(profiles.update).toHaveBeenNthCalledWith(2, { is_dj: true });
    expect(profiles.eq).toHaveBeenCalledWith('id', 'u1');
  });

  it('throws generic errors when the server refuses', async () => {
    from.mockReturnValue(updateChain({ error: { code: '42501', message: 'x' } }));
    await expect(setContentHidden('post', 'p1', true)).rejects.toThrow('moderation_hide_failed');
    await expect(setUserBanned('u1', true)).rejects.toThrow('moderation_ban_failed');
    await expect(setUserDj('u1', true)).rejects.toThrow('moderation_dj_failed');
  });
});
