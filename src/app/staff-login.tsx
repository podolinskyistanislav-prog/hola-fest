import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { StaffLoginForm } from '@/features/auth';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

export default function StaffLogin() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="title" accessibilityRole="header">
        {t('auth.staffLoginTitle')}
      </AppText>
      <StaffLoginForm onSignedIn={() => router.replace('/staff')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.xl, justifyContent: 'center' },
});
