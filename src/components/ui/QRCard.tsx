import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { brand, fontFamily, space, ticket } from '@/theme';

import { AppText } from './AppText';
import { GlassSurface } from './GlassSurface';
import { QRCode } from './QRTicket';

export interface QRCardProps {
  /** The claim token encoded into the QR. Never shown as text. */
  token: string;
  offerTitle: string;
  /** Already formatted, "Techno Night · сьогодні до 22:00". */
  details: string;
  /** "Одноразовий код". */
  codeLabel: string;
  /** Already formatted countdown, "Діє ще 2 год 14 хв". */
  countdown: string;
  /** Accessible name of the QR, "QR-код офера". */
  qrLabel: string;
}

const CARD_PADDING = 18;
const TILE_PADDING = 22;
const MAX_QR_SIDE = 268;
const COUNTDOWN_HEIGHT = 30;
const CARD_RADIUS = 36;
const TILE_RADIUS = 24;

/** Glass card for the QR screen: white QR tile, offer title, details and the one-time-code countdown. */
export function QRCard({ token, offerTitle, details, codeLabel, countdown, qrLabel }: QRCardProps) {
  const { width } = useWindowDimensions();
  const side = Math.min(MAX_QR_SIDE, width - (space.screen + CARD_PADDING + TILE_PADDING) * 2);
  return (
    <GlassSurface style={styles.card}>
      <View accessible accessibilityRole="image" accessibilityLabel={qrLabel} style={styles.tile}>
        <QRCode token={token} side={side} />
      </View>
      <View style={styles.texts}>
        <AppText style={styles.title}>{offerTitle}</AppText>
        <AppText tone="muted" style={styles.details}>
          {details}
        </AppText>
      </View>
      <View style={styles.footer}>
        <AppText tone="muted" style={styles.codeLabel}>
          {codeLabel}
        </AppText>
        <View style={styles.pill}>
          <AppText variant="label" tone="onAccent">
            {countdown}
          </AppText>
        </View>
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: CARD_RADIUS, padding: CARD_PADDING, gap: 18 },
  tile: {
    backgroundColor: ticket.paper,
    borderRadius: TILE_RADIUS,
    padding: TILE_PADDING,
    alignItems: 'center',
  },
  texts: { gap: space.xs, paddingHorizontal: 6 },
  title: { fontFamily: fontFamily.display, fontSize: 20, lineHeight: 26 },
  details: { fontSize: 14 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingBottom: space.xs,
  },
  codeLabel: { fontSize: 13 },
  pill: {
    height: COUNTDOWN_HEIGHT,
    paddingHorizontal: space.md,
    borderRadius: COUNTDOWN_HEIGHT / 2,
    backgroundColor: brand.yellow,
    justifyContent: 'center',
  },
});
