import { Feather } from '@expo/vector-icons';

export type TabIconName = 'calendar' | 'map-pin';

export interface TabIconProps {
  name: TabIconName;
  color: string;
  size: number;
}

/** Line icon for the tab bar. Decorative: the tab label carries the accessible name. */
export function TabIcon({ name, color, size }: TabIconProps) {
  return (
    <Feather
      name={name}
      color={color}
      size={size}
      accessible={false}
      importantForAccessibility="no"
      accessibilityElementsHidden
    />
  );
}
