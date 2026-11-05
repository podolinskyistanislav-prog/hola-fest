import { FlatList, StyleSheet, View } from 'react-native';

import { VenuePreviewCard } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space } from '@/theme';

import type { VenueMapProps } from './VenueMap';

function Separator() {
  return <View style={styles.separator} />;
}

/** Web has no map: the same venues as a simple list. Tapping a card opens the venue. */
export function VenueMap({ venues, onOpenVenue, bottomInset }: VenueMapProps) {
  return (
    <FlatList
      data={venues}
      keyExtractor={(venue) => venue.id}
      contentContainerStyle={[styles.list, { paddingBottom: bottomInset }]}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <VenuePreviewCard
          name={item.name}
          shelterBadge={item.hasShelter ? t('venues.shelter') : undefined}
          onPress={() => onOpenVenue(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: space.screen, paddingTop: 96 },
  separator: { height: space.md },
});
