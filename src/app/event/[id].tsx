import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { EventScreenContent } from '@/features/events';
import { useTheme } from '@/theme';

/** Event page. */
export default function EventScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <EventScreenContent
        eventId={id}
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        onOpenVenue={(venueId) => router.push({ pathname: '/venue/[id]', params: { id: venueId } })}
      />
    </View>
  );
}
