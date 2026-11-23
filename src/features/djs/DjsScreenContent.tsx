import { useMemo, useState, type ReactNode } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, DjRow, GlassSearchField, tabBarInset } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';

import { filterDjsByName, genresLine, nextGigLine } from './djFormat';
import { useDjs } from './useDjs';

export interface DjsScreenContentProps {
  onOpenDj: (slug: string) => void;
}

const SKELETON_ROWS = 4;
const SKELETON_HEIGHT = 68;

function Message({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <View style={styles.message}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      <AppText tone="muted">{body}</AppText>
      {action}
    </View>
  );
}

/** The "Діджеї" tab: search by name and a list of DJs sorted by next gig. */
export function DjsScreenContent({ onOpenDj }: DjsScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const djs = useDjs();
  const [query, setQuery] = useState('');
  const visible = useMemo(() => filterDjsByName(djs.data ?? [], query), [djs.data, query]);

  let body: ReactNode;
  if (djs.isLoading) {
    body = (
      <View
        accessibilityLabel={t('djs.loading')}
        accessibilityRole="progressbar"
        style={styles.skeletons}
      >
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <View key={index} style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
        ))}
      </View>
    );
  } else if (djs.isError) {
    body = (
      <Message
        title={t('djs.errorTitle')}
        body={t('djs.errorBody')}
        action={<Button label={t('djs.retry')} onPress={() => void djs.refetch()} />}
      />
    );
  } else if ((djs.data ?? []).length === 0) {
    body = <Message title={t('djs.emptyTitle')} body={t('djs.emptyBody')} />;
  } else if (visible.length === 0) {
    body = <Message title={t('djs.noMatches')} body={t('djs.emptyBody')} />;
  } else {
    body = (
      <FlatList
        data={visible}
        keyExtractor={(dj) => dj.slug}
        contentContainerStyle={[styles.list, { paddingBottom: tabBarInset(insets.bottom) }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <DjRow
            name={item.name}
            genresLine={genresLine(item.genres)}
            nextGigLine={nextGigLine(item)}
            onPress={() => onOpenDj(item.slug)}
          />
        )}
      />
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top + space.md }]}>
      <AppText variant="title" accessibilityRole="header" style={styles.title}>
        {t('djs.title')}
      </AppText>
      <View style={styles.search}>
        <GlassSearchField
          label={t('djs.searchLabel')}
          placeholder={t('djs.searchPlaceholder')}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  title: { paddingHorizontal: space.screen },
  search: { paddingHorizontal: space.screen, paddingVertical: space.md },
  list: { paddingHorizontal: space.screen, gap: space.sm },
  skeletons: { paddingHorizontal: space.screen, gap: space.sm },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.row },
  message: { gap: space.md, padding: space.screen, alignItems: 'flex-start' },
});
