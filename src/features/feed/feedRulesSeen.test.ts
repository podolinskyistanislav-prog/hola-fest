import { hasSeenFeedRules, markFeedRulesSeen } from './feedRulesSeen';

const mockStore = new Map<string, string>();
jest.mock('@/lib/secureStorage', () => ({
  readSecret: (key: string) => Promise.resolve(mockStore.get(key) ?? null),
  saveSecret: (key: string, value: string) => {
    mockStore.set(key, value);
    return Promise.resolve(true);
  },
}));

describe('feed rules seen flag', () => {
  beforeEach(() => mockStore.clear());

  it('is false until the rules were shown, then true', async () => {
    expect(await hasSeenFeedRules()).toBe(false);
    await markFeedRulesSeen();
    expect(await hasSeenFeedRules()).toBe(true);
  });
});
