import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, StatTile } from '@/components/ui';
import { formatEventDay, formatEventTime } from '@/features/events/eventFormat';
import { t } from '@/lib/i18n';
import type { VenueDashboard } from '@/services/venueDashboard';
import type { VenueRole } from '@/services/venueTeam';
import { space, useTheme } from '@/theme';

export type CabinetHomeProps = {
  venueName?: string;
  role?: VenueRole;
  dashboard?: VenueDashboard;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onOpenProfile: () => void;
  onOpenTeam: () => void;
  onOpenEvents: () => void;
  onOpenScanner: () => void;
};

/** "Мій заклад": today's numbers, the week ahead, and the way to every management screen. */
export function CabinetHome({
  venueName,
  role,
  dashboard,
  isLoading,
  isError,
  onRetry,
  onOpenProfile,
  onOpenTeam,
  onOpenEvents,
  onOpenScanner,
}: CabinetHomeProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="title" accessibilityRole="header">
          {t('cabinet.title')}
        </AppText>
        {venueName ? <AppText tone="muted">{venueName}</AppText> : null}

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
              {t('cabinet.dashboardError')}
            </AppText>
            <Button label={t('staff.retry')} onPress={onRetry} />
          </View>
        ) : null}

        {dashboard ? <Dashboard dashboard={dashboard} /> : null}

        <View style={styles.group}>
          <Button label={t('cabinet.events')} onPress={onOpenEvents} />
          <Button variant="glass" label={t('staff.scanner')} onPress={onOpenScanner} />
          {role === 'owner' ? (
            <>
              <Button variant="glass" label={t('cabinet.profile')} onPress={onOpenProfile} />
              <Button variant="glass" label={t('cabinet.team')} onPress={onOpenTeam} />
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Dashboard({ dashboard }: { dashboard: VenueDashboard }) {
  const { todayEvents, nextEvents, liveOffers, claimsToday, redemptionsToday } = dashboard;
  return (
    <View style={styles.group}>
      <AppText variant="heading" accessibilityRole="header">
        {t('cabinet.today')}
      </AppText>
      <View style={styles.tiles}>
        <StatTile value={String(todayEvents.length)} label={t('cabinet.statEvents')} />
        <StatTile value={String(liveOffers.length)} label={t('cabinet.statOffers')} />
      </View>
      <View style={styles.tiles}>
        <StatTile value={String(claimsToday)} label={t('cabinet.statClaims')} />
        <StatTile value={String(redemptionsToday)} label={t('cabinet.statRedemptions')} />
      </View>

      <AppText variant="heading" accessibilityRole="header">
        {t('cabinet.week')}
      </AppText>
      {nextEvents.length === 0 ? (
        <AppText tone="muted">{t('cabinet.weekEmpty')}</AppText>
      ) : (
        nextEvents.map((event) => (
          <AppText key={event.id} accessibilityLabel={event.title}>
            {`${formatEventDay(event.startsAt)} ${formatEventTime(event.startsAt)} · ${event.title}`}
          </AppText>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: space.screen, gap: space.lg },
  group: { gap: space.md },
  tiles: { flexDirection: 'row', gap: space.md },
});
