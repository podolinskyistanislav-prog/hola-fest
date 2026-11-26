import { Redirect, useLocalSearchParams } from 'expo-router';

/** The old offer form is replaced by the offer builder; the route stays so old links keep working. */
export default function StaffOfferFormScreen() {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();
  return <Redirect href={{ pathname: '/cabinet-offers', params: eventId ? { eventId } : {} }} />;
}
