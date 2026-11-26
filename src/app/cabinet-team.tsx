import { Redirect } from 'expo-router';

import { useSession } from '@/features/auth';
import { TeamArea } from '@/features/cabinet';

/** Owner manages the venue team and invites. */
export default function CabinetTeamScreen() {
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return <TeamArea />;
}
