import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { AuthorScreenContent } from '@/features/feed';
import { useTheme } from '@/theme';

/** Author page: profile header and the author's posts. */
export default function AuthorScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { handle } = useLocalSearchParams<{ handle: string }>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AuthorScreenContent
        handle={handle}
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/feed'))}
        onOpenPost={(id) => router.push({ pathname: '/post/[id]', params: { id } })}
        onOpenProfileSetup={() => router.push('/profile-setup')}
      />
    </View>
  );
}
