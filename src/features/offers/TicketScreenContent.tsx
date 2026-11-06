import { StyleSheet, View } from 'react-native';

import { AppText, Button, QRTicket } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';

import { formatValidUntil, ticketStatus } from './ticketStatus';
import { useClaimToken, useMyClaims } from './useMyClaims';

export interface TicketScreenContentProps {
  offerId: string | undefined;
  onBack: () => void;
}

const SKELETON_HEIGHT = 360;
const SCREEN_TOP = 96;

/**
 * One ticket. The QR is drawn from the token saved on the device, so it shows with
 * no signal; offer and venue details fill in when the claims list is available.
 */
export function TicketScreenContent({ offerId, onBack }: TicketScreenContentProps) {
  const { colors } = useTheme();
  const token = useClaimToken(offerId);
  const claims = useMyClaims();

  if (token.isLoading) {
    return (
      <View
        accessibilityLabel={t('ticket.loading')}
        accessibilityRole="progressbar"
        style={styles.screen}
      >
        <View style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      </View>
    );
  }

  if (token.isError || !token.data) {
    return (
      <View style={styles.message}>
        <AppText variant="heading" accessibilityRole="header">
          {t('ticket.missingTitle')}
        </AppText>
        <AppText tone="muted">{t('ticket.missingBody')}</AppText>
        <Button label={t('ticket.back')} variant="inverse" onPress={onBack} />
      </View>
    );
  }

  const claim = claims.data?.find((candidate) => candidate.offer.id === offerId);
  return (
    <View style={styles.screen}>
      <QRTicket
        token={token.data}
        offerTitle={claim?.offer.title ?? t('ticket.fallbackTitle')}
        venueName={claim?.offer.event.venue.name ?? ''}
        validUntil={claim ? formatValidUntil(claim.offer.validUntil) : t('ticket.offlineHint')}
        status={claim ? ticketStatus(claim, new Date()) : 'active'}
      />
      <Button label={t('ticket.back')} variant="inverse" onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, gap: space.xl, padding: space.screen, paddingTop: SCREEN_TOP },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card },
  message: {
    flex: 1,
    gap: space.md,
    padding: space.screen,
    paddingTop: SCREEN_TOP,
    alignItems: 'flex-start',
  },
});
