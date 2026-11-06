import { Pressable, StyleSheet, View } from 'react-native';

import { brand, fontFamily, radius, space } from '@/theme';

import { AppText } from './AppText';
import { GlassPillButton } from './GlassPillButton';
import { GlassSurface } from './GlassSurface';
import { HolaStar } from './HolaStar';

export interface MapVenueCardProps {
  name: string;
  address: string;
  /** Already formatted, "Сьогодні: Rooftop Sunset · 19:00". */
  todayEvent: string;
  /** Thumb color: the venue accent. */
  accent?: 'yellow' | 'pink';
  /** "Подія". */
  eventLabel: string;
  /** "Поїхати". */
  taxiLabel: string;
  onOpenEvent?: () => void;
  onTaxi?: () => void;
}

const THUMB_SIZE = 52;
const STAR_SIZE = 40;
const BUTTON_HEIGHT = 46;

/** Glass card over the map for the selected venue: thumb, name, address, tonight's event, two buttons. */
export function MapVenueCard({
  name,
  address,
  todayEvent,
  accent = 'pink',
  eventLabel,
  taxiLabel,
  onOpenEvent,
  onTaxi,
}: MapVenueCardProps) {
  const thumb = accent === 'pink' ? brand.pink : brand.yellow;
  const star = accent === 'pink' ? brand.yellow : brand.pink;
  return (
    <GlassSurface style={styles.card}>
      <View style={styles.head}>
        <View style={[styles.thumb, { backgroundColor: thumb }]}>
          <HolaStar color={star} size={STAR_SIZE} />
        </View>
        <View style={styles.texts}>
          <AppText numberOfLines={1} style={styles.name}>
            {name}
          </AppText>
          <AppText tone="muted" variant="caption" numberOfLines={1}>
            {address}
          </AppText>
          <AppText variant="caption" numberOfLines={1}>
            {todayEvent}
          </AppText>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={eventLabel}
          onPress={onOpenEvent}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
        >
          <AppText variant="bodyStrong" tone="onAccent">
            {eventLabel}
          </AppText>
        </Pressable>
        <GlassPillButton label={taxiLabel} height={BUTTON_HEIGHT} onPress={onTaxi} flex />
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 30, padding: 18, gap: 14 },
  head: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: radius.chip,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  texts: { flex: 1, gap: 3 },
  name: { fontFamily: fontFamily.displayMedium, fontSize: 17, lineHeight: 22 },
  actions: { flexDirection: 'row', gap: space.sm },
  action: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
    backgroundColor: brand.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8 },
});
