import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui';
import { EventsScreenContent } from '@/features/events';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

/** Events tab. Long-press the title to open staff login. */
export default function EventsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <EventsScreenContent
        onOpenEvent={(id) => router.push({ pathname: '/event/[id]', params: { id } })}
        onTitleLongPress={() => router.push('/staff-login')}
      />
      <View style={styles.tickets}>
        <Button label={t('tickets.open')} variant="glass" onPress={() => router.push('/tickets')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tickets: { position: 'absolute', top: space.xxl * 2, right: space.screen },
});
