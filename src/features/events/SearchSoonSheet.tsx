import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';

export interface SearchSoonSheetProps {
  visible: boolean;
  onClose: () => void;
}

/** Placeholder sheet behind the home search button until real search ships. */
export function SearchSoonSheet({ visible, onClose }: SearchSoonSheetProps) {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('home.searchClose')}
        onPress={onClose}
        style={styles.backdrop}
      >
        <Pressable
          accessible={false}
          style={[styles.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={styles.texts}>
            <AppText variant="heading" accessibilityRole="header">
              {t('home.searchSoonTitle')}
            </AppText>
            <AppText tone="muted">{t('home.searchSoonBody')}</AppText>
          </View>
          <Button label={t('home.searchClose')} onPress={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    gap: space.xl,
    padding: space.screen,
    paddingBottom: space.xxl * 2,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    borderWidth: 1,
  },
  texts: { gap: space.sm },
});
