import { supabase } from './supabase';
import {
  acceptVenueInvite,
  cancelVenueInvite,
  inviteVenueStaff,
  listVenueInvites,
  listVenueMembers,
  removeVenueMember,
} from './venueTeam';

jest.mock('./supabase', () => ({ supabase: { from: jest.fn(), rpc: jest.fn() } }));

const from = supabase.from as unknown as jest.Mock;
const rpc = supabase.rpc as unknown as jest.Mock;

type Result = { data: unknown; error: { code?: string; message: string } | null };

function chain(result: Result) {
  const query: Record<string, jest.Mock> = {};
  for (const m of ['select', 'eq', 'is', 'order', 'delete']) query[m] = jest.fn(() => query);
  query.returns = jest.fn(() => Promise.resolve(result));
  query.then = jest.fn((resolve: (value: Result) => unknown) => resolve(result));
  return query;
}

beforeEach(() => jest.resetAllMocks());

describe('listVenueMembers', () => {
  it('maps members with names', async () => {
    rpc.mockResolvedValue({
      data: [{ user_id: 'u1', role: 'owner', display_name: 'Olena', handle: 'olena' }],
      error: null,
    });

    expect(await listVenueMembers('v1')).toEqual([
      { userId: 'u1', role: 'owner', displayName: 'Olena', handle: 'olena' },
    ]);
    expect(rpc).toHaveBeenCalledWith('list_venue_members', { p_venue_id: 'v1' });
  });

  it('is forbidden for non-admins', async () => {
    rpc.mockResolvedValue({ data: null, error: { code: '42501', message: 'forbidden' } });
    await expect(listVenueMembers('v1')).rejects.toMatchObject({ code: 'forbidden' });
  });

  it('rejects an unknown role', async () => {
    rpc.mockResolvedValue({
      data: [{ user_id: 'u1', role: 'god', display_name: null, handle: null }],
      error: null,
    });
    await expect(listVenueMembers('v1')).rejects.toMatchObject({ code: 'unknown' });
  });
});

describe('removeVenueMember', () => {
  it('deletes the membership', async () => {
    const q = chain({ data: [{ user_id: 'u2' }], error: null });
    from.mockReturnValue(q);

    await removeVenueMember('v1', 'u2');

    expect(from).toHaveBeenCalledWith('venue_members');
    expect(q.eq).toHaveBeenCalledWith('venue_id', 'v1');
    expect(q.eq).toHaveBeenCalledWith('user_id', 'u2');
  });

  it('is forbidden when RLS deletes nothing (e.g. an owner row)', async () => {
    from.mockReturnValue(chain({ data: [], error: null }));
    await expect(removeVenueMember('v1', 'u2')).rejects.toMatchObject({ code: 'forbidden' });
  });

  it('maps database errors', async () => {
    from.mockReturnValue(chain({ data: null, error: { message: 'x' } }));
    await expect(removeVenueMember('v1', 'u2')).rejects.toMatchObject({ code: 'unknown' });
  });
});

describe('inviteVenueStaff', () => {
  it('returns the raw token from create_venue_invite', async () => {
    rpc.mockResolvedValue({ data: 'raw-token', error: null });

    expect(await inviteVenueStaff('v1', 'a@b.co', 'host')).toBe('raw-token');
    expect(rpc).toHaveBeenCalledWith('create_venue_invite', {
      p_venue_id: 'v1',
      p_email: 'a@b.co',
      p_role: 'host',
    });
  });

  it('does not put the token or server text into errors', async () => {
    rpc.mockResolvedValue({ data: null, error: { code: '22023', message: 'invalid invite' } });
    const error = await inviteVenueStaff('v1', 'bad', 'host').catch((e: Error) => e);
    expect(error).toMatchObject({ code: 'invalid', message: 'venue_cabinet_invalid' });
  });

  it('fails when no token comes back', async () => {
    rpc.mockResolvedValue({ data: null, error: null });
    await expect(inviteVenueStaff('v1', 'a@b.co', 'admin')).rejects.toMatchObject({
      code: 'unknown',
    });
  });
});

describe('listVenueInvites', () => {
  it('lists open invites without a token field', async () => {
    const q = chain({
      data: [
        {
          id: 'i1',
          email: 'a@b.co',
          role: 'host',
          created_at: '2026-11-01T10:00:00Z',
          expires_at: '2026-11-08T10:00:00Z',
        },
        { id: 'i2', email: 'x@y.co', role: 'owner', created_at: '', expires_at: '' },
      ],
      error: null,
    });
    from.mockReturnValue(q);

    const invites = await listVenueInvites('v1');

    expect(invites).toEqual([
      {
        id: 'i1',
        email: 'a@b.co',
        role: 'host',
        createdAt: new Date('2026-11-01T10:00:00Z'),
        expiresAt: new Date('2026-11-08T10:00:00Z'),
      },
    ]);
    expect(q.select).toHaveBeenCalledWith('id, email, role, created_at, expires_at');
    expect(q.is).toHaveBeenCalledWith('accepted_at', null);
  });

  it('maps errors', async () => {
    from.mockReturnValue(chain({ data: null, error: { code: '42501', message: 'x' } }));
    await expect(listVenueInvites('v1')).rejects.toMatchObject({ code: 'forbidden' });
  });
});

describe('cancelVenueInvite', () => {
  it('deletes the invite', async () => {
    const q = chain({ data: null, error: null });
    from.mockReturnValue(q);
    await cancelVenueInvite('i1');
    expect(from).toHaveBeenCalledWith('venue_invites');
    expect(q.eq).toHaveBeenCalledWith('id', 'i1');
  });

  it('maps errors', async () => {
    from.mockReturnValue(chain({ data: null, error: { message: 'x' } }));
    await expect(cancelVenueInvite('i1')).rejects.toMatchObject({ code: 'unknown' });
  });
});

describe('acceptVenueInvite', () => {
  it('returns the venue id', async () => {
    rpc.mockResolvedValue({ data: 'v1', error: null });
    expect(await acceptVenueInvite('tok')).toBe('v1');
    expect(rpc).toHaveBeenCalledWith('accept_venue_invite', { p_token: 'tok' });
  });

  it('rejects an invalid or foreign token generically', async () => {
    rpc.mockResolvedValue({ data: null, error: { code: '22023', message: 'invalid invite' } });
    await expect(acceptVenueInvite('tok')).rejects.toMatchObject({ code: 'invalid' });
  });

  it('fails when no venue comes back', async () => {
    rpc.mockResolvedValue({ data: null, error: null });
    await expect(acceptVenueInvite('tok')).rejects.toMatchObject({ code: 'unknown' });
  });
});
