import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { FeedScreenContent } from '@/features/feed';
import { useTheme } from '@/theme';

/** "Стрічка" tab. */
export default function FeedScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FeedScreenContent
        onOpenPost={(id) => router.push({ pathname: '/post/[id]', params: { id } })}
        onOpenProfileSetup={() => router.push('/profile-setup')}
      />
    </View>
  );
}
