import { Feather } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, CommentRow, PostCard, TextField } from '@/components/ui';
import { SignInToPostSheet, useSession } from '@/features/auth';
import { useFeedAccess } from '@/features/profile';
import { t } from '@/lib/i18n';
import type { FeedComment } from '@/services/feed';
import { radius, space, touchTarget, useTheme } from '@/theme';

import { buildCommentThreads } from './commentThreads';
import { ContentMenu, type MenuTarget } from './ContentMenu';
import { EditPostSheet } from './EditPostSheet';
import { feedKeys } from './feedKeys';
import { sharePost } from './sharePost';
import { useToggleLike } from './useFeed';
import { useAddComment, useComments, usePost } from './usePostPage';

export interface PostScreenContentProps {
  postId: string;
  onBack: () => void;
  onOpenAuthor: (handle: string) => void;
  onOpenProfileSetup: () => void;
}

const SKELETON_HEIGHT = 168;
const COMMENT_MAX_CHARS = 500;

function Message({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <View style={styles.message}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      {body ? <AppText tone="muted">{body}</AppText> : null}
      {action}
    </View>
  );
}

/** The post page: the post, its comments (one reply level), a comment composer and the "⋯" menus. */
export function PostScreenContent({
  postId,
  onBack,
  onOpenAuthor,
  onOpenProfileSetup,
}: PostScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user.id;
  const access = useFeedAccess();
  const post = usePost(postId);
  const comments = useComments(postId);
  const toggleLike = useToggleLike(userId);
  const addComment = useAddComment(postId);
  const [menuTarget, setMenuTarget] = useState<MenuTarget | null>(null);
  const [editing, setEditing] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [replyTo, setReplyTo] = useState<FeedComment | null>(null);
  const [commentError, setCommentError] = useState<string | undefined>(undefined);

  function whenReady(action: () => void) {
    if (access === 'ready') action();
    else if (access === 'needs_email') setSignInOpen(true);
    else if (access === 'needs_profile') onOpenProfileSetup();
  }

  async function sendComment() {
    setCommentError(undefined);
    const message = await addComment.mutateAsync({ body: draft, parentId: replyTo?.id });
    if (message) {
      setCommentError(message);
      return;
    }
    setDraft('');
    setReplyTo(null);
  }

  function openCommentMenu(comment: FeedComment) {
    setMenuTarget({
      kind: 'comment',
      id: comment.id,
      authorId: comment.authorId,
      own: comment.authorId === userId,
    });
  }

  const threads = buildCommentThreads(comments.data ?? []);
  const postData = post.data;

  function renderComment(comment: FeedComment, isReply: boolean) {
    return (
      <CommentRow
        key={comment.id}
        authorName={comment.authorName}
        handle={comment.handle}
        avatarUri={comment.avatarUrl}
        authorKind={comment.label ?? undefined}
        createdAt={new Date(comment.createdAt)}
        text={comment.body}
        isReply={isReply}
        onPressReply={() => whenReady(() => setReplyTo(comment))}
        onPressMenu={() => openCommentMenu(comment)}
      />
    );
  }

  let body: ReactNode;
  if (post.isLoading) {
    body = (
      <View
        accessibilityLabel={t('feed.post.loading')}
        accessibilityRole="progressbar"
        style={styles.pad}
      >
        <View style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      </View>
    );
  } else if (post.isError) {
    body = (
      <Message
        title={t('feed.post.errorTitle')}
        body={t('feed.errorBody')}
        action={<Button label={t('feed.retry')} onPress={() => void post.refetch()} />}
      />
    );
  } else if (!postData) {
    body = (
      <Message
        title={t('feed.post.unavailableTitle')}
        body={t('feed.post.unavailableBody')}
        action={<Button label={t('feed.post.back')} variant="glass" onPress={onBack} />}
      />
    );
  } else {
    const authorHandle = postData.handle;
    body = (
      <>
        <FlatList
          data={threads}
          keyExtractor={(thread) => thread.comment.id}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View style={styles.header}>
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={`@${authorHandle}`}
                onPress={() => onOpenAuthor(authorHandle)}
                style={styles.authorLink}
              >
                <AppText variant="label" tone="muted">{`@${authorHandle}`}</AppText>
              </Pressable>
              <PostCard
                authorName={postData.authorName}
                handle={postData.handle}
                avatarUri={postData.avatarUrl}
                authorKind={postData.label ?? undefined}
                createdAt={new Date(postData.createdAt)}
                text={postData.body}
                photoUris={postData.imageUrls}
                likeCount={postData.likeCount}
                commentCount={postData.commentCount}
                liked={postData.likedByMe}
                onPressLike={() =>
                  whenReady(() =>
                    toggleLike.mutate(
                      { postId: postData.id, liked: !postData.likedByMe },
                      {
                        onSettled: () =>
                          void queryClient.invalidateQueries({ queryKey: feedKeys.post(postId) }),
                      },
                    ),
                  )
                }
                onPressShare={() => void sharePost(postData.id, t('feed.shareMessage'))}
                onPressMenu={() =>
                  setMenuTarget({
                    kind: 'post',
                    id: postData.id,
                    authorId: postData.authorId,
                    own: postData.authorId === userId,
                  })
                }
              />
              <AppText variant="heading" accessibilityRole="header">
                {t('feed.post.comments')}
              </AppText>
              {comments.isError ? (
                <AppText
                  accessibilityRole="alert"
                  variant="caption"
                  style={{ color: colors.danger }}
                >
                  {t('feed.post.commentsFailed')}
                </AppText>
              ) : null}
              {!comments.isLoading && !comments.isError && threads.length === 0 ? (
                <AppText tone="muted">{t('feed.post.commentsEmpty')}</AppText>
              ) : null}
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.thread}>
              {renderComment(item.comment, false)}
              {item.replies.map((reply) => renderComment(reply, true))}
            </View>
          )}
        />
        <View
          style={[
            styles.composer,
            {
              backgroundColor: colors.surface,
              borderColor: colors.rowBorder,
              paddingBottom: insets.bottom + space.md,
            },
          ]}
        >
          {replyTo ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('feed.post.cancelReply')}
              onPress={() => setReplyTo(null)}
              style={styles.replyBanner}
            >
              <AppText variant="meta" tone="muted" numberOfLines={1} style={styles.replyText}>
                {`${t('feed.post.replyingTo')} @${replyTo.handle}`}
              </AppText>
              <Feather name="x" size={16} color={colors.textMuted} />
            </Pressable>
          ) : null}
          {commentError ? (
            <AppText accessibilityRole="alert" variant="caption" style={{ color: colors.danger }}>
              {commentError}
            </AppText>
          ) : null}
          <TextField
            label={t('feed.post.commentLabel')}
            multiline
            maxLength={COMMENT_MAX_CHARS}
            value={draft}
            onChangeText={setDraft}
          />
          <Button
            label={t('feed.post.send')}
            disabled={draft.trim().length === 0 || addComment.isPending}
            onPress={() => whenReady(() => void sendComment())}
          />
        </View>
      </>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.top, { paddingTop: insets.top + space.sm }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('feed.post.back')}
          onPress={onBack}
          style={styles.back}
        >
          <Feather name="arrow-left" size={22} color={colors.text} />
        </Pressable>
      </View>
      {body}
      <ContentMenu
        target={menuTarget}
        onClose={() => setMenuTarget(null)}
        requireReady={whenReady}
        onEdit={() => {
          setMenuTarget(null);
          setEditing(true);
        }}
        onDeleted={(target) => {
          setMenuTarget(null);
          if (target.kind === 'post') onBack();
        }}
        onBlocked={() => {
          setMenuTarget(null);
          onBack();
        }}
      />
      {editing && postData ? (
        <EditPostSheet post={postData} onClose={() => setEditing(false)} />
      ) : null}
      <SignInToPostSheet
        visible={signInOpen}
        onClose={() => setSignInOpen(false)}
        onConfirmed={() => {
          setSignInOpen(false);
          void queryClient.invalidateQueries({ queryKey: feedKeys.all });
          onOpenProfileSetup();
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  top: { paddingHorizontal: space.screen },
  back: {
    width: touchTarget,
    height: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pad: { paddingHorizontal: space.screen },
  list: { paddingHorizontal: space.screen, paddingBottom: space.xl, gap: space.md },
  header: { gap: space.md },
  authorLink: { minHeight: touchTarget, justifyContent: 'center' },
  thread: { gap: space.sm },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card },
  message: { gap: space.md, padding: space.screen, alignItems: 'flex-start' },
  composer: {
    borderTopWidth: 1,
    paddingHorizontal: space.screen,
    paddingTop: space.md,
    gap: space.sm,
  },
  replyBanner: {
    minHeight: touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  replyText: { flex: 1 },
});
