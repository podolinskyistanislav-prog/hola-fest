import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { VenueScreenContent } from '@/features/venues';
import { useTheme } from '@/theme';

/** Venue page. */
export default function VenueScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <VenueScreenContent
        venueId={id}
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        onOpenEvent={(eventId) => router.push({ pathname: '/event/[id]', params: { id: eventId } })}
      />
    </View>
  );
}
