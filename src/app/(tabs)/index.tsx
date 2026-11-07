import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { EventsScreenContent } from '@/features/events';
import { useTheme } from '@/theme';

/** Events tab. Long-press the title to open staff login. */
export default function EventsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <EventsScreenContent
        onOpenEvent={(id) => router.push({ pathname: '/event/[id]', params: { id } })}
        onTitleLongPress={() => router.push('/staff-login')}
      />
    </View>
  );
}
