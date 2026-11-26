import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { cabinetErrorText } from './cabinetErrors';
import { TeamPanel } from './TeamPanel';
import {
  useCabinetVenue,
  useCancelInvite,
  useInviteStaff,
  useRemoveMember,
  useVenueInvites,
  useVenueMembers,
} from './useCabinet';

function TeamForVenue({ venueId }: { venueId: string }) {
  const members = useVenueMembers(venueId);
  const invites = useVenueInvites(venueId);
  const invite = useInviteStaff(venueId);
  const remove = useRemoveMember(venueId);
  const cancel = useCancelInvite(venueId);
  const [token, setToken] = useState<string | null>(null);
  const failure = invite.error ?? remove.error ?? cancel.error;

  return (
    <TeamPanel
      members={members.data ?? []}
      invites={invites.data ?? []}
      isLoading={members.isPending}
      isError={members.isError || invites.isError}
      isInviting={invite.isPending}
      actionError={failure ? cabinetErrorText(failure) : null}
      newInviteToken={token}
      onRetry={() => {
        void members.refetch();
        void invites.refetch();
      }}
      onInvite={(email, role) => invite.mutate({ email, role }, { onSuccess: setToken })}
      onDismissToken={() => setToken(null)}
      onRemoveMember={(userId) => remove.mutate(userId)}
      onCancelInvite={(inviteId) => cancel.mutate(inviteId)}
    />
  );
}

/** Owner-only team screen. Others are sent back to the cabinet. */
export function TeamArea() {
  const { colors } = useTheme();
  const { venue, isLoading, isError, retry } = useCabinetVenue();

  if (isLoading || isError) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <AppText tone="muted" accessibilityRole={isError ? 'alert' : 'progressbar'}>
          {t(isError ? 'staff.errorBody' : 'staff.loading')}
        </AppText>
        {isError ? <Button label={t('staff.retry')} onPress={retry} /> : null}
      </SafeAreaView>
    );
  }
  if (!venue || venue.role !== 'owner') return <Redirect href="/cabinet" />;
  return <TeamForVenue venueId={venue.id} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.lg, justifyContent: 'center' },
});
