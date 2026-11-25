import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, BottomSheet, Button, TextField } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space } from '@/theme';

import { useEmailUpgrade } from './useEmailUpgrade';

export interface SignInToPostSheetProps {
  visible: boolean;
  onClose: () => void;
  /** Called once the guest is a confirmed account; the caller then continues to profile setup. */
  onConfirmed: () => void;
}

/** "Підтверди пошту": email, then the 6-digit code. The guest keeps the same account. */
export function SignInToPostSheet({ visible, onClose, onConfirmed }: SignInToPostSheetProps) {
  const { step, email, requestCode, confirm, changeEmail, isLoading, error } = useEmailUpgrade();
  const [emailInput, setEmailInput] = useState('');
  const [code, setCode] = useState('');

  async function submitEmail() {
    await requestCode(emailInput);
  }

  async function submitCode() {
    if (await confirm(code)) onConfirmed();
  }

  return (
    <BottomSheet visible={visible} title={t('feedAuth.title')} onClose={onClose}>
      {step === 'email' ? (
        <View style={styles.body}>
          <AppText tone="muted">{t('feedAuth.emailHint')}</AppText>
          <TextField
            label={t('auth.email')}
            value={emailInput}
            onChangeText={setEmailInput}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            error={error ?? undefined}
            editable={!isLoading}
            onSubmitEditing={submitEmail}
          />
          <Button
            label={isLoading ? t('feedAuth.sending') : t('feedAuth.sendCode')}
            onPress={submitEmail}
            disabled={isLoading || !emailInput.trim()}
            accessibilityState={{ disabled: isLoading, busy: isLoading }}
          />
        </View>
      ) : (
        <View style={styles.body}>
          <AppText tone="muted">{`${t('feedAuth.codeHint')} ${email}`}</AppText>
          <TextField
            label={t('feedAuth.codeLabel')}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            autoComplete="one-time-code"
            textContentType="oneTimeCode"
            error={error ?? undefined}
            editable={!isLoading}
            onSubmitEditing={submitCode}
          />
          <Button
            label={isLoading ? t('feedAuth.confirming') : t('feedAuth.confirm')}
            onPress={submitCode}
            disabled={isLoading || code.trim().length !== 6}
            accessibilityState={{ disabled: isLoading, busy: isLoading }}
          />
          <Button
            variant="glass"
            label={t('feedAuth.changeEmail')}
            onPress={changeEmail}
            disabled={isLoading}
          />
        </View>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  body: { gap: space.lg },
});
