import { StyleSheet, View } from 'react-native';

import { space } from '@/theme';

import { AppText } from './AppText';
import { GlassPillButton } from './GlassPillButton';
import { GlassSurface } from './GlassSurface';

export interface TaxiProvider {
  id: string;
  /** "Uklon", "Bolt", "Uber". */
  label: string;
  onPress?: () => void;
}

export interface TaxiBarProps {
  /** "Поїхати". */
  label: string;
  /** Bolt is shown first and filled; the others stay glass, in the given order. */
  providers: readonly TaxiProvider[];
}

const PRIMARY_PROVIDER_ID = 'bolt';

function boltFirst(providers: readonly TaxiProvider[]): TaxiProvider[] {
  return [
    ...providers.filter((provider) => provider.id === PRIMARY_PROVIDER_ID),
    ...providers.filter((provider) => provider.id !== PRIMARY_PROVIDER_ID),
  ];
}

export const TAXI_BAR_HEIGHT = 72;
const PROVIDER_HEIGHT = 48;

/** Floating glass bar on the event page: "Поїхати" and one button per taxi provider. */
export function TaxiBar({ label, providers }: TaxiBarProps) {
  return (
    <GlassSurface style={styles.bar}>
      <AppText variant="bodyStrong" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.providers}>
        {boltFirst(providers).map((provider) => (
          <GlassPillButton
            key={provider.id}
            label={provider.label}
            height={PROVIDER_HEIGHT}
            primary={provider.id === PRIMARY_PROVIDER_ID}
            onPress={provider.onPress}
          />
        ))}
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: TAXI_BAR_HEIGHT,
    borderRadius: TAXI_BAR_HEIGHT / 2,
    paddingLeft: space.xl,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  label: { fontSize: 14 },
  providers: { flexDirection: 'row', gap: 6 },
});
