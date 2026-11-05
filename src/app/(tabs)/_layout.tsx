import { Tabs, type BottomTabBarProps } from 'expo-router/js-tabs';

import { TabBar, TabIcon, type TabBarItem } from '@/components/ui';
import { t } from '@/lib/i18n';

const ITEMS: readonly TabBarItem[] = [
  {
    id: 'index',
    label: t('tabs.events'),
    renderIcon: (props) => <TabIcon name="calendar" {...props} />,
  },
  {
    id: 'map',
    label: t('tabs.map'),
    renderIcon: (props) => <TabIcon name="map-pin" {...props} />,
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
