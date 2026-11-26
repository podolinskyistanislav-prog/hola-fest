import { getMyDjProfile, getMyGigs, updateMyDjProfile, uploadDjFile } from './djCabinet';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: { from: jest.fn(), storage: { from: jest.fn() } },
}));

const from = supabase.from as unknown as jest.Mock;
const storageFrom = supabase.storage.from as unknown as jest.Mock;

const row = {
  id: 'd1',
  slug: 'nova',
  stage_name: 'Nova',
  bio: null,
  genres: null,
  photo_path: null,
  cover_path: null,
  instagram_url: null,
  soundcloud_url: null,
  is_published: false,
};

function chain(final: 'maybeSingle' | 'returns', result: unknown) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'update']) query[m] = jest.fn(() => query);
  query[final] = jest.fn(() => Promise.resolve(result));
  from.mockReturnValue(query);
  return query;
}

beforeEach(() => jest.resetAllMocks());

describe('getMyDjProfile', () => {
  it('maps the own row and filters by user', async () => {
    const q = chain('maybeSingle', { data: row, error: null });
    expect(await getMyDjProfile('u1')).toMatchObject({
      id: 'd1',
      stageName: 'Nova',
      genres: [],
      isPublished: false,
    });
    expect(q.eq).toHaveBeenCalledWith('user_id', 'u1');
  });

  it('returns null without a profile and a generic error on failure', async () => {
    chain('maybeSingle', { data: null, error: null });
    expect(await getMyDjProfile('u1')).toBeNull();
    chain('maybeSingle', { data: null, error: { message: 'secret' } });
    await expect(getMyDjProfile('u1')).rejects.toMatchObject({ message: 'djs_unknown' });
  });
});

describe('updateMyDjProfile', () => {
  it('sends only the given columns, never slug or publishing', async () => {
    const q = chain('maybeSingle', { data: { ...row, bio: 'Hi' }, error: null });
    const saved = await updateMyDjProfile('d1', { bio: 'Hi', photoPath: null });
    expect(q.update).toHaveBeenCalledWith({ bio: 'Hi', photo_path: null });
    expect(saved.bio).toBe('Hi');
  });

  it('treats zero rows as forbidden', async () => {
    chain('maybeSingle', { data: null, error: null });
    await expect(updateMyDjProfile('d1', { bio: 'x' })).rejects.toMatchObject({
      code: 'forbidden',
    });
  });
});

describe('uploadDjFile', () => {
  it('uploads into the DJ folder of dj-media and returns the path', async () => {
    const upload = jest.fn().mockResolvedValue({ error: null });
    storageFrom.mockReturnValue({ upload });
    global.fetch = jest.fn().mockResolvedValue({ blob: () => Promise.resolve('blob') });
    const path = await uploadDjFile('d1', 'file:///a.jpg', 'photo');
    expect(storageFrom).toHaveBeenCalledWith('dj-media');
    expect(path).toMatch(/^d1\/photo-\d+-\w+\.jpg$/);
    expect(upload).toHaveBeenCalledWith(path, 'blob', { contentType: 'image/jpeg' });
  });

  it('throws a generic error when the upload fails', async () => {
    storageFrom.mockReturnValue({
      upload: jest.fn().mockResolvedValue({ error: { message: 'x' } }),
    });
    global.fetch = jest.fn().mockResolvedValue({ blob: () => Promise.resolve('blob') });
    await expect(uploadDjFile('d1', 'file:///a.jpg', 'photo')).rejects.toMatchObject({
      message: 'djs_unknown',
    });
  });
});

describe('getMyGigs', () => {
  const link = (id: string, startsAt: string, status = 'published') => ({
    event: {
      id,
      title: id,
      starts_at: startsAt,
      status,
      venue: { name: 'Club' },
      offers: [{ title: '-10%', is_active: true }],
    },
  });

  it('keeps upcoming published gigs, earliest first', async () => {
    const q = chain('returns', {
      data: [
        link('late', '2027-01-02T20:00:00Z'),
        link('past', '2026-01-01T20:00:00Z'),
        link('draft', '2027-01-01T20:00:00Z', 'draft'),
        link('soon', '2026-12-01T20:00:00Z'),
        { event: null },
      ],
      error: null,
    });
    const gigs = await getMyGigs('d1', new Date('2026-11-26T10:00:00Z'));
    expect(gigs.map((gig) => gig.eventId)).toEqual(['soon', 'late']);
    expect(gigs[0]?.offerTitle).toBe('-10%');
    expect(q.eq).toHaveBeenCalledWith('dj_id', 'd1');
  });

  it('throws a generic error', async () => {
    chain('returns', { data: null, error: { message: 'Failed to fetch' } });
    await expect(getMyGigs('d1')).rejects.toMatchObject({ code: 'network' });
  });
});
