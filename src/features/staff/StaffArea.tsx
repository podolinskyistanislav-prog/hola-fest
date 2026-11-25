import { useIsSuperadmin } from '@/features/applications/useApplications';
import { useSession, useStaffLogin } from '@/features/auth';

import { StaffHome } from './StaffHome';
import { useStaffAccess } from './useStaffAccess';

type StaffAreaProps = {
  onOpenScanner: () => void;
  onOpenVenueEvents: () => void;
  onOpenApplications: () => void;
  onSignedOut: () => void;
};

/** Staff home: menu items follow the memberships the server returns. */
export function StaffArea({
  onOpenScanner,
  onOpenVenueEvents,
  onOpenApplications,
  onSignedOut,
}: StaffAreaProps) {
  const { access, isLoading, isError, retry } = useStaffAccess();
  const { session } = useSession();
  const superadmin = useIsSuperadmin(session?.user.id);
  const { signOut, isLoading: isSigningOut, error } = useStaffLogin();

  async function handleSignOut() {
    if (await signOut()) onSignedOut();
  }

  return (
    <StaffHome
      access={access}
      isLoading={isLoading}
      isError={isError}
      isSigningOut={isSigningOut}
      signOutError={error}
      onRetry={retry}
      onOpenScanner={onOpenScanner}
      onOpenVenueEvents={onOpenVenueEvents}
      onOpenApplications={superadmin.data === true ? onOpenApplications : undefined}
      onSignOut={handleSignOut}
    />
  );
}
