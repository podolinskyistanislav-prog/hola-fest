import type { ClaimFailureReason, ClaimOfferResult, MyClaim } from '@/types/claims';

import { supabase } from './supabase';

export type ClaimsErrorCode = 'unauthenticated' | 'network' | 'unknown';

/** Generic, safe-to-show error. Never contains server messages. */
export class ClaimsError extends Error {
  readonly code: ClaimsErrorCode;

  constructor(code: ClaimsErrorCode) {
    super(`claims_${code}`);
    this.name = 'ClaimsError';
    this.code = code;
  }
}

// token_hash is deliberately not listed: clients must never read it.
const CLAIM_COLUMNS =
  'id, status, issued_at, redeemed_at, offer:offers!inner(id, title, terms, valid_until, event:events!inner(id, title, starts_at, venue:venues!inner(id, name, address)))';

type ClaimRow = {
  id: string;
  status: string;
  issued_at: string;
  redeemed_at: string | null;
  offer: {
    id: string;
    title: string;
    terms: string | null;
    valid_until: string | null;
    event: {
      id: string;
      title: string;
      starts_at: string;
      venue: { id: string; name: string; address: string | null };
    };
  };
};

const SERVER_REASONS: Record<string, ClaimFailureReason> = {
  offer_unavailable: 'unavailable',
  limit_reached: 'limit_reached',
  rate_limited: 'rate_limited',
  unauthorized: 'unauthenticated',
  invalid_request: 'invalid_request',
};

const STATUS_REASONS: Record<number, ClaimFailureReason> = {
  400: 'invalid_request',
  401: 'unauthenticated',
  409: 'unavailable',
  429: 'rate_limited',
};

function isNetworkMessage(message: string | undefined): boolean {
  const text = (message ?? '').toLowerCase();
  return text.includes('fetch') || text.includes('network');
}

async function readFailureReason(error: unknown): Promise<ClaimFailureReason> {
  const failure = error as { context?: unknown; message?: string } | null;
  if (failure?.context instanceof Response) {
    try {
      const body = (await failure.context.json()) as { error?: unknown };
      if (typeof body.error === 'string' && body.error in SERVER_REASONS) {
        return SERVER_REASONS[body.error] ?? 'unknown';
      }
    } catch {
      // unreadable body: fall back to the status code
    }
    return STATUS_REASONS[failure.context.status] ?? 'unknown';
  }
  return isNetworkMessage(failure?.message) ? 'network' : 'unknown';
}

/**
 * Claims an offer through the claim-offer Edge Function. The returned token is
 * the only copy: show it as a QR code and never log or persist it.
 */
export async function claimOffer(offerId: string): Promise<ClaimOfferResult> {
  const { data, error } = await supabase.functions.invoke<{ token?: unknown }>('claim-offer', {
    body: { offer_id: offerId },
  });

  if (error) return { ok: false, reason: await readFailureReason(error) };
  if (typeof data?.token !== 'string') return { ok: false, reason: 'unknown' };
  return { ok: true, token: data.token };
}

function toMyClaim(row: ClaimRow): MyClaim {
  const { offer } = row;
  return {
    id: row.id,
    status: row.status,
    issuedAt: new Date(row.issued_at),
    redeemedAt: row.redeemed_at ? new Date(row.redeemed_at) : null,
    offer: {
      id: offer.id,
      title: offer.title,
      terms: offer.terms,
      validUntil: offer.valid_until ? new Date(offer.valid_until) : null,
      event: {
        id: offer.event.id,
        title: offer.event.title,
        startsAt: new Date(offer.event.starts_at),
        venue: {
          id: offer.event.venue.id,
          name: offer.event.venue.name,
          address: offer.event.venue.address,
        },
      },
    },
  };
}

/** The signed-in user's claims, newest first, with offer, event and venue info. */
export async function getMyClaims(): Promise<MyClaim[]> {
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user.id;
  if (!userId) throw new ClaimsError('unauthenticated');

  const { data, error } = await supabase
    .from('claims')
    .select(CLAIM_COLUMNS)
    .eq('user_id', userId)
    .order('issued_at', { ascending: false })
    .returns<ClaimRow[]>();

  if (error) throw new ClaimsError(isNetworkMessage(error.message) ? 'network' : 'unknown');
  return (data ?? []).map(toMyClaim);
}
