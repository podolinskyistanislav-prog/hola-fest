import { Image } from 'expo-image';
import { Linking, StyleSheet, View } from 'react-native';

import { AppText, Button, Chip, DjAvatar } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';

import { genresLine, safeLinkUrl } from './djFormat';

export interface DjHeroProps {
  name: string;
  genres: readonly string[];
  photoUrl?: string | null;
  coverUrl?: string | null;
  bio?: string | null;
  instagramUrl?: string | null;
  soundcloudUrl?: string | null;
}

const COVER_HEIGHT = 140;

/** The top of a DJ page: cover, photo, stage name, genre chips, bio and links. Also the live preview. */
export function DjHero({
  name,
  genres,
  photoUrl,
  coverUrl,
  bio,
  instagramUrl,
  soundcloudUrl,
}: DjHeroProps) {
  const { colors } = useTheme();
  const bioText = bio?.trim() ?? '';
  const links = [
    { label: t('dj.instagram'), url: safeLinkUrl(instagramUrl) },
    { label: t('dj.soundcloud'), url: safeLinkUrl(soundcloudUrl) },
  ].flatMap((link) => (link.url ? [{ label: link.label, url: link.url }] : []));

  return (
    <View style={styles.root}>
      {coverUrl ? (
        <Image
          source={{ uri: coverUrl }}
          accessible={false}
          contentFit="cover"
          style={styles.cover}
        />
      ) : (
        <View style={[styles.cover, { backgroundColor: colors.surfaceRaised }]} />
      )}
      <View style={styles.hero}>
        <DjAvatar name={name} photoUri={photoUrl} size={96} />
        <AppText variant="title" accessibilityRole="header">
          {name}
        </AppText>
        {genres.length > 0 ? (
          <View accessibilityLabel={genresLine([...genres])} style={styles.chips}>
            {genres.map((genre) => (
              <Chip key={genre} label={genresLine([genre])} />
            ))}
          </View>
        ) : null}
        <AppText tone="muted">{bioText === '' ? t('dj.bioPlaceholder') : bioText}</AppText>
        {links.length > 0 ? (
          <View style={styles.chips}>
            {links.map((link) => (
              <Button
                key={link.label}
                label={link.label}
                variant="inverse"
                onPress={() => void Linking.openURL(link.url)}
              />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: space.lg },
  cover: { height: COVER_HEIGHT, borderRadius: radius.card, alignSelf: 'stretch' },
  hero: { alignItems: 'center', gap: space.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, justifyContent: 'center' },
});
