import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, BottomSheet, Button, ReportSheet } from '@/components/ui';
import { t } from '@/lib/i18n';
import type { ReportReason } from '@/services/feed';
import { radius, space, touchTarget, useTheme } from '@/theme';

import { BlockConfirmSheet } from './BlockConfirmSheet';
import { useBlockAuthor, useDeleteContent, useReport, type ContentTarget } from './usePostPage';

export interface MenuTarget extends ContentTarget {
  authorId: string;
  /** The signed-in user wrote it: delete (and edit for posts) instead of report and block. */
  own: boolean;
}

export interface ContentMenuProps {
  /** The post or comment whose "⋯" was tapped; null keeps everything closed. */
  target: MenuTarget | null;
  onClose: () => void;
  onEdit: (target: MenuTarget) => void;
  onDeleted: (target: MenuTarget) => void;
  onBlocked: (target: MenuTarget) => void;
  /** Reports and blocks need a confirmed account: runs the action or starts the sign-in step. */
  requireReady: (action: () => void) => void;
}

type Stage = 'menu' | 'report' | 'confirmDelete' | 'confirmBlock';

function Row({ label, onPress, danger }: { label: string; onPress: () => void; danger?: boolean }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surfaceRaised, borderColor: colors.border }]}
    >
      <AppText variant="bodyStrong" style={danger ? { color: colors.danger } : undefined}>
        {label}
      </AppText>
    </Pressable>
  );
}

/** The "⋯" menu of a post or comment: report, block author, delete and edit, with confirmations. */
export function ContentMenu({ target, ...rest }: ContentMenuProps) {
  if (!target) return null;
  // Keyed so every opened menu starts at its first step with no leftover notice.
  return <OpenMenu key={`${target.kind}:${target.id}`} target={target} {...rest} />;
}

function OpenMenu({
  target,
  onClose,
  onEdit,
  onDeleted,
  onBlocked,
  requireReady,
}: ContentMenuProps & { target: MenuTarget }) {
  const [stage, setStage] = useState<Stage>('menu');
  const [notice, setNotice] = useState<string | undefined>(undefined);
  const report = useReport();
  const block = useBlockAuthor();
  const remove = useDeleteContent();
  const isPost = target.kind === 'post';

  function choose(next: Stage) {
    setNotice(undefined);
    requireReady(() => setStage(next));
  }

  function sendReport(reason: ReportReason) {
    report.mutate(
      { target, reason },
      {
        onSuccess: () => setNotice(t('feed.menu.reported')),
        onError: () => setNotice(t('feed.menu.failed')),
      },
    );
    setStage('menu');
  }

  function confirmBlock() {
    block.mutate(target.authorId, {
      onSuccess: () => onBlocked(target),
      onError: () => setNotice(t('feed.menu.failed')),
    });
    setStage('menu');
  }

  function confirmDelete() {
    remove.mutate(target, {
      onSuccess: () => onDeleted(target),
      onError: () => setNotice(t('feed.menu.failed')),
    });
    setStage('menu');
  }

  return (
    <>
      <BottomSheet
        visible={stage === 'menu'}
        title={isPost ? t('feed.menu.post') : t('feed.menu.comment')}
        onClose={onClose}
      >
        {notice ? (
          <AppText accessibilityRole="alert" variant="caption" tone="muted">
            {notice}
          </AppText>
        ) : null}
        {target.own ? (
          <>
            {target.kind === 'post' ? (
              <Row label={t('feed.menu.edit')} onPress={() => onEdit(target)} />
            ) : null}
            <Row label={t('feed.menu.delete')} danger onPress={() => choose('confirmDelete')} />
          </>
        ) : (
          <>
            <Row label={t('feed.menu.report')} onPress={() => choose('report')} />
            <Row label={t('feed.menu.block')} onPress={() => choose('confirmBlock')} />
          </>
        )}
      </BottomSheet>
      <ReportSheet
        visible={stage === 'report'}
        onClose={() => setStage('menu')}
        onSelectReason={sendReport}
      />
      <BottomSheet
        visible={stage === 'confirmDelete'}
        title={isPost ? t('feed.menu.deletePostTitle') : t('feed.menu.deleteCommentTitle')}
        onClose={() => setStage('menu')}
      >
        <View style={styles.confirm}>
          <AppText tone="muted">{t('feed.menu.deleteBody')}</AppText>
          <Button label={t('feed.menu.delete')} variant="pink" onPress={confirmDelete} />
          <Button label={t('feed.menu.cancel')} variant="glass" onPress={() => setStage('menu')} />
        </View>
      </BottomSheet>
      <BlockConfirmSheet
        visible={stage === 'confirmBlock'}
        onClose={() => setStage('menu')}
        onConfirm={confirmBlock}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: touchTarget + 4,
    justifyContent: 'center',
    paddingHorizontal: space.lg,
    borderRadius: radius.control,
    borderWidth: 1,
  },
  confirm: { gap: space.md },
});
