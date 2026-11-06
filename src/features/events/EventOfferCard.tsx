import { OfferCard } from '@/components/ui';
import { useClaimOffer } from '@/features/offers';
import { t, type TranslationKey } from '@/lib/i18n';
import type { EventOffer } from '@/types/events';

import { offerCondition } from './eventFormat';

export interface EventOfferCardProps {
  offer: EventOffer;
  /** Called after the offer was claimed, to open its ticket. */
  onClaimed: (offerId: string) => void;
  now: Date;
}

const CTA_BY_STATE: Partial<Record<string, TranslationKey>> = {
  loading: 'claim.loading',
  claimed: 'claim.claimed',
  soldOut: 'claim.soldOut',
  limitReached: 'claim.limitReached',
  error: 'claim.error',
};

/** The pink offer card of an event. Whether the claim works is decided by the server. */
export function EventOfferCard({ offer, onClaimed, now }: EventOfferCardProps) {
  const { state, claim } = useClaimOffer(offer.id, onClaimed);
  const expired = offer.validUntil !== null && offer.validUntil.getTime() <= now.getTime();
  const actionable = !expired && (state === 'ready' || state === 'error');
  const ctaKey = expired ? 'event.offerExpired' : (CTA_BY_STATE[state] ?? 'event.offerCta');
  const condition =
    offer.terms ??
    (offer.validUntil ? offerCondition(offer.validUntil) : t('event.offerConditionOpen'));

  return (
    <OfferCard
      kicker={t('event.offerKicker')}
      title={offer.title}
      condition={condition}
      ctaLabel={t(ctaKey)}
      disabled={!actionable}
      onPress={claim}
    />
  );
}
