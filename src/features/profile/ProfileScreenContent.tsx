import { useState, type ReactNode } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, DjAvatar } from '@/components/ui';
import { SignInToPostSheet, useSession, useStaffLogin } from '@/features/auth';
import { t } from '@/lib/i18n';
import { feedImageUrl, type MyPost } from '@/services/profile';
import { radius, space, useTheme } from '@/theme';

import { useMyPosts, useMyProfile } from './useProfile';

export interface ProfileScreenContentProps {
  onOpenSetup: () => void;
}

function PostRow({ post }: { post: MyPost }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.post, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <AppText numberOfLines={4}>{post.body}</AppText>
    </View>
  );
}

/** Own profile reached from the Стрічка: avatar, name, @handle, my posts and sign out. */
export function ProfileScreenContent({ onOpenSetup }: ProfileScreenContentProps) {
  const insets = useSafeAreaInsets();
  const { session, isAnonymous, isLoading } = useSession();
  const userId = session?.user.id;
  const profile = useMyProfile(isAnonymous ? undefined : userId);
  const posts = useMyPosts(isAnonymous ? undefined : userId);
  const { signOut, isLoading: isSigningOut, error: signOutError } = useStaffLogin();
  const [sheetOpen, setSheetOpen] = useState(false);

  const container = [styles.container, { paddingTop: insets.top + space.lg }];

  if (isLoading || (!isAnonymous && profile.isPending)) {
    return (
      <View style={container}>
        <AppText tone="muted" accessibilityRole="progressbar">
          {t('profile.title')}
        </AppText>
      </View>
    );
  }

  if (isAnonymous) {
    return (
      <View style={container}>
        <AppText variant="title" accessibilityRole="header">
          {t('profile.title')}
        </AppText>
        <AppText tone="muted">{t('profile.guestHint')}</AppText>
        <Button label={t('profile.confirmEmail')} onPress={() => setSheetOpen(true)} />
        <SignInToPostSheet
          visible={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onConfirmed={() => {
            setSheetOpen(false);
            onOpenSetup();
          }}
        />
      </View>
    );
  }

  if (profile.isError) {
    return (
      <View style={container}>
        <AppText variant="heading" accessibilityRole="header">
          {t('profile.loadError')}
        </AppText>
        <Button label={t('profile.retry')} onPress={() => profile.refetch()} />
      </View>
    );
  }

  const data = profile.data;
  const hasIdentity = Boolean(data?.displayName && data.handle);

  let postsBody: ReactNode;
  if (posts.isError) {
    postsBody = <AppText tone="muted">{t('profile.postsError')}</AppText>;
  } else if (!posts.isPending && (posts.data ?? []).length === 0) {
    postsBody = <AppText tone="muted">{t('profile.noPosts')}</AppText>;
  }

  const header = (
    <View style={styles.header}>
      <View style={styles.identity}>
        <DjAvatar
          name={data?.displayName ?? '?'}
          photoUri={data?.avatarPath ? feedImageUrl(data.avatarPath) : null}
          size={96}
        />
        {hasIdentity ? (
          <View style={styles.names}>
            <AppText variant="heading" accessibilityRole="header">
              {data?.displayName}
            </AppText>
            <AppText tone="muted">{`@${data?.handle}`}</AppText>
          </View>
        ) : null}
      </View>
      {hasIdentity ? null : <Button label={t('profile.setup')} onPress={onOpenSetup} />}
      <AppText variant="heading" accessibilityRole="header">
        {t('profile.myPosts')}
      </AppText>
      {postsBody}
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={[container, { paddingBottom: insets.bottom + space.xxl }]}
      data={posts.data ?? []}
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => <PostRow post={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={header}
      ListFooterComponent={
        <View style={styles.footer}>
          {signOutError ? (
            <AppText variant="caption" accessibilityRole="alert">
              {t('profile.signOutFailed')}
            </AppText>
          ) : null}
          <Button
            variant="glass"
            label={isSigningOut ? t('profile.signingOut') : t('profile.signOut')}
            onPress={signOut}
            disabled={isSigningOut}
            accessibilityState={{ disabled: isSigningOut, busy: isSigningOut }}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  container: { padding: space.screen, gap: space.lg },
  header: { gap: space.lg, marginBottom: space.lg },
  identity: { flexDirection: 'row', alignItems: 'center', gap: space.lg },
  names: { flex: 1, gap: space.xs },
  post: { borderWidth: StyleSheet.hairlineWidth, borderRadius: radius.card, padding: space.lg },
  separator: { height: space.sm },
  footer: { marginTop: space.xl, gap: space.md },
});
