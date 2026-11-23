import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { DjsScreenContent } from '@/features/djs';
import { useTheme } from '@/theme';

/** "Діджеї" tab. */
export default function DjsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DjsScreenContent
        onOpenDj={(slug) => router.push({ pathname: '/dj/[slug]', params: { slug } })}
      />
    </View>
  );
}
