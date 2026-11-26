import { Redirect } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { pickPostPhoto } from '@/lib/pickPostPhoto';
import { venueMediaUrl } from '@/services/venueProfile';
import { space, useTheme } from '@/theme';

import { cabinetErrorText } from './cabinetErrors';
import {
  useCabinetVenue,
  useRemoveVenuePhoto,
  useSaveVenueProfile,
  useUploadVenueCover,
  useUploadVenuePhoto,
  useVenueProfile,
} from './useCabinet';
import { VenueProfileEditor } from './VenueProfileEditor';

function Message({ children, onRetry }: { children: string; onRetry?: () => void }) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText tone="muted" accessibilityRole="alert">
        {children}
      </AppText>
      {onRetry ? <Button label={t('staff.retry')} onPress={onRetry} /> : null}
    </SafeAreaView>
  );
}

function ProfileEditorForVenue({ venueId }: { venueId: string }) {
  const profile = useVenueProfile(venueId);
  const save = useSaveVenueProfile(venueId);
  const cover = useUploadVenueCover(venueId);
  const upload = useUploadVenuePhoto(venueId);
  const remove = useRemoveVenuePhoto(venueId);

  if (profile.isPending) return <Message>{t('staff.loading')}</Message>;
  if (profile.isError) {
    return <Message onRetry={() => void profile.refetch()}>{t('cabinet.profileError')}</Message>;
  }

  const failure = save.error ?? cover.error ?? upload.error ?? remove.error;

  async function pickCover() {
    const uri = await pickPostPhoto().catch(() => null);
    if (uri) cover.mutate(uri);
  }

  async function pickPhoto(kind: 'outside' | 'inside') {
    const uri = await pickPostPhoto().catch(() => null);
    if (uri) upload.mutate({ fileUri: uri, kind });
  }

  return (
    <VenueProfileEditor
      // Remount with fresh values after a save so the form shows what the server stored.
      key={profile.dataUpdatedAt}
      profile={profile.data}
      mediaUrl={venueMediaUrl}
      isSaving={save.isPending}
      isUploading={cover.isPending || upload.isPending}
      error={failure ? cabinetErrorText(failure) : null}
      onSave={(input) => save.mutate(input)}
      onPickCover={() => void pickCover()}
      onPickPhoto={(kind) => void pickPhoto(kind)}
      onRemovePhoto={(photo) => remove.mutate(photo)}
    />
  );
}

/** Owner-only screen: edit the public venue page. Others are sent back to the cabinet. */
export function VenueProfileArea() {
  const { venue, isLoading, isError, retry } = useCabinetVenue();
  if (isLoading) return <Message>{t('staff.loading')}</Message>;
  if (isError) return <Message onRetry={retry}>{t('staff.errorBody')}</Message>;
  if (!venue || venue.role !== 'owner') return <Redirect href="/cabinet" />;
  return <ProfileEditorForVenue venueId={venue.id} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.lg, justifyContent: 'center' },
});
