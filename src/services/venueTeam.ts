import { supabase } from './supabase';
import { toVenueCabinetError, VenueCabinetError } from './venueCabinetError';

export type VenueRole = 'owner' | 'admin' | 'host';
export type VenueStaffRole = 'admin' | 'host';

export type VenueMember = {
  userId: string;
  role: VenueRole;
  displayName: string | null;
  handle: string | null;
};

export type VenueInvite = {
  id: string;
  email: string;
  role: VenueStaffRole;
  createdAt: Date;
  expiresAt: Date;
};

type MemberRow = {
  user_id: string;
  role: string;
  display_name: string | null;
  handle: string | null;
};

type InviteRow = {
  id: string;
  email: string;
  role: string;
  created_at: string;
  expires_at: string;
};

function toRole(role: string): VenueRole {
  if (role === 'owner' || role === 'admin' || role === 'host') return role;
  throw new VenueCabinetError('unknown');
}

/** Team of a venue with profile names. Only owner/admin (or superadmin) may call it; the server checks. */
export async function listVenueMembers(venueId: string): Promise<VenueMember[]> {
  const { data, error } = await supabase.rpc('list_venue_members', { p_venue_id: venueId });
  if (error) throw toVenueCabinetError(error);
  const rows: MemberRow[] = data ?? [];
  return rows.map((row) => ({
    userId: row.user_id,
    role: toRole(row.role),
    displayName: row.display_name,
    handle: row.handle,
  }));
}

/** Owner removes an admin or host (never an owner; RLS enforces it). */
export async function removeVenueMember(venueId: string, userId: string): Promise<void> {
  const { data, error } = await supabase
    .from('venue_members')
    .delete()
    .eq('venue_id', venueId)
    .eq('user_id', userId)
    .select('user_id');
  if (error) throw toVenueCabinetError(error);
  if (!data || data.length === 0) throw new VenueCabinetError('forbidden');
}

/**
 * Invites staff by email. Returns the raw token ONCE: the caller shows it to the owner and must not
 * store or log it. Only its hash exists in the database.
 */
export async function inviteVenueStaff(
  venueId: string,
  email: string,
  role: VenueStaffRole,
): Promise<string> {
  const { data, error } = await supabase.rpc('create_venue_invite', {
    p_venue_id: venueId,
    p_email: email,
    p_role: role,
  });
  if (error) throw toVenueCabinetError(error);
  if (!data) throw new VenueCabinetError('unknown');
  return data;
}

/** Open (not accepted) invites of a venue. token_hash is never readable by clients. */
export async function listVenueInvites(venueId: string): Promise<VenueInvite[]> {
  const { data, error } = await supabase
    .from('venue_invites')
    .select('id, email, role, created_at, expires_at')
    .eq('venue_id', venueId)
    .is('accepted_at', null)
    .order('created_at', { ascending: false })
    .returns<InviteRow[]>();
  if (error) throw toVenueCabinetError(error);
  return (data ?? []).flatMap((row) =>
    row.role === 'admin' || row.role === 'host'
      ? [
          {
            id: row.id,
            email: row.email,
            role: row.role,
            createdAt: new Date(row.created_at),
            expiresAt: new Date(row.expires_at),
          },
        ]
      : [],
  );
}

/** Cancels an open invite. */
export async function cancelVenueInvite(inviteId: string): Promise<void> {
  const { error } = await supabase.from('venue_invites').delete().eq('id', inviteId);
  if (error) throw toVenueCabinetError(error);
}

export type CabinetVenue = { id: string; name: string; role: VenueRole };

type CabinetRow = { role: string; venue: { id: string; name: string } };

/** Venues the signed-in user belongs to with their real role (owner stays owner), by name. */
export async function listMyCabinetVenues(): Promise<CabinetVenue[]> {
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user.id;
  if (!userId) throw new VenueCabinetError('forbidden');
  const { data, error } = await supabase
    .from('venue_members')
    .select('role, venue:venues!inner(id, name)')
    .eq('user_id', userId)
    .returns<CabinetRow[]>();
  if (error) throw toVenueCabinetError(error);
  return (data ?? [])
    .map((row) => ({ id: row.venue.id, name: row.venue.name, role: toRole(row.role) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** The invited user accepts with the token from the invite. Returns the venue id. */
export async function acceptVenueInvite(token: string): Promise<string> {
  const { data, error } = await supabase.rpc('accept_venue_invite', { p_token: token });
  if (error) throw toVenueCabinetError(error);
  if (!data) throw new VenueCabinetError('unknown');
  return data;
}
