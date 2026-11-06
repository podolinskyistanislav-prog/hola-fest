import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, ScanResult } from '@/components/ui';
import { t } from '@/lib/i18n';
import { radius, space, useTheme } from '@/theme';

import { useScanRedeem } from './useScanRedeem';

export interface ScannerScreenContentProps {
  onBack: () => void;
}

interface MessageAction {
  label: string;
  onPress: () => void;
}

function Message({
  title,
  body,
  actions,
}: {
  title: string;
  body: string;
  actions: MessageAction[];
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.message, { backgroundColor: colors.background }]}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      <AppText tone="muted">{body}</AppText>
      {actions.map((action, index) => (
        <Button
          key={action.label}
          label={action.label}
          variant={index === 0 ? 'primary' : 'inverse'}
          onPress={action.onPress}
        />
      ))}
    </View>
  );
}

/** Host scanner: camera → server check → full-screen ✅/❌ → back to the camera. */
export function ScannerScreenContent({ onBack }: ScannerScreenContentProps) {
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const { state, onCodeScanned, next } = useScanRedeem();

  if (!permission) {
    return (
      <View
        accessibilityLabel={t('scanner.loading')}
        accessibilityRole="progressbar"
        style={[styles.fill, { backgroundColor: colors.background }]}
      />
    );
  }

  if (!permission.granted) {
    const actions: MessageAction[] = [{ label: t('scanner.back'), onPress: onBack }];
    if (permission.canAskAgain) {
      actions.unshift({
        label: t('scanner.permissionAllow'),
        onPress: () => void requestPermission(),
      });
    }
    return (
      <Message
        title={t('scanner.permissionTitle')}
        body={
          permission.canAskAgain ? t('scanner.permissionBody') : t('scanner.permissionDeniedBody')
        }
        actions={actions}
      />
    );
  }

  if (state.status === 'success') return <ScanResult status="success" onNext={next} />;
  if (state.status === 'failure') {
    return <ScanResult status="failure" reason={state.reason} onNext={next} />;
  }

  if (state.status === 'error') {
    return (
      <Message
        title={t('scanner.errorTitle')}
        body={t('scanner.errorBody')}
        actions={[{ label: t('scanner.retry'), onPress: next }]}
      />
    );
  }

  return (
    <View style={[styles.fill, { backgroundColor: colors.background }]}>
      <CameraView
        style={styles.fill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={({ data }) => void onCodeScanned(data)}
        accessibilityLabel={t('scanner.cameraLabel')}
      />
      <View style={styles.footer} pointerEvents="box-none">
        <View style={[styles.hint, { backgroundColor: colors.surfaceRaised }]}>
          <AppText variant="bodyStrong" accessibilityLiveRegion="polite">
            {state.status === 'checking' ? t('scanner.checking') : t('scanner.hint')}
          </AppText>
        </View>
        <Button label={t('scanner.back')} variant="inverse" onPress={onBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  message: { flex: 1, gap: space.md, padding: space.screen, justifyContent: 'center' },
  footer: {
    position: 'absolute',
    left: space.screen,
    right: space.screen,
    bottom: space.xl * 2,
    gap: space.md,
  },
  hint: { padding: space.md, borderRadius: radius.card, alignItems: 'center' },
});
