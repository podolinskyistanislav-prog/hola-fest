import { Feather } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, type ReactNode } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, PostCard, tabBarInset } from '@/components/ui';
import { SignInToPostSheet, useSession } from '@/features/auth';
import { useFeedAccess } from '@/features/profile';
import { t } from '@/lib/i18n';
import type { FeedPost } from '@/services/feed';
import { brand, radius, shadowInk, space, touchTarget, useTheme } from '@/theme';

import { FeedComposerFlow } from './FeedComposerFlow';
import { feedKeys } from './feedKeys';
import { sharePost } from './sharePost';
import { useFeedPosts, useToggleLike } from './useFeed';

export interface FeedScreenContentProps {
  onOpenPost: (postId: string) => void;
  onOpenProfileSetup: () => void;
}

const SKELETON_ROWS = 3;
const SKELETON_HEIGHT = 168;
const FAB_SIZE = 56;

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

/** The "Стрічка" tab: one shared stream with likes, a composer and sharing. */
export function FeedScreenContent({ onOpenPost, onOpenProfileSetup }: FeedScreenContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { session } = useSession();
  const access = useFeedAccess();
  const feed = useFeedPosts();
  const toggleLike = useToggleLike(session?.user.id);
  const [signInOpen, setSignInOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const posts = useMemo(() => (feed.data?.pages ?? []).flatMap((page) => page.posts), [feed.data]);

  /** Runs the action for a ready account; otherwise starts the sign-in or profile step. */
  function whenReady(action: () => void) {
    if (access === 'ready') action();
    else if (access === 'needs_email') setSignInOpen(true);
    else if (access === 'needs_profile') onOpenProfileSetup();
  }

  async function refresh() {
    setRefreshing(true);
    await feed.refetch();
    setRefreshing(false);
  }

  function like(post: FeedPost) {
    whenReady(() => toggleLike.mutate({ postId: post.id, liked: !post.likedByMe }));
  }

  let body: ReactNode;
  if (feed.isLoading) {
    body = (
      <View
        accessibilityLabel={t('feed.loading')}
        accessibilityRole="progressbar"
        style={styles.skeletons}
      >
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <View key={index} style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
        ))}
      </View>
    );
  } else if (feed.isError && posts.length === 0) {
    body = (
      <Message
        title={t('feed.errorTitle')}
        body={t('feed.errorBody')}
        action={<Button label={t('feed.retry')} onPress={() => void feed.refetch()} />}
      />
    );
  } else if (posts.length === 0) {
    body = <Message title={t('feed.emptyTitle')} body={t('feed.emptyBody')} />;
  } else {
    body = (
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: tabBarInset(insets.bottom) + FAB_SIZE },
        ]}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => void refresh()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (feed.hasNextPage && !feed.isFetchingNextPage) void feed.fetchNextPage();
        }}
        ListHeaderComponent={
          toggleLike.isError ? (
            <AppText accessibilityRole="alert" variant="caption" style={{ color: colors.danger }}>
              {t('feed.likeFailed')}
            </AppText>
          ) : undefined
        }
        ListFooterComponent={
          feed.isFetchingNextPage ? (
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
              onPressLike={() => like(item)}
              onPressComment={() => onOpenPost(item.id)}
              onPressShare={() => void sharePost(item.id, t('feed.shareMessage'))}
            />
          </Pressable>
        )}
      />
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top + space.md }]}>
      <AppText variant="title" accessibilityRole="header" style={styles.title}>
        {t('feed.title')}
      </AppText>
      {body}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('feed.write')}
        onPress={() => whenReady(() => setComposeOpen(true))}
        style={[styles.fab, { bottom: tabBarInset(insets.bottom) }]}
      >
        <Feather name="plus" size={26} color={brand.onAccent} />
      </Pressable>
      <SignInToPostSheet
        visible={signInOpen}
        onClose={() => setSignInOpen(false)}
        onConfirmed={() => {
          setSignInOpen(false);
          void queryClient.invalidateQueries({ queryKey: feedKeys.all });
          onOpenProfileSetup();
        }}
      />
      {composeOpen ? (
        <FeedComposerFlow userId={session?.user.id} onClose={() => setComposeOpen(false)} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  title: { paddingHorizontal: space.screen, paddingBottom: space.md },
  list: { paddingHorizontal: space.screen, gap: space.md },
  skeletons: { paddingHorizontal: space.screen, gap: space.md },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card },
  message: { gap: space.md, padding: space.screen, alignItems: 'flex-start' },
  fab: {
    position: 'absolute',
    right: space.screen,
    width: Math.max(FAB_SIZE, touchTarget),
    height: Math.max(FAB_SIZE, touchTarget),
    borderRadius: radius.pill,
    backgroundColor: brand.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: shadowInk,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
