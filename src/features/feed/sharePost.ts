import { createURL } from 'expo-linking';
import { Share } from 'react-native';

/** Deep link to the post page, e.g. `holafest:///post/p1`. */
export function postLink(postId: string): string {
  return createURL(`/post/${encodeURIComponent(postId)}`);
}

/** Opens the native share sheet with a link to the post. */
export async function sharePost(postId: string, message: string): Promise<void> {
  const url = postLink(postId);
  await Share.share({ message: `${message}\n${url}`, url });
}
