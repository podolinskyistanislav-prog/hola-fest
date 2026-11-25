import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { useSession } from '@/features/auth';
import { feedImageUrl } from '@/services/profile';
import { t } from '@/lib/i18n';
import { space } from '@/theme';

import { ProfileSetupForm } from './ProfileSetupForm';
import { useMyProfile } from './useProfile';

export interface ProfileSetupScreenContentProps {
  onDone: () => void;
}

/** First-time (or later) profile setup for a confirmed account. */
export function ProfileSetupScreenContent({ onDone }: ProfileSetupScreenContentProps) {
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const userId = session?.user.id;
  const profile = useMyProfile(userId);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.container, { paddingTop: insets.top + space.lg }]}
    >
      <AppText variant="title" accessibilityRole="header">
        {t('profileSetup.title')}
      </AppText>
      {userId && !profile.isPending ? (
        <ProfileSetupForm
          userId={userId}
          initial={{
            displayName: profile.data?.displayName ?? null,
            handle: profile.data?.handle ?? null,
            avatarUrl: profile.data?.avatarPath ? feedImageUrl(profile.data.avatarPath) : null,
          }}
          currentAvatarPath={profile.data?.avatarPath ?? null}
          onSaved={onDone}
        />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: space.screen, gap: space.xl },
});
