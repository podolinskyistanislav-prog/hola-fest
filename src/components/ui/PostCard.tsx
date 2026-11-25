import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { brand, radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';
import { AuthorLabel, type AuthorKind } from './AuthorLabel';
import { DjAvatar } from './DjAvatar';
import { ImageGrid } from './ImageGrid';

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** "щойно", "5 хв", "3 год", "вчора", "4 дн", then a short date ("12.11"). */
export function formatRelativeTime(createdAt: Date, now: Date = new Date()): string {
  const diff = Math.max(0, now.getTime() - createdAt.getTime());
  if (diff < MINUTE) return 'щойно';
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} хв`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)} год`;
  const days = Math.floor(diff / DAY);
  if (days === 1) return 'вчора';
  if (days < 7) return `${days} дн`;
  const day = String(createdAt.getDate()).padStart(2, '0');
  const month = String(createdAt.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}`;
}

export interface PostCardProps {
  authorName: string;
  /** Without the leading "@". */
  handle: string;
  avatarUri?: string | null;
  /** Guests have no label. */
  authorKind?: AuthorKind;
  createdAt: Date;
  /** Reference time for the relative label; defaults to now. */
  now?: Date;
  text: string;
  photoUris?: readonly string[];
  likeCount: number;
  commentCount: number;
  liked?: boolean;
  onPressLike?: () => void;
  onPressComment?: () => void;
  onPressShare?: () => void;
  onPressMenu?: () => void;
  onPressImage?: (index: number) => void;
}

/** One post of the Стрічка: author line, text, photos and the action row. */
export function PostCard({
  authorName,
  handle,
  avatarUri,
  authorKind,
  createdAt,
  now,
  text,
  photoUris = [],
  likeCount,
  commentCount,
  liked = false,
  onPressLike,
  onPressComment,
  onPressShare,
  onPressMenu,
  onPressImage,
}: PostCardProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.rowBorder }]}>
      <View style={styles.header}>
        <DjAvatar name={authorName} photoUri={avatarUri} />
        <View style={styles.author}>
          <View style={styles.nameLine}>
            <AppText variant="bodyStrong" numberOfLines={1} style={styles.name}>
              {authorName}
            </AppText>
            {authorKind ? <AuthorLabel kind={authorKind} /> : null}
          </View>
          <AppText variant="meta" tone="muted" numberOfLines={1}>
            {`@${handle} · ${formatRelativeTime(createdAt, now)}`}
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ще"
          onPress={onPressMenu}
          style={styles.iconHit}
        >
          <Feather name="more-horizontal" size={20} color={colors.textMuted} />
        </Pressable>
      </View>

      <AppText>{text}</AppText>
      <ImageGrid uris={photoUris} onPressImage={onPressImage} />

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${liked ? 'Прибрати вподобання' : 'Вподобати'}, ${likeCount}`}
          accessibilityState={{ selected: liked }}
          onPress={onPressLike}
          style={styles.action}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={20}
            color={liked ? brand.pink : colors.textMuted}
          />
          <AppText variant="label" tone="muted">
            {likeCount}
          </AppText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Коментарі, ${commentCount}`}
          onPress={onPressComment}
          style={styles.action}
        >
          <Feather name="message-circle" size={20} color={colors.textMuted} />
          <AppText variant="label" tone="muted">
            {commentCount}
          </AppText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Поділитися"
          onPress={onPressShare}
          style={styles.action}
        >
          <Feather name="share" size={20} color={colors.textMuted} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.card,
    borderWidth: 1,
    padding: space.lg,
    gap: space.md,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  author: { flex: 1, gap: 2 },
  nameLine: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  name: { flexShrink: 1 },
  iconHit: {
    width: touchTarget,
    height: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  action: {
    minHeight: touchTarget,
    minWidth: touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingRight: space.md,
  },
});
