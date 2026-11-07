import { claimOffer, ClaimsError, getMyClaims, redeemClaim } from './claims';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: { from: jest.fn(), functions: { invoke: jest.fn() }, auth: { getSession: jest.fn() } },
}));

const from = supabase.from as unknown as jest.Mock;
const invoke = supabase.functions.invoke as unknown as jest.Mock;
const getSession = supabase.auth.getSession as unknown as jest.Mock;

const httpError = (status: number, body: unknown) => ({
  data: null,
  error: {
    message: 'Edge Function returned a non-2xx status code',
    context: new Response(JSON.stringify(body), { status }),
  },
});

beforeEach(() => jest.resetAllMocks());

describe('claimOffer', () => {
  it('returns the token on success', async () => {
    invoke.mockResolvedValue({ data: { token: 'abc' }, error: null });
    expect(await claimOffer('o1')).toEqual({ ok: true, token: 'abc' });
    expect(invoke).toHaveBeenCalledWith('claim-offer', { body: { offer_id: 'o1' } });
  });

  it.each([
    [409, 'offer_unavailable', 'unavailable'],
    [409, 'limit_reached', 'limit_reached'],
    [429, 'rate_limited', 'rate_limited'],
    [401, 'unauthorized', 'unauthenticated'],
    [400, 'invalid_request', 'invalid_request'],
  ])('maps %i %s to %s', async (status, error, reason) => {
    invoke.mockResolvedValue(httpError(status, { error }));
    expect(await claimOffer('o1')).toEqual({ ok: false, reason });
  });

  it('falls back to the status code when the body is unreadable', async () => {
    invoke.mockResolvedValue({
      data: null,
      error: { context: new Response('nope', { status: 429 }) },
    });
    expect(await claimOffer('o1')).toEqual({ ok: false, reason: 'rate_limited' });
  });

  it('reports server errors as unknown', async () => {
    invoke.mockResolvedValue(httpError(500, { error: 'server_error' }));
    expect(await claimOffer('o1')).toEqual({ ok: false, reason: 'unknown' });
  });

  it('reports network failures', async () => {
    invoke.mockResolvedValue({ data: null, error: { message: 'Failed to fetch' } });
    expect(await claimOffer('o1')).toEqual({ ok: false, reason: 'network' });
  });

  it('treats a success without a token as unknown', async () => {
    invoke.mockResolvedValue({ data: {}, error: null });
    expect(await claimOffer('o1')).toEqual({ ok: false, reason: 'unknown' });
  });

  it('never logs the token', async () => {
    const spies = (['log', 'info', 'warn', 'error'] as const).map((method) =>
      jest.spyOn(console, method).mockImplementation(() => undefined),
    );
    invoke.mockResolvedValue({ data: { token: 'secret-token' }, error: null });
    await claimOffer('o1');
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
    spies.forEach((spy) => spy.mockRestore());
  });
});

const row = {
  id: 'c1',
  status: 'active',
  issued_at: '2026-11-05T20:00:00+00:00',
  redeemed_at: null,
  offer: {
    id: 'o1',
    title: 'Free shot',
    terms: null,
    valid_until: '2026-11-06T00:00:00+00:00',
    event: {
      id: 'e1',
      title: 'Night',
      starts_at: '2026-11-05T21:00:00+00:00',
      ends_at: '2026-11-06T02:00:00+00:00',
      venue: { id: 'v1', name: 'Club', address: 'Street 1', lat: 50.45, lng: 30.52 },
    },
  },
};

function mockClaims(result: { data: unknown; error: { message: string } | null }) {
  const query: Record<string, jest.Mock> = {};
  for (const method of ['select', 'eq', 'order']) query[method] = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  from.mockReturnValue(query);
  return query;
}

const signedIn = () => getSession.mockResolvedValue({ data: { session: { user: { id: 'u1' } } } });

