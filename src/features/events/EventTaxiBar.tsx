import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, TaxiBar } from '@/components/ui';
import { t } from '@/lib/i18n';
import { buildTaxiLinks, openTaxiLink, type TaxiDestination, type TaxiLink } from '@/lib/taxi';
import { space } from '@/theme';

export interface EventTaxiBarProps {
  destination: TaxiDestination;
}

/** Providers shown (inactive) when the venue has no valid coordinates yet. */
const PLACEHOLDER_PROVIDERS = ['Uklon', 'Bolt', 'Uber'] as const;

/** Floating taxi bar: Uklon / Bolt / Uber open a ride to the venue. */
export function EventTaxiBar({ destination }: EventTaxiBarProps) {
  const [failed, setFailed] = useState(false);
  const links = buildTaxiLinks(destination);

  const open = async (link: TaxiLink) => {
    setFailed(false);
    try {
      await openTaxiLink(link);
    } catch {
      setFailed(true);
    }
  };

  const providers =
    links.length > 0
      ? links.map((link) => ({
          id: link.provider,
          label: link.label,
          onPress: () => void open(link),
        }))
      : PLACEHOLDER_PROVIDERS.map((label) => ({ id: label, label }));

  return (
    <View style={styles.wrap}>
      {failed ? (
        <AppText tone="muted" accessibilityRole="alert">
          {t('taxi.openFailed')}
        </AppText>
      ) : null}
      <TaxiBar label={t('event.taxiLabel')} providers={providers} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.sm },
});
