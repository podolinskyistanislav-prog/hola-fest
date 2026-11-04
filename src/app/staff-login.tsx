import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { authStrings, StaffLoginForm } from '@/features/auth';
import { space, useTheme } from '@/theme';

export default function StaffLogin() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="title" accessibilityRole="header">
        {authStrings.staffLoginTitle}
      </AppText>
      <StaffLoginForm onSignedIn={() => router.back()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.xl, justifyContent: 'center' },
});
