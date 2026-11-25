import { StyleSheet, View } from 'react-native';

import { brand, radius, scanResult, space, useTheme } from '@/theme';

import { AppText } from './AppText';

export type OfferLifecycleStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'ended';

export interface StatusPillProps {
  status: OfferLifecycleStatus;
  /** Optional override of the label. */
  label?: string;
}

export const STATUS_LABEL: Record<OfferLifecycleStatus, string> = {
  draft: 'Чернетка',
  scheduled: 'Заплановано',
  active: 'Активний',
  paused: 'Пауза',
  ended: 'Завершено',
};

/** Small pill with the lifecycle state of an offer. Black text on every colored fill. */
export function StatusPill({ status, label = STATUS_LABEL[status] }: StatusPillProps) {
  const { colors } = useTheme();
  const fill = {
    draft: colors.surfaceRaised,
    scheduled: brand.pink,
    active: scanResult.success,
    paused: brand.yellow,
    ended: colors.surfaceRaised,
  }[status];
  const neutral = status === 'draft' || status === 'ended';
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[
        styles.pill,
        { backgroundColor: fill },
        neutral && { borderColor: colors.border, borderWidth: StyleSheet.hairlineWidth },
      ]}
    >
      <AppText variant="badge" tone={neutral ? 'muted' : 'onAccent'} numberOfLines={1}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 1,
    borderRadius: radius.pill,
  },
});
