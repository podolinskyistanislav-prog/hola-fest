import { Redirect, useRouter } from 'expo-router';

import { useSession } from '@/features/auth';
import { AcceptInviteArea } from '@/features/cabinet';

/** The invited user joins a venue team. Needs a real (non-guest) account. */
export default function AcceptInviteScreen() {
  const router = useRouter();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return <AcceptInviteArea onAccepted={() => router.replace('/cabinet')} />;
}
