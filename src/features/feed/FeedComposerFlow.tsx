import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, BottomSheet, Button, Composer, FeedRulesSheet } from '@/components/ui';
import { t } from '@/lib/i18n';
import { pickPostPhoto } from '@/lib/pickPostPhoto';
import { brand, radius, space, useTheme } from '@/theme';

import { hasSeenFeedRules, markFeedRulesSeen } from './feedRulesSeen';
import { useMyClubs } from './useFeed';
import { usePublishPost } from './usePublishPost';

export interface FeedComposerFlowProps {
  userId: string | undefined;
  onClose: () => void;
}

type Stage = 'pending' | 'author' | 'rules' | 'compose';

/**
 * Everything between the "+" button and a published post: choose "as the club" for venue
 * members, show the Feed rules before the first post, write, upload photos, publish.
 * Mount it only while the flow is open, so every post starts from a clean state.
 */
export function FeedComposerFlow({ userId, onClose }: FeedComposerFlowProps) {
  const { colors } = useTheme();
  const clubs = useMyClubs(Boolean(userId));
  const { publish, isPublishing, progress } = usePublishPost(userId);
  const [stage, setStage] = useState<Stage>('pending');
  const [asVenueId, setAsVenueId] = useState<string | undefined>(undefined);
  const [text, setText] = useState('');
  const [photoUris, setPhotoUris] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const hasClubs = (clubs.data ?? []).length > 0;
  const waitingForClubs = clubs.isPending && Boolean(userId);

  useEffect(() => {
    if (waitingForClubs) return;
    let cancelled = false;
    void (async () => {
      const seen = await hasSeenFeedRules();
      if (cancelled) return;
      setStage((current) => {
        if (current !== 'pending') return current;
        if (hasClubs) return 'author';
        return seen ? 'compose' : 'rules';
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [waitingForClubs, hasClubs]);

  async function afterAuthor(venueId: string | undefined) {
    setAsVenueId(venueId);
    setStage((await hasSeenFeedRules()) ? 'compose' : 'rules');
  }

  async function acceptRules() {
    await markFeedRulesSeen();
    setStage('compose');
  }

  async function addPhoto() {
    const uri = await pickPostPhoto().catch(() => null);
    if (uri) setPhotoUris((current) => [...current, uri]);
  }

  async function submit() {
    setError(undefined);
    const result = await publish({ body: text, photoUris, asVenueId });
    if (result.ok) onClose();
    else setError(result.error);
  }

  const percent = Math.round((progress ?? 0) * 100);

  return (
    <>
      <BottomSheet visible={stage === 'author'} title={t('feed.asTitle')} onClose={onClose}>
        <View style={styles.choices}>
          <Button
            label={t('feed.asMe')}
            variant="glass"
            onPress={() => void afterAuthor(undefined)}
          />
          {(clubs.data ?? []).map((club) => (
            <Button
              key={club.id}
              label={club.name}
              accessibilityLabel={`${t('feed.asClub')} ${club.name}`}
              onPress={() => void afterAuthor(club.id)}
            />
          ))}
        </View>
      </BottomSheet>
      <FeedRulesSheet visible={stage === 'rules'} onClose={() => void acceptRules()} />
      <Composer
        visible={stage === 'compose' && !isPublishing}
        text={text}
        onChangeText={setText}
        photoUris={photoUris}
        onAddPhoto={() => void addPhoto()}
        onRemovePhoto={(index) =>
          setPhotoUris((current) => current.filter((_, position) => position !== index))
        }
        onSubmit={() => void submit()}
        onClose={onClose}
        error={error}
        submitting={isPublishing}
      />
      <BottomSheet visible={isPublishing} title={t('feed.publishing')} onClose={() => undefined}>
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={t('feed.uploadingPhotos')}
          accessibilityValue={{ min: 0, max: 100, now: percent }}
          style={styles.progress}
        >
          {progress !== undefined ? (
            <>
              <AppText tone="muted">{`${t('feed.uploadingPhotos')} ${percent}%`}</AppText>
              <View style={[styles.track, { backgroundColor: colors.surfaceRaised }]}>
                <View style={[styles.fill, { width: `${percent}%` }]} />
              </View>
            </>
          ) : null}
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  choices: { gap: space.md },
  progress: { gap: space.md, minHeight: space.xl },
  track: { height: 6, borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: 6, backgroundColor: brand.yellow },
});
