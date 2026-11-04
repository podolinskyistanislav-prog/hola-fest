import { StyleSheet, View } from 'react-native';

import { AppText, Button } from '@/components/ui';
import { space, useTheme } from '@/theme';

import { authStrings } from './strings';

export function SessionError({ onRetry }: { onRetry: () => void }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="title">{authStrings.errorTitle}</AppText>
      <AppText tone="muted">{authStrings.errorBody}</AppText>
      <Button label={authStrings.retry} onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, justifyContent: 'center', gap: space.lg },
});
