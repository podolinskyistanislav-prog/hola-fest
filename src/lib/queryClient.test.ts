import { createQueryClient } from './queryClient';

describe('createQueryClient', () => {
  it('uses a one minute stale time and two retries', () => {
    const options = createQueryClient().getDefaultOptions().queries;
    expect(options?.staleTime).toBe(60_000);
    expect(options?.retry).toBe(2);
  });

  it('returns an independent client each call', () => {
    expect(createQueryClient()).not.toBe(createQueryClient());
  });
});
