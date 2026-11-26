import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, GigRow } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space } from '@/theme';

import { DjProfileEditor } from './DjProfileEditor';
import { gigRowProps } from './djFormat';
import { useMyDjProfile, useMyGigs } from './useDjCabinet';

export interface DjCabinetScreenContentProps {
  userId: string | undefined;
  onBack: () => void;
  onOpenEvent: (eventId: string) => void;
}

function Message({
  title,
  body,
  children,
}: {
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <View style={styles.message}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      {body ? <AppText tone="muted">{body}</AppText> : null}
      {children}
    </View>
  );
}

function MyGigs({
  profileId,
  onOpenEvent,
}: {
  profileId: string;
  onOpenEvent: (eventId: string) => void;
}) {
  const gigs = useMyGigs(profileId);
  let body: ReactNode;
  if (gigs.isPending) {
    body = (
      <AppText tone="muted" accessibilityRole="progressbar">
        {t('djCabinet.gigsLoading')}
      </AppText>
    );
  } else if (gigs.isError) {
    body = (
      <>
        <AppText tone="muted">{t('djCabinet.gigsError')}</AppText>
        <Button label={t('djs.retry')} onPress={() => void gigs.refetch()} />
      </>
    );
  } else if (gigs.data.length === 0) {
    body = <AppText tone="muted">{t('djCabinet.gigsEmpty')}</AppText>;
  } else {
    body = gigs.data.map((gig) => (
      <GigRow key={gig.eventId} {...gigRowProps(gig)} onPress={() => onOpenEvent(gig.eventId)} />
    ));
  }
  return (
    <View style={styles.gigs}>
      <AppText variant="heading" accessibilityRole="header">
        {t('djCabinet.gigs')}
      </AppText>
      {body}
    </View>
  );
}

/** "Мій профіль діджея" and "Мої виступи": edit the profile with a live preview, publish, see gigs. */
export function DjCabinetScreenContent({
  userId,
  onBack,
  onOpenEvent,
}: DjCabinetScreenContentProps) {
  const insets = useSafeAreaInsets();
  const profile = useMyDjProfile(userId);

  const back = <Button label={t('dj.back')} variant="inverse" onPress={onBack} />;
  if (profile.isPending) {
    return (
      <View style={[styles.message, { paddingTop: insets.top + space.xxl }]}>
        <AppText tone="muted" accessibilityRole="progressbar">
          {t('djCabinet.loading')}
        </AppText>
      </View>
    );
  }
  if (profile.isError) {
    return (
      <View style={{ paddingTop: insets.top }}>
        <Message title={t('djCabinet.errorTitle')} body={t('djs.errorBody')}>
          <Button label={t('djs.retry')} onPress={() => void profile.refetch()} />
          {back}
        </Message>
      </View>
    );
  }
  if (!profile.data || !userId) {
    return (
      <View style={{ paddingTop: insets.top }}>
        <Message title={t('djCabinet.noProfileTitle')} body={t('djCabinet.noProfileBody')}>
          {back}
        </Message>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.body,
        { paddingTop: insets.top + space.md, paddingBottom: insets.bottom + space.xxl },
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.back}>{back}</View>
      <AppText variant="title" accessibilityRole="header">
        {t('djCabinet.title')}
      </AppText>
      <DjProfileEditor key={profile.data.id} profile={profile.data} userId={userId} />
      <MyGigs profileId={profile.data.id} onOpenEvent={onOpenEvent} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: space.screen, gap: space.xl },
  back: { alignItems: 'flex-start' },
  message: { gap: space.md, padding: space.screen, alignItems: 'flex-start' },
  gigs: { gap: space.md },
});
