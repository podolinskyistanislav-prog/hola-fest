import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { VenuesMapScreenContent } from '@/features/venues';
import { useTheme } from '@/theme';

/** Map tab. */
export default function MapScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <VenuesMapScreenContent
        onOpenVenue={(id) => router.push({ pathname: '/venue/[id]', params: { id } })}
        onOpenEvent={(id) => router.push({ pathname: '/event/[id]', params: { id } })}
      />
    </View>
  );
}
