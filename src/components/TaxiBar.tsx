import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button } from '@/components/ui';
import { t } from '@/lib/i18n';
import { buildTaxiLinks, openTaxiLink, type TaxiDestination, type TaxiLink } from '@/lib/taxi';
import { space } from '@/theme';

export interface TaxiBarProps {
  destination: TaxiDestination;
}

/** Uklon / Bolt / Uber buttons that open a ride to the venue. Renders nothing without valid coordinates. */
export function TaxiBar({ destination }: TaxiBarProps) {
  const [failed, setFailed] = useState(false);
  const links = buildTaxiLinks(destination);

  if (links.length === 0) {
    return null;
  }

  const open = async (link: TaxiLink) => {
    setFailed(false);
    try {
      await openTaxiLink(link);
    } catch {
      setFailed(true);
    }
  };

  return (
    <View style={styles.bar}>
      <AppText variant="bodyStrong" accessibilityRole="header">
        {t('taxi.title')}
      </AppText>
      <View style={styles.row}>
        {links.map((link) => (
          <Button
            key={link.provider}
            label={link.label}
            variant="inverse"
            style={styles.button}
            onPress={() => void open(link)}
          />
        ))}
      </View>
      {failed ? (
        <AppText tone="muted" accessibilityRole="alert">
          {t('taxi.openFailed')}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { gap: space.sm },
  row: { flexDirection: 'row', gap: space.sm },
  button: { flex: 1 },
});
