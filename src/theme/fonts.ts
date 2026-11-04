import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from '@expo-google-fonts/inter';
import {
  Unbounded_500Medium,
  Unbounded_700Bold,
  useFonts as useUnboundedFonts,
} from '@expo-google-fonts/unbounded';

/** Loads the brand fonts. Returns true once both families are ready. */
export function useAppFonts(): boolean {
  const [unboundedLoaded] = useUnboundedFonts({ Unbounded_500Medium, Unbounded_700Bold });
  const [interLoaded] = useInterFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold });
  return unboundedLoaded && interLoaded;
}
