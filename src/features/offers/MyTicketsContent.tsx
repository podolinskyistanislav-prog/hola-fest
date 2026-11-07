import type { ReactNode } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, tabBarInset } from '@/components/ui';
import { formatEventDay } from '@/features/events/eventFormat';
import { t } from '@/lib/i18n';
import { layout, radius, space, useTheme } from '@/theme';
import type { MyClaim } from '@/types/claims';

import { ticketStatus } from './ticketStatus';
import { useMyClaims } from './useMyClaims';

export interface MyTicketsContentProps {
  onOpenTicket: (offerId: string) => void;
  /** Empty-state action: go to the events tab. */
  onOpenEvents: () => void;
}

const SKELETON_COUNT = 3;
const SKELETON_HEIGHT = 64;
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
  const { event } = claim.offer;
  const dateAndVenue = `${formatEventDay(event.startsAt)} · ${event.venue.name}`;
  const isActive = status === 'active';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${event.title}, ${dateAndVenue}. ${claim.offer.title}. ${statusText}`}
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.rowBorder }]}
    >
      <View style={styles.texts}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {event.title}
        </AppText>
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {dateAndVenue}
        </AppText>
      </View>
      <View
        style={[
          styles.pill,
          isActive
            ? { backgroundColor: colors.accent, borderColor: colors.accent }
            : { backgroundColor: colors.surfaceRaised, borderColor: colors.border },
        ]}
      >
        <AppText variant="label" tone={isActive ? 'onAccent' : 'muted'} numberOfLines={1}>
          {statusText}
        </AppText>
      </View>
    </Pressable>
  );
}

/** «Мої QR»: the guest's claims with loading, empty and error states. */
export function MyTicketsContent({ onOpenTicket, onOpenEvents }: MyTicketsContentProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const claims = useMyClaims();
  const listPadding = { paddingBottom: tabBarInset(insets.bottom) };

  if (claims.isLoading) {
    return (
      <View
        accessibilityLabel={t('tickets.loading')}
        accessibilityRole="progressbar"
        style={[styles.list, styles.screen]}
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
        <View style={styles.list}>
          <Message
            title={t('tickets.errorTitle')}
            body={t('tickets.errorBody')}
            action={<Button label={t('events.retry')} onPress={() => void claims.refetch()} />}
          />
        </View>
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
          <Message
            title={t('tickets.emptyTitle')}
            body={t('tickets.emptyBody')}
            action={<Button label={t('tickets.emptyAction')} onPress={onOpenEvents} />}
          />
        }
        contentContainerStyle={[styles.list, listPadding]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: SCREEN_TOP },
  list: { gap: space.md, paddingHorizontal: space.screen },
  title: { paddingBottom: space.sm },
  skeleton: { height: SKELETON_HEIGHT, borderRadius: radius.row },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: 10,
    borderRadius: radius.row,
    borderWidth: 1,
  },
  texts: { flex: 1, minWidth: 0, gap: 3 },
  pill: {
    height: layout.offerPillHeight,
    paddingHorizontal: 10,
    borderRadius: layout.offerPillHeight / 2,
    borderWidth: 1,
    justifyContent: 'center',
    flexShrink: 0,
  },
  message: { gap: space.sm, paddingTop: space.xxl },
});
