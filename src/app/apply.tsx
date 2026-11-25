import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { ApplicationScreenContent } from '@/features/applications';
import { useTheme } from '@/theme';

/** Choose account type (venue or DJ), apply, and follow the decision. */
export default function ApplyScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ApplicationScreenContent onDone={() => router.replace('/profile')} />
    </View>
  );
}
