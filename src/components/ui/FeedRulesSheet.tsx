import { View } from 'react-native';

import { space } from '@/theme';

import { AppText } from './AppText';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';

export const FEED_RULES: readonly string[] = [
  'Діліться враженнями, фото та музикою з вечірок.',
  'Без реклами подій, цін, знижок і промокодів — анонси публікуй у розділі Події.',
  'Без посилань, спаму та образ.',
  'Без 18+, насильства та особистих даних інших людей.',
];

export interface FeedRulesSheetProps {
  visible: boolean;
  /** Called by "Зрозуміло" and by dismissing the sheet. */
  onClose: () => void;
}

/** Short Feed rules shown before the first post (full text: docs/FEED_RULES.md). */
export function FeedRulesSheet({ visible, onClose }: FeedRulesSheetProps) {
  return (
    <BottomSheet visible={visible} title="Правила стрічки" onClose={onClose}>
      <View style={{ gap: space.sm }}>
        {FEED_RULES.map((rule) => (
          <AppText key={rule}>{`• ${rule}`}</AppText>
        ))}
      </View>
      <Button label="Зрозуміло" onPress={onClose} />
    </BottomSheet>
  );
}
