import { Pressable, StyleSheet } from 'react-native';

import { radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';
import { BottomSheet } from './BottomSheet';

export type ReportReason = 'event_promo' | 'abuse' | 'adult' | 'spam' | 'other';

export const REPORT_REASONS: readonly { id: ReportReason; label: string }[] = [
  { id: 'event_promo', label: 'Реклама події' },
  { id: 'abuse', label: 'Образи' },
  { id: 'adult', label: '18+' },
  { id: 'spam', label: 'Спам' },
  { id: 'other', label: 'Інше' },
];

export interface ReportSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectReason: (reason: ReportReason) => void;
}

/** Asks why a post or comment is reported. Picking a reason sends the report. */
export function ReportSheet({ visible, onClose, onSelectReason }: ReportSheetProps) {
  const { colors } = useTheme();
  return (
    <BottomSheet visible={visible} title="Поскаржитись" onClose={onClose}>
      {REPORT_REASONS.map((reason) => (
        <Pressable
          key={reason.id}
          accessibilityRole="button"
          accessibilityLabel={reason.label}
          onPress={() => onSelectReason(reason.id)}
          style={[
            styles.option,
            { backgroundColor: colors.surfaceRaised, borderColor: colors.border },
          ]}
        >
          <AppText variant="bodyStrong">{reason.label}</AppText>
        </Pressable>
      ))}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  option: {
    minHeight: touchTarget + 4,
    justifyContent: 'center',
    paddingHorizontal: space.lg,
    borderRadius: radius.control,
    borderWidth: 1,
  },
});
