import { Redirect, useRouter } from 'expo-router';

import { useSession } from '@/features/auth';
import { VenueEventsArea } from '@/features/staff';

/** Events of my venue. Guests are sent to the login; the server still guards all data. */
export default function StaffEventsScreen() {
  const router = useRouter();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return (
    <VenueEventsArea
      onCreate={() => router.push('/staff-event-form')}
      onOpenEvent={(id) => router.push({ pathname: '/staff-event-form', params: { id } })}
    />
  );
}
