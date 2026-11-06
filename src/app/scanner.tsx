import { Redirect, useRouter } from 'expo-router';

import { useSession } from '@/features/auth';
import { ScannerScreenContent } from '@/features/host';

/** Host scanner. Only signed-in staff see it; the server still checks every redemption. */
export default function ScannerScreen() {
  const router = useRouter();
  const { session, isAnonymous } = useSession();

  if (!session || isAnonymous) return <Redirect href="/staff-login" />;
  return (
    <ScannerScreenContent
      onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
    />
  );
}
