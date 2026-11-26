import { Redirect, useRouter } from 'expo-router';
import { View } from 'react-native';

import { useSession } from '@/features/auth';
import { DjCabinetScreenContent } from '@/features/djs';
import { useTheme } from '@/theme';

/** "Мій профіль діджея": edit, preview, publish and see own gigs. The server guards all data. */
export default function DjCabinetScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/profile" />;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DjCabinetScreenContent
        userId={session.user.id}
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/profile'))}
        onOpenEvent={(id) => router.push({ pathname: '/event/[id]', params: { id } })}
      />
    </View>
  );
}
