import type { BuilderOffer } from '@/types/offerBuilder';

import {
  draftFromOffer,
  emptyOfferDraft,
  isDraftValid,
  offerTerms,
  offerTitle,
  toOfferInput,
  toPreviewDraft,
  validateDetails,
  validateLimits,
  validateWhen,
  type OfferWizardDraft,
} from './offerDraft';

jest.mock('@/services/supabase', () => ({ supabase: {} }));

const now = new Date('2026-12-01T10:00:00.000Z');
const later = new Date('2026-12-01T20:00:00.000Z');
const muchLater = new Date('2026-12-02T20:00:00.000Z');

const percent: OfferWizardDraft = {
  ...emptyOfferDraft,
  kind: 'percent_off',
  value: '20',
  window: { from: null, to: later },
};

describe('title and terms', () => {
  it('are generated from the template until the venue edits them', () => {
    expect(offerTitle(percent)).toBe('−20% на вхід');
    expect(offerTerms(percent)).toMatch(/^Покажи QR на вході до \d{2}:\d{2}$/);
  });

  it('keep the venue edit', () => {
    const edited = { ...percent, title: ' Моя знижка ', terms: 'Лише для своїх' };
    expect(offerTitle(edited)).toBe('Моя знижка');
    expect(offerTerms(edited)).toBe('Лише для своїх');
  });

  it('are empty before a template is chosen', () => {
    expect(offerTitle(emptyOfferDraft)).toBe('');
  });
});

describe('validateDetails', () => {
  it('accepts a valid percent', () => {
    expect(validateDetails(percent)).toEqual({});
  });

  it.each([
    ['percent_off', '0', 'offerBuilder.error.percentInvalid'],
    ['percent_off', '101', 'offerBuilder.error.percentInvalid'],
    ['percent_off', 'abc', 'offerBuilder.error.percentInvalid'],
    ['amount_off', '0', 'offerBuilder.error.amountInvalid'],
    ['amount_off', '', 'offerBuilder.error.amountInvalid'],
    ['free_entry_until', '25:00', 'offerBuilder.error.timeInvalid'],
    ['gift', '', 'offerBuilder.error.valueRequired'],
    ['gift', 'x'.repeat(81), 'offerBuilder.error.giftTooLong'],
  ] as const)('rejects %s value "%s"', (kind, value, expected) => {
    expect(validateDetails({ ...percent, kind, value }).value).toBe(expected);
  });

  it('accepts a comma decimal amount and a 2-for-1 without value', () => {
    expect(validateDetails({ ...percent, kind: 'amount_off', value: '49,5' })).toEqual({});
    expect(validateDetails({ ...percent, kind: 'two_for_one', value: '' })).toEqual({});
  });

  it('requires a title and limits lengths', () => {
    expect(validateDetails({ ...percent, title: '  ' }).title).toBe(
      'offerBuilder.error.titleRequired',
    );
    expect(validateDetails({ ...percent, title: 'x'.repeat(121) }).title).toBe(
      'offerBuilder.error.titleTooLong',
    );
    expect(validateDetails({ ...percent, terms: 'x'.repeat(501) }).terms).toBe(
      'offerBuilder.error.termsTooLong',
    );
  });
});

describe('validateWhen', () => {
  it('requires an event in event mode', () => {
    const draft = { ...percent, whenMode: 'event' as const };
    expect(validateWhen(draft, 'publish', now).event).toBe('offerBuilder.error.eventRequired');
    expect(validateWhen({ ...draft, eventId: 'e1' }, 'publish', now)).toEqual({});
  });

  it('requires an end in window mode, except for an empty draft', () => {
    const open = { ...percent, window: { from: null, to: null } };
    expect(validateWhen(open, 'publish', now).window).toBe('offerBuilder.error.windowEndRequired');
    expect(validateWhen(open, 'draft', now)).toEqual({});
  });

  it('rejects end before start and an end in the past', () => {
    expect(
      validateWhen({ ...percent, window: { from: later, to: now } }, 'draft', now).window,
    ).toBe('offerBuilder.error.windowOrder');
    expect(
      validateWhen({ ...percent, window: { from: null, to: now } }, 'publish', now).window,
    ).toBe('offerBuilder.error.windowPast');
  });

  it('needs a future start to schedule', () => {
    expect(validateWhen(percent, 'schedule', now).window).toBe('offerBuilder.error.scheduleStart');
    const scheduled = { ...percent, window: { from: later, to: muchLater } };
    expect(validateWhen(scheduled, 'schedule', now)).toEqual({});
  });
});

