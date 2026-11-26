import {
  blockUser,
  createComment,
  createPost,
  deleteComment,
  deletePost,
  editPost,
  getFeedAuthor,
  getFeedPost,
  likePost,
  listAuthorPosts,
  listComments,
  listFeedPage,
  listMyClubs,
  reportComment,
  reportPost,
  unblockUser,
  unlikePost,
  uploadPostImage,
} from './feed';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: { functions: { invoke: jest.fn() } },
}));

const invoke = supabase.functions.invoke as unknown as jest.Mock;

const httpError = (status: number, body: unknown) => ({
  data: null,
  error: {
    message: 'Edge Function returned a non-2xx status code',
    context: new Response(JSON.stringify(body), { status }),
  },
});

process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://s.test';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'anon';

beforeEach(() => jest.resetAllMocks());

describe('createPost', () => {
  it('sends the draft and returns the new id', async () => {
    invoke.mockResolvedValue({ data: { id: 'p1' }, error: null });
    expect(await createPost({ body: 'Було круто', imagePaths: ['u/a.jpg'] })).toEqual({
      ok: true,
      id: 'p1',
    });
    expect(invoke).toHaveBeenCalledWith('feed-post', {
      body: { body: 'Було круто', image_paths: ['u/a.jpg'], as_venue_id: null },
    });
  });

  it('can publish as a venue', async () => {
    invoke.mockResolvedValue({ data: { id: 'p1' }, error: null });
    await createPost({ body: 'Новий звук', asVenueId: 'v1' });
    expect(invoke).toHaveBeenCalledWith('feed-post', {
      body: { body: 'Новий звук', image_paths: [], as_venue_id: 'v1' },
    });
  });

  it.each([
    [400, 'promo', 'promo'],
    [400, 'links', 'links'],
    [400, 'abuse', 'abuse'],
    [429, 'rate_limit', 'rate_limit'],
    [400, 'invalid', 'invalid'],
    [401, 'unauthorized', 'unauthenticated'],
    [403, 'forbidden', 'forbidden'],
  ])('maps %i %s to %s', async (status, error, reason) => {
    invoke.mockResolvedValue(httpError(status, { error }));
    expect(await createPost({ body: 'x' })).toEqual({ ok: false, reason });
  });

  it('falls back to the status code when the body is unreadable', async () => {
    invoke.mockResolvedValue({
      data: null,
      error: { message: 'x', context: new Response('not json', { status: 429 }) },
    });
    expect(await createPost({ body: 'x' })).toEqual({ ok: false, reason: 'rate_limit' });
  });

  it('reports network failures and malformed answers', async () => {
    invoke.mockResolvedValue({ data: null, error: { message: 'Failed to fetch' } });
    expect(await createPost({ body: 'x' })).toEqual({ ok: false, reason: 'network' });
    invoke.mockResolvedValue({ data: {}, error: null });
    expect(await createPost({ body: 'x' })).toEqual({ ok: false, reason: 'unknown' });
    invoke.mockResolvedValue({ data: null, error: { message: 'boom' } });
    expect(await createPost({ body: 'x' })).toEqual({ ok: false, reason: 'unknown' });
  });
});

describe('editPost', () => {
  it('sends the post id with the new text', async () => {
    invoke.mockResolvedValue({ data: { id: 'p1' }, error: null });
    expect(await editPost('p1', { body: 'Оновлено' })).toEqual({ ok: true, id: 'p1' });
    expect(invoke).toHaveBeenCalledWith('feed-post', {
      body: { post_id: 'p1', body: 'Оновлено', image_paths: [], as_venue_id: null },
    });
  });

  it('maps not_found', async () => {
    invoke.mockResolvedValue(httpError(404, { error: 'not_found' }));
    expect(await editPost('p1', { body: 'x' })).toEqual({ ok: false, reason: 'not_found' });
  });
});

describe('createComment', () => {
  it('sends the comment and returns its id', async () => {
    invoke.mockResolvedValue({ data: { id: 'c1' }, error: null });
    expect(await createComment({ postId: 'p1', body: 'Згоден', parentId: 'c0' })).toEqual({
      ok: true,
      id: 'c1',
    });
    expect(invoke).toHaveBeenCalledWith('feed-comment', {
      body: { post_id: 'p1', parent_id: 'c0', body: 'Згоден' },
    });
  });

  it('sends a null parent for a top-level comment and maps rejections', async () => {
    invoke.mockResolvedValue(httpError(400, { error: 'promo' }));
    expect(await createComment({ postId: 'p1', body: 'вхід 100 грн' })).toEqual({
      ok: false,
      reason: 'promo',
    });
    expect(invoke).toHaveBeenCalledWith('feed-comment', {
      body: { post_id: 'p1', parent_id: null, body: 'вхід 100 грн' },
    });
  });
});

