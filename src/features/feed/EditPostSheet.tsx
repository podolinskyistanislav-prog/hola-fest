import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, BottomSheet, Button, COMPOSER_MAX_CHARS, TextField } from '@/components/ui';
import { t } from '@/lib/i18n';
import type { FeedPost } from '@/services/feed';
import { space, useTheme } from '@/theme';

import { postImagePaths } from './postImagePaths';
import { useEditPost } from './usePostPage';

export interface EditPostSheetProps {
  post: FeedPost;
  onClose: () => void;
}

/** Edit the text of the user's own post; photos stay as they are. Mount only while open. */
export function EditPostSheet({ post, onClose }: EditPostSheetProps) {
  const { colors } = useTheme();
  const edit = useEditPost(post.id);
  const [text, setText] = useState(post.body);
  const [error, setError] = useState<string | undefined>(undefined);

  async function save() {
    setError(undefined);
    const message = await edit.mutateAsync({
      body: text.trim(),
      imagePaths: postImagePaths(post.imageUrls),
      asVenueId: post.asVenueId ?? undefined,
    });
    if (message) setError(message);
    else onClose();
  }

  return (
    <BottomSheet visible title={t('feed.post.editTitle')} onClose={onClose}>
      <View style={styles.body}>
        {error ? (
          <AppText accessibilityRole="alert" variant="caption" style={{ color: colors.danger }}>
            {error}
          </AppText>
        ) : null}
        <TextField
          label={t('feed.post.editLabel')}
          multiline
          maxLength={COMPOSER_MAX_CHARS}
          value={text}
          onChangeText={setText}
        />
        <Button
          label={t('feed.post.save')}
          disabled={text.trim().length === 0 || edit.isPending}
          onPress={() => void save()}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({ body: { gap: space.md } });
