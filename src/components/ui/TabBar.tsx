import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';
import { GlassSurface } from './GlassSurface';

/** Height of the floating tab bar itself, in points. */
export const TAB_BAR_HEIGHT = 64;
/** Gap between the tab bar and the bottom safe-area edge. */
export const TAB_BAR_FLOAT_GAP = space.sm;

/**
 * Bottom padding a scrollable screen needs so its last item scrolls above the floating tab bar.
 * Pass the bottom safe-area inset (`useSafeAreaInsets().bottom`) and the same value to `TabBar`.
 * Example: `<FlatList contentContainerStyle={{ paddingBottom: tabBarInset(insets.bottom) }} />`.
 */
export function tabBarInset(safeAreaBottom: number): number {
  return TAB_BAR_HEIGHT + TAB_BAR_FLOAT_GAP + safeAreaBottom + space.lg;
}

export interface TabBarItem {
  /** Stable route key. */
  id: string;
  /** Visible label, already translated. */
  label: string;
  /** Spoken label; defaults to `label`. */
  accessibilityLabel?: string;
  /** Renders the icon in the color and size the bar picks for the current state. */
  renderIcon: (props: { color: string; size: number }) => ReactNode;
}

export interface TabBarProps {
  items: readonly TabBarItem[];
  activeId: string;
  onSelect: (id: string) => void;
  /** Bottom safe-area inset; the bar floats above it. */
  safeAreaBottom?: number;
}

const ICON_SIZE = 24;

/** Floating glass tab bar. Position it at the bottom of the screen; it does not know about routing. */
export function TabBar({ items, activeId, onSelect, safeAreaBottom = 0 }: TabBarProps) {
  const { colors } = useTheme();
  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { bottom: safeAreaBottom + TAB_BAR_FLOAT_GAP }]}
    >
      <GlassSurface style={styles.bar}>
        {items.map((item) => {
          const active = item.id === activeId;
          const color = active ? colors.accent : colors.textSubtle;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="tab"
              accessibilityLabel={item.accessibilityLabel ?? item.label}
              accessibilityState={{ selected: active }}
              onPress={() => onSelect(item.id)}
              style={styles.item}
            >
              {item.renderIcon({ color, size: ICON_SIZE })}
              <AppText variant="label" tone={active ? 'default' : 'muted'}>
                {item.label}
              </AppText>
            </Pressable>
          );
        })}
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: space.screen,
    right: space.screen,
  },
  bar: {
    height: TAB_BAR_HEIGHT,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.sm,
  },
  item: {
    flex: 1,
    minHeight: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
});
