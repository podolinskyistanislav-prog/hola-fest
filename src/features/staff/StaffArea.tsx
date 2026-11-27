import { useIsSuperadmin } from '@/features/applications/useApplications';
import { useSession, useStaffLogin } from '@/features/auth';
import { useCabinetVenue } from '@/features/cabinet';

import { StaffHome } from './StaffHome';
import { useStaffAccess } from './useStaffAccess';

type StaffAreaProps = {
  onOpenScanner: () => void;
  onOpenVenueEvents: () => void;
  onOpenApplications: () => void;
  onOpenModeration: () => void;
  onOpenCabinet: () => void;
  onOpenAcceptInvite: () => void;
  onSignedOut: () => void;
};

/** Staff home: menu items follow the memberships the server returns. */
export function StaffArea({
  onOpenScanner,
  onOpenVenueEvents,
  onOpenApplications,
  onOpenModeration,
  onOpenCabinet,
  onOpenAcceptInvite,
  onSignedOut,
}: StaffAreaProps) {
  const { access, isLoading, isError, retry } = useStaffAccess();
  const { venue: cabinetVenue } = useCabinetVenue();
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
      onOpenModeration={superadmin.data === true ? onOpenModeration : undefined}
      onOpenCabinet={cabinetVenue ? onOpenCabinet : undefined}
      onOpenAcceptInvite={access !== null && !access.canScan ? onOpenAcceptInvite : undefined}
      onSignOut={handleSignOut}
    />
  );
}
