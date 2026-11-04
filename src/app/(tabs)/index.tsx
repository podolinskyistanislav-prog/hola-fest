import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

/** Events tab. Real events arrive in a later task; long-press the title to open staff login. */
export default function EventsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText
        variant="title"
        accessibilityRole="header"
        onLongPress={() => router.push('/staff-login')}
      >
        {t('events.title')}
      </AppText>
      <AppText variant="heading">{t('events.emptyTitle')}</AppText>
      <AppText tone="muted">{t('events.emptyBody')}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, paddingTop: 96, gap: space.lg },
});
