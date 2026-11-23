import { Pressable, StyleSheet, View } from 'react-native';

import { brand, layout, radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface GigRowProps {
  /** Day of month, e.g. "27". */
  day: string;
  /** Short month, e.g. "лис". */
  month: string;
  /** Event title, e.g. "House Friday". */
  title: string;
  venue: string;
  /** Already formatted, e.g. "22:00". */
  time: string;
  /** Offer pill text; no pill when missing. */
  offerText?: string | null;
  onPress?: () => void;
}

/** One performance on a DJ page: date block, event, venue and time, optional offer pill. */
export function GigRow({ day, month, title, venue, time, offerText, onPress }: GigRowProps) {
  const { colors } = useTheme();
  const label = [`${day} ${month}`, title, venue, time, offerText].filter(Boolean).join(', ');
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.rowBorder }]}
    >
      <View
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        style={[styles.date, { backgroundColor: brand.yellow }]}
      >
        <AppText variant="dayDate" tone="onAccent">
          {day}
        </AppText>
        <AppText variant="meta" tone="onAccent">
          {month}
        </AppText>
      </View>
      <View style={styles.texts}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {`${venue} · ${time}`}
        </AppText>
      </View>
      {offerText ? (
        <View style={[styles.pill, { backgroundColor: brand.pink }]}>
          <AppText variant="label" tone="onAccent" numberOfLines={1}>
            {offerText}
          </AppText>
        </View>
      ) : null}
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
  date: {
    width: layout.offerThumbSize,
    height: layout.offerThumbSize,
    borderRadius: radius.chip,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  texts: { flex: 1, minWidth: 0, gap: 3 },
  pill: {
    height: layout.offerPillHeight,
    paddingHorizontal: 10,
    borderRadius: layout.offerPillHeight / 2,
    justifyContent: 'center',
    flexShrink: 0,
    maxWidth: layout.offerPillMaxWidth,
  },
});