describe('feed reads, likes, uploads and clubs', () => {
  const client = supabase as unknown as Record<string, unknown>;
  const ID1 = '11111111-1111-1111-1111-111111111111';
  const ID2 = '22222222-2222-2222-2222-222222222222';
  const ID3 = '33333333-3333-3333-3333-333333333333';

  const row = (over: Record<string, unknown> = {}) => ({
    id: ID1,
    author_id: 'u1',
    author_name: 'Оля',
    author_handle: 'olya',
    author_avatar_path: 'u1/a.jpg',
    label: 'dj',
    body: 'Привіт',
    image_paths: ['u1/p.jpg'],
    created_at: '2026-01-01T10:00:00+00:00',
    edited_at: null,
    like_count: 2,
    comment_count: 1,
    liked_by_me: true,
    as_venue_id: null,
    ...over,
  });

  function chain(result: unknown) {
    const q: Record<string, unknown> = {};
    for (const m of ['select', 'order', 'limit', 'or', 'eq', 'delete', 'upsert']) {
      q[m] = jest.fn(() => q);
    }
    q.maybeSingle = jest.fn(() => Promise.resolve(result));
    q.then = (resolve: (v: unknown) => unknown) => Promise.resolve(result).then(resolve);
    return q as Record<string, jest.Mock>;
  }

  const from = () => client.from as jest.Mock;

  beforeEach(() => {
    client.from = jest.fn();
    client.storage = {
      from: () => ({ getPublicUrl: (p: string) => ({ data: { publicUrl: `https://cdn/${p}` } }) }),
    };
    client.auth = {
      getSession: jest.fn(async () => ({ data: { session: { access_token: 't' } } })),
    };
  });

  it('maps a feed page and builds a next cursor', async () => {
    const q = chain({ data: [row(), row({ id: ID2 }), row({ id: ID3 })], error: null });
    from().mockReturnValue(q);
    const page = await listFeedPage(undefined, 2);
    expect(q.limit).toHaveBeenCalledWith(3);
    expect(page.posts).toHaveLength(2);
    expect(page.posts[0]).toMatchObject({
      authorName: 'Оля',
      handle: 'olya',
      avatarUrl: 'https://cdn/u1/a.jpg',
      imageUrls: ['https://cdn/u1/p.jpg'],
      label: 'dj',
      likedByMe: true,
    });
    expect(page.nextCursor).toBe(`2026-01-01T10:00:00+00:00|${ID2}`);
  });

  it('has no next cursor on the last page and skips incomplete rows', async () => {
    from().mockReturnValue(chain({ data: [row(), row({ author_handle: null })], error: null }));
    const page = await listFeedPage();
    expect(page.posts).toHaveLength(1);
    expect(page.nextCursor).toBeNull();
  });

  it('applies the keyset filter for a cursor and rejects a malformed one', async () => {
    const q = chain({ data: [], error: null });
    from().mockReturnValue(q);
    await listFeedPage(`2026-01-01T10:00:00+00:00|${ID2}`);
    expect(q.or).toHaveBeenCalledWith(
      `created_at.lt."2026-01-01T10:00:00+00:00",and(created_at.eq."2026-01-01T10:00:00+00:00",id.lt.${ID2})`,
    );
    await expect(listFeedPage('garbage),id.gt.0')).rejects.toThrow('feed_load_failed');
  });

  it('throws feed_load_failed on a database error', async () => {
    from().mockReturnValue(chain({ data: null, error: { message: 'x' } }));
    await expect(listFeedPage()).rejects.toThrow('feed_load_failed');
  });

  it('getFeedPost returns a post, null, or throws', async () => {
    from().mockReturnValue(chain({ data: row(), error: null }));
    expect((await getFeedPost('p'))?.id).toBe(ID1);
    from().mockReturnValue(chain({ data: null, error: null }));
    expect(await getFeedPost('p')).toBeNull();
    from().mockReturnValue(chain({ data: null, error: { message: 'x' } }));
    await expect(getFeedPost('p')).rejects.toThrow('feed_load_failed');
  });

  it('likes idempotently and unlikes', async () => {
    const q = chain({ error: null });
    from().mockReturnValue(q);
    await likePost('p', 'u');
    expect(q.upsert).toHaveBeenCalledWith(
      { post_id: 'p', user_id: 'u' },
      { onConflict: 'post_id,user_id', ignoreDuplicates: true },
    );
    await unlikePost('p', 'u');
    expect(q.eq).toHaveBeenCalledWith('post_id', 'p');
    expect(q.eq).toHaveBeenCalledWith('user_id', 'u');
  });

  it('throws generic like errors', async () => {
    from().mockReturnValue(chain({ error: { message: 'x' } }));
    await expect(likePost('p', 'u')).rejects.toThrow('post_like_failed');
    await expect(unlikePost('p', 'u')).rejects.toThrow('post_unlike_failed');
  });

  it('lists my clubs and ignores empty joins', async () => {
    from().mockReturnValue(
      chain({ data: [{ venues: { id: 'v1', name: 'Club' } }, { venues: null }], error: null }),
    );
    expect(await listMyClubs()).toEqual([{ id: 'v1', name: 'Club' }]);
    from().mockReturnValue(chain({ data: [], error: null }));
    expect(await listMyClubs()).toEqual([]);
    from().mockReturnValue(chain({ data: null, error: { message: 'x' } }));
    await expect(listMyClubs()).rejects.toThrow('my_clubs_load_failed');
  });

  describe('comments, authors, reports, blocks, deletes', () => {
    const commentRow = (over: Record<string, unknown> = {}) => ({
      id: 'c1',
      post_id: 'p1',
      parent_id: null,
      author_id: 'u1',
      author_name: 'Оля',
      author_handle: 'olya',
      author_avatar_path: 'u1/a.jpg',
      label: 'dj',
      body: 'Круто',
      created_at: '2026-01-01T10:00:00+00:00',
      ...over,
    });

    it('listComments maps rows oldest first and skips incomplete authors', async () => {
      const q = chain({
        data: [
          commentRow(),
          commentRow({ id: 'c2', parent_id: 'c1', label: null }),
          commentRow({ author_handle: null }),
        ],
        error: null,
      });
      from().mockReturnValue(q);
      const comments = await listComments('p1');
      expect(from()).toHaveBeenCalledWith('feed_comments');
      expect(q.eq).toHaveBeenCalledWith('post_id', 'p1');
      expect(comments).toHaveLength(2);
      expect(comments[0]).toEqual({
        id: 'c1',
        postId: 'p1',
        parentId: null,
        authorId: 'u1',
        authorName: 'Оля',
        handle: 'olya',
        avatarUrl: 'https://cdn/u1/a.jpg',
        label: 'dj',
        body: 'Круто',
        createdAt: '2026-01-01T10:00:00+00:00',
      });
      expect(comments[1]).toMatchObject({ parentId: 'c1', label: null });
    });

    it('listComments throws comments_load_failed on error', async () => {
      from().mockReturnValue(chain({ data: null, error: { message: 'x' } }));
      await expect(listComments('p1')).rejects.toThrow('comments_load_failed');
    });

    it('listAuthorPosts filters by author and pages with a cursor', async () => {
      const q = chain({ data: [row(), row({ id: ID2 })], error: null });
      from().mockReturnValue(q);
      const page = await listAuthorPosts('u1', `2026-01-01T10:00:00+00:00|${ID2}`, 1);
      expect(q.eq).toHaveBeenCalledWith('author_id', 'u1');
      expect(q.or).toHaveBeenCalled();
      expect(page.posts).toHaveLength(1);
      expect(page.nextCursor).toBe(`2026-01-01T10:00:00+00:00|${ID1}`);
      await expect(listAuthorPosts('u1', 'garbage')).rejects.toThrow('feed_load_failed');
      from().mockReturnValue(chain({ data: null, error: { message: 'x' } }));
      await expect(listAuthorPosts('u1')).rejects.toThrow('feed_load_failed');
    });

    it('getFeedAuthor returns the author, null, or throws', async () => {
      from().mockReturnValue(
        chain({
          data: { id: 'u1', name: 'Оля', handle: 'olya', avatar_path: null, label: 'hola' },
          error: null,
        }),
      );
      expect(await getFeedAuthor('olya')).toEqual({
        id: 'u1',
        name: 'Оля',
        handle: 'olya',
        avatarUrl: null,
        label: 'hola',
      });
      from().mockReturnValue(chain({ data: null, error: null }));
      expect(await getFeedAuthor('nobody')).toBeNull();
      from().mockReturnValue(chain({ data: null, error: { message: 'x' } }));
      await expect(getFeedAuthor('olya')).rejects.toThrow('author_load_failed');
    });

    it('reportPost and reportComment insert a report and tolerate duplicates', async () => {
      const insert = jest.fn(() => Promise.resolve({ error: null }));
      from().mockReturnValue({ insert });
      await reportPost('p1', 'spam');
      expect(from()).toHaveBeenLastCalledWith('post_reports');
      expect(insert).toHaveBeenLastCalledWith({ post_id: 'p1', reason: 'spam' });
      await reportComment('c1', 'abuse');
      expect(insert).toHaveBeenLastCalledWith({ comment_id: 'c1', reason: 'abuse' });

      insert.mockResolvedValue({ error: { code: '23505' } } as never);
      await expect(reportPost('p1', 'spam')).resolves.toBeUndefined();
      await expect(reportComment('c1', 'spam')).resolves.toBeUndefined();

      insert.mockResolvedValue({ error: { code: '42501' } } as never);
      await expect(reportPost('p1', 'spam')).rejects.toThrow('report_failed');
      await expect(reportComment('c1', 'spam')).rejects.toThrow('report_failed');
    });

    it('blockUser inserts, tolerates duplicates and throws otherwise', async () => {
      const insert = jest.fn(() => Promise.resolve({ error: null }));
      from().mockReturnValue({ insert });
      await blockUser('u2');
      expect(from()).toHaveBeenLastCalledWith('user_blocks');
      expect(insert).toHaveBeenCalledWith({ blocked_id: 'u2' });
      insert.mockResolvedValue({ error: { code: '23505' } } as never);
      await expect(blockUser('u2')).resolves.toBeUndefined();
      insert.mockResolvedValue({ error: { code: '42501' } } as never);
      await expect(blockUser('u2')).rejects.toThrow('block_failed');
    });

    it('unblockUser deletes the block and throws on error', async () => {
      const q = chain({ error: null });
      from().mockReturnValue(q);
      await unblockUser('u2');
      expect(q.eq).toHaveBeenCalledWith('blocked_id', 'u2');
      from().mockReturnValue(chain({ error: { message: 'x' } }));
      await expect(unblockUser('u2')).rejects.toThrow('unblock_failed');
    });

    it('deletePost and deleteComment delete by id and throw on error', async () => {
      const q = chain({ error: null });
      from().mockReturnValue(q);
      await deletePost('p1');
      expect(from()).toHaveBeenLastCalledWith('posts');
      expect(q.eq).toHaveBeenLastCalledWith('id', 'p1');
      await deleteComment('c1');
      expect(from()).toHaveBeenLastCalledWith('post_comments');
      expect(q.eq).toHaveBeenLastCalledWith('id', 'c1');
      from().mockReturnValue(chain({ error: { message: 'x' } }));
      await expect(deletePost('p1')).rejects.toThrow('post_delete_failed');
      await expect(deleteComment('c1')).rejects.toThrow('comment_delete_failed');
    });
  });

  describe('uploadPostImage', () => {
    class FakeXhr {
      static status = 200;
      static last: FakeXhr;
      upload: { onprogress?: (e: unknown) => void } = {};
      onload?: () => void;
      onerror?: () => void;
      status = FakeXhr.status;
      headers: Record<string, string> = {};
      url = '';
      constructor() {
        FakeXhr.last = this;
      }
      open(_method: string, url: string) {
        this.url = url;
      }
      setRequestHeader(key: string, value: string) {
        this.headers[key] = value;
      }
      send() {
        this.upload.onprogress?.({ lengthComputable: true, loaded: 1, total: 2 });
        this.onload?.();
      }
    }

    beforeEach(() => {
      FakeXhr.status = 200;
      (globalThis as unknown as { XMLHttpRequest: unknown }).XMLHttpRequest = FakeXhr;
      globalThis.fetch = jest.fn(async () => ({ blob: async () => new Blob(['x']) })) as never;
    });

    it('uploads into the own folder and reports progress', async () => {
      const progress = jest.fn();
      const path = await uploadPostImage('u1', 'file://a.jpg', progress);
      expect(path).toMatch(/^u1\/post-\d+-[a-z0-9]+\.jpg$/);
      expect(FakeXhr.last.url).toBe(`https://s.test/storage/v1/object/feed-images/${path}`);
      expect(FakeXhr.last.headers.Authorization).toBe('Bearer t');
      expect(progress).toHaveBeenCalledWith(0.5);
      expect(progress).toHaveBeenLastCalledWith(1);
    });

    it('throws post_image_upload_failed when rejected or signed out', async () => {
      FakeXhr.status = 403;
      await expect(uploadPostImage('u1', 'file://a.jpg')).rejects.toThrow(
        'post_image_upload_failed',
      );
      FakeXhr.status = 200;
      (client.auth as { getSession: jest.Mock }).getSession.mockResolvedValue({
        data: { session: null },
      });
      await expect(uploadPostImage('u1', 'file://a.jpg')).rejects.toThrow(
        'post_image_upload_failed',
      );
    });
  });
});