describe('validateLimits', () => {
  it('allows empty (no limit) or a positive whole number', () => {
    expect(validateLimits({ ...percent, maxClaims: '' })).toEqual({});
    expect(validateLimits({ ...percent, maxClaims: '50' })).toEqual({});
  });

  it.each(['0', '-3', '1.5', 'abc'])('rejects "%s"', (maxClaims) => {
    expect(validateLimits({ ...percent, maxClaims }).maxClaims).toBe(
      'offerBuilder.error.maxClaimsInvalid',
    );
  });
});

describe('toOfferInput', () => {
  it('builds a live offer for publish', () => {
    expect(toOfferInput({ ...percent, maxClaims: '50', perUserLimit: 2 }, 'publish', now)).toEqual(
      expect.objectContaining({
        kind: 'percent_off',
        value: '20',
        title: '−20% на вхід',
        maxClaims: 50,
        perUserLimit: 2,
        startsAt: null,
        endsAt: later,
        eventId: null,
        status: 'live',
      }),
    );
  });

  it('maps schedule and draft to their statuses', () => {
    const scheduled = { ...percent, window: { from: later, to: muchLater } };
    expect(toOfferInput(scheduled, 'schedule', now)?.status).toBe('scheduled');
    expect(toOfferInput(percent, 'draft', now)?.status).toBe('draft');
  });

  it('ties an event offer to the event and drops the window', () => {
    const draft = { ...percent, whenMode: 'event' as const, eventId: 'e1' };
    expect(toOfferInput(draft, 'publish', now)).toEqual(
      expect.objectContaining({ eventId: 'e1', startsAt: null, endsAt: null }),
    );
  });

  it('stores no value for 2-for-1 and a dot decimal for amounts', () => {
    expect(toOfferInput({ ...percent, kind: 'two_for_one', value: '7' }, 'draft', now)?.value).toBe(
      null,
    );
    expect(
      toOfferInput({ ...percent, kind: 'amount_off', value: '49,5' }, 'draft', now)?.value,
    ).toBe('49.5');
  });

  it('returns null for an invalid draft or without a template', () => {
    expect(toOfferInput({ ...percent, value: '0' }, 'publish', now)).toBeNull();
    expect(toOfferInput(emptyOfferDraft, 'draft', now)).toBeNull();
    expect(isDraftValid(emptyOfferDraft, 'draft', now)).toBe(false);
  });
});

describe('draftFromOffer', () => {
  const offer: BuilderOffer = {
    id: 'o1',
    eventId: 'e1',
    venueId: 'v1',
    kind: 'gift',
    value: 'Шот',
    title: 'Шот у подарунок',
    terms: null,
    maxClaims: 30,
    perUserLimit: 2,
    startsAt: null,
    endsAt: null,
    status: 'draft',
  };

  it('restores every field for editing', () => {
    expect(draftFromOffer(offer)).toEqual({
      kind: 'gift',
      value: 'Шот',
      title: 'Шот у подарунок',
      terms: null,
      whenMode: 'event',
      eventId: 'e1',
      window: { from: null, to: null },
      maxClaims: '30',
      perUserLimit: 2,
    });
  });
});

describe('toPreviewDraft', () => {
  it('formats the texts guests see', () => {
    const preview = toPreviewDraft(percent, 'Club', null, (time) => `до ${time}`);
    expect(preview.title).toBe('−20% на вхід');
    expect(preview.venueName).toBe('Club');
    expect(preview.validUntil).toMatch(/^до \d{2}:\d{2}$/);
  });
});
