import { useColorScheme } from 'react-native';

import { palettes, type ColorScheme, type Palette } from './tokens';

export interface Theme {
  scheme: ColorScheme;
  colors: Palette;
}

/** Current theme, following the phone's light/dark setting. Dark is the default. */
export function useTheme(): Theme {
  const scheme: ColorScheme = useColorScheme() === 'light' ? 'light' : 'dark';
  return { scheme, colors: palettes[scheme] };
}
