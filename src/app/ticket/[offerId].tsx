import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { TicketScreenContent } from '@/features/offers';
import { goBackOr } from '@/lib/goBackOr';
import { useTheme } from '@/theme';

/** One ticket with its QR. Works without signal. */
export default function TicketScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { offerId } = useLocalSearchParams<{ offerId: string }>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TicketScreenContent offerId={offerId} onBack={() => goBackOr(router, '/tickets')} />
    </View>
  );
}
