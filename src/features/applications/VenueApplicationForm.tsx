import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, ImageUploader, TextField } from '@/components/ui';
import { VenueMap } from '@/features/map';
import { t } from '@/lib/i18n';
import { pickAvatar } from '@/lib/pickAvatar';
import { radius, space, useTheme } from '@/theme';

import { isVenueFormComplete, MAX_VENUE_PHOTOS, type VenueFormValues } from './applicationRules';

export interface VenueApplicationFormProps {
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (values: VenueFormValues) => void;
}

const PIN_ID = 'application-pin';
const MAP_HEIGHT = 240;

/** Venue application: name, address, pin on the map, contacts, 1–4 photos, comment. */
export function VenueApplicationForm({ isSubmitting, error, onSubmit }: VenueApplicationFormProps) {
  const { colors } = useTheme();
  const [values, setValues] = useState<VenueFormValues>({
    name: '',
    address: '',
    pin: null,
    instagram: '',
    contact: '',
    photoUris: [],
    comment: '',
  });
  const set = (change: Partial<VenueFormValues>) => setValues((old) => ({ ...old, ...change }));
  const complete = isVenueFormComplete(values);

  const pinVenues = useMemo(
    () =>
      values.pin
        ? [
            {
              id: PIN_ID,
              slug: PIN_ID,
              name: values.name || t('apply.venueName'),
              address: null,
              lat: values.pin.lat,
              lng: values.pin.lng,
              hasShelter: false,
              instagramUrl: null,
              coverPath: null,
            },
          ]
        : [],
    [values.pin, values.name],
  );

  async function addPhoto() {
    const uri = await pickAvatar().catch(() => null);
    if (uri) setValues((old) => ({ ...old, photoUris: [...old.photoUris, uri] }));
  }

  return (
    <View style={styles.form}>
      <TextField
        label={t('apply.venueName')}
        value={values.name}
        onChangeText={(name) => set({ name })}
        maxLength={80}
      />
      <TextField
        label={t('apply.address')}
        value={values.address}
        onChangeText={(address) => set({ address })}
        maxLength={200}
      />
      <View style={styles.map}>
        <AppText variant="label" tone="muted">
          {t('apply.pinLabel')}
        </AppText>
        <View
          accessible
          accessibilityLabel={t('apply.mapA11y')}
          style={[styles.mapBox, { borderColor: colors.border }]}
        >
          <VenueMap
            venues={pinVenues}
            selectedId={values.pin ? PIN_ID : null}
            onSelect={() => undefined}
            onMapPress={(pin) => set({ pin })}
          />
        </View>
        <AppText variant="caption" tone="muted">
          {t(values.pin ? 'apply.pinSet' : 'apply.pinMissing')}
        </AppText>
      </View>
      <TextField
        label={t('apply.instagram')}
        value={values.instagram}
        onChangeText={(instagram) => set({ instagram })}
        autoCapitalize="none"
        maxLength={200}
      />
      <TextField
        label={t('apply.contact')}
        value={values.contact}
        onChangeText={(contact) => set({ contact })}
        autoCapitalize="none"
        maxLength={200}
      />
      <AppText variant="label" tone="muted">
        {t('apply.photos')}
      </AppText>
      {values.photoUris.map((uri, index) => (
        <ImageUploader
          key={uri}
          label={`${t('apply.photos')} ${index + 1}`}
          uri={uri}
          onPick={() => undefined}
          onRemove={() => set({ photoUris: values.photoUris.filter((item) => item !== uri) })}
          addLabel={t('apply.addPhoto')}
          removeLabel={t('apply.removePhoto')}
        />
      ))}
      {values.photoUris.length < MAX_VENUE_PHOTOS ? (
        <ImageUploader
          label={t('apply.photos')}
          onPick={addPhoto}
          onRemove={() => undefined}
          addLabel={t('apply.addPhoto')}
        />
      ) : null}
      <TextField
        label={t('apply.comment')}
        value={values.comment}
        onChangeText={(comment) => set({ comment })}
        multiline
        maxLength={500}
      />
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
  map: { gap: space.sm },
  mapBox: {
    height: MAP_HEIGHT,
    borderRadius: radius.card,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
