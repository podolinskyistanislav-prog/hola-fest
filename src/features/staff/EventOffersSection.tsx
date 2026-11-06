import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Button, SwitchField } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, touchTarget, useTheme } from '@/theme';
import type { AdminOffer } from '@/types/admin';

export type EventOffersSectionProps = {
  offers: readonly AdminOffer[];
  isLoading: boolean;
  isError: boolean;
  isToggleError: boolean;
  onRetry: () => void;
  onCreate?: () => void;
  onOpenOffer?: (offerId: string) => void;
  onToggleActive: (offer: AdminOffer) => void;
};

function OfferItem({
  offer,
  onOpen,
  onToggle,
}: {
  offer: AdminOffer;
  onOpen?: (offerId: string) => void;
  onToggle: (offer: AdminOffer) => void;
}) {
  const { colors } = useTheme();
  const limit =
    offer.maxClaims === null
      ? t('eventOffers.unlimited')
      : t('eventOffers.limit').replace('{count}', String(offer.maxClaims));

  return (
    <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${offer.title}, ${limit}`}
        accessibilityHint={t('eventOffers.openHint')}
        style={styles.open}
        onPress={onOpen ? () => onOpen(offer.id) : undefined}
      >
        <AppText variant="bodyStrong">{offer.title}</AppText>
        <AppText tone="muted">{limit}</AppText>
      </Pressable>
      <SwitchField
        label={t('eventOffers.active')}
        value={offer.isActive}
        onValueChange={() => onToggle(offer)}
      />
    </View>
  );
}

/** Offers inside the event editor: list with an active switch per offer and an add button. */
export function EventOffersSection({
  offers,
  isLoading,
  isError,
  isToggleError,
  onRetry,
  onCreate,
  onOpenOffer,
  onToggleActive,
}: EventOffersSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <AppText variant="heading" accessibilityRole="header">
        {t('eventOffers.title')}
      </AppText>
      {isLoading ? (
        <AppText
          tone="muted"
          accessibilityRole="progressbar"
          accessibilityLabel={t('staff.loading')}
        >
          {t('staff.loading')}
        </AppText>
      ) : null}
      {!isLoading && isError ? (
        <View style={styles.section}>
          <AppText tone="muted" accessibilityRole="alert">
            {t('eventOffers.loadError')}
          </AppText>
          <Button label={t('staff.retry')} onPress={onRetry} />
        </View>
      ) : null}
      {!isLoading && !isError && offers.length === 0 ? (
        <AppText tone="muted">{t('eventOffers.empty')}</AppText>
      ) : null}
      {!isLoading && !isError
        ? offers.map((offer) => (
            <OfferItem
              key={offer.id}
              offer={offer}
              onOpen={onOpenOffer}
              onToggle={onToggleActive}
            />
          ))
        : null}
      {isToggleError ? (
        <View accessibilityRole="alert">
          <AppText style={{ color: colors.danger }}>{t('eventOffers.toggleError')}</AppText>
        </View>
      ) : null}
      <Button label={t('eventOffers.add')} variant="inverse" onPress={onCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: space.md },
  item: { borderWidth: 1, borderRadius: radius.row, padding: space.md, gap: space.sm },
  open: { minHeight: touchTarget, justifyContent: 'center', gap: space.xs },
});
