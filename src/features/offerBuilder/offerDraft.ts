import type { OfferDraft, TimeWindow } from '@/components/ui';
import { formatKyivTime } from '@/lib/kyivTime';
import {
  generateOfferTerms,
  generateOfferTitle,
  type VenueOfferInput,
} from '@/services/offerBuilder';
import type { BuilderOffer, OfferKind } from '@/types/offerBuilder';

export const OFFER_TITLE_MAX_LENGTH = 120;
export const OFFER_TERMS_MAX_LENGTH = 500;
export const MAX_PER_GUEST = 10;

export type OfferWhenMode = 'event' | 'window';

/** What the venue has typed so far. Lives in the wizard, so an error never loses it. */
export type OfferWizardDraft = {
  kind: OfferKind | null;
  value: string;
  /** null = use the generated title; a string = the venue edited it. */
  title: string | null;
  terms: string | null;
  whenMode: OfferWhenMode;
  eventId: string | null;
  window: TimeWindow;
  /** Empty text = no total limit. */
  maxClaims: string;
  perUserLimit: number;
};

export type OfferIntent = 'publish' | 'schedule' | 'draft';

export type OfferDraftErrorKey =
  | 'offerBuilder.error.valueRequired'
  | 'offerBuilder.error.percentInvalid'
  | 'offerBuilder.error.amountInvalid'
  | 'offerBuilder.error.timeInvalid'
  | 'offerBuilder.error.giftTooLong'
  | 'offerBuilder.error.titleRequired'
  | 'offerBuilder.error.titleTooLong'
  | 'offerBuilder.error.termsTooLong'
  | 'offerBuilder.error.eventRequired'
  | 'offerBuilder.error.windowEndRequired'
  | 'offerBuilder.error.windowOrder'
  | 'offerBuilder.error.windowPast'
  | 'offerBuilder.error.scheduleStart'
  | 'offerBuilder.error.maxClaimsInvalid';

export const emptyOfferDraft: OfferWizardDraft = {
  kind: null,
  value: '',
  title: null,
  terms: null,
  whenMode: 'window',
  eventId: null,
  window: { from: null, to: null },
  maxClaims: '',
  perUserLimit: 1,
};

export function draftFromOffer(offer: BuilderOffer): OfferWizardDraft {
  return {
    kind: offer.kind,
    value: offer.value ?? '',
    title: offer.title,
    terms: offer.terms,
    whenMode: offer.eventId ? 'event' : 'window',
    eventId: offer.eventId,
    window: { from: offer.startsAt, to: offer.endsAt },
    maxClaims: offer.maxClaims === null ? '' : String(offer.maxClaims),
    perUserLimit: offer.perUserLimit,
  };
}

/** Kinds that ask for a value in step 2. */
export function kindNeedsValue(kind: OfferKind): kind is Exclude<OfferKind, 'two_for_one'> {
  return kind !== 'two_for_one';
}

function normalizedValue(draft: OfferWizardDraft): string | null {
  if (!draft.kind || !kindNeedsValue(draft.kind)) return null;
  const value = draft.value.trim();
  return value === '' ? null : value;
}

function windowEnd(draft: OfferWizardDraft): Date | null {
  return draft.whenMode === 'window' ? draft.window.to : null;
}

export function offerTitle(draft: OfferWizardDraft): string {
  if (draft.title !== null) return draft.title.trim();
  return draft.kind ? generateOfferTitle(draft.kind, normalizedValue(draft)) : '';
}

export function offerTerms(draft: OfferWizardDraft): string {
  if (draft.terms !== null) return draft.terms.trim();
  return draft.kind ? generateOfferTerms(draft.kind, normalizedValue(draft), windowEnd(draft)) : '';
}

const PERCENT_PATTERN = /^\d{1,3}$/;
const AMOUNT_PATTERN = /^\d{1,6}([.,]\d{1,2})?$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const GIFT_MAX_LENGTH = 80;

function valueError(draft: OfferWizardDraft): OfferDraftErrorKey | null {
  if (!draft.kind || !kindNeedsValue(draft.kind)) return null;
  const value = draft.value.trim();
  switch (draft.kind) {
    case 'percent_off': {
      const ok = PERCENT_PATTERN.test(value) && Number(value) >= 1 && Number(value) <= 100;
      return ok ? null : 'offerBuilder.error.percentInvalid';
    }
    case 'amount_off': {
      const ok = AMOUNT_PATTERN.test(value) && Number(value.replace(',', '.')) > 0;
      return ok ? null : 'offerBuilder.error.amountInvalid';
    }
    case 'free_entry_until':
      return TIME_PATTERN.test(value) ? null : 'offerBuilder.error.timeInvalid';
    case 'gift':
      if (value === '') return 'offerBuilder.error.valueRequired';
      return value.length > GIFT_MAX_LENGTH ? 'offerBuilder.error.giftTooLong' : null;
    default:
      return null;
  }
}

