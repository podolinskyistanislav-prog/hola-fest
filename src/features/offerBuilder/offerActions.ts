import type { StatusPillProps } from '@/components/ui';
import type { OfferStatus } from '@/types/offerBuilder';

export type OfferRowAction = 'edit' | 'pause' | 'resume' | 'duplicate' | 'end';

/** Actions the list offers for an offer in this effective status. The server still checks each one. */
export function offerRowActions(status: OfferStatus): OfferRowAction[] {
  switch (status) {
    case 'draft':
      return ['edit', 'duplicate'];
    case 'scheduled':
    case 'live':
      return ['edit', 'pause', 'duplicate', 'end'];
    case 'paused':
      return ['edit', 'resume', 'duplicate', 'end'];
    case 'ended':
      return ['duplicate'];
  }
}

/** The pill calls a live offer "active". */
export function pillStatus(status: OfferStatus): StatusPillProps['status'] {
  return status === 'live' ? 'active' : status;
}
