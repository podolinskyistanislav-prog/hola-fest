import {
  approveApplication,
  ApplicationError,
  checkIsSuperadmin,
  djPayload,
  listMyApplications,
  listPendingApplications,
  rejectApplication,
  submitApplication,
  venuePayload,
} from './applications';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({
  supabase: { rpc: jest.fn(), from: jest.fn(), storage: { from: jest.fn() } },
}));

const rpc = supabase.rpc as unknown as jest.Mock;
const from = supabase.from as unknown as jest.Mock;

const row = {
  id: 'a1',
  kind: 'venue',
  status: 'rejected',
  reject_reason: 'Немає адреси',
  created_at: '2026-11-25T10:00:00Z',
  payload: { name: 'Bavovna', contact: '@bavovna' },
  applicant: { display_name: 'Оля', handle: 'olya' },
};

function chain(result: unknown) {
  const query: Record<string, jest.Mock> = {};
  query.select = jest.fn(() => query);
  query.eq = jest.fn(() => query);
  query.order = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  query.insert = jest.fn(() => Promise.resolve(result));
  return query;
}

describe('payload builders', () => {
  it('trims venue fields and keeps the pin and photos', () => {
    expect(
      venuePayload({
        name: ' Bavovna ',
        address: ' Хрещатик 1 ',
        lat: 50.45,
        lng: 30.52,
        instagram: ' @b ',
        contact: ' +380501112233 ',
        photoPaths: ['u/1.jpg'],
        comment: ' hi ',
      }),
    ).toEqual({
      name: 'Bavovna',
      address: 'Хрещатик 1',
      lat: 50.45,
      lng: 30.52,
      instagram: '@b',
      contact: '+380501112233',
      photos: ['u/1.jpg'],
      comment: 'hi',
    });
  });

  it('uses the server field names for a DJ', () => {
    const payload = djPayload({
      stageName: ' DJ X ',
      genres: ['techno'],
      bio: '',
      photoPath: null,
      instagram: '',
      soundcloud: '',
      contact: '',
    });
    expect(payload).toMatchObject({ stage_name: 'DJ X', genres: ['techno'], photo: null });
  });
});

describe('submitApplication', () => {
  beforeEach(() => from.mockReset());

  it('inserts kind and payload only', async () => {
    const query = chain({ error: null });
    from.mockReturnValue(query);
    await submitApplication('dj', { stage_name: 'X' });
    expect(from).toHaveBeenCalledWith('account_applications');
    expect(query.insert).toHaveBeenCalledWith({ kind: 'dj', payload: { stage_name: 'X' } });
  });

  it('throws a generic error when the server refuses', async () => {
    from.mockReturnValue(chain({ error: { code: '23505', message: 'duplicate secret' } }));
    await expect(submitApplication('dj', {})).rejects.toMatchObject({ code: 'unknown' });
  });
});

describe('listMyApplications', () => {
  beforeEach(() => from.mockReset());

  it('maps rows, title and applicant name', async () => {
    from.mockReturnValue(chain({ data: [row], error: null }));
    await expect(listMyApplications()).resolves.toEqual([
      {
        id: 'a1',
        kind: 'venue',
        status: 'rejected',
        rejectReason: 'Немає адреси',
        createdAt: '2026-11-25T10:00:00Z',
        title: 'Bavovna',
        applicantName: 'Оля',
        contact: '@bavovna',
      },
    ]);
  });

  it('throws on a failed load', async () => {
    from.mockReturnValue(chain({ data: null, error: { message: 'Failed to fetch' } }));
    await expect(listMyApplications()).rejects.toMatchObject({ code: 'network' });
  });
});

describe('listPendingApplications', () => {
  beforeEach(() => from.mockReset());

  it('asks only for pending ones, oldest first', async () => {
    const query = chain({ data: [], error: null });
    from.mockReturnValue(query);
    await listPendingApplications();
    expect(query.eq).toHaveBeenCalledWith('status', 'pending');
    expect(query.order).toHaveBeenCalledWith('created_at', { ascending: true });
  });
});

describe('moderation RPCs', () => {
  beforeEach(() => rpc.mockReset());

  it('approves through the RPC', async () => {
    rpc.mockResolvedValue({ error: null });
    await approveApplication('a1');
    expect(rpc).toHaveBeenCalledWith('approve_application', { p_id: 'a1' });
  });

  it('rejects with a trimmed reason', async () => {
    rpc.mockResolvedValue({ error: null });
    await rejectApplication('a1', '  Невірна адреса ');
    expect(rpc).toHaveBeenCalledWith('reject_application', {
      p_id: 'a1',
      p_reason: 'Невірна адреса',
    });
  });

  it('maps a forbidden and a not-pending failure', async () => {
    rpc.mockResolvedValueOnce({ error: { code: '42501' } });
    await expect(approveApplication('a1')).rejects.toBeInstanceOf(ApplicationError);
    rpc.mockResolvedValueOnce({ error: { code: '22023' } });
    await expect(rejectApplication('a1', 'x')).rejects.toMatchObject({ code: 'not_pending' });
  });

  it('reads the superadmin flag from the server', async () => {
    rpc.mockResolvedValueOnce({ data: true, error: null });
    await expect(checkIsSuperadmin()).resolves.toBe(true);
    rpc.mockResolvedValueOnce({ data: false, error: null });
    await expect(checkIsSuperadmin()).resolves.toBe(false);
  });
});
