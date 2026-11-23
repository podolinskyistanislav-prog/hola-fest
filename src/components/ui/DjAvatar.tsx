import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { brand } from '@/theme';

import { AppText } from './AppText';

export type DjAvatarSize = 48 | 96;

export interface DjAvatarProps {
  name: string;
  /** Round photo; without it an accent circle with initials is shown. */
  photoUri?: string | null;
  size?: DjAvatarSize;
}

/** Up to two initials of a DJ name: "DJ Vlad Kotyk" → "VK", "Nova" → "N". */
export function djInitials(name: string): string {
  const all = name.trim().split(/\s+/).filter(Boolean);
  const words = all.filter((word) => word.toLowerCase() !== 'dj');
  return (words.length > 0 ? words : all)
    .slice(0, 2)
    .map((word) => Array.from(word)[0]?.toUpperCase() ?? '')
    .join('');
}

/** Round DJ picture, 48 in lists and 96 on the DJ page. Decorative: the name is next to it. */
export function DjAvatar({ name, photoUri, size = 48 }: DjAvatarProps) {
  const box = { width: size, height: size, borderRadius: size / 2 };
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[styles.base, box, { backgroundColor: brand.yellow }]}
    >
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={box} contentFit="cover" accessible={false} />
      ) : (
        <AppText variant={size === 96 ? 'heading' : 'label'} tone="onAccent">
          {djInitials(name)}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 },
});
