import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppText,
  Button,
  ImageUploader,
  InfoChip,
  PhotoGallery,
  SwitchField,
  type PhotoSlot,
  TextField,
} from '@/components/ui';
import { VenueMap } from '@/features/map';
import { t } from '@/lib/i18n';
import type { VenuePhotoKind, VenueProfile, VenueProfileInput } from '@/services/venueProfile';
import { radius, space, useTheme } from '@/theme';

import { isValidInstagramUrl } from './cabinetAccess';

export type VenueProfileEditorProps = {
  profile: VenueProfile;
  /** Public URL for a stored path. */
  mediaUrl: (path: string) => string;
  isSaving: boolean;
  isUploading: boolean;
  /** Generic, already translated error for the last failed action. */
  error: string | null;
  onSave: (input: VenueProfileInput) => void;
  onPickCover: () => void;
  onPickPhoto: (kind: VenuePhotoKind) => void;
  onRemovePhoto: (photo: { id: string; path: string }) => void;
};

const PIN_ID = 'profile-pin';
const MAP_HEIGHT = 240;
const COVER_HEIGHT = 140;
const KINDS: readonly VenuePhotoKind[] = ['outside', 'inside'];

function textOrNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

/** Owner's editor of the public venue page, with a preview exactly as guests see it. */
export function VenueProfileEditor({
  profile,
  mediaUrl,
  isSaving,
  isUploading,
  error,
  onSave,
  onPickCover,
  onPickPhoto,
  onRemovePhoto,
}: VenueProfileEditorProps) {
  const { colors } = useTheme();
  const [description, setDescription] = useState(profile.description ?? '');
  const [address, setAddress] = useState(profile.address ?? '');
  const [instagram, setInstagram] = useState(profile.instagramUrl ?? '');
  const [hasShelter, setHasShelter] = useState(profile.hasShelter);
  const [pin, setPin] = useState(
    profile.lat !== null && profile.lng !== null ? { lat: profile.lat, lng: profile.lng } : null,
  );
  const [preview, setPreview] = useState(false);
  const instagramValid = isValidInstagramUrl(instagram);

  const pinVenues = pin
    ? [
        {
          id: PIN_ID,
          slug: PIN_ID,
          name: profile.name,
          address: null,
          lat: pin.lat,
          lng: pin.lng,
          hasShelter,
          instagramUrl: null,
          coverPath: null,
        },
      ]
    : [];

  const slots = KINDS.flatMap((kind): PhotoSlot[] => {
    const photos = profile.photos.filter((photo) => photo.kind === kind);
    const label = t(kind === 'outside' ? 'venue.photosOutside' : 'venue.photosInside');
    return photos.length === 0
      ? [{ id: kind, label }]
      : photos.map((photo) => ({ id: photo.id, label, uri: mediaUrl(photo.path) }));
  });

  function save() {
    onSave({
      description: textOrNull(description),
      address: textOrNull(address),
      lat: pin?.lat ?? null,
      lng: pin?.lng ?? null,
      instagramUrl: textOrNull(instagram),
      hasShelter,
    });
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="title" accessibilityRole="header">
          {t('cabinet.profile')}
        </AppText>
        <Button
          variant="glass"
          label={t(preview ? 'cabinet.backToEdit' : 'cabinet.preview')}
          onPress={() => setPreview((value) => !value)}
        />

        {preview ? (
          <View style={styles.group}>
            {profile.coverPath ? (
              <Image
                source={{ uri: mediaUrl(profile.coverPath) }}
                contentFit="cover"
                accessible={false}
                style={styles.cover}
              />
            ) : null}
            <AppText variant="title">{profile.name}</AppText>
            <AppText tone="muted">{address.trim() || t('venue.noAddress')}</AppText>
            {hasShelter ? <InfoChip label={t('venues.shelter')} icon="shield" /> : null}
            {description.trim() ? <AppText>{description.trim()}</AppText> : null}
            <PhotoGallery slots={slots} placeholderLabel={t('venue.photoSoon')} />
          </View>
        ) : (
          <View style={styles.group}>
            <ImageUploader
              label={t('cabinet.cover')}
              uri={profile.coverPath ? mediaUrl(profile.coverPath) : null}
              progress={isUploading ? 0 : undefined}
              onPick={onPickCover}
              onRemove={() => undefined}
              addLabel={t('apply.addPhoto')}
            />
            <TextField
              label={t('cabinet.description')}
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={1000}
            />
            <TextField
              label={t('apply.address')}
              value={address}
              onChangeText={setAddress}
              maxLength={200}
            />
            <AppText variant="label" tone="muted">
              {t('apply.pinLabel')}
            </AppText>
            <View
              accessible
              accessibilityLabel={t('apply.mapA11y')}
              style={[styles.map, { borderColor: colors.border }]}
            >
              <VenueMap
                venues={pinVenues}
                selectedId={pin ? PIN_ID : null}
                onSelect={() => undefined}
                onMapPress={setPin}
              />
            </View>
            <TextField
              label={t('apply.instagram')}
              value={instagram}
              onChangeText={setInstagram}
              autoCapitalize="none"
              maxLength={200}
              error={instagramValid ? undefined : t('cabinet.instagramInvalid')}
            />
            <SwitchField
              label={t('venues.shelter')}
              value={hasShelter}
              onValueChange={setHasShelter}
            />

            {KINDS.map((kind) => (
              <View key={kind} style={styles.group}>
                <AppText variant="label" tone="muted">
                  {t(kind === 'outside' ? 'venue.photosOutside' : 'venue.photosInside')}
                </AppText>
                {profile.photos
                  .filter((photo) => photo.kind === kind)
                  .map((photo) => (
                    <ImageUploader
                      key={photo.id}
                      label={t(kind === 'outside' ? 'venue.photosOutside' : 'venue.photosInside')}
                      uri={mediaUrl(photo.path)}
                      onPick={() => undefined}
                      onRemove={() => onRemovePhoto(photo)}
                      removeLabel={t('apply.removePhoto')}
                    />
                  ))}
                <Button
                  variant="glass"
                  label={t('apply.addPhoto')}
                  accessibilityLabel={`${t('apply.addPhoto')}, ${t(kind === 'outside' ? 'venue.photosOutside' : 'venue.photosInside')}`}
                  disabled={isUploading}
                  onPress={() => onPickPhoto(kind)}
                />
              </View>
            ))}

            {error ? (
              <AppText variant="caption" accessibilityRole="alert">
                {error}
              </AppText>
            ) : null}
            <Button
              label={isSaving ? t('cabinet.saving') : t('cabinet.save')}
              disabled={isSaving || !instagramValid}
              accessibilityState={{ disabled: isSaving || !instagramValid, busy: isSaving }}
              onPress={save}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: space.screen, gap: space.lg },
  group: { gap: space.md },
  cover: { height: COVER_HEIGHT, borderRadius: radius.card },
  map: { height: MAP_HEIGHT, borderRadius: radius.card, borderWidth: 1, overflow: 'hidden' },
});
