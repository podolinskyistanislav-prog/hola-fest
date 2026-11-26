import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { ProfileScreenContent } from '@/features/profile';
import { useTheme } from '@/theme';

/** Own profile, reached from the Стрічка. */
export default function ProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ProfileScreenContent
        onOpenSetup={() => router.push('/profile-setup')}
        onOpenApply={() => router.push('/apply')}
        onOpenCabinet={() => router.push('/staff')}
        onOpenDjCabinet={() => router.push('/dj-cabinet')}
        onOpenReview={() => router.push('/staff-applications')}
      />
    </View>
  );
}
