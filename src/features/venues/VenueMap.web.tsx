import { FlatList, StyleSheet, View } from 'react-native';

import { space } from '@/theme';

import type { VenueMapProps } from './VenueMap';
import { VenueMapCard } from './VenueMapCard';

function Separator() {
  return <View style={styles.separator} />;
}

/** Web has no map: the same venue cards as a list. */
export function VenueMap({
  venues,
  todayEvents,
  onOpenVenue,
  onOpenEvent,
  bottomInset,
}: VenueMapProps) {
  return (
    <FlatList
      data={venues}
      keyExtractor={(venue) => venue.id}
      contentContainerStyle={[styles.list, { paddingBottom: bottomInset }]}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <VenueMapCard
          venue={item}
          todayEvent={todayEvents.get(item.id)}
          onOpenVenue={onOpenVenue}
          onOpenEvent={onOpenEvent}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: space.screen, paddingTop: 132 },
  separator: { height: space.md },
});
