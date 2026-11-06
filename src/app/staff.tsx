import { Redirect, useRouter } from 'expo-router';

import { useSession } from '@/features/auth';
import { StaffArea } from '@/features/staff';

/** Staff home. Guests are sent to the login; the server still guards all data. */
export default function StaffScreen() {
  const router = useRouter();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return (
    <StaffArea
      onOpenScanner={() => router.push('/scanner')}
      onOpenVenueEvents={() => router.push('/staff-events')}
      onSignedOut={() => router.replace('/')}
    />
  );
}
