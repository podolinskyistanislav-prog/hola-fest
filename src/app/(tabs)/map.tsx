import { View } from 'react-native';

import { VenuesMapScreenContent } from '@/features/venues';
import { useTheme } from '@/theme';

/** Map tab. Opening a venue is a stub until the venue page exists (#67). */
export default function MapScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <VenuesMapScreenContent onOpenVenue={() => undefined} />
    </View>
  );
}
