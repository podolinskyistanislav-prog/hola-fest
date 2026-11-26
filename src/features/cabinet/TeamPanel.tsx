import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, Chip, TextField } from '@/components/ui';
import { t } from '@/lib/i18n';
import { isValidEmail } from '@/lib/profileRules';
import type { VenueInvite, VenueMember, VenueStaffRole } from '@/services/venueTeam';
import { space, useTheme } from '@/theme';

export type TeamPanelProps = {
  members: readonly VenueMember[];
  invites: readonly VenueInvite[];
  isLoading: boolean;
  isError: boolean;
  isInviting: boolean;
  /** Already translated error of the last failed action. */
  actionError: string | null;
  /** The one-time invite token just created; shown once, then dismissed. */
  newInviteToken: string | null;
  onRetry: () => void;
  onInvite: (email: string, role: VenueStaffRole) => void;
  onDismissToken: () => void;
  onRemoveMember: (userId: string) => void;
  onCancelInvite: (inviteId: string) => void;
};

const ROLE_KEY = {
  owner: 'cabinet.role.owner',
  admin: 'cabinet.role.admin',
  host: 'cabinet.role.host',
} as const;

/** Owner's team screen: members with roles, remove, invite by email, open invites. */
export function TeamPanel({
  members,
  invites,
  isLoading,
  isError,
  isInviting,
  actionError,
  newInviteToken,
  onRetry,
  onInvite,
  onDismissToken,
  onRemoveMember,
  onCancelInvite,
}: TeamPanelProps) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<VenueStaffRole>('host');
  const emailValid = isValidEmail(email);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="title" accessibilityRole="header">
          {t('cabinet.team')}
        </AppText>

        {isLoading ? <AppText tone="muted">{t('staff.loading')}</AppText> : null}
        {isError ? (
          <View style={styles.group}>
            <AppText tone="muted" accessibilityRole="alert">
              {t('cabinet.teamError')}
            </AppText>
            <Button label={t('staff.retry')} onPress={onRetry} />
          </View>
        ) : null}

        {members.map((member) => {
          const name = member.displayName ?? member.handle ?? t('cabinet.unnamed');
          return (
            <View key={member.userId} style={styles.row}>
              <View style={styles.rowText}>
                <AppText variant="bodyStrong">{name}</AppText>
                <AppText variant="caption" tone="muted">
                  {t(ROLE_KEY[member.role])}
                </AppText>
              </View>
              {member.role !== 'owner' ? (
                <Button
                  variant="glass"
                  label={t('cabinet.remove')}
                  accessibilityLabel={`${t('cabinet.remove')}, ${name}`}
                  onPress={() => onRemoveMember(member.userId)}
                />
              ) : null}
            </View>
          );
        })}

        <AppText variant="heading" accessibilityRole="header">
          {t('cabinet.invite')}
        </AppText>
        <TextField
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          maxLength={254}
        />
        <View style={styles.roles}>
          <Chip
            label={t('cabinet.role.host')}
            selected={role === 'host'}
            onPress={() => setRole('host')}
          />
          <Chip
            label={t('cabinet.role.admin')}
            selected={role === 'admin'}
            onPress={() => setRole('admin')}
          />
        </View>
        <Button
          label={isInviting ? t('cabinet.inviting') : t('cabinet.sendInvite')}
          disabled={!emailValid || isInviting}
          accessibilityState={{ disabled: !emailValid || isInviting, busy: isInviting }}
          onPress={() => {
            onInvite(email.trim(), role);
            setEmail('');
          }}
        />
        {actionError ? (
          <AppText variant="caption" accessibilityRole="alert">
            {actionError}
          </AppText>
        ) : null}

        {newInviteToken ? (
          <View style={styles.group}>
            <AppText variant="bodyStrong">{t('cabinet.tokenTitle')}</AppText>
            <AppText selectable>{newInviteToken}</AppText>
            <AppText variant="caption" tone="muted">
              {t('cabinet.tokenHint')}
            </AppText>
            <Button variant="glass" label={t('cabinet.tokenDone')} onPress={onDismissToken} />
          </View>
        ) : null}

        {invites.length > 0 ? (
          <AppText variant="heading" accessibilityRole="header">
            {t('cabinet.openInvites')}
          </AppText>
        ) : null}
        {invites.map((invite) => (
          <View key={invite.id} style={styles.row}>
            <View style={styles.rowText}>
              <AppText variant="bodyStrong">{invite.email}</AppText>
              <AppText variant="caption" tone="muted">
                {t(ROLE_KEY[invite.role])}
              </AppText>
            </View>
            <Button
              variant="glass"
              label={t('cabinet.cancelInvite')}
              accessibilityLabel={`${t('cabinet.cancelInvite')}, ${invite.email}`}
              onPress={() => onCancelInvite(invite.id)}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: space.screen, gap: space.lg },
  group: { gap: space.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
  rowText: { flex: 1, gap: space.xs },
  roles: { flexDirection: 'row', gap: space.md },
});
