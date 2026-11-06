import type { AdminVenue } from '@/types/admin';

import { getStaffAccess } from './staffAccess';

const venue = (role: AdminVenue['role']): AdminVenue => ({
  id: role,
  slug: role,
  name: role,
  isPublished: true,
  role,
});

describe('getStaffAccess', () => {
  it('gives nothing to someone without memberships', () => {
    expect(getStaffAccess([])).toEqual({ canScan: false, canManageEvents: false });
  });

  it('lets a host scan but not manage events', () => {
    expect(getStaffAccess([venue('host')])).toEqual({ canScan: true, canManageEvents: false });
  });

  it('lets an admin scan and manage events', () => {
    expect(getStaffAccess([venue('host'), venue('admin')])).toEqual({
      canScan: true,
      canManageEvents: true,
    });
  });
});
