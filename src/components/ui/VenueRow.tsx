import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { layout, radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';
import { HolaStarThumb, type CoverColor } from './HolaStar';

export interface VenueRowProps {
  name: string;
  /** Already formatted; pass a placeholder like "Адресу буде додано згодом" when unknown. */
  address: string;
  /** Already formatted: "Сьогодні: House Friday · 20:00" or "3 події цього тижня". */
  eventLine: string;
  /** Venue accent for the star thumb when there is no cover. */
  accent?: CoverColor;
  /** Cover photo; replaces the star thumb. */
  coverUri?: string | null;
  onPress?: () => void;
}

/** A club in a list: 56px thumb, name, address, what is on, chevron. */
export function VenueRow({
  name,
  address,
  eventLine,
  accent = 'yellow',
  coverUri,
  onPress,
}: VenueRowProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${address}, ${eventLine}`}
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.rowBorder }]}
    >
      {coverUri ? (
        <Image
          source={{ uri: coverUri }}
          accessible={false}
          style={styles.cover}
          contentFit="cover"
        />
      ) : (
        <HolaStarThumb color={accent} size={layout.offerThumbSize} />
      )}
      <View style={styles.texts}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {name}
        </AppText>
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {address}
        </AppText>
        <AppText variant="caption" numberOfLines={1}>
          {eventLine}
        </AppText>
      </View>
      <Svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.textMuted}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      >
        <Path d="M9 6l6 6-6 6" />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: 10,
    borderRadius: radius.row,
    borderWidth: 1,
  },
  cover: {
    width: layout.offerThumbSize,
    height: layout.offerThumbSize,
    borderRadius: radius.chip,
    flexShrink: 0,
  },
  texts: { flex: 1, minWidth: 0, gap: 2 },
});
