import { createComment, createPost, editPost } from './feed';
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
