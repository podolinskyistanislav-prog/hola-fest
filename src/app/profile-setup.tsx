import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { ProfileSetupScreenContent } from '@/features/profile';
import { useTheme } from '@/theme';

/** Name, @handle and avatar for a confirmed account. */
export default function ProfileSetupScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ProfileSetupScreenContent onDone={() => router.replace('/profile')} />
    </View>
  );
}
