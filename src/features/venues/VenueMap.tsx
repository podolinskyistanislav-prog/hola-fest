import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { MapPin, VenuePreviewCard } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

import { KYIV_REGION, type MappableVenue } from './venueMap';

export interface VenueMapProps {
  venues: readonly MappableVenue[];
  selectedId: string | null;
  onSelectVenue: (id: string | null) => void;
  onOpenVenue: (id: string) => void;
  /** Space the floating tab bar takes at the bottom, so the preview card sits above it. */
  bottomInset: number;
}

/**
 * Native map (Apple Maps on iOS, Google Maps on Android). The web twin is `VenueMap.web.tsx`;
 * this pair is the only place the platforms differ.
 */
export function VenueMap({
  venues,
  selectedId,
  onSelectVenue,
  onOpenVenue,
  bottomInset,
}: VenueMapProps) {
  const { scheme } = useTheme();
  const selected = venues.find((venue) => venue.id === selectedId);

  return (
    <View style={styles.fill}>
      <MapView
        style={styles.fill}
        initialRegion={KYIV_REGION}
        userInterfaceStyle={scheme}
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
            <MapPin label={venue.name} selected={venue.id === selectedId} />
          </Marker>
        ))}
      </MapView>
      {selected ? (
        <View style={[styles.card, { bottom: bottomInset }]}>
          <VenuePreviewCard
            name={selected.name}
            shelterBadge={selected.hasShelter ? t('venues.shelter') : undefined}
            onPress={() => onOpenVenue(selected.id)}
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
