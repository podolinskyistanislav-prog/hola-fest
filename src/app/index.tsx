import { StyleSheet, View } from 'react-native';

import { AppText, Button, Chip } from '@/components/ui';
import { space, useTheme } from '@/theme';

/** Placeholder home until Milestone 3 (events list) replaces it. Shows the design system in use. */
export default function Index() {
  const { colors } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppText variant="title">Сьогодні в Києві</AppText>
      <AppText tone="muted">Скоро тут з’являться події Bavovna і Panorama Bar.</AppText>
      <View style={styles.row}>
        <Chip label="Усі" selected />
        <Chip label="З офером" />
        <Chip label="Techno" />
      </View>
      <Button label="Взяти офер" />
      <Button label="Поїхати" variant="pink" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.screen, paddingTop: 96, gap: space.lg },
  row: { flexDirection: 'row', gap: space.sm },
});
