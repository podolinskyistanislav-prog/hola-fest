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
  const { isLoading, isError, retry } = useSession();
  const ready = fontsLoaded && !isLoading;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  if (!ready) return null;
  if (isError) return <SessionError onRetry={retry} />;

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      />
    </>
  );
}
