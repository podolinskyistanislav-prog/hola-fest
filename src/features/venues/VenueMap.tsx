import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { MapPin } from '@/components/ui';
import { space, useTheme } from '@/theme';

import { darkMapStyle } from './mapStyle';
import { VenueMapCard } from './VenueMapCard';
import { KYIV_REGION, venueAccent, type MappableVenue } from './venueMap';
import type { EventSummary } from '@/types/events';

export interface VenueMapProps {
  venues: readonly MappableVenue[];
  selectedId: string | null;
  /** Each venue's event tonight, by venue id. */
  todayEvents: ReadonlyMap<string, EventSummary>;
  onSelectVenue: (id: string | null) => void;
  onOpenVenue: (id: string) => void;
  onOpenEvent: (id: string) => void;
  /** Space the floating tab bar takes at the bottom, so the card sits above it. */
  bottomInset: number;
}

/**
 * Native map (Apple Maps on iOS, Google Maps on Android). The web twin is `VenueMap.web.tsx`;
 * this pair is the only place the platforms differ.
 */
export function VenueMap({
  venues,
  selectedId,
  todayEvents,
  onSelectVenue,
  onOpenVenue,
  onOpenEvent,
  bottomInset,
}: VenueMapProps) {
  const { scheme, colors } = useTheme();
  const selected = venues.find((venue) => venue.id === selectedId);

  return (
    <View style={styles.fill}>
      <MapView
        style={styles.fill}
        initialRegion={KYIV_REGION}
        userInterfaceStyle={scheme}
        customMapStyle={scheme === 'dark' ? darkMapStyle(colors) : undefined}
        onPress={() => onSelectVenue(null)}
      >
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            coordinate={{ latitude: venue.lat, longitude: venue.lng }}
            onPress={(event) => {
              event.stopPropagation();
              onSelectVenue(venue.id);
            }}
          >
            <MapPin
              label={venue.name}
              color={venueAccent(venue.slug)}
              selected={venue.id === selectedId}
            />
          </Marker>
        ))}
      </MapView>
      {selected ? (
        <View style={[styles.card, { bottom: bottomInset }]}>
          <VenueMapCard
            venue={selected}
            todayEvent={todayEvents.get(selected.id)}
            onOpenVenue={onOpenVenue}
            onOpenEvent={onOpenEvent}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  card: { position: 'absolute', left: space.screen, right: space.screen },
});
