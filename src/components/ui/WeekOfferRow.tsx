import { Pressable, StyleSheet, View } from 'react-native';

import { layout, radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';
import { coverColors, HolaStarThumb, type CoverColor } from './HolaStar';

export interface WeekOfferRowProps {
  /** Event title, e.g. "House Friday". */
  title: string;
  /** Already formatted, e.g. "Пт, 6 листопада · Bavovna". */
  dateAndVenue: string;
  /** The offer text in the pill, e.g. "−15%" or "Шот у подарунок". */
  offerText: string;
  /** Pill color; the star thumb takes the other accent. */
  accent?: CoverColor;
  onPress?: () => void;
}

/** A row of the "Офери тижня" list on the home screen: star thumb, event, accent offer pill. */
export function WeekOfferRow({
  title,
  dateAndVenue,
  offerText,
  accent = 'yellow',
  onPress,
}: WeekOfferRowProps) {
  const { colors } = useTheme();
  const pill = coverColors(accent).background;
  const thumb: CoverColor = accent === 'yellow' ? 'pink' : 'yellow';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${dateAndVenue}, ${offerText}`}
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.rowBorder }]}
    >
      <HolaStarThumb color={thumb} size={layout.offerThumbSize} />
      <View style={styles.texts}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {dateAndVenue}
        </AppText>
      </View>
      <View style={[styles.pill, { backgroundColor: pill }]}>
        <AppText variant="label" tone="onAccent" numberOfLines={1}>
          {offerText}
        </AppText>
      </View>
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
  texts: { flex: 1, minWidth: 0, gap: 3 },
  pill: {
    height: layout.offerPillHeight,
    paddingHorizontal: 10,
    borderRadius: layout.offerPillHeight / 2,
    justifyContent: 'center',
    flexShrink: 0,
  },
});
