import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';
import { DjAvatar } from './DjAvatar';

export interface DjRowProps {
  name: string;
  /** Already formatted: "Techno · House". Empty → the line is hidden. */
  genresLine?: string;
  /** Already formatted: "Пт, 27 листопада · Котельня". Missing → "Найближчих виступів немає". */
  nextGigLine?: string | null;
  photoUri?: string | null;
  onPress?: () => void;
}

const NO_GIGS = 'Найближчих виступів немає';

/** A DJ in a list: avatar, name, genres, next gig, chevron. */
export function DjRow({ name, genresLine, nextGigLine, photoUri, onPress }: DjRowProps) {
  const { colors } = useTheme();
  const gig = nextGigLine ?? NO_GIGS;
  const label = [name, genresLine, gig].filter(Boolean).join(', ');
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.rowBorder }]}
    >
      <DjAvatar name={name} photoUri={photoUri} size={48} />
      <View style={styles.texts}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {name}
        </AppText>
        {genresLine ? (
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {genresLine}
          </AppText>
        ) : null}
        <AppText variant="caption" tone={nextGigLine ? undefined : 'muted'} numberOfLines={1}>
          {gig}
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
  texts: { flex: 1, minWidth: 0, gap: 2 },
});
