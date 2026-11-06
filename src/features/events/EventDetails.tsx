import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, Button, Chip, GlassSurface, OfferRow } from '@/components/ui';
import { ClaimOfferButton } from '@/features/offers';
import { t } from '@/lib/i18n';
import { brand, radius, space } from '@/theme';
import type { EventDetails as EventDetailsData, EventOffer } from '@/types/events';

import { formatEventTime, formatPriceFrom } from './eventFormat';

export interface EventDetailsProps {
  event: EventDetailsData;
  /** Bottom safe-area inset so the last row clears the screen edge. */
  safeAreaBottom: number;
  onBack: () => void;
  onOpenVenue: (venueId: string) => void;
  /** Called after an offer was claimed, to open its ticket. */
  onClaimed: (offerId: string) => void;
  /** Injectable clock for the "expired" offer status. */
  now?: Date;
}

const COVER_HEIGHT = 220;
const STAR_SIZE = 96;
const BACK_TOP = 56;

function offerStatus(offer: EventOffer, now: Date) {
  return offer.validUntil !== null && offer.validUntil.getTime() <= now.getTime()
    ? ('expired' as const)
    : ('available' as const);
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      {children}
    </View>
  );
}

/** Event page: cover, when/where/price, lineup and the list of offers. */
export function EventDetails({
  event,
  safeAreaBottom,
  onBack,
  onOpenVenue,
  onClaimed,
  now = new Date(),
}: EventDetailsProps) {
  const price = formatPriceFrom(event.priceFromUah);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: safeAreaBottom + space.xxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.cover, { backgroundColor: brand.yellow }]}>
        <AppText
          accessible={false}
          importantForAccessibility="no"
          style={[styles.star, { color: brand.pink }]}
        >
          ✦
        </AppText>
        <GlassSurface kind="cover" style={styles.back}>
          <Button label={t('event.back')} variant="glass" onPress={onBack} />
        </GlassSurface>
      </View>

      <View style={styles.body}>
        <AppText variant="title" accessibilityRole="header">
          {event.title}
        </AppText>
        <View style={styles.chips}>
          <Chip label={formatEventTime(event.startsAt)} />
          {price ? <Chip label={price} /> : null}
        </View>

        <View style={styles.venue}>
          <AppText variant="bodyStrong">{event.venue.name}</AppText>
          <AppText tone="muted">{event.venue.address ?? t('event.venueNoAddress')}</AppText>
          <Button
            label={t('event.venueLink')}
            variant="inverse"
            onPress={() => onOpenVenue(event.venue.id)}
          />
        </View>

        {event.description ? <AppText>{event.description}</AppText> : null}

        {event.lineup.length > 0 ? (
          <Section title={t('event.lineup')}>
            <View style={styles.chips}>
              {event.lineup.map((name) => (
                <Chip key={name} label={name} />
              ))}
            </View>
          </Section>
        ) : null}

        <Section title={t('event.offers')}>
          {event.offers.length === 0 ? (
            <AppText tone="muted">{t('event.offersEmpty')}</AppText>
          ) : (
            <View style={styles.offers}>
              {event.offers.map((offer) => (
                <OfferRow
                  key={offer.id}
                  title={offer.title}
                  terms={offer.terms ?? ''}
                  status={offerStatus(offer, now)}
                  action={<ClaimOfferButton offerId={offer.id} onClaimed={onClaimed} />}
                />
              ))}
            </View>
          )}
        </Section>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cover: { height: COVER_HEIGHT, alignItems: 'center', justifyContent: 'center' },
  star: { fontSize: STAR_SIZE, lineHeight: STAR_SIZE + space.sm },
  back: { position: 'absolute', left: space.screen, top: BACK_TOP, borderRadius: radius.pill },
  body: { padding: space.screen, gap: space.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  venue: { gap: space.xs, alignItems: 'flex-start' },
  section: { gap: space.md },
  offers: { gap: space.sm },
});
