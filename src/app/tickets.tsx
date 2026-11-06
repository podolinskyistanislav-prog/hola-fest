import { useRouter, type Href } from 'expo-router';
import { View } from 'react-native';

import { MyTicketsContent } from '@/features/offers';
import { useTheme } from '@/theme';

/** «Мої квитки». */
export default function TicketsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <MyTicketsContent
        onOpenTicket={(offerId) => router.push(`/ticket/${offerId}` as Href)}
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
      />
    </View>
  );
}
