import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, TextField } from '@/components/ui';
import { useSession } from '@/features/auth';
import { t } from '@/lib/i18n';
import type { AccountApplication } from '@/services/applications';
import { radius, space, useTheme } from '@/theme';

import { useDecideApplication, useIsSuperadmin, usePendingApplications } from './useApplications';

function ApplicationCard({
  application,
  busy,
  onApprove,
  onReject,
}: {
  application: AccountApplication;
  busy: boolean;
  onApprove: () => void;
  onReject: (reason: string) => void;
}) {
  const { colors } = useTheme();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const kindLabel = t(application.kind === 'dj' ? 'review.kindDj' : 'review.kindVenue');

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <AppText variant="label" tone="muted">
        {kindLabel}
      </AppText>
      <AppText variant="cardTitle">{application.title}</AppText>
      {application.applicantName ? (
        <AppText tone="muted">{application.applicantName}</AppText>
      ) : null}
      {application.contact ? <AppText tone="muted">{application.contact}</AppText> : null}
      {rejecting ? (
        <View style={styles.group}>
          <TextField
            label={t('review.reason')}
            value={reason}
            onChangeText={setReason}
            multiline
            maxLength={500}
          />
          <Button
            variant="pink"
            label={t('review.confirmReject')}
            onPress={() => onReject(reason.trim())}
            disabled={busy || reason.trim() === ''}
            accessibilityState={{ disabled: busy || reason.trim() === '', busy }}
          />
          <Button variant="glass" label={t('review.cancel')} onPress={() => setRejecting(false)} />
        </View>
      ) : (
        <View style={styles.group}>
          <Button
            label={t('review.approve')}
            onPress={onApprove}
            disabled={busy}
            accessibilityState={{ disabled: busy, busy }}
          />
          <Button
            variant="inverse"
            label={t('review.reject')}
            onPress={() => setRejecting(true)}
            disabled={busy}
          />
        </View>
      )}
    </View>
  );
}

/** Superadmin queue: pending applications with approve / reject (reason). The server decides. */
export function ApplicationsReviewContent() {
  const { session } = useSession();
  const userId = session?.user.id;
  const superadmin = useIsSuperadmin(userId);
  const allowed = superadmin.data === true;
  const pending = usePendingApplications(allowed);
  const decide = useDecideApplication();

  let body;
  if (superadmin.isPending || (allowed && pending.isPending)) {
    body = (
      <AppText tone="muted" accessibilityRole="progressbar">
        {t('staff.loading')}
      </AppText>
    );
  } else if (superadmin.isError || pending.isError) {
    body = (
      <View style={styles.group}>
        <AppText accessibilityRole="alert">{t('review.loadError')}</AppText>
        <Button
          label={t('apply.retry')}
          onPress={() => {
            void superadmin.refetch();
            if (allowed) void pending.refetch();
          }}
        />
      </View>
    );
  } else if (!allowed) {
    body = <AppText accessibilityRole="alert">{t('review.forbidden')}</AppText>;
  } else {
    body = (
      <FlatList
        data={pending.data ?? []}
        keyExtractor={(application) => application.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<AppText tone="muted">{t('review.empty')}</AppText>}
        ListHeaderComponent={
          decide.isError ? (
            <AppText variant="caption" accessibilityRole="alert">
              {t('review.decisionFailed')}
            </AppText>
          ) : undefined
        }
        renderItem={({ item }) => (
          <ApplicationCard
            application={item}
            busy={decide.isPending}
            onApprove={() => decide.mutate({ id: item.id, approve: true })}
            onReject={(reason) => decide.mutate({ id: item.id, approve: false, reason })}
          />
        )}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <AppText variant="title" accessibilityRole="header">
        {t('review.title')}
      </AppText>
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.lg },
  group: { gap: space.md },
  card: { borderWidth: 1, borderRadius: radius.card, padding: space.lg, gap: space.sm },
  separator: { height: space.md },
});
