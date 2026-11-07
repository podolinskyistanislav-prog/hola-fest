import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { EventsScreenContent } from '@/features/events';
import { useTheme } from '@/theme';

/** Home tab. Long-press the header to open staff login. */
export default function EventsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <EventsScreenContent
        onOpenEvent={(id) => router.push({ pathname: '/event/[id]', params: { id } })}
        onOpenMap={() => router.navigate('/map')}
        onTitleLongPress={() => router.push('/staff-login')}
      />
    </View>
  );
}
