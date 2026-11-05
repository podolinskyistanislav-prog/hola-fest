import { useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { toQR } from 'toqr';

import { radius, space, ticket } from '@/theme';

import { AppText } from './AppText';

export type QRTicketStatus = 'active' | 'redeemed' | 'expired';

export interface QRTicketProps {
  /** The claim token encoded into the QR. Never shown as text. */
  token: string;
  offerTitle: string;
  venueName: string;
  /** Already formatted, e.g. "Діє до 23:00". */
  validUntil: string;
  status: QRTicketStatus;
}

/** Quiet zone around the code, in modules. The QR spec asks for 4. */
const QUIET_ZONE_MODULES = 4;
const MAX_QR_SIZE = 320;
/** Error correction level M (value 0 of toqr's ECLevel). */
const EC_LEVEL_M = 0;

const STATUS_LABEL: Record<Exclude<QRTicketStatus, 'active'>, string> = {
  redeemed: 'Офер використано',
  expired: 'Термін дії минув',
};

interface DarkRun {
  row: number;
  start: number;
  length: number;
}

/** Encodes the token and merges adjacent dark modules per row into runs. */
export function qrDarkRuns(token: string): { size: number; runs: DarkRun[] } {
  const modules = toQR(token, EC_LEVEL_M);
  const size = Math.round(Math.sqrt(modules.length));
  const runs: DarkRun[] = [];
  for (let row = 0; row < size; row++) {
    let start = -1;
    for (let col = 0; col <= size; col++) {
      const dark = col < size && modules[row * size + col] === 1;
      if (dark && start < 0) start = col;
      if (!dark && start >= 0) {
        runs.push({ row, start, length: col - start });
        start = -1;
      }
    }
  }
  return { size, runs };
}

function QRCode({ token, side }: { token: string; side: number }) {
  const { size, runs } = useMemo(() => qrDarkRuns(token), [token]);
  const total = size + QUIET_ZONE_MODULES * 2;
  const moduleSize = Math.floor(side / total);
  const codeSide = moduleSize * total;

  return (
    <View
      style={[styles.code, { width: codeSide, height: codeSide }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {runs.map((run) => (
        <View
          key={`${run.row}-${run.start}`}
          style={{
            position: 'absolute',
            backgroundColor: ticket.ink,
            left: (run.start + QUIET_ZONE_MODULES) * moduleSize,
            top: (run.row + QUIET_ZONE_MODULES) * moduleSize,
            width: run.length * moduleSize,
            height: moduleSize,
          }}
        />
      ))}
    </View>
  );
}

/**
 * The guest's claim as a big black-on-white QR with offer and venue details.
 * Drawn with plain views: no network, no images. Redeemed and expired claims
 * hide the code so a stale ticket can never be scanned by mistake.
 */
export function QRTicket({ token, offerTitle, venueName, validUntil, status }: QRTicketProps) {
  const { width } = useWindowDimensions();
  const side = Math.min(MAX_QR_SIZE, width - space.screen * 2 - space.xxl * 2);
  const isActive = status === 'active';
  const accessibilityLabel = isActive
    ? `QR-код офера «${offerTitle}», ${venueName}. ${validUntil}`
    : `${STATUS_LABEL[status]}: «${offerTitle}», ${venueName}`;

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      style={[styles.card, { backgroundColor: ticket.paper }]}
    >
      {isActive ? (
        <QRCode token={token} side={side} />
      ) : (
        <View style={[styles.stateBlock, { width: side, height: side }]}>
          <AppText variant="heading" style={[styles.centered, styles.ink]}>
            {STATUS_LABEL[status]}
          </AppText>
        </View>
      )}
      <View style={styles.details}>
        <AppText variant="cardTitle" style={[styles.centered, styles.ink]}>
          {offerTitle}
        </AppText>
        <AppText variant="body" style={[styles.centered, styles.inkMuted]}>
          {venueName}
        </AppText>
        <AppText variant="label" style={[styles.centered, styles.inkMuted]}>
          {validUntil}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: space.lg,
    padding: space.xxl,
    borderRadius: radius.card,
  },
  code: { backgroundColor: ticket.paper },
  stateBlock: { alignItems: 'center', justifyContent: 'center' },
  details: { gap: space.xs, alignSelf: 'stretch' },
  centered: { textAlign: 'center' },
  ink: { color: ticket.ink },
  inkMuted: { color: ticket.inkMuted },
});
