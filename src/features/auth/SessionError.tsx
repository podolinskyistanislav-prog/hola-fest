import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

type SessionErrorProps = { onRetry: () => void; isRetrying?: boolean };

export function SessionError({ onRetry, isRetrying = false }: SessionErrorProps) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="title" accessibilityRole="header">
        {t('auth.errorTitle')}
      </AppText>
      <AppText tone="muted" accessibilityLiveRegion="polite">
        {t('auth.errorBody')}
      </AppText>
      <Button
        label={t('auth.retry')}
        onPress={onRetry}
        disabled={isRetrying}
        accessibilityState={{ disabled: isRetrying, busy: isRetrying }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, justifyContent: 'center', gap: space.lg },
});
