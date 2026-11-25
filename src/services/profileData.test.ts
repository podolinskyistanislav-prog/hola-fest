import { supabase } from './supabase';
import { feedImageUrl, getMyProfile, listMyPosts, saveMyProfile, uploadAvatar } from './profile';

jest.mock('./supabase', () => ({ supabase: { from: jest.fn(), storage: { from: jest.fn() } } }));

const from = supabase.from as unknown as jest.Mock;
const storageFrom = supabase.storage.from as unknown as jest.Mock;

beforeEach(() => jest.resetAllMocks());

describe('getMyProfile', () => {
  it('maps the row', async () => {
    const maybeSingle = jest.fn().mockResolvedValue({
      data: { display_name: 'Nova', handle: 'nova', avatar_path: 'u1/a.jpg' },
      error: null,
    });
    from.mockReturnValue({ select: () => ({ eq: () => ({ maybeSingle }) }) });
    await expect(getMyProfile('u1')).resolves.toEqual({
      displayName: 'Nova',
      handle: 'nova',
      avatarPath: 'u1/a.jpg',
    });
  });

  it('returns null without a row and throws a generic error on failure', async () => {
    const maybeSingle = jest.fn().mockResolvedValueOnce({ data: null, error: null });
    from.mockReturnValue({ select: () => ({ eq: () => ({ maybeSingle }) }) });
    await expect(getMyProfile('u1')).resolves.toBeNull();
    maybeSingle.mockResolvedValueOnce({ data: null, error: { message: 'detail' } });
    await expect(getMyProfile('u1')).rejects.toThrow('profile_load_failed');
  });
});

describe('saveMyProfile', () => {
  const draft = { displayName: 'Nova', handle: 'nova', avatarPath: null };

  it('updates only the caller row', async () => {
    const eq = jest.fn().mockResolvedValue({ error: null });
    const update = jest.fn(() => ({ eq }));
    from.mockReturnValue({ update });
    await saveMyProfile('u1', draft);
    expect(update).toHaveBeenCalledWith({
      display_name: 'Nova',
      handle: 'nova',
      avatar_path: null,
    });
    expect(eq).toHaveBeenCalledWith('id', 'u1');
  });

  it('reports a taken handle separately', async () => {
    from.mockReturnValue({
      update: () => ({ eq: () => Promise.resolve({ error: { code: '23505' } }) }),
    });
    await expect(saveMyProfile('u1', draft)).rejects.toThrow('handle_taken');
  });

  it('throws a generic error otherwise', async () => {
    from.mockReturnValue({
      update: () => ({ eq: () => Promise.resolve({ error: { code: 'XX', message: 'detail' } }) }),
    });
    await expect(saveMyProfile('u1', draft)).rejects.toThrow('profile_save_failed');
  });
});

describe('uploadAvatar', () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('uploads into the user folder and returns the path', async () => {
    global.fetch = jest.fn().mockResolvedValue({ blob: () => Promise.resolve('blob') });
    const upload = jest.fn().mockResolvedValue({ error: null });
    storageFrom.mockReturnValue({ upload });
    const path = await uploadAvatar('u1', 'file://a.jpg');
    expect(path).toMatch(/^u1\/avatar-\d+\.jpg$/);
    expect(storageFrom).toHaveBeenCalledWith('feed-images');
    expect(upload).toHaveBeenCalledWith(path, 'blob', { contentType: 'image/jpeg' });
  });

  it('throws a generic error when the upload fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({ blob: () => Promise.resolve('blob') });
    storageFrom.mockReturnValue({
      upload: jest.fn().mockResolvedValue({ error: { message: 'x' } }),
    });
    await expect(uploadAvatar('u1', 'file://a.jpg')).rejects.toThrow('avatar_upload_failed');
  });

  it('throws a generic error when the file cannot be read', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('no file'));
    await expect(uploadAvatar('u1', 'file://a.jpg')).rejects.toThrow('avatar_upload_failed');
  });
});

describe('feedImageUrl', () => {
  it('returns the public URL', () => {
    storageFrom.mockReturnValue({
      getPublicUrl: () => ({ data: { publicUrl: 'https://x/y.jpg' } }),
    });
    expect(feedImageUrl('u1/a.jpg')).toBe('https://x/y.jpg');
  });
});

describe('listMyPosts', () => {
  it('maps rows and skips incomplete ones', async () => {
    const limit = jest.fn().mockResolvedValue({
      data: [
        { id: 'p1', body: 'hi', image_paths: ['u1/x.jpg'], created_at: '2026-11-01T10:00:00Z' },
        { id: null, body: null, image_paths: null, created_at: null },
      ],
      error: null,
    });
    from.mockReturnValue({
      select: () => ({ eq: () => ({ order: () => ({ limit }) }) }),
    });
    await expect(listMyPosts('u1')).resolves.toEqual([
      { id: 'p1', body: 'hi', imagePaths: ['u1/x.jpg'], createdAt: '2026-11-01T10:00:00Z' },
    ]);
  });

  it('throws a generic error on failure', async () => {
    from.mockReturnValue({
      select: () => ({
        eq: () => ({ order: () => ({ limit: () => Promise.resolve({ data: null, error: {} }) }) }),
      }),
    });
    await expect(listMyPosts('u1')).rejects.toThrow('posts_load_failed');
  });
});
