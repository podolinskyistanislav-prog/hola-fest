import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';
import { AuthorLabel, type AuthorKind } from './AuthorLabel';
import { DjAvatar } from './DjAvatar';
import { formatRelativeTime } from './PostCard';

const REPLY_INDENT = 40;

export interface CommentRowProps {
  authorName: string;
  handle: string;
  avatarUri?: string | null;
  authorKind?: AuthorKind;
  createdAt: Date;
  now?: Date;
  text: string;
  /** A reply to a comment is indented one level; replies to replies do not exist. */
  isReply?: boolean;
  onPressReply?: () => void;
  onPressMenu?: () => void;
}

/** One comment under a post. */
export function CommentRow({
  authorName,
  handle,
  avatarUri,
  authorKind,
  createdAt,
  now,
  text,
  isReply = false,
  onPressReply,
  onPressMenu,
}: CommentRowProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.row, isReply && { marginLeft: REPLY_INDENT }]}>
      <DjAvatar name={authorName} photoUri={avatarUri} />
      <View style={styles.body}>
        <View style={styles.nameLine}>
          <AppText variant="label" numberOfLines={1} style={styles.name}>
            {authorName}
          </AppText>
          {authorKind ? <AuthorLabel kind={authorKind} /> : null}
          <AppText variant="meta" tone="muted" numberOfLines={1}>
            {formatRelativeTime(createdAt, now)}
          </AppText>
        </View>
        <AppText variant="meta" tone="muted" numberOfLines={1}>{`@${handle}`}</AppText>
        <AppText>{text}</AppText>
        {isReply ? null : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Відповісти"
            onPress={onPressReply}
            style={styles.reply}
          >
            <AppText variant="label" tone="muted">
              Відповісти
            </AppText>
          </Pressable>
        )}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Ще"
        onPress={onPressMenu}
        style={styles.menu}
      >
        <Feather name="more-horizontal" size={18} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space.md },
  body: { flex: 1, gap: 2 },
  nameLine: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  name: { flexShrink: 1 },
  reply: { minHeight: touchTarget, justifyContent: 'center' },
  menu: {
    width: touchTarget,
    height: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
