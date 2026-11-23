import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, Chip, DjAvatar, GigRow } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';
import type { Dj } from '@/types/djs';

import { genresLine, gigRowProps } from './djFormat';
import { useDj } from './useDjs';

export interface DjScreenContentProps {
  slug: string | undefined;
  onBack: () => void;
  onOpenEvent: (eventId: string) => void;
}

const SCREEN_TOP = 96;
const SKELETON_HEIGHT = 220;

function Message({ title, body, children }: { title: string; body: string; children?: ReactNode }) {
  return (
    <View style={styles.message}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      <AppText tone="muted">{body}</AppText>
      {children}
    </View>
  );
}

function DjBody({
  dj,
  safeAreaTop,
  safeAreaBottom,
  onBack,
  onOpenEvent,
}: {
  dj: Dj;
  safeAreaTop: number;
  safeAreaBottom: number;
  onBack: () => void;
  onOpenEvent: (eventId: string) => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.body,
        { paddingTop: safeAreaTop + space.md, paddingBottom: safeAreaBottom + space.xxl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.backRow}>
        <Button label={t('dj.back')} variant="inverse" onPress={onBack} />
      </View>

      <View style={styles.hero}>
        <DjAvatar name={dj.name} size={96} />
        <AppText variant="title" accessibilityRole="header">
          {dj.name}
        </AppText>
        {dj.genres.length > 0 ? (
          <View accessibilityLabel={genresLine(dj.genres)} style={styles.chips}>
            {dj.genres.map((genre) => (
              <Chip key={genre} label={genresLine([genre])} />
            ))}
          </View>
        ) : null}
        <AppText tone="muted">{t('dj.bioPlaceholder')}</AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="heading" accessibilityRole="header">
          {t('dj.gigs')}
        </AppText>
        {dj.gigs.map((gig) => (
          <GigRow
            key={gig.eventId}
            {...gigRowProps(gig)}
            onPress={() => onOpenEvent(gig.eventId)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

/** Loads one DJ by slug and shows their page, or a loading / error / not-found state. */
export function DjScreenContent({ slug, onBack, onOpenEvent }: DjScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dj = useDj(slug);

  if (dj.isLoading) {
    return (
      <View
        accessibilityLabel={t('dj.loading')}
        accessibilityRole="progressbar"
        style={styles.screen}
      >
        <View style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      </View>
    );
  }

  if (dj.isError) {
    return (
      <Message title={t('djs.errorTitle')} body={t('djs.errorBody')}>
        <Button label={t('djs.retry')} onPress={() => void dj.refetch()} />
        <Button label={t('dj.back')} variant="inverse" onPress={onBack} />
      </Message>
    );
  }

  if (!dj.data) {
    return (
      <Message title={t('dj.notFoundTitle')} body={t('dj.notFoundBody')}>
        <Button label={t('dj.back')} variant="inverse" onPress={onBack} />
      </Message>
    );
  }

  return (
    <DjBody
      dj={dj.data}
      safeAreaTop={insets.top}
      safeAreaBottom={insets.bottom}
      onBack={onBack}
      onOpenEvent={onOpenEvent}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, paddingTop: SCREEN_TOP },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card },
  message: {
    flex: 1,
    gap: space.md,
    padding: space.screen,
    paddingTop: SCREEN_TOP,
    alignItems: 'flex-start',
  },
  body: { paddingHorizontal: space.screen, gap: space.xl },
  backRow: { alignItems: 'flex-start' },
  hero: { alignItems: 'center', gap: space.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, justifyContent: 'center' },
  section: { gap: space.md },
});
