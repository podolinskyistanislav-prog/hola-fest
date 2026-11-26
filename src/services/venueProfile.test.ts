import { supabase } from './supabase';
import {
  addVenuePhoto,
  getMyVenueProfile,
  removeVenuePhoto,
  updateVenueProfile,
  venueMediaUrl,
  uploadVenueFile,
  uploadVenuePhoto,
} from './venueProfile';

jest.mock('./supabase', () => ({
  supabase: { from: jest.fn(), storage: { from: jest.fn() } },
}));

const from = supabase.from as unknown as jest.Mock;
const storageFrom = supabase.storage.from as unknown as jest.Mock;

type Result = { data: unknown; error: { code?: string; message: string } | null };

function chain(result: Result) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'order', 'update', 'insert', 'delete'])
    query[m] = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  query.maybeSingle = jest.fn(() => Promise.resolve(result));
  query.single = jest.fn(() => Promise.resolve(result));
  query.then = jest.fn((resolve: (value: Result) => unknown) => resolve(result));
  return query;
}

const venueRow = {
  id: 'v1',
  slug: 'club',
  name: 'Club',
  is_published: false,
  description: 'Great',
  address: 'Street 1',
  lat: 50.4,
  lng: 30.5,
  instagram_url: 'https://instagram.com/club',
  has_shelter: true,
  cover_path: 'v1/cover.jpg',
};

const photoRow = { id: 'p1', kind: 'inside', path: 'v1/a.jpg' };

function mockProfileQueries(profile: Result, photos: Result) {
  const venues = chain(profile);
  const venuePhotos = chain(photos);
  from.mockImplementation((table: string) => (table === 'venues' ? venues : venuePhotos));
  return { venues, venuePhotos };
}

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn(() =>
    Promise.resolve({ blob: () => Promise.resolve('blob') }),
  ) as unknown as typeof fetch;
});

describe('getMyVenueProfile', () => {
  it('returns all editable fields and photos', async () => {
    mockProfileQueries({ data: venueRow, error: null }, { data: [photoRow], error: null });

    expect(await getMyVenueProfile('v1')).toEqual({
      id: 'v1',
      slug: 'club',
      name: 'Club',
      isPublished: false,
      description: 'Great',
      address: 'Street 1',
      lat: 50.4,
      lng: 30.5,
      instagramUrl: 'https://instagram.com/club',
      hasShelter: true,
      coverPath: 'v1/cover.jpg',
      photos: [{ id: 'p1', kind: 'inside', path: 'v1/a.jpg' }],
    });
  });

  it('is forbidden when the venue is not visible to the caller', async () => {
    mockProfileQueries({ data: null, error: null }, { data: [], error: null });
    await expect(getMyVenueProfile('v1')).rejects.toMatchObject({ code: 'forbidden' });
  });

  it('throws a generic error on failure', async () => {
    mockProfileQueries(
      { data: null, error: { message: 'db exploded' } },
      { data: [], error: null },
    );
    await expect(getMyVenueProfile('v1')).rejects.toMatchObject({
      code: 'unknown',
      message: 'venue_cabinet_unknown',
    });
  });
});

describe('updateVenueProfile', () => {
  it('sends only whitelisted columns and never slug or is_published', async () => {
    const { venues } = mockProfileQueries(
      { data: venueRow, error: null },
      { data: [], error: null },
    );

    await updateVenueProfile('v1', {
      description: 'New',
      lat: 1,
      ...({ slug: 'hack', is_published: true } as object),
    });

    expect(venues.update).toHaveBeenCalledWith({ description: 'New', lat: 1 });
    expect(venues.eq).toHaveBeenCalledWith('id', 'v1');
  });

  it('maps every editable field to its column', async () => {
    const { venues } = mockProfileQueries(
      { data: venueRow, error: null },
      { data: [], error: null },
    );

    await updateVenueProfile('v1', {
      description: null,
      address: 'A',
      lat: 1,
      lng: 2,
      instagramUrl: 'i',
      hasShelter: false,
      coverPath: 'c',
    });

    expect(venues.update).toHaveBeenCalledWith({
      description: null,
      address: 'A',
      lat: 1,
      lng: 2,
      instagram_url: 'i',
      has_shelter: false,
      cover_path: 'c',
    });
  });

  it('is forbidden when RLS updates no row', async () => {
    mockProfileQueries({ data: null, error: null }, { data: [], error: null });
    await expect(updateVenueProfile('v1', { address: 'x' })).rejects.toMatchObject({
      code: 'forbidden',
    });
  });

  it('maps a database error to a generic one', async () => {
    mockProfileQueries(
      { data: null, error: { code: '23514', message: 'lat check' } },
      { data: [], error: null },
    );
    await expect(updateVenueProfile('v1', { lat: 999 })).rejects.toMatchObject({
      code: 'invalid',
    });
  });
});

