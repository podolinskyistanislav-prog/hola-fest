import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { SessionError, useSession } from '@/features/auth';
import { useAppFonts, useTheme } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const { colors, scheme } = useTheme();
  const { isLoading, isError, isRetrying, retry } = useSession();
  const ready = fontsLoaded && (!isLoading || isRetrying);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  if (!ready) return null;
  const statusBar = <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />;
  if (isError || isRetrying) {
    return (
      <>
        {statusBar}
        <SessionError onRetry={retry} isRetrying={isRetrying} />
      </>
    );
  }

  return (
    <>
      {statusBar}
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      />
    </>
  );
}
