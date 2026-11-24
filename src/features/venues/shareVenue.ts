import { createURL } from 'expo-linking';
import { Share } from 'react-native';

/** Deep link to the club page, e.g. `holafest:///venue/v1`. */
export function venueLink(venueId: string): string {
  return createURL(`/venue/${encodeURIComponent(venueId)}`);
}

/** Opens the native share sheet with the club name and link. */
export async function shareVenue(venueId: string, name: string): Promise<void> {
  const url = venueLink(venueId);
  await Share.share({ message: `${name}\n${url}`, url });
}
