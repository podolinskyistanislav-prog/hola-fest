import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { useSession } from '@/features/auth';
import { ModerationContent } from '@/features/moderation';
import { useTheme } from '@/theme';

/** Superadmin moderation queue of the feed. The server still guards every action. */
export default function StaffModerationScreen() {
  const { colors } = useTheme();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ModerationContent />
    </View>
  );
}
