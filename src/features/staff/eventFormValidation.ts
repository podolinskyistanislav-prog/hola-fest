import type { TranslationKey } from '@/lib/i18n';
import type { AdminEvent, EventInput, EventStatus } from '@/types/admin';

export const TITLE_MAX_LENGTH = 120;
export const LINEUP_ITEM_MAX_LENGTH = 80;
export const LINEUP_MAX_ITEMS = 20;

/** What the form holds while the admin types. */
export type EventFormValues = {
  title: string;
  description: string;
  lineup: string[];
  startsAt: Date | null;
  endsAt: Date | null;
  price: string;
  published: boolean;
};

export type EventFormErrors = Partial<
  Record<'title' | 'startsAt' | 'endsAt' | 'price' | 'lineup', TranslationKey>
>;

export const emptyEventForm: EventFormValues = {
  title: '',
  description: '',
  lineup: [],
  startsAt: null,
  endsAt: null,
  price: '',
  published: false,
};

export function eventToFormValues(event: AdminEvent): EventFormValues {
  return {
    title: event.title,
    description: event.description ?? '',
    lineup: event.lineup,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    price: event.priceFromUah === null ? '' : String(event.priceFromUah),
    published: event.status === 'published',
  };
}

function parsePrice(text: string): number | null | 'invalid' {
  const trimmed = text.trim();
  if (trimmed === '') return null;
  if (!/^\d{1,7}$/.test(trimmed)) return 'invalid';
  return Number(trimmed);
}

/** Field errors keyed by field; an empty object means the form may be saved. */
export function validateEventForm(values: EventFormValues): EventFormErrors {
  const errors: EventFormErrors = {};
  const title = values.title.trim();
  if (title === '') errors.title = 'eventForm.error.titleRequired';
  else if (title.length > TITLE_MAX_LENGTH) errors.title = 'eventForm.error.titleTooLong';

  if (!values.startsAt) errors.startsAt = 'eventForm.error.startsRequired';

  if (values.endsAt && values.startsAt && values.endsAt <= values.startsAt) {
    errors.endsAt = 'eventForm.error.endsBeforeStart';
  }

  if (parsePrice(values.price) === 'invalid') errors.price = 'eventForm.error.priceInvalid';

  if (values.lineup.some((item) => item.trim().length > LINEUP_ITEM_MAX_LENGTH)) {
    errors.lineup = 'eventForm.error.lineupTooLong';
  }
  return errors;
}

export type EventSubmission = { input: EventInput; status: EventStatus };

/** Service input from valid values. Returns null when validation fails. */
export function toEventSubmission(values: EventFormValues): EventSubmission | null {
  if (Object.keys(validateEventForm(values)).length > 0 || !values.startsAt) return null;
  const price = parsePrice(values.price);
  return {
    input: {
      title: values.title.trim(),
      description: values.description.trim() === '' ? null : values.description.trim(),
      lineup: values.lineup.map((item) => item.trim()).filter((item) => item !== ''),
      startsAt: values.startsAt,
      endsAt: values.endsAt,
      priceFromUah: price === 'invalid' ? null : price,
    },
    status: values.published ? 'published' : 'draft',
  };
}
