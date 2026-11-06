import { readSecret, saveSecret } from '@/lib/secureStorage';

import { getClaimToken, rememberClaimToken } from './claimedTokens';

jest.mock('@/lib/secureStorage', () => ({ saveSecret: jest.fn(), readSecret: jest.fn() }));

const mockSave = saveSecret as jest.Mock;
const mockRead = readSecret as jest.Mock;

beforeEach(() => jest.resetAllMocks());

describe('claimedTokens', () => {
  it('stores the token in secure storage under a safe per-offer key', async () => {
    mockSave.mockResolvedValue(true);
    await expect(rememberClaimToken('a/b c', 'tok')).resolves.toBe(true);
    expect(mockSave).toHaveBeenCalledWith('claim-token.a_b_c', 'tok');
  });

  it('reads the token remembered for an offer', async () => {
    mockRead.mockResolvedValue('tok');
    await expect(getClaimToken('o1')).resolves.toBe('tok');
    expect(mockRead).toHaveBeenCalledWith('claim-token.o1');
  });

  it('returns null for an offer that was not claimed on this device', async () => {
    mockRead.mockResolvedValue(null);
    await expect(getClaimToken('other')).resolves.toBeNull();
  });
});
