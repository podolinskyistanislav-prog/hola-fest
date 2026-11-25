import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { ApplicationsReviewContent } from '@/features/applications';
import { useSession } from '@/features/auth';
import { useTheme } from '@/theme';

/** Superadmin queue of account applications. The server still guards every decision. */
export default function StaffApplicationsScreen() {
  const { colors } = useTheme();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ApplicationsReviewContent />
    </View>
  );
}
