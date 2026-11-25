import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, ChoiceCard } from '@/components/ui';
import { useSession } from '@/features/auth';
import { t } from '@/lib/i18n';
import type { AccountApplication, ApplicationKind } from '@/services/applications';
import { space } from '@/theme';

import { DjApplicationForm } from './DjApplicationForm';
import { VenueApplicationForm } from './VenueApplicationForm';
import { useMyApplications, useSubmitApplication } from './useApplications';

export interface ApplicationScreenContentProps {
  onDone: () => void;
}

/** A pending application wins; otherwise the newest decision is shown. */
export function currentApplication(applications: AccountApplication[]): AccountApplication | null {
  return (
    applications.find((application) => application.status === 'pending') ?? applications[0] ?? null
  );
}

function ApplicationStatusView({
  application,
  onAgain,
  onDone,
}: {
  application: AccountApplication;
  onAgain: () => void;
  onDone: () => void;
}) {
  if (application.status === 'pending') {
    return (
      <View style={styles.group}>
        <AppText variant="heading" accessibilityRole="header">
          {t('apply.pending')}
        </AppText>
        <Button variant="glass" label={t('apply.toProfile')} onPress={onDone} />
      </View>
    );
  }
  if (application.status === 'rejected') {
    return (
      <View style={styles.group}>
        <AppText variant="heading" accessibilityRole="header">
          {t('apply.rejected')}
        </AppText>
        {application.rejectReason ? (
          <AppText tone="muted">
            {t('apply.rejectReason').replace('{reason}', application.rejectReason)}
          </AppText>
        ) : null}
        <Button label={t('apply.again')} onPress={onAgain} />
      </View>
    );
  }
  return (
    <View style={styles.group}>
      <AppText variant="heading" accessibilityRole="header">
        {t('apply.approved')}
      </AppText>
      <AppText tone="muted">{t('apply.approvedHint')}</AppText>
      <Button label={t('apply.toProfile')} onPress={onDone} />
    </View>
  );
}

/** Choose account type, fill the application, then see pending / rejected / approved. */
export function ApplicationScreenContent({ onDone }: ApplicationScreenContentProps) {
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const userId = session?.user.id;
  const applications = useMyApplications(userId);
  const submit = useSubmitApplication(userId);
  const [kind, setKind] = useState<ApplicationKind | null>(null);
  const [startOver, setStartOver] = useState(false);

  const container = [styles.container, { paddingTop: insets.top + space.lg }];

  if (applications.isPending) {
    return (
      <View style={container}>
        <AppText tone="muted" accessibilityRole="progressbar">
          {t('apply.title')}
        </AppText>
      </View>
    );
  }
  if (applications.isError) {
    return (
      <View style={container}>
        <AppText variant="heading" accessibilityRole="alert">
          {t('apply.loadError')}
        </AppText>
        <Button label={t('apply.retry')} onPress={() => applications.refetch()} />
      </View>
    );
  }

  const current = currentApplication(applications.data);
  const submitError = submit.isError ? t('apply.submitFailed') : null;

  let body;
  if (current && !startOver) {
    body = (
      <ApplicationStatusView
        application={current}
        onAgain={() => setStartOver(true)}
        onDone={onDone}
      />
    );
  } else if (kind === 'venue') {
    body = (
      <>
        <AppText variant="title" accessibilityRole="header">
          {t('apply.venueTitle')}
        </AppText>
        <VenueApplicationForm
          isSubmitting={submit.isPending}
          error={submitError}
          onSubmit={(values) => submit.mutate({ kind: 'venue', values })}
        />
      </>
    );
  } else if (kind === 'dj') {
    body = (
      <>
        <AppText variant="title" accessibilityRole="header">
          {t('apply.djTitle')}
        </AppText>
        <DjApplicationForm
          isSubmitting={submit.isPending}
          error={submitError}
          onSubmit={(values) => submit.mutate({ kind: 'dj', values })}
        />
      </>
    );
  } else {
    body = (
      <View style={styles.group} accessibilityRole="radiogroup">
        <AppText variant="title" accessibilityRole="header">
          {t('apply.title')}
        </AppText>
        <ChoiceCard
          title={t('apply.venue')}
          subtitle={t('apply.venueHint')}
          icon={<AppText>🏠</AppText>}
          onPress={() => setKind('venue')}
        />
        <ChoiceCard
          title={t('apply.dj')}
          subtitle={t('apply.djHint')}
          icon={<AppText>🎧</AppText>}
          onPress={() => setKind('dj')}
        />
      </View>
    );
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[container, { paddingBottom: insets.bottom + space.xxl }]}
    >
      {body}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: space.screen, gap: space.xl },
  group: { gap: space.lg },
});
