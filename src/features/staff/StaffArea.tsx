import { useStaffLogin } from '@/features/auth';

import { StaffHome } from './StaffHome';
import { useStaffAccess } from './useStaffAccess';

type StaffAreaProps = {
  onOpenScanner: () => void;
  onOpenVenueEvents: () => void;
  onSignedOut: () => void;
};

/** Staff home: menu items follow the memberships the server returns. */
export function StaffArea({ onOpenScanner, onOpenVenueEvents, onSignedOut }: StaffAreaProps) {
  const { access, isLoading, isError, retry } = useStaffAccess();
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
      onSignOut={handleSignOut}
    />
  );
}
