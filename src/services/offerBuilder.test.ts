import {
  duplicateOffer,
  endOffer,
  generateOfferTerms,
  generateOfferTitle,
  listVenueOfferStats,
  listVenueOffers,
  OfferBuilderError,
  offerEffectiveStatus,
  pauseOffer,
  resumeOffer,
  saveVenueOffer,
  type VenueOfferInput,
} from './offerBuilder';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: { rpc: jest.fn(), from: jest.fn() },
}));

const rpc = supabase.rpc as unknown as jest.Mock;
const from = supabase.from as unknown as jest.Mock;

const row = {
  id: 'o1',
  event_id: null,
  venue_id: 'v1',
  kind: 'percent_off',
  value: '20',
  title: '−20% на вхід',
  terms: null,
  max_claims: 50,
  per_user_limit: 1,
  starts_at: null,
  ends_at: '2026-12-01T21:00:00.000Z',
  status: 'paused',
};

describe('offerEffectiveStatus', () => {
  const now = new Date('2026-12-01T20:00:00.000Z');

  it('keeps draft, paused and ended as stored', () => {
    for (const status of ['draft', 'paused', 'ended'] as const) {
      expect(offerEffectiveStatus({ status, startsAt: null, endsAt: null }, now)).toBe(status);
    }
  });

  it('derives ended, scheduled and live from the window', () => {
    const past = new Date('2026-12-01T19:00:00.000Z');
    const future = new Date('2026-12-01T22:00:00.000Z');
    expect(offerEffectiveStatus({ status: 'live', startsAt: null, endsAt: past }, now)).toBe(
      'ended',
    );
    expect(offerEffectiveStatus({ status: 'live', startsAt: future, endsAt: null }, now)).toBe(
      'scheduled',
    );
    expect(offerEffectiveStatus({ status: 'scheduled', startsAt: past, endsAt: future }, now)).toBe(
      'live',
    );
  });
});

describe('generateOfferTitle', () => {
  it('builds a Ukrainian title per kind', () => {
    expect(generateOfferTitle('percent_off', '20')).toBe('−20% на вхід');
    expect(generateOfferTitle('amount_off', '150')).toBe('−150 ₴ на вхід');
    expect(generateOfferTitle('free_entry_until', '23:00')).toBe('Безкоштовний вхід до 23:00');
    expect(generateOfferTitle('gift', 'Шот')).toBe('Шот у подарунок');
    expect(generateOfferTitle('two_for_one', null)).toBe('2 за ціною 1');
  });

  it('falls back for a custom offer without text', () => {
    expect(generateOfferTitle('custom', null)).toBe('Спеціальна пропозиція');
    expect(generateOfferTitle('custom', ' Кальян вдвічі дешевше ')).toBe('Кальян вдвічі дешевше');
  });
});

describe('generateOfferTerms', () => {
  it('uses the entry time for free entry', () => {
    expect(generateOfferTerms('free_entry_until', '23:00', null)).toBe(
      'Покажи QR на вході до 23:00',
    );
  });

  it('uses the end of the window in Kyiv time', () => {
    // 21:00 UTC is 23:00 in Kyiv in December (UTC+2).
    expect(generateOfferTerms('gift', 'Шот', new Date('2026-12-01T21:00:00.000Z'))).toBe(
      'Покажи QR на вході до 23:00',
    );
  });

  it('has no time when there is no window', () => {
    expect(generateOfferTerms('two_for_one', null, null)).toBe('Покажи QR на вході');
  });
});

describe('offer actions', () => {
  beforeEach(() => jest.clearAllMocks());

  it.each([
    ['pause_offer', pauseOffer],
    ['resume_offer', resumeOffer],
    ['end_offer', endOffer],
    ['duplicate_offer', duplicateOffer],
  ] as const)('%s calls the RPC and maps the row', async (name, action) => {
    rpc.mockResolvedValue({ data: row, error: null });
    const offer = await action('o1');
    expect(rpc).toHaveBeenCalledWith(name, { p_offer_id: 'o1' });
    expect(offer).toMatchObject({
      id: 'o1',
      venueId: 'v1',
      eventId: null,
      kind: 'percent_off',
      status: 'paused',
    });
    expect(offer.endsAt).toEqual(new Date('2026-12-01T21:00:00.000Z'));
  });

  it.each([
    ['42501', 'forbidden'],
    ['P0002', 'not_found'],
    ['22023', 'invalid_state'],
    ['XX000', 'unknown'],
  ])('maps database error %s to %s', async (code, expected) => {
    rpc.mockResolvedValue({ data: null, error: { code, message: 'secret server text' } });
    const error = await pauseOffer('o1').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(OfferBuilderError);
    expect((error as OfferBuilderError).code).toBe(expected);
    expect((error as OfferBuilderError).message).not.toContain('secret');
  });

  it('rejects a row with an unknown status', async () => {
    rpc.mockResolvedValue({ data: { ...row, status: 'weird' }, error: null });
    await expect(pauseOffer('o1')).rejects.toMatchObject({ code: 'unknown' });
  });
});

