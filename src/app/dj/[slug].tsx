import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { DjScreenContent } from '@/features/djs';
import { useTheme } from '@/theme';

/** DJ page. */
export default function DjScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DjScreenContent
        slug={slug}
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/djs'))}
        onOpenEvent={(id) => router.push({ pathname: '/event/[id]', params: { id } })}
      />
    </View>
  );
}
