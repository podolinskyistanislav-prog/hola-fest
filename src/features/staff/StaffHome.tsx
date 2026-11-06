import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import type { StaffAccess } from './staffAccess';

export type StaffHomeProps = {
  access: StaffAccess | null;
  isLoading: boolean;
  isError: boolean;
  isSigningOut: boolean;
  signOutError: string | null;
  onRetry: () => void;
  onOpenScanner: () => void;
  onOpenVenueEvents: () => void;
  onSignOut: () => void;
};

export function StaffHome({
  access,
  isLoading,
  isError,
  isSigningOut,
  signOutError,
  onRetry,
  onOpenScanner,
  onOpenVenueEvents,
  onSignOut,
}: StaffHomeProps) {
  const { colors } = useTheme();
  const isEmpty = access !== null && !access.canScan && !access.canManageEvents;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="title" accessibilityRole="header">
        {t('staff.title')}
      </AppText>

      {isLoading ? <AppText tone="muted">{t('staff.loading')}</AppText> : null}

      {isError ? (
        <View style={styles.group}>
          <AppText tone="muted" accessibilityRole="alert">
            {t('staff.errorBody')}
          </AppText>
          <Button label={t('staff.retry')} onPress={onRetry} />
        </View>
      ) : null}

      {isEmpty ? <AppText tone="muted">{t('staff.empty')}</AppText> : null}

      {access?.canScan ? <Button label={t('staff.scanner')} onPress={onOpenScanner} /> : null}
      {access?.canManageEvents ? (
        <Button variant="glass" label={t('staff.venueEvents')} onPress={onOpenVenueEvents} />
      ) : null}

      {signOutError ? (
        <AppText variant="caption" accessibilityRole="alert">
          {signOutError}
        </AppText>
      ) : null}
      <Button
        variant="inverse"
        label={isSigningOut ? t('auth.signingOut') : t('auth.signOut')}
        onPress={onSignOut}
        disabled={isSigningOut}
        accessibilityState={{ disabled: isSigningOut, busy: isSigningOut }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.lg, justifyContent: 'center' },
  group: { gap: space.lg },
});
