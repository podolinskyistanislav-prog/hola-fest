import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';

import { useSession } from '@/features/auth';
import { EventFormArea } from '@/features/staff';

/** Create (no id) or edit (?id=) an event. Guests go to the login; the server still guards all data. */
export default function StaffEventFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return (
    <EventFormArea
      eventId={id}
      onSaved={() => router.back()}
      onCreateOffer={(eventId) =>
        router.push({ pathname: '/staff-offer-form', params: { eventId } })
      }
      onOpenOffer={(eventId, offerId) =>
        router.push({ pathname: '/staff-offer-form', params: { eventId, id: offerId } })
      }
    />
  );
}
