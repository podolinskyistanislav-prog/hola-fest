import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type TabIconName = 'calendar' | 'map-pin' | 'qr';

export interface TabIconProps {
  name: TabIconName;
  color: string;
  size: number;
}

/** Line icons of the tab bar, drawn as in the Main mockup. Decorative: the tab label is the name. */
export function TabIcon({ name, color, size }: TabIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      {name === 'calendar' ? (
        <>
          <Rect x={3} y={4} width={18} height={17} rx={3} />
          <Path d="M3 9h18M8 2v4M16 2v4" />
        </>
      ) : null}
      {name === 'map-pin' ? (
        <>
          <Path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
          <Circle cx={12} cy={9} r={2.5} />
        </>
      ) : null}
      {name === 'qr' ? (
        <>
          <Rect x={3} y={3} width={7} height={7} rx={1.5} />
          <Rect x={14} y={3} width={7} height={7} rx={1.5} />
          <Rect x={3} y={14} width={7} height={7} rx={1.5} />
          <Path d="M14 14h3v3M21 14v7h-7" />
        </>
      ) : null}
    </Svg>
  );
}
