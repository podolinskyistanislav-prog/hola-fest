import type { MappableVenue } from '@/features/venues/venueMap';

export interface VenueMapProps {
  venues: readonly MappableVenue[];
  selectedId: string | null;
  /** A pin was tapped (venue id), or the empty map was tapped (`null`). */
  onSelect: (id: string | null) => void;
  /** Pan, zoom and tap pins. When false the map is a static picture. */
  interactive?: boolean;
  /** Small, non-scrolling preview (the club page): no zoom buttons, framed on its venues. */
  compact?: boolean;
}
