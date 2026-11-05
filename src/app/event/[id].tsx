import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { EventScreenContent } from '@/features/events';
import { useTheme } from '@/theme';

/** Event page. The venue link is a stub until the venue page exists (milestone 4). */
export default function EventScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <EventScreenContent
        eventId={id}
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        onOpenVenue={() => undefined}
      />
    </View>
  );
}
