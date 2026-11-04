import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { space, useTheme } from '@/theme';

import { authStrings } from './strings';

type SessionErrorProps = { onRetry: () => void; isRetrying?: boolean };

export function SessionError({ onRetry, isRetrying = false }: SessionErrorProps) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="title" accessibilityRole="header">
        {authStrings.errorTitle}
      </AppText>
      <AppText tone="muted" accessibilityLiveRegion="polite">
        {authStrings.errorBody}
      </AppText>
      <Button
        label={authStrings.retry}
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