describe('getMyClaims', () => {
  it('maps claims for the signed-in user without token_hash', async () => {
    signedIn();
    const q = mockClaims({ data: [row], error: null });

    const result = await getMyClaims();

    expect(from).toHaveBeenCalledWith('claims');
    expect(q.select?.mock.calls[0][0]).not.toContain('token_hash');
    expect(q.eq).toHaveBeenCalledWith('user_id', 'u1');
    expect(result).toEqual([
      {
        id: 'c1',
        status: 'active',
        issuedAt: new Date('2026-11-05T20:00:00Z'),
        redeemedAt: null,
        offer: {
          id: 'o1',
          title: 'Free shot',
          terms: null,
          validUntil: new Date('2026-11-06T00:00:00Z'),
          event: {
            id: 'e1',
            title: 'Night',
            startsAt: new Date('2026-11-05T21:00:00Z'),
            endsAt: new Date('2026-11-06T02:00:00Z'),
            venue: { id: 'v1', name: 'Club', address: 'Street 1', lat: 50.45, lng: 30.52 },
          },
        },
      },
    ]);
  });

  it('selects event end and venue coordinates and keeps nulls', async () => {
    signedIn();
    const q = mockClaims({
      data: [
        {
          ...row,
          offer: {
            ...row.offer,
            event: {
              ...row.offer.event,
              ends_at: null,
              venue: { id: 'v1', name: 'Club', address: null, lat: null, lng: null },
            },
          },
        },
      ],
      error: null,
    });

    const [claim] = await getMyClaims();

    expect(q.select?.mock.calls[0][0]).toContain('ends_at');
    expect(q.select?.mock.calls[0][0]).toContain('lat, lng');
    expect(claim?.offer.event.endsAt).toBeNull();
    expect(claim?.offer.event.venue.lat).toBeNull();
    expect(claim?.offer.event.venue.lng).toBeNull();
  });

  it('returns an empty list when there is no data', async () => {
    signedIn();
    mockClaims({ data: null, error: null });
    expect(await getMyClaims()).toEqual([]);
  });

  it('throws unauthenticated without a session', async () => {
    getSession.mockResolvedValue({ data: { session: null } });
    await expect(getMyClaims()).rejects.toMatchObject({ code: 'unauthenticated' });
  });

  it('throws a generic error on failure', async () => {
    signedIn();
    mockClaims({ data: null, error: { message: 'secret db detail' } });
    const error = await getMyClaims().catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ClaimsError);
    expect(error).toMatchObject({ code: 'unknown', message: 'claims_unknown' });
  });

  it('maps network failures', async () => {
    signedIn();
    mockClaims({ data: null, error: { message: 'Network request failed' } });
    await expect(getMyClaims()).rejects.toMatchObject({ code: 'network' });
  });
});

describe('redeemClaim', () => {
  const token = 'a'.repeat(64);

  it('returns ok on success', async () => {
    invoke.mockResolvedValue({ data: { result: 'ok' }, error: null });
    expect(await redeemClaim(token)).toEqual({ ok: true });
    expect(invoke).toHaveBeenCalledWith('redeem-claim', { body: { token } });
  });

  it.each([
    [400, 'invalid_request', 'invalid_token'],
    [404, 'unknown_token', 'unknown_token'],
    [403, 'wrong_venue', 'wrong_venue'],
    [409, 'already_redeemed', 'already_redeemed'],
    [409, 'expired', 'expired'],
    [401, 'unauthorized', 'unauthenticated'],
  ])('maps %i %s to %s', async (status, error, reason) => {
    invoke.mockResolvedValue(httpError(status, { error }));
    expect(await redeemClaim(token)).toEqual({ ok: false, reason });
  });

  it('falls back to the status code when the body is unreadable', async () => {
    invoke.mockResolvedValue({
      data: null,
      error: { context: new Response('x', { status: 404 }) },
    });
    expect(await redeemClaim(token)).toEqual({ ok: false, reason: 'unknown_token' });
  });

  it('reports server errors as unknown', async () => {
    invoke.mockResolvedValue(httpError(500, { error: 'server_error' }));
    expect(await redeemClaim(token)).toEqual({ ok: false, reason: 'unknown' });
  });

  it('reports network failures', async () => {
    invoke.mockResolvedValue({ data: null, error: { message: 'Failed to fetch' } });
    expect(await redeemClaim(token)).toEqual({ ok: false, reason: 'network' });
  });

  it('treats an unexpected success body as unknown', async () => {
    invoke.mockResolvedValue({ data: {}, error: null });
    expect(await redeemClaim(token)).toEqual({ ok: false, reason: 'unknown' });
  });

  it('never logs the token', async () => {
    const spies = (['log', 'warn', 'error', 'info'] as const).map((m) =>
      jest.spyOn(console, m).mockImplementation(() => undefined),
    );
    invoke.mockResolvedValue(httpError(409, { error: 'already_redeemed' }));
    await redeemClaim(token);
    spies.forEach((spy) => expect(spy).not.toHaveBeenCalled());
    spies.forEach((spy) => spy.mockRestore());
  });
});
