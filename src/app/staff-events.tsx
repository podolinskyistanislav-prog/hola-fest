import { Redirect } from 'expo-router';

import { useSession } from '@/features/auth';
import { VenueEventsArea } from '@/features/staff';

/** Events of my venue. Guests are sent to the login; the server still guards all data. */
export default function StaffEventsScreen() {
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return <VenueEventsArea />;
}
