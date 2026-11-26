import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Chip, ImageUploader, TextField } from '@/components/ui';
import { t } from '@/lib/i18n';
import { pickAvatar } from '@/lib/pickAvatar';
import { djMediaUrl } from '@/services/djs';
import { radius, space, useTheme } from '@/theme';
import type { MyDjProfile } from '@/types/djs';

import { DjHero } from './DjHero';
import {
  BIO_MAX,
  GENRES_MAX,
  addGenre,
  profileToFormValues,
  validateDjProfile,
  type DjProfileFormValues,
} from './djProfileRules';
import { usePublishMyDj, useSaveDjProfile } from './useDjCabinet';

export interface DjProfileEditorProps {
  profile: MyDjProfile;
  userId: string;
}

/** Edit the own DJ profile with a live preview of the public page; publish or unpublish it. */
export function DjProfileEditor({ profile, userId }: DjProfileEditorProps) {
  const { colors } = useTheme();
  const save = useSaveDjProfile(userId);
  const publish = usePublishMyDj(userId);
  const [values, setValues] = useState<DjProfileFormValues>(() =>
    profileToFormValues(
      profile,
      profile.photoPath ? djMediaUrl(profile.photoPath) : null,
      profile.coverPath ? djMediaUrl(profile.coverPath) : null,
    ),
  );
  const [genreText, setGenreText] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [saved, setSaved] = useState(false);
  const errors = attempted ? validateDjProfile(values) : {};
  const errorText = (key: keyof typeof errors) => {
    const error = errors[key];
    return error ? t(error) : undefined;
  };
  const set = (changes: Partial<DjProfileFormValues>) => {
    setSaved(false);
    setValues((old) => ({ ...old, ...changes }));
  };

  const pick = async (field: 'photoUri' | 'coverUri') => {
    const uri = await pickAvatar().catch(() => null);
    if (uri) set({ [field]: uri });
  };

  const submit = () => {
    setAttempted(true);
    if (Object.keys(validateDjProfile(values)).length > 0) return;
    save.mutate({ profile, values }, { onSuccess: () => setSaved(true) });
  };

  const commitGenre = () => {
    set({ genres: addGenre(values.genres, genreText) });
    setGenreText('');
  };

  return (
    <View style={styles.root}>
      <AppText variant="heading" accessibilityRole="header">
        {t('djCabinet.preview')}
      </AppText>
      <DjHero
        name={values.stageName.trim() === '' ? profile.stageName : values.stageName.trim()}
        genres={values.genres}
        photoUrl={values.photoUri}
        coverUrl={values.coverUri}
        bio={values.bio}
        instagramUrl={values.instagram}
        soundcloudUrl={values.soundcloud}
      />

      <View
        style={[styles.publish, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <AppText variant="bodyStrong">
          {profile.isPublished ? t('djCabinet.published') : t('djCabinet.draft')}
        </AppText>
        <AppText tone="muted">
          {profile.isPublished ? t('djCabinet.publishedHint') : t('djCabinet.draftHint')}
        </AppText>
        {publish.isError ? (
          <AppText accessibilityRole="alert" style={{ color: colors.danger }}>
            {t('djCabinet.publishError')}
          </AppText>
        ) : null}
        <Button
          label={profile.isPublished ? t('djCabinet.unpublish') : t('djCabinet.publish')}
          variant={profile.isPublished ? 'inverse' : 'primary'}
          disabled={publish.isPending}
          onPress={() => publish.mutate(!profile.isPublished)}
        />
      </View>

      <AppText variant="heading" accessibilityRole="header">
        {t('djCabinet.edit')}
      </AppText>
      <ImageUploader
        label={t('djCabinet.photo')}
        uri={values.photoUri}
        onPick={() => void pick('photoUri')}
        onRemove={() => set({ photoUri: null })}
        addLabel={t('djCabinet.addPhoto')}
        replaceLabel={t('djCabinet.replacePhoto')}
        removeLabel={t('djCabinet.removePhoto')}
      />
      <ImageUploader
        label={t('djCabinet.cover')}
        uri={values.coverUri}
        onPick={() => void pick('coverUri')}
        onRemove={() => set({ coverUri: null })}
        addLabel={t('djCabinet.addPhoto')}
        replaceLabel={t('djCabinet.replacePhoto')}
        removeLabel={t('djCabinet.removePhoto')}
      />
      <TextField
        label={t('djCabinet.stageName')}
        value={values.stageName}
        error={errorText('stageName')}
        onChangeText={(stageName) => set({ stageName })}
      />
      <TextField
        label={t('djCabinet.bio')}
        value={values.bio}
        multiline
        autoCapitalize="sentences"
        maxLength={BIO_MAX}
        error={errorText('bio')}
        onChangeText={(bio) => set({ bio })}
      />
      <View style={styles.genres}>
        <TextField
          label={t('djCabinet.genres')}
          value={genreText}
          autoCapitalize="none"
          returnKeyType="done"
          onChangeText={setGenreText}
          onSubmitEditing={commitGenre}
        />
        <Button
          label={t('djCabinet.addGenre')}
          variant="inverse"
          disabled={values.genres.length >= GENRES_MAX}
          onPress={commitGenre}
        />
        <View style={styles.chips}>
          {values.genres.map((genre) => (
            <Chip
              key={genre}
              label={`${genre} ×`}
              selected
              onPress={() => set({ genres: values.genres.filter((item) => item !== genre) })}
            />
          ))}
        </View>
      </View>
      <TextField
        label={t('djCabinet.instagram')}
        value={values.instagram}
        autoCapitalize="none"
        keyboardType="url"
        error={errorText('instagram')}
        onChangeText={(instagram) => set({ instagram })}
      />
      <TextField
        label={t('djCabinet.soundcloud')}
        value={values.soundcloud}
        autoCapitalize="none"
        keyboardType="url"
        error={errorText('soundcloud')}
        onChangeText={(soundcloud) => set({ soundcloud })}
      />
      {save.isError ? (
        <AppText accessibilityRole="alert" style={{ color: colors.danger }}>
          {t('djCabinet.saveError')}
        </AppText>
      ) : null}
      {saved ? <AppText accessibilityRole="alert">{t('djCabinet.saved')}</AppText> : null}
      <Button
        label={save.isPending ? t('djCabinet.saving') : t('djCabinet.save')}
        disabled={save.isPending}
        onPress={submit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: space.lg },
  publish: { gap: space.sm, padding: space.lg, borderWidth: 1, borderRadius: radius.card },
  genres: { gap: space.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
});
