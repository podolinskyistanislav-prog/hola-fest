import { useRouter, type Href } from 'expo-router';
import { View } from 'react-native';

import { MyTicketsContent } from '@/features/offers';
import { useTheme } from '@/theme';

/** «Мої QR» tab: the guest's claimed offers. The URL stays `/tickets` (the group adds no segment). */
export default function TicketsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <MyTicketsContent
        onOpenTicket={(offerId) => router.push(`/ticket/${offerId}` as Href)}
        onOpenEvents={() => router.navigate('/')}
      />
    </View>
  );
}
