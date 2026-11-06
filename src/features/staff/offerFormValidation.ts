import type { TranslationKey } from '@/lib/i18n';
import type { AdminOffer, OfferInput } from '@/types/admin';

export const OFFER_TITLE_MAX_LENGTH = 120;
export const OFFER_TERMS_MAX_LENGTH = 500;
const COUNT_PATTERN = /^\d{1,6}$/;

/** What the offer form holds while the admin types. */
export type OfferFormValues = {
  title: string;
  terms: string;
  /** Blank means unlimited. */
  maxClaims: string;
  perUserLimit: string;
  validUntil: Date | null;
  isActive: boolean;
};

export type OfferFormErrors = Partial<
  Record<'title' | 'terms' | 'maxClaims' | 'perUserLimit', TranslationKey>
>;

export const emptyOfferForm: OfferFormValues = {
  title: '',
  terms: '',
  maxClaims: '',
  perUserLimit: '1',
  validUntil: null,
  isActive: true,
};

export function offerToFormValues(offer: AdminOffer): OfferFormValues {
  return {
    title: offer.title,
    terms: offer.terms ?? '',
    maxClaims: offer.maxClaims === null ? '' : String(offer.maxClaims),
    perUserLimit: String(offer.perUserLimit),
    validUntil: offer.validUntil,
    isActive: offer.isActive,
  };
}

function parsePositive(text: string): number | 'invalid' {
  const trimmed = text.trim();
  if (!COUNT_PATTERN.test(trimmed)) return 'invalid';
  const value = Number(trimmed);
  return value > 0 ? value : 'invalid';
}

/** Field errors keyed by field; an empty object means the form may be saved. */
export function validateOfferForm(values: OfferFormValues): OfferFormErrors {
  const errors: OfferFormErrors = {};
  const title = values.title.trim();
  if (title === '') errors.title = 'offerForm.error.titleRequired';
  else if (title.length > OFFER_TITLE_MAX_LENGTH) errors.title = 'offerForm.error.titleTooLong';

  if (values.terms.trim().length > OFFER_TERMS_MAX_LENGTH) {
    errors.terms = 'offerForm.error.termsTooLong';
  }
  if (values.maxClaims.trim() !== '' && parsePositive(values.maxClaims) === 'invalid') {
    errors.maxClaims = 'offerForm.error.maxClaimsInvalid';
  }
  if (parsePositive(values.perUserLimit) === 'invalid') {
    errors.perUserLimit = 'offerForm.error.perUserLimitInvalid';
  }
  return errors;
}

export type OfferSubmission = { input: OfferInput; isActive: boolean };

/** Service input from valid values. Returns null when validation fails. */
export function toOfferSubmission(values: OfferFormValues): OfferSubmission | null {
  if (Object.keys(validateOfferForm(values)).length > 0) return null;
  const maxClaims = values.maxClaims.trim() === '' ? null : parsePositive(values.maxClaims);
  const perUserLimit = parsePositive(values.perUserLimit);
  return {
    input: {
      title: values.title.trim(),
      terms: values.terms.trim() === '' ? null : values.terms.trim(),
      maxClaims: maxClaims === 'invalid' ? null : maxClaims,
      perUserLimit: perUserLimit === 'invalid' ? 1 : perUserLimit,
      validUntil: values.validUntil,
    },
    isActive: values.isActive,
  };
}
