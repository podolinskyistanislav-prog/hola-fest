import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, TextField } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { cabinetErrorText } from './cabinetErrors';
import { useAcceptInvite } from './useCabinet';

export type AcceptInviteAreaProps = { onAccepted: () => void };

/** The invited user pastes the invite token (never put in a URL) and joins the venue team. */
export function AcceptInviteArea({ onAccepted }: AcceptInviteAreaProps) {
  const { colors } = useTheme();
  const [token, setToken] = useState('');
  const accept = useAcceptInvite();
  const ready = token.trim().length > 0;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="title" accessibilityRole="header">
        {t('cabinet.acceptTitle')}
      </AppText>
      <AppText tone="muted">{t('cabinet.acceptBody')}</AppText>
      <TextField
        label={t('cabinet.acceptToken')}
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {accept.error ? (
        <AppText variant="caption" accessibilityRole="alert">
          {cabinetErrorText(accept.error)}
        </AppText>
      ) : null}
      <Button
        label={accept.isPending ? t('cabinet.accepting') : t('cabinet.accept')}
        disabled={!ready || accept.isPending}
        accessibilityState={{ disabled: !ready || accept.isPending, busy: accept.isPending }}
        onPress={() => accept.mutate(token.trim(), { onSuccess: onAccepted })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.lg, justifyContent: 'center' },
});
