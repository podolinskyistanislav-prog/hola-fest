import { StyleSheet, View } from 'react-native';

import { brand, radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';

export type AuthorKind = 'club' | 'dj' | 'hola';

const TEXT: Record<AuthorKind, string> = { club: 'Клуб', dj: 'Діджей', hola: 'Hola' };
const FILL: Record<AuthorKind, string> = {
  club: brand.yellow,
  dj: brand.pink,
  hola: brand.white,
};

export interface AuthorLabelProps {
  kind: AuthorKind;
}

/** Badge next to a post author: Клуб (yellow), Діджей (pink), Hola (white). Guests have none. */
export function AuthorLabel({ kind }: AuthorLabelProps) {
  const { colors } = useTheme();
  return (
    <View
      accessible
      accessibilityLabel={TEXT[kind]}
      style={[styles.badge, { backgroundColor: FILL[kind], borderColor: colors.border }]}
    >
      <AppText variant="badge" tone="onAccent">
        {TEXT[kind]}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: space.sm,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
