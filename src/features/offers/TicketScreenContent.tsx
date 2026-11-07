import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AccentBlobs, AppText, Button, GlassIconButton, QRCard } from '@/components/ui';
import { GlassPillButton } from '@/components/ui/GlassPillButton';
import { Feather } from '@expo/vector-icons';
import { EventTaxiBar } from '@/features/events/EventTaxiBar';
import { formatKyivTime } from '@/lib/kyivTime';
import { t } from '@/lib/i18n';
import { brand, fontFamily, radius, space, useTheme } from '@/theme';
import type { MyClaim } from '@/types/claims';

import { formatCountdown, ticketDeadline, ticketStatus } from './ticketStatus';
import { useClaimToken, useMyClaims } from './useMyClaims';
import { useMaxBrightness } from './useMaxBrightness';

export interface TicketScreenContentProps {
  offerId: string | undefined;
  onBack: () => void;
}

const SKELETON_HEIGHT = 360;
const SCREEN_TOP = 96;
const COUNTDOWN_TICK_MS = 15_000;
const BOTTOM_BUTTON_SIZE = 56;
const TOP_OFFSET = 16;

/** The current time, refreshed so the countdown stays live. */
function useNow(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), COUNTDOWN_TICK_MS);
    return () => clearInterval(id);
  }, []);
  return now;
}

function pillText(claim: MyClaim | undefined, now: Date): string {
  if (!claim) return t('ticket.countdownNone');
  const status = ticketStatus(claim, now);
  if (status === 'redeemed') return t('ticket.redeemedPill');
  if (status === 'expired') return t('ticket.expiredPill');
  return formatCountdown(ticketDeadline(claim), now) ?? t('ticket.countdownNone');
}

function detailsText(claim: MyClaim | undefined): string {
  if (!claim) return t('ticket.offlineHint');
  const deadline = ticketDeadline(claim);
  const event = claim.offer.event.title;
  if (!deadline) return t('ticket.detailsNoEnd').replace('{event}', event);
  return t('ticket.detailsToday')
    .replace('{event}', event)
    .replace('{time}', formatKyivTime(deadline));
}

/**
 * One ticket. The QR is drawn from the token saved on the device, so it shows with
 * no signal; offer and venue details fill in when the claims list is available.
 */
export function TicketScreenContent({ offerId, onBack }: TicketScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const token = useClaimToken(offerId);
  const claims = useMyClaims();
  const now = useNow();
  const brightness = useMaxBrightness();
  const [taxiOpen, setTaxiOpen] = useState(false);

  if (token.isLoading) {
    return (
      <View
        accessibilityLabel={t('ticket.loading')}
        accessibilityRole="progressbar"
        style={styles.state}
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
  const venue = claim?.offer.event.venue;
  const venueName = venue?.name ?? t('ticket.venueFallback');

  return (
    <View style={styles.screen}>
      <AccentBlobs />
      <View style={[styles.top, { top: insets.top + TOP_OFFSET }]}>
        <GlassIconButton icon="close" label={t('ticket.close')} onPress={onBack} />
        <View style={styles.offline}>
          <Feather name="wifi-off" size={14} color={colors.textMuted} />
          <AppText tone="muted" style={styles.offlineText}>
            {t('ticket.offline')}
          </AppText>
        </View>
      </View>

      <View style={[styles.content, { paddingTop: insets.top + SCREEN_TOP - TOP_OFFSET }]}>
        <View style={styles.heading}>
          <AppText accessibilityRole="header" style={styles.title}>
            {t('ticket.title')}
          </AppText>
          <AppText tone="muted" style={styles.subtitle}>
            {t('ticket.subtitle').replace('{venue}', venueName)}
          </AppText>
        </View>
        <QRCard
          token={token.data}
          offerTitle={claim?.offer.title ?? t('ticket.fallbackTitle')}
          details={detailsText(claim)}
          codeLabel={t('ticket.codeLabel')}
          countdown={pillText(claim, now)}
          qrLabel={t('ticket.qrLabel')}
        />
      </View>

      <View style={[styles.bottom, { bottom: insets.bottom + space.xl }]}>
        {taxiOpen && venue ? <EventTaxiBar destination={venue} /> : null}
        <View style={styles.bottomRow}>
          <GlassPillButton
            label={t('ticket.taxi').replace('{venue}', venueName)}
            height={BOTTOM_BUTTON_SIZE}
            flex
            onPress={() => setTaxiOpen((open) => !open)}
          />
          <GlassIconButton
            icon="brightness"
            label={t('ticket.brightness')}
            size={BOTTOM_BUTTON_SIZE}
            color={brightness.enabled ? brand.yellow : undefined}
            onPress={brightness.toggle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  state: { flex: 1, padding: space.screen, paddingTop: SCREEN_TOP },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card },
  message: {
    flex: 1,
    gap: space.md,
    padding: space.screen,
    paddingTop: SCREEN_TOP,
    alignItems: 'flex-start',
  },
  top: {
    position: 'absolute',
    left: space.screen,
    right: space.screen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  offlineText: { fontSize: 13 },
  content: { paddingHorizontal: space.screen, gap: space.xl },
  heading: { gap: 6 },
  title: { fontFamily: fontFamily.display, fontSize: 28, letterSpacing: -0.5 },
  subtitle: { fontSize: 15 },
  bottom: { position: 'absolute', left: space.screen, right: space.screen, gap: space.sm },
  bottomRow: { flexDirection: 'row', gap: 10 },
});
