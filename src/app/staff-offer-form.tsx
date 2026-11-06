import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';

import { useSession } from '@/features/auth';
import { OfferFormArea } from '@/features/staff';

/** Create (no id) or edit (?id=) an offer of the event ?eventId=. The server still guards all data. */
export default function StaffOfferFormScreen() {
  const router = useRouter();
  const { eventId, id } = useLocalSearchParams<{ eventId?: string; id?: string }>();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  if (!eventId) return <Redirect href="/staff-events" />;
  return <OfferFormArea eventId={eventId} offerId={id} onSaved={() => router.back()} />;
}
