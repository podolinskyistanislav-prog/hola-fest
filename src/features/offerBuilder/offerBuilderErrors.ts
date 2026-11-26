import { t } from '@/lib/i18n';
import { OfferBuilderError } from '@/services/offerBuilder';

/** Safe Ukrainian text for a failed offer action; never shows server messages. */
export function offerBuilderErrorText(error: unknown): string {
  const code = error instanceof OfferBuilderError ? error.code : 'unknown';
  switch (code) {
    case 'forbidden':
      return t('offerBuilder.error.forbidden');
    case 'invalid_state':
      return t('offerBuilder.error.invalid');
    case 'network':
      return t('offerBuilder.error.network');
    default:
      return t('offerBuilder.error.unknown');
  }
}
