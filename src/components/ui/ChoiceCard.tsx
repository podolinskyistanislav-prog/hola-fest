import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { brand, radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface ChoiceCardProps {
  title: string;
  subtitle?: string;
  /** Icon or emoji node shown in the round badge on the left. */
  icon: ReactNode;
  selected?: boolean;
  onPress: () => void;
}

const ICON_BOX = 48;

/** Big tappable card for picking one option (account type, offer template). A radio in a11y terms. */
export function ChoiceCard({ title, subtitle, icon, selected = false, onPress }: ChoiceCardProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      accessibilityState={{ selected, checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: selected ? brand.yellow : colors.border,
          borderWidth: selected ? 2 : 1,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View
        style={[styles.icon, { backgroundColor: selected ? brand.yellow : colors.surfaceRaised }]}
      >
        {icon}
      </View>
      <View style={styles.texts}>
        <AppText variant="cardTitle">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" tone="muted">
            {subtitle}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    padding: space.lg,
    borderRadius: radius.card,
  },
  icon: {
    width: ICON_BOX,
    height: ICON_BOX,
    borderRadius: ICON_BOX / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1, gap: space.xs },
});
