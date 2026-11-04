import { Pressable, StyleSheet, View } from 'react-native';

import { brand, radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';
import { GlassSurface } from './GlassSurface';

export type EventCoverColor = 'yellow' | 'pink';

export interface EventCardProps {
  title: string;
  venue: string;
  /** Already formatted, e.g. "20:00". The component does no date logic. */
  time: string;
  /** Already formatted, e.g. "від 350 ₴". Omit when the price is unknown. */
  priceFrom?: string;
  /** Already formatted, e.g. "−20% на напої". Omit when the event has no offer. */
  offerBadge?: string;
  /** Cover block color; the Hola star takes the other accent. */
  coverColor?: EventCoverColor;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const COVER_HEIGHT = 140;
const STAR_SIZE = 72;

/** An event in the list: cover with the Hola star, title, venue, time, price and offer badge. */
export function EventCard({
  title,
  venue,
  time,
  priceFrom,
  offerBadge,
  coverColor = 'yellow',
  onPress,
  accessibilityLabel,
}: EventCardProps) {
  const { colors } = useTheme();
  const cover = coverColor === 'yellow' ? brand.yellow : brand.pink;
  const star = coverColor === 'yellow' ? brand.pink : brand.yellow;
  const summary = [title, venue, time, priceFrom, offerBadge].filter(Boolean).join(', ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? summary}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={[styles.cover, { backgroundColor: cover }]}>
        <AppText
          accessible={false}
          importantForAccessibility="no"
          style={[styles.star, { color: star }]}
        >
          ✦
        </AppText>
        {offerBadge ? (
          <GlassSurface kind="cover" style={styles.badge}>
            <AppText variant="label" tone="onCover" numberOfLines={1}>
              {offerBadge}
            </AppText>
          </GlassSurface>
        ) : null}
      </View>
      <View style={styles.body}>
        <AppText variant="cardTitle" numberOfLines={2}>
          {title}
        </AppText>
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {venue}
        </AppText>
        <View style={styles.meta}>
          <AppText variant="label">{time}</AppText>
          {priceFrom ? (
            <AppText variant="label" tone="muted">
              {priceFrom}
            </AppText>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: touchTarget,
    borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  cover: {
    height: COVER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    fontSize: STAR_SIZE,
    lineHeight: STAR_SIZE + space.sm,
  },
  badge: {
    position: 'absolute',
    left: space.md,
    bottom: space.md,
    maxWidth: '80%',
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 2,
    borderRadius: radius.chip,
  },
  body: { padding: space.lg, gap: space.xs },
  meta: { flexDirection: 'row', gap: space.md, marginTop: space.xs },
});