describe('listVenueOfferStats', () => {
  it('maps claims and redemptions, null counts as 0', async () => {
    const query: Record<string, jest.Mock> = {};
    query.select = jest.fn(() => query);
    query.eq = jest.fn(() => query);
    query.returns = jest.fn(() =>
      Promise.resolve({
        data: [
          { offer_id: 'o1', claims: 3, redemptions: 2 },
          { offer_id: 'o2', claims: null, redemptions: null },
        ],
        error: null,
      }),
    );
    from.mockReturnValue(query);

    await expect(listVenueOfferStats('v1')).resolves.toEqual([
      { offerId: 'o1', claims: 3, redemptions: 2 },
      { offerId: 'o2', claims: 0, redemptions: 0 },
    ]);
    expect(from).toHaveBeenCalledWith('offer_stats');
    expect(query.eq).toHaveBeenCalledWith('venue_id', 'v1');
  });

  it('throws a generic error on failure', async () => {
    const query: Record<string, jest.Mock> = {};
    query.select = jest.fn(() => query);
    query.eq = jest.fn(() => query);
    query.returns = jest.fn(() => Promise.resolve({ data: null, error: { code: '42501' } }));
    from.mockReturnValue(query);
    await expect(listVenueOfferStats('v1')).rejects.toMatchObject({ code: 'forbidden' });
  });
});

describe('listVenueOffers', () => {
  function listQuery(result: { data: unknown; error: unknown }) {
    const query: Record<string, jest.Mock> = {};
    query.select = jest.fn(() => query);
    query.eq = jest.fn(() => query);
    query.order = jest.fn(() => query);
    query.returns = jest.fn(() => Promise.resolve(result));
    from.mockReturnValue(query);
    return query;
  }

  it('maps the offers of the venue', async () => {
    const query = listQuery({ data: [row], error: null });
    const offers = await listVenueOffers('v1');
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({ id: 'o1', kind: 'percent_off', status: 'paused' });
    expect(from).toHaveBeenCalledWith('offers');
    expect(query.eq).toHaveBeenCalledWith('venue_id', 'v1');
  });

  it('throws a generic error on failure', async () => {
    listQuery({ data: null, error: { code: '42501' } });
    await expect(listVenueOffers('v1')).rejects.toMatchObject({ code: 'forbidden' });
  });
});

describe('saveVenueOffer', () => {
  const input: VenueOfferInput = {
    eventId: null,
    kind: 'percent_off',
    value: '20',
    title: '−20% на вхід',
    terms: 'Покажи QR на вході',
    maxClaims: 50,
    perUserLimit: 1,
    startsAt: null,
    endsAt: new Date('2026-12-01T21:00:00.000Z'),
    status: 'live',
  };

  function writeQuery(result: { data: unknown; error: unknown }) {
    const query: Record<string, jest.Mock> = {};
    query.insert = jest.fn(() => query);
    query.update = jest.fn(() => query);
    query.eq = jest.fn(() => query);
    query.select = jest.fn(() => query);
    query.single = jest.fn(() => Promise.resolve(result));
    from.mockReturnValue(query);
    return query;
  }

  it('inserts a new offer for the venue', async () => {
    const query = writeQuery({ data: row, error: null });
    await saveVenueOffer('v1', input);
    expect(query.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        venue_id: 'v1',
        kind: 'percent_off',
        max_claims: 50,
        ends_at: '2026-12-01T21:00:00.000Z',
        starts_at: null,
        status: 'live',
      }),
    );
    expect(query.update).not.toHaveBeenCalled();
  });

  it('updates an existing offer by id', async () => {
    const query = writeQuery({ data: row, error: null });
    await saveVenueOffer('v1', input, 'o1');
    expect(query.update).toHaveBeenCalledWith(expect.objectContaining({ title: '−20% на вхід' }));
    expect(query.eq).toHaveBeenCalledWith('id', 'o1');
    expect(query.insert).not.toHaveBeenCalled();
  });

  it('maps a server validation error without its message', async () => {
    writeQuery({ data: null, error: { code: '22023', message: 'invalid offer value' } });
    const failure = await saveVenueOffer('v1', input).catch((error: unknown) => error);
    expect(failure).toBeInstanceOf(OfferBuilderError);
    expect(failure).toMatchObject({
      code: 'invalid_state',
      message: 'offer_builder_invalid_state',
    });
  });
});
