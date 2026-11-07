import type { Palette } from '@/theme';

type StyleRule = {
  featureType?: string;
  elementType?: string;
  stylers: Record<string, string>[];
};

/** Google Maps dark style (Android) built from theme colors, matching the Map mockup. */
export function darkMapStyle(colors: Palette): StyleRule[] {
  return [
    { elementType: 'geometry', stylers: [{ color: colors.surface }] },
    { elementType: 'labels.text.fill', stylers: [{ color: colors.textMuted }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: colors.background }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: colors.surfaceRaised }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: colors.border }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: colors.background }] },
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  ];
}
