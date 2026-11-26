import { Redirect } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { CabinetHome } from './CabinetHome';
import { useCabinetVenue, useVenueDashboard } from './useCabinet';

export type CabinetAreaProps = {
  onOpenProfile: () => void;
  onOpenTeam: () => void;
  onOpenEvents: () => void;
  onOpenScanner: () => void;
};

function Message({ children, onRetry }: { children: string; onRetry?: () => void }) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText tone="muted" accessibilityRole="alert">
        {children}
      </AppText>
      {onRetry ? <Button label={t('staff.retry')} onPress={onRetry} /> : null}
    </SafeAreaView>
  );
}

function CabinetDashboard({
  venueId,
  venueName,
  role,
  ...actions
}: CabinetAreaProps & { venueId: string; venueName: string; role: 'owner' | 'admin' }) {
  const dashboard = useVenueDashboard(venueId);
  return (
    <CabinetHome
      venueName={venueName}
      role={role}
      dashboard={dashboard.data}
      isLoading={dashboard.isPending}
      isError={dashboard.isError}
      onRetry={() => void dashboard.refetch()}
      {...actions}
    />
  );
}

/** Cabinet entry: finds my venue; hosts (and people without a venue) are sent back to the staff home. */
export function CabinetArea(actions: CabinetAreaProps) {
  const { venue, isLoading, isError, retry } = useCabinetVenue();

  if (isLoading) return <Message>{t('staff.loading')}</Message>;
  if (isError) return <Message onRetry={retry}>{t('staff.errorBody')}</Message>;
  if (!venue || venue.role === 'host') return <Redirect href="/staff" />;
  return (
    <CabinetDashboard venueId={venue.id} venueName={venue.name} role={venue.role} {...actions} />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.lg, justifyContent: 'center' },
});
