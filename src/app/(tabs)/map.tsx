import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space, useTheme } from '@/theme';

/** Map tab: an empty state until the map milestone. */
export default function MapScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="heading" accessibilityRole="header">
        {t('map.emptyTitle')}
      </AppText>
      <AppText tone="muted">{t('map.emptyBody')}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, gap: space.md, justifyContent: 'center' },
});
