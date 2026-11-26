import { Feather } from '@expo/vector-icons';
import { useMemo, useState, type ReactNode } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, AuthorLabel, Button, DjAvatar, PostCard } from '@/components/ui';
import { SignInToPostSheet, useSession } from '@/features/auth';
import { useFeedAccess } from '@/features/profile';
import { t } from '@/lib/i18n';
import { radius, space, touchTarget, useTheme } from '@/theme';

import { ContentMenu, type MenuTarget } from './ContentMenu';
import { useAuthorPosts, useBlockAuthor, useFeedAuthor } from './usePostPage';
import { BlockConfirmSheet } from './BlockConfirmSheet';

export interface AuthorScreenContentProps {
  handle: string;
  onBack: () => void;
  onOpenPost: (postId: string) => void;
  onOpenProfileSetup: () => void;
}

const SKELETON_HEIGHT = 120;

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

/** Author page `/u/[handle]`: avatar, name, label, their posts and a block button. */
export function AuthorScreenContent({
  handle,
  onBack,
  onOpenPost,
  onOpenProfileSetup,
}: AuthorScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const userId = session?.user.id;
  const access = useFeedAccess();
  const author = useFeedAuthor(handle);
  const authorId = author.data?.id;
  const posts = useAuthorPosts(authorId);
  const block = useBlockAuthor();
  const [menuTarget, setMenuTarget] = useState<MenuTarget | null>(null);
  const [blockOpen, setBlockOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [blockFailed, setBlockFailed] = useState(false);
  const items = useMemo(
    () => (posts.data?.pages ?? []).flatMap((page) => page.posts),
    [posts.data],
  );

  function whenReady(action: () => void) {
    if (access === 'ready') action();
    else if (access === 'needs_email') setSignInOpen(true);
    else if (access === 'needs_profile') onOpenProfileSetup();
  }

  const profile = author.data;
  let body: ReactNode;
  if (author.isLoading) {
    body = (
      <View
        accessibilityLabel={t('feed.author.loading')}
        accessibilityRole="progressbar"
        style={styles.pad}
      >
        <View style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
      </View>
    );
  } else if (author.isError) {
    body = (
      <Message
        title={t('feed.errorTitle')}
        body={t('feed.errorBody')}
        action={<Button label={t('feed.retry')} onPress={() => void author.refetch()} />}
      />
    );
  } else if (!profile) {
    body = (
      <Message
        title={t('feed.author.unavailableTitle')}
        body={t('feed.author.unavailableBody')}
        action={<Button label={t('feed.author.back')} variant="glass" onPress={onBack} />}
      />
    );
  } else {
    body = (
      <FlatList
        data={items}
        keyExtractor={(post) => post.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (posts.hasNextPage && !posts.isFetchingNextPage) void posts.fetchNextPage();
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <DjAvatar name={profile.name} photoUri={profile.avatarUrl} />
            <View style={styles.nameLine}>
              <AppText variant="title" accessibilityRole="header">
                {profile.name}
              </AppText>
              {profile.label ? <AuthorLabel kind={profile.label} /> : null}
            </View>
            <AppText tone="muted">{`@${profile.handle}`}</AppText>
            {profile.id !== userId ? (
              <Button
                label={t('feed.author.block')}
                variant="glass"
                onPress={() => whenReady(() => setBlockOpen(true))}
              />
            ) : null}
            {blockFailed ? (
              <AppText accessibilityRole="alert" variant="caption" style={{ color: colors.danger }}>
                {t('feed.menu.failed')}
              </AppText>
            ) : null}
            <AppText variant="heading" accessibilityRole="header">
              {t('feed.author.posts')}
            </AppText>
            {posts.isError ? (
              <AppText accessibilityRole="alert" variant="caption" style={{ color: colors.danger }}>
                {t('feed.errorBody')}
              </AppText>
            ) : null}
            {!posts.isLoading && !posts.isError && items.length === 0 ? (
              <AppText tone="muted">{t('feed.author.postsEmpty')}</AppText>
            ) : null}
          </View>
        }
        ListFooterComponent={
          posts.isFetchingNextPage ? (
            <ActivityIndicator accessibilityLabel={t('feed.loadingMore')} color={colors.accent} />
          ) : undefined
        }
        renderItem={({ item }) => (
          <Pressable accessibilityRole="button" onPress={() => onOpenPost(item.id)}>
            <PostCard
              authorName={item.authorName}
              handle={item.handle}
              avatarUri={item.avatarUrl}
              authorKind={item.label ?? undefined}
              createdAt={new Date(item.createdAt)}
              text={item.body}
              photoUris={item.imageUrls}
              likeCount={item.likeCount}
              commentCount={item.commentCount}
              liked={item.likedByMe}
              onPressComment={() => onOpenPost(item.id)}
              onPressMenu={() =>
                setMenuTarget({
                  kind: 'post',
                  id: item.id,
                  authorId: item.authorId,
                  own: item.authorId === userId,
                })
              }
            />
          </Pressable>
        )}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.top, { paddingTop: insets.top + space.sm }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('feed.author.back')}
          onPress={onBack}
          style={styles.back}
        >
          <Feather name="arrow-left" size={22} color={colors.text} />
        </Pressable>
      </View>
      {body}
      <BlockConfirmSheet
        visible={blockOpen}
        onClose={() => setBlockOpen(false)}
        onConfirm={() => {
          setBlockOpen(false);
          if (!profile) return;
          setBlockFailed(false);
          block.mutate(profile.id, {
            onSuccess: onBack,
            onError: () => setBlockFailed(true),
          });
        }}
      />
      <ContentMenu
        target={menuTarget}
        onClose={() => setMenuTarget(null)}
        requireReady={whenReady}
        onEdit={(target) => {
          setMenuTarget(null);
          onOpenPost(target.id);
        }}
        onDeleted={() => setMenuTarget(null)}
        onBlocked={() => {
          setMenuTarget(null);
          onBack();
        }}
      />
      <SignInToPostSheet
        visible={signInOpen}
        onClose={() => setSignInOpen(false)}
        onConfirmed={() => {
          setSignInOpen(false);
          onOpenProfileSetup();
        }}
      />
    </View>
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
  header: { gap: space.md, alignItems: 'flex-start' },
  nameLine: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card },
  message: { gap: space.md, padding: space.screen, alignItems: 'flex-start' },
});
