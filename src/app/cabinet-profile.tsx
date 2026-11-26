import { Redirect } from 'expo-router';

import { useSession } from '@/features/auth';
import { VenueProfileArea } from '@/features/cabinet';

/** Owner edits the public venue page. */
export default function CabinetProfileScreen() {
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return <VenueProfileArea />;
}
