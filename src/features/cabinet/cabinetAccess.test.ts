import { canUseCabinet, isValidInstagramUrl, pickCabinetVenue } from './cabinetAccess';

const owner = { id: 'o', name: 'O', role: 'owner' as const };
const admin = { id: 'a', name: 'A', role: 'admin' as const };
const host = { id: 'h', name: 'H', role: 'host' as const };

describe('cabinet access', () => {
  it('lets owners and admins in, not hosts', () => {
    expect(canUseCabinet([owner])).toBe(true);
    expect(canUseCabinet([host, admin])).toBe(true);
    expect(canUseCabinet([host])).toBe(false);
    expect(canUseCabinet([])).toBe(false);
  });

  it('prefers an owned venue, then an administered one', () => {
    expect(pickCabinetVenue([admin, owner])).toBe(owner);
    expect(pickCabinetVenue([host, admin])).toBe(admin);
    expect(pickCabinetVenue([host])).toBeNull();
  });

  it('accepts only https instagram links or empty', () => {
    expect(isValidInstagramUrl('')).toBe(true);
    expect(isValidInstagramUrl('https://instagram.com/club')).toBe(true);
    expect(isValidInstagramUrl('http://instagram.com/club')).toBe(false);
    expect(isValidInstagramUrl('https://evil.example/club')).toBe(false);
  });
});
