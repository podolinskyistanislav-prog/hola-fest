import {
  emptyEventForm,
  eventToFormValues,
  toEventSubmission,
  validateEventForm,
  type EventFormValues,
} from './eventFormValidation';

const start = new Date(2026, 10, 7, 20, 0);
const valid: EventFormValues = { ...emptyEventForm, title: 'Ніч', startsAt: start };

describe('validateEventForm', () => {
  it('accepts a title and a start', () => {
    expect(validateEventForm(valid)).toEqual({});
  });

  it('requires a title and a start', () => {
    expect(validateEventForm(emptyEventForm)).toEqual({
      title: 'eventForm.error.titleRequired',
      startsAt: 'eventForm.error.startsRequired',
    });
  });

  it('rejects a blank or too long title', () => {
    expect(validateEventForm({ ...valid, title: '   ' }).title).toBe(
      'eventForm.error.titleRequired',
    );
    expect(validateEventForm({ ...valid, title: 'a'.repeat(121) }).title).toBe(
      'eventForm.error.titleTooLong',
    );
  });

  it('rejects an end that is not after the start', () => {
    expect(validateEventForm({ ...valid, endsAt: start }).endsAt).toBe(
      'eventForm.error.endsBeforeStart',
    );
    expect(validateEventForm({ ...valid, endsAt: new Date(2026, 10, 8) })).toEqual({});
  });

  it('accepts an empty or whole-number price and rejects the rest', () => {
    expect(validateEventForm({ ...valid, price: '' })).toEqual({});
    expect(validateEventForm({ ...valid, price: '150' })).toEqual({});
    for (const price of ['-5', '1.5', 'abc', '12345678']) {
      expect(validateEventForm({ ...valid, price }).price).toBe('eventForm.error.priceInvalid');
    }
  });

  it('rejects a too long lineup name', () => {
    expect(validateEventForm({ ...valid, lineup: ['a'.repeat(81)] }).lineup).toBe(
      'eventForm.error.lineupTooLong',
    );
  });
});

describe('toEventSubmission', () => {
  it('returns null for invalid values', () => {
    expect(toEventSubmission(emptyEventForm)).toBeNull();
  });

  it('trims, drops empty lineup rows and maps price and status', () => {
    expect(
      toEventSubmission({
        ...valid,
        title: '  Ніч ',
        description: '  ',
        lineup: [' DJ A ', ''],
        price: '150',
        published: true,
      }),
    ).toEqual({
      input: {
        title: 'Ніч',
        description: null,
        lineup: ['DJ A'],
        startsAt: start,
        endsAt: null,
        priceFromUah: 150,
      },
      status: 'published',
    });
  });
});

describe('eventToFormValues', () => {
  it('maps an event to form values', () => {
    expect(
      eventToFormValues({
        id: 'e',
        venueId: 'v',
        title: 'Ніч',
        description: null,
        lineup: ['A'],
        startsAt: start,
        endsAt: null,
        priceFromUah: 0,
        status: 'draft',
      }),
    ).toEqual({ ...valid, lineup: ['A'], price: '0' });
  });
});
