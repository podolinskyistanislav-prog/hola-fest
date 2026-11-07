import { Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { t, type TranslationKey } from '@/lib/i18n';
import { dayKeyParts, kyivDayKey, kyivWeekday } from '@/lib/kyivTime';
import { layout, space, useTheme } from '@/theme';

import { AppText } from './AppText';
import { GlassSurface } from './GlassSurface';

const LOGO = require('../../../assets/images/icon.png');

/** "Середа, 4 листопада" for the Kyiv calendar day the instant falls on. */
export function formatHomeDate(date: Date): string {
  const key = kyivDayKey(date);
  const { day, month } = dayKeyParts(key);
  const weekday = t(`events.weekdayLong.${kyivWeekday(key)}` as TranslationKey);
  return `${weekday}, ${day} ${t(`events.month.${month}` as TranslationKey)}`;
}

export interface HomeHeaderProps {
  /** e.g. "Сьогодні в Києві". */
  title: string;
  /** The day shown under the title; formatted in Kyiv time. */
  date: Date;
  /** Spoken label of the search button, e.g. "Пошук". */
  searchLabel: string;
  onSearchPress?: () => void;
}

/** Home screen header: logo, title with the date, and a round glass search button. */
export function HomeHeader({ title, date, searchLabel, onSearchPress }: HomeHeaderProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <Image source={LOGO} accessibilityLabel="Hola" style={styles.logo} />
        <View style={styles.texts}>
          <AppText variant="brandTitle" numberOfLines={1}>
            {title}
          </AppText>
          <AppText variant="meta" tone="muted">
            {formatHomeDate(date)}
          </AppText>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={searchLabel}
        onPress={onSearchPress}
      >
        <GlassSurface kind="control" style={styles.search}>
          <Svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text}
            strokeWidth={2}
            strokeLinecap="round"
          >
            <Circle cx={11} cy={11} r={7} />
            <Path d="M20 20l-3.5-3.5" />
          </Svg>
        </GlassSurface>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.screen,
    gap: space.md,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  logo: { width: layout.logoSize, height: layout.logoSize, borderRadius: layout.logoRadius },
  texts: { gap: 1, flexShrink: 1 },
  search: {
    width: layout.searchButtonSize,
    height: layout.searchButtonSize,
    borderRadius: layout.searchButtonSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