describe('uploadVenueFile', () => {
  it('uploads a jpeg into the venue folder of venue-media', async () => {
    const upload = jest.fn(() => Promise.resolve({ error: null }));
    storageFrom.mockReturnValue({ upload });

    const path = await uploadVenueFile('v1', 'file:///a.jpg', 'cover');

    expect(storageFrom).toHaveBeenCalledWith('venue-media');
    expect(path).toMatch(/^v1\/cover-\d+-[a-z0-9]+\.jpg$/);
    expect(upload).toHaveBeenCalledWith(path, 'blob', { contentType: 'image/jpeg' });
  });

  it('throws a generic error when the upload is rejected', async () => {
    storageFrom.mockReturnValue({
      upload: jest.fn(() => Promise.resolve({ error: { message: 'bucket policy detail' } })),
    });
    await expect(uploadVenueFile('v1', 'file:///a.jpg', 'cover')).rejects.toMatchObject({
      message: 'venue_cabinet_unknown',
    });
  });

  it('throws a generic error when the file cannot be read', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network request failed'))) as never;
    await expect(uploadVenueFile('v1', 'file:///a.jpg', 'cover')).rejects.toMatchObject({
      code: 'network',
    });
  });
});

describe('addVenuePhoto', () => {
  it('inserts the photo row', async () => {
    const q = chain({ data: photoRow, error: null });
    from.mockReturnValue(q);

    expect(await addVenuePhoto('v1', 'v1/a.jpg', 'inside')).toEqual({
      id: 'p1',
      kind: 'inside',
      path: 'v1/a.jpg',
    });
    expect(from).toHaveBeenCalledWith('venue_photos');
    expect(q.insert).toHaveBeenCalledWith({ venue_id: 'v1', kind: 'inside', path: 'v1/a.jpg' });
  });

  it('fails on a database error', async () => {
    from.mockReturnValue(chain({ data: null, error: { code: '42501', message: 'rls' } }));
    await expect(addVenuePhoto('v1', 'v1/a.jpg', 'inside')).rejects.toMatchObject({
      code: 'forbidden',
    });
  });
});

describe('uploadVenuePhoto', () => {
  it('uploads then records the photo', async () => {
    storageFrom.mockReturnValue({ upload: jest.fn(() => Promise.resolve({ error: null })) });
    const q = chain({ data: photoRow, error: null });
    from.mockReturnValue(q);

    const photo = await uploadVenuePhoto('v1', 'file:///a.jpg', 'outside');

    expect(photo.id).toBe('p1');
    expect(q.insert).toHaveBeenCalledWith(
      expect.objectContaining({ venue_id: 'v1', kind: 'outside' }),
    );
  });

  it('removes the uploaded file when recording the row fails', async () => {
    const remove = jest.fn(() => Promise.resolve({ error: null }));
    storageFrom.mockReturnValue({
      upload: jest.fn(() => Promise.resolve({ error: null })),
      remove,
    });
    from.mockReturnValue(chain({ data: null, error: { code: '42501', message: 'rls' } }));

    await expect(uploadVenuePhoto('v1', 'file:///a.jpg', 'outside')).rejects.toMatchObject({
      code: 'forbidden',
    });
    expect(remove).toHaveBeenCalledTimes(1);
  });
});

describe('removeVenuePhoto', () => {
  it('deletes the row and the file', async () => {
    const q = chain({ data: null, error: null });
    from.mockReturnValue(q);
    const remove = jest.fn(() => Promise.resolve({ error: null }));
    storageFrom.mockReturnValue({ remove });

    await removeVenuePhoto({ id: 'p1', path: 'v1/a.jpg' });

    expect(q.eq).toHaveBeenCalledWith('id', 'p1');
    expect(remove).toHaveBeenCalledWith(['v1/a.jpg']);
  });

  it('keeps the file when the row delete fails', async () => {
    from.mockReturnValue(chain({ data: null, error: { code: '42501', message: 'rls' } }));
    const remove = jest.fn();
    storageFrom.mockReturnValue({ remove });

    await expect(removeVenuePhoto({ id: 'p1', path: 'v1/a.jpg' })).rejects.toMatchObject({
      code: 'forbidden',
    });
    expect(remove).not.toHaveBeenCalled();
  });
});

describe('venueMediaUrl', () => {
  it('returns the public URL from the venue-media bucket', () => {
    const getPublicUrl = jest.fn(() => ({ data: { publicUrl: 'https://cdn/x.jpg' } }));
    storageFrom.mockReturnValue({ getPublicUrl });
    expect(venueMediaUrl('v1/a.jpg')).toBe('https://cdn/x.jpg');
    expect(storageFrom).toHaveBeenCalledWith('venue-media');
    expect(getPublicUrl).toHaveBeenCalledWith('v1/a.jpg');
  });
});
