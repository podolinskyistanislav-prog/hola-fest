import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import { useIsSuperadmin } from '@/features/applications/useApplications';
import { useSession } from '@/features/auth';
import { t, type TranslationKey } from '@/lib/i18n';
import type { ModerationItem } from '@/services/moderation';
import { radius, space, useTheme } from '@/theme';

import { useModerationAction, useModerationQueue, type ModerationAction } from './useModeration';

function reportSummary(item: ModerationItem): string {
  const counts = new Map<string, number>();
  for (const reason of item.reasons) counts.set(reason, (counts.get(reason) ?? 0) + 1);
  return [...counts.entries()]
    .map(([reason, count]) => `${t(`moderation.reason.${reason}` as TranslationKey)} ×${count}`)
    .join(', ');
}

function ModerationCard({
  item,
  busy,
  onAction,
}: {
  item: ModerationItem;
  busy: boolean;
  onAction: (action: ModerationAction) => void;
}) {
  const { colors } = useTheme();
  const author = item.author;
  const hiddenLabel = t(
    item.hiddenReason === 'reports' ? 'moderation.hiddenByReports' : 'moderation.hiddenByModerator',
  );
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <AppText variant="label" tone="muted">
        {t(item.kind === 'post' ? 'moderation.kindPost' : 'moderation.kindComment')}
      </AppText>
      <AppText>{item.body}</AppText>
      <AppText tone="muted">
        {author.handle ? `${author.name} @${author.handle}` : author.name}
        {author.isBanned ? ` · ${t('moderation.banned')}` : ''}
      </AppText>
      {item.reportCount > 0 ? (
        <AppText variant="caption">
          {t('moderation.reports').replace('{count}', String(item.reportCount))}
          {` — ${reportSummary(item)}`}
        </AppText>
      ) : null}
      {item.hidden ? <AppText variant="caption">{hiddenLabel}</AppText> : null}
      <View style={styles.group}>
        <Button
          label={t(item.hidden ? 'moderation.restore' : 'moderation.hide')}
          onPress={() => onAction({ type: item.hidden ? 'restore' : 'hide', item })}
          disabled={busy}
          accessibilityState={{ disabled: busy, busy }}
        />
        <Button
          variant="inverse"
          label={t(author.isBanned ? 'moderation.unban' : 'moderation.ban')}
          onPress={() => onAction({ type: author.isBanned ? 'unban' : 'ban', item })}
          disabled={busy}
        />
        <Button
          variant="glass"
          label={t(author.isDj ? 'moderation.unmarkDj' : 'moderation.markDj')}
          onPress={() => onAction({ type: author.isDj ? 'unmarkDj' : 'markDj', item })}
          disabled={busy}
        />
      </View>
    </View>
  );
}

/** Superadmin queue of reported and hidden feed content. The server decides every action. */
export function ModerationContent() {
  const { session } = useSession();
  const superadmin = useIsSuperadmin(session?.user.id);
  const allowed = superadmin.data === true;
  const queue = useModerationQueue(allowed);
  const act = useModerationAction();

  let body;
  if (superadmin.isPending || (allowed && queue.isPending)) {
    body = (
      <AppText tone="muted" accessibilityRole="progressbar">
        {t('staff.loading')}
      </AppText>
    );
  } else if (superadmin.isError || queue.isError) {
    body = (
      <View style={styles.group}>
        <AppText accessibilityRole="alert">{t('moderation.loadError')}</AppText>
        <Button
          label={t('apply.retry')}
          onPress={() => {
            void superadmin.refetch();
            if (allowed) void queue.refetch();
          }}
        />
      </View>
    );
  } else if (!allowed) {
    body = <AppText accessibilityRole="alert">{t('review.forbidden')}</AppText>;
  } else {
    body = (
      <FlatList
        data={queue.data ?? []}
        keyExtractor={(item) => `${item.kind}:${item.id}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<AppText tone="muted">{t('moderation.empty')}</AppText>}
        ListHeaderComponent={
          act.isError ? (
            <AppText variant="caption" accessibilityRole="alert">
              {t('moderation.actionFailed')}
            </AppText>
          ) : undefined
        }
        renderItem={({ item }) => (
          <ModerationCard
            item={item}
            busy={act.isPending}
            onAction={(action) => act.mutate(action)}
          />
        )}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <AppText variant="title" accessibilityRole="header">
        {t('moderation.title')}
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
