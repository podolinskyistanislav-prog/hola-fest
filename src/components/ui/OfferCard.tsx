import { Pressable, StyleSheet, View } from 'react-native';

import { brand, fontFamily, radius, space } from '@/theme';

import { AppText } from './AppText';
import { HolaStar } from './HolaStar';

export interface OfferCardProps {
  /** Small caps kicker, "ТІЛЬКИ В HOLA". */
  kicker: string;
  title: string;
  /** Condition line, "Покажи QR на вході до 22:00". */
  condition: string;
  /** Call to action, "Взяти офер". */
  ctaLabel: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const OFFER_CTA_HEIGHT = 50;
const STAR_BOX = 90;

/** The pink offer card on the event page. Black text, yellow star, black pill CTA. */
export function OfferCard({
  kicker,
  title,
  condition,
  ctaLabel,
  onPress,
  disabled = false,
}: OfferCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.star} pointerEvents="none">
        <HolaStar color={brand.yellow} size={STAR_BOX} />
      </View>
      <View style={styles.texts}>
        <AppText variant="label" tone="onAccent" style={styles.kicker}>
          {kicker}
        </AppText>
        <AppText tone="onAccent" style={styles.title}>
          {title}
        </AppText>
        <AppText tone="onAccent" style={styles.condition}>
          {condition}
        </AppText>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={ctaLabel}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.cta,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        <AppText variant="bodyStrong" tone="onCover" style={styles.ctaLabel}>
          {ctaLabel}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.card,
    backgroundColor: brand.pink,
    padding: 22,
    gap: 14,
    overflow: 'hidden',
  },
  star: { position: 'absolute', right: -14, top: -14 },
  texts: { gap: space.xs },
  kicker: { fontSize: 12, letterSpacing: 0.4 },
  title: { fontFamily: fontFamily.display, fontSize: 22, lineHeight: 28 },
  condition: { fontSize: 14, lineHeight: 20 },
  cta: {
    height: OFFER_CTA_HEIGHT,
    borderRadius: OFFER_CTA_HEIGHT / 2,
    backgroundColor: brand.onAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: { fontSize: 16 },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.4 },
});
