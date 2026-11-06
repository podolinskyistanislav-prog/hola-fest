import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { layout, radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';
import { GlassSurface } from './GlassSurface';
import { coverColors, HolaStarCover, type CoverColor } from './HolaStar';

export interface EventCarouselCardProps {
  title: string;
  venue: string;
  /** Already formatted time range, e.g. "20:00 – 23:30". */
  timeRange: string;
  /** Already formatted, e.g. "від 300 ₴". */
  priceFrom?: string;
  /** Already formatted, e.g. "−20% на вхід". Omit when the event has no offer. */
  offerBadge?: string;
  /** Cover color, with Hola stars in the other accent. Used when there is no cover image. */
  coverColor?: CoverColor;
  /** Cover image; replaces the colored stars cover. */
  coverImageUri?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/** Card of the home carousel (290 × 230): cover, glass offer badge, glass info panel. */
export function EventCarouselCard({
  title,
  venue,
  timeRange,
  priceFrom,
  offerBadge,
  coverColor = 'yellow',
  coverImageUri,
  onPress,
  accessibilityLabel,
}: EventCarouselCardProps) {
  const { colors } = useTheme();
  const summary = [title, `${venue} · ${timeRange}`, priceFrom, offerBadge]
    .filter(Boolean)
    .join(', ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? summary}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: coverColors(coverColor).background, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      {coverImageUri ? (
        <Image
          source={{ uri: coverImageUri }}
          accessible={false}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
      ) : (
        <HolaStarCover color={coverColor} />
      )}
      {offerBadge ? (
        <GlassSurface kind="cover" style={styles.badge}>
          <AppText variant="badge" tone="onCover" numberOfLines={1}>
            {offerBadge}
          </AppText>
        </GlassSurface>
      ) : null}
      <GlassSurface kind="cover" style={styles.panel}>
        <View style={styles.texts}>
          <AppText variant="cardTitle" tone="onCover" numberOfLines={1}>
            {title}
          </AppText>
          <AppText variant="meta" style={{ color: colors.glassOnCover.subtext }} numberOfLines={1}>
            {`${venue} · ${timeRange}`}
          </AppText>
        </View>
        {priceFrom ? (
          <AppText variant="label" tone="onCover" numberOfLines={1} style={styles.price}>
            {priceFrom}
          </AppText>
        ) : null}
      </GlassSurface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: layout.carouselCardWidth,
    height: layout.carouselCardHeight,
    borderRadius: radius.card,
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    left: space.md,
    top: space.md,
    height: layout.offerPillHeight,
    paddingHorizontal: 11,
    borderRadius: layout.offerPillHeight / 2,
    justifyContent: 'center',
  },
  panel: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: radius.control,
    paddingVertical: space.md,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
  },
  texts: { flex: 1, gap: 3 },
  price: { flexShrink: 0 },
});
