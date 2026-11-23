import { StyleSheet, View } from 'react-native';

import { MapPin } from '@/components/ui';
import { space, useTheme } from '@/theme';

import type { VenueMapProps } from './VenueMap';
import { VenueMapCard } from './VenueMapCard';
import { projectToSurface, venueAccent } from './venueMap';

const GRID_LINES = [0.25, 0.5, 0.75];

/**
 * Web has no native map: a styled map surface with the same pins and the same single glass card.
 * Pin positions are projected from the venue coordinates over the Kyiv region.
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
  const { colors } = useTheme();
  const selected = venues.find((venue) => venue.id === selectedId);

  return (
    <View style={[styles.fill, { backgroundColor: colors.surfaceRaised }]}>
      {GRID_LINES.map((fraction) => (
        <View
          key={`h${fraction}`}
          style={[
            styles.line,
            styles.horizontal,
            { top: `${fraction * 100}%`, backgroundColor: colors.border },
          ]}
        />
      ))}
      {GRID_LINES.map((fraction) => (
        <View
          key={`v${fraction}`}
          style={[
            styles.line,
            styles.vertical,
            { left: `${fraction * 100}%`, backgroundColor: colors.border },
          ]}
        />
      ))}
      {venues.map((venue) => {
        const { x, y } = projectToSurface(venue);
        return (
          <View key={venue.id} style={[styles.anchor, { left: `${x * 100}%`, top: `${y * 100}%` }]}>
            <MapPin
              label={venue.name}
              color={venueAccent(venue.slug)}
              selected={venue.id === selectedId}
              onPress={() => onSelectVenue(venue.id === selectedId ? null : venue.id)}
            />
          </View>
        );
      })}
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
  fill: { flex: 1, overflow: 'hidden' },
  line: { position: 'absolute', opacity: 0.5 },
  horizontal: { left: 0, right: 0, height: StyleSheet.hairlineWidth },
  vertical: { top: 0, bottom: 0, width: StyleSheet.hairlineWidth },
  /** Zero-width box on the venue point: the pin centres on it and overflows both sides. */
  anchor: { position: 'absolute', width: 0, alignItems: 'center' },
  card: { position: 'absolute', left: space.screen, right: space.screen },
});