export type DetailsErrors = {
  value?: OfferDraftErrorKey;
  title?: OfferDraftErrorKey;
  terms?: OfferDraftErrorKey;
};

export function validateDetails(draft: OfferWizardDraft): DetailsErrors {
  const errors: DetailsErrors = {};
  const value = valueError(draft);
  if (value) errors.value = value;
  const title = offerTitle(draft);
  if (title === '') errors.title = 'offerBuilder.error.titleRequired';
  else if (title.length > OFFER_TITLE_MAX_LENGTH) errors.title = 'offerBuilder.error.titleTooLong';
  if (offerTerms(draft).length > OFFER_TERMS_MAX_LENGTH) {
    errors.terms = 'offerBuilder.error.termsTooLong';
  }
  return errors;
}

export type WhenErrors = { event?: OfferDraftErrorKey; window?: OfferDraftErrorKey };

/** `intent` matters: a scheduled offer needs a start in the future. */
export function validateWhen(
  draft: OfferWizardDraft,
  intent: OfferIntent,
  now: Date = new Date(),
): WhenErrors {
  if (draft.whenMode === 'event') {
    return draft.eventId ? {} : { event: 'offerBuilder.error.eventRequired' };
  }
  const { from, to } = draft.window;
  if (intent === 'draft' && !from && !to) return {};
  if (!to) return { window: 'offerBuilder.error.windowEndRequired' };
  if (from && to <= from) return { window: 'offerBuilder.error.windowOrder' };
  if (intent !== 'draft' && to <= now) return { window: 'offerBuilder.error.windowPast' };
  if (intent === 'schedule' && (!from || from <= now)) {
    return { window: 'offerBuilder.error.scheduleStart' };
  }
  return {};
}

export type LimitsErrors = { maxClaims?: OfferDraftErrorKey };

export function validateLimits(draft: OfferWizardDraft): LimitsErrors {
  const text = draft.maxClaims.trim();
  if (text === '') return {};
  const ok = /^\d{1,7}$/.test(text) && Number(text) >= 1;
  return ok ? {} : { maxClaims: 'offerBuilder.error.maxClaimsInvalid' };
}

/** True when every step passes for the intent. */
export function isDraftValid(
  draft: OfferWizardDraft,
  intent: OfferIntent,
  now: Date = new Date(),
): boolean {
  if (!draft.kind) return false;
  return (
    Object.keys(validateDetails(draft)).length === 0 &&
    Object.keys(validateWhen(draft, intent, now)).length === 0 &&
    Object.keys(validateLimits(draft)).length === 0
  );
}

const INTENT_STATUS: Record<OfferIntent, VenueOfferInput['status']> = {
  publish: 'live',
  schedule: 'scheduled',
  draft: 'draft',
};

/** Builds the payload for the service. Returns null when the draft is not valid for the intent. */
export function toOfferInput(
  draft: OfferWizardDraft,
  intent: OfferIntent,
  now: Date = new Date(),
): VenueOfferInput | null {
  if (!draft.kind || !isDraftValid(draft, intent, now)) return null;
  const inEvent = draft.whenMode === 'event';
  const maxClaims = draft.maxClaims.trim();
  const terms = offerTerms(draft);
  return {
    eventId: inEvent ? draft.eventId : null,
    kind: draft.kind,
    value: normalizedValue(draft)?.replace(',', '.') ?? null,
    title: offerTitle(draft),
    terms: terms === '' ? null : terms,
    maxClaims: maxClaims === '' ? null : Number(maxClaims),
    perUserLimit: draft.perUserLimit,
    startsAt: inEvent ? null : draft.window.from,
    endsAt: inEvent ? null : draft.window.to,
    status: INTENT_STATUS[intent],
  };
}

/** The texts the guest preview shows, formatted like the guest screens. */
export function toPreviewDraft(
  draft: OfferWizardDraft,
  venueName: string,
  eventTitle: string | null,
  validUntilText: (time: string | null, eventTitle: string | null) => string,
): OfferDraft {
  const end = windowEnd(draft);
  return {
    title: offerTitle(draft),
    condition: offerTerms(draft),
    venueName,
    validUntil: validUntilText(end ? formatKyivTime(end) : null, eventTitle),
  };
}
