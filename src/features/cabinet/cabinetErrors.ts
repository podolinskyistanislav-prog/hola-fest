import { t } from '@/lib/i18n';
import { VenueCabinetError } from '@/services/venueCabinetError';

/** Safe Ukrainian text for a failed cabinet action; never shows server messages. */
export function cabinetErrorText(error: unknown): string {
  const code = error instanceof VenueCabinetError ? error.code : 'unknown';
  switch (code) {
    case 'forbidden':
      return t('cabinet.error.forbidden');
    case 'invalid':
      return t('cabinet.error.invalid');
    case 'network':
      return t('cabinet.error.network');
    default:
      return t('cabinet.error.unknown');
  }
}
