import { StyleSheet, View } from 'react-native';

import { scanResult, space } from '@/theme';

import { AppText } from './AppText';
import { Button } from './Button';

export type ScanFailureReason = 'alreadyUsed' | 'wrongVenue' | 'expired' | 'unknown';

export type ScanResultProps =
  | { status: 'success'; onNext: () => void }
  | { status: 'failure'; reason: ScanFailureReason; onNext: () => void };

const FAILURE_MESSAGE: Record<ScanFailureReason, string> = {
  alreadyUsed: 'Вже використано',
  wrongVenue: 'Не цей заклад',
  expired: 'Термін дії минув',
  unknown: 'Невідомий квиток',
};

/** Full-width verdict after a ticket scan: big ✅ or ❌ with a short reason and a "next" action. */
export function ScanResult(props: ScanResultProps) {
  const isSuccess = props.status === 'success';
  const headline = isSuccess ? 'Дійсний' : 'Недійсний';
  const detail = props.status === 'failure' ? FAILURE_MESSAGE[props.reason] : null;
  const label = detail ? `${headline}. ${detail}` : headline;

  return (
    <View
      testID="scan-result"
      style={[
        styles.root,
        { backgroundColor: isSuccess ? scanResult.success : scanResult.failure },
      ]}
    >
      <View
        accessible
        accessibilityRole="alert"
        accessibilityLiveRegion="assertive"
        accessibilityLabel={label}
        style={styles.body}
      >
        <AppText variant="title" tone="onAccent" style={styles.icon}>
          {isSuccess ? '✅' : '❌'}
        </AppText>
        <AppText variant="title" tone="onAccent" style={styles.headline}>
          {headline}
        </AppText>
        {detail ? (
          <AppText variant="heading" tone="onAccent" style={styles.detail}>
            {detail}
          </AppText>
        ) : null}
      </View>
      <Button label="Далі" variant="inverse" onPress={props.onNext} style={styles.next} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flex: 1,
    padding: space.screen,
    gap: space.xl,
    justifyContent: 'space-between',
  },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.lg },
  icon: { fontSize: 96, lineHeight: 112, textAlign: 'center' },
  headline: { fontSize: 40, lineHeight: 48, textAlign: 'center' },
  detail: { fontSize: 24, lineHeight: 32, textAlign: 'center' },
  next: { alignSelf: 'stretch' },
});
