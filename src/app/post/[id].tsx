import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { PostScreenContent } from '@/features/feed';
import { useTheme } from '@/theme';

/** Post page with comments. */
export default function PostScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <PostScreenContent
        postId={id}
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/feed'))}
        onOpenAuthor={(handle) => router.push({ pathname: '/u/[handle]', params: { handle } })}
        onOpenProfileSetup={() => router.push('/profile-setup')}
      />
    </View>
  );
}
