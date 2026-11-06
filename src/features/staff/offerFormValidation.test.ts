import type { AdminOffer } from '@/types/admin';

import {
  emptyOfferForm,
  offerToFormValues,
  toOfferSubmission,
  validateOfferForm,
} from './offerFormValidation';

const valid = { ...emptyOfferForm, title: 'Шот у подарунок' };

describe('validateOfferForm', () => {
  it('accepts a title with defaults', () => {
    expect(validateOfferForm(valid)).toEqual({});
  });

  it('requires a title and caps its length', () => {
    expect(validateOfferForm({ ...valid, title: '  ' }).title).toBe(
      'offerForm.error.titleRequired',
    );
    expect(validateOfferForm({ ...valid, title: 'a'.repeat(121) }).title).toBe(
      'offerForm.error.titleTooLong',
    );
  });

  it('caps the terms length', () => {
    expect(validateOfferForm({ ...valid, terms: 'a'.repeat(501) }).terms).toBe(
      'offerForm.error.termsTooLong',
    );
  });

  it('allows a blank max claims but rejects zero and non-numbers', () => {
    expect(validateOfferForm({ ...valid, maxClaims: '' }).maxClaims).toBeUndefined();
    expect(validateOfferForm({ ...valid, maxClaims: '50' }).maxClaims).toBeUndefined();
    expect(validateOfferForm({ ...valid, maxClaims: '0' }).maxClaims).toBe(
      'offerForm.error.maxClaimsInvalid',
    );
    expect(validateOfferForm({ ...valid, maxClaims: '-3' }).maxClaims).toBe(
      'offerForm.error.maxClaimsInvalid',
    );
    expect(validateOfferForm({ ...valid, maxClaims: '1.5' }).maxClaims).toBe(
      'offerForm.error.maxClaimsInvalid',
    );
  });

  it('requires a per-user limit of at least 1', () => {
    expect(validateOfferForm({ ...valid, perUserLimit: '' }).perUserLimit).toBe(
      'offerForm.error.perUserLimitInvalid',
    );
    expect(validateOfferForm({ ...valid, perUserLimit: '0' }).perUserLimit).toBe(
      'offerForm.error.perUserLimitInvalid',
    );
    expect(validateOfferForm({ ...valid, perUserLimit: '2' }).perUserLimit).toBeUndefined();
  });
});

describe('toOfferSubmission', () => {
  it('returns null for invalid values', () => {
    expect(toOfferSubmission(emptyOfferForm)).toBeNull();
  });

  it('builds trimmed service input', () => {
    const validUntil = new Date(2026, 10, 8, 23, 0);
    expect(
      toOfferSubmission({
        title: ' Шот ',
        terms: ' Один на гостя ',
        maxClaims: '40',
        perUserLimit: '2',
        validUntil,
        isActive: false,
      }),
    ).toEqual({
      input: { title: 'Шот', terms: 'Один на гостя', maxClaims: 40, perUserLimit: 2, validUntil },
      isActive: false,
    });
  });

  it('maps blank terms and max claims to null', () => {
    expect(toOfferSubmission(valid)?.input).toMatchObject({
      terms: null,
      maxClaims: null,
      perUserLimit: 1,
      validUntil: null,
    });
  });
});

describe('offerToFormValues', () => {
  it('turns an offer into form text', () => {
    const offer: AdminOffer = {
      id: 'o1',
      eventId: 'e1',
      title: 'Шот',
      terms: null,
      maxClaims: 10,
      perUserLimit: 1,
      validUntil: null,
      isActive: false,
    };
    expect(offerToFormValues(offer)).toEqual({
      title: 'Шот',
      terms: '',
      maxClaims: '10',
      perUserLimit: '1',
      validUntil: null,
      isActive: false,
    });
  });
});
