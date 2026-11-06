import type { ReactNode } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, touchTarget, useTheme } from '@/theme';
import type { MyClaim } from '@/types/claims';

import { ticketStatus } from './ticketStatus';
import { useMyClaims } from './useMyClaims';

export interface MyTicketsContentProps {
  onOpenTicket: (offerId: string) => void;
  onBack: () => void;
}

const SKELETON_COUNT = 3;
const SKELETON_HEIGHT = 88;
const SCREEN_TOP = 96;

function Message({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <View style={styles.message}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      <AppText tone="muted">{body}</AppText>
      {action}
    </View>
  );
}

function TicketRow({ claim, onPress }: { claim: MyClaim; onPress: () => void }) {
  const { colors } = useTheme();
  const status = ticketStatus(claim, new Date());
  const statusText = {
    active: t('tickets.statusActive'),
    redeemed: t('tickets.statusRedeemed'),
    expired: t('tickets.statusExpired'),
  }[status];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${claim.offer.title}, ${claim.offer.event.venue.name}. ${statusText}`}
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <AppText variant="bodyStrong" tone={status === 'active' ? 'default' : 'muted'}>
        {claim.offer.title}
      </AppText>
      <AppText variant="caption" tone="muted">
        {claim.offer.event.title} · {claim.offer.event.venue.name}
      </AppText>
      <AppText variant="label" tone={status === 'active' ? 'accent' : 'muted'}>
        {statusText}
      </AppText>
    </Pressable>
  );
}

/** «Мої квитки»: the guest's claims with loading, empty and error states. */
export function MyTicketsContent({ onOpenTicket, onBack }: MyTicketsContentProps) {
  const { colors } = useTheme();
  const claims = useMyClaims();

  if (claims.isLoading) {
    return (
      <View
        accessibilityLabel={t('tickets.loading')}
        accessibilityRole="progressbar"
        style={styles.list}
      >
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <View key={index} style={[styles.skeleton, { backgroundColor: colors.surfaceRaised }]} />
        ))}
      </View>
    );
  }

  if (claims.isError) {
    return (
      <View style={styles.screen}>
        <Message
          title={t('tickets.errorTitle')}
          body={t('tickets.errorBody')}
          action={<Button label={t('events.retry')} onPress={() => void claims.refetch()} />}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={claims.data ?? []}
        keyExtractor={(claim) => claim.id}
        renderItem={({ item }) => (
          <TicketRow claim={item} onPress={() => onOpenTicket(item.offer.id)} />
        )}
        ListHeaderComponent={
          <AppText variant="title" accessibilityRole="header" style={styles.title}>
            {t('tickets.title')}
          </AppText>
        }
        ListEmptyComponent={
          <Message title={t('tickets.emptyTitle')} body={t('tickets.emptyBody')} />
        }
        ListFooterComponent={<Button label={t('ticket.back')} variant="inverse" onPress={onBack} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: SCREEN_TOP },
  list: { gap: space.md, paddingHorizontal: space.screen, paddingBottom: space.xxl },
  title: { paddingBottom: space.sm },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.card },
  row: {
    gap: space.xs,
    minHeight: touchTarget,
    padding: space.lg,
    borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth,
  },
  message: { gap: space.sm, paddingTop: space.xxl },
});
