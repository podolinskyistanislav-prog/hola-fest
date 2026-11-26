import { Redirect, useLocalSearchParams } from 'expo-router';

import { useSession } from '@/features/auth';
import { OffersArea } from '@/features/offerBuilder';

/** Offer builder and the venue's offers. The server guards all data. */
export default function CabinetOffersScreen() {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return <OffersArea initialEventId={eventId} />;
}
