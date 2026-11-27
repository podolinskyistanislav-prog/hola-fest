import { StyleSheet, View } from 'react-native';

import { AppText, BottomSheet, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { space } from '@/theme';

export interface BlockConfirmSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/** Asks before blocking an author: their posts and comments disappear for the user. */
export function BlockConfirmSheet({ visible, onClose, onConfirm }: BlockConfirmSheetProps) {
  return (
    <BottomSheet visible={visible} title={t('feed.menu.blockTitle')} onClose={onClose}>
      <View style={styles.body}>
        <AppText tone="muted">{t('feed.menu.blockBody')}</AppText>
        <Button label={t('feed.menu.block')} variant="pink" onPress={onConfirm} />
        <Button label={t('feed.menu.cancel')} variant="glass" onPress={onClose} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({ body: { gap: space.md } });
