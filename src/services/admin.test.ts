import {
  AdminError,
  createEvent,
  createOffer,
  getMyVenues,
  setEventStatus,
  setOfferActive,
  updateEvent,
  updateOffer,
} from './admin';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: { from: jest.fn(), auth: { getSession: jest.fn() } },
}));

const from = supabase.from as unknown as jest.Mock;
const getSession = supabase.auth.getSession as unknown as jest.Mock;

type Result = { data: unknown; error: { code?: string; message?: string } | null };

function mockQuery(result: Result) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'insert', 'update']) query[m] = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  query.single = jest.fn(() => Promise.resolve(result));
  from.mockReturnValue(query);
  return query;
}

const eventRow = {
  id: 'e1',
  venue_id: 'v1',
  title: 'Night',
  description: null,
  lineup: null,
  starts_at: '2026-12-01T20:00:00.000Z',
  ends_at: null,
  price_from_uah: 200,
  status: 'draft',
};

const offerRow = {
  id: 'o1',
  event_id: 'e1',
  title: 'Free shot',
  terms: null,
  max_claims: 50,
  per_user_limit: 1,
  valid_until: '2026-12-02T00:00:00.000Z',
  is_active: true,
};

async function codeOf(promise: Promise<unknown>): Promise<string | undefined> {
  try {
    await promise;
  } catch (e) {
    return e instanceof AdminError ? e.code : 'other';
  }
  return undefined;
}

beforeEach(() => {
  jest.resetAllMocks();
  getSession.mockResolvedValue({ data: { session: { user: { id: 'u1' } } } });
});

describe('getMyVenues', () => {
  it('maps memberships to venues sorted by name', async () => {
    const q = mockQuery({
      data: [
        { role: 'host', venue: { id: 'v2', slug: 'b', name: 'Bravo', is_published: true } },
        { role: 'admin', venue: { id: 'v1', slug: 'a', name: 'Alpha', is_published: false } },
      ],
      error: null,
    });

    expect(await getMyVenues()).toEqual([
      { id: 'v1', slug: 'a', name: 'Alpha', isPublished: false, role: 'admin' },
      { id: 'v2', slug: 'b', name: 'Bravo', isPublished: true, role: 'host' },
    ]);
    expect(from).toHaveBeenCalledWith('venue_members');
    expect(q.eq).toHaveBeenCalledWith('user_id', 'u1');
  });

  it('throws unauthenticated without a session', async () => {
    getSession.mockResolvedValue({ data: { session: null } });
    expect(await codeOf(getMyVenues())).toBe('unauthenticated');
  });

  it('maps network errors', async () => {
    mockQuery({ data: null, error: { message: 'Network request failed' } });
    expect(await codeOf(getMyVenues())).toBe('network');
  });
});

describe('events', () => {
  it('createEvent inserts a draft and maps the row', async () => {
    const q = mockQuery({ data: eventRow, error: null });

    const event = await createEvent('v1', {
      title: 'Night',
      startsAt: new Date('2026-12-01T20:00:00.000Z'),
      priceFromUah: 200,
    });

    expect(q.insert).toHaveBeenCalledWith({
      title: 'Night',
      starts_at: '2026-12-01T20:00:00.000Z',
      price_from_uah: 200,
      venue_id: 'v1',
      status: 'draft',
    });
    expect(event).toEqual({
      id: 'e1',
      venueId: 'v1',
      title: 'Night',
      description: null,
      lineup: [],
      startsAt: new Date('2026-12-01T20:00:00.000Z'),
      endsAt: null,
      priceFromUah: 200,
      status: 'draft',
    });
  });

  it('createEvent maps an RLS rejection to forbidden', async () => {
    mockQuery({ data: null, error: { code: '42501', message: 'row-level security' } });
    expect(await codeOf(createEvent('v9', { title: 'x', startsAt: new Date() }))).toBe('forbidden');
  });

  it('updateEvent sends only the given fields', async () => {
    const q = mockQuery({ data: eventRow, error: null });
    await updateEvent('e1', { title: 'New', endsAt: null });
    expect(q.update).toHaveBeenCalledWith({ title: 'New', ends_at: null });
    expect(q.eq).toHaveBeenCalledWith('id', 'e1');
  });

  it('updateEvent reports not_found when RLS filters the row out', async () => {
    mockQuery({ data: null, error: { code: 'PGRST116', message: 'no rows' } });
    expect(await codeOf(updateEvent('e1', { title: 'x' }))).toBe('not_found');
  });

  it('setEventStatus publishes and hides', async () => {
    const q = mockQuery({ data: { ...eventRow, status: 'published' }, error: null });
    expect((await setEventStatus('e1', 'published')).status).toBe('published');
    expect(q.update).toHaveBeenCalledWith({ status: 'published' });
  });

  it('hides server messages behind unknown', async () => {
    mockQuery({ data: null, error: { message: 'secret detail' } });
    const err = await setEventStatus('e1', 'draft').catch((e: unknown) => e);
    expect(err).toBeInstanceOf(AdminError);
    expect((err as AdminError).code).toBe('unknown');
    expect((err as AdminError).message).not.toContain('secret');
  });
});

describe('offers', () => {
  it('createOffer maps input and row', async () => {
    const q = mockQuery({ data: offerRow, error: null });

    const offer = await createOffer('e1', {
      title: 'Free shot',
      maxClaims: 50,
      validUntil: new Date('2026-12-02T00:00:00.000Z'),
    });

    expect(q.insert).toHaveBeenCalledWith({
      title: 'Free shot',
      max_claims: 50,
      valid_until: '2026-12-02T00:00:00.000Z',
      event_id: 'e1',
    });
    expect(offer).toEqual({
      id: 'o1',
      eventId: 'e1',
      title: 'Free shot',
      terms: null,
      maxClaims: 50,
      perUserLimit: 1,
      validUntil: new Date('2026-12-02T00:00:00.000Z'),
      isActive: true,
    });
  });

  it('createOffer maps an RLS rejection to forbidden', async () => {
    mockQuery({ data: null, error: { code: '42501' } });
    expect(await codeOf(createOffer('e9', { title: 'x' }))).toBe('forbidden');
  });

  it('updateOffer sends only the given fields', async () => {
    const q = mockQuery({ data: offerRow, error: null });
    await updateOffer('o1', { perUserLimit: 2, validUntil: null });
    expect(q.update).toHaveBeenCalledWith({ per_user_limit: 2, valid_until: null });
    expect(q.eq).toHaveBeenCalledWith('id', 'o1');
  });

  it('setOfferActive toggles is_active', async () => {
    const q = mockQuery({ data: { ...offerRow, is_active: false }, error: null });
    expect((await setOfferActive('o1', false)).isActive).toBe(false);
    expect(q.update).toHaveBeenCalledWith({ is_active: false });
  });

  it('setOfferActive reports not_found for a stranger', async () => {
    mockQuery({ data: null, error: { code: 'PGRST116' } });
    expect(await codeOf(setOfferActive('o1', true))).toBe('not_found');
  });
});
