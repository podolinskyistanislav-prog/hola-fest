import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { radius, space, touchTarget, useTheme } from '@/theme';

import { AppText } from './AppText';

export type OfferRowStatus = 'available' | 'claimed' | 'soldOut' | 'expired';

export interface OfferRowProps {
  title: string;
  terms: string;
  status: OfferRowStatus;
  /** Claims left. Shown as "Залишилось remaining із limit" while available. */
  remaining?: number;
  limit?: number;
  /** Action slot, e.g. a claim Button. Rendered only while the offer is available. */
  action?: ReactNode;
}

const STATUS_LABEL: Record<Exclude<OfferRowStatus, 'available'>, string> = {
  claimed: 'Ви взяли цей офер',
  soldOut: 'Розібрали',
  expired: 'Офер завершився',
};

function availabilityHint(remaining?: number, limit?: number): string | null {
  if (remaining === undefined) return null;
  return limit === undefined ? `Залишилось ${remaining}` : `Залишилось ${remaining} із ${limit}`;
}

/** An offer on the event page: title, terms, availability hint and an action slot. */
export function OfferRow({ title, terms, status, remaining, limit, action }: OfferRowProps) {
  const { colors } = useTheme();
  const isAvailable = status === 'available';
  const hint = isAvailable ? availabilityHint(remaining, limit) : STATUS_LABEL[status];
  const isInactive = status === 'soldOut' || status === 'expired';

  return (
    <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.body}>
        <AppText variant="bodyStrong" tone={isInactive ? 'muted' : 'default'}>
          {title}
        </AppText>
        <AppText variant="caption" tone="muted">
          {terms}
        </AppText>
        {hint ? (
          <AppText variant="label" tone={status === 'claimed' ? 'accent' : 'muted'}>
            {hint}
          </AppText>
        ) : null}
      </View>
      {isAvailable && action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.lg,
    minHeight: touchTarget,
    borderRadius: radius.row,
    borderWidth: StyleSheet.hairlineWidth,
  },
  body: { flex: 1, gap: space.xs },
  action: { flexShrink: 0 },
});
