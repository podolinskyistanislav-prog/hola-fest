import { Redirect, useRouter } from 'expo-router';

import { useSession } from '@/features/auth';
import { CabinetArea } from '@/features/cabinet';

/** "Мій заклад": dashboard of the venue I own or administer. The server guards all data. */
export default function CabinetScreen() {
  const router = useRouter();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return (
    <CabinetArea
      onOpenProfile={() => router.push('/cabinet-profile')}
      onOpenTeam={() => router.push('/cabinet-team')}
      onOpenEvents={() => router.push('/staff-events')}
      onOpenOffers={() => router.push('/cabinet-offers')}
      onOpenScanner={() => router.push('/scanner')}
    />
  );
}
