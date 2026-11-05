import { Pressable, StyleSheet, View } from 'react-native';

import { brand, radius, space, touchTarget } from '@/theme';

import { AppText } from './AppText';
import { GlassSurface } from './GlassSurface';

export interface VenuePreviewCardProps {
  name: string;
  /** Already translated, e.g. "Є укриття". Omit when the venue has no shelter. */
  shelterBadge?: string;
  /** Already formatted, e.g. "Сьогодні 20:00 · Techno Night". Omit when nothing is on tonight. */
  eventHint?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/** Floating glass card shown over the map for the selected venue. */
export function VenuePreviewCard({
  name,
  shelterBadge,
  eventHint,
  onPress,
  accessibilityLabel,
}: VenuePreviewCardProps) {
  const summary = [name, shelterBadge, eventHint].filter(Boolean).join(', ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? summary}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <GlassSurface style={styles.card}>
        <AppText variant="cardTitle" numberOfLines={2}>
          {name}
        </AppText>
        {shelterBadge ? (
          <View style={styles.badge}>
            <AppText variant="label" tone="onAccent" numberOfLines={1}>
              {shelterBadge}
            </AppText>
          </View>
        ) : null}
        {eventHint ? (
          <AppText variant="caption" tone="muted" numberOfLines={2}>
            {eventHint}
          </AppText>
        ) : null}
      </GlassSurface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: touchTarget,
    borderRadius: radius.card,
    padding: space.lg,
    gap: space.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: brand.yellow,
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radius.chip,
  },
});
