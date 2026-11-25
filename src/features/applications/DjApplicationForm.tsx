import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, ImageUploader, TextField } from '@/components/ui';
import { t } from '@/lib/i18n';
import { pickAvatar } from '@/lib/pickAvatar';
import { space } from '@/theme';

import { isDjFormComplete, type DjFormValues } from './applicationRules';

export interface DjApplicationFormProps {
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (values: DjFormValues) => void;
}

/** DJ application: stage name, genres, short bio, photo, Instagram / SoundCloud. */
export function DjApplicationForm({ isSubmitting, error, onSubmit }: DjApplicationFormProps) {
  const [values, setValues] = useState<DjFormValues>({
    stageName: '',
    genresText: '',
    bio: '',
    photoUri: null,
    instagram: '',
    soundcloud: '',
  });
  const set = (change: Partial<DjFormValues>) => setValues((old) => ({ ...old, ...change }));
  const complete = isDjFormComplete(values);

  async function pickPhoto() {
    const uri = await pickAvatar().catch(() => null);
    if (uri) set({ photoUri: uri });
  }

  return (
    <View style={styles.form}>
      <TextField
        label={t('apply.stageName')}
        value={values.stageName}
        onChangeText={(stageName) => set({ stageName })}
        maxLength={40}
      />
      <TextField
        label={t('apply.genres')}
        value={values.genresText}
        onChangeText={(genresText) => set({ genresText })}
        autoCapitalize="none"
      />
      <TextField
        label={t('apply.bio')}
        value={values.bio}
        onChangeText={(bio) => set({ bio })}
        multiline
        maxLength={1000}
      />
      <ImageUploader
        label={t('apply.djPhoto')}
        uri={values.photoUri}
        onPick={pickPhoto}
        onRemove={() => set({ photoUri: null })}
        addLabel={t('apply.addPhoto')}
        removeLabel={t('apply.removePhoto')}
      />
      <TextField
        label={t('apply.instagram')}
        value={values.instagram}
        onChangeText={(instagram) => set({ instagram })}
        autoCapitalize="none"
        maxLength={200}
      />
      <TextField
        label={t('apply.soundcloud')}
        value={values.soundcloud}
        onChangeText={(soundcloud) => set({ soundcloud })}
        autoCapitalize="none"
        maxLength={200}
      />
      <AppText variant="caption" tone="muted">
        {t('apply.linkHint')}
      </AppText>
      {error ? (
        <AppText variant="caption" accessibilityRole="alert">
          {error}
        </AppText>
      ) : null}
      <Button
        label={t(isSubmitting ? 'apply.submitting' : 'apply.submit')}
        onPress={() => onSubmit(values)}
        disabled={!complete || isSubmitting}
        accessibilityState={{ disabled: !complete || isSubmitting, busy: isSubmitting }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: space.lg },
});
