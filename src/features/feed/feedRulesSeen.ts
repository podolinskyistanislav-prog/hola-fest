import { readSecret, saveSecret } from '@/lib/secureStorage';

const KEY = 'feed-rules-seen';

/** Whether this device already showed the Feed rules before a first post. */
export async function hasSeenFeedRules(): Promise<boolean> {
  return (await readSecret(KEY)) === '1';
}

export async function markFeedRulesSeen(): Promise<void> {
  await saveSecret(KEY, '1');
}
