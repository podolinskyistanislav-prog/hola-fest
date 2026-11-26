import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, StatusPill } from '@/components/ui';
import { t } from '@/lib/i18n';
import { offerEffectiveStatus } from '@/services/offerBuilder';
import { radius, space, useTheme } from '@/theme';
import type { BuilderOffer, OfferStats } from '@/types/offerBuilder';

import { ErrorText } from './ErrorText';
import { offerRowActions, pillStatus, type OfferRowAction } from './offerActions';

export type OffersListProps = {
  offers: BuilderOffer[];
  stats: OfferStats[];
  isLoading: boolean;
  isError: boolean;
  /** Safe text of the last failed action. */
  actionError: string | null;
  isBusy: boolean;
  onRetry: () => void;
  onCreate: () => void;
  onAction: (action: OfferRowAction, offer: BuilderOffer) => void;
};

const ACTION_LABEL = {
  edit: 'offerBuilder.edit',
  pause: 'offerBuilder.pause',
  resume: 'offerBuilder.resume',
  duplicate: 'offerBuilder.duplicate',
  end: 'offerBuilder.end',
} as const;

/** Offers of the venue with status, stats and the actions that make sense for each. */
export function OffersList({
  offers,
  stats,
  isLoading,
  isError,
  actionError,
  isBusy,
  onRetry,
  onCreate,
  onAction,
}: OffersListProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <FlatList
        data={isLoading || isError ? [] : offers}
        keyExtractor={(offer) => offer.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.group}>
            <AppText variant="title" accessibilityRole="header">
              {t('offerBuilder.title')}
            </AppText>
            <Button label={t('offerBuilder.new')} onPress={onCreate} />
            {actionError ? <ErrorText>{actionError}</ErrorText> : null}
            {isLoading ? (
              <AppText
                tone="muted"
                accessibilityRole="progressbar"
                accessibilityLabel={t('staff.loading')}
              >
                {t('staff.loading')}
              </AppText>
            ) : null}
            {isError ? (
              <View style={styles.group}>
                <AppText tone="muted" accessibilityRole="alert">
                  {t('offerBuilder.loadError')}
                </AppText>
                <Button label={t('staff.retry')} onPress={onRetry} />
              </View>
            ) : null}
            {!isLoading && !isError && offers.length === 0 ? (
              <AppText tone="muted">{t('offerBuilder.empty')}</AppText>
            ) : null}
          </View>
        }
        renderItem={({ item }) => {
          const status = offerEffectiveStatus(item);
          const counts = stats.find((entry) => entry.offerId === item.id);
          return (
            <View
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <StatusPill status={pillStatus(status)} />
              <AppText variant="cardTitle">{item.title}</AppText>
              <AppText variant="caption" tone="muted">
                {t('offerBuilder.stats')
                  .replace('{claims}', String(counts?.claims ?? 0))
                  .replace('{redemptions}', String(counts?.redemptions ?? 0))}
              </AppText>
              <View style={styles.actions}>
                {offerRowActions(status).map((action) => (
                  <Button
                    key={action}
                    variant="glass"
                    label={t(ACTION_LABEL[action])}
                    disabled={isBusy}
                    accessibilityLabel={`${t(ACTION_LABEL[action])}: ${item.title}`}
                    onPress={() => onAction(action, item)}
                  />
                ))}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: space.screen, gap: space.md },
  group: { gap: space.md },
  card: {
    gap: space.sm,
    padding: space.lg,
    borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth,
  },
  actions: { gap: space.sm },
});
