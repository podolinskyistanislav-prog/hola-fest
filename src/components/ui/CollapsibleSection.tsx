import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface CollapsibleSectionProps {
  title: string;
  /** Optional count badge next to the title. */
  count?: number;
  defaultExpanded?: boolean;
  children: ReactNode;
}

/** Header row (title, count, chevron) that shows or hides its content. */
export function CollapsibleSection({
  title,
  count,
  defaultExpanded = false,
  children,
}: CollapsibleSectionProps) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={count === undefined ? title : `${title}, ${count}`}
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((value) => !value)}
        style={styles.header}
      >
        <AppText variant="heading" style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        {count === undefined ? null : (
          <View style={[styles.badge, { backgroundColor: colors.surfaceRaised }]}>
            <AppText variant="label">{String(count)}</AppText>
          </View>
        )}
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
          <Path d={expanded ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'} />
        </Svg>
      </Pressable>
      {expanded ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  title: { flex: 1 },
  badge: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: space.sm,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { paddingTop: space.sm },
});
