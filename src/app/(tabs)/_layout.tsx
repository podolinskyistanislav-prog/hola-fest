import { Tabs, type BottomTabBarProps } from 'expo-router/js-tabs';
import { StyleSheet, View } from 'react-native';

import { TabBar, type TabBarItem } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius } from '@/theme';

const GLYPH_INSET = 6;

function GlyphIcon({ color, size, round }: { color: string; size: number; round: boolean }) {
  return (
    <View
      style={[
        styles.glyph,
        { width: size - GLYPH_INSET, height: size - GLYPH_INSET, borderColor: color },
        round && { borderRadius: radius.pill },
      ]}
    />
  );
}

const ITEMS: readonly TabBarItem[] = [
  {
    id: 'index',
    label: t('tabs.events'),
    renderIcon: (props) => <GlyphIcon {...props} round={false} />,
  },
  {
    id: 'map',
    label: t('tabs.map'),
    renderIcon: (props) => <GlyphIcon {...props} round />,
  },
];

function FloatingTabBar({ state, navigateToTab, insets }: BottomTabBarProps) {
  const activeId = state.routes[state.index]?.name ?? 'index';
  return (
    <TabBar
      items={ITEMS}
      activeId={activeId}
      safeAreaBottom={insets.bottom}
      onSelect={(id) => {
        const route = state.routes.find((candidate) => candidate.name === id);
        if (route) navigateToTab(route.key);
      }}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <FloatingTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="map" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glyph: { borderWidth: 2, borderRadius: radius.chip },
});
