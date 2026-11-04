import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, TextField } from '@/components/ui';
import { space } from '@/theme';

import { authStrings } from './strings';
import { useSession } from './useSession';
import { useStaffLogin } from './useStaffLogin';

type StaffLoginFormProps = { onSignedIn: () => void };

export function StaffLoginForm({ onSignedIn }: StaffLoginFormProps) {
  const { session, isAnonymous } = useSession();
  const { signIn, signOut, isLoading, error } = useStaffLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (session && !isAnonymous) {
    return (
      <View style={styles.form}>
        <AppText tone="muted">{authStrings.signedInAs}</AppText>
        {error ? (
          <AppText variant="caption" accessibilityRole="alert">
            {error}
          </AppText>
        ) : null}
        <Button
          label={isLoading ? authStrings.signingOut : authStrings.signOut}
          onPress={signOut}
          disabled={isLoading}
          accessibilityState={{ disabled: isLoading, busy: isLoading }}
        />
      </View>
    );
  }

  async function submit() {
    if (await signIn(email, password)) onSignedIn();
  }

  return (
    <View style={styles.form}>
      <TextField
        label={authStrings.email}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        editable={!isLoading}
      />
      <TextField
        label={authStrings.password}
        value={password}
        onChangeText={setPassword}
        secure
        autoComplete="current-password"
        textContentType="password"
        error={error ?? undefined}
        editable={!isLoading}
        onSubmitEditing={submit}
      />
      <Button
        label={isLoading ? authStrings.signingIn : authStrings.signIn}
        onPress={submit}
        disabled={isLoading || !email.trim() || !password}
        accessibilityState={{ disabled: isLoading, busy: isLoading }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: space.lg },
});
