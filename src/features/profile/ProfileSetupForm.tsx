import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Button, DjAvatar, TextField } from '@/components/ui';
import { t, type TranslationKey } from '@/lib/i18n';
import { pickAvatar } from '@/lib/pickAvatar';
import { isValidDisplayName, normalizeHandle } from '@/lib/profileRules';
import { space } from '@/theme';

import { useHandleAvailability, type HandleStatus } from './useHandleAvailability';
import { useSaveProfile } from './useSaveProfile';

export interface ProfileSetupFormProps {
  userId: string;
  /** Existing values when editing instead of first-time setup. */
  initial?: { displayName: string | null; handle: string | null; avatarUrl: string | null };
  currentAvatarPath?: string | null;
  onSaved: () => void;
}

const HANDLE_HINTS: Record<HandleStatus, TranslationKey | null> = {
  empty: null,
  invalid: 'profileSetup.handleInvalid',
  checking: 'profileSetup.handleChecking',
  free: 'profileSetup.handleFree',
  taken: 'profileSetup.handleTaken',
  error: 'profileSetup.handleCheckFailed',
};

/** Name, @handle with live availability and an optional avatar. */
export function ProfileSetupForm({
  userId,
  initial,
  currentAvatarPath = null,
  onSaved,
}: ProfileSetupFormProps) {
  const [displayName, setDisplayName] = useState(initial?.displayName ?? '');
  const [handleInput, setHandleInput] = useState(initial?.handle ?? '');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handle = normalizeHandle(handleInput);
  const status = useHandleAvailability(handle);
  const { save, isSaving } = useSaveProfile(userId);

  const nameValid = isValidDisplayName(displayName);
  const canSave = nameValid && status === 'free' && !isSaving;
  const hintKey = HANDLE_HINTS[status];
  const handleBad = status === 'invalid' || status === 'taken' || status === 'error';
  const shownAvatar = avatarUri ?? initial?.avatarUrl ?? null;

  async function choosePhoto() {
    const uri = await pickAvatar().catch(() => null);
    if (uri) setAvatarUri(uri);
  }

  async function submit() {
    setError(null);
    const result = await save({ displayName, handle, avatarUri, currentAvatarPath });
    if (result.ok) onSaved();
    else setError(result.error);
  }

  return (
    <View style={styles.form}>
      <View style={styles.avatarRow}>
        <DjAvatar name={displayName || '?'} photoUri={shownAvatar} size={96} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t(
            shownAvatar ? 'profileSetup.changeAvatar' : 'profileSetup.addAvatar',
          )}
          onPress={choosePhoto}
          disabled={isSaving}
          style={styles.avatarButton}
        >
          <AppText variant="label">
            {t(shownAvatar ? 'profileSetup.changeAvatar' : 'profileSetup.addAvatar')}
          </AppText>
        </Pressable>
      </View>
      <TextField
        label={t('profileSetup.name')}
        value={displayName}
        onChangeText={setDisplayName}
        maxLength={30}
        autoComplete="name"
        textContentType="name"
        error={displayName.length > 0 && !nameValid ? t('profileSetup.nameInvalid') : undefined}
        editable={!isSaving}
      />
      <View style={styles.handle}>
        <TextField
          label={t('profileSetup.handle')}
          value={handleInput}
          onChangeText={setHandleInput}
          maxLength={21}
          autoCapitalize="none"
          autoCorrect={false}
          error={handleBad && hintKey ? t(hintKey) : undefined}
          editable={!isSaving}
        />
        {!handleBad && hintKey ? (
          <AppText variant="caption" tone="muted" accessibilityLiveRegion="polite">
            {t(hintKey)}
          </AppText>
        ) : null}
      </View>
      {error ? (
        <AppText variant="caption" accessibilityRole="alert">
          {error}
        </AppText>
      ) : null}
      <Button
        label={isSaving ? t('profileSetup.saving') : t('profileSetup.save')}
        onPress={submit}
        disabled={!canSave}
        accessibilityState={{ disabled: !canSave, busy: isSaving }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: space.lg },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: space.lg },
  avatarButton: { minHeight: 44, justifyContent: 'center' },
  handle: { gap: space.xs },
});
