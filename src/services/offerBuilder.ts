import type {
  BuilderOffer,
  OfferKind,
  OfferStats,
  OfferStatus,
  OfferWindow,
} from '@/types/offerBuilder';

import { supabase } from './supabase';

export type OfferBuilderErrorCode =
  'forbidden' | 'not_found' | 'invalid_state' | 'unauthenticated' | 'network' | 'unknown';

/** Generic, safe-to-show error. Never contains server messages. */
export class OfferBuilderError extends Error {
  readonly code: OfferBuilderErrorCode;

  constructor(code: OfferBuilderErrorCode) {
    super(`offer_builder_${code}`);
    this.name = 'OfferBuilderError';
    this.code = code;
  }
}

const OFFER_KINDS: readonly OfferKind[] = [
  'percent_off',
  'amount_off',
  'free_entry_until',
  'gift',
  'two_for_one',
  'custom',
];
const OFFER_STATUSES: readonly OfferStatus[] = ['draft', 'scheduled', 'live', 'paused', 'ended'];
const KYIV_TIME_ZONE = 'Europe/Kyiv';

/**
 * Same rule as the SQL function `offer_effective_status`: the stored status is the venue's
 * intent, live / scheduled / ended are derived from the time window.
 */
export function offerEffectiveStatus(offer: OfferWindow, now: Date = new Date()): OfferStatus {
  if (offer.status === 'draft' || offer.status === 'paused' || offer.status === 'ended') {
    return offer.status;
  }
  if (offer.endsAt && offer.endsAt <= now) return 'ended';
  if (offer.startsAt && offer.startsAt > now) return 'scheduled';
  return 'live';
}

/** Default title from the template, in Ukrainian. The venue can edit it. */
export function generateOfferTitle(kind: OfferKind, value: string | null): string {
  const text = value?.trim() ?? '';
  switch (kind) {
    case 'percent_off':
      return `−${text}% на вхід`;
    case 'amount_off':
      return `−${text} ₴ на вхід`;
    case 'free_entry_until':
      return `Безкоштовний вхід до ${text}`;
    case 'gift':
      return `${text} у подарунок`;
    case 'two_for_one':
      return '2 за ціною 1';
    case 'custom':
      return text || 'Спеціальна пропозиція';
  }
}

function formatKyivTime(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: KYIV_TIME_ZONE,
  }).format(date);
}

/** Default terms: show the QR at the door, until the offer time if there is one. */
export function generateOfferTerms(
  kind: OfferKind,
  value: string | null,
  endsAt: Date | null,
): string {
  const deadline = kind === 'free_entry_until' ? value?.trim() || null : null;
  const until = deadline ?? (endsAt ? formatKyivTime(endsAt) : null);
  return until ? `Покажи QR на вході до ${until}` : 'Покажи QR на вході';
}

type ClientError = { code?: string; message?: string };

function toOfferBuilderError(error: ClientError): OfferBuilderError {
  if (error.code === '42501') return new OfferBuilderError('forbidden');
  if (error.code === 'P0002') return new OfferBuilderError('not_found');
  if (error.code === '22023') return new OfferBuilderError('invalid_state');
  const text = (error.message ?? '').toLowerCase();
  if (text.includes('fetch') || text.includes('network')) return new OfferBuilderError('network');
  return new OfferBuilderError('unknown');
}

type OfferRow = {
  id: string;
  event_id: string | null;
  venue_id: string;
  kind: string;
  value: string | null;
  title: string;
  terms: string | null;
  max_claims: number | null;
  per_user_limit: number;
  starts_at: string | null;
  ends_at: string | null;
  status: string;
};

function toBuilderOffer(row: OfferRow): BuilderOffer {
  const kind = OFFER_KINDS.find((k) => k === row.kind);
  const status = OFFER_STATUSES.find((s) => s === row.status);
  if (!kind || !status) throw new OfferBuilderError('unknown');
  return {
    id: row.id,
    eventId: row.event_id,
    venueId: row.venue_id,
    kind,
    value: row.value,
    title: row.title,
    terms: row.terms,
    maxClaims: row.max_claims,
    perUserLimit: row.per_user_limit,
    startsAt: row.starts_at ? new Date(row.starts_at) : null,
    endsAt: row.ends_at ? new Date(row.ends_at) : null,
    status,
  };
}

type OfferAction = 'pause_offer' | 'resume_offer' | 'end_offer' | 'duplicate_offer';

async function callOfferAction(action: OfferAction, offerId: string): Promise<BuilderOffer> {
  const { data, error } = await supabase.rpc(action, { p_offer_id: offerId });
  if (error) throw toOfferBuilderError(error);
  if (!data) throw new OfferBuilderError('unknown');
  return toBuilderOffer(data);
}

/** Stops a live or scheduled offer. Only venue admins (and superadmin); enforced by the server. */
export function pauseOffer(offerId: string): Promise<BuilderOffer> {
  return callOfferAction('pause_offer', offerId);
}

export function resumeOffer(offerId: string): Promise<BuilderOffer> {
  return callOfferAction('resume_offer', offerId);
}

export function endOffer(offerId: string): Promise<BuilderOffer> {
  return callOfferAction('end_offer', offerId);
}

/** Creates a draft copy without a time window. */
export function duplicateOffer(offerId: string): Promise<BuilderOffer> {
  return callOfferAction('duplicate_offer', offerId);
}

type StatsRow = { offer_id: string; claims: number | null; redemptions: number | null };

/** Claims and redemptions for every offer of a venue. RLS returns rows to venue admins only. */
export async function listVenueOfferStats(venueId: string): Promise<OfferStats[]> {
  const { data, error } = await supabase
    .from('offer_stats')
    .select('offer_id, claims, redemptions')
    .eq('venue_id', venueId)
    .returns<StatsRow[]>();
  if (error) throw toOfferBuilderError(error);
  return (data ?? []).map((row) => ({
    offerId: row.offer_id,
    claims: row.claims ?? 0,
    redemptions: row.redemptions ?? 0,
  }));
}
