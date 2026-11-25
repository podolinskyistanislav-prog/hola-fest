import { StyleSheet, View } from 'react-native';

import { brand, radius, space, useTheme } from '@/theme';

import { AppText } from './AppText';
import { GlassSurface } from './GlassSurface';
import { OfferCard } from './OfferCard';

/** An offer as the builder holds it, with every text already formatted. */
export interface OfferDraft {
  /** "−20% на вхід". */
  title: string;
  /** "Покажи QR на вході до 23:00". */
  condition: string;
  venueName: string;
  /** "Діє до 23:00". */
  validUntil: string;
}

export interface OfferPreviewProps {
  draft: OfferDraft;
  /** Already translated captions and button texts. */
  kicker?: string;
  ctaLabel?: string;
  badgeCaption?: string;
  cardCaption?: string;
  qrCaption?: string;
}

const COVER_HEIGHT = 96;

/** Live preview of what guests see: badge on an event cover, the offer card and the QR-screen header. */
export function OfferPreview({
  draft,
  kicker = 'ТІЛЬКИ В HOLA',
  ctaLabel = 'Взяти офер',
  badgeCaption = 'Бейдж',
  cardCaption = 'Картка',
  qrCaption = 'Екран QR',
}: OfferPreviewProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.root}>
      <View style={styles.block}>
        <AppText variant="label" tone="muted">
          {badgeCaption}
        </AppText>
        <View style={styles.cover}>
          <GlassSurface kind="cover" style={styles.badge}>
            <AppText variant="label" tone="onCover" numberOfLines={1}>
              {draft.title}
            </AppText>
          </GlassSurface>
        </View>
      </View>

      <View style={styles.block}>
        <AppText variant="label" tone="muted">
          {cardCaption}
        </AppText>
        <OfferCard
          kicker={kicker}
          title={draft.title}
          condition={draft.condition}
          ctaLabel={ctaLabel}
          disabled
        />
      </View>

      <View style={styles.block}>
        <AppText variant="label" tone="muted">
          {qrCaption}
        </AppText>
        <View
          style={[styles.header, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <AppText variant="heading">{draft.title}</AppText>
          <AppText variant="caption" tone="muted">
            {draft.venueName}
          </AppText>
          <AppText variant="label">{draft.validUntil}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: space.xl },
  block: { gap: space.sm },
  cover: {
    height: COVER_HEIGHT,
    borderRadius: radius.card,
    backgroundColor: brand.yellow,
    justifyContent: 'flex-end',
    padding: space.md,
  },
  badge: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 2,
    borderRadius: radius.chip,
  },
  header: {
    gap: space.xs,
    padding: space.lg,
    borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
