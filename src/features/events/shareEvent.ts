import { createURL } from 'expo-linking';
import { Share } from 'react-native';

/** Deep link to the event page, e.g. `holafest:///event/e1`. */
export function eventLink(eventId: string): string {
  return createURL(`/event/${encodeURIComponent(eventId)}`);
}

/** Opens the native share sheet with the event title and link. */
export async function shareEvent(eventId: string, title: string): Promise<void> {
  const url = eventLink(eventId);
  await Share.share({ message: `${title}\n${url}`, url });
}
