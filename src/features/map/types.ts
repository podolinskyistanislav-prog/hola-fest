import type { MappableVenue } from '@/features/venues/venueMap';

export interface VenueMapProps {
  venues: readonly MappableVenue[];
  selectedId: string | null;
  /** A pin was tapped (venue id), or the empty map was tapped (`null`). */
  onSelect: (id: string | null) => void;
  /** The empty map was tapped at this point (used to drop a pin when applying). */
  onMapPress?: (point: { lat: number; lng: number }) => void;
  /** Pan, zoom and tap pins. When false the map is a static picture. */
  interactive?: boolean;
  /** Small, non-scrolling preview (the club page): no zoom buttons, framed on its venues. */
  compact?: boolean;
}
